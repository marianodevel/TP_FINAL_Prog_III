import express from "express";
import EspecialidadController from "../../controllers/especialidades.controller.js";
import {
  verificarToken,
  verificarRol,
} from "../../middlewares/auth.middleware.js";

const router = express.Router();
const especialidadController = new EspecialidadController();

// Paciente y admin pueden listar
router.get(
  "/",
  verificarToken,
  verificarRol(2, 3),
  especialidadController.getAll,
);
router.get(
  "/:id",
  verificarToken,
  verificarRol(2, 3),
  especialidadController.getOne,
);

// Solo admin puede crear, editar y eliminar
router.post(
  "/",
  verificarToken,
  verificarRol(3),
  especialidadController.create,
);
router.put(
  "/:id",
  verificarToken,
  verificarRol(3),
  especialidadController.update,
);
router.delete(
  "/:id",
  verificarToken,
  verificarRol(3),
  especialidadController.remove,
);

export default router;

