console.log("1. Pido plato a la Mesa 1 (Rapido)");
console.log("2. Pido plato a la Mesa 2 (Lento)");

// Simulamos una tarea lenta (como consultar una Base de Datos)
setTimeout(() => {
  console.log("--- Plato de la Mesa 2 LISTO (Asicronico) ---");
}, 3000); // 3 segundos de demora

console.log("3. Atendiendo la Mesa 3 mientras se cocina");
console.log("4. Atendiendo la Mesa 4");
