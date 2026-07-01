import { check, param } from "express-validator";

export const validarIdPaciente = [
    param('id_paciente')
        .isInt({min: 1})
        .withMessage('El ID debe ser un entero positivo.')
];

export const validacionesActualizarObraSocial = [
  ...validarIdPaciente,
  check("id_obra_social")
    .notEmpty()
    .withMessage("El id_obra_social es obligatorio.")
    .isInt({ min: 1 })
    .withMessage("El id_obra_social debe ser un número entero válido."),
];
