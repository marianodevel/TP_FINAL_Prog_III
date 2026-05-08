# Trabajo Final Integrador - Programación III

API REST construida con Node.js, Express y MySQL como base de datos.

Sistema de Gestión Médica para administrar: médicos, pacientes, turnos, especialidades y obras sociales.

---

## Tecnologías

| Área          | Tecnología        |
| ------------- | ----------------- |
| Backend       | Node.js + Express |
| Lenguaje      | JavaScript        |
| Base de datos | MySQL             |
| Autenticación | JWT               |
| Documentación | Swagger           |
| Testing       | Bruno             |
| Seguridad     | CORS              |
| Validación    | express-validator |
| Logs          | Morgan            |
| Uploads       | Multer            |

---

## Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/marianodevel/TP_FINAL_Prog_III
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

     Crear un archivo `.env`
    
```bash
PORT=3000
NODE_ENV=development

FRONTEND_URL=

DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

JWT_EXPIRES_IN=
JWT_SECRET=
```

4. Ejecutar el proyecto:

```bash
npm run dev
```

---

## ⚠️ Buenas Prácticas

* No escribir SQL en controllers
* Separar queries por entidad
* Usar siempre parámetros (`?`) en consultas
* Manejar errores con try/catch
* Mantener la lógica en services

---

