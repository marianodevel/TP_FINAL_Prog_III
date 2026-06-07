import * as turnosService from "../services/turnos.service.js";
import * as medicosService from "../services/medicos.service.js";
import * as pacientesService from "../services/pacientes.service.js";
import * as obrasSocialesService from "../services/obras_sociales.service.js";
import * as especialidadesService from "../services/especialidades.service.js";
import {
  generarPDFTurnos,
  generarPDFTurnosPorMedico,
  generarPDFTurnosPorPaciente,
  generarPDFTurnosPorObraSocial,
  generarPDFTurnosPorEspecialidad,
} from "../services/pdf.service.js";

const parseFiltrosFecha = (query) => ({
  fecha_desde: query.fecha_desde || null,
  fecha_hasta: query.fecha_hasta || null,
});

// ── Reporte general ───────────────────────────────────────────────────────────
export const informeTurnos = async (req, res) => {
  try {
    const { fecha_desde, fecha_hasta } = parseFiltrosFecha(req.query);

    let turnos = await turnosService.getAllTurnos();

    if (fecha_desde && fecha_hasta) {
      const desde = new Date(fecha_desde);
      const hasta = new Date(fecha_hasta);
      turnos = turnos.filter((t) => {
        const fecha = new Date(t.fecha_hora);
        return fecha >= desde && fecha <= hasta;
      });
    }

    if (turnos.length === 0) {
      return res.status(404).json({
        estado: false,
        msg: "No hay turnos para generar el informe.",
      });
    }

    generarPDFTurnos(turnos, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error al generar el PDF." });
  }
};

// ── Reporte por médico ────────────────────────────────────────────────────────
export const informeTurnosPorMedico = async (req, res) => {
  try {
    const { id_usuario, rol } = req.usuario;
    const { fecha_desde, fecha_hasta } = parseFiltrosFecha(req.query);

    let id_medico;

    // Médico solo puede ver sus propios turnos
    if (rol === 1) {
      const medico = await medicosService.getMedicoByUsuarioId(id_usuario);
      if (!medico) {
        return res
          .status(404)
          .json({ estado: false, msg: "Médico no encontrado." });
      }
      id_medico = medico.id_medico;
    } else {
      // Admin puede ver cualquier médico
      id_medico = req.params.id_medico;
    }

    const medico = await medicosService.getMedicoById(id_medico);
    if (!medico) {
      return res
        .status(404)
        .json({ estado: false, msg: "Médico no encontrado." });
    }

    const turnos = await turnosService.getTurnosByFiltros({
      id_medico,
      fecha_desde,
      fecha_hasta,
    });

    if (turnos.length === 0) {
      return res.status(404).json({
        estado: false,
        msg: "No hay turnos para generar el informe.",
      });
    }

    generarPDFTurnosPorMedico(turnos, medico, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error al generar el PDF." });
  }
};

// ── Reporte por paciente ──────────────────────────────────────────────────────
export const informeTurnosPorPaciente = async (req, res) => {
  try {
    const { id_usuario, rol } = req.usuario;
    const { fecha_desde, fecha_hasta } = parseFiltrosFecha(req.query);

    let id_paciente;

    // Paciente solo puede ver sus propios turnos
    if (rol === 2) {
      const paciente =
        await pacientesService.getPacienteByUsuarioId(id_usuario);
      if (!paciente) {
        return res
          .status(404)
          .json({ estado: false, msg: "Paciente no encontrado." });
      }
      id_paciente = paciente.id_paciente;
    } else {
      // Admin puede ver cualquier paciente
      id_paciente = req.params.id_paciente;
    }

    const paciente = await pacientesService.getPacienteById(id_paciente);
    if (!paciente) {
      return res
        .status(404)
        .json({ estado: false, msg: "Paciente no encontrado." });
    }

    const turnos = await turnosService.getTurnosByFiltros({
      id_paciente,
      fecha_desde,
      fecha_hasta,
    });

    if (turnos.length === 0) {
      return res.status(404).json({
        estado: false,
        msg: "No hay turnos para generar el informe.",
      });
    }

    generarPDFTurnosPorPaciente(
      turnos,
      {
        id_paciente: paciente.id_paciente,
        apellido: paciente.apellido,
        nombres: paciente.nombres,
        obra_social: paciente.obra_social?.nombre || paciente.obra_social,
      },
      res,
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error al generar el PDF." });
  }
};

// ── Reporte por obra social ───────────────────────────────────────────────────
export const informeTurnosPorObraSocial = async (req, res) => {
  try {
    const { id_obra_social } = req.params;
    const { fecha_desde, fecha_hasta } = parseFiltrosFecha(req.query);

    const obraSocial =
      await obrasSocialesService.getObraSocialById(id_obra_social);
    if (!obraSocial) {
      return res
        .status(404)
        .json({ estado: false, msg: "Obra social no encontrada." });
    }

    const turnos = await turnosService.getTurnosByFiltros({
      id_obra_social,
      fecha_desde,
      fecha_hasta,
    });

    if (turnos.length === 0) {
      return res.status(404).json({
        estado: false,
        msg: "No hay turnos para generar el informe.",
      });
    }

    generarPDFTurnosPorObraSocial(turnos, obraSocial, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error al generar el PDF." });
  }
};

// ── Reporte por especialidad ──────────────────────────────────────────────────
export const informeTurnosPorEspecialidad = async (req, res) => {
  try {
    const { id_especialidad } = req.params;
    const { fecha_desde, fecha_hasta } = parseFiltrosFecha(req.query);

    const especialidad =
      await especialidadesService.getEspecialidadById(id_especialidad);
    if (!especialidad) {
      return res
        .status(404)
        .json({ estado: false, msg: "Especialidad no encontrada." });
    }

    const turnos = await turnosService.getTurnosByFiltros({
      id_especialidad,
      fecha_desde,
      fecha_hasta,
    });

    if (turnos.length === 0) {
      return res.status(404).json({
        estado: false,
        msg: "No hay turnos para generar el informe.",
      });
    }

    generarPDFTurnosPorEspecialidad(turnos, especialidad, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ estado: false, msg: "Error al generar el PDF." });
  }
};
