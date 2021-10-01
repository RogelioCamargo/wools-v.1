const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    warehouse: {
      type: Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ["Out of Stock", "Low Stock", "Medium Stock", "Fully Stocked"],
      default: "Fully Stocked",
    },
    type: {
      type: String,
      required: true,
      enum: ["Inventory", "Brand Packaging", "Ohi Packaging"],
      default: "Inventory",
    },
    brand: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
); 

ProductSchema.virtual("url").get(function () {
  return "/products/" + this._id;
}); 

ProductSchema.virtual("datePosted").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(
    DateTime.DATETIME_MED
  );
});


module.exports = mongoose.model("Product", ProductSchema);