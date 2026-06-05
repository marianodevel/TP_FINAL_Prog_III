import MedicosRepository from "../db/repositories/medicos.repository.js";

const medicosRepo = new MedicosRepository();

export const getAllMedicos = async () => {
  return await medicosRepo.getAll();
};

export const getMedicoById = async (id) => {
  return await medicosRepo.getById(id);
};

export const getMedicosByEspecialidad = async (id_especialidad) => {
  return await medicosRepo.getByEspecialidad(id_especialidad);
};

export const getMedicoByUsuarioId = async (id_usuario) => {
  return await medicosRepo.getByUsuarioId(id_usuario);
};

export const createMedico = async (data) => {
  return await medicosRepo.create(data);
};

export const updateMedico = async (id, data) => {
  return await medicosRepo.update(id, data);
};

export const getObrasSocialesDeMedico = async (id_medico) => {
  return await medicosRepo.getObrasSociales(id_medico);
};

export const asociarObraSocial = async (id_medico, id_obra_social) => {
  return await medicosRepo.asociarObraSocial(id_medico, id_obra_social);
};

export const desasociarObraSocial = async (id_medico, id_obra_social) => {
  return await medicosRepo.desasociarObraSocial(id_medico, id_obra_social);
};
