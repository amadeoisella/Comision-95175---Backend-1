// 04_modulo_crypto.js
// ══════════════════════════════════════════════════
// DEMO — Módulo crypto: hashing y tokens seguros
// ══════════════════════════════════════════════════
// 🗣️ "¿Cómo guarda Netflix tu contraseña? No la guarda. Guarda su 'huella digital'.
//     Si alguien hackea su base de datos, solo ve hashes sin sentido."
// ✍️ Correr con: node 04_modulo_crypto.js
// 💼 LABORAL: hashear contraseñas, generar tokens de reseteo, IDs únicos de sesión.

const crypto = require('crypto');

// ─── 1. HASH SHA-256 ───
// 🗣️ "SHA-256 es como una licuadora de texto: entra 'miPassword123',
//     sale siempre el mismo string de 64 caracteres. Es IRREVERSIBLE."
const contrasena = 'miPassword123';
const hash = crypto.createHash('sha256').update(contrasena).digest('hex');
console.log('🔑 Contraseña original :', contrasena);
console.log('🔒 Hash SHA-256        :', hash);

// 🗣️ "Prueben cambiar aunque sea UNA letra en la contraseña.
//     El hash que sale es completamente diferente. Así la BD está protegida."
const contrasenaModificada = 'miPassword124';
const hashModificado = crypto.createHash('sha256').update(contrasenaModificada).digest('hex');
console.log('\n🔑 Contraseña cambiada :', contrasenaModificada);
console.log('🔒 Hash completamente diferente:', hashModificado);

// ─── 2. GENERAR TOKEN ALEATORIO ───
// 🗣️ "¿Alguna vez les llegó un email de 'Recuperar contraseña' con un link rarísimo?
//     Ese link lleva adentro un token así. Es único, irrepetible e impredecible."
const token = crypto.randomBytes(32).toString('hex');
console.log('\n🎟️  Token de reseteo generado:', token);
console.log('   (Esto se guardaría en BD con expiración de 15 minutos)');

// ─── 3. HMAC (Hash con clave secreta) ───
// 🗣️ "HMAC es el hash con firma. Garantiza que el mensaje no fue alterado.
//     Lo usan los JWT (JSON Web Tokens) que veremos en clase de autenticación."
const claveSecreta = 'mi-super-secreto-del-servidor';
const mensaje = JSON.stringify({ userId: 42, rol: 'admin' });
const hmac = crypto.createHmac('sha256', claveSecreta).update(mensaje).digest('hex');
console.log('\n📨 Mensaje           :', mensaje);
console.log('✍️  Firma HMAC       :', hmac);
console.log('   (El servidor verifica esta firma para saber si el token es auténtico)');
