import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123",
  port: 3306,
  database: "node-oidc-login",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

process.on("exit", async (code) => {
  try {
    await pool.end();
  } catch (e) {}
});

export default pool;
