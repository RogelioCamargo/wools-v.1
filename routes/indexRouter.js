const express = require('express');
const router = express.Router();
const async = require("async");
const map = require("async/map");

// import model(s)
const Warehouse = require("../models/warehouse");
const Product = require("../models/product");
const Comment = require("../models/comment");

router.get('/', (req, res, next) => {
  return res.redirect("/dashboard");
});

router.get("/dashboard", async (req, res, next) => {
  console.log(req.flash("warnings"));
  try {
    const warehouses = await Warehouse.find({});
    res.render("./warehouses/dashboard", { title: "Dashboard", warehouses });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
