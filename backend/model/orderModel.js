const {model}=require("mongoose"); 
const { orderSchema } = require("../schemas/orderSchema");

const order=model("order",orderSchema);
module.exports={order};