import mongoose from 'mongoose';
import { connectDB } from './src/config/db.config.js';
import { User } from './src/models/User.js';
import { Product } from './src/models/Product.js';
import { Order } from './src/models/Order.js';

const mockUsers = [
  { username: 'amadeo_dev', email: 'amadeo@test.com', role: 'admin' },
  { username: 'sofia_m', email: 'sofia@test.com', role: 'user' },
  { username: 'carlos_g', email: 'carlos@test.com', role: 'user' },
  { username: 'laura_b', email: 'laura@test.com', role: 'user' },
  { username: 'martin_p', email: 'martin@test.com', role: 'user' },
  { username: 'juliana_r', email: 'juliana@test.com', role: 'user' },
  { username: 'lucas_s', email: 'lucas@test.com', role: 'user' },
  { username: 'maria_v', email: 'maria@test.com', role: 'user' },
  { username: 'daniel_t', email: 'daniel@test.com', role: 'user' },
  { username: 'florencia_h', email: 'florencia@test.com', role: 'user' }
];

const mockProducts = [
  { name: 'Notebook Gamer Pro', price: 1200, category: 'Computacion', tags: ['computadoras', 'gaming', 'premium'] },
  { name: 'Mouse Optico Inalambrico', price: 25, category: 'Perifericos', tags: ['oficina', 'inalambrico'] },
  { name: 'Teclado Mecanico RGB', price: 85, category: 'Perifericos', tags: ['gaming', 'rgb', 'premium'] },
  { name: 'Monitor 24 Pulgadas 144Hz', price: 210, category: 'Monitores', tags: ['oficina', 'gaming', 'hd'] },
  { name: 'Auriculares In-Ear Bluetooth', price: 45, category: 'Audio', tags: ['musica', 'deporte', 'bluetooth'] },
  { name: 'Parlante Inteligente Home', price: 95, category: 'Audio', tags: ['hogar', 'smart'] },
  { name: 'Impresora Multifuncion Laser', price: 180, category: 'Computacion', tags: ['oficina', 'laser'] },
  { name: 'Disco Externo SSD 1TB', price: 110, category: 'Almacenamiento', tags: ['premium', 'ssd', 'portatil'] },
  { name: 'Silla Gamer Ergonomica', price: 280, category: 'Hogar', tags: ['gaming', 'premium', 'oficina'] },
  { name: 'Escritorio Regulable Altura', price: 350, category: 'Hogar', tags: ['oficina', 'premium', 'hogar'] },
  { name: 'Soporte Monitor Articulado', price: 35, category: 'Accesorios', tags: ['oficina', 'accesorios'] },
  { name: 'Hub USB-C 7 en 1', price: 40, category: 'Accesorios', tags: ['accesorios', 'portatil'] },
  { name: 'Camara Web Full HD Pro', price: 75, category: 'Perifericos', tags: ['oficina', 'premium'] },
  { name: 'Microfono Condensador USB', price: 130, category: 'Audio', tags: ['musica', 'streaming', 'gaming'] },
  { name: 'Cable HDMI 2.1 3 metros', price: 15, category: 'Accesorios', tags: ['accesorios', 'hd'] },
  { name: 'Mochila Impermeable Notebook', price: 55, category: 'Accesorios', tags: ['portatil', 'viaje'] },
  { name: 'Pad Mouse XXL Antideslizante', price: 20, category: 'Accesorios', tags: ['gaming', 'oficina'] },
  { name: 'Lampara Escritorio Led Inteligente', price: 50, category: 'Hogar', tags: ['hogar', 'smart', 'led'] },
  { name: 'Estacion de Carga Inalambrica', price: 30, category: 'Accesorios', tags: ['accesorios', 'smart'] },
  { name: 'Gabinete ATX Mid Tower RGB', price: 90, category: 'Computacion', tags: ['gaming', 'rgb'] }
];

async function run() {
  console.log('🌱 Iniciando siembra de base de datos...');
  await connectDB();

  try {
    // 1. Limpiar colecciones
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('🧹 Colecciones limpiadas con éxito.');

    // 2. Insertar usuarios
    const users = await User.insertMany(mockUsers);
    console.log(`👤 Se crearon ${users.length} usuarios.`);

    // 3. Insertar productos
    const products = await Product.insertMany(mockProducts);
    console.log(`📦 Se crearon ${products.length} productos.`);

    // 4. Generar ordenes aleatorias
    const orderStatuses = ['completed', 'pending', 'cancelled'];
    const ordersToInsert = [];

    for (let i = 1; i <= 50; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomProductsCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 items
      const items = [];

      for (let j = 0; j < randomProductsCount; j++) {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        const qty = Math.floor(Math.random() * 3) + 1;
        items.push({
          product: randomProduct._id,
          quantity: qty,
          price: randomProduct.price
        });
      }

      const randomStatus = orderStatuses[Math.floor(Math.random() * orderStatuses.length)];
      const randomDaysAgo = Math.floor(Math.random() * 30);
      const date = new Date();
      date.setDate(date.getDate() - randomDaysAgo);

      ordersToInsert.push({
        orderNumber: `ORD-${1000 + i}`,
        user: randomUser._id,
        items,
        status: randomStatus,
        date
      });
    }

    const orders = await Order.insertMany(ordersToInsert);
    console.log(`🛒 Se crearon ${orders.length} órdenes.`);
    console.log('🌱 ¡Siembra de base de datos finalizada exitosamente!');
  } catch (error) {
    console.error('❌ Error sembrando base de datos:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Conexión a base de datos cerrada.');
    process.exit(0);
  }
}

run();
