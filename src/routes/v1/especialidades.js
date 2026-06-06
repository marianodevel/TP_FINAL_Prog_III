import express from "express";
import EspecialidadController from "../../controllers/especialidades.controller.js";
import {
  verificarToken,
  verificarRol,
} from "../../middlewares/auth.middleware.js";
import { cache } from "../../middlewares/cache.middleware.js";

const router = express.Router();
const especialidadController = new EspecialidadController();

router.get(
  "/",
  verificarToken,
  verificarRol(2, 3),
  cache("10 minutes", "especialidades"),
  especialidadController.getAll,
);

router.get(
  "/:id",
  verificarToken,
  verificarRol(2, 3),
  cache("10 minutes", "especialidades"),
  especialidadController.getOne,
);

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
