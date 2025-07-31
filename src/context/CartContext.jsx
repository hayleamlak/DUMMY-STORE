import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    const quantityToAdd = Number(product.quantity) || 1;
    const price = Number(product.price) || 0;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        toast.info(`Added another "${product.title}" to cart`);
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        toast.success(`Added "${product.title}" to cart`);
        return [...prevItems, { ...product, quantity: quantityToAdd, price }];
      }
    });
  };

  const removeFromCart = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    if (item) toast.error(`Removed "${item.title}" from cart`);

    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const incrementQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    toast.info("you added  one item  ");
  };

  const decrementQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
    toast.warn(" removed one item form cart ");
  };

  // Subtotal, tax, shipping, grandTotal calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;

  const shipping = subtotal > 100 ? 0 : 10;

  const grandTotal = subtotal + tax + shipping;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        subtotal,
        tax,
        shipping,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
