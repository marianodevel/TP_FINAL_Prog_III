import pool from "../connection.js";

export default class ObrasSocialesRepository {
  getAll = async () => {
    const [rows] = await pool.query(
      `SELECT * FROM obras_sociales WHERE activo = 1`,
    );
    return rows;
  };

  getById = async (id) => {
    const [rows] = await pool.query(
      `SELECT * FROM obras_sociales WHERE id_obra_social = ? AND activo = 1`,
      [id],
    );
    return rows[0];
  };

  create = async (data) => {
    const { nombre, descripcion, porcentaje_descuento, es_particular } = data;
    const [result] = await pool.query(
      `INSERT INTO obras_sociales (nombre, descripcion, porcentaje_descuento, es_particular)
       VALUES (?, ?, ?, ?)`,
      [nombre, descripcion, porcentaje_descuento, es_particular],
    );
    return result.insertId;
  };

  update = async (id, data) => {
    const { nombre, descripcion, porcentaje_descuento, es_particular } = data;
    const [result] = await pool.query(
      `UPDATE obras_sociales
       SET nombre = ?, descripcion = ?, porcentaje_descuento = ?, es_particular = ?
       WHERE id_obra_social = ? AND activo = 1`,
      [nombre, descripcion, porcentaje_descuento, es_particular, id],
    );
    return result.affectedRows;
  };

  softDelete = async (id) => {
    const [result] = await pool.query(
      `UPDATE obras_sociales SET activo = 0 WHERE id_obra_social = ?`,
      [id],
    );
    return result.affectedRows;
  };
}
