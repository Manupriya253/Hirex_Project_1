import express from "express";
import {
  createTask,
  getTasksByEmployee,
  deleteTask
} from "../controller/taskcontrollers.js";

const router = express.Router();

router.post("/", createTask);                    // Create task
router.get("/:employeeId", getTasksByEmployee);  // Fetch by employee ID
router.delete("/:id", deleteTask);               // Delete task

export default router;
