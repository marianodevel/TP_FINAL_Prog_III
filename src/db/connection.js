import mysql from "mysql2/promise"
import { dbConfig } from "../config/db.config.js";

const pool = mysql.createPool(dbConfig);

export const testConnection = async () => {
  let connection;

  try {
    connection = await pool.getConnection();
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log("No se pudo conectar a la base de datos:", error.message);
    process.exit(1);
  } finally {
    if (connection) connection.release();
  }
};

export default pool;