const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  orderer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  total: {
    type: Number,
    default: 0
  },
  note: {
    type: String,
    default: null
  },
  delivery: {
    shipper: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    state: {
      type: String
    },
    address: {
      number: {
        type: Number
      },
      street: {
        type: String
      },
      ward: {
        type: String
      },
      district: {
        type: String
      },
      city: {
        type: String
      }
    },
    deliveredAt: {
      type: Date
    }
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const orderModel = mongoose.model('Order', orderSchema, 'orders');

module.exports = orderModel;