const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/signIn", function (req, res, next) {
  res.render("user/signIn", { title: "Sign In", home: "true" });
});

router.get("/signUp", (req, res, next) => {
  res.render("user/signUp", { title: "Sign Up", home: "true" });
});

module.exports = router;
