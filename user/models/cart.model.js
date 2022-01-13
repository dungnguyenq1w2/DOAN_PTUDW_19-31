const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  wares: [
    {
      cake: {
        type: Schema.Types.ObjectId,
        ref: 'Cake'
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
});

const cartModel = mongoose.model('Cart', cartSchema, 'carts');

module.exports = cartModel;