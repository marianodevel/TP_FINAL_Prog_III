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
        // ── Auth ──────────────────────────────────────────
        LoginRequest: {
          type: "object",
          required: ["email", "contrasenia"],
          properties: {
            email: { type: "string", example: "ferben@correo.com" },
            contrasenia: { type: "string", example: "ferben" },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            estado: { type: "boolean", example: true },
            msg: { type: "string", example: "Login exitoso" },
            data: {
              type: "object",
              properties: {
                token: { type: "string", example: "eyJhbGci..." },
                usuario: { $ref: "#/components/schemas/Usuario" },
              },
            },
          },
        },

        // ── Usuario (DTO) ─────────────────────────────────
        Usuario: {
          type: "object",
          properties: {
            id_usuario: { type: "integer", example: 1 },
            apellido: { type: "string", example: "Fernandez" },
            nombres: { type: "string", example: "Benito" },
            email: { type: "string", example: "ferben@correo.com" },
            rol: { type: "integer", example: 3 },
            foto_path: {
              type: "string",
              nullable: true,
              example: "src/uploads/foto_1_123456789.jpg",
            },
          },
        },

        // ── Especialidad ──────────────────────────────────
        Especialidad: {
          type: "object",
          properties: {
            id_especialidad: { type: "integer", example: 1 },
            nombre: { type: "string", example: "PEDIATRÍA" },
            activo: { type: "integer", example: 1 },
          },
        },

        // ── Obra Social ───────────────────────────────────
        ObraSocial: {
          type: "object",
          properties: {
            id_obra_social: { type: "integer", example: 1 },
            nombre: { type: "string", example: "Jerárquicos" },
            descripcion: { type: "string", example: "Obra social jerárquicos" },
            porcentaje_descuento: { type: "number", example: 10.0 },
            es_particular: { type: "integer", example: 0 },
            activo: { type: "integer", example: 1 },
          },
        },
        ObraSocialRequest: {
          type: "object",
          required: [
            "nombre",
            "descripcion",
            "porcentaje_descuento",
            "es_particular",
          ],
          properties: {
            nombre: { type: "string", example: "Jerárquicos" },
            descripcion: { type: "string", example: "Obra social jerárquicos" },
            porcentaje_descuento: { type: "number", example: 10.0 },
            es_particular: { type: "integer", enum: [0, 1], example: 0 },
          },
        },

        // ── Médico (DTO) ──────────────────────────────────
        Medico: {
          type: "object",
          properties: {
            id_medico: { type: "integer", example: 1 },
            matricula: { type: "integer", example: 1000 },
            descripcion: {
              type: "string",
              nullable: true,
              example: "Médico pediatra",
            },
            valor_consulta: { type: "number", example: 5000.0 },
            foto_path: {
              type: "string",
              nullable: true,
              example: "src/uploads/foto_1_123456789.jpg",
            },
            especialidad: {
              type: "object",
              properties: {
                id_especialidad: { type: "integer", example: 1 },
                nombre: { type: "string", example: "PEDIATRÍA" },
              },
            },
            usuario: {
              type: "object",
              properties: {
                id_usuario: { type: "integer", example: 1 },
                apellido: { type: "string", example: "Lopez" },
                nombres: { type: "string", example: "Marcelo" },
                email: { type: "string", example: "lopmar@correo.com" },
              },
            },
          },
        },
        MedicoUpdateRequest: {
          type: "object",
          required: ["id_especialidad", "matricula", "valor_consulta"],
          properties: {
            id_especialidad: { type: "integer", example: 1 },
            matricula: { type: "integer", example: 1000 },
            descripcion: { type: "string", example: "Médico pediatra" },
            valor_consulta: { type: "number", example: 5000.0 },
          },
        },

        // ── Paciente (DTO) ────────────────────────────────
        Paciente: {
          type: "object",
          properties: {
            id_paciente: { type: "integer", example: 1 },
            foto_path: {
              type: "string",
              nullable: true,
              example: "src/uploads/foto_5_123456789.jpg",
            },
            obra_social: {
              type: "object",
              properties: {
                id_obra_social: { type: "integer", example: 1 },
                nombre: { type: "string", example: "Jerárquicos" },
                descripcion: {
                  type: "string",
                  example: "Obra social jerárquicos",
                },
                porcentaje_descuento: { type: "number", example: 10.0 },
                es_particular: { type: "boolean", example: false },
              },
            },
            usuario: {
              type: "object",
              properties: {
                id_usuario: { type: "integer", example: 5 },
                apellido: { type: "string", example: "Lopez" },
                nombres: { type: "string", example: "Jacinto" },
                email: { type: "string", example: "lopjac@correo.com" },
              },
            },
          },
        },

        // ── Turno (DTO) ───────────────────────────────────
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
            atendido: { type: "boolean", example: false },
            medico: {
              type: "object",
              properties: {
                id_medico: { type: "integer", example: 1 },
                apellido: { type: "string", example: "Lopez" },
                nombres: { type: "string", example: "Marcelo" },
                especialidad: { type: "string", example: "PEDIATRÍA" },
              },
            },
            paciente: {
              type: "object",
              properties: {
                id_paciente: { type: "integer", example: 1 },
                apellido: { type: "string", example: "Lopez" },
                nombres: { type: "string", example: "Jacinto" },
              },
            },
            obra_social: { type: "string", example: "Jerárquicos" },
          },
        },
        TurnoAdminRequest: {
          type: "object",
          required: [
            "id_medico",
            "id_paciente",
            "id_obra_social",
            "fecha_hora",
          ],
          properties: {
            id_medico: { type: "integer", example: 1 },
            id_paciente: { type: "integer", example: 1 },
            id_obra_social: { type: "integer", example: 1 },
            fecha_hora: {
              type: "string",
              format: "date-time",
              example: "2026-06-15T10:00:00",
            },
          },
        },
        TurnoPacienteRequest: {
          type: "object",
          required: ["id_medico", "fecha_hora"],
          properties: {
            id_medico: { type: "integer", example: 1 },
            fecha_hora: {
              type: "string",
              format: "date-time",
              example: "2026-06-15T10:00:00",
            },
          },
        },

        // ── Registro de usuarios ──────────────────────────
        RegistroPacienteRequest: {
          type: "object",
          required: [
            "documento",
            "apellido",
            "nombres",
            "email",
            "contrasenia",
            "id_obra_social",
          ],
          properties: {
            documento: { type: "string", example: "41000114" },
            apellido: { type: "string", example: "Garcia" },
            nombres: { type: "string", example: "Laura" },
            email: { type: "string", example: "garlaur@correo.com" },
            contrasenia: { type: "string", example: "garlaur" },
            id_obra_social: { type: "integer", example: 1 },
          },
        },
        RegistroMedicoRequest: {
          type: "object",
          required: [
            "documento",
            "apellido",
            "nombres",
            "email",
            "contrasenia",
            "id_especialidad",
            "matricula",
            "valor_consulta",
          ],
          properties: {
            documento: { type: "string", example: "31000115" },
            apellido: { type: "string", example: "Gomez" },
            nombres: { type: "string", example: "Carlos" },
            email: { type: "string", example: "gomcar@correo.com" },
            contrasenia: { type: "string", example: "gomcar" },
            id_especialidad: { type: "integer", example: 1 },
            matricula: { type: "integer", example: 5000 },
            descripcion: { type: "string", example: "Médico pediatra" },
            valor_consulta: { type: "number", example: 5000.0 },
          },
        },
        RegistroAdminRequest: {
          type: "object",
          required: [
            "documento",
            "apellido",
            "nombres",
            "email",
            "contrasenia",
          ],
          properties: {
            documento: { type: "string", example: "51000113" },
            apellido: { type: "string", example: "Torres" },
            nombres: { type: "string", example: "Ana" },
            email: { type: "string", example: "torana@correo.com" },
            contrasenia: { type: "string", example: "torana" },
          },
        },

        // ── Estadísticas ──────────────────────────────────
        EstadisticaEspecialidad: {
          type: "object",
          properties: {
            cant_esp: { type: "integer", example: 5 },
            nombre: { type: "string", example: "PEDIATRÍA" },
          },
        },
        EstadisticaMedico: {
          type: "object",
          properties: {
            cantidad_turnos: { type: "integer", example: 10 },
            id_medico: { type: "integer", example: 1 },
            apellido: { type: "string", example: "Lopez" },
            nombres: { type: "string", example: "Marcelo" },
            especialidad: { type: "string", example: "PEDIATRÍA" },
          },
        },
        EstadisticaObraSocial: {
          type: "object",
          properties: {
            cantidad_turnos: { type: "integer", example: 8 },
            id_obra_social: { type: "integer", example: 1 },
            obra_social: { type: "string", example: "Jerárquicos" },
            total_facturado: { type: "number", example: 36000.0 },
          },
        },
        EstadisticaAtendidos: {
          type: "object",
          properties: {
            atendidos: { type: "integer", example: 4 },
            pendientes: { type: "integer", example: 3 },
            total: { type: "integer", example: 7 },
          },
        },
        EstadisticaRango: {
          type: "object",
          properties: {
            cantidad_turnos: { type: "integer", example: 6 },
            total_facturado: { type: "number", example: 54000.0 },
            promedio_valor: { type: "number", example: 9000.0 },
          },
        },

        // ── Respuestas genéricas ──────────────────────────
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
