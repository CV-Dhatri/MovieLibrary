const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, reviewController.addReview);
router.get("/movie/:id", reviewController.getMovieReviews);

module.exports = router;