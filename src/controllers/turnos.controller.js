import * as turnosService from "../services/turnos.service.js";
import * as pacientesService from "../services/pacientes.service.js";
import * as medicosService from "../services/medicos.service.js";

export const getAll = async (req, res) => {
  try {
    const turnos = await turnosService.getAllTurnos();
    res.status(200).json({ estado: true, msg: "OK", data: turnos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};

export const getOne = async (req, res) => {
  try {
    const { id_turno } = req.params;
    const turno = await turnosService.getTurnoById(id_turno);

    if (!turno) {
      return res
        .status(404)
        .json({ estado: false, msg: "Turno no encontrado" });
    }

    res.status(200).json({ estado: true, msg: "OK", data: turno });
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};

// Médico lista sus propios turnos
export const getMisTurnosMedico = async (req, res) => {
  try {
    const { id_usuario } = req.usuario;
    const medico = await medicosService.getMedicoByUsuarioId(id_usuario);

    if (!medico) {
      return res
        .status(404)
        .json({ estado: false, msg: "Médico no encontrado" });
    }

    const turnos = await turnosService.getTurnosByMedico(medico.id_medico);
    res.status(200).json({ estado: true, msg: "OK", data: turnos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};

// Paciente lista sus propios turnos
export const getMisTurnosPaciente = async (req, res) => {
  try {
    const { id_usuario } = req.usuario;
    const paciente = await pacientesService.getPacienteByUsuarioId(id_usuario);

    if (!paciente) {
      return res
        .status(404)
        .json({ estado: false, msg: "Paciente no encontrado" });
    }

    const turnos = await turnosService.getTurnosByPaciente(
      paciente.id_paciente,
    );
    res.status(200).json({ estado: true, msg: "OK", data: turnos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};

// Médico marca un turno como atendido
export const marcarAtendido = async (req, res) => {
  try {
    const { id_turno } = req.params;
    const { id_usuario } = req.usuario;

    const medico = await medicosService.getMedicoByUsuarioId(id_usuario);
    if (!medico) {
      return res
        .status(404)
        .json({ estado: false, msg: "Médico no encontrado" });
    }

    await turnosService.marcarAtendido(id_turno, medico.id_medico);
    res.status(200).json({ estado: true, msg: "Turno marcado como atendido" });
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json({ estado: false, msg: error.message });
    }
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};

// Paciente crea su propio turno
export const createTurnoPaciente = async (req, res) => {
  try {
    const { id_usuario } = req.usuario;
    const paciente = await pacientesService.getPacienteByUsuarioId(id_usuario);

    if (!paciente) {
      return res
        .status(404)
        .json({ estado: false, msg: "Paciente no encontrado" });
    }

    const { id_medico, fecha_hora } = req.body;

    // El paciente reserva con su propia obra social
    const result = await turnosService.createTurno({
      id_medico,
      id_paciente: paciente.id_paciente,
      id_obra_social: paciente.id_obra_social,
      fecha_hora,
    });

    res
      .status(201)
      .json({
        estado: true,
        msg: "Turno reservado correctamente",
        data: result,
      });
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json({ estado: false, msg: error.message });
    }
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};

// Admin crea turno para cualquier paciente/médico
export const createTurnoAdmin = async (req, res) => {
  try {
    const { id_medico, id_paciente, id_obra_social, fecha_hora } = req.body;

    const result = await turnosService.createTurno({
      id_medico,
      id_paciente,
      id_obra_social,
      fecha_hora,
    });

    res
      .status(201)
      .json({
        estado: true,
        msg: "Turno registrado correctamente",
        data: result,
      });
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json({ estado: false, msg: error.message });
    }
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};

export const deleteTurno = async (req, res) => {
  try {
    const { id_turno } = req.params;
    await turnosService.deleteTurno(id_turno);
    res
      .status(200)
      .json({ estado: true, msg: "Turno eliminado correctamente" });
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json({ estado: false, msg: error.message });
    }
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error interno del servidor" });
  }
};
