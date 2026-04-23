import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

export default function Header() {
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <header className="app-header" data-testid="app-header">
      <div className="header-content" data-testid="header-content">
        <div className="header-left" data-testid="header-left">
          <Link to="/" className="logo-link" data-testid="logo-link">
            <h1 className="app-title" data-testid="app-title">🛍️ TechHub</h1>
          </Link>
          <p className="app-tagline" data-testid="app-tagline">Premium Tech Products at Great Prices</p>
        </div>
        
        <div className="header-actions" data-testid="header-actions">
          <Link to="/orders" className="orders-link" title="View Orders" data-testid="orders-link">
            <span className="orders-icon" data-testid="orders-icon">📋</span>
            <span data-testid="orders-text">Orders</span>
          </Link>

          <Link to="/cart" className="cart-link" data-testid="cart-link">
            <span className="cart-icon" data-testid="cart-icon">🛒</span>
            {cartCount > 0 && (
              <span className="cart-badge" data-testid="cart-badge">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
