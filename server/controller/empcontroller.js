import multer from "multer";
import path from "path";
import Connected from "../config/db.js";  // Correct import of your connection
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "super_secret_key";

// Setup multer for profile image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.id}_${Date.now()}${ext}`);
  }
});

export const upload = multer({ storage });

// Create employee
export const createEmployee = async (req, res) => {
  const { email, password, job } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const db = await Connected;

    const currentYear = new Date().getFullYear().toString().slice(-2);
    const query = `
      SELECT MAX(CAST(SUBSTRING_INDEX(id, '-', -1) AS UNSIGNED)) AS maxNum
      FROM employees
      WHERE id LIKE ?
    `;
    const idPattern = `HRX${currentYear}-%`;

    db.query(query, [idPattern], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const maxNum = results[0].maxNum || 0;
      const nextNum = maxNum + 1;
      const paddedId = nextNum.toString().padStart(3, "0");
      const formattedId = `HRX${currentYear}-${paddedId}`;

      db.query(
        "INSERT INTO employees (id, email, password, jobrole) VALUES (?, ?, ?, ?)",
        [formattedId, email, hashedPassword, job],
        (err) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY") {
              return res.status(400).json({ error: "Email or ID already exists" });
            }
            return res.status(500).json({ error: err.message });
          }

          res.status(201).json({
            message: "Employee created",
            id: formattedId
          });
        }
      );
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Server error" });
  }
};



export const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const db = await Connected;
    db.query("SELECT * FROM employees WHERE id = ?", [id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ error: "Employee not found" });
      res.json(results[0]);
    });
  } catch (error) {
    console.error("DB connection error:", error);
    res.status(500).json({ error: "Server error" });
  }
};


