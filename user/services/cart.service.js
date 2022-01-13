const mongoose = require('mongoose');

const cartModel = require('../models/cart.model');
const {mongo} = require("mongoose");

const updateCart = async (user, rawLocalStorage) => {
  const localStorage = JSON.parse(rawLocalStorage);
  const productsInCart = Object.values(JSON.parse(localStorage.productsInCart));

  const instantWares = productsInCart.map(product => {
    const ware = {};
    ware.cake = mongoose.Types.ObjectId(product.id);
    ware.quantity = product.inCart;

    return ware;
  });

  try {
    const cart = await cartModel.findOne({ user: user._id });
    let dbWares = [];
    if (cart) {
      dbWares = cart.wares.map(dbWare => {
        const ware = {};
        ware.cake = mongoose.Types.ObjectId(dbWare.cake);
        ware.quantity = dbWare.quantity;

        return ware;
      })
    }

    for (let i = 0; i < instantWares.length; i++) {
      let found = false;
      for (let j = 0; j < dbWares.length; j++) {
        if (instantWares[i].cake.toString() === dbWares[j].cake.toString()) {
          dbWares[j].quantity = Math.max(instantWares[i].quantity, dbWares[j].quantity);
          found = true;
          break;
        }
      }

      if (!found) {
        dbWares.push(instantWares[i]);
      }
    }

    const updatedCart = await cartModel.findOneAndUpdate(
      { user: user._id },
      { wares: dbWares },
      { new: true, upsert: true });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  updateCart
}