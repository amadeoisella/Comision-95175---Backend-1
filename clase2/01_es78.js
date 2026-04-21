// ==========================
// 1. Operador Exponencial (**) (ES7)
// ==========================
const base = 2;
const exponente = 3;
// Antes: Math.pow(2, 3);
const resultado = base ** exponente;
console.log(`2 a la 3 es: ${resultado}`); // 8

// ==========================
// 2. Array.includes() (ES7)
// ==========================
const roles = ["admin", "user", "guest"];
// Muy util para validar roles de usuarios en el Backend
console.log("Es admin?", roles.includes("admin")); // true
console.log("Es superadmin?", roles.includes("superadmin")); // false

// ==========================
// 3. Object.entries() y Object.values() (ES8)
// ==========================
const usuario = { nombre: "Ana", edad: 30, rol: "admin" };

// .entries() convierte el objeto en un array de pares [clave, valor]
console.log("Entries: ", Object.entries(usuario));

// .values() devuelve solo los valores
console.log("Values: ", Object.values(usuario));
