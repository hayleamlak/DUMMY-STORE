import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; // cart icon
import "../styles/Home/Navbar.css";

export default function Navbar() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`navbar ${isOpen ? "active" : ""}`}>
      <Link to="/" className="logo" onClick={() => setIsOpen(false)}>
        🛍️ FashionWorld
      </Link>

      <div className="burger" onClick={() => setIsOpen(!isOpen)}>
        <div />
        <div />
        <div />
      </div>

      <ul className="nav-links">
        <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
        <li><Link to="/shop" onClick={() => setIsOpen(false)}>Shop</Link></li>
        <li className="cart-link">
          <Link to="/cart" onClick={() => setIsOpen(false)}>
            <FaShoppingCart className="cart-icon" />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </Link>
        </li>
        <li><Link to="/wishlist" onClick={() => setIsOpen(false)}>Wishlist ❤️</Link></li>
        <li><Link to="/profile">Profile 👤</Link></li>
      </ul>
    </nav>
  );
}
