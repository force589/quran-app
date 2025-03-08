// backend/routes/bookmarkNoteRoutes.js - Bookmark & Note API Routes
const express = require("express");
const { Bookmark, Note } = require("../models/User");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * @route POST /api/bookmarks
 * @desc Save a bookmark
 * @access Private
 */
router.post("/bookmarks", authenticateToken, async (req, res) => {
  try {
    const { surah, ayah } = req.body;
    if (!surah || !ayah) return res.status(400).json({ error: "Surah and Ayah are required" });

    const newBookmark = new Bookmark({ userId: req.user.userId, surah, ayah });
    await newBookmark.save();
    res.status(201).json({ message: "Bookmark saved" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save bookmark" });
  }
});

/**
 * @route GET /api/bookmarks
 * @desc Get user bookmarks
 * @access Private
 */
router.get("/bookmarks", authenticateToken, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user.userId });
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookmarks" });
  }
});

/**
 * @route POST /api/notes
 * @desc Save a note
 * @access Private
 */
router.post("/notes", authenticateToken, async (req, res) => {
  try {
    const { surah, ayah, note } = req.body;
    if (!surah || !ayah || !note) return res.status(400).json({ error: "Surah, Ayah, and Note are required" });

    const newNote = new Note({ userId: req.user.userId, surah, ayah, note });
    await newNote.save();
    res.status(201).json({ message: "Note saved" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save note" });
  }
});

/**
 * @route GET /api/notes
 * @desc Get user notes
 * @access Private
 */
router.get("/notes", authenticateToken, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

module.exports = router;

// FILE DONE ✅
