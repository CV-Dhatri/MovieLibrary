const express = require("express");
const router = express.Router();
const borrowController = require("../controllers/borrowController");

// Import the middlewares
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Admin route (requires login AND admin role)
router.get("/all", authMiddleware, adminMiddleware, borrowController.getAllBorrows);
router.get("/overdue", authMiddleware, adminMiddleware, borrowController.getOverdueBorrows);


// Member routes (require login only)
router.post("/", authMiddleware, borrowController.borrowMovie);
router.get("/my-history", authMiddleware, borrowController.getMyBorrowHistory);
router.put("/:id/return", authMiddleware, borrowController.returnMovie);




module.exports = router;