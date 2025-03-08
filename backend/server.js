// backend/server.js - Main API Server
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const quranRoutes = require("./routes/quranRoutes");
const authRoutes = require("./routes/authRoutes");
const bookmarkNoteRoutes = require("./routes/bookmarkNoteRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/quran", quranRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", bookmarkNoteRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Root Route
app.get("/", (req, res) => {
  res.send("Quran API is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// FILE DONE ✅
