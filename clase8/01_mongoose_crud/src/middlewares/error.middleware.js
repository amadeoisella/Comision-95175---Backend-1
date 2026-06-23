/**
 * Middleware centralizado para el procesamiento y formateo de errores
 * Captura excepciones específicas de Mongoose (validación, claves duplicadas, casteo)
 * y devuelve respuestas estructuradas al cliente.
 */
export const errorHandler = (err, req, res, next) => {
  console.error('--- [ERROR DETECTADO EN EL SERVIDOR] ---');
  console.error(err);

  // 1. Error de Validación de Mongoose (ValidationError)
  // Ocurre cuando el cliente envía datos que no cumplen las reglas del Schema (min, required, match, etc.)
  if (err.name === 'ValidationError') {
    const errorDetails = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      status: 'error',
      errorType: 'ValidationError',
      message: 'Fallo de validación: Algunos campos no cumplen las reglas del Schema.',
      errors: errorDetails
    });
  }

  // 2. Error de Clave Duplicada en MongoDB (Código 11000)
  // Ocurre cuando se intenta insertar un valor que ya existe en una propiedad marcada como 'unique: true' (ej: code)
  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyValue || {})[0];
    const duplicateValue = Object.values(err.keyValue || {})[0];
    return res.status(409).json({
      status: 'error',
      errorType: 'DuplicateKeyError',
      message: `El valor '${duplicateValue}' ya está registrado para el campo único '${duplicateField}'.`
    });
  }

  // 3. Error de Casteo de Mongoose (CastError)
  // Ocurre cuando un parámetro no coincide con el tipo esperado, por ejemplo,
  // enviar un ID de 12 bytes inválido en la ruta /api/productos/:id.
  if (err.name === 'CastError') {
    return res.status(400).json({
      status: 'error',
      errorType: 'CastError',
      message: `El formato del valor '${err.value}' no es un identificador válido para la propiedad '${err.path}' (se esperaba tipo ${err.kind}).`
    });
  }

  // 4. Error Interno Genérico (500)
  res.status(500).json({
    status: 'error',
    errorType: 'InternalServerError',
    message: err.message || 'Ocurrió un error inesperado en el servidor.'
  });
};
