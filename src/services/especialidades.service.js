import pool from "../db/connection.js";

export const getAllEspecialidades = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM prog3_turnos.especialidades WHERE activo = 1"
  );
  return rows;
};

export const getEspecialidadById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM prog3_turnos.especialidades WHERE id_especialidad = ? AND activo = 1",
    [id]
  );
  return rows[0];
};

export const createEspecialidad = async (nombre) => {
  const [result] = await pool.query(
    "INSERT INTO prog3_turnos.especialidades (nombre) VALUES (?)",
    [nombre]
  );
  return result.insertId;
};

export const updateEspecialidad = async (id, nombre) => {
  const [result] = await pool.query(
    "UPDATE prog3_turnos.especialidades SET nombre = ? WHERE id_especialidad = ? AND activo = 1",
    [nombre, id]
  );
  return result.affectedRows;
};

export const deleteEspecialidad = async (id) => {
  const [result] = await pool.query(
    "UPDATE prog3_turnos.especialidades SET activo = 0 WHERE id_especialidad = ?",
    [id]
  );
  return result.affectedRows;
};