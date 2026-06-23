import express from 'express';
import productRoutes from './routes/product.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

// Middlewares globales obligatorios para interpretar los cuerpos de las peticiones
app.use(express.json()); // Parsea JSON entrante (req.body)
app.use(express.urlencoded({ extended: true })); // Parsea formularios urlencoded

// Rutas de nuestra API
app.use('/api/productos', productRoutes);

// Endpoint simple de verificación de estado (Health Check)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Mongoose CRUD Store API'
  });
});

// Middleware de control de errores global (debe registrarse al FINAL de las rutas)
app.use(errorHandler);

export { app };
