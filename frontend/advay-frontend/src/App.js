import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import CartPage from './components/CartPage';
import Header from './components/Header';
import CartPopup from './components/CartPopup';

const App = () => {
  return (
    <Router>
      <Header />
      <CartPopup />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
};

export default App;
