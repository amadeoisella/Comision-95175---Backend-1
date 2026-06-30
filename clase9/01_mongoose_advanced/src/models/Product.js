import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio.'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio.'],
    min: 0
  },
  category: {
    type: String,
    required: [true, 'La categoría es obligatoria.']
  },
  tags: {
    type: [String], // Array de textos
    default: []
  },
  description: {
    type: String,
    default: 'Sin descripción'
  }
});

// 1. Índice Multikey: Se genera automáticamente en arrays. Lo definimos explícitamente para documentarlo
productSchema.index({ tags: 1 });

// 2. Índice de Texto: Permite búsquedas de texto completo en el campo name
productSchema.index({ name: 'text' });

export const Product = mongoose.model('Product', productSchema);
