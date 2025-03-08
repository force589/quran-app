// frontend/src/components/Navbar.js - Navigation Bar Component
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Quran App</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/quran/1">Quran</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

// FILE DONE ✅
