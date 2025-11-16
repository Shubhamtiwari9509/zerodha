const mongoose = require("mongoose");
const { Schema } = mongoose;

const holdingSchema = new Schema({
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String,
  isLoss: Boolean, // optional
});

 
module.exports = holdingSchema;


