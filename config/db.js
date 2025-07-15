import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config(); // Load .env variables

// Create and export the database connection
const Connected = new Promise((resolve, reject) => {
  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  db.connect((err) => {
    if (err) return reject("❌ Failed to connect to MySQL DB: " + err.message);
    console.log(`✅ Connected to MySQL DB '${process.env.DB_NAME}'`);
    resolve(db);
  });
});

export default Connected;
