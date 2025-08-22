// src/components/CTASection.jsx
import React from "react";
import "../styles/Home/CTASection.css";

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Ready to Upgrade Your Style?</h2>
        <p>Explore our exclusive collections and enjoy limited-time discounts.</p>
        <a href="/shop" className="cta-button">Shop Now</a>
      </div>
    </section>
  );
}
