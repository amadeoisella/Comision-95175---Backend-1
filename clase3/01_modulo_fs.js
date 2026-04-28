// 01_modulo_fs.js
// ══════════════════════════════════════════════════
// DEMO — Módulo fs (File System)
// ══════════════════════════════════════════════════
// 🗣️ "El módulo fs es como el conserje de nuestro servidor.
//     Le decimos 'leeme este archivo' o 'escribí este dato' y lo hace."
// ✍️ Correr con: node 01_modulo_fs.js
// 💼 LABORAL: leer configs, guardar logs, generar reportes CSV en el servidor.

const fs = require('fs');
const path = require('path');

// ─── LECTURA SÍNCRONA (bloqueante) ───
// 🗣️ "Existe leer de forma bloqueante: espera hasta terminar, luego sigue."
const contenido = fs.readFileSync('package.json', 'utf8');
console.log('📄 Leí el package.json. Primeros 80 chars:', contenido.slice(0, 80));

// ─── ESCRITURA DE ARCHIVO ───
// 🗣️ "Y también escribir. Imaginen que esto guarda el registro de un usuario nuevo."
const datos = JSON.stringify({ usuario: 'Ana', rol: 'admin', creado: new Date() }, null, 2);
fs.writeFileSync('log_usuario.json', datos);
console.log('✅ Archivo log_usuario.json creado exitosamente.');

// ─── LECTURA ASÍNCRONA (no bloqueante — la forma correcta en Node) ───
// 🗣️ "Pero la forma CORRECTA en Node es la asincrónica. Node sigue trabajando
//     mientras espera que el disco termine. Esto es el verdadero poder."
fs.readFile('log_usuario.json', 'utf8', (err, data) => {
  if (err) {
    console.error('❌ Error al leer:', err.message);
    return;
  }
  const usuario = JSON.parse(data);
  console.log('🔍 Usuario leído de forma asíncrona:', usuario.usuario, '— rol:', usuario.rol);
});

console.log('⚡ Esta línea se imprime ANTES de que fs termine de leer. (¡Asincronismo!)');
