import { Router } from 'express';
import {
  getOrders,
  runAggregation,
  getPaginatedOrders,
  searchProducts
} from '../controllers/order.controller.js';

const router = Router();

// Endpoint 1: Obtener órdenes con Poblado de datos (Populate)
router.get('/ordenes', getOrders);

// Endpoint 2: Framework de Agregación (Reporte de ventas de productos)
router.get('/ordenes/reporte-ventas', runAggregation);

// Endpoint 3: Paginación Skip/Limit vs Cursor-Based
router.get('/ordenes/paginado', getPaginatedOrders);

// Endpoint 4: Búsqueda textual sobre índice de texto
router.get('/productos/buscar', searchProducts);

export default router;
