import express from "express";
import { validarCampos } from "../../middlewares/validarCampos.js";
import * as obraSocialController from "../../controllers/obras_sociales.controller.js";
import { validacionesObraSocial } from "../../validators/obras_sociales.js";
import {
  verificarToken,
  verificarRol,
} from "../../middlewares/auth.middleware.js";
import { cache, clearCache } from "../../middlewares/cache.middleware.js";

const router = express.Router();

router.get(
  "/",
  verificarToken,
  verificarRol(2, 3),
  cache("10 minutes", "obras_sociales"),
  obraSocialController.getAll,
);

router.get(
  "/:id_obra_social",
  verificarToken,
  verificarRol(2, 3),
  cache("10 minutes", "obras_sociales"),
  obraSocialController.getOne,
);

router.post(
  "/",
  verificarToken,
  verificarRol(3),
  validacionesObraSocial,
  validarCampos,
  clearCache("obras_sociales"),
  obraSocialController.create,
);

router.put(
  "/:id_obra_social",
  verificarToken,
  verificarRol(3),
  validacionesObraSocial,
  validarCampos,
  clearCache("obras_sociales"),
  obraSocialController.update,
);

router.delete(
  "/:id_obra_social",
  verificarToken,
  verificarRol(3),
  clearCache("obras_sociales"),
  obraSocialController.remove,
);

export default router;
