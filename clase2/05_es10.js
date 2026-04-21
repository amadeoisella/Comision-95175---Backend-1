// ==========================
// 1. Array.flat()
// ==========================
// Que pasa si me llega de una API un arreglo con arreglos adentro?
const datosSueltos = [1, 2, [3, 4, [5, 6]]];
// Extraerlos manualmente es complejo, flat() es la soluciona
console.log("Flat(1):", datosSueltos.flat());
console.log("Flat(2):", datosSueltos.flat(2));

// ==========================
// 2. Trimming: Limpiar basura de strings
// ==========================
const emailSucio = "   usuario@email.com";
console.log("Original:", `${emailSucio}`);
console.log("Trim:", `"${emailSucio.trim()}"`); // Limpia de inicio y final

// ==========================
// 3. Dynamic Import (import())
// ==========================
// Permite cargar pedazos de backend SOLO cuando la ruta o peticion lo necesita, limitando RAM requerida.
