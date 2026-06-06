import express from "express";
import * as medicosController from "../../controllers/medicos.controller.js";
import {
  verificarToken,
  verificarRol,
} from "../../middlewares/auth.middleware.js";
import { validacionesUpdateMedico } from "../../validators/medicos.js";
import { validarCampos } from "../../middlewares/validarCampos.js";
import { cache, clearCache } from "../../middlewares/cache.middleware.js";

const router = express.Router();

router.get(
  "/",
  verificarToken,
  verificarRol(2, 3),
  cache("5 minutes", "medicos"),
  medicosController.getAll,
);

router.get(
  "/:id_medico",
  verificarToken,
  verificarRol(2, 3),
  cache("5 minutes", "medicos"),
  medicosController.getOne,
);

router.put(
  "/:id_medico",
  verificarToken,
  verificarRol(3),
  validacionesUpdateMedico,
  validarCampos,
  clearCache("medicos"),
  medicosController.update,
);

router.get(
  "/:id_medico/obras-sociales",
  verificarToken,
  verificarRol(3),
  cache("5 minutes", "medicos_obras_sociales"),
  medicosController.getObrasSociales,
);

router.post(
  "/:id_medico/obras-sociales",
  verificarToken,
  verificarRol(3),
  clearCache("medicos_obras_sociales"),
  clearCache("medicos"),
  medicosController.asociarObraSocial,
);

router.delete(
  "/:id_medico/obras-sociales/:id_obra_social",
  verificarToken,
  verificarRol(3),
  clearCache("medicos_obras_sociales"),
  clearCache("medicos"),
  medicosController.desasociarObraSocial,
);

export default router;
