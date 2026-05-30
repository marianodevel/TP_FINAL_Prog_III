import pool from "../connection.js";

export default class PacientesRepository {
  getAll = async () => {
    const [rows] = await pool.query(
      `SELECT p.id_paciente, p.id_obra_social,
              u.id_usuario, u.documento, u.apellido, u.nombres, u.email, u.foto_path,
              os.nombre AS obra_social, os.descripcion AS descripcion_obra_social,
              os.porcentaje_descuento, os.es_particular
       FROM pacientes p
       INNER JOIN usuarios u ON p.id_usuario = u.id_usuario
       INNER JOIN obras_sociales os ON p.id_obra_social = os.id_obra_social
       WHERE u.activo = 1 AND os.activo = 1`,
    );
    return rows;
  };

  getById = async (id) => {
    const [rows] = await pool.query(
      `SELECT p.id_paciente, p.id_obra_social,
              u.id_usuario, u.documento, u.apellido, u.nombres, u.email, u.foto_path,
              os.nombre AS obra_social, os.descripcion AS descripcion_obra_social,
              os.porcentaje_descuento, os.es_particular
       FROM pacientes p
       INNER JOIN usuarios u ON p.id_usuario = u.id_usuario
       INNER JOIN obras_sociales os ON p.id_obra_social = os.id_obra_social
       WHERE p.id_paciente = ? AND u.activo = 1 AND os.activo = 1`,
      [id],
    );
    return rows[0];
  };

  getByUsuarioId = async (id_usuario) => {
    const [rows] = await pool.query(
      `SELECT p.id_paciente, p.id_obra_social,
              u.id_usuario, u.documento, u.apellido, u.nombres, u.email, u.foto_path,
              os.nombre AS obra_social, os.descripcion AS descripcion_obra_social,
              os.porcentaje_descuento, os.es_particular
       FROM pacientes p
       INNER JOIN usuarios u ON p.id_usuario = u.id_usuario
       INNER JOIN obras_sociales os ON p.id_obra_social = os.id_obra_social
       WHERE p.id_usuario = ? AND u.activo = 1`,
      [id_usuario],
    );
    return rows[0];
  };

  create = async (data, connection = null) => {
    const db = connection || pool;
    const { id_usuario, id_obra_social } = data;
    const [result] = await db.query(
      `INSERT INTO pacientes (id_usuario, id_obra_social) VALUES (?, ?)`,
      [id_usuario, id_obra_social],
    );
    return result.insertId;
  };

  actualizarObraSocial = async (id_paciente, id_obra_social) => {
    const [result] = await pool.query(
      `UPDATE pacientes SET id_obra_social = ?
       WHERE id_paciente = ?`,
      [id_obra_social, id_paciente],
    );
    return result.affectedRows;
  };
}
