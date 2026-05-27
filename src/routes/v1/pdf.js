import express from "express";
import { informeTurnos } from "../../controllers/pdf.controller.js";
import {
  verificarToken,
  verificarRol,
} from "../../middlewares/auth.middleware.js";

const router = express.Router();

// GET /api/v1/reportes/turnos
// GET /api/v1/reportes/turnos?fecha_desde=2026-01-01&fecha_hasta=2026-06-30
router.get("/turnos", verificarToken, verificarRol(3), informeTurnos);

export default router;
