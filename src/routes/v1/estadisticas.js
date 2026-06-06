import express from "express";
import * as estadisticasController from "../../controllers/estadisticas.controller.js";
import {
  verificarToken,
  verificarRol,
} from "../../middlewares/auth.middleware.js";
import { cache } from "../../middlewares/cache.middleware.js";

const router = express.Router();

router.get(
  "/especialidades",
  verificarToken,
  verificarRol(3),
  cache("5 minutes", "estadisticas"),
  estadisticasController.especialidadesConMasTurnos,
);

router.get(
  "/medicos",
  verificarToken,
  verificarRol(3),
  cache("5 minutes", "estadisticas"),
  estadisticasController.medicosConMasTurnos,
);

router.get(
  "/obras-sociales",
  verificarToken,
  verificarRol(3),
  cache("5 minutes", "estadisticas"),
  estadisticasController.turnosPorObraSocial,
);

router.get(
  "/atendidos",
  verificarToken,
  verificarRol(3),
  cache("5 minutes", "estadisticas"),
  estadisticasController.turnosAtendidosVsPendientes,
);

router.get(
  "/rango",
  verificarToken,
  verificarRol(3),
  cache("5 minutes", "estadisticas"),
  estadisticasController.turnosPorRangoFechas,
);

export default router;
