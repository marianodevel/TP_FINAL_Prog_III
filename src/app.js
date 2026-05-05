import express from 'express';
import cors from 'cors';
import { corsOptions } from './config/cors.config.js';
import { testConnection } from './db/connection.js';
import routerStatus from './routes/status.js'; 
import routerEspecialidades from './routes/especialidades.js';
import routerObrasSociales from './routes/obras_sociales.js';
import { validateContentType } from './middleware/validateContentType.js';

const app = express();

const PORT = process.env.PORT || 3005;

app.use(cors(corsOptions));
app.use(validateContentType);
app.use(express.json());

app.use('/', routerStatus); 
app.use('/', routerEspecialidades);
app.use('/', routerObrasSociales);

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