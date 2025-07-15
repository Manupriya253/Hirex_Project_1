// backend/routes/timesheet.js
import express from 'express';
import { sendTimesheetPDF } from '../controller/sendTimesheet.js';

const router = express.Router();

router.post('/submit-timesheet', sendTimesheetPDF);

export default router;
