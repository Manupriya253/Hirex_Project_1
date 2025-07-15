import express from "express";
import cors from "cors";
import path from "path";
import "./config/db.js";
import empRoutes from "./Routers/emproutes.js";
import taskRoutes from "./Routers/taskroutes.js";
import timesheetRoutes from "./Routers/timesheetRoutes.js";
import adminroutes from "./Routers/adminroutes.js";
import adminauthroutes from "./Routers/adminauthroutes.js";
const app = express();

// Enable CORS for multiple origins
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware to parse JSON requests
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Mount employee routes
app.use("/api/employees", empRoutes);
// Task routes
app.use("/api/tasks", taskRoutes);

app.use('/api', timesheetRoutes);

app.use('/admin',adminroutes); 

app.use('/adminauth', adminauthroutes);

// Start the server
app.listen(5000, () => {
  console.log("✅ Server is running on http://localhost:5000");
});
