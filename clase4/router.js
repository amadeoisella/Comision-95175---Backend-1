// ══════════════════════════════════════════════════
// router.js (Módulo para 02_express_middleware.js)
// 🗣️ "En vez de tener 1000 líneas en un archivo, dividimos las rutas por entidad."
// ══════════════════════════════════════════════════

const express = require("express");
const router = express.Router();

// Middleware de validación específico para este router
// 🗣️ "Los middlewares son los 'patovicas' del boliche. Revisan antes de dejar pasar."
const validarNombre = (req, res, next) => {
  const { name } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    // 🗣️ "Devolvemos un 400 Bad Request porque el cliente mandó mal los datos"
    return res.status(400).json({
      error: "El campo 'name' es obligatorio y debe ser una cadena no vacía.",
    });
  }

  // 🗣️ "Si está todo bien, next() le dice a Express que pase a la ruta"
  next();
};

// Ruta POST /api/saludo
router.post("/saludo", validarNombre, (req, res) => {
  res.status(200).json({ message: `Hola, ${req.body.name}!` });
});

module.exports = router;
