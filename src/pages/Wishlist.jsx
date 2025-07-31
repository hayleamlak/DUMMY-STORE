import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {wishlist.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "15px",
              }}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                width="100"
                style={{ marginRight: "20px" }}
              />
              <div style={{ flex: 1 }}>
                <h3>{item.title}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                <div>
                  <Link to={`/product/${item.id}`} style={{ marginRight: 10 }}>
                    View Details
                  </Link>

                  <button
                    onClick={() => addToCart(item)}
                    style={{ marginRight: 10 }}
                  >
                    Add to Cart
                  </button>

                  <button onClick={() => removeFromWishlist(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
