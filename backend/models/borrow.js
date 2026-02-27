const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  },
  borrowDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ["borrowed", "returned", "overdue"],
    default: "borrowed"
  }
}, { timestamps: true });

module.exports =
  mongoose.models.Borrow ||
  mongoose.model("Borrow", borrowSchema);