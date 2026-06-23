import mongoose from 'mongoose';

/**
 * Definición del Schema del Producto (ProductSchema)
 * Especifica la estructura de los documentos en la colección y sus reglas de validación.
 */
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio.'],
    trim: true // Limpia espacios al inicio y final
  },
  price: {
    type: Number,
    required: [true, 'El precio del producto es obligatorio.'],
    min: [0, 'El precio no puede ser menor a 0.'] // Validación numérica integrada
  },
  category: {
    type: String,
    required: [true, 'La categoría del producto es obligatoria.'],
    // Validación por expresión regular integrada: solo letras (mayúsculas o minúsculas)
    match: [/^[A-Za-z]+$/, 'La categoría solo debe contener letras sin números ni caracteres especiales.']
  },
  code: {
    type: String,
    required: [true, 'El código del producto es obligatorio.'],
    unique: true, // Asegura que no haya códigos de barras o SKU duplicados en la colección
    // Validador Personalizado (Custom Validator)
    validate: {
      validator: function(v) {
        // El código debe coincidir estrictamente con el patrón 'PROD-XXXX' (donde X son 4 números)
        return /^PROD-\d{4}$/.test(v);
      },
      message: props => `El código "${props.value}" no tiene un formato válido. Debe ser similar a PROD-1234.`
    }
  },
  description: {
    type: String,
    default: 'Sin descripción adicional' // Opción default
  },
  isDeleted: {
    type: Boolean,
    default: false // Campo para implementar el soft delete (eliminación lógica)
  },
  createdAt: {
    type: Date,
    default: Date.now // Guarda automáticamente la fecha de creación del documento
  }
});

// Mongoose construirá la colección pluralizada: 'products'
export const Product = mongoose.model('Product', productSchema);
