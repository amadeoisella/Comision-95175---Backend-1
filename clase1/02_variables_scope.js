// ========================
// SCOPE: dónde vive cada variable
// ========================

let globalVar = "Soy global";

function mostrarScope() {
  let funcionVar = "Soy local a la función";

  if (true) {
    let bloqueVar = "Soy local al bloque";
    console.log(globalVar); // Accede a la variable global
    console.log(funcionVar);
    console.log(bloqueVar); // Accede a la variable del bloque
  }

  console.log(bloqueVar); // Error: bloqueVar no está definida
}

mostrarScope();
console.log(funcionVar); // Error: funcionVar no está definida
