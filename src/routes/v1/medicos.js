import express from "express";
import * as medicosController from "../../controllers/medicos.controller.js";
import {
  verificarToken,
  verificarRol,
} from "../../middlewares/auth.middleware.js";
import { validacionesUpdateMedico, validarDesasociarObraSocial, validarIdMedico } from "../../validators/medicos.js";
import { validarCampos } from "../../middlewares/validarCampos.js";
import { cache } from "../../middlewares/cache.middleware.js";

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
  validarIdMedico,
  validarCampos,
  cache("5 minutes", "medicos"),
  medicosController.getOne,
);

router.put(
  "/:id_medico",
  verificarToken,
  verificarRol(3),
  validacionesUpdateMedico,
  validarCampos,
  medicosController.update,
);

router.get(
  "/:id_medico/obras-sociales",
  verificarToken,
  verificarRol(3),
  validarIdMedico,
  validarCampos,
  cache("5 minutes", "medicos_obras_sociales"),
  medicosController.getObrasSociales,
);

router.post(
  "/:id_medico/obras-sociales",
  verificarToken,
  verificarRol(3),
  validarIdMedico,
  validarCampos,
  medicosController.asociarObraSocial,
);

router.delete(
  "/:id_medico/obras-sociales/:id_obra_social",
  verificarToken,
  verificarRol(3),
  validarDesasociarObraSocial,
  validarCampos,
  medicosController.desasociarObraSocial,
);

export default router;
