import ObrasSocialesRepository from "../db/repositories/obras_sociales.repository.js";

const obrasSocialesRepo = new ObrasSocialesRepository();

export const getAllObrasSociales = async () => {
  return await obrasSocialesRepo.getAll();
};

export const getObraSocialById = async (id) => {
  return await obrasSocialesRepo.getById(id);
};

export const createObraSocial = async (data) => {
  return await obrasSocialesRepo.create(data);
};

export const updateObraSocial = async (id, data) => {
  return await obrasSocialesRepo.update(id, data);
};

export const deleteObraSocial = async (id) => {
  return await obrasSocialesRepo.softDelete(id);
};

