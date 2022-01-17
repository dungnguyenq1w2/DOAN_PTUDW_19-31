const cartModel = require('../models/cart.model');
const orderModel = require('../models/order.model');
const mongoose = require("mongoose");
const cakeModel = require("../models/cake.model");

const postCheckOut = async (user, body) => {
  const { firstName, lastName, country, street, number, city, state, phone, note } = body;

  try {
    const cart = await cartModel
      .findOne({
        user: user._id,
        isArchived: false
      })
      .lean();

    const wares = [];
    let total = 0;

    for (const ware of cart.wares) {
      wares.push({
        cake: mongoose.Types.ObjectId(ware.cake),
        quantity: ware.quantity
      });

      const {price} = await cakeModel.findById(ware.cake.toString(), 'price');
      total += price * ware.quantity;
    }

    const updatedCart = await cartModel
      .findOneAndUpdate( { user: user._id, isArchived: false }, { isArchived: true });

    const order = await orderModel.create({
      orderer: user._id,
      total,
      name: {
        first: firstName,
        last: lastName
      },
      address: {
        number,
        street,
        city,
        state,
        country
      },
      phone,
      note,
      wares
    });

    return order;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  postCheckOut
}