import Connected from "../config/db.js";

export const getAllEmployees = async (req, res) => {
  try {
    const db = await Connected;

    db.query(`SELECT * FROM employees`, (err, results) => {
      if (err) {
        console.error('DB Error:', err);
        return res.status(500).json({ error: "DB Error", details: err });
      }
      res.json(results);
    });
  } catch (e) {
    console.error('Server Error:', e);
    res.status(500).json({ error: "Server Error", details: e });
  }
};

export const getEmployeeDetails = async (req, res) => {
  const db = await Connected;
  const { id } = req.params;

  db.query(`SELECT * FROM employees WHERE id = ?`, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "DB Error", details: err });
    if (!results.length) return res.status(404).json({ error: "Employee not found" });

    res.json(results[0]);
  });
};


export const getAssignedAssetsByEmployee = async (req, res) => {
  const db = await Connected;   // await here
  const { employeeId } = req.params;

  const query = `
    SELECT * FROM employee_assets 
    WHERE employeeId = ? AND assigned = true
  `;

  db.query(query, [employeeId], (err, results) => {
    if (err) {
      console.error('Error fetching assigned assets:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    res.status(200).json(results);
  });
};

// controllers/employeeController.js
export const getEmployeeTasks = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const db = await Connected; // ✅ resolve the promise

    const sql = `SELECT * FROM employee_tasks WHERE employeeId = ? ORDER BY date DESC, clockIn DESC`;

    db.query(sql, [employeeId], (err, results) => {
      if (err) {
        console.error('Error fetching employee tasks:', err);
        return res.status(500).json({ error: 'Database error', details: err });
      }

      res.status(200).json(results);
    });
  } catch (err) {
    console.error("DB connection failed:", err);
    res.status(500).json({ error: "Server error", details: err });
  }
};

export const deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const db = await Connected;

    const sql = `DELETE FROM employees WHERE id = ?`;

    db.query(sql, [employeeId], (err, result) => {
      if (err) {
        console.error("Failed to delete employee:", err);
        return res.status(500).json({ error: "Database error", details: err });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Employee not found" });
      }

      res.status(200).json({ message: "Employee deleted successfully" });
    });
  } catch (err) {
    console.error("Server error during deletion:", err);
    res.status(500).json({ error: "Server error", details: err });
  }
};


export const updateEmployee = async (req, res) => {
  const db = await Connected;
  const { id } = req.params;
  const {
    firstName, lastName, email, phone, address,
    idNumber, birthday, gender, country,
    emergencyName, emergencyRelationship, emergencyContact,
    bankAccountName, bankName, bankBranch, bankAccountNumber,
  } = req.body;

  // ✅ Format birthday to 'YYYY-MM-DD'
  const formattedBirthday = birthday?.split('T')[0]; // Handles ISO strings like '2005-09-14T18:00:00.000Z'

  const sql = `
    UPDATE employees SET
      firstName = ?, lastName = ?, email = ?, phone = ?, address = ?,
      idNumber = ?, birthday = ?, gender = ?, country = ?,
      emergencyName = ?, emergencyRelationship = ?, emergencyContact = ?,
      bankAccountName = ?, bankName = ?, bankBranch = ?, bankAccountNumber = ?
    WHERE id = ?
  `;

  db.query(sql, [
    firstName, lastName, email, phone, address,
    idNumber, formattedBirthday, gender, country,
    emergencyName, emergencyRelationship, emergencyContact,
    bankAccountName, bankName, bankBranch, bankAccountNumber,
    id
  ], (err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ error: 'Update failed', details: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully' });
  });
};


export const getEmployeeLastActivity = async (req, res) => {
  const db = await Connected;
  const { id } = req.params;

  const sql = `
    SELECT date FROM employee_tasks 
    WHERE employeeId = ? 
    ORDER BY date DESC 
    LIMIT 1
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching last activity:', err);
      return res.status(500).json({ error: 'Failed to fetch last activity' });
    }

    if (results.length === 0) {
      return res.json({ lastActivity: null }); // No tasks yet
    }

    return res.json({ lastActivity: results[0].date });
  });
};


// Reuse this
export const assignAssetsToEmployee = async (req, res) => {
  const db = await Connected;
  const { employeeId, assets } = req.body;

  if (!employeeId || !Array.isArray(assets)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  // Delete all existing asset assignments for employee first
  db.query('DELETE FROM employee_assets WHERE employeeId = ?', [employeeId], (err) => {
    if (err) {
      console.error("DB Delete error:", err);
      return res.status(500).json({ error: "Failed to clear assets", details: err });
    }

    if (assets.length === 0) {
      // Nothing to insert, respond OK
      return res.status(200).json({ message: "Assets cleared" });
    }

    // Insert new assignments
    const values = assets.map(assetName => [employeeId, assetName, true]);
    db.query(
      'INSERT INTO employee_assets (employeeId, assetName, assigned) VALUES ?',
      [values],
      (err2) => {
        if (err2) {
          console.error("DB Insert error:", err2);
          return res.status(500).json({ error: "Insert failed", details: err2 });
        }
        res.status(200).json({ message: "Assets updated" });
      }
    );
  });
};

// Delete a single assigned asset by id
export const deleteAssignedAsset = async (req, res) => {
  const db = await Connected;
  const { assetId } = req.params;

  db.query('DELETE FROM employee_assets WHERE id = ?', [assetId], (err, result) => {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ error: 'Failed to delete asset' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Asset assignment not found' });
    }
    res.status(200).json({ message: 'Asset assignment deleted' });
  });
};


// Backend controller (employeeController.js or similar)
export const getTotalEmployeesCount = async (req, res) => {
  try {
    const db = await Connected;
    db.query("SELECT COUNT(*) AS count FROM employees", (err, results) => {
      if (err) {
        console.error("SQL Error:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ count: results[0].count });
    });
  } catch (err) {
    console.error("Connection error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get count of assigned assets
export const getAssignedAssetsCount = async (req, res) => {
  try {
    const db = await Connected;
    db.query(
      `SELECT COUNT(*) AS total FROM employee_assets WHERE assigned = true`,
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ total: results[0].total });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get today's timesheets count
export const getTodayTimesheets = async (req, res) => {
  try {
    const db = await Connected;
    db.query(
      `SELECT COUNT(*) AS count FROM employee_tasks WHERE date = CURDATE()`,
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ count: results[0].count });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export const getTodayMeetings = async (req, res) => {
//   try {
//     // Replace with actual meeting table query if available
//     res.json({ count: 0 });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };