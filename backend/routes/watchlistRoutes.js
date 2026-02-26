const express = require("express");
const router = express.Router();

const watchlistController = require("../controllers/watchlistController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, watchlistController.addToWatchlist);
router.delete("/:movieId", authMiddleware, watchlistController.removeFromWatchlist);
router.get("/", authMiddleware, watchlistController.getWatchlist);

module.exports = router;