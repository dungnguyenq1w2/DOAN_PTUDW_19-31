const router = require("express").Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const passportMiddleware = require("../middlewares/passport.middleware");
const orderController = require("../controllers/order.controller");

router.get("/", authController.getIndex);

router.get("/signIn", authMiddleware.guestMiddleware, authController.getSignIn);

router.post(
  "/signIn",
  authMiddleware.guestMiddleware,
  passportMiddleware.authenticate("local", {
    successRedirect: "/cakes",
    failureRedirect: "/signIn",
  })
);

router.get(
  "/signOut",
  authMiddleware.adminMiddleware,
  authController.getSignOut
);

router.get(
  "/view",
  authMiddleware.adminMiddleware,
  authController.getRetrieveUser
);
router.get(
  "/statistics",
  authMiddleware.adminMiddleware,
  orderController.getRetrieveOrders
);

module.exports = router;
