import express from "express";
import * as pacientesController from "../../controllers/pacientes.controller.js";
import {
  verificarToken,
  verificarRol,
} from "../../middlewares/auth.middleware.js";
import { validacionesActualizarObraSocial } from "../../validators/pacientes.js";
import { validarCampos } from "../../middlewares/validarCampos.js";
import { cache, clearCache } from "../../middlewares/cache.middleware.js";

const router = express.Router();

router.get(
  "/me",
  verificarToken,
  verificarRol(2),
  cache("2 minutes", "pacientes"),
  pacientesController.getMiPerfil,
);

router.get(
  "/",
  verificarToken,
  verificarRol(3),
  cache("2 minutes", "pacientes"),
  pacientesController.getAll,
);

router.get(
  "/:id_paciente",
  verificarToken,
  verificarRol(3),
  cache("2 minutes", "pacientes"),
  pacientesController.getOne,
);

router.patch(
  "/:id_paciente/obra-social",
  verificarToken,
  verificarRol(3),
  validacionesActualizarObraSocial,
  validarCampos,
  clearCache("pacientes"),
  pacientesController.actualizarObraSocial,
);

export default router;
