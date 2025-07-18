// components/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
    const [showCartPopup, setShowCartPopup] = useState(false); 

const addToCart = (product, showPopup = true) => {
  setCartItems((prev) => {
    const existing = prev.find((item) => item._id === product._id);
    if (existing) {
      return prev.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      return [...prev, { ...product, quantity: 1 }];
    }
  });

  if (showPopup) {
    setShowCartPopup(true);
  }
};

  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const item = prev.find((item) => item._id === productId);
      if (item && item.quantity > 1) {
        return prev.map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prev.filter((item) => item._id !== productId);
      }
    });
  };
const hideCartPopup = () => setShowCartPopup(false);
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart,showCartPopup,hideCartPopup }}>
      {children}
    </CartContext.Provider>
  );
};
