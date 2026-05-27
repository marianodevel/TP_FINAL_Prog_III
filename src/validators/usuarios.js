import { check } from "express-validator";

const camposBase = [
  check("documento")
    .notEmpty()
    .withMessage("El documento es obligatorio.")
    .isLength({ max: 20 })
    .withMessage("El documento no debe superar 20 caracteres."),
  check("apellido")
    .notEmpty()
    .withMessage("El apellido es obligatorio.")
    .isLength({ max: 100 })
    .withMessage("El apellido no debe superar 100 caracteres."),
  check("nombres")
    .notEmpty()
    .withMessage("Los nombres son obligatorios.")
    .isLength({ max: 100 })
    .withMessage("Los nombres no deben superar 100 caracteres."),
  check("email")
    .notEmpty()
    .withMessage("El email es obligatorio.")
    .isEmail()
    .withMessage("Debe ser un email válido.")
    .isLength({ max: 255 })
    .withMessage("El email no debe superar 255 caracteres."),
  check("contrasenia")
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres."),
];

export const validacionesPaciente = [
  ...camposBase,
  check("id_obra_social")
    .notEmpty()
    .withMessage("La obra social es obligatoria.")
    .isInt({ min: 1 })
    .withMessage("El id_obra_social debe ser un entero válido."),
];

export const validacionesMedico = [
  ...camposBase,
  check("id_especialidad")
    .notEmpty()
    .withMessage("La especialidad es obligatoria.")
    .isInt({ min: 1 })
    .withMessage("El id_especialidad debe ser un entero válido."),
  check("matricula")
    .notEmpty()
    .withMessage("La matrícula es obligatoria.")
    .isInt({ min: 1 })
    .withMessage("La matrícula debe ser un entero positivo."),
  check("descripcion")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La descripción no debe superar 500 caracteres."),
  check("valor_consulta")
    .notEmpty()
    .withMessage("El valor de consulta es obligatorio.")
    .isDecimal({ decimal_digits: "0,2" })
    .withMessage("El valor de consulta debe ser un número decimal válido."),
];

export const validacionesAdmin = [...camposBase];
