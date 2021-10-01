const express = require('express');
const router = express.Router();

// import controller
const userController = require("../controllers/userController");

router.get("/login", userController.user_login_get);

router.post("/login", userController.user_login_post);

router.get("/register", userController.user_register_get);

router.post("/register", userController.user_register_post);

router.get("/logout", userController.user_logout);

module.exports = router;
