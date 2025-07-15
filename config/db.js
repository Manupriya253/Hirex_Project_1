import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

const DB_NAME = process.env.DB_NAME || "hirex";

const Connected = new Promise((resolve, reject) => {
  const rootConnection = mysql.createConnection({
    host: process.env.DB_HOST || "",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASS || "",
  });

  rootConnection.connect((err) => {
    if (err) return reject("MySQL root connection error: " + err.message);

    rootConnection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``, (err) => {
      if (err) return reject("Database creation failed: " + err.message);
      console.log(`✅ Database '${DB_NAME}' is ready.`);

      rootConnection.end();

      const db = mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASS || "",
        database: DB_NAME,
      });

      db.connect((err) => {
        if (err) return reject("Failed to connect to hirex DB: " + err.message);
        console.log(`✅ Connected to '${DB_NAME}' database.`);

        const createEmployeeTable = `
          CREATE TABLE IF NOT EXISTS employees (
            id VARCHAR(20) PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            jobrole VARCHAR(255),
            firstName VARCHAR(100),
            lastName VARCHAR(100),
            phone VARCHAR(50),
            address TEXT,
            idNumber VARCHAR(100),
            birthday DATE,
            gender VARCHAR(20),
            country VARCHAR(100),
            workingFor VARCHAR(255),
            emergencyName VARCHAR(255),
            emergencyRelationship VARCHAR(100),
            emergencyContact VARCHAR(50),
            bankAccountName VARCHAR(255),
            bankName VARCHAR(255),
            bankBranch VARCHAR(255),
            bankAccountNumber VARCHAR(255),
            profileImage VARCHAR(255),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `;

        const createAssetsTable = `
          CREATE TABLE IF NOT EXISTS employee_assets (
            id INT AUTO_INCREMENT PRIMARY KEY,
            employeeId VARCHAR(20),
            assetName VARCHAR(255),
            assigned BOOLEAN DEFAULT false,
            FOREIGN KEY (employeeId) REFERENCES employees(id) ON DELETE CASCADE
          )
        `;

        const createEmployeeTasksTable = `
          CREATE TABLE IF NOT EXISTS employee_tasks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            employeeId VARCHAR(20),
            date DATE,
            clockIn TIME,
            clockOut TIME,
            workedHours DECIMAL(5,2),
            taskDescription TEXT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (employeeId) REFERENCES employees(id) ON DELETE CASCADE
          )
        `;

        const createAdminTable = `
          CREATE TABLE IF NOT EXISTS admins (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `;

        db.query(createEmployeeTable, (err) => {
          if (err) return reject("Failed to create employees table: " + err.message);
          console.log("✅ Table 'employees' is ready.");

          db.query(createAssetsTable, (err) => {
            if (err) return reject("Failed to create assets table: " + err.message);
            console.log("✅ Table 'employee_assets' is ready.");

            db.query(createEmployeeTasksTable, (err) => {
              if (err) console.error("Failed to create employee_tasks table:", err);
              else console.log("✅ Table 'employee_tasks' is ready.");
            });

            db.query(createAdminTable, (err) => {
              if (err) return reject("Failed to create admins table: " + err.message);
              console.log("✅ Table 'admins' is ready.");

              resolve(db);
            });
          });
        });
      });
    });
  });
});

export default Connected;
