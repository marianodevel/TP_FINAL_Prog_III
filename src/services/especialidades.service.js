import EspecialidadesRepository from "../db/repositories/especialidades.repository.js";

export default class EspecialidadesService {
  constructor() {
    this.especialidades = new EspecialidadesRepository();
  }

  getAllEspecialidades = async () => {
    return await this.especialidades.getAllEspecialidades();
  };

  getEspecialidadById = async (id) => {
    return this.especialidades.getEspecialidadById(id);
  };

  createEspecialidad = async (nombre) => {
    return this.especialidades.createEspecialidad(nombre);
  };

  updateEspecialidad = async (id, nombre) => {
    return this.especialidades.updateEspecialidad(id, nombre);
  };

  deleteEspecialidad = async (id) => {
    return this.especialidades.deleteEspecialidad(id);
  };
}

// Exportaciones nombradas para uso directo en otros módulos
const _instance = new EspecialidadesService();
export const getEspecialidadById = (id) => _instance.getEspecialidadById(id);

