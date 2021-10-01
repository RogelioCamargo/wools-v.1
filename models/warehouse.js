const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WarehouseSchema = new Schema({
  name: {
    type: String,
  },
  city: {
    type: String, 
    required: true,
  }, 
  state: {
    type: String
  }
}); 

WarehouseSchema.virtual("url").get(function () {
  return "/warehouses/" + this._id;
}); 

WarehouseSchema.virtual("location").get(function () {
  return this.city + ", " + this.state;
})

module.exports = mongoose.model("Warehouse", WarehouseSchema);

