import express from "express";
import * as estadisticasController from "../../controllers/estadisticas.controller.js";
import {
  verificarToken,
  verificarRol,
} from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Todas las estadísticas son solo para admin

router.get(
  "/especialidades",
  verificarToken,
  verificarRol(3),
  estadisticasController.especialidadesConMasTurnos,
);

router.get(
  "/medicos",
  verificarToken,
  verificarRol(3),
  estadisticasController.medicosConMasTurnos,
);

router.get(
  "/obras-sociales",
  verificarToken,
  verificarRol(3),
  estadisticasController.turnosPorObraSocial,
);

router.get(
  "/atendidos",
  verificarToken,
  verificarRol(3),
  estadisticasController.turnosAtendidosVsPendientes,
);

// GET /estadisticas/rango?fecha_desde=2026-01-01&fecha_hasta=2026-06-30
router.get(
  "/rango",
  verificarToken,
  verificarRol(3),
  estadisticasController.turnosPorRangoFechas,
);

export default router;
