import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import empRoutes from "./Routers/emproutes.js";
import taskRoutes from "./Routers/taskroutes.js";
import timesheetRoutes from "./Routers/timesheetRoutes.js";
import adminroutes from "./Routers/adminroutes.js";
import adminauthroutes from "./Routers/adminauthroutes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

// ✅ Setup CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://hirex.lk",
  "https://admin.hirex.lk"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, mobile apps)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS Not Allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ API Routes
app.use("/api/employees", empRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api", timesheetRoutes);
app.use("/admin", adminroutes);
app.use("/adminauth", adminauthroutes);

// ✅ Server Port (from .env or default to 5000)
const PORT = process.env.PORT || 5000;

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
