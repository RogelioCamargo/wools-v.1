const Warehouse = require("../models/warehouse");
const Product = require("../models/product");
const async = require("async");

exports.warehouse_list = async (req, res, next) => {
  try {
    const warehouses = await Warehouse.find({}); 
    return res.send(warehouses); 
  } catch (err) {
    return next(err); 
  }
};

// Create
exports.warehouse_post = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.create(req.body); 
    return res.redirect("/dashboard");
  } catch (err) {
    return next(err);
  }
};

// Details
exports.warehouse_get = async (req, res, next) => {
  async.parallel({
    warehouse: (callback) => {
      Warehouse.findById(req.params.id).exec(callback);
    }, 
    products: (callback) => {
      Product.find({ warehouse: req.params.id }).exec(callback);
    }
  }, (err, results) => {
    if (err) return next(err); 

    let inventory = [];
    let brandPackaging = []; 
    let ohiPackaging = []; 
    const { warehouse, products } = results; 
    
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
      ohiPackaging 
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
