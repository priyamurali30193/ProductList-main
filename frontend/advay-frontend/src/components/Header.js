// components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <header className="site-header">
    <div className="container">
      <Link to="/" className="logo">🎇 Advay Traders</Link>
      <nav>
        <ul>
          <li><Link to="/">Order Online</Link></li>
          <li><Link to="/cart">🛒 Cart</Link></li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
