import mysql from "mysql2/promise";

import dotenv from "dotenv";
dotenv.config();

export async function getConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "cms_user",
    password: process.env.DB_PASS || "cms_pass",
    database: process.env.DB_NAME || "cms",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  });
}
