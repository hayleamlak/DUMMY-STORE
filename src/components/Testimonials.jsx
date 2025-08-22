// src/components/Testimonials.jsx
import React, { useState } from "react";
import "../styles/Home/Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Sophia Lee",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    quote: "FashionWorld transformed my wardrobe! Amazing quality and fast delivery.",
    rating: 5,
  },
  {
    id: 2,
    name: "James Smith",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Great customer service and trendy styles. Highly recommend!",
    rating: 4,
  },
  {
    id: 3,
    name: "Emily Davis",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    quote: "The best place for fashion deals. Love the variety and prices.",
    rating: 5,
  },
];

function StarRating({ count }) {
  return (
    <div className="stars">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < count ? "filled" : ""}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  function prev() {
    setIndex((index - 1 + testimonials.length) % testimonials.length);
  }

  function next() {
    setIndex((index + 1) % testimonials.length);
  }

  const { name, photo, quote, rating } = testimonials[index];

  return (
    <section className="testimonials-section">
      <h2>What Our Customers Say</h2>
      <div className="testimonial-card">
        <img src={photo} alt={name} className="testimonial-photo" />
        <p className="testimonial-quote">"{quote}"</p>
        <StarRating count={rating} />
        <p className="testimonial-name">- {name}</p>
      </div>
      <div className="testimonial-controls">
        <button onClick={prev} aria-label="Previous testimonial">‹</button>
        <button onClick={next} aria-label="Next testimonial">›</button>
      </div>
    </section>
  );
}
