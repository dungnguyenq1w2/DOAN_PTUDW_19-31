const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  orderer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  total: {
    type: Number,
    default: 0,
  },
  name: {
    first: String,
    last: String,
  },
  address: {
    number: {
      type: String,
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  phone: {
    type: String,
  },
  note: {
    type: String,
    default: null,
  },
  wares: [
    {
      cake: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Cake",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const orderModel = mongoose.model("Order", orderSchema, "orders");

module.exports = orderModel;
