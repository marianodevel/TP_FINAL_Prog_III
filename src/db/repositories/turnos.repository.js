import pool from "../connection.js";

export default class TurnosRepository {
  getAll = async () => {
    const [rows] = await pool.query(
      `SELECT tr.id_turno_reserva, tr.fecha_hora, tr.valor_total, tr.atentido, tr.activo,
              m.id_medico, um.apellido AS medico_apellido, um.nombres AS medico_nombres,
              e.nombre AS especialidad,
              p.id_paciente, up.apellido AS paciente_apellido, up.nombres AS paciente_nombres,
              os.id_obra_social, os.nombre AS obra_social
       FROM turnos_reservas tr
       INNER JOIN medicos m ON tr.id_medico = m.id_medico
       INNER JOIN usuarios um ON m.id_usuario = um.id_usuario
       INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
       INNER JOIN pacientes p ON tr.id_paciente = p.id_paciente
       INNER JOIN usuarios up ON p.id_usuario = up.id_usuario
       INNER JOIN obras_sociales os ON tr.id_obra_social = os.id_obra_social
       WHERE tr.activo = 1
       ORDER BY tr.fecha_hora DESC`,
    );
    return rows;
  };

  getById = async (id) => {
    const [rows] = await pool.query(
      `SELECT tr.id_turno_reserva, tr.fecha_hora, tr.valor_total, tr.atentido, tr.activo,
              m.id_medico, um.apellido AS medico_apellido, um.nombres AS medico_nombres,
              e.nombre AS especialidad,
              p.id_paciente, up.apellido AS paciente_apellido, up.nombres AS paciente_nombres,
              os.id_obra_social, os.nombre AS obra_social
       FROM turnos_reservas tr
       INNER JOIN medicos m ON tr.id_medico = m.id_medico
       INNER JOIN usuarios um ON m.id_usuario = um.id_usuario
       INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
       INNER JOIN pacientes p ON tr.id_paciente = p.id_paciente
       INNER JOIN usuarios up ON p.id_usuario = up.id_usuario
       INNER JOIN obras_sociales os ON tr.id_obra_social = os.id_obra_social
       WHERE tr.id_turno_reserva = ? AND tr.activo = 1`,
      [id],
    );
    return rows[0];
  };

  getByMedico = async (id_medico) => {
    const [rows] = await pool.query(
      `SELECT tr.id_turno_reserva, tr.fecha_hora, tr.valor_total, tr.atentido,
              p.id_paciente, up.apellido AS paciente_apellido, up.nombres AS paciente_nombres,
              os.id_obra_social, os.nombre AS obra_social
       FROM turnos_reservas tr
       INNER JOIN pacientes p ON tr.id_paciente = p.id_paciente
       INNER JOIN usuarios up ON p.id_usuario = up.id_usuario
       INNER JOIN obras_sociales os ON tr.id_obra_social = os.id_obra_social
       WHERE tr.id_medico = ? AND tr.activo = 1
       ORDER BY tr.fecha_hora DESC`,
      [id_medico],
    );
    return rows;
  };

  getByPaciente = async (id_paciente) => {
    const [rows] = await pool.query(
      `SELECT tr.id_turno_reserva, tr.fecha_hora, tr.valor_total, tr.atentido,
              m.id_medico, um.apellido AS medico_apellido, um.nombres AS medico_nombres,
              e.nombre AS especialidad,
              os.id_obra_social, os.nombre AS obra_social
       FROM turnos_reservas tr
       INNER JOIN medicos m ON tr.id_medico = m.id_medico
       INNER JOIN usuarios um ON m.id_usuario = um.id_usuario
       INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
       INNER JOIN obras_sociales os ON tr.id_obra_social = os.id_obra_social
       WHERE tr.id_paciente = ? AND tr.activo = 1
       ORDER BY tr.fecha_hora DESC`,
      [id_paciente],
    );
    return rows;
  };

