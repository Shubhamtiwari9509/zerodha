const {Schema}=require("mongoose");
const orderSchema=new Schema({
      name: String,
    qty: Number,
    price: String,
    mode: String,
});
module.exports={orderSchema}