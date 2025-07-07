import React from 'react';
import { useCart } from './CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const items = cartItems || [];

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + (parseFloat(item.discountPrice) || 0) * item.quantity,
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
              {items.map((item, index) => (
                <tr key={item._id || index}>
                  <td>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="cart-img"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    ₹{((parseFloat(item.discountPrice) || 0) * item.quantity).toFixed(2)}
                  </td>
                  <td>
                    <button onClick={() => removeFromCart(item._id)}>-</button>
                    <button onClick={() => addToCart(item, false)}>+</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <div className="cart-summary-row">
              <p className="total-price">
                <strong>Total Price:</strong> ₹{totalPrice.toFixed(2)}
              </p>
              <div className="button-column">
              <button
                className="proceed-btn"
                disabled={totalPrice < 1999}
                onClick={() => alert('Proceeding to Payment...')}
              >
                Proceed to Payment
              </button>
              </div>
            </div>

            {totalPrice < 1999 && (
              <p className="warning-text">
                Minimum order value is ₹1999 to proceed.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
