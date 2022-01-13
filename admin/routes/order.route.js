const router = require("express").Router();

const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get(
  "/",
  authMiddleware.adminMiddleware,
  orderController.getRetrieveOrders
);
// router.get(
//   "/statictics",
//   authMiddleware.adminMiddleware,
//   orderController.getRetrieveOrders
// );

module.exports = router;
