import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';

// ----------------------------------------------------------------------------
// 1. Obtener órdenes con Autopopulate (user) y Manual Populate (items.product)
// GET /api/ordenes
// ----------------------------------------------------------------------------
export const getOrders = async (req, res, next) => {
  try {
    // Nota: El campo "user" se puebla AUTOMÁTICAMENTE gracias al pre-hook definido en el modelo Order.js.
    // Nosotros poblamos el campo "items.product" de forma manual en esta consulta, seleccionando sólo name y price.
    const orders = await Order.find()
      .populate('items.product', 'name price');

    res.status(200).json({
      status: 'success',
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// ----------------------------------------------------------------------------
// 2. Framework de Agregación: Reporte de Productos más Vendidos
// GET /api/ordenes/reporte-ventas
// ----------------------------------------------------------------------------
export const runAggregation = async (req, res, next) => {
  try {
    // Construimos el Pipeline de Agregación etapa por etapa
    const report = await Order.aggregate([
      // Etapa 1: Filtrar solo órdenes completadas (Optimizado si hay índices)
      {
        $match: { status: 'completed' }
      },
      // Etapa 2: Descomponer el array "items" en documentos individuales
      {
        $unwind: '$items'
      },
      // Etapa 3: Agrupar por producto y calcular cantidad e ingresos totales
      {
        $group: {
          _id: '$items.product', // Agrupamos por el ID del producto
          totalQuantity: { $sum: '$items.quantity' }, // Sumamos las cantidades
          totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } } // Cantidad * Precio
        }
      },
      // Etapa 4: Modificar el formato de salida para el cliente
      {
        $project: {
          _id: 0,
          productId: '$_id',
          totalQuantity: 1,
          totalRevenue: 1
        }
      },
      // Etapa 5: Ordenar el reporte por mayores ingresos
      {
        $sort: { totalRevenue: -1 }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: report
    });
  } catch (error) {
    next(error);
  }
};

// ----------------------------------------------------------------------------
// 3. Dos Estrategias de Paginación: Skip/Limit vs Cursor-Based
// GET /api/ordenes/paginado
// ----------------------------------------------------------------------------
export const getPaginatedOrders = async (req, res, next) => {
  try {
    const { strategy = 'skip', limit = 5, page = 1, lastId } = req.query;
    const limitNum = parseInt(limit, 10);
    const filter = {};

    // ESTRATEGIA A: Skip/Limit (Desplazamiento)
    if (strategy === 'skip') {
      const pageNum = parseInt(page, 10);
      const skip = (pageNum - 1) * limitNum;

      const [orders, totalItems] = await Promise.all([
        Order.find(filter).skip(skip).limit(limitNum),
        Order.countDocuments(filter)
      ]);

      return res.status(200).json({
        status: 'success',
        strategy: 'skip',
        pagination: {
          totalItems,
          totalPages: Math.ceil(totalItems / limitNum),
          currentPage: pageNum,
          limit: limitNum
        },
        data: orders
      });
    }

    // ESTRATEGIA B: Cursor-Based (Paginación por puntero/cursor)
    // Evita la degradación del rendimiento de 'skip' en colecciones gigantescas
    if (strategy === 'cursor') {
      // Si recibimos lastId, filtramos para obtener solo documentos mayores a ese cursor
      if (lastId && lastId !== 'null') {
        filter._id = { $gt: lastId };
      }

      // Buscamos ordenando ascendentemente por _id
      const orders = await Order.find(filter)
        .sort({ _id: 1 })
        .limit(limitNum);

      // El último ID de este lote servirá como cursor para la siguiente página
      const nextCursor = orders.length > 0 ? orders[orders.length - 1]._id : null;

      return res.status(200).json({
        status: 'success',
        strategy: 'cursor',
        pagination: {
          limit: limitNum,
          nextCursor
        },
        data: orders
      });
    }

    res.status(400).json({
      status: 'error',
      message: 'Estrategia de paginación inválida. Debe ser "skip" o "cursor".'
    });
  } catch (error) {
    next(error);
  }
};

// ----------------------------------------------------------------------------
// 4. Búsqueda de Productos por Texto Completo (Text Index Search)
// GET /api/productos/buscar
// ----------------------------------------------------------------------------
export const searchProducts = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        status: 'error',
        message: 'Debes proporcionar un término de búsqueda en el parámetro ?q='
      });
    }

    // Usamos el operador $text para buscar sobre el índice de texto definido en Product.js
    const products = await Product.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } } // Proyectamos la relevancia
    ).sort({ score: { $meta: 'textScore' } }); // Ordenamos por mayor relevancia

    res.status(200).json({
      status: 'success',
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};
