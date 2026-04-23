import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ShoppingCart.css';

export default function ShoppingCart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before checking out.');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="shopping-cart-container" data-testid="shopping-cart-container">
        <h1 data-testid="cart-page-title">Shopping Cart</h1>
        <div className="empty-cart" data-testid="empty-cart">
          <p data-testid="empty-cart-message">Your cart is empty</p>
          <Link to="/" className="continue-shopping-btn" data-testid="continue-shopping-link">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shopping-cart-container" data-testid="shopping-cart-container">
      <h1 data-testid="cart-page-title">Shopping Cart</h1>
      
      <div className="cart-content" data-testid="cart-content">
        <div className="cart-items" data-testid="cart-items-container">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item" data-testid={`cart-item-${item.id}`}>
              <img src={item.image} alt={item.name} className="cart-item-image" data-testid={`cart-item-image-${item.id}`} />
              
              <div className="cart-item-details" data-testid={`cart-item-details-${item.id}`}>
                <h3 data-testid={`cart-item-name-${item.id}`}>{item.name}</h3>
                <p className="cart-item-category" data-testid={`cart-item-category-${item.id}`}>{item.category}</p>
                <p className="cart-item-price" data-testid={`cart-item-price-${item.id}`}>${item.price.toFixed(2)} each</p>
              </div>

              <div className="cart-item-quantity" data-testid={`cart-item-quantity-${item.id}`}>
                <label data-testid={`quantity-label-${item.id}`}>Quantity:</label>
                <div className="quantity-controls" data-testid={`quantity-controls-${item.id}`}>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    data-testid={`qty-decrement-${item.id}`}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                    className="qty-input"
                    data-testid={`qty-input-${item.id}`}
                  />
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    data-testid={`qty-increment-${item.id}`}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-total" data-testid={`cart-item-total-${item.id}`}>
                <p className="total-price" data-testid={`cart-item-line-total-${item.id}`}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
                title="Remove from cart"
                data-testid={`remove-item-btn-${item.id}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary" data-testid="cart-summary">
          <h2 data-testid="summary-title">Order Summary</h2>
          
          <div className="summary-row" data-testid="summary-items-row">
            <span data-testid="summary-items-label">Items:</span>
            <span data-testid="summary-items-count">{cartItems.length}</span>
          </div>

          <div className="summary-row" data-testid="summary-quantity-row">
            <span data-testid="summary-quantity-label">Total Quantity:</span>
            <span data-testid="summary-quantity-value">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>

          <div className="summary-divider" data-testid="summary-divider-1"></div>

          <div className="summary-row total" data-testid="summary-subtotal-row">
            <span data-testid="summary-subtotal-label">Subtotal:</span>
            <span className="total-amount" data-testid="summary-subtotal-value">${getTotalPrice().toFixed(2)}</span>
          </div>

          <div className="summary-row" data-testid="summary-tax-row">
            <span data-testid="summary-tax-label">Tax (10%):</span>
            <span data-testid="summary-tax-value">${(getTotalPrice() * 0.1).toFixed(2)}</span>
          </div>

          <div className="summary-row" data-testid="summary-shipping-row">
            <span data-testid="summary-shipping-label">Shipping:</span>
            <span className="shipping-free" data-testid="summary-shipping-value">FREE</span>
          </div>

          <div className="summary-divider" data-testid="summary-divider-2"></div>

          <div className="summary-row total" data-testid="summary-total-row">
            <span data-testid="summary-total-label">Total:</span>
            <span className="total-amount" data-testid="summary-total-value">${(getTotalPrice() + getTotalPrice() * 0.1).toFixed(2)}</span>
          </div>

          <button 
            className="checkout-btn"
            onClick={handleCheckout}
            data-testid="checkout-btn"
          >
            Proceed to Checkout
          </button>

          <Link to="/" className="continue-shopping-link" data-testid="continue-shopping-link-summary">
            Continue Shopping
          </Link>

          <button
            className="clear-cart-btn"
            onClick={clearCart}
            data-testid="clear-cart-btn"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
