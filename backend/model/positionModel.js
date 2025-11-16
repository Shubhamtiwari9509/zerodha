const {model}=require("mongoose");
const {positionSchema}=require("../schemas/positionSchema");
const position =model("position",positionSchema);
module.exports={position};