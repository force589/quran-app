// frontend/src/pages/QuranViewer.js - Quran Viewer Page
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/QuranViewer.css";

const QuranViewer = () => {
  const { surahId } = useParams();
  const [surah, setSurah] = useState(null);
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const response = await fetch(`https://api.quran.com/api/v4/chapters/${surahId}`);
        const data = await response.json();
        setSurah(data.chapter);
      } catch (error) {
        console.error("Error fetching Surah:", error);
      }
    };

    const fetchVerses = async () => {
      try {
        const response = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahId}`);
        const data = await response.json();
        setVerses(data.verses);
      } catch (error) {
        console.error("Error fetching verses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
    fetchVerses();
  }, [surahId]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!surah) return <p className="error">Surah not found.</p>;

  return (
    <div className="quran-viewer">
      <h1 className="surah-title">{surah.name_arabic} ({surah.name_simple})</h1>
      <p className="surah-info">Revelation Place: {surah.revelation_place}</p>
      <p className="surah-info">Total Verses: {surah.verses_count}</p>
      <h2 className="verses-header">Verses:</h2>
      <ul className="verses-list">
        {verses.map((verse) => (
          <li key={verse.id} className="verse-item">
            <p className="verse-text"><strong>Ayah {verse.verse_number}:</strong> {verse.text_uthmani}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuranViewer;

// FILE DONE ✅
