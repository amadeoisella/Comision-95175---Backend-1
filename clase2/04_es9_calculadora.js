// RETO: Calculadora que solo devuelve Promesas cumplidas si el resultado es Positivo (> 0)
// Vamos a usar rest/spread (...) para poder mandarle muchisimos numeros a la vez.

const calculadoraPositiva = (...numeros) => {
  return new Promise((resolve, reject) => {
    // sumar todo el arreglo usando reduce (o ciclo for)
    const suma = numeros.reduce((acumulador, actual) => acumulador + actual, 0);

    setTimeout(() => {
      if (suma > 0) resolve(`La suma es positiva: ${suma}`);
      else reject(`Error: La suma no es positiva (${suma})`);
    }, 3000);
  });
};

const procesarCalculo = async () => {
  try {
    const res = await calculadoraPositiva(1, -5, 2);
    console.log("Resultado: ", res);
  } catch (error) {
    console.log(error);
  } finally {
    console.log(" ---  Operacion de la Calculadora FINALIZADA ---");
  }
};

procesarCalculo();
