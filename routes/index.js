var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Cake", home: "true" });
});

router.get("/signIn", function (req, res, next) {
  res.render("signIn", { title: "Sign In", signIn: "true" });
});

router.get("/about", (req, res, next) => {
  res.render("about", { title: "About", about: "true" });
});

router.get("/contact", (req, res, next) => {
  res.render("contact", { title: "Contact", contact: "true" });
});

router.get("/shop", (req, res, next) => {
  res.render("shop", { title: "Shop", shop: "true" });
});

router.get("/checkout", (req, res, next) => {
  res.render("checkout", { title: "Checkout", checkout: "true" });
});

router.get("/shoppingCart", (req, res, next) => {
  res.render("shoppingCart", { title: "Shopping Cart" });
});

router.get("/product", (req, res, next) => {
  res.render("product", { title: "Product" });
});

module.exports = router;
