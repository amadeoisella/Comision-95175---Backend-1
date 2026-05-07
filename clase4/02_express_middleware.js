// ══════════════════════════════════════════════════
// 02_express_middleware.js
// ✍️ Correr con: node 02_express_middleware.js
// ══════════════════════════════════════════════════

const express = require("express");
const app = express();

app.use(express.json());

// 🗣️ "Importamos el router modular desde nuestro archivo"
const router = require("./router");

// 🗣️ "Montamos el router en el prefijo '/api'"
// Esto significa que la ruta será POST /api/saludo
app.use("/api", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  console.log("   Ruta activa: POST /api/saludo");
});
