const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const productController = require("../controllers/productController");

router.post("/create", productController.product_create_post);

router.get("/:id", productController.product_details);

router.put("/:id", productController.product_update_post);

router.delete("/:id", productController.product_delete);

module.exports = router;