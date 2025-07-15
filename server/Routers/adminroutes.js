import express from "express";
import { getAllEmployees, getEmployeeDetails, getAssignedAssetsByEmployee,getEmployeeTasks,deleteEmployee,updateEmployee,getEmployeeLastActivity,assignAssetsToEmployee,deleteAssignedAsset,getAssignedAssetsCount,getTodayTimesheets,getTotalEmployeesCount } from "../controller/admincontroller.js";

const router = express.Router();

router.get("/employees", getAllEmployees); // get all employee cards
router.get("/employees/:id", getEmployeeDetails); // get detailed employee view
router.get('/employees/:employeeId/assets', getAssignedAssetsByEmployee); 
router.get('/employees/:id/tasks', getEmployeeTasks);
router.delete('/employees/:id', deleteEmployee);
router.put('/employees/:id', updateEmployee);
router.get('/employees/:id/last-activity', getEmployeeLastActivity);
router.post('/employees/assets', assignAssetsToEmployee);
router.delete('/employees/assets/:assetId', deleteAssignedAsset);
router.get('/employees/count', getTotalEmployeesCount);
router.get("/timesheets/today", getTodayTimesheets);
router.get("/assets/assigned/count", getAssignedAssetsCount);

export default router;
