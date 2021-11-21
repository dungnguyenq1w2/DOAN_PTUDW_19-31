const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/signIn", function (req, res, next) {
  res.render("user/signIn", { title: "Sign In" });
});

router.get("/signUp", (req, res, next) => {
  res.render("user/signUp", { title: "Sign Up" });
});

module.exports = router;
