import { check } from "express-validator";

export const validacionesUpdateMedico = [
  check("id_especialidad")
    .notEmpty()
    .withMessage("La especialidad es obligatoria.")
    .isInt({ min: 1 })
    .withMessage("La especialidad debe ser un número entero válido."),
  check("matricula")
    .notEmpty()
    .withMessage("La matrícula es obligatoria.")
    .isInt({ min: 1 })
    .withMessage("La matrícula debe ser un número entero positivo."),
  check("descripcion")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La descripción no debe superar los 500 caracteres."),
  check("valor_consulta")
    .notEmpty()
    .withMessage("El valor de consulta es obligatorio.")
    .isDecimal()
    .withMessage("El valor de consulta debe ser un número decimal."),
];
