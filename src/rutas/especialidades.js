import express from "express";
import * as especialidadController from "../controllers/especialidades.controller.js";

const router = express.Router();

router.get("/especialidades", especialidadController.getAll);
router.get("/especialidades/:id", especialidadController.getOne);
router.post("/especialidades", especialidadController.create);
router.put("/especialidades/:id", especialidadController.update);
router.delete("/especialidades/:id", especialidadController.remove);

export default router;