const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  name: String,
  qty: Number,
  price: Number,
  mode: String,
});

module.exports = mongoose.model("Order", orderSchema);