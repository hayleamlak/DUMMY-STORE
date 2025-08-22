// src/components/ProductHighlights.jsx
import React, { useState } from "react";
import "../styles/Home/ProductHighlights.css";

const productsData = {
  latest: [
    { id: 1, name: "Elegant Dress", price: "$120", image: "https://images.unsplash.com/photo-1520962913217-4d09a06a3e87?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Casual Shirt", price: "$60", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Trendy Sneakers", price: "$90", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" },
  ],
  bestSellers: [
    { id: 4, name: "Classic Watch", price: "$200", image: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=400&q=80" },
    { id: 5, name: "Leather Jacket", price: "$250", image: "https://images.unsplash.com/photo-1521335629791-ce4aec67ddc3?auto=format&fit=crop&w=400&q=80" },
    { id: 6, name: "Sunglasses", price: "$80", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80" },
  ],
  onSale: [
    { id: 7, name: "Summer Hat", price: "$30", image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=400&q=80" },
    { id: 8, name: "Beach Shorts", price: "$25", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80" },
    { id: 9, name: "Flip Flops", price: "$15", image: "https://images.unsplash.com/photo-1533055640609-24b498cdfa20?auto=format&fit=crop&w=400&q=80" },
  ],
};

export default function ProductHighlights() {
  const [activeTab, setActiveTab] = useState("latest");

  const renderProducts = () => {
    return productsData[activeTab].map(({ id, name, price, image }) => (
      <div key={id} className="product-card">
        <img src={image} alt={name} />
        <div className="product-info">
          <h3>{name}</h3>
          <p className="price">{price}</p>
        </div>
      </div>
    ));
  };

  return (
    <section className="product-highlights">
      <h2>Product Highlights</h2>
      <div className="tabs">
        <button
          className={activeTab === "latest" ? "active" : ""}
          onClick={() => setActiveTab("latest")}
        >
          Latest
        </button>
        <button
          className={activeTab === "bestSellers" ? "active" : ""}
          onClick={() => setActiveTab("bestSellers")}
        >
          Best Sellers
        </button>
        <button
          className={activeTab === "onSale" ? "active" : ""}
          onClick={() => setActiveTab("onSale")}
        >
          On Sale
        </button>
      </div>
      <div className="products-grid">{renderProducts()}</div>
    </section>
  );
}
