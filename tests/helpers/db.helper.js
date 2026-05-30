import pool from "../../src/db/connection.js";

export const limpiarTurnos = async () => {
  await pool.query(
    "DELETE FROM turnos_reservas WHERE fecha_hora > '2026-06-01'",
  );
};

export const cerrarConexion = async () => {
  await pool.end();
};
