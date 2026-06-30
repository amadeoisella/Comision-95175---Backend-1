import express from 'express';
import orderRoutes from './routes/order.routes.js';
import { User } from './models/User.js';
import { Product } from './models/Product.js';
import { Order } from './models/Order.js';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

// Montar enrutador principal
app.use('/api', orderRoutes);

// Health Check extendido para diagnosticar la conexión y base de datos
app.get('/health', async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado';
  try {
    const [users, products, orders] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments()
    ]);

    res.status(200).json({
      status: 'ok',
      service: 'Mongoose Advanced API (Class 9)',
      database: {
        status: dbStatus,
        usersCount: users,
        productsCount: products,
        ordersCount: orders
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      database: dbStatus,
      message: error.message
    });
  }
});

// Middleware Global de Errores
app.use((err, req, res, next) => {
  console.error('❌ Error capturado en el servidor:', err);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Ocurrió un error interno e inesperado.'
  });
});

export default app;