  existeTurno = async (id_medico, fecha_hora, excluir_id = null) => {
    let query = `SELECT id_turno_reserva FROM turnos_reservas
                 WHERE id_medico = ? AND fecha_hora = ? AND activo = 1`;
    const params = [id_medico, fecha_hora];

    if (excluir_id) {
      query += ` AND id_turno_reserva != ?`;
      params.push(excluir_id);
    }

    const [rows] = await pool.query(query, params);
    return rows.length > 0;
  };

  getDatosParaCalculo = async (id_medico, id_obra_social) => {
    const [rows] = await pool.query(
      `SELECT m.valor_consulta, os.porcentaje_descuento, os.es_particular
       FROM medicos m
       INNER JOIN obras_sociales os ON os.id_obra_social = ?
       WHERE m.id_medico = ? AND os.activo = 1`,
      [id_obra_social, id_medico],
    );
    return rows[0];
  };

  create = async (data, connection = null) => {
    const db = connection || pool;
    const { id_medico, id_paciente, id_obra_social, fecha_hora, valor_total } =
      data;
    const [result] = await db.query(
      `INSERT INTO turnos_reservas (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atentido)
       VALUES (?, ?, ?, ?, ?, 0)`,
      [id_medico, id_paciente, id_obra_social, fecha_hora, valor_total],
    );
    return result.insertId;
  };

  marcarAtendido = async (id_turno, id_medico) => {
    const [result] = await pool.query(
      `UPDATE turnos_reservas SET atentido = 1
       WHERE id_turno_reserva = ? AND id_medico = ? AND activo = 1`,
      [id_turno, id_medico],
    );
    return result.affectedRows;
  };

  softDelete = async (id) => {
    const [result] = await pool.query(
      `UPDATE turnos_reservas SET activo = 0 WHERE id_turno_reserva = ?`,
      [id],
    );
    return result.affectedRows;
  };

  // ── Métodos para reportes ─────────────────────────────────────────────────

  getByFiltros = async ({
    id_medico,
    id_paciente,
    id_obra_social,
    id_especialidad,
    fecha_desde,
    fecha_hasta,
  }) => {
    let query = `
      SELECT tr.id_turno_reserva, tr.fecha_hora, tr.valor_total, tr.atentido,
             m.id_medico, um.apellido AS medico_apellido, um.nombres AS medico_nombres,
             e.id_especialidad, e.nombre AS especialidad,
             p.id_paciente, up.apellido AS paciente_apellido, up.nombres AS paciente_nombres,
             os.id_obra_social, os.nombre AS obra_social
      FROM turnos_reservas tr
      INNER JOIN medicos m ON tr.id_medico = m.id_medico
      INNER JOIN usuarios um ON m.id_usuario = um.id_usuario
      INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
      INNER JOIN pacientes p ON tr.id_paciente = p.id_paciente
      INNER JOIN usuarios up ON p.id_usuario = up.id_usuario
      INNER JOIN obras_sociales os ON tr.id_obra_social = os.id_obra_social
      WHERE tr.activo = 1`;

    const params = [];

    if (id_medico) {
      query += ` AND tr.id_medico = ?`;
      params.push(id_medico);
    }
    if (id_paciente) {
      query += ` AND tr.id_paciente = ?`;
      params.push(id_paciente);
    }
    if (id_obra_social) {
      query += ` AND tr.id_obra_social = ?`;
      params.push(id_obra_social);
    }
    if (id_especialidad) {
      query += ` AND m.id_especialidad = ?`;
      params.push(id_especialidad);
    }
    if (fecha_desde) {
      query += ` AND tr.fecha_hora >= ?`;
      params.push(fecha_desde);
    }
    if (fecha_hasta) {
      query += ` AND tr.fecha_hora <= ?`;
      params.push(fecha_hasta);
    }

    query += ` ORDER BY tr.fecha_hora DESC`;

    const [rows] = await pool.query(query, params);
    return rows;
  };
}
