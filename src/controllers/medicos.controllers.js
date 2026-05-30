import * as medicosService from "../services/medicos.service.js";
import { toMedicoDTO } from "../dtos/medico.dto.js";

export const getAll = async (req, res) => {
  try {
    const { especialidad } = req.query;

    const medicos = especialidad
      ? await medicosService.getMedicosByEspecialidad(especialidad)
      : await medicosService.getAllMedicos();

    res.status(200).json({
      estado: true,
      msg: "OK",
      data: medicos.map(toMedicoDTO),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};

export const getOne = async (req, res) => {
  try {
    const { id_medico } = req.params;
    const medico = await medicosService.getMedicoById(id_medico);

    if (!medico) {
      return res
        .status(404)
        .json({ estado: false, msg: "Médico no encontrado" });
    }

    res.status(200).json({
      estado: true,
      msg: "OK",
      data: toMedicoDTO(medico),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};

export const update = async (req, res) => {
  try {
    const { id_medico } = req.params;
    const affectedRows = await medicosService.updateMedico(id_medico, req.body);

    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ estado: false, msg: "Médico no encontrado o sin cambios" });
    }

    res
      .status(200)
      .json({ estado: true, msg: "Médico actualizado correctamente" });
  } catch (error) {
    console.error(error);
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ estado: false, msg: "La matrícula ya está en uso" });
    }
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};

export const getObrasSociales = async (req, res) => {
  try {
    const { id_medico } = req.params;

    const medico = await medicosService.getMedicoById(id_medico);
    if (!medico) {
      return res
        .status(404)
        .json({ estado: false, msg: "Médico no encontrado" });
    }

    const obrasSociales =
      await medicosService.getObrasSocialesDeMedico(id_medico);
    res.status(200).json({ estado: true, msg: "OK", data: obrasSociales });
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};

export const asociarObraSocial = async (req, res) => {
  try {
    const { id_medico } = req.params;
    const { id_obra_social } = req.body;

    if (!id_obra_social) {
      return res
        .status(400)
        .json({ estado: false, msg: "id_obra_social es obligatorio" });
    }

    const medico = await medicosService.getMedicoById(id_medico);
    if (!medico) {
      return res
        .status(404)
        .json({ estado: false, msg: "Médico no encontrado" });
    }

    await medicosService.asociarObraSocial(id_medico, id_obra_social);
    res
      .status(200)
      .json({ estado: true, msg: "Obra social asociada correctamente" });
  } catch (error) {
    console.error(error);
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res
        .status(404)
        .json({ estado: false, msg: "Obra social no encontrada" });
    }
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};

export const desasociarObraSocial = async (req, res) => {
  try {
    const { id_medico, id_obra_social } = req.params;

    const affectedRows = await medicosService.desasociarObraSocial(
      id_medico,
      id_obra_social,
    );

    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ estado: false, msg: "Asociación no encontrada" });
    }

    res
      .status(200)
      .json({ estado: true, msg: "Obra social desasociada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};
