import React from 'react';                        
import ReactDOM from 'react-dom/client';          // ✅ Import ReactDOM
import './index.css';
import App from './App';                          // ✅ Import App component
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './components/CartContext';  // ✅ Import CartProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CartProvider>
);

reportWebVitals();
