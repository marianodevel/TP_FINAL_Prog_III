# API Clínica Médica — Trabajo Final Integrador
### Programación III — 2026 | Tecnicatura Universitaria en Desarrollo Web | UNER

API REST para el sistema de gestión de turnos médicos. Permite administrar médicos, pacientes, especialidades, obras sociales y turnos, con autenticación JWT y autorización por roles.

---

## Tecnologías

| Área | Tecnología |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Base de datos | MySQL |
| Autenticación | JWT (jsonwebtoken) |
| Hash contraseñas | SHA2-256 (MySQL) |
| Documentación | Swagger (swagger-jsdoc + swagger-ui-express) |
| Validaciones | express-validator |
| Logs | Morgan |
| Upload de archivos | Multer |
| PDF | PDFKit |
| CORS | cors |
| Variables de entorno | dotenv |
| Dev server | Nodemon |

---

## Requisitos previos

- Node.js >= 18
- MySQL >= 8 o MariaDB >= 10.4
- npm

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/marianodevel/TP_FINAL_Prog_III
cd TP_FINAL_Prog_III
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
NODE_ENV=development

FRONTEND_URL=http://localhost:5173

DB_HOST=localhost
DB_PORT=3306
DB_NAME=prog3_turnos
DB_USER=root
DB_PASSWORD=

JWT_SECRET=tu_clave_secreta_muy_larga_y_segura
JWT_EXPIRES_IN=8h
```

### 4. Crear la base de datos

Importar el script principal en phpMyAdmin o desde la terminal:

```bash
mysql -u root -p < prog3_turnos.sql
```

Luego importar los stored procedures adicionales:

```bash
mysql -u root -p prog3_turnos < scripts/estadisticas_sp.sql
```

### 5. Ejecutar el proyecto

```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
```

El servidor queda disponible en `http://localhost:3000`.  
La documentación Swagger en `http://localhost:3000/api/v1/docs`.

---

## Usuarios de prueba

Todos los usuarios del seed usan como contraseña la parte del email que precede al `@`.

| Email | Contraseña | Rol |
|---|---|---|
| ferben@correo.com | ferben | Administrador |
| gomsil@correo.com | gomsil | Administrador |
| lopmar@correo.com | lopmar | Médico |
| diajua@correo.com | diajua | Médico |
| benhor@correo.com | benhor | Médico |
| perlui@correo.com | perlui | Médico |
| lopjac@correo.com | lopjac | Paciente |
| hunlor@correo.com | hunlor | Paciente |
| agubri@correo.com | agubri | Paciente |

---

## Estructura del proyecto

```
src/
├── app.js                        # Entrada principal
├── config/
│   ├── cors.config.js            # Configuración CORS
│   ├── db.config.js              # Configuración MySQL
│   ├── multer.config.js          # Configuración Multer
│   └── swagger.config.js         # Configuración Swagger
├── controllers/
│   ├── auth.controller.js
│   ├── especialidades.controller.js
│   ├── estadisticas.controller.js
│   ├── medicos.controller.js
│   ├── obras_sociales.controller.js
│   ├── pacientes.controller.js
│   ├── pdf.controller.js
│   ├── turnos.controller.js
│   └── usuarios.controller.js
├── db/
│   ├── connection.js             # Pool de conexión MySQL
│   └── repositories/
│       ├── especialidades.repository.js
│       ├── estadisticas.repository.js
│       ├── medicos.repository.js
│       ├── pacientes.repository.js
│       ├── turnos.repository.js
│       └── usuarios.repository.js
├── docs/                         # Anotaciones Swagger
│   ├── auth.docs.js
│   ├── especialidades.docs.js
│   └── turnos.docs.js
├── middlewares/
│   ├── auth.middleware.js        # verificarToken, verificarRol
│   ├── validarCampos.js          # express-validator handler
│   └── validateContentType.js   # Valida Content-Type
├── routes/
│   └── v1/
│       ├── index.js
│       ├── auth.js
│       ├── especialidades.js
│       ├── estadisticas.js
│       ├── medicos.js
│       ├── obras_sociales.js
│       ├── pacientes.js
│       ├── pdf.js
│       ├── status.js
│       ├── turnos.js
│       └── usuarios.js
├── services/
│   ├── auth.service.js
│   ├── especialidades.service.js
│   ├── estadisticas.service.js
│   ├── medicos.service.js
│   ├── obras_sociales.service.js
│   ├── pacientes.service.js
│   ├── pdf.service.js
│   ├── turnos.service.js
│   └── usuarios.service.js
├── uploads/                      # Fotos de perfil (gitignored)
│   └── .gitkeep
└── validators/
    ├── auth.js
    ├── medicos.js
    ├── obras_sociales.js
    ├── pacientes.js
    ├── turnos.js
    └── usuarios.js
scripts/
├── queries.sql
└── estadisticas_sp.sql           # Stored procedures adicionales
api-turnos/                       # Colección Bruno para testing
```

