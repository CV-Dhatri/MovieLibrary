const Watchlist = require("../models/Watchlist");


// ✅ ADD
exports.addToWatchlist = async (req, res) => {
  try {
    const { movieId } = req.body;

    const existing = await Watchlist.findOne({
      user: req.user.id,
      movie: movieId
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Movie already in watchlist"
      });
    }

    const item = await Watchlist.create({
      user: req.user.id,
      movie: movieId
    });

    res.status(201).json({
      success: true,
      data: item
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ✅ REMOVE
exports.removeFromWatchlist = async (req, res) => {
  try {
    const item = await Watchlist.findOneAndDelete({
      user: req.user.id,
      movie: req.params.movieId
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Movie not in watchlist"
      });
    }

    res.json({
      success: true,
      message: "Removed from watchlist"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ✅ GET
exports.getWatchlist = async (req, res) => {
  try {
    const items = await Watchlist.find({ user: req.user.id })
      .populate("movie");

    res.json({
      success: true,
      count: items.length,
      data: items
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};