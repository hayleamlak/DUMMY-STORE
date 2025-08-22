import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home/HeroSection.css";

export default function HeroSection() {
  return (
    <section className="hero-meadow">
      <div className="glow-background"></div>
      <div className="hero-illustration">
        <div className="girl-outline">
          <div className="floating-notes">
            <span>🎵</span>
            <span>🎶</span>
            <span>🎵</span>
          </div>
        </div>
        <div className="hero-text-meadow">
          <h1>Welcome to Dreamland 🎨</h1>
          <p>Where imagination meets peaceful melodies.</p>
          <Link to="/shop" className="hero-meadow-btn">Explore Now</Link>
        </div>
      </div>
    </section>
  );
}
