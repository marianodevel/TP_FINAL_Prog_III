import express from "express";
import { validarCampos } from "../../middlewares/validarCampos.js";
import * as obraSocialController from "../../controllers/obras_sociales.controller.js";
import { validacionesObraSocial } from "../../validators/obras_sociales.js";
import {
  verificarToken,
  verificarRol,
} from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Paciente y admin pueden listar
router.get(
  "/",
  verificarToken,
  verificarRol(2, 3),
  obraSocialController.getAll,
);
router.get(
  "/:id_obra_social",
  verificarToken,
  verificarRol(2, 3),
  obraSocialController.getOne,
);

// Solo admin puede crear, editar y eliminar
router.post(
  "/",
  verificarToken,
  verificarRol(3),
  validacionesObraSocial,
  validarCampos,
  obraSocialController.create,
);
router.put(
  "/:id_obra_social",
  verificarToken,
  verificarRol(3),
  validacionesObraSocial,
  validarCampos,
  obraSocialController.update,
);
router.delete(
  "/:id_obra_social",
  verificarToken,
  verificarRol(3),
  obraSocialController.remove,
);

export default router;

