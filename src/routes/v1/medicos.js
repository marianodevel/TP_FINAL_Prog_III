import express from "express";
import * as medicosController from "../../controllers/medicos.controller.js";
import {
  verificarToken,
  verificarRol,
} from "../../middlewares/auth.middleware.js";
import { validacionesUpdateMedico } from "../../validators/medicos.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = express.Router();

// Listar todos los médicos o filtrar por especialidad — paciente y admin
// GET /medicos
// GET /medicos?especialidad=1
router.get("/", verificarToken, verificarRol(2, 3), medicosController.getAll);

// Obtener un médico por id — paciente y admin
router.get(
  "/:id_medico",
  verificarToken,
  verificarRol(2, 3),
  medicosController.getOne,
);

// Editar datos de un médico — solo admin
router.put(
  "/:id_medico",
  verificarToken,
  verificarRol(3),
  validacionesUpdateMedico,
  validarCampos,
  medicosController.update,
);

// Obras sociales de un médico — solo admin
router.get(
  "/:id_medico/obras-sociales",
  verificarToken,
  verificarRol(3),
  medicosController.getObrasSociales,
);

// Asociar obra social a médico — solo admin
router.post(
  "/:id_medico/obras-sociales",
  verificarToken,
  verificarRol(3),
  medicosController.asociarObraSocial,
);

// Desasociar obra social de médico — solo admin
router.delete(
  "/:id_medico/obras-sociales/:id_obra_social",
  verificarToken,
  verificarRol(3),
  medicosController.desasociarObraSocial,
);

export default router;
