import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { corsOptions } from "./config/cors.config.js";
import { swaggerSpec } from "./config/swagger.config.js";
import { testConnection } from "./db/connection.js";
import routes from "./routes/v1/index.js";
import { validateContentType } from "./middlewares/validateContentType.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(validateContentType);
app.use(express.json());

// Servir imágenes subidas como archivos estáticos
// Acceso: http://localhost:3000/uploads/foto_1_123456789.jpg
app.use("/uploads", express.static("src/uploads"));

// Swagger
app.use(
  "/api/v1/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "API Clínica Médica",
  }),
);

app.use("/api/v1", routes);

const startServer = async () => {
  try {
    await testConnection();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log(`Swagger disponible en http://localhost:${PORT}/api/v1/docs`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();
