import React, { useEffect, useState } from 'react';
import './ProductList.css';
import { useCart } from './CartContext';
import CartControls from './CartControls.jsx';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart } = useCart();

  useEffect(() => {
    fetch('https://advaytraders.in/api/products.php')
      .then((res) => res.json())
      .then((data) => {
        const extractedProducts = Object.values(data.products)[0];
        setProducts(extractedProducts);
      })
      .catch((err) => console.error('Failed to load products:', err));
  }, []);

  const groupedProducts = Array.isArray(products)
    ? products.reduce((acc, product) => {
        const category = product.Category?.trim() || 'Uncategorized';
        if (!acc[category]) acc[category] = [];
        acc[category].push(product);
        return acc;
      }, {})
    : {};

  const categoryOrder = [
    'SINGLE SOUND CRACKERS',
    'FLOWERPOTS',
    'GROUND CHAKKAR',
    'TWINKLING STAR',
    'BOMBS',
    'GIFT BOXES',
    'PAPER BOMBS',
    'SOUND WAR',
    'ROCKETS',
    'LOOSE CRACKERS',
    'PEACOCK VARIETIE FOUNTAINS',
    'COLOUR FOUNTAIN (1 PC)',
    'COLOUR FOUTAIN (2 PCS)',
    'MOTHER"S BRAND FOUTAIN',
    'NOVELTIES CRACKERS',
    'KIDS VARIETIE',
    'SPARKLERS',
    'MINI FANCY',
    'AERIAL FANCY SHOT',
    'MULTIPLE AERIAL SHOTS (SOUND & COLOURFUL)',
    'COLOUR MATCHES'

  ];

  let serialNumber = 1;

  return (
    <div className="product-table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Image</th>
            <th>Product</th>
            <th>Pack</th>
            <th>Price</th>
            <th>Cart</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {categoryOrder.map((category) => {
            const items = groupedProducts[category];
            if (!items) return null;

            return (
              <React.Fragment key={category}>
                <tr><td colSpan="7" className="category-row">{category}</td></tr>
                {items.map((p) => {
                  const cartItem = cartItems.find(i => i._id === p.id);
                  const productName = p["Product Name"] || "Unnamed Product";
                  const productImage = p.img || 'https://advaytraders.in/images/no-image.png';
                  const productPrice = parseFloat(p["Discount Price"] || p["Original Price"] || 0);

                  return (
                    <tr key={p.id}>
                      <td>{serialNumber++}</td>
                      <td>
                        <img
                          src={productImage}
                          alt={productName}
                          className="product-img"
                        />
                      </td>
                      <td>{productName}</td>
                      <td>{p.Unit || '1 Pkt'}</td>
                     <td>
                            {p["Original Price"] && p["Discount Price"] && (
                            <span className="original-price">₹{parseFloat(p["Original Price"]).toFixed(2)}</span>
                            )}
                             <span className="discounted-price">₹{parseFloat(p["Discount Price"] || p["Original Price"] || 0).toFixed(2)}</span>
                     </td>

                      <td>
                        {cartItem ? (
                          <CartControls item={cartItem} />
                        ) : (
                          <button
                            className="add-btn"
                            onClick={() =>
                              addToCart({
                                _id: p.id,
                                name: productName,
                                imageUrl: productImage,
                                discountPrice: productPrice,
                                quantity: 1
                              }, true)
                            }
                          >
                            Add
                          </button>
                        )}
                      </td>
                      <td>{cartItem?.quantity || 0}</td>
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
