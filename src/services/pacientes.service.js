import PacientesRepository from "../db/repositories/pacientes.repository.js";

const pacientesRepo = new PacientesRepository();

export const getAllPacientes = async () => {
  return await pacientesRepo.getAll();
};

export const getPacienteById = async (id) => {
  return await pacientesRepo.getById(id);
};

export const getPacienteByUsuarioId = async (id_usuario) => {
  return await pacientesRepo.getByUsuarioId(id_usuario);
};

export const createPaciente = async (data) => {
  return await pacientesRepo.create(data);
};

export const actualizarObraSocial = async (id_paciente, id_obra_social) => {
  return await pacientesRepo.actualizarObraSocial(id_paciente, id_obra_social);
};
