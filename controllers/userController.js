const bcrypt = require("bcryptjs");
const passport = require("passport");

// import model(s)
const User = require("../models/user");

exports.user_login_get = (req, res, next) => {
  if (req.user) return res.redirect("/dashboard");
  res.render("login", { title: "Login" });
};

exports.user_login_post = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
  })(req, res, next);
};

exports.user_register_get = (req, res, next) => {
  if (req.user) return res.redirect("/dashboard");
  res.render("register", { title: "Register" });
};

exports.user_register_post = (req, res, next) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hashed) => {
    if (err) return next(err);

    const user = new User({
      username,
      password: hashed,
      member: false,
      admin: false,
    });

    user.save(err => {
      if (err) return next(err);

      res.redirect("/users/login");
    });
  });
};

exports.user_logout = (req, res) => {
  req.logout();
  res.redirect("/");
};