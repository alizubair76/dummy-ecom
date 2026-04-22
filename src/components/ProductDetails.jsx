import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';
import './ProductDetails.css';

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = productsData.find(p => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="product-details-container">
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <p>Sorry, the product you're looking for doesn't exist.</p>
          <button className="back-btn" onClick={() => navigate('/')}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleIncrement = () => {
    setQuantity(q => q + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  return (
    <div className="product-details-container">
      <div className="product-details-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back to Products
        </button>
      </div>

      <div className="product-details-content">
        <div className="product-details-image">
          <img src={product.image} alt={product.name} />
          {!product.inStock && <div className="out-of-stock-banner">Out of Stock</div>}
        </div>

        <div className="product-details-info">
          <span className="product-badge">{product.category}</span>
          
          <h1 className="product-details-name">{product.name}</h1>
          
          <div className="product-stock-status">
            {product.inStock ? (
              <span className="in-stock">✓ In Stock</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          <div className="product-price-section">
            <span className="product-details-price">${product.price.toFixed(2)}</span>
          </div>

          <div className="product-description-section">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-details-specs">
            <h3>Product Details</h3>
            <ul>
              <li><strong>Product ID:</strong> {product.id}</li>
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Availability:</strong> {product.inStock ? 'In Stock' : 'Out of Stock'}</li>
            </ul>
          </div>

          <div className="product-actions">
            {product.inStock ? (
              <>
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <div className="quantity-controls">
                    <button 
                      className="qty-btn" 
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      max="100"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="qty-input"
                    />
                    <button 
                      className="qty-btn" 
                      onClick={handleIncrement}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button 
                  className={`add-to-cart-btn-large ${addedToCart ? 'success' : ''}`}
                  onClick={handleAddToCart}
                >
                  {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
                </button>
              </>
            ) : (
              <button className="add-to-cart-btn-large disabled">
                Out of Stock
              </button>
            )}
          </div>

          <div className="product-info-box">
            <h4>📦 Shipping Info</h4>
            <p>Free shipping on orders over $50. Typically ships within 2-3 business days.</p>
          </div>

          <div className="product-info-box">
            <h4>🔄 Returns & Exchanges</h4>
            <p>30-day return policy for unused items. Full refund or exchange available.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