// Get all employees with assigned assets
export const getAllEmployees = async (req, res) => {
  try {
    const db = await Connected;

    db.query("SELECT * FROM employees", (err, employees) => {
      if (err) {
        console.error("Error fetching employees:", err);
        return res.status(500).json({ error: err.message });
      }

      db.query(
        "SELECT employeeId, assetName FROM employee_assets WHERE assigned = 1",
        (err2, assetRows) => {
          if (err2) {
            console.error("Error fetching assets:", err2);
            return res.status(500).json({ error: err2.message });
          }

          const employeesWithAssets = employees.map((emp) => {
            const assets = {};
            assetRows.forEach((asset) => {
              if (asset.employeeId === emp.id) {
                assets[asset.assetName] = true;
              }
            });
            return { ...emp, assets };
          });

          res.json(employeesWithAssets);
        }
      );
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


// Assign assets to employee
export const assignAssets = async (req, res) => {
  const { employeeId, assets } = req.body;

  console.log("👉 Received data:", { employeeId, assets });

  if (!employeeId || !Array.isArray(assets)) {
    console.log("❌ Invalid payload");
    return res.status(400).json({ error: "Invalid payload" });
  }

  try {
    const db = await Connected;

    console.log("✅ Connected to DB. Clearing old assets...");

    db.query("DELETE FROM employee_assets WHERE employeeId = ?", [employeeId], (err) => {
      if (err) {
        console.error("❌ Delete error:", err);
        return res.status(500).json({ error: err.message });
      }

      if (assets.length === 0) {
        console.log("✅ No new assets to insert. Assets cleared.");
        return res.json({ message: "Assets cleared." });
      }

      const assetValues = assets.map((asset) => [employeeId, asset, true]);

      console.log("👉 Inserting assetValues:", assetValues);

      db.query(
        "INSERT INTO employee_assets (employeeId, assetName, assigned) VALUES ?",
        [assetValues],
        (err) => {
          if (err) {
            console.error("❌ Insert error:", err);
            return res.status(500).json({ error: err.message });
          }

          console.log("✅ Assets updated.");
          res.json({ message: "Assets updated" });
        }
      );
    });
  } catch (err) {
    console.error("❌ Unexpected error:", err);
    res.status(500).json({ error: "Server error" });
  }
};





// Employee login with email + password
// ✅ EMPLOYEE LOGIN
export const loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  try {
    const db = await Connected;

    db.query(
      "SELECT * FROM employees WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0)
          return res.status(401).json({ error: "Invalid email or password" });

        const employee = results[0];
        console.log("Employee logged in:", employee);

        const match = await bcrypt.compare(password, employee.password);
        if (!match)
          return res.status(401).json({ error: "Invalid email or password" });

        const token = jwt.sign(
          { id: employee.id, email: employee.email }, // ✅ Correct 'HRX25-001' format
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token });
      }
    );
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getLoggedInEmployee = async (req, res) => {
  try {
    const db = await Connected;
    const userId = req.user.id; // 👈 comes from JWT

    db.query("SELECT * FROM employees WHERE id = ?", [userId], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ error: "Employee not found" });

      res.json(results[0]);
    });
  } catch (err) {
    console.error("Error in getLoggedInEmployee:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// PUT /api/employees/me
// controller/empcontroller.js
export const updateEmployeeProfile = async (req, res) => {
  try {
    const db = await Connected;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ error: "Missing employee ID from token." });
    }

    const {
      firstName, lastName, phone, address, idNumber, birthday,
      gender, country, workingFor, emergencyName, emergencyRelationship,
      emergencyContact, bankAccountName, bankName, bankBranch, bankAccountNumber
    } = req.body;

    const profileImage = req.file?.filename;

    const updateFields = [
      "firstName", "lastName", "phone", "address", "idNumber", "birthday", "gender",
      "country", "workingFor", "emergencyName", "emergencyRelationship", "emergencyContact",
      "bankAccountName", "bankName", "bankBranch", "bankAccountNumber"
    ];

    const values = updateFields.map(field => req.body[field]);
    let sql = `UPDATE employees SET ${updateFields.map(f => `${f} = ?`).join(", ")}`;
    
    if (profileImage) {
      sql += `, profileImage = ?`;
      values.push(profileImage);
    }

    sql += " WHERE id = ?";
    values.push(userId);

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("❌ DB update error:", err);
        return res.status(500).json({ error: "Failed to update profile" });
      }

      res.json({ message: "Profile updated successfully" });
    });

  } catch (err) {
    console.error("❌ Error updating profile:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const getAssignedAssetsByEmployee = async (req, res) => {
  const employeeId = req.user.id;

  try {
    const db = await Connected; // ✅ FIX: Add this to initialize db

    const query = `
      SELECT assetName 
      FROM employee_assets 
      WHERE employeeId = ? AND assigned = true
    `;

    db.query(query, [employeeId], (err, results) => {
      if (err) {
        console.error("Error fetching assigned assets:", err);
        return res.status(500).json({ message: "Failed to retrieve assets" });
      }

      res.json(results);
    });
  } catch (error) {
    console.error("DB error:", error);
    res.status(500).json({ error: "Server error" });
  }
};


//Fetch profile image
// GET all employee profiles
// In empController.js
export const getLoggedInEmployeeProfile = (req, res) => {
  const idNumber = req.user.idNumber;

  const query = `SELECT idNumber, firstName, lastName, profileImage FROM employees WHERE idNumber = ?`;

  Connected.query(query, [idNumber], (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (results.length === 0) return res.status(404).json({ error: 'Employee not found' });

    const { idNumber, firstName, lastName, profileImage } = results[0];
    res.json({ idNumber, firstName, lastName, profileImage });
  });
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const employeeId = req.user.id;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Both fields are required" });
  }

  try {
    const db = await Connected;

    db.query(
      'SELECT password FROM employees WHERE id = ?',
      [employeeId],
      async (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        if (results.length === 0) return res.status(404).json({ error: 'Employee not found' });

        const isMatch = await bcrypt.compare(currentPassword, results[0].password);
        if (!isMatch) return res.status(401).json({ error: 'Current password is incorrect' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        db.query(
          'UPDATE employees SET password = ? WHERE id = ?',
          [hashedPassword, employeeId],
          (err) => {
            if (err) return res.status(500).json({ error: 'Update failed' });
            return res.status(200).json({ message: 'Password changed successfully' });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};