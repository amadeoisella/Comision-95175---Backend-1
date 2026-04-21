const verificarUsuario = () => {
  return new Promise((resolve, reject) => {
    console.log("Consumiendo base de datos...");
    setTimeout(() => {
      const todoOk = true;
      if (todoOk) resolve("Usuario encontrado.");
      else reject("Error: El usuario no existe");
    }, 3000);
  });
};

// ==========================
// 2. Usando THEN y CATCH
// ==========================
// verificarUsuario()
//  .then((resultado) => console.log("Exito: ", resultado))
//  .catch((error) => console.log("Fallo: ", error));

// ==========================
// 3. ASYNC / AWAIT (El estándar moderno hoy)
// ==========================
const iniciarSesion = async () => {
  try {
    // Al usuar await, el codigo pareciera frenarse aca hasta que la base de datos responda
    // pero Node.js sigue permitiendo otras tareas libres.
    const respuesta = await verificarUsuario();
    console.log("Async/Await: ", respuesta);
  } catch (error) {
    console.log("Async/Await Error: ", error);
  }
};

iniciarSesion();
