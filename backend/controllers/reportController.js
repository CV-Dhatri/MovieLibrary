const Movie = require("../models/movie");
const User = require("../models/user");
const Borrow = require("../models/borrow");

// ✅ SUMMARY CARD DATA
exports.getSummary = async (req, res) => {
  try {
    const totalMovies = await Movie.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalBorrows = await Borrow.countDocuments();
    const overdueCount = await Borrow.countDocuments({ status: "overdue" });

    res.status(200).json({
      success: true,
      data: {
        totalMovies,
        totalUsers,
        totalBorrows,
        overdueCount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ MOST BORROWED MOVIES
exports.getMostBorrowed = async (req, res) => {
  try {
    const data = await Borrow.aggregate([
      {
        $group: {
          _id: "$movie",
          borrowCount: { $sum: 1 },
        },
      },
      { $sort: { borrowCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "movies",
          localField: "_id",
          foreignField: "_id",
          as: "movie",
        },
      },
      { $unwind: "$movie" },
      {
        $project: {
          _id: "$movie._id",
          title: "$movie.title",
          borrowCount: 1,
        },
      },
    ]);

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ ACTIVE MEMBERS (Most Borrows)
exports.getActiveMembers = async (req, res) => {
  try {
    const data = await Borrow.aggregate([
      {
        $group: {
          _id: "$user",
          borrowCount: { $sum: 1 },
        },
      },
      { $sort: { borrowCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: "$user._id",
          name: "$user.name",
          borrowCount: 1,
        },
      },
    ]);

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ OVERDUE RECORDS
exports.getOverdue = async (req, res) => {
  try {
    const overdue = await Borrow.find({ status: "overdue" })
      .populate("user", "name")
      .populate("movie", "title");

    res.json({ success: true, data: overdue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};