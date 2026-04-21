// ========================
// CLASE CON VALIDACIONES Y MANEJO DE ERRORES
// ========================

class Usuario {
  constructor(nombre, email, edad) {
    this.nombre = nombre;
    this.email = email;
    this.edad = edad;
  }

  setEdad(nuevaEdad) {
    if (typeof nuevaEdad !== "number" || nuevaEdad < 0) {
      throw new Error("La edad debe ser un número positivo");
    }
    this.edad = nuevaEdad;
    console.log(`Edad actualizada a ${this.edad}`);
  }

  setEmail(nuevoEmail) {
    if (!nuevoEmail.includes("@")) {
      throw new Error("El email debe contener '@'");
    }
    this.email = nuevoEmail;
    console.log(`Email actualizado a ${this.email}`);
  }
}

const usuario1 = new Usuario("Juan", "juan@example.com", 25);

// Caso exitoso
try {
  usuario1.setEdad(30);
  console.log(`Edad actual: ${usuario1.edad}`);
} catch (error) {
  console.error(`Error al actualizar la edad: ${error.message}`);
}
