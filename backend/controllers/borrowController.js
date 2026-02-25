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
    const borrowId = req.params.id;

    const borrowRecord = await Borrow.findById(borrowId);
    if (!borrowRecord) return res.status(404).json({ message: "Record not found" });
    if (borrowRecord.status === "returned") return res.status(400).json({ message: "Already returned" });

    // 1. Set return date to today
    const returnDate = new Date();
    borrowRecord.returnDate = returnDate;

    // 2. Determine if returned or overdue
    if (returnDate > borrowRecord.dueDate) {
      borrowRecord.status = "overdue";
    } else {
      borrowRecord.status = "returned";
    }
    await borrowRecord.save();

    // 3. Increase Movie Stock
    const movie = await Movie.findById(borrowRecord.movie);
    if (movie) {
      movie.stockQuantity += 1;
      await movie.save();
    }

    res.status(200).json({ success: true, data: borrowRecord });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/borrows/my-history
exports.getMyBorrowHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await Borrow.find({ user: userId }).populate("movie", "title genre");
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/borrows/all (Admin only)
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