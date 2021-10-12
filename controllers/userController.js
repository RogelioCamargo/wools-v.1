const bcrypt = require("bcryptjs");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

// import model(s)
const User = require("../models/user");

exports.user_login_get = (req, res, next) => {
  if (req.user) return res.redirect("/dashboard");
  console.log(req.flash("error"));
  res.render("login", { title: "Login", errors: [] });
};

exports.user_login_post = [
  body("username").not().isEmpty().withMessage("Username field required").trim().isLength({ min: 3 }).withMessage("Username must be at least 3 characters long").escape(),
  body("password").not().isEmpty().withMessage("Password field required").trim().isLength({ min: 3 }).withMessage("Password must be at least 3 characters long").escape(),
  (req, res, next) => {
    const errors = validationResult(req); 

    if (!errors.isEmpty()) {
      res.render("login", { title: "Login", errors: errors.array() }); 
      return;
    }

    passport.authenticate("login", {
      successRedirect: "/dashboard",
      failureRedirect: "/users/login",
      failureFlash: true,
    })(req, res, next);
  }
]


exports.user_register_get = (req, res, next) => {
  if (req.user) return res.redirect("/dashboard");
  res.render("register", { title: "Register", errors: [] });
};

exports.user_register_post = [
  body("username").not().isEmpty().withMessage("Username field required").trim().isLength({ min: 3 }).withMessage("Username must be at least 3 characters long").escape(),
  body("password").not().isEmpty().withMessage("Password field required").trim().isLength({ min: 3 }).withMessage("Password must be at least 3 characters long").escape(),
  (req, res, next) => {
    const errors = validationResult(req); 

    if (!errors.isEmpty()) {
      res.render("register", { title: "Register", errors: errors.array() }); 
      return;
    }
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
        if (err) {
          res.redirect("/users/register");
        }

        res.redirect("/users/login");
      });
    });
  }
];

exports.user_logout = (req, res) => {
  req.logout();
  res.redirect("/");
};