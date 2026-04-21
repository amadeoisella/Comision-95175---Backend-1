// ==========================
// 1. Operador Nullish (??) vs OR (||)
// ==========================
// Queremos dar un valor por defecto si falla algo
let limite = 0; // Para el paginado de la base de datos

// Usando OR (||): Si es falsy (0 o "" como validos. SOLO reemplaza si es Null / Undefined)
console.log("Usando OR:", limite || 10); // Da 10 (Porque 0 es falsy, pero 0 era valido)
