import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { corsOptions } from './config/cors.config.js';
import { testConnection } from './db/connection.js';
import routes from './routes/v1/index.js';
import { validateContentType } from './middlewares/validateContentType.js';


const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(validateContentType);
app.use(express.json());

app.use('/api/v1', routes); 

const startServer = async () => {
  try {
    await testConnection();
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo correctamente en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor debido a un error en la base de datos.");
    console.error(error);
    process.exit(1);
  }
};

startServer();