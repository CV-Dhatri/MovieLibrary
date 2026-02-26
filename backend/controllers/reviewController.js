const Review = require("../models/Review");
const Movie = require("../models/Movie");


// ✅ ADD REVIEW
exports.addReview = async (req, res) => {
  try {
    const { movieId, rating, comment } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }

    const existingReview = await Review.findOne({
      user: req.user.id,
      movie: movieId
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this movie"
      });
    }

    const review = await Review.create({
      user: req.user.id,
      movie: movieId,
      rating,
      comment
    });

    res.status(201).json({
      success: true,
      data: review
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ✅ GET REVIEWS + AVG RATING
exports.getMovieReviews = async (req, res) => {
  try {
    const movieId = req.params.id;

    const reviews = await Review.find({ movie: movieId })
      .populate("user", "name");

    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    res.json({
      success: true,
      count: reviews.length,
      averageRating: avgRating.toFixed(1),
      data: reviews
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};