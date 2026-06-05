import express from "express";
import { loginController } from "../../controllers/auth.controller.js";
import { validacionesLogin } from "../../validators/auth.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = express.Router();

router.post("/login", validacionesLogin, validarCampos, loginController);

export default router;
