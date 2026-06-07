import express from "express";
import {
  informeTurnos,
  informeTurnosPorMedico,
  informeTurnosPorPaciente,
  informeTurnosPorObraSocial,
  informeTurnosPorEspecialidad,
} from "../../controllers/pdf.controller.js";
import {
  verificarToken,
  verificarRol,
} from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Reporte general — solo admin
// GET /api/v1/reportes/turnos
// GET /api/v1/reportes/turnos?fecha_desde=2026-01-01&fecha_hasta=2026-06-30
router.get("/turnos", verificarToken, verificarRol(3), informeTurnos);

// Reporte por médico — admin y médico
// El médico solo ve sus propios turnos (el sistema ignora el param y usa el token)
// GET /api/v1/reportes/turnos/medico/:id_medico
// GET /api/v1/reportes/turnos/medico/me (médico autenticado)
router.get(
  "/turnos/medico/:id_medico",
  verificarToken,
  verificarRol(1, 3),
  informeTurnosPorMedico,
);

router.get(
  "/turnos/medico/me",
  verificarToken,
  verificarRol(1),
  informeTurnosPorMedico,
);

// Reporte por paciente — admin y paciente
// El paciente solo ve sus propios turnos
// GET /api/v1/reportes/turnos/paciente/:id_paciente
// GET /api/v1/reportes/turnos/paciente/me (paciente autenticado)
router.get(
  "/turnos/paciente/:id_paciente",
  verificarToken,
  verificarRol(2, 3),
  informeTurnosPorPaciente,
);

router.get(
  "/turnos/paciente/me",
  verificarToken,
  verificarRol(2),
  informeTurnosPorPaciente,
);

// Reporte por obra social — solo admin
// GET /api/v1/reportes/turnos/obra-social/:id_obra_social
router.get(
  "/turnos/obra-social/:id_obra_social",
  verificarToken,
  verificarRol(3),
  informeTurnosPorObraSocial,
);

// Reporte por especialidad — solo admin
// GET /api/v1/reportes/turnos/especialidad/:id_especialidad
router.get(
  "/turnos/especialidad/:id_especialidad",
  verificarToken,
  verificarRol(3),
  informeTurnosPorEspecialidad,
);

export default router;
