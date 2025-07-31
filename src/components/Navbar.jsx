import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="logo">🛍️ FashionWorld</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
    
        <li><Link to="/cart">Cart ({totalItems})</Link></li>
         <Link to="/wishlist">Wishlist ❤️</Link>
      </ul>
    </nav>
  );
}
