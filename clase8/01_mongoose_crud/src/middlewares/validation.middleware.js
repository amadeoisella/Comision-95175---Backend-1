/**
 * Middleware para validar que los campos obligatorios del producto estén presentes
 * antes de pasárselo a Mongoose para su procesamiento.
 */
export const validateProductBody = (req, res, next) => {
  const { name, price, category, code } = req.body;

  // Realizamos una validación rápida solo para solicitudes POST (creación).
  // En las solicitudes PUT (actualización) permitimos envíos parciales.
  if (req.method === 'POST') {
    if (!name || price === undefined || !category || !code) {
      return res.status(400).json({
        status: 'error',
        message: 'Validación Express: Faltan campos obligatorios en el cuerpo. Debes enviar name, price, category y code.'
      });
    }
  }

  next(); // Si está todo OK, continúa con el controlador
};
