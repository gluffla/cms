import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export async function getConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "cms",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  });
}
