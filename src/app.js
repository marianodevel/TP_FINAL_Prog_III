import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { testConnection } from "./db/connection.js";
import { corsOptions } from "./config/cors.config.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.get("/api/status", (req, res) => {
  res
    .status(200)
    .json({ status: "ok", message: "API funcionando correctamente" });
});

const startServer = async() => {
  try{
    await testConnection();

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });

  }catch (error){
    console.log("Error al iniciar el servidor", error.message);
  }
};
startServer();