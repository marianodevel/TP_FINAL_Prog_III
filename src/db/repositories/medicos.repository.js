import pool from "../connection.js";

export default class MedicosRepository {
  getAll = async () => {
    const [rows] = await pool.query(
      `SELECT m.id_medico, m.matricula, m.descripcion, m.valor_consulta,
              u.id_usuario, u.documento, u.apellido, u.nombres, u.email, u.foto_path,
              e.id_especialidad, e.nombre AS especialidad
       FROM medicos m
       INNER JOIN usuarios u ON m.id_usuario = u.id_usuario
       INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
       WHERE u.activo = 1 AND e.activo = 1`,
    );
    return rows;
  };

  getById = async (id) => {
    const [rows] = await pool.query(
      `SELECT m.id_medico, m.matricula, m.descripcion, m.valor_consulta,
              u.id_usuario, u.documento, u.apellido, u.nombres, u.email, u.foto_path,
              e.id_especialidad, e.nombre AS especialidad
       FROM medicos m
       INNER JOIN usuarios u ON m.id_usuario = u.id_usuario
       INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
       WHERE m.id_medico = ? AND u.activo = 1 AND e.activo = 1`,
      [id],
    );
    return rows[0];
  };

  getByEspecialidad = async (id_especialidad) => {
    const [rows] = await pool.query(
      `SELECT m.id_medico, m.matricula, m.descripcion, m.valor_consulta,
              u.id_usuario, u.documento, u.apellido, u.nombres, u.email, u.foto_path,
              e.id_especialidad, e.nombre AS especialidad
       FROM medicos m
       INNER JOIN usuarios u ON m.id_usuario = u.id_usuario
       INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
       WHERE m.id_especialidad = ? AND u.activo = 1 AND e.activo = 1`,
      [id_especialidad],
    );
    return rows;
  };

  getByUsuarioId = async (id_usuario) => {
    const [rows] = await pool.query(
      `SELECT m.id_medico, m.matricula, m.descripcion, m.valor_consulta,
              u.id_usuario, u.documento, u.apellido, u.nombres, u.email, u.foto_path,
              e.id_especialidad, e.nombre AS especialidad
       FROM medicos m
       INNER JOIN usuarios u ON m.id_usuario = u.id_usuario
       INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
       WHERE m.id_usuario = ? AND u.activo = 1`,
      [id_usuario],
    );
    return rows[0];
  };

  create = async (data, connection = null) => {
    const db = connection || pool;
    const {
      id_usuario,
      id_especialidad,
      matricula,
      descripcion,
      valor_consulta,
    } = data;
    const [result] = await db.query(
      `INSERT INTO medicos (id_usuario, id_especialidad, matricula, descripcion, valor_consulta)
       VALUES (?, ?, ?, ?, ?)`,
      [
        id_usuario,
        id_especialidad,
        matricula,
        descripcion || null,
        valor_consulta,
      ],
    );
    return result.insertId;
  };

  update = async (id, data) => {
    const { id_especialidad, matricula, descripcion, valor_consulta } = data;
    const [result] = await pool.query(
      `UPDATE medicos
       SET id_especialidad = ?, matricula = ?, descripcion = ?, valor_consulta = ?
       WHERE id_medico = ?`,
      [id_especialidad, matricula, descripcion || null, valor_consulta, id],
    );
    return result.affectedRows;
  };

  getObrasSociales = async (id_medico) => {
    const [rows] = await pool.query(
      `SELECT os.id_obra_social, os.nombre, os.descripcion, os.porcentaje_descuento, os.es_particular
       FROM medicos_obras_sociales mos
       INNER JOIN obras_sociales os ON mos.id_obra_social = os.id_obra_social
       WHERE mos.id_medico = ? AND mos.activo = 1 AND os.activo = 1`,
      [id_medico],
    );
    return rows;
  };

  asociarObraSocial = async (id_medico, id_obra_social) => {
    const [existing] = await pool.query(
      `SELECT id_medico_obra_social FROM medicos_obras_sociales
       WHERE id_medico = ? AND id_obra_social = ?`,
      [id_medico, id_obra_social],
    );

    if (existing.length > 0) {
      const [result] = await pool.query(
        `UPDATE medicos_obras_sociales SET activo = 1
         WHERE id_medico = ? AND id_obra_social = ?`,
        [id_medico, id_obra_social],
      );
      return result.affectedRows;
    }

    const [result] = await pool.query(
      `INSERT INTO medicos_obras_sociales (id_medico, id_obra_social) VALUES (?, ?)`,
      [id_medico, id_obra_social],
    );
    return result.affectedRows;
  };

  desasociarObraSocial = async (id_medico, id_obra_social) => {
    const [result] = await pool.query(
      `UPDATE medicos_obras_sociales SET activo = 0
       WHERE id_medico = ? AND id_obra_social = ?`,
      [id_medico, id_obra_social],
    );
    return result.affectedRows;
  };
}
