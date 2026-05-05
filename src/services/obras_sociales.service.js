import pool from "../db/connection.js";

export const getAllObrasSociales = async () => {
  const [rows] = await pool.execute(
    "SELECT * FROM obras_sociales WHERE activo = 1"
  );
  return rows;
};

export const getObraSocialById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT * FROM obras_sociales WHERE id_obra_social = ? AND activo = 1",
    [id]
  );
  return rows[0];
};

export const createObraSocial = async (data) => {
  const { nombre, descripcion, porcentaje_descuento, es_particular } = data;
  const [result] = await pool.execute(
    "INSERT INTO obras_sociales (nombre, descripcion, porcentaje_descuento, es_particular) VALUES (?, ?, ?, ?)",
    [nombre, descripcion, porcentaje_descuento, es_particular]
  );
  return result.insertId;
};

export const updateObraSocial = async (id, data) => {
  const { nombre, descripcion, porcentaje_descuento, es_particular } = data;
  const [result] = await pool.execute(
    "UPDATE obras_sociales SET nombre = ?, descripcion = ?, porcentaje_descuento = ?, es_particular = ? WHERE id_obra_social = ? AND activo = 1",
    [nombre, descripcion, porcentaje_descuento, es_particular, id]
  );
  return result.affectedRows;
};

export const deleteObraSocial = async (id) => {
  const [result] = await pool.execute(
    "UPDATE obras_sociales SET activo = 0 WHERE id_obra_social = ?",
    [id]
  );
  return result.affectedRows;
};