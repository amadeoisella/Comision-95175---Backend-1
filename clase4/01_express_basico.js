// ══════════════════════════════════════════════════
// 01_express_basico.js
// ✍️ Correr con: node 01_express_basico.js (o nodemon)
// 💼 LABORAL: express.json() es el middleware más usado en el mundo.
// ══════════════════════════════════════════════════

const express = require("express");

const app = express();

// 🗣️ "Middleware para que Express entienda JSON en el body de las peticiones"
app.use(express.json());

// Ruta GET '/' que responde con un mensaje JSON
// 🗣️ "req es lo que pide el cliente, res es cómo respondemos"
app.get("/", (req, res) => {
  res.json({ mensaje: "Bienvenido a la app Express básica" });
});

// Ruta POST '/echo' que responde con el mismo JSON recibido
// 🗣️ "Para probar esto necesitamos Postman o Thunder Client, el navegador por defecto hace GET"
app.post("/echo", (req, res) => {
  console.log("Body recibido:", req.body);
  res.json(req.body);
});

// Puerto de escucha
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor Express escuchando en http://localhost:${PORT}`);
  console.log("   Rutas: GET /  |  POST /echo");
});
