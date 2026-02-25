const express = require("express");
const router = express.Router();
const borrowController = require("../controllers/borrowController");

// Import the middlewares
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Member routes (require login only)
router.post("/", authMiddleware, borrowController.borrowMovie);
router.put("/:id/return", authMiddleware, borrowController.returnMovie);
router.get("/my-history", authMiddleware, borrowController.getMyBorrowHistory);

// Admin route (requires login AND admin role)
router.get("/all", authMiddleware, adminMiddleware, borrowController.getAllBorrows);

module.exports = router;