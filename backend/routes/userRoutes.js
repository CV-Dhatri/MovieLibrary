const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// ✅ GET ALL USERS (Admin Only)
router.get("/all", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ✅ BLOCK / UNBLOCK TOGGLE (Admin Only)
router.patch("/:id/toggle-status", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = user.status === "active" ? "blocked" : "active";
    await user.save();

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;