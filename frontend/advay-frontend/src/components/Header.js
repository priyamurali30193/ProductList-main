import React from 'react';
import { Link } from 'react-router-dom';
//import { useCart } from './CartContext';
import './Header.css';
import logo from "./logo.png";

const Header = () => {
  //const { cartItems, showCart } = useCart();
 // const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src={logo} alt="Advay Traders" />
        </Link>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

          </div>
    </header>
  );
};

export default Header;
