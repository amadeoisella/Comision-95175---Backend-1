// 07_ejercicio_servidor_http_crypto.js
// ══════════════════════════════════════════════════
// EJERCICIO FINAL — Servidor HTTP con rutas y hashing
// ══════════════════════════════════════════════════
// 🗣️ "Vamos a juntar TODO lo que vimos hoy en un solo ejercicio.
//     Esto es lo más parecido a lo que van a hacer en el mundo laboral."
// ✍️ Correr con: node 07_ejercicio_servidor_http_crypto.js
//   Luego probar en el navegador o con curl:
//   - http://localhost:3000/
//   - http://localhost:3000/hash?text=miTexto
//   - http://localhost:3000/info
//   - http://localhost:3000/rutaInventada  → 404
// 💼 LABORAL: este patrón (rutas + handlers + crypto) es la BASE de cualquier API.

const http   = require('http');
const crypto = require('crypto');
const url    = require('url');
const fs     = require('fs');
const path   = require('path');

// ─── LOG de cada petición (como middleware) ───
// 🗣️ "En Express esto lo hace Morgan automáticamente.
//     Acá lo hacemos a mano para entender qué pasa por debajo."
function logRequest(req) {
  const timestamp = new Date().toISOString();
  const logLine   = `[${timestamp}] ${req.method} ${req.url}\n`;
  console.log('📡', logLine.trim());
  // También guardamos el log en un archivo (módulo fs + path)
  const logPath = path.join(__dirname, 'server.log');
  fs.appendFileSync(logPath, logLine); // appendFile NO sobreescribe, agrega al final
}

// ─── SERVIDOR ───
const server = http.createServer((req, res) => {
  logRequest(req);

  // Parsear la URL y la query string
  const parsed = url.parse(req.url, true); // true = parsea query como objeto
  const ruta   = parsed.pathname;
  const query  = parsed.query;

  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // ─── RUTA: / ───
  if (ruta === '/') {
    res.statusCode = 200;
    res.end(JSON.stringify({ mensaje: 'Bienvenido al servidor HTTP minimal', version: '1.0.0' }));

  // ─── RUTA: /hash ───
  // 🗣️ "Recibe el texto por query string: /hash?text=miTexto
  //     Calcula el SHA-256 y lo devuelve. Así es cómo las APIs de firma funcionan."
  } else if (ruta === '/hash') {
    const texto = query.text;
    if (!texto) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Parámetro 'text' es requerido." }));
      return;
    }
    const hash = crypto.createHash('sha256').update(texto).digest('hex');
    res.statusCode = 200;
    res.end(JSON.stringify({ texto, hash }));

  // ─── RUTA: /info ───
  // 🗣️ "En aplicaciones reales, /health o /info es usado por los sistemas de monitoreo
  //     para verificar que el servidor está vivo. Muy común en microservicios."
  } else if (ruta === '/info') {
    res.statusCode = 200;
    res.end(JSON.stringify({
      plataforma: process.platform,
      nodeVersion: process.version,
      memoriaUsada: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
      uptime: `${Math.round(process.uptime())} segundos`
    }));

  // ─── 404 ───
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Ruta no encontrada.', rutaSolicitada: ruta }));
  }
});

server.listen(3000, () => {
  console.log('🚀 Servidor HTTP + Crypto escuchando en http://localhost:3000');
  console.log('   Rutas disponibles:');
  console.log('   → GET /              - Mensaje de bienvenida');
  console.log('   → GET /hash?text=X   - Hash SHA-256 del texto X');
  console.log('   → GET /info          - Info del servidor');
  console.log('   Los logs se guardan en server.log (módulo fs)');
  console.log('   Para detener: Ctrl + C');
});
