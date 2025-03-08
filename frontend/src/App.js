// frontend/src/App.js - Main App Component
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import QuranViewer from "./pages/QuranViewer";
import Navbar from "./components/Navbar";
import "./styles/global.css";

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/quran/:surahId" element={<QuranViewer />} />
      </Routes>
    </div>
  );
};

export default App;

// FILE DONE ✅
