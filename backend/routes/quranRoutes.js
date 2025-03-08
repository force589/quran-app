// routes/quranRoutes.js - Quran API Routes
const express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");
const router = express.Router();

const QURAN_API_BASE = "https://api.quran.com/api/v4";
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 }); // Cache for 10 minutes

// Middleware to check cache
const checkCache = (req, res, next) => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    return res.json(cachedResponse);
  }
  next();
};

/**
 * @route GET /api/quran/surah/:id
 * @desc Get Surah details
 */
router.get("/surah/:id", checkCache, async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${QURAN_API_BASE}/chapters/${id}`);
    cache.set(req.originalUrl, response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Surah details" });
  }
});

/**
 * @route GET /api/quran/verses/:surahId
 * @desc Get all verses from a Surah
 */
router.get("/verses/:surahId", checkCache, async (req, res) => {
  try {
    const { surahId } = req.params;
    const response = await axios.get(`${QURAN_API_BASE}/quran/verses/uthmani?chapter_number=${surahId}`);
    cache.set(req.originalUrl, response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch verses" });
  }
});

/**
 * @route GET /api/quran/search
 * @desc Search for Quranic content
 */
router.get("/search", checkCache, async (req, res) => {
  try {
    const { query, language, page = 1, perPage = 10 } = req.query;
    if (!query) return res.status(400).json({ error: "Query parameter is required" });
    if (!language) return res.status(400).json({ error: "Language parameter is required" });

    const response = await axios.get(`${QURAN_API_BASE}/search`, {
      params: { q: query, language, page, per_page: perPage },
    });

    cache.set(req.originalUrl, response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to perform search" });
  }
});

module.exports = router;
