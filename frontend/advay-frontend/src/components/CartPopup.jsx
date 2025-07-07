import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import './CartPopup.css';

const CartPopup = () => {
  const { showCartPopup, cartItems, hideCartPopup, addToCart, removeFromCart } = useCart();

  if (!showCartPopup) return null;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.discountPrice || 0) * item.quantity, 0);

  return (
    <div className="cart-popup">
      <div className="cart-popup-header">
        <p><strong>{totalItems} item(s)</strong> | ₹{totalPrice.toFixed(2)}</p>
        <button className="close-btn" onClick={hideCartPopup}>✕</button>
      </div>

     <table className="cart-popup-table">
  <thead>
    <tr>
      <th>Image</th>
      <th>Product</th>
      <th>Qty</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    {cartItems.map((item) => (
      <tr key={item._id}>
        <td>
          <img src={item.imageUrl} alt={item.name} className="cart-popup-img" />
        </td>
        <td>{item.name}</td>
        <td>
          <button onClick={() => removeFromCart(item._id)}>-</button>
          <span style={{ margin: '0 5px' }}>{item.quantity}</span>
          <button onClick={() => addToCart(item)}>+</button>
        </td>
        <td>₹{(item.discountPrice * item.quantity).toFixed(2)}</td>
      </tr>
    ))}
  </tbody>
</table>


      <div className="cart-popup-footer">
        <Link to="/cart" className="view-cart-btn" onClick={hideCartPopup}>
          View Full Cart
        </Link>
      </div>
    </div>
  );
};

export default CartPopup;