---

## Endpoints

### Auth
| Método | Ruta | Descripción | Roles |
|---|---|---|---|
| POST | `/api/v1/auth/login` | Iniciar sesión | Público |

### Especialidades
| Método | Ruta | Descripción | Roles |
|---|---|---|---|
| GET | `/api/v1/especialidades` | Listar especialidades | Todos |
| GET | `/api/v1/especialidades/:id` | Obtener especialidad | Todos |
| POST | `/api/v1/especialidades` | Crear especialidad | Admin |
| PUT | `/api/v1/especialidades/:id` | Actualizar especialidad | Admin |
| DELETE | `/api/v1/especialidades/:id` | Eliminar (soft delete) | Admin |

### Obras Sociales
| Método | Ruta | Descripción | Roles |
|---|---|---|---|
| GET | `/api/v1/obras-sociales` | Listar obras sociales | Todos |
| GET | `/api/v1/obras-sociales/:id_obra_social` | Obtener obra social | Todos |
| POST | `/api/v1/obras-sociales` | Crear obra social | Admin |
| PUT | `/api/v1/obras-sociales/:id_obra_social` | Actualizar obra social | Admin |
| DELETE | `/api/v1/obras-sociales/:id_obra_social` | Eliminar (soft delete) | Admin |

### Médicos
| Método | Ruta | Descripción | Roles |
|---|---|---|---|
| GET | `/api/v1/medicos` | Listar médicos | Paciente, Admin |
| GET | `/api/v1/medicos?especialidad=1` | Filtrar por especialidad | Paciente, Admin |
| GET | `/api/v1/medicos/:id_medico` | Obtener médico | Paciente, Admin |
| PUT | `/api/v1/medicos/:id_medico` | Actualizar médico | Admin |
| GET | `/api/v1/medicos/:id_medico/obras-sociales` | Obras sociales del médico | Admin |
| POST | `/api/v1/medicos/:id_medico/obras-sociales` | Asociar obra social | Admin |
| DELETE | `/api/v1/medicos/:id_medico/obras-sociales/:id_obra_social` | Desasociar obra social | Admin |

### Pacientes
| Método | Ruta | Descripción | Roles |
|---|---|---|---|
| GET | `/api/v1/pacientes/me` | Ver perfil propio | Paciente |
| GET | `/api/v1/pacientes` | Listar pacientes | Admin |
| GET | `/api/v1/pacientes/:id_paciente` | Obtener paciente | Admin |
| PATCH | `/api/v1/pacientes/:id_paciente/obra-social` | Actualizar obra social | Admin |

### Turnos
| Método | Ruta | Descripción | Roles |
|---|---|---|---|
| GET | `/api/v1/turnos/mis-turnos` | Listar turnos propios | Médico |
| PATCH | `/api/v1/turnos/:id_turno/atendido` | Marcar como atendido | Médico |
| GET | `/api/v1/turnos/mis-reservas` | Listar reservas propias | Paciente |
| POST | `/api/v1/turnos/reserva` | Crear reserva | Paciente |
| GET | `/api/v1/turnos` | Listar todos los turnos | Admin |
| GET | `/api/v1/turnos/:id_turno` | Obtener turno | Admin |
| POST | `/api/v1/turnos` | Registrar turno | Admin |
| DELETE | `/api/v1/turnos/:id_turno` | Eliminar (soft delete) | Admin |

