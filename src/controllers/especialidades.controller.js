import * as especialidadService from "../services/especialidades.service.js";

export const getAll = async (req, res) => {
  try {
    const especialidades = await especialidadService.getAllEspecialidades();
    res.status(200).json(especialidades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const especialidad = await especialidadService.getEspecialidadById(id);

    if (!especialidad) {
      return res.status(404).json({ message: "Especialidad no encontrada" });
    }

    res.status(200).json(especialidad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const create = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const newId = await especialidadService.createEspecialidad(nombre);
    res.status(201).json({ message: "Especialidad creada con éxito", id: newId });
  } catch (error) {
    console.error(error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "La especialidad ya existe" });
    }
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const affectedRows = await especialidadService.updateEspecialidad(id, nombre);

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

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await especialidadService.deleteEspecialidad(id);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Especialidad no encontrada" });
    }

    res.status(200).json({ message: "Especialidad eliminada correctamente (borrado lógico)" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};