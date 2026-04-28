// 02_modulo_path.js
// ══════════════════════════════════════════════════
// DEMO — Módulo path
// ══════════════════════════════════════════════════
// 🗣️ "Si alguna vez arreglaron un error de rutas que funcionaba en su Mac
//     pero rompía en el servidor de Linux de la empresa... path es la solución."
// ✍️ Correr con: node 02_modulo_path.js
// 💼 LABORAL: construir rutas para archivos de config, uploads, logs.
//            Sin path, un / vs \ entre Windows y Linux rompe tu app en producción.

const path = require('path');

// 🗣️ "__dirname es una variable mágica de Node: siempre sabe en qué carpeta estás."
console.log('📁 Directorio actual (__dirname):', __dirname);

// ─── path.join ───
// 🗣️ "path.join une partes de una ruta de forma inteligente.
//     No importa si el usuario pone / de más o de menos."
const rutaArchivo = path.join(__dirname, 'data', 'usuarios.json');
console.log('🔗 Ruta unida con join:', rutaArchivo);

// ─── path.basename ───
// 🗣️ "basename extrae solo el nombre del archivo, sin la carpeta completa.
//     Útil cuando procesas uploads y querés guardar solo el nombre."
console.log('📝 Nombre del archivo:', path.basename(rutaArchivo)); // usuarios.json
console.log('📝 Solo extensión:', path.extname(rutaArchivo));      // .json

// ─── path.dirname ───
console.log('📁 Solo la carpeta:', path.dirname(rutaArchivo));

// ─── path.resolve ───
// 🗣️ "resolve genera la ruta absoluta real del sistema. Ideal para pasarle
//     al módulo fs cuando no sabés desde dónde se ejecuta el script."
const rutaAbsoluta = path.resolve('config', 'settings.json');
console.log('📌 Ruta absoluta resuelta:', rutaAbsoluta);
