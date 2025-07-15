import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Failed to connect to MySQL DB:", err.message);
    process.exit(1); // Exit the app if DB connection fails
  } else {
    console.log(`✅ Connected to MySQL DB '${process.env.DB_NAME}'`);
  }
});

export default db;
