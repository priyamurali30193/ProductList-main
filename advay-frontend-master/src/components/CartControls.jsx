import React from 'react';
import { useCart } from './CartContext';

const CartControls = ({ item }) => {
  const { addToCart, removeFromCart } = useCart();

  return (
    <div className="cart-controls">
      <button onClick={() => removeFromCart(item._id)}>-</button>
      <span>{item.qty}</span>
      <button onClick={() => addToCart(item._id)}>+</button>
    </div>
  );
};

export default CartControls;
