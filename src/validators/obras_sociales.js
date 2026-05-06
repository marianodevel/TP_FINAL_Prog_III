import { check } from "express-validator";

export const validacionesObraSocial = [
    check('nombre')
        .notEmpty().withMessage('El nombre es obligatorio.')
        .isLength({ max: 120 }).withMessage('El nombre no debe ser mayor a 120 caracteres.'),
    check('descripcion')
        .notEmpty().withMessage('La descripción es obligatoria.')
        .isLength({ max: 255 }).withMessage('La descripción no debe ser mayor a 255 caracteres.'),
    check('porcentaje_descuento')
        .isNumeric().withMessage('El porcentaje de descuento debe ser un número (decimal).'),
    check('es_particular')
        .isInt({ min: 0, max: 1 }).withMessage('El campo es_particular debe ser 0 o 1.'),
];