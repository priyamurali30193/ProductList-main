import React from 'react';
import { useCart } from './CartContext';

const CartControls = ({ item }) => {
  const { addToCart, removeFromCart } = useCart();

  return (
    <div className="cart-controls">
      <button onClick={() => removeFromCart(item._id)}>-</button>
      <span>{item.quantity}</span>
      <button onClick={() => addToCart(item)}>+</button>
    </div>
  );
};

export default CartControls;
