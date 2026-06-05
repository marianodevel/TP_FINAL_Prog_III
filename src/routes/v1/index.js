import express from "express";
import routerStatus from "./status.js";
import routerAuth from "./auth.js";
import routerEspecialidades from "./especialidades.js";
import routerObrasSociales from "./obras_sociales.js";
import routerMedicos from "./medicos.js";
import routerPacientes from "./pacientes.js";
import routerTurnos from "./turnos.js";
import routerUsuarios from "./usuarios.js";
import routerEstadisticas from "./estadisticas.js";
import routerPdf from "./pdf.js";

const router = express.Router();

router.use("/status", routerStatus);
router.use("/auth", routerAuth);
router.use("/especialidades", routerEspecialidades);
router.use("/obras-sociales", routerObrasSociales);
router.use("/medicos", routerMedicos);
router.use("/pacientes", routerPacientes);
router.use("/turnos", routerTurnos);
router.use("/usuarios", routerUsuarios);
router.use("/estadisticas", routerEstadisticas);
router.use("/reportes", routerPdf);

export default router;
