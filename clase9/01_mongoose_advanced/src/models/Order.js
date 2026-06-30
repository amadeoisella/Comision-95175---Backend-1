import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// 1. Índice compuesto: Para búsquedas que filtren por estado y ordenen por fecha
orderSchema.index({ status: 1, date: -1 });

// 2. Middleware PRE para automatizar populate del campo user (restringido a campos necesarios)
orderSchema.pre(['find', 'findOne'], function(next) {
  // Poblamos solo username y email, excluyendo datos innecesarios
  this.populate('user', 'username email');
  next();
});

export const Order = mongoose.model('Order', orderSchema);
