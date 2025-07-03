import React, { useEffect, useState } from 'react';
import './ProductList.css';
import { useCart } from './CartContext';
import CartControls from './CartControls.jsx';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart } = useCart();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  const groupedProducts = products.reduce((acc, product) => {
    const cat = product.category?.trim() || 'Uncategorized';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  const categoryOrder = [
    'Single Sound Crackers', 'Flower Pot', 'Ground Chakkar',
    'Twinkling Star', 'Bombs', 'GIFT BOXES'
  ];

  return (
    <div className="product-table-container">
      <h2 className="title">Order Online</h2>

      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Pack</th>
            <th>Category</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Cart</th>
          </tr>
        </thead>
        <tbody>
          {categoryOrder.map((category) => {
            const items = groupedProducts[category];
            if (!items) return null;

            return (
              <React.Fragment key={category}>
                <tr>
                  <td colSpan="7" className="category-row">{category}</td>
                </tr>
                {items.map((p) => {
                  const cartItem = cartItems.find(i => i._id === p._id);
                  return (
                    <tr key={p._id}>
                      <td><img src={p.imageUrl} alt={p.name} className="product-img" /></td>
                      <td>{p.name}</td>
                      <td>{p.pack || '1 Pkt'}</td>
                      <td>{p.category}</td>
                      <td>
                        <span className="original-price">₹{(p.originalPrice || 0).toFixed(2)}</span>{' '}
                        <span className="discount-price">₹{(p.discountPrice || 0).toFixed(2)}</span>
                      </td>
                      <td>
                        {cartItem ? (
                          <CartControls item={cartItem} />
                        ) : (
                          <button className="add-btn" onClick={() => addToCart(p)}>Add</button>
                        )}
                      </td>
                      <td>{cartItem?.qty || 0}</td>
                    </tr>
                  );
                })}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
