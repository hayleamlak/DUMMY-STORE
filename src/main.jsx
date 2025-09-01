import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <WishlistProvider>
      <CartProvider>
        <App />

      </CartProvider>
   
    </WishlistProvider>

);
