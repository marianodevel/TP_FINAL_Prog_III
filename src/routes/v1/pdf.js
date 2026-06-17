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

router.get("/turnos", verificarToken, verificarRol(3), informeTurnos);

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

router.get(
  "/turnos/obra-social/:id_obra_social",
  verificarToken,
  verificarRol(3),
  informeTurnosPorObraSocial,
);

router.get(
  "/turnos/especialidad/:id_especialidad",
  verificarToken,
  verificarRol(3),
  informeTurnosPorEspecialidad,
);

export default router;
