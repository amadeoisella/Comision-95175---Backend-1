// 05_npm_packagejson.js
// ══════════════════════════════════════════════════
// DEMO — NPM, package.json y Semver
// ══════════════════════════════════════════════════
// 🗣️ "Vamos a crear nuestro primer proyecto Node.js profesional desde cero.
//     Este es el flujo real que van a repetir en CADA trabajo que tengan."
//
// ✍️ HACER EN TERMINAL (no en Node, son comandos de npm):
//
// PASO 1: Inicializar el proyecto
// ─────────────────────────────────────────────────
//   $ mkdir mi-proyecto && cd mi-proyecto
//   $ npm init -y
//
//   🗣️ "npm init -y crea el package.json automáticamente con valores por defecto.
//       La flag -y significa 'yes a todo'. Sin ella, les pregunta nombre, versión, etc."
//
// PASO 2: Instalar una dependencia
// ─────────────────────────────────────────────────
//   $ npm install express
//
//   🗣️ "Acá NPM va a internet, baja Express desde el registro oficial (npmjs.com),
//       lo guarda en node_modules/ y lo registra en package.json bajo 'dependencies'."
//
// PASO 3: Ver el package.json generado
// ─────────────────────────────────────────────────
//   $ cat package.json
//
//   🗣️ "Van a ver algo así:"

const ejemploPackageJson = {
  "name": "mi-proyecto",
  "version": "1.0.0",
  "description": "Mi primer proyecto Node.js profesional",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"   // Para desarrollo con auto-restart
  },
  "dependencies": {
    "express": "^4.18.2"        // ^ significa: acepta 4.x.x pero NO 5.x.x
  },
  "devDependencies": {
    "nodemon": "^3.0.1"         // Solo en desarrollo, NO va a producción
  }
};

console.log('📦 Ejemplo de package.json:');
console.log(JSON.stringify(ejemploPackageJson, null, 2));

// ─── SEMVER — Versionado Semántico ───
console.log('\n📐 SEMVER — ¿Qué significa "^4.18.2"?');
console.log('   Formato: MAJOR.MINOR.PATCH');
console.log('   MAJOR (4): Cambio que ROMPE compatibilidad. ¡Cuidado al actualizar!');
console.log('   MINOR (18): Nueva funcionalidad compatible. Seguro de actualizar.');
console.log('   PATCH (2): Corrección de bug. Siempre conviene actualizar.');
console.log('\n   ^ (caret):  acepta >=4.18.2 <5.0.0  → actualiza MINOR y PATCH');
console.log('   ~ (tilde):  acepta >=4.18.2 <4.19.0 → solo actualiza PATCH');

// 🗣️ "Ejercicio mental: ¿Qué versiones acepta ^2.5.0?"
// Respuesta: desde 2.5.0 hasta cualquier 2.x.x, pero nunca 3.0.0

// PASO 4: Instalar solo dependencias de producción
// ─────────────────────────────────────────────────
// 🗣️ "En el servidor de producción, ¿instalamos nodemon? NO.
//     Por eso existe devDependencies. Para instalar solo producción:"
//   $ npm install --production
//   o
//   $ npm ci  (instalación limpia y reproducible, la favorita en CI/CD)
