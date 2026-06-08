// ==========================================
// Demo 01: Servidor WebSocket Nativo con 'ws'
// ==========================================

const WebSocket = require('ws');

// Creamos un servidor WebSocket escuchando en el puerto 8080
const wss = new WebSocket.Server({ port: 8080 });

console.log('🚀 Servidor WebSocket escuchando en ws://localhost:8080');

// Escuchamos el evento 'connection' (cuando un cliente completa el handshake)
wss.on('connection', (ws, req) => {
  // Obtenemos información de los headers del handshake (útil para ver el upgrade)
  const clientIp = req.socket.remoteAddress;
  console.log(`\n✅ Nuevo cliente conectado desde IP: ${clientIp}`);
  console.log('Headers del Handshake recibidos:');
  console.log(' - Connection:', req.headers['connection']);
  console.log(' - Upgrade:', req.headers['upgrade']);
  console.log(' - Sec-WebSocket-Key:', req.headers['sec-websocket-key']);

  // Enviamos un saludo de bienvenida al cliente recién conectado
  ws.send('👋 ¡Bienvenido! Te has conectado con éxito al servidor WebSocket nativo.');

  // Escuchamos los mensajes entrantes desde este cliente específico
  ws.on('message', (message) => {
    // Los mensajes nativos de 'ws' llegan como Buffer binario por defecto.
    // Usamos toString() para decodificarlo a texto legible.
    const textMessage = message.toString();
    console.log(`📩 Mensaje recibido del cliente: "${textMessage}"`);

    // Enviamos una respuesta de tipo "Echo" de vuelta al cliente
    ws.send(`🤖 Eco del servidor: "${textMessage}"`);
  });

  // Escuchamos el evento de desconexión
  ws.on('close', () => {
    console.log('❌ El cliente ha cerrado la conexión.');
  });

  // Escuchamos posibles errores en el socket
  ws.on('error', (err) => {
    console.error('⚠️ Error en la conexión del cliente:', err.message);
  });
});
