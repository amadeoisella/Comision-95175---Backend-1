// ==========================================
// Demo 01: CRUD Mongoose & Simulación CLI
// Archivo: index.js
// ==========================================

const mongoose = require('mongoose');

// 1. Definición del Esquema (Schema)
const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  categoria: { type: String, required: true, index: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true }
});

// 2. Creación del Modelo (Model)
const Producto = mongoose.model('Producto', productoSchema);

async function main() {
  try {
    // Nos conectamos a la base de datos local 'test'
    // La conexión se realiza de forma silenciosa para respetar la salida estándar (stdout)
    await mongoose.connect('mongodb://localhost:27017/test', {
      serverSelectionTimeoutMS: 5000
    });
  } catch (err) {
    console.error('❌ Error de conexión a MongoDB:', err.message);
    process.exit(1);
  }

  // Limpiamos la colección antes de la demo para que el resultado coincida exactamente
  // con la simulación esperada por la institución
  try {
    await Producto.deleteMany({});
  } catch (err) {
    console.error('❌ Error al limpiar la colección:', err.message);
  }

  const input = [];

  // Leemos desde la entrada estándar (stdin)
  process.stdin.on('data', data => {
    // Dividimos por saltos de línea y quitamos líneas vacías
    input.push(...data.toString().split('\n').filter(l => l.trim() !== ''));
  });

  // Al finalizar la entrada de datos (EOF o Ctrl+D)
  process.stdin.on('end', async () => {
    try {
      let idx = 0;

      // 1. Leemos el número N (cantidad de productos)
      const N = parseInt(input[idx++], 10);
      if (isNaN(N) || N <= 0) {
        console.error('❌ Error: El primer valor debe ser la cantidad N de productos.');
        await mongoose.disconnect();
        process.exit(1);
      }

      const productos = [];

      // 2. Parseamos las siguientes N líneas
      for (let i = 0; i < N; i++) {
        if (!input[idx]) {
          console.error('❌ Error: Datos incompletos. Se esperaban N productos.');
          await mongoose.disconnect();
          process.exit(1);
        }
        
        const [nombre, categoria, precio, stock] = input[idx++].split(' ');
        productos.push({
          nombre,
          categoria,
          precio: Number(precio),
          stock: Number(stock)
        });
      }

      // 3. Leemos la categoría para filtrar (última línea)
      const categoriaFiltro = input[idx++];
      if (!categoriaFiltro) {
        console.error('❌ Error: Falta la categoría de filtro final.');
        await mongoose.disconnect();
        process.exit(1);
      }

      // 4. Inserción masiva usando insertMany
      const inserted = await Producto.insertMany(productos);

      // 5. Lectura y Proyección para recuperar productos de esa categoría
      const resultados = await Producto.find({ categoria: categoriaFiltro });

      // 6. Salida Formateada por stdout
      console.log(inserted.length);
      console.log(resultados.length);

      resultados.forEach(p => {
        console.log(`${p.nombre} ${p.precio} ${p.stock}`);
      });

    } catch (error) {
      console.error('❌ Error durante la ejecución del CRUD:', error.message);
    } finally {
      // Nos desconectamos siempre al finalizar
      await mongoose.disconnect();
    }
  });
}

main();
