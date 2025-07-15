import bcrypt from "bcrypt";
import Connected from "../config/db.js";

const saltRounds = 10;

// Register new admin
export async function registerAdmin(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const db = await Connected;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    db.query(
      "INSERT INTO admins (username, password) VALUES (?, ?)",
      [username, hashedPassword],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ error: "Username already exists" });
          }
          return res.status(500).json({ error: err.message });
        }

        res.json({ message: "Admin registered successfully", id: result.insertId });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Admin login
export async function loginAdmin(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const db = await Connected;

    db.query(
      "SELECT * FROM admins WHERE username = ?",
      [username],
      async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) {
          return res.status(401).json({ error: "Invalid username or password" });
        }

        const admin = results[0];
        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
          return res.status(401).json({ error: "Invalid username or password" });
        }

        // For demo: just return success (in real use JWT here)
        res.json({ message: "Login successful", adminId: admin.id });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
