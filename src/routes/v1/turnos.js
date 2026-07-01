import express from "express";
import * as turnosController from "../../controllers/turnos.controller.js";
import {
  verificarToken,
  verificarRol,
} from "../../middlewares/auth.middleware.js";
import {
  validacionesTurnoPaciente,
  validacionesTurnoAdmin,
  validarIdTurno,
} from "../../validators/turnos.js";
import { validarCampos } from "../../middlewares/validarCampos.js";
import { cache } from "../../middlewares/cache.middleware.js";

const router = express.Router();

router.get(
  "/mis-turnos",
  verificarToken,
  verificarRol(1),
  cache("1 minute", "turnos"),
  turnosController.getMisTurnosMedico,
);

router.patch(
  "/:id_turno/atendido",
  verificarToken,
  verificarRol(1),
  validarIdTurno,
  validarCampos,
  turnosController.marcarAtendido,
);

router.get(
  "/mis-reservas",
  verificarToken,
  verificarRol(2),
  cache("1 minute", "turnos"),
  turnosController.getMisTurnosPaciente,
);

router.post(
  "/reserva",
  verificarToken,
  verificarRol(2),
  validacionesTurnoPaciente,
  validarCampos,
  turnosController.createTurnoPaciente,
);

router.get(
  "/",
  verificarToken,
  verificarRol(3),
  cache("1 minute", "turnos"),
  turnosController.getAll,
);

router.get(
  "/:id_turno",
  verificarToken,
  verificarRol(3),
  validarIdTurno,
  validarCampos,
  cache("1 minute", "turnos"),
  turnosController.getOne,
);

router.post(
  "/",
  verificarToken,
  verificarRol(3),
  validacionesTurnoAdmin,
  validarCampos,
  turnosController.createTurnoAdmin,
);

router.delete(
  "/:id_turno",
  verificarToken,
  verificarRol(3),
  validarIdTurno,
  validarCampos,
  turnosController.deleteTurno,
);

export default router;
