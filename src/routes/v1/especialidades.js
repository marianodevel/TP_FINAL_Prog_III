import express from "express";
import EspecialidadController from "../../controllers/especialidades.controller.js";

const router = express.Router();
const especialidadController = new EspecialidadController();

router.get("/", especialidadController.getAll);
router.get("/:id", especialidadController.getOne);
router.post("/", especialidadController.create);
router.put("/:id", especialidadController.update);
router.delete("/:id", especialidadController.remove);

export default router;