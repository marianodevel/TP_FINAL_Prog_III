import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Clínica Médica",
      version: "1.0.0",
      description:
        "API REST para el sistema de gestión de turnos médicos. Programación III — UNER 2026.",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Servidor de desarrollo",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        LoginRequest: {
          type: "object",
          required: ["email", "contrasenia"],
          properties: {
            email: { type: "string", example: "ferben@correo.com" },
            contrasenia: { type: "string", example: "ferben" },
          },
        },
        Especialidad: {
          type: "object",
          properties: {
            id_especialidad: { type: "integer", example: 1 },
            nombre: { type: "string", example: "PEDIATRÍA" },
            activo: { type: "integer", example: 1 },
          },
        },
        ObraSocial: {
          type: "object",
          properties: {
            id_obra_social: { type: "integer", example: 1 },
            nombre: { type: "string", example: "Jerárquicos" },
            descripcion: { type: "string", example: "jer" },
            porcentaje_descuento: { type: "number", example: 10.0 },
            es_particular: { type: "integer", example: 0 },
            activo: { type: "integer", example: 1 },
          },
        },
        Medico: {
          type: "object",
          properties: {
            id_medico: { type: "integer", example: 1 },
            matricula: { type: "integer", example: 1000 },
            descripcion: { type: "string", example: "Médico pediatra" },
            valor_consulta: { type: "number", example: 5000.0 },
            apellido: { type: "string", example: "Lopez" },
            nombres: { type: "string", example: "Marcelo" },
            email: { type: "string", example: "lopmar@correo.com" },
            especialidad: { type: "string", example: "PEDIATRÍA" },
          },
        },
        Paciente: {
          type: "object",
          properties: {
            id_paciente: { type: "integer", example: 1 },
            apellido: { type: "string", example: "Lopez" },
            nombres: { type: "string", example: "Jacinto" },
            email: { type: "string", example: "lopjac@correo.com" },
            obra_social: { type: "string", example: "Jerárquicos" },
          },
        },
        Turno: {
          type: "object",
          properties: {
            id_turno_reserva: { type: "integer", example: 1 },
            fecha_hora: {
              type: "string",
              format: "date-time",
              example: "2026-06-10T14:00:00",
            },
            valor_total: { type: "number", example: 4500.0 },
            atentido: { type: "integer", example: 0 },
            medico_apellido: { type: "string", example: "Lopez" },
            medico_nombres: { type: "string", example: "Marcelo" },
            paciente_apellido: { type: "string", example: "Lopez" },
            paciente_nombres: { type: "string", example: "Jacinto" },
            obra_social: { type: "string", example: "Jerárquicos" },
          },
        },
        Error: {
          type: "object",
          properties: {
            estado: { type: "boolean", example: false },
            msg: { type: "string", example: "Error interno del servidor" },
          },
        },
        Success: {
          type: "object",
          properties: {
            estado: { type: "boolean", example: true },
            msg: { type: "string", example: "OK" },
            data: { type: "object" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      { name: "Auth", description: "Autenticación" },
      { name: "Especialidades", description: "Gestión de especialidades" },
      { name: "Obras Sociales", description: "Gestión de obras sociales" },
      { name: "Médicos", description: "Gestión de médicos" },
      { name: "Pacientes", description: "Gestión de pacientes" },
      { name: "Turnos", description: "Gestión de turnos y reservas" },
      { name: "Usuarios", description: "Registro de usuarios (extra)" },
      {
        name: "Estadísticas",
        description: "Estadísticas vía stored procedures",
      },
      { name: "Reportes", description: "Generación de PDF" },
    ],
  },
  apis: ["./src/docs/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
