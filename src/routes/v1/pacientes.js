import express from "express";
import * as pacientesController from "../../controllers/pacientes.controller.js";
import {
  verificarToken,
  verificarRol,
} from "../../middlewares/auth.middleware.js";
import { validacionesActualizarObraSocial } from "../../validators/pacientes.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = express.Router();

// Paciente ve su propio perfil
router.get(
  "/me",
  verificarToken,
  verificarRol(2),
  pacientesController.getMiPerfil,
);

// Listar todos los pacientes — solo admin
router.get("/", verificarToken, verificarRol(3), pacientesController.getAll);

// Obtener un paciente por id — solo admin
router.get(
  "/:id_paciente",
  verificarToken,
  verificarRol(3),
  pacientesController.getOne,
);

// Asociar / cambiar obra social de un paciente — solo admin
router.patch(
  "/:id_paciente/obra-social",
  verificarToken,
  verificarRol(3),
  validacionesActualizarObraSocial,
  validarCampos,
  pacientesController.actualizarObraSocial,
);

export default router;
