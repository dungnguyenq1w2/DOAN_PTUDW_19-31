const router = require("express").Router();

const indexController = require("../controllers/index.controller");

router.get("/", indexController.getRetrieveTopCakes);

router.get("/user", (req, res, next) => {
  res.render("viewUser", { title: "User", which: "user" });
});

router.get("/user/update", (req, res, next) => {
  res.render("updateUser", { title: "User", which: "user" });
});

router.get("/about", (req, res, next) => {
  res.render("about", { title: "About", which: "about" });
});

router.get("/contact", (req, res, next) => {
  res.render("contact", { title: "Contact", which: "contact" });
});

router.get("/checkout", (req, res, next) => {
  res.render("checkout", { title: "Checkout", which: "shop" });
});

router.get("/shoppingCart", (req, res, next) => {
  res.render("shoppingCart", { title: "Shopping Cart", which: "shop" });
});

module.exports = router;
