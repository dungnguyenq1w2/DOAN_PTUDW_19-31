const router = require("express").Router();

router.get("/signIn", function (req, res, next) {
  res.render("signIn", { title: "Sign In", which: 'home' });
});

router.get("/signUp", (req, res, next) => {
  res.render("signUp", { title: "Sign Up", which: 'home' });
});

module.exports = router;
