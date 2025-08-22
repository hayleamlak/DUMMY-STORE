// src/components/FeaturedCategories.jsx
import React from "react";
import "../styles/Home/FeaturedCategories.css";

const categories = [
  {
    id: 1,
    name: "Men",
    image: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Women",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Skin Care",
    image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="featured-categories">
      <h2>Featured Categories</h2>
      <div className="categories-grid">
        {categories.map(({ id, name, image }) => (
          <div key={id} className="category-card" tabIndex={0}>
            <img src={image} alt={name} />
            <div className="overlay">
              <h3>{name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
