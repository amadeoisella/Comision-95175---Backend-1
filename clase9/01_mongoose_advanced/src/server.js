import app from './app.js';
import { connectDB } from './config/db.config.js';

const PORT = process.env.PORT || 8080;

async function startServer() {
  console.log('🔄 Iniciando conexión a la base de datos...');
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Servidor Express escuchando en el puerto ${PORT}`);
    console.log(`🏥 Health Check en: http://localhost:${PORT}/health`);
    console.log(`📦 Endpoints base listados en: http://localhost:${PORT}/api/ordenes`);
  });
}

startServer();
