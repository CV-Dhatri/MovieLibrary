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

<<<<<<< HEAD
// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Test Route (optional, can delete later)
const Movie = require("./models/Movie");

app.get("/test-movie", async (req, res) => {
  try {
    const movie = await Movie.create({
      title: "Test Movie",
      genre: "Action",
    });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Test movie failed", error });
  }
});

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/movies", require("./routes/movieRoutes"));

// Root route
=======
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
>>>>>>> 5373f1534d7a37e5ae232af4a569591b3125375f
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Server start
const PORT = process.env.PORT || 5000;

// ✅ Proper startup — wait for DB before listening
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

startServer();