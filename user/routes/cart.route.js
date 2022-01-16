const router = require('express').Router();

const cartController = require('../controllers/cart.controller');

router.put('/cart/update', cartController.putUpdateCart);

module.exports = router;