const express = require("express");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: "所有欄位都是必填。" });
  }
  if (password !== confirmPassword) {
    errors.push({ message: "密碼與確認密碼不相符！" });
  }
  if (errors.length) {
    return res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  }

  User.findOne({ email })
    .lean()
    .then((user) => {
      if (user) {
        req.flash('warning_msg','此用戶已存在')
        return res.render("register", {
          name,
          password,
          confirmPassword,
          email,
        });
      } else {
        return bcrypt
          .genSalt(10)
          .then((salt) => bcrypt.hash(password, salt))
          .then((hash) => {
            User.create({
              name,
              email,
              password: hash,
            });
          })
          .then(() => res.redirect("/users/login"))
          .catch((e) => console.log(e));
      }
    });
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "你已經成功登出。");
  res.redirect("/users/login");
});
module.exports = router;
