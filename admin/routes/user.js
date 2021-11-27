const express = require("express");
const router = express.Router();

router.get("/userList", (req, res, next) => {
  res.render("user/userList_admin", { title: "Users List - Admin", userList: true });
});

router.get("/user", (req, res, next) => {
  res.render("user/user_admin", { title: "User - Admin", user: true });
});

module.exports = router;
