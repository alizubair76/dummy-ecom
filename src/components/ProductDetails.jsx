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
      <div className="product-details-container" data-testid="product-details-container">
        <div className="product-not-found" data-testid="product-not-found">
          <h2 data-testid="not-found-title">Product Not Found</h2>
          <p data-testid="not-found-message">Sorry, the product you're looking for doesn't exist.</p>
          <button className="back-btn" onClick={() => navigate('/')} data-testid="back-to-products-btn">
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
    <div className="product-details-container" data-testid="product-details-container">
      <div className="product-details-header" data-testid="product-details-header">
        <button className="back-btn" onClick={() => navigate('/')} data-testid="back-to-products-btn">
          ← Back to Products
        </button>
      </div>

      <div className="product-details-content" data-testid="product-details-content">
        <div className="product-details-image" data-testid={`product-image-${product.id}`}>
          <img src={product.image} alt={product.name} data-testid={`product-img-${product.id}`} />
          {!product.inStock && <div className="out-of-stock-banner" data-testid={`out-of-stock-banner-${product.id}`}>Out of Stock</div>}
        </div>

        <div className="product-details-info" data-testid={`product-info-${product.id}`}>
          <span className="product-badge" data-testid={`product-category-${product.id}`}>{product.category}</span>
          
          <h1 className="product-details-name" data-testid={`product-name-${product.id}`}>{product.name}</h1>
          
          <div className="product-stock-status" data-testid={`product-stock-status-${product.id}`}>
            {product.inStock ? (
              <span className="in-stock" data-testid={`in-stock-badge-${product.id}`}>✓ In Stock</span>
            ) : (
              <span className="out-of-stock" data-testid={`out-of-stock-badge-${product.id}`}>Out of Stock</span>
            )}
          </div>

          <div className="product-price-section" data-testid={`product-price-section-${product.id}`}>
            <span className="product-details-price" data-testid={`product-price-${product.id}`}>${product.price.toFixed(2)}</span>
          </div>

          <div className="product-description-section" data-testid={`product-description-section-${product.id}`}>
            <h3 data-testid={`description-title-${product.id}`}>Description</h3>
            <p data-testid={`description-text-${product.id}`}>{product.description}</p>
          </div>

          <div className="product-details-specs" data-testid={`product-specs-${product.id}`}>
            <h3 data-testid={`specs-title-${product.id}`}>Product Details</h3>
            <ul data-testid={`specs-list-${product.id}`}>
              <li data-testid={`spec-id-${product.id}`}><strong>Product ID:</strong> {product.id}</li>
              <li data-testid={`spec-category-${product.id}`}><strong>Category:</strong> {product.category}</li>
              <li data-testid={`spec-availability-${product.id}`}><strong>Availability:</strong> {product.inStock ? 'In Stock' : 'Out of Stock'}</li>
            </ul>
          </div>

          <div className="product-actions" data-testid={`product-actions-${product.id}`}>
            {product.inStock ? (
              <>
                <div className="quantity-selector" data-testid={`quantity-selector-${product.id}`}>
                  <label htmlFor="quantity" data-testid={`quantity-label-${product.id}`}>Quantity:</label>
                  <div className="quantity-controls" data-testid={`quantity-controls-${product.id}`}>
                    <button 
                      className="qty-btn" 
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                      data-testid={`qty-decrement-btn-${product.id}`}
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
                      data-testid={`qty-input-${product.id}`}
                    />
                    <button 
                      className="qty-btn" 
                      onClick={handleIncrement}
                      data-testid={`qty-increment-btn-${product.id}`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button 
                  className={`add-to-cart-btn-large ${addedToCart ? 'success' : ''}`}
                  onClick={handleAddToCart}
                  data-testid={`add-to-cart-btn-${product.id}`}
                >
                  {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
                </button>
              </>
            ) : (
              <button className="add-to-cart-btn-large disabled" data-testid={`out-of-stock-btn-${product.id}`}>
                Out of Stock
              </button>
            )}
          </div>

          <div className="product-info-box" data-testid={`shipping-info-box-${product.id}`}>
            <h4 data-testid={`shipping-title-${product.id}`}>📦 Shipping Info</h4>
            <p data-testid={`shipping-text-${product.id}`}>Free shipping on orders over $50. Typically ships within 2-3 business days.</p>
          </div>

          <div className="product-info-box" data-testid={`returns-info-box-${product.id}`}>
            <h4 data-testid={`returns-title-${product.id}`}>🔄 Returns & Exchanges</h4>
            <p data-testid={`returns-text-${product.id}`}>30-day return policy for unused items. Full refund or exchange available.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
