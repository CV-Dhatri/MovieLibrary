const Borrow = require("../models/borrow");
const Movie = require("../models/Movie");
const Notification = require("../models/notification");

// POST /api/borrows - Borrow a movie
exports.borrowMovie = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.user.id; 

    // 1. Find the movie
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    // 2. Check stock quantity
    if (movie.stockQuantity <= 0) {
      return res.status(400).json({ message: "Movie is out of stock" });
    }

    // 3. Check if member has < 3 active borrows
    const activeBorrows = await Borrow.countDocuments({ 
      user: userId, 
      status: { $in: ["borrowed", "overdue"] } 
    });
    
    if (activeBorrows >= 3) {
      return res.status(400).json({ message: "Borrow limit reached (Max 3)" });
    }

    // 4. Set Due Date (7 days from today)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    // 5. Create Borrow Record
    const borrowRecord = await Borrow.create({
      user: userId,
      movie: movieId,
      dueDate: dueDate
    });

    // 6. Decrease Movie Stock
    movie.stockQuantity -= 1;
    await movie.save();

    // 7. Trigger Notification (Coordinate with Member 5 for specific format)
    await Notification.create({
      user: userId,
      message: `You have successfully borrowed ${movie.title}. It is due on ${dueDate.toDateString()}.`
    });

    res.status(201).json({ success: true, data: borrowRecord });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/borrows/:id/return - Return a movie
exports.returnMovie = async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id);
    if (!borrow || borrow.status === "returned") {
      return res.status(404).json({ success: false, message: "Active borrow record not found" });
    }

    // Set return date and check if overdue
    borrow.returnDate = new Date();
    if (borrow.returnDate > borrow.dueDate) {
      borrow.status = "overdue"; 
    } else {
      borrow.status = "returned";
    }

    await borrow.save();

    // Increase stock by 1 using $inc
    await Movie.findByIdAndUpdate(borrow.movie, { $inc: { stockQuantity: 1 } });

    res.status(200).json({ success: true, message: "Movie returned successfully", borrow });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Get Personal History
// @route   GET /api/borrows/my-history
exports.getMyBorrowHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await Borrow.find({ user: userId }).populate("movie", "title genre");
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Get All Borrows (Admin Only)
exports.getAllBorrows = async (req, res) => {
  try {
    const records = await Borrow.find()
      .populate("user", "name email")
      .populate("movie", "title stockQuantity");
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Get Overdue Records (Admin Only)
exports.getOverdueBorrows = async (req, res) => {
  try {
    const overdue = await Borrow.find({ 
      $or: [
        { status: "overdue" },
        { status: "borrowed", dueDate: { $lt: new Date() } }
      ]
    }).populate("user", "name").populate("movie", "title");
    
    res.status(200).json({ success: true, data: overdue });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};