const Warehouse = require("../models/warehouse");
const Product = require("../models/product");
const Announcement = require("../models/announcement"); 
const async = require("async");
const { body, validationResult } = require("express-validator");

exports.warehouse_list = async (req, res, next) => {
  try {
    const warehouses = await Warehouse.find({}); 
    return res.send(warehouses); 
  } catch (err) {
    return next(err); 
  }
};

// Create
exports.warehouse_post = [
  body("name").not().isEmpty().withMessage("Name field required").trim(), 
  body("city").not().isEmpty().withMessage("City field required").trim(),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash("error", "Please fill all required fields");
      res.redirect("/dashboard");
      return;
    }

    try {
      const warehouse = await Warehouse.create(req.body); 
      return res.redirect("/dashboard");
    } catch (err) {
      return next(err);
    }
  }
];


// Details
exports.warehouse_get = async (req, res, next) => {
  async.parallel({
    warehouse: (callback) => {
      Warehouse.findById(req.params.id).exec(callback);
    }, 
    products: (callback) => {
      Product.find({ warehouse: req.params.id }).exec(callback);
    }, 
    announcements: (callback) => {
      Announcement.find({ warehouse: req.params.id }).populate("user").exec(callback); 
    }
  }, (err, results) => {
    if (err) return next(err); 

    let inventory = [];
    let brandPackaging = []; 
    let ohiPackaging = []; 
    const { announcements, warehouse, products } = results; 
    
    products.forEach(product => {
      if (product.type === "Inventory") 
        inventory.push(product); 
      else if (product.type === "Brand Packaging")
        brandPackaging.push(product); 
      else 
        ohiPackaging.push(product); 
    }); 

    res.render("./warehouses/warehouseDetails", { 
      title: "Warehouse",
      warehouse,
      inventory,
      brandPackaging, 
      ohiPackaging, 
      announcements
    }); 
  });
};

// Update
exports.warehouse_update = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.send(warehouse);
  } catch (err) {
    return next(err);
  }
};

// Delete
exports.warehouse_delete = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findByIdAndDelete(
      req.params.id,
    );
    return res.send("Success!");
  } catch (err) {
    return next(err);
  }
};
