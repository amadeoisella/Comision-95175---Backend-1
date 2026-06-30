import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ ERROR CRÍTICO: La variable MONGODB_URI no está definida en .env');
  process.exit(1);
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.error('❌ Falló la conexión inicial a la base de datos:', error.message);
  }
};

const db = mongoose.connection;

// Enmascarar contraseña en la consola
const maskedURI = MONGODB_URI.replace(/:([^@]+)@/, ':****@');

db.on('connected', () => {
  console.log(`🟢 Mongoose: Conectado con éxito a MongoDB en: ${maskedURI}`);
});

db.on('error', (err) => {
  console.error('❌ Mongoose: Ocurrió un error en la conexión:', err.message);
});

db.on('disconnected', () => {
  console.log('⚠️ Mongoose: Conexión con la base de datos finalizada/desconectada.');
});
