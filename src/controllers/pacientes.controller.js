import * as pacientesService from "../services/pacientes.service.js";
import { toPacienteDTO } from "../dtos/paciente.dto.js";

export const getAll = async (req, res) => {
  try {
    const pacientes = await pacientesService.getAllPacientes();
    res.status(200).json({
      estado: true,
      msg: "OK",
      data: pacientes.map(toPacienteDTO),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};

export const getOne = async (req, res) => {
  try {
    const { id_paciente } = req.params;
    const paciente = await pacientesService.getPacienteById(id_paciente);

    if (!paciente) {
      return res
        .status(404)
        .json({ estado: false, msg: "Paciente no encontrado" });
    }

    res.status(200).json({
      estado: true,
      msg: "OK",
      data: toPacienteDTO(paciente),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};

export const getMiPerfil = async (req, res) => {
  try {
    const { id_usuario } = req.usuario;
    const paciente = await pacientesService.getPacienteByUsuarioId(id_usuario);

    if (!paciente) {
      return res
        .status(404)
        .json({ estado: false, msg: "Perfil de paciente no encontrado" });
    }

    res.status(200).json({
      estado: true,
      msg: "OK",
      data: toPacienteDTO(paciente),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};

export const actualizarObraSocial = async (req, res) => {
  try {
    const { id_paciente } = req.params;
    const { id_obra_social } = req.body;

    if (!id_obra_social) {
      return res
        .status(400)
        .json({ estado: false, msg: "id_obra_social es obligatorio" });
    }

    const paciente = await pacientesService.getPacienteById(id_paciente);
    if (!paciente) {
      return res
        .status(404)
        .json({ estado: false, msg: "Paciente no encontrado" });
    }

    const affectedRows = await pacientesService.actualizarObraSocial(
      id_paciente,
      id_obra_social,
    );

    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ estado: false, msg: "No se pudo actualizar" });
    }

    res
      .status(200)
      .json({ estado: true, msg: "Obra social actualizada correctamente" });
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
