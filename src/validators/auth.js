import { check } from "express-validator";

export const validacionesLogin = [
  check("email")
    .notEmpty().withMessage("El email es obligatorio.")
    .isEmail().withMessage("Debe ser un email válido."),
  check("contrasenia")
    .notEmpty().withMessage("La contraseña es obligatoria."),
];
