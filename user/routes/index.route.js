const router = require("express").Router();

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

router.get("/checkout", (req, res, next) => {
  res.render("checkout", { title: "Checkout", shop: "true" });
});

router.get("/shoppingCart", (req, res, next) => {
  res.render("shoppingCart", { title: "Shopping Cart", shop: "true" });
});

module.exports = router;
