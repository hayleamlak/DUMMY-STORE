import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css"; // optional external styling

export default function ProductCard({ product }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <img src={product.thumbnail} alt={product.title} />
        <h4>{product.title}</h4>
      </Link>
      <p>${product.price}</p>

      <div className="card-actions">
        <button onClick={() => addToCart({ ...product, quantity: 1 })}>
          Add to Cart
        </button>
        <button className="wishlist-btn" onClick={toggleWishlist}>
          {isInWishlist ? (
            <FaHeart color="red" size={20} />
          ) : (
            <FaRegHeart color="gray" size={20} />
          )}
        </button>
      </div>
    </div>
  );
}
