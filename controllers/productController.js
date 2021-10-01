const Product = require("../models/product");

exports.product_create_post = async (req, res, next) => {
  try {
    const { warehouse } = req.body; 
    const product = await Product.create(req.body); 
    return res.redirect(`/warehouses/${warehouse}`);
  } catch (err) {
    return next(err); 
  }
};

exports.product_details = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
};


exports.product_update_post = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.send(product);
  } catch (err) {
    return next(err);
  }
};

exports.product_delete = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.send("Succuss!")
  } catch (err) {
    return next(err);
  }
};
