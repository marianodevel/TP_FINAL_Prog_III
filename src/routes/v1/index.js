import express from "express";
import routerStatus from "./status.js";
import routerEspecialidades from "./especialidades.js";
import routerObrasSociales from "./obras_sociales.js";


const router = express.Router();

router.use("/status", routerStatus);
router.use("/especialidades", routerEspecialidades);
router.use("/obras-sociales", routerObrasSociales);

export default router;