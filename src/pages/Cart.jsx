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

  // Confirm before removing an item
  const handleRemove = (id, title) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${title}" from the cart?`
    );
    if (confirmed) {
      removeFromCart(id);
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty 😢</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
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
                    onClick={() => handleRemove(item.id, item.title)}
                  >
                    Remonved
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p>
              <strong>Subtotal:</strong> ETB{subtotal.toFixed(2)}
            </p>
            <p>
              <strong>Shipping:</strong> ETB{shipping.toFixed(2)}
            </p>
            <p>
              <strong>Tax (15%):</strong> ${tax.toFixed(2)}
            </p>
            <h3>Grand Total: ETB{grandTotal.toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
}
