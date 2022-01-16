const cartService = require('../services/cart.service');

const putUpdateCart = async (req, res) => {
  const { localStorage } = req.body;

  if (req.user) {
    await cartService.updateInstantCart(req.user, localStorage);
  }
};

module.exports = {
  putUpdateCart
}