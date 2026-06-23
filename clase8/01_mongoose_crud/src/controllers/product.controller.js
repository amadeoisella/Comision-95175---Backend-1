import { Product } from "../models/Product.js";

// ----------------------------------------------------------------------------
// 1. Crear un producto (POST /api/productos)
// ----------------------------------------------------------------------------
export const createProduct = async (req, res, next) => {
  try {
    // Product.create valida automáticamente el req.body contra el Schema antes de guardar.
    // Si falla alguna validación, arrojará un ValidationError que será capturado por el catch.
    const product = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Producto creado exitosamente.",
      data: product,
    });
  } catch (error) {
    next(error); // Delega el error al middleware global de Express
  }
};

// ----------------------------------------------------------------------------
// 2. Obtener productos con Paginación (GET /api/productos)
// ----------------------------------------------------------------------------
export const getProducts = async (req, res, next) => {
  try {
    // Obtenemos los parámetros de consulta (?page=2&limit=5).
    // Si no vienen, seteamos valores por defecto seguros (página 1, límite de 5 elementos).
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const skip = (page - 1) * limit; // Calcula cuántos documentos saltarse

    // Filtro básico para excluir de la lista los productos eliminados de forma lógica (soft delete)
    const filter = { isDeleted: { $ne: true } };

    // Técnica Avanzada (Promise.all): Ejecutamos las dos consultas asíncronas en paralelo
    // en lugar de usar dos 'await' secuenciales. Esto duplica la velocidad de respuesta de la API.
    const [products, totalItems] = await Promise.all([
      Product.find(filter).skip(skip).limit(limit),
      Product.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      status: "success",
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        limit,
      },
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// ----------------------------------------------------------------------------
// 3. Obtener un producto por su ID único (GET /api/productos/:id)
// ----------------------------------------------------------------------------
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Buscamos por ID y nos aseguramos de que no esté marcado como eliminado lógico
    const product = await Product.findOne({
      _id: id,
      isDeleted: { $ne: true },
    });

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: `No se encontró ningún producto activo con el ID: ${id}`,
      });
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// ----------------------------------------------------------------------------
// 4. Actualizar un producto (PUT /api/productos/:id) -> IMPORTANTE
// ----------------------------------------------------------------------------
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // findOneAndUpdate busca por id (excluyendo borrados lógicos) y aplica los cambios.
    // - Opciones clave:
    //   - new: true -> Retorna el documento ya modificado en vez de su estado previo.
    //   - runValidators: true -> Fuerza a Mongoose a validar los datos modificados contra el Schema.
    const updated = await Product.findOneAndUpdate(
      { _id: id, isDeleted: { $ne: true } },
      req.body,
      { new: true, runValidators: true },
    );

    if (!updated) {
      return res.status(404).json({
        status: "error",
        message: `No se encontró ningún producto activo con el ID: ${id} para actualizar.`,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Producto actualizado con éxito.",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// ----------------------------------------------------------------------------
// 5. Eliminar un producto (DELETE /api/productos/:id)
// ----------------------------------------------------------------------------
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // [OPCIÓN A: Eliminación Física] Borra el documento definitivamente del disco.
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: `No se encontró ningún producto con el ID: ${id} para eliminar.`,
      });
    }

    /*
    // [OPCIÓN B: Soft Delete / Eliminación Lógica]
    // Para usar eliminación lógica, comenta la opción A y descomenta este bloque:
    const deleted = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!deleted) {
      return res.status(404).json({ status: 'error', message: 'No encontrado' });
    }
    */

    res.status(200).json({
      status: "success",
      message: `El producto "${deleted.name}" fue eliminado físicamente del servidor.`,
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};
