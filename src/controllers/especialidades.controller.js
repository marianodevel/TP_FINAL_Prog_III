import EspecialidadService from "../services/especialidades.service.js";

export default class EspecialidadesController{

  constructor(){ 
    this.especialidades = new EspecialidadService()
  };

  getAll = async (req, res) => {
    try {
      const especialidades = await this.especialidades.getAllEspecialidades();
      res.status(200).json(especialidades);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  getOne = async (req, res) => {
    try {
      const { id } = req.params;
      const especialidad = await this.especialidades.getEspecialidadById(id);

      if (!especialidad) {
        return res.status(404).json({ message: "Especialidad no encontrada" });
      }

      res.status(200).json(especialidad);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  create = async (req, res) => {
    try {
      const { nombre } = req.body;

      if (!nombre) {
        return res.status(400).json({ message: "El nombre es obligatorio" });
      }

      const newId = await this.especialidades.createEspecialidad(nombre);
      res.status(201).json({ message: "Especialidad creada con éxito", id: newId });
    } catch (error) {
      console.error(error);
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "La especialidad ya existe" });
      }
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre } = req.body;

      if (!nombre) {
        return res.status(400).json({ message: "El nombre es obligatorio" });
      }

      const affectedRows = await this.especialidades.updateEspecialidad(id, nombre);

      if (affectedRows === 0) {
        return res.status(404).json({ message: "Especialidad no encontrada o sin cambios" });
      }

      res.status(200).json({ message: "Especialidad actualizada correctamente" });
    } catch (error) {
      console.error(error);
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "El nombre de la especialidad ya está en uso" });
      }
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  remove = async (req, res) => {
    try {
      const { id } = req.params;
      const affectedRows = await this.especialidades.deleteEspecialidad(id);

      if (affectedRows === 0) {
        return res.status(404).json({ message: "Especialidad no encontrada" });
      }

      res.status(200).json({ message: "Especialidad eliminada correctamente (borrado lógico)" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
}