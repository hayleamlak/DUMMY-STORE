// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Home/Home.css"; // We'll create this

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Noise-Cancelling Headphones",
    price: "$199",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
    desc: "Experience music like never before.",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: "$129",
    image: "https://images.unsplash.com/photo-1512499617640-c2f999098c01?w=400",
    desc: "Track your health in style.",
  },
  {
    id: 3,
    name: "Minimalist Backpack",
    price: "$89",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
    desc: "Carry everything, look sharp.",
  },
  {
    id: 4,
    name: "Wireless Speaker",
    price: "$59",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400",
    desc: "Fill your space with sound.",
  },
];

export default function Home() {
  // Promo timer logic
  const [seconds, setSeconds] = useState(3600); // 1 hour

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
    const interval = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  return (
    <div className="home-root">
      {/* Sticky/floating emoji visual */}
      <div className="floating-emoji" aria-hidden>
        🛍️
      </div>

      {/* Hero Section */}
      <section className="home-hero" data-aos="fade-up">
        <div className="hero-content">
          <h1>
            Discover <span className="highlight">Minimal</span> Shopping
          </h1>
          <p>
            Curated essentials for modern shoppers. Clean, delightful, and always on trend.
          </p>
          <a href="/shop" className="hero-btn">
            Shop Now
          </a>
        </div>
        <img
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500"
          alt="Minimal products"
          className="hero-img"
          data-aos="fade-left"
        />
      </section>

      {/* Promo Section with Timer */}
      <section className="promo-section" data-aos="zoom-in">
        <div className="promo-content">
          <span className="promo-badge">🔥 Limited Time</span>
          <h2>Spring Sale: Up to 40% Off</h2>
          <p>Hurry! Offer ends in <span className="promo-timer">{formatTime(seconds)}</span></p>
          <a href="/shop" className="promo-btn">
            Grab the Deal
          </a>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2 data-aos="fade-up">Featured Products</h2>
        <div className="product-grid">
          {FEATURED_PRODUCTS.map((prod, i) => (
            <div
              className="product-card"
              key={prod.id}
              data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}
              data-aos-delay={i * 100}
            >
              <img src={prod.image} alt={prod.name} />
              <div className="product-info">
                <h3>{prod.name}</h3>
                <p>{prod.desc}</p>
                <div className="product-bottom">
                  <span className="product-price">{prod.price}</span>
                  <button className="add-cart-btn">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter-section" data-aos="fade-up">
        <h2>Stay in the Loop</h2>
        <p>Get exclusive offers and updates. No spam, ever.</p>
        <form
          className="newsletter-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you for subscribing!");
          }}
        >
          <input type="email" placeholder="Your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section" data-aos="fade-up">
        <h2>What Shoppers Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card" data-aos="fade-right">
            <p>
              “Absolutely love the clean design and fast delivery. My new go-to store!”
            </p>
            <span>- Alex P.</span>
          </div>
          <div className="testimonial-card" data-aos="fade-left">
            <p>
              “The product quality is top-notch. The site feels so modern and easy to use.”
            </p>
            <span>- Jamie L.</span>
          </div>
        </div>
      </section>
    </div>
  );
}