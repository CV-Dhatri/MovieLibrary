const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// ✅ PUBLIC ROUTES
router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovieById);


// ✅ ADMIN ROUTES 🔥
router.post("/", authMiddleware, adminMiddleware, movieController.createMovie);
router.put("/:id", authMiddleware, adminMiddleware, movieController.updateMovie);
router.delete("/:id", authMiddleware, adminMiddleware, movieController.deleteMovie);

module.exports = router;