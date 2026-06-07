import TurnosRepository from "../db/repositories/turnos.repository.js";
import MedicosRepository from "../db/repositories/medicos.repository.js";
import PacientesRepository from "../db/repositories/pacientes.repository.js";
import pool from "../db/connection.js";

const turnosRepo = new TurnosRepository();
const medicosRepo = new MedicosRepository();
const pacientesRepo = new PacientesRepository();

const calcularValorTotal = (
  valor_consulta,
  porcentaje_descuento,
  es_particular,
) => {
  if (es_particular) {
    return parseFloat(valor_consulta);
  }
  const descuento =
    (parseFloat(valor_consulta) * parseFloat(porcentaje_descuento)) / 100;
  return parseFloat((parseFloat(valor_consulta) - descuento).toFixed(2));
};

export const getAllTurnos = async () => {
  return await turnosRepo.getAll();
};

export const getTurnoById = async (id) => {
  return await turnosRepo.getById(id);
};

export const getTurnosByMedico = async (id_medico) => {
  return await turnosRepo.getByMedico(id_medico);
};

export const getTurnosByPaciente = async (id_paciente) => {
  return await turnosRepo.getByPaciente(id_paciente);
};

export const createTurno = async (data) => {
  const { id_medico, id_paciente, id_obra_social, fecha_hora } = data;

  const medico = await medicosRepo.getById(id_medico);
  if (!medico) throw { status: 404, message: "Médico no encontrado" };

  const paciente = await pacientesRepo.getById(id_paciente);
  if (!paciente) throw { status: 404, message: "Paciente no encontrado" };

  const ocupado = await turnosRepo.existeTurno(id_medico, fecha_hora);
  if (ocupado)
    throw {
      status: 409,
      message: "El médico ya tiene un turno en ese horario",
    };

  const datos = await turnosRepo.getDatosParaCalculo(id_medico, id_obra_social);
  if (!datos)
    throw { status: 404, message: "Obra social no encontrada o inactiva" };

  const valor_total = calcularValorTotal(
    datos.valor_consulta,
    datos.porcentaje_descuento,
    datos.es_particular,
  );

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const newId = await turnosRepo.create(
      { id_medico, id_paciente, id_obra_social, fecha_hora, valor_total },
      connection,
    );
    await connection.commit();
    return { id_turno_reserva: newId, valor_total };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const marcarAtendido = async (id_turno, id_medico) => {
  const turno = await turnosRepo.getById(id_turno);
  if (!turno) throw { status: 404, message: "Turno no encontrado" };
  if (turno.id_medico !== id_medico)
    throw {
      status: 403,
      message: "No tiene permiso para modificar este turno",
    };

  const affectedRows = await turnosRepo.marcarAtendido(id_turno, id_medico);
  if (affectedRows === 0)
    throw { status: 404, message: "No se pudo actualizar el turno" };

  return affectedRows;
};

export const deleteTurno = async (id) => {
  const turno = await turnosRepo.getById(id);
  if (!turno) throw { status: 404, message: "Turno no encontrado" };
  return await turnosRepo.softDelete(id);
};

// ── Método para reportes ──────────────────────────────────────────────────────
export const getTurnosByFiltros = async (filtros) => {
  return await turnosRepo.getByFiltros(filtros);
};
