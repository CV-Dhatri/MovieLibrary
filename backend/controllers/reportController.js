    const Borrow = require("../models/borrow");
const Movie = require("../models/Movie");

// @desc    Get top 5 most borrowed movies
// @route   GET /api/reports/most-borrowed
exports.getMostBorrowed = async (req, res) => {
  try {
    const report = await Borrow.aggregate([
      { $group: { _id: "$movie", borrowCount: { $sum: 1 } } },
      { $sort: { borrowCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "movies",
          localField: "_id",
          foreignField: "_id",
          as: "movieDetails",
        },
      },
      { $unwind: "$movieDetails" },
      { $project: { _id: 0, title: "$movieDetails.title", borrowCount: 1 } }
    ]);

    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get members with the most borrows
// @route   GET /api/reports/active-members
exports.getActiveMembers = async (req, res) => {
  try {
    const report = await Borrow.aggregate([
      { $group: { _id: "$user", totalBorrows: { $sum: 1 } } },
      { $sort: { totalBorrows: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      { $project: { _id: 0, name: "$userDetails.name", totalBorrows: 1 } }
    ]);

    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Count of overdue records
// @route   GET /api/reports/overdue-summary
exports.getOverdueSummary = async (req, res) => {
  try {
    const count = await Borrow.countDocuments({ status: "overdue" });
    res.status(200).json({ success: true, overdueCount: count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};