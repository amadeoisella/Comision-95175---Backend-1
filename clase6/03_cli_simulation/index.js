// ==========================================
// Demo 03: Simulación CLI de Recepción de Mensajes
// Archivo: index.js
// ==========================================

const readline = require('readline');

// Creamos la interfaz para leer líneas desde la entrada estándar (stdin)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let totalMessages = -1;
const messages = [];

console.log('📝 Simulación CLI iniciada. Ingrese los datos en formato estándar:');
console.log('1. Ingrese la cantidad N de mensajes.');
console.log('2. Ingrese cada mensaje en el formato: nombre_usuario mensaje\n');

rl.on('line', (line) => {
  const trimmedLine = line.trim();
  
  // 1. Capturamos la primera línea que contiene la cantidad de mensajes N
  if (totalMessages === -1) {
    totalMessages = parseInt(trimmedLine, 10);
    
    // Validación de N
    if (isNaN(totalMessages) || totalMessages < 1 || totalMessages > 100) {
      console.error('❌ Error: Ingrese un número entero válido para N (entre 1 y 100).');
      totalMessages = -1; // Reset para re-intentar
    }
    return;
  }

  // 2. Capturamos los mensajes individuales
  if (messages.length < totalMessages) {
    // Buscamos el primer espacio en la línea para separar el usuario del cuerpo del mensaje.
    // 'nombre_usuario' es una cadena sin espacios (primer token).
    // 'mensaje' es todo el texto posterior.
    const spaceIndex = trimmedLine.indexOf(' ');
    
    if (spaceIndex === -1) {
      console.warn('⚠️ Advertencia: Formato inválido. Debe contener "nombre_usuario mensaje" con un espacio.');
      return;
    }

    const usuario = trimmedLine.slice(0, spaceIndex).trim();
    const texto = trimmedLine.slice(spaceIndex + 1).trim();

    // Validamos límites indicados por el problema (20 caracteres para usuario, 100 para mensaje)
    if (usuario.length > 20) {
      console.error('❌ Error: El nombre de usuario tiene un máximo de 20 caracteres.');
      return;
    }
    if (texto.length > 100) {
      console.error('❌ Error: El mensaje tiene un máximo de 100 caracteres.');
      return;
    }

    // Almacenamos el mensaje procesado
    messages.push({ usuario, texto });
  }

  // 3. Una vez alcanzados los N mensajes, mostramos el resultado y cerramos la entrada
  if (messages.length === totalMessages) {
    console.log('\n--- 📤 RESULTADO (stdout) ---');
    messages.forEach((msg) => {
      console.log(`[${msg.usuario}]: ${msg.texto}`);
    });
    console.log('-----------------------------\n');
    
    rl.close();
  }
});
