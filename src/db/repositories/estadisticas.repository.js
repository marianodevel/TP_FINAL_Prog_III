import pool from "../connection.js";

export default class EstadisticasRepository {
  especialidadesConMasTurnos = async () => {
    const [rows] = await pool.query("CALL especialidades_x_turnos()");
    return rows[0];
  };

  medicosConMasTurnos = async () => {
    const [rows] = await pool.query("CALL medicos_con_mas_turnos()");
    return rows[0];
  };

  turnosPorObraSocial = async () => {
    const [rows] = await pool.query("CALL turnos_por_obra_social()");
    return rows[0];
  };

  turnosAtendidosVsPendientes = async () => {
    const [rows] = await pool.query("CALL turnos_atendidos_vs_pendientes()");
    return rows[0];
  };

  turnosPorRangoFechas = async (fecha_desde, fecha_hasta) => {
    const [rows] = await pool.query("CALL turnos_por_rango_fechas(?, ?)", [
      fecha_desde,
      fecha_hasta,
    ]);
    return rows[0];
  };
}
