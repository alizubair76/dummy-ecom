import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product, ...props }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card-link" data-testid={props['data-testid']}>
      <div className="product-card" data-testid={`product-card-container-${product.id}`}>
        <div className="product-image" data-testid={`product-image-${product.id}`}>
          <img src={product.image} alt={product.name} data-testid={`product-image-img-${product.id}`} />
          {!product.inStock && <div className="out-of-stock" data-testid={`out-of-stock-badge-${product.id}`}>Out of Stock</div>}
        </div>
        <div className="product-info" data-testid={`product-info-${product.id}`}>
          <h3 className="product-name" data-testid={`product-name-${product.id}`}>{product.name}</h3>
          <p className="product-category" data-testid={`product-category-${product.id}`}>{product.category}</p>
          <p className="product-description" data-testid={`product-description-${product.id}`}>{product.description}</p>
          <div className="product-footer" data-testid={`product-footer-${product.id}`}>
            <span className="product-price" data-testid={`product-price-${product.id}`}>${product.price.toFixed(2)}</span>
            <button 
              className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
              disabled={!product.inStock}
              data-testid={`view-details-btn-${product.id}`}
            >
              {product.inStock ? 'View Details' : 'Unavailable'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
