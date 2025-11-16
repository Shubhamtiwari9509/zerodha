const {model}=require("mongoose");
const holdingSchema=require("../schemas/holdingSchema");
const holding= model("holding",holdingSchema);
module.exports={holding};

