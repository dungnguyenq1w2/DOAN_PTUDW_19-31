const router = require('express').Router();

const cartController = require('../controllers/cart.controller');
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.put('/cart/update',
  authMiddleware.authMiddleware,
  cartController.putUpdateCart
);

router.post('/checkout',
  authMiddleware.authMiddleware,
  orderController.postCheckOut
);

module.exports = router;