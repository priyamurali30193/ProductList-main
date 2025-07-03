import React from 'react';
import { useCart } from './CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const items = Object.values(cart);
debugger;
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.discountPrice || 0) * item.qty,
    0
  );

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Adjust</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img src={item.imageUrl} alt={item.name} className="cart-img" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>₹{((item.discountPrice || 0) * item.qty).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeFromCart(item._id)}>-</button>
                    <button onClick={() => addToCart(item._id)}>+</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <p><strong>Total Items:</strong> {totalItems}</p>
            <p><strong>Total Price:</strong> ₹{totalPrice.toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
