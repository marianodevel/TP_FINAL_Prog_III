import { check } from "express-validator";

export const validacionesTurnoPaciente = [
  check("id_medico")
    .notEmpty()
    .withMessage("El id_medico es obligatorio.")
    .isInt({ min: 1 })
    .withMessage("El id_medico debe ser un entero válido."),
  check("fecha_hora")
    .notEmpty()
    .withMessage("La fecha y hora son obligatorias.")
    .isISO8601()
    .withMessage(
      "La fecha_hora debe tener formato ISO8601 (ej: 2026-06-10T14:00:00).",
    ),
];

export const validacionesTurnoAdmin = [
  check("id_medico")
    .notEmpty()
    .withMessage("El id_medico es obligatorio.")
    .isInt({ min: 1 })
    .withMessage("El id_medico debe ser un entero válido."),
  check("id_paciente")
    .notEmpty()
    .withMessage("El id_paciente es obligatorio.")
    .isInt({ min: 1 })
    .withMessage("El id_paciente debe ser un entero válido."),
  check("id_obra_social")
    .notEmpty()
    .withMessage("El id_obra_social es obligatorio.")
    .isInt({ min: 1 })
    .withMessage("El id_obra_social debe ser un entero válido."),
  check("fecha_hora")
    .notEmpty()
    .withMessage("La fecha y hora son obligatorias.")
    .isISO8601()
    .withMessage(
      "La fecha_hora debe tener formato ISO8601 (ej: 2026-06-10T14:00:00).",
    ),
];
