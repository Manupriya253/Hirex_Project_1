import express from "express";
import { upload } from "../controller/empcontroller.js";
import {
  createEmployee,
  getAllEmployees,
  loginEmployee,
  assignAssets,
  getEmployeeById,
  getLoggedInEmployee,
  updateEmployeeProfile,
  getAssignedAssetsByEmployee,
  getLoggedInEmployeeProfile,
  changePassword
  
} from "../controller/empcontroller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createEmployee);
router.get("/", getAllEmployees);
router.post("/assets", assignAssets);

router.post("/login", loginEmployee);

router.get("/me", authMiddleware, getLoggedInEmployee);
// ✅ protected route

router.get("/assigned", authMiddleware, getAssignedAssetsByEmployee);

router.get("/:id", getEmployeeById);
// Update current logged-in employee's profile
router.put("/me", authMiddleware, upload.single("profileImage"), updateEmployeeProfile)

// GET /api/employees/profile-image/:idNumber
router.get("/me", authMiddleware, getLoggedInEmployeeProfile);

router.put('/change-password', authMiddleware, changePassword);

export default router;
