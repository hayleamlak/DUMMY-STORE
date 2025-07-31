import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const quantityToAdd = Number(product.quantity) || 1;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Number(item.quantity) + quantityToAdd,
              }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            ...product,
            quantity: quantityToAdd,
            price: Number(product.price),
          },
        ];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const incrementQuantity = (productId) => {
  setCartItems((prevItems) =>
    prevItems.map((item) =>
      item.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const decrementQuantity = (productId) => {
  setCartItems((prevItems) =>
    prevItems
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0) // remove item if quantity goes to 0
  );
};


  return (
    <CartContext.Provider
  value={{
    cartItems,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  }}
>
  {children}
</CartContext.Provider>

  );
}

export const useCart = () => useContext(CartContext);
