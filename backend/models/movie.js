const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title:String,
  genre:String,
  director:String,
  cast:[String],
  language:String,
  duration:Number,
  releaseYear:Number,
  rating:{type:Number,default:0},
  stockQuantity:{type:Number,default:1},
  synopsis:String
},{timestamps:true});

module.exports = mongoose.model("Movie", movieSchema);