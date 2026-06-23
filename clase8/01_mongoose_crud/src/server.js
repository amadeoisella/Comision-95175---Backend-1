import { app } from './app.js';
import { connectDB } from './config/db.config.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;

/**
 * Función principal para iniciar la aplicación.
 * Sigue el principio Fail-Fast: si la conexión a la base de datos falla,
 * no iniciamos el servidor web.
 */
const startServer = async () => {
  console.log('🔄 Iniciando conexión a la base de datos...');
  await connectDB();

  // Escuchamos el puerto configurado una vez que se intentó conectar
  app.listen(PORT, () => {
    console.log(`🚀 Servidor Express escuchando en el puerto ${PORT}`);
    console.log(`🏥 Health Check disponible en: http://localhost:${PORT}/health`);
    console.log(`📦 API de Productos en: http://localhost:${PORT}/api/productos`);
  });
};

startServer();
