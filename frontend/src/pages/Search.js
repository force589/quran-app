// frontend/src/pages/Search.js - Search Page Component
import React, { useState } from "react";
import "../styles/Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await fetch(`https://api.quran.com/api/v4/search?q=${query}&language=en`);
      const data = await response.json();
      setResults(data.search ? data.search.results : []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="search-container">
      <h1>Search the Quran</h1>
      <input
        type="text"
        placeholder="Enter a word or phrase..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div className="search-results">
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="search-item">
              <p><strong>Ayah {result.verse_key}:</strong> {result.text}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;

// FILE DONE ✅
