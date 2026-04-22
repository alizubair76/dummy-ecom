import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          {!product.inStock && <div className="out-of-stock">Out of Stock</div>}
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">{product.category}</p>
          <p className="product-description">{product.description}</p>
          <div className="product-footer">
            <span className="product-price">${product.price.toFixed(2)}</span>
            <button 
              className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
              disabled={!product.inStock}
            >
              {product.inStock ? 'View Details' : 'Unavailable'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
