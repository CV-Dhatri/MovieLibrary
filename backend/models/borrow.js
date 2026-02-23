const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  movie:{type:mongoose.Schema.Types.ObjectId,ref:"Movie"},
  borrowDate:{type:Date,default:Date.now},
  dueDate:Date,
  returnDate:Date,
  status:{type:String,enum:["borrowed","returned","overdue"],default:"borrowed"}
});

module.exports = mongoose.model("Borrow", borrowSchema);