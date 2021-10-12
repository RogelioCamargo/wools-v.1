const Product = require("../models/product");
const { body, validationResult } = require("express-validator");

exports.product_create_post = [
  body("name").not().isEmpty().withMessage("Name field required").trim(),
  async (req, res, next) => {
    const { warehouse } = req.body; 
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash("error", "Please fill all required fields");
      res.redirect(`/warehouses/${warehouse}`);
      return;
    }

    try {
      const product = await Product.create(req.body); 
      return res.redirect(`/warehouses/${warehouse}`);
    } catch (err) {
      return next(err); 
    }
  }
];


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
