import express from "express";
import * as usuariosController from "../../controllers/usuarios.controller.js";
import {
  verificarToken,
  verificarRol,
} from "../../middlewares/auth.middleware.js";
import { uploadFoto } from "../../config/multer.config.js";
import {
  validacionesPaciente,
  validacionesMedico,
  validacionesAdmin,
} from "../../validators/usuarios.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = express.Router();

// Registro — solo admin
router.post(
  "/pacientes",
  verificarToken,
  verificarRol(3),
  validacionesPaciente,
  validarCampos,
  usuariosController.registrarPaciente,
);

router.post(
  "/medicos",
  verificarToken,
  verificarRol(3),
  validacionesMedico,
  validarCampos,
  usuariosController.registrarMedico,
);

router.post(
  "/admins",
  verificarToken,
  verificarRol(3),
  validacionesAdmin,
  validarCampos,
  usuariosController.registrarAdmin,
);

// Upload de foto — cualquier usuario autenticado sube la suya
router.patch(
  "/me/foto",
  verificarToken,
  verificarRol(1, 2, 3),
  uploadFoto.single("foto"),
  usuariosController.subirFoto,
);

export default router;
