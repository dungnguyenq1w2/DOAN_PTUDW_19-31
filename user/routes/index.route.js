const router = require("express").Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "Cake", which: 'home' });
});

router.get("/about", (req, res, next) => {
  res.render("about", { title: "About", which: 'about' });
});

router.get("/contact", (req, res, next) => {
  res.render("contact", { title: "Contact", which: 'contact' });
});

router.get("/checkout", (req, res, next) => {
  res.render("checkout", { title: "Checkout", which: 'shop' });
});

router.get("/shoppingCart", (req, res, next) => {
  res.render("shoppingCart", { title: "Shopping Cart", which: 'shop' });
});

module.exports = router;
