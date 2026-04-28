// 03_modulo_http.js
// ══════════════════════════════════════════════════
// DEMO — Módulo http: Servidor básico en Node.js
// ══════════════════════════════════════════════════
// 🗣️ "Hoy vamos a levantar nuestro PRIMER servidor sin instalar nada extra.
//     Sin Express, sin frameworks. Solo Node.js puro. Esto es el corazón de todo."
// ✍️ Correr con: node 03_modulo_http.js
//   Luego abrir en el navegador: http://localhost:3000
//   Probar también:              http://localhost:3000/saludo
// 💼 LABORAL: entender cómo funciona HTTP por dentro antes de usar Express.
//             Express es solo una envoltura elegante de este módulo.

const http = require('http');

// 🗣️ "createServer recibe una función que se ejecuta CADA vez que llega un pedido.
//     Esa función siempre recibe dos objetos: req (el pedido) y res (la respuesta)."
const server = http.createServer((req, res) => {

  console.log(`🌐 Pedido recibido: ${req.method} ${req.url}`);

  // 🗣️ "Según la URL que llega, respondemos diferente. Esto es el ROUTING manual."
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('¡Hola desde Node.js! Bienvenido al servidor.\n');

  } else if (req.url === '/saludo') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    // 🗣️ "En una API real responderíamos JSON, no texto plano.
    //     Acá simulamos lo que haría un endpoint de nuestro backend."
    res.end(JSON.stringify({ mensaje: '¡Hola, futuro dev backend!', fecha: new Date() }));

  } else {
    // 🗣️ "Si la ruta no existe, mandamos 404. Esto es lo que hace Express por default."
    res.statusCode = 404;
    res.end('Ruta no encontrada.\n');
  }
});

// 🗣️ "listen le dice al servidor en qué puerto 'escuchar'.
//     El 3000 es el puerto favorito para desarrollo. En producción suele ser 80 o 443."
server.listen(3000, () => {
  console.log('🚀 Servidor escuchando en http://localhost:3000');
  console.log('   Probá: http://localhost:3000/ y http://localhost:3000/saludo');
  console.log('   Para detener: Ctrl + C');
});
