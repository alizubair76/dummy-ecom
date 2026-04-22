import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

export default function Header() {
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <Link to="/" className="logo-link">
            <h1 className="app-title">🛍️ TechHub</h1>
          </Link>
          <p className="app-tagline">Premium Tech Products at Great Prices</p>
        </div>
        
        <div className="header-actions">
          <Link to="/orders" className="orders-link" title="View Orders">
            <span className="orders-icon">📋</span>
            <span>Orders</span>
          </Link>

          <Link to="/cart" className="cart-link">
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
