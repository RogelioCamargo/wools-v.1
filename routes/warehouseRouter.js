const express = require("express");
const router = express.Router(); 

const Warehouse = require("../models/warehouse");
const warehouseController = require("../controllers/warehouseController");
const productController = require("../controllers/productController");

router.get("/", warehouseController.warehouse_list); 

router.post("/create", warehouseController.warehouse_post); 

router.get("/:id", warehouseController.warehouse_get); 

router.put("/:id", warehouseController.warehouse_update); 

router.delete("/:id", warehouseController.warehouse_delete);

module.exports = router;