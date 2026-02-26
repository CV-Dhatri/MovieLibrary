const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

 HEAD

// Route imports
const notificationRoutes = require("./routes/notificationRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

origin/main
dotenv.config();

const app = express();

 HEAD
app.use(cors());
app.use(express.json());

// ✅ DB Connection
connectDB();

// ✅ Test Route (Optional)
const Movie = require("./models/Movie");

app.get("/test-movie", async (req, res) => {
  const movie = await Movie.create({
    title: "Test Movie",
    genre: "Action"
  });

  res.json(movie);
});

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/movies", require("./routes/movieRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));


// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/movies", require("./routes/movieRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/borrows", require("./routes/borrowRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));

// Root test route
origin/main
app.get("/", (req, res) => {
  res.send("API Running...");
});

 HEAD

// Server start
 origin/main
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});