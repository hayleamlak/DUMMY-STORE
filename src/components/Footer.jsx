// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3>FashionWorld</h3>
          <p>Your one-stop shop for the latest fashion trends and unbeatable deals.</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">📘</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">🐦</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">📸</a>
          </div>
        </div>
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>Email: support@fashionworld.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Fashion St, Style City, USA</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} FashionWorld. All rights reserved.
      </div>
    </footer>
  );
}
