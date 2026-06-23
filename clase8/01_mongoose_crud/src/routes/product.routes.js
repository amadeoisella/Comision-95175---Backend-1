import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';
import { validateProductBody } from '../middlewares/validation.middleware.js';

const router = express.Router();

// 1. Crear producto (POST) - Aplica pre-validación y luego creación
router.post('/', validateProductBody, createProduct);

// 2. Obtener lista de productos con paginación (GET)
router.get('/', getProducts);

// 3. Obtener un producto por ID (GET)
router.get('/:id', getProductById);

// 4. Actualizar producto por ID (PUT) - Aplica pre-validación y luego actualización
router.put('/:id', validateProductBody, updateProduct);

// 5. Eliminar producto por ID (DELETE)
router.delete('/:id', deleteProduct);

export default router;
