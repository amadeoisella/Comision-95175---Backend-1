// ========================
// ARROW FUNCTIONS
// ========================

const multiplicar = (a, b) => a * b;
console.log(multiplicar(5, 3)); // Output: 15

// Implicit return (una sola expresión)
const cuadrado = (x) => x * x;
console.log(cuadrado(4)); // Output: 16

// Un parametro sin paréntesis
const doble = (x) => x * 2;
console.log(doble(6)); // Output: 12

// Sin parámetros
const saludar = () => "¡Hola!";
console.log(saludar()); // Output: ¡Hola!

// ========================
// DIFERENCIA CLAVE: this
// ========================

const persona = {
  nombre: "Carlos",

  // Funcion tradicional: this se refiere al objeto persona
  saludarTradicional: function () {
    console.log(`Hola, soy ${this.nombre}`);
  },

  // Arrow function: this se refiere al contexto de ejecución (global o módulo)
  saludarArrow: () => {
    console.log(`Hola, soy ${this.nombre}`); // this.nombre es undefined
  },
};

persona.saludarTradicional(); // Output: Hola, soy Carlos
persona.saludarArrow(); // Output: Hola, soy undefined
