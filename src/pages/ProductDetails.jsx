import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return null;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} width="200" />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: ⭐ {product.rating.toFixed(1)}</p>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <label>Quantity:</label>
        <button onClick={decrement}>−</button>
        <span>{quantity}</span>
        <button onClick={increment}>+</button>
      </div>

      <button onClick={handleAddToCart} style={{ marginTop: "10px" }}>
        Add to Cart
      </button>
    </div>
  );
}
