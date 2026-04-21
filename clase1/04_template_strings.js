const nombre = "Ana";
const edad = 28;
const precio = 199.99;

// Expresiones dentro de template strings
const mensajePrecio = `El precio con descuento es $${precio * 0.9}.`;
console.log(mensajePrecio);

// Multilínea con template strings sin necesidad de caracteres especiales \n
const mensajeMultilinea = `Hola, mi nombre es ${nombre},
tengo ${edad} años y me encanta programar.`;
console.log(mensajeMultilinea);

// ========================
// USO EN BACKEND: logs y errores
// ========================
const usuario = 32;
const producto = "remera";

console.log(`[INFO] Usuario ${usuario} ha comprado el producto ${producto}.`);
console.log(
  `[ERROR] No se pudo procesar la compra del producto ${producto} para el usuario ${usuario}.`,
);
