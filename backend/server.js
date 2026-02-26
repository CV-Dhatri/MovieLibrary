const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Route imports
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const borrowRoutes = require("./routes/borrowRoutes");
const reportRoutes = require("./routes/reportRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/borrows", borrowRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});