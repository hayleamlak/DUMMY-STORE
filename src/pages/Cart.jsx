import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  } = useCart();

  // Calculate subtotal (sum of price * quantity)
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Shipping: free if subtotal > 100, else $10
  const shipping = subtotal > 100 ? 0 : 10;

  // Tax: 8% of subtotal
  const tax = subtotal * 0.08;

  // Grand total
  const grandTotal = subtotal + shipping + tax;

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty 😢</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.thumbnail} alt={item.title} width="80" />
                <div>
                  <h4>{item.title}</h4>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => decrementQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => incrementQuantity(item.id)}>+</button>
                  </div>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary" style={{ marginTop: "20px" }}>
            <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
            <p><strong>Shipping:</strong> ${shipping.toFixed(2)}</p>
            <p><strong>Tax (8%):</strong> ${tax.toFixed(2)}</p>
            <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
}
