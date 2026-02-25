const Movie = require("../models/Movie");


// ✅ GET ALL MOVIES + FILTERS
exports.getMovies = async (req, res) => {
  try {
    const { title, genre, language, releaseYear, rating } = req.query;

    let filter = {};

    if (title) filter.title = { $regex: title, $options: "i" };
    if (genre) filter.genre = genre;
    if (language) filter.language = language;
    if (releaseYear) filter.releaseYear = releaseYear;
    if (rating) filter.rating = { $gte: rating };

    const movies = await Movie.find(filter);

    res.json({
      success: true,
      count: movies.length,
      data: movies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ✅ GET MOVIE BY ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }

    res.json({
      success: true,
      data: movie
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ✅ CREATE MOVIE (ADMIN)
exports.createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);

    res.status(201).json({
      success: true,
      data: movie
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ✅ UPDATE MOVIE (ADMIN)
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }

    res.json({
      success: true,
      data: movie
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ✅ DELETE MOVIE (ADMIN)
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }

    res.json({
      success: true,
      message: "Movie deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};