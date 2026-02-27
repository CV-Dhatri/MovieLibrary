const Borrow = require("../models/Borrow");
const Movie = require("../models/Movie");
const Notification = require("../models/Notification");


// ✅ BORROW MOVIE
exports.borrowMovie = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.user.id;

    // Validation
    if (!movieId) {
      return res.status(400).json({
        success: false,
        message: "Movie ID is required"
      });
    }

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }

    // Check stock
    if (movie.stockQuantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Movie is out of stock"
      });
    }

    // Check borrow limit (max 3)
    const activeBorrows = await Borrow.countDocuments({
      user: userId,
      status: { $in: ["borrowed", "overdue"] }
    });

    if (activeBorrows >= 3) {
      return res.status(400).json({
        success: false,
        message: "Borrow limit reached (Max 3 movies)"
      });
    }

    // Set due date (7 days)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    const borrowRecord = await Borrow.create({
      user: userId,
      movie: movieId,
      dueDate,
      status: "borrowed"
    });

    // Decrease stock
    movie.stockQuantity -= 1;
    await movie.save();

    // Create notification
    await Notification.create({
      user: userId,
      message: `You borrowed "${movie.title}". Due on ${dueDate.toDateString()}.`,
      type: "borrow"
    });

    res.status(201).json({
      success: true,
      data: borrowRecord
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ✅ RETURN MOVIE
exports.returnMovie = async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id);

    if (!borrow) {
      return res.status(404).json({
        success: false,
        message: "Borrow record not found"
      });
    }

    if (borrow.status === "returned") {
      return res.status(400).json({
        success: false,
        message: "Movie already returned"
      });
    }

    borrow.returnDate = new Date();
    borrow.status = "returned";

    await borrow.save();

    // Increase stock
    await Movie.findByIdAndUpdate(borrow.movie, {
      $inc: { stockQuantity: 1 }
    });

    res.status(200).json({
      success: true,
      message: "Movie returned successfully",
      data: borrow
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ✅ MY BORROW HISTORY
exports.getMyBorrowHistory = async (req, res) => {
  try {
    const history = await Borrow.find({ user: req.user.id })
      .populate("movie", "title genre releaseYear");

    res.status(200).json({
      success: true,
      data: history
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ✅ ADMIN: ALL BORROWS
exports.getAllBorrows = async (req, res) => {
  try {
    const records = await Borrow.find()
      .populate("user", "name email")
      .populate("movie", "title stockQuantity");

    res.status(200).json({
      success: true,
      data: records
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ✅ ADMIN: OVERDUE RECORDS
exports.getOverdueBorrows = async (req, res) => {
  try {
    const overdue = await Borrow.find({
      status: "overdue"
    })
      .populate("user", "name")
      .populate("movie", "title");

    res.status(200).json({
      success: true,
      data: overdue
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};