import express from "express";
import * as turnosController from "../../controllers/turnos.controller.js";
import { verificarToken, verificarRol } from "../../middlewares/auth.middleware.js";
import { validacionesTurnoPaciente, validacionesTurnoAdmin } from "../../validators/turnos.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = express.Router();

router.get(
  "/mis-turnos",
  verificarToken,
  verificarRol(1),
  turnosController.getMisTurnosMedico
);

router.patch(
  "/:id_turno/atendido",
  verificarToken,
  verificarRol(1),
  turnosController.marcarAtendido
);

router.get(
  "/mis-reservas",
  verificarToken,
  verificarRol(2),
  turnosController.getMisTurnosPaciente
);

router.post(
  "/reserva",
  verificarToken,
  verificarRol(2),
  validacionesTurnoPaciente,
  validarCampos,
  turnosController.createTurnoPaciente
);

router.get(
  "/",
  verificarToken,
  verificarRol(3),
  turnosController.getAll
);

router.get(
  "/:id_turno",
  verificarToken,
  verificarRol(3),
  turnosController.getOne
);

router.post(
  "/",
  verificarToken,
  verificarRol(3),
  validacionesTurnoAdmin,
  validarCampos,
  turnosController.createTurnoAdmin
);

router.delete(
  "/:id_turno",
  verificarToken,
  verificarRol(3),
  turnosController.deleteTurno
);

export default router;
