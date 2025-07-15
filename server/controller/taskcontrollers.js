import Connected from "../config/db.js";

// Create a new task
export const createTask = async (req, res) => {
  const { employeeId, date, clockIn, clockOut, workedHours, taskDescription } = req.body;

  if (!employeeId || !date || !clockIn || !clockOut || !workedHours || !taskDescription) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const db = await Connected;

    const sql = `
      INSERT INTO employee_tasks (employeeId, date, clockIn, clockOut, workedHours, taskDescription)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [employeeId, date, clockIn, clockOut, workedHours, taskDescription], (err, result) => {
      if (err) {
        console.error("Error inserting task:", err);
        return res.status(500).json({ message: "Failed to save task" });
      }

      res.status(201).json({ message: "Task saved successfully", taskId: result.insertId });
    });
  } catch (error) {
    res.status(500).json({ message: "DB connection error" });
  }
};

// Get all tasks by employee ID
export const getTasksByEmployee = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const db = await Connected;

    const sql = `
      SELECT * FROM employee_tasks
      WHERE employeeId = ?
      ORDER BY date DESC
    `;

    db.query(sql, [employeeId], (err, results) => {
      if (err) {
        console.error("Error fetching tasks:", err);
        return res.status(500).json({ message: "Error fetching tasks" });
      }

      res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).json({ message: "DB connection error" });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const db = await Connected;

    const sql = `DELETE FROM employee_tasks WHERE id = ?`;

    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error deleting task:", err);
        return res.status(500).json({ message: "Failed to delete task" });
      }

      res.status(200).json({ message: "Task deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "DB connection error" });
  }
};
