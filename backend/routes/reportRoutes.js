const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/summary", authMiddleware, adminMiddleware, reportController.getSummary);
router.get("/most-borrowed", authMiddleware, adminMiddleware, reportController.getMostBorrowed);
router.get("/active-members", authMiddleware, adminMiddleware, reportController.getActiveMembers);
router.get("/overdue", authMiddleware, adminMiddleware, reportController.getOverdue);

module.exports = router;