const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

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
app.use("/api/borrows", require("./routes/borrowRoutes"));

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});