### Usuarios (extra — registro)
| Método | Ruta | Descripción | Roles |
|---|---|---|---|
| POST | `/api/v1/usuarios/pacientes` | Registrar paciente | Admin |
| POST | `/api/v1/usuarios/medicos` | Registrar médico | Admin |
| POST | `/api/v1/usuarios/admins` | Registrar administrador | Admin |
| PATCH | `/api/v1/usuarios/me/foto` | Subir foto de perfil | Todos |

### Estadísticas
| Método | Ruta | Descripción | Roles |
|---|---|---|---|
| GET | `/api/v1/estadisticas/especialidades` | Turnos por especialidad | Admin |
| GET | `/api/v1/estadisticas/medicos` | Médicos con más turnos | Admin |
| GET | `/api/v1/estadisticas/obras-sociales` | Turnos por obra social | Admin |
| GET | `/api/v1/estadisticas/atendidos` | Atendidos vs pendientes | Admin |
| GET | `/api/v1/estadisticas/rango?fecha_desde=...&fecha_hasta=...` | Turnos por rango de fechas | Admin |

### Reportes
| Método | Ruta | Descripción | Roles |
|---|---|---|---|
| GET | `/api/v1/reportes/turnos` | Descargar PDF de turnos | Admin |
| GET | `/api/v1/reportes/turnos?fecha_desde=...&fecha_hasta=...` | PDF filtrado por fechas | Admin |

---

## Reglas de negocio

### Cálculo del valor total del turno

```
obra social NO particular (es_particular = 0):
  valor_total = valor_consulta - (porcentaje_descuento * valor_consulta / 100)

obra social particular (es_particular = 1):
  valor_total = valor_consulta
```

### Soft delete

Ningún registro se elimina físicamente. Se utiliza el campo `activo`:
- `activo = 1` → registro visible y operativo
- `activo = 0` → registro eliminado lógicamente

Todas las consultas filtran por `activo = 1`.

### Estadísticas

Las estadísticas se generan exclusivamente mediante stored procedures almacenados en MySQL, llamados desde el backend con `CALL nombre_procedure()`.

---

## Roles

| Rol | Valor | Permisos |
|---|---|---|
| Médico | 1 | Ver y gestionar sus propios turnos |
| Paciente | 2 | Crear y ver sus reservas, listar médicos y especialidades |
| Administrador | 3 | Acceso completo al sistema |

---

## Buenas prácticas aplicadas

- Arquitectura en capas: `routes → controllers → services → repositories`
- No se escribe SQL en controllers ni services
- Consultas parametrizadas con `?` para prevenir SQL injection
- Transacciones MySQL en operaciones que afectan múltiples tablas
- Variables de entorno para datos sensibles
- Soft delete en todas las entidades
- Versionado de API: `/api/v1/`
- Manejo centralizado de errores con códigos HTTP apropiados
- Validaciones en todas las entradas con express-validator
- CORS configurable por variable de entorno

---

## Funcionalidad extra

**Registro de usuarios** — El administrador puede registrar nuevos pacientes, médicos y administradores directamente desde la API. Cada registro utiliza una transacción MySQL para garantizar consistencia entre las tablas `usuarios` y `pacientes` / `medicos`.

Adicionalmente, cualquier usuario autenticado puede subir o actualizar su foto de perfil mediante `PATCH /api/v1/usuarios/me/foto` con `multipart/form-data`. Las imágenes se almacenan en `src/uploads/` y se sirven como archivos estáticos en `/uploads/`.

---

## Colección de pruebas

El proyecto incluye una colección [Bruno](https://www.usebruno.com/) en la carpeta `api-turnos/` con los endpoints organizados por entidad para facilitar las pruebas durante el desarrollo.
