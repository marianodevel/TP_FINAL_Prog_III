import express from "express";
import { validarCampos } from "../../middlewares/validarCampos.js";
import * as obraSocialController from "../../controllers/obras_sociales.controller.js";
import { validacionesObraSocial } from "../../validators/obras_sociales.js"

const router = express.Router();

router.get('/', obraSocialController.getAll);
router.get('/:id_obra_social', obraSocialController.getOne);

router.post('/', validacionesObraSocial, validarCampos, obraSocialController.create);
router.put('/:id_obra_social', validacionesObraSocial, validarCampos, obraSocialController.update);

router.delete('/:id_obra_social', obraSocialController.remove);

export default router;