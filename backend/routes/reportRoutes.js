const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// All report routes require Admin access
router.use(authMiddleware, adminMiddleware);

router.get("/most-borrowed", reportController.getMostBorrowed);
router.get("/active-members", reportController.getActiveMembers);
router.get("/overdue-summary", reportController.getOverdueSummary);

module.exports = router;