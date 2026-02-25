const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

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
app.get("/", (req, res) => {
  res.send("API Running...");
});

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