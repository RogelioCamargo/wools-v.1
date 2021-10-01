const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  warehouse: {
    type: Schema.Types.ObjectId,
    ref: "Warehouse",
  }, 
  firstName: {
    type: String,
  }, 
  lastName: {
    type: String
  }
}, {
  timestamps: true
});

UserSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
})

module.exports = mongoose.model("User", UserSchema);