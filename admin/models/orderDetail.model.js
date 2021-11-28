const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderDetailSchema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  },
  cake: {
    type: Schema.Types.ObjectId,
    ref: 'Cake'
  },
  quantity: {
    type: Number,
    default: 1
  }
});

const orderDetailModel = mongoose.model('OrderDetail', orderDetailSchema, 'orderDetails');

module.exports = orderDetailModel;