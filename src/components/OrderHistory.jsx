import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import './OrderHistory.css';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [filterEmail, setFilterEmail] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    if (filterEmail) {
      const userOrders = orderService.getOrdersByEmail(filterEmail);
      setOrders(userOrders);
    } else {
      const allOrders = orderService.getOrders();
      setOrders(allOrders);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilterEmail(searchEmail);
  };

  const handleClearFilter = () => {
    setFilterEmail('');
    setSearchEmail('');
    setOrders(orderService.getOrders());
  };

  const handleExpandOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#3498db';
      case 'shipped':
        return '#f39c12';
      case 'delivered':
        return '#27ae60';
      case 'cancelled':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return '✓';
      case 'shipped':
        return '📦';
      case 'delivered':
        return '✓✓';
      case 'cancelled':
        return '✗';
      default:
        return '•';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="order-history-container" data-testid="order-history-container">
        <h1 data-testid="page-title">Order History</h1>

        <form className="search-form" onSubmit={handleSearchSubmit} data-testid="search-form">
          <div className="search-box" data-testid="search-box">
            <input
              type="email"
              placeholder="Search orders by email..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="search-input"
              data-testid="search-input"
            />
            <button type="submit" className="search-btn" data-testid="search-btn">Search</button>
          </div>
        </form>

        <div className="no-orders" data-testid="no-orders">
          <p data-testid="no-orders-message">No orders found</p>
          {filterEmail && (
            <button className="clear-filter-btn" onClick={handleClearFilter} data-testid="clear-filter-btn">
              Clear Filter
            </button>
          )}
          <Link to="/" className="continue-shopping-link" data-testid="continue-shopping-link">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history-container" data-testid="order-history-container">
      <h1 data-testid="page-title">Order History</h1>

      <form className="search-form" onSubmit={handleSearchSubmit} data-testid="search-form">
        <div className="search-box" data-testid="search-box">
          <input
            type="email"
            placeholder="Search orders by email..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="search-input"
            data-testid="search-input"
          />
          <button type="submit" className="search-btn" data-testid="search-btn">Search</button>
          {filterEmail && (
            <button 
              type="button" 
              className="clear-filter-btn" 
              onClick={handleClearFilter}
              data-testid="clear-filter-btn-active"
            >
              Clear
            </button>
          )}
        </div>
      </form>

      <div className="orders-summary" data-testid="orders-summary">
        <div className="summary-card" data-testid="summary-card-total-orders">
          <p className="summary-label" data-testid="summary-label-total-orders">Total Orders</p>
          <p className="summary-value" data-testid="summary-value-total-orders">{orders.length}</p>
        </div>
        <div className="summary-card" data-testid="summary-card-total-spent">
          <p className="summary-label" data-testid="summary-label-total-spent">Total Spent</p>
          <p className="summary-value" data-testid="summary-value-total-spent">
            ${orders.reduce((sum, order) => sum + order.subtotal, 0).toFixed(2)}
          </p>
        </div>
        <div className="summary-card" data-testid="summary-card-confirmed">
          <p className="summary-label" data-testid="summary-label-confirmed">Confirmed</p>
          <p className="summary-value" data-testid="summary-value-confirmed">
            {orders.filter(o => o.status === 'confirmed').length}
          </p>
        </div>
        <div className="summary-card" data-testid="summary-card-delivered">
          <p className="summary-label" data-testid="summary-label-delivered">Delivered</p>
          <p className="summary-value" data-testid="summary-value-delivered">
            {orders.filter(o => o.status === 'delivered').length}
          </p>
        </div>
      </div>

      <div className="orders-list" data-testid="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card" data-testid={`order-card-${order.id}`}>
            <div 
              className="order-header"
              onClick={() => handleExpandOrder(order.id)}
              style={{ cursor: 'pointer' }}
              data-testid={`order-header-${order.id}`}
            >
              <div className="order-header-left" data-testid={`order-header-left-${order.id}`}>
                <h3 data-testid={`order-number-${order.id}`}>{order.orderNumber}</h3>
                <p className="order-date" data-testid={`order-date-${order.id}`}>
                  {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>

              <div className="order-header-right" data-testid={`order-header-right-${order.id}`}>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                  data-testid={`order-status-badge-${order.id}`}
                >
                  {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                <p className="order-total" data-testid={`order-total-${order.id}`}>${(order.subtotal + order.tax).toFixed(2)}</p>
                <span className="expand-icon" data-testid={`expand-icon-${order.id}`}>
                  {expandedOrder === order.id ? '▲' : '▼'}
                </span>
              </div>
            </div>

            {expandedOrder === order.id && (
              <div className="order-details-expanded" data-testid={`order-details-expanded-${order.id}`}>
                <div className="order-info-section" data-testid={`order-info-section-${order.id}`}>
                  <h4 data-testid={`order-info-title-${order.id}`}>Order Information</h4>
                  <div className="info-row" data-testid={`info-row-order-number-${order.id}`}>
                    <span className="info-label" data-testid={`info-label-order-number-${order.id}`}>Order Number:</span>
                    <span className="info-value" data-testid={`info-value-order-number-${order.id}`}>{order.orderNumber}</span>
                  </div>
                  <div className="info-row" data-testid={`info-row-order-date-${order.id}`}>
                    <span className="info-label" data-testid={`info-label-order-date-${order.id}`}>Order Date:</span>
                    <span className="info-value" data-testid={`info-value-order-date-${order.id}`}>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="info-row" data-testid={`info-row-status-${order.id}`}>
                    <span className="info-label" data-testid={`info-label-status-${order.id}`}>Status:</span>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                      data-testid={`info-value-status-${order.id}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="info-row" data-testid={`info-row-delivery-${order.id}`}>
                    <span className="info-label" data-testid={`info-label-delivery-${order.id}`}>Estimated Delivery:</span>
                    <span className="info-value" data-testid={`info-value-delivery-${order.id}`}>{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="customer-info-section" data-testid={`customer-info-section-${order.id}`}>
                  <h4 data-testid={`customer-info-title-${order.id}`}>Customer Information</h4>
                  <div className="info-row" data-testid={`info-row-name-${order.id}`}>
                    <span className="info-label" data-testid={`info-label-name-${order.id}`}>Name:</span>
                    <span className="info-value" data-testid={`info-value-name-${order.id}`}>{order.customerInfo.firstName} {order.customerInfo.lastName}</span>
                  </div>
                  <div className="info-row" data-testid={`info-row-email-${order.id}`}>
                    <span className="info-label" data-testid={`info-label-email-${order.id}`}>Email:</span>
                    <span className="info-value" data-testid={`info-value-email-${order.id}`}>{order.customerInfo.email}</span>
                  </div>
                  <div className="info-row" data-testid={`info-row-phone-${order.id}`}>
                    <span className="info-label" data-testid={`info-label-phone-${order.id}`}>Phone:</span>
                    <span className="info-value" data-testid={`info-value-phone-${order.id}`}>{order.customerInfo.phone}</span>
                  </div>
                  <div className="info-row" data-testid={`info-row-address-${order.id}`}>
                    <span className="info-label" data-testid={`info-label-address-${order.id}`}>Address:</span>
                    <span className="info-value" data-testid={`info-value-address-${order.id}`}>
                      {order.customerInfo.address}, {order.customerInfo.city}, {order.customerInfo.state} {order.customerInfo.zipCode}
                    </span>
                  </div>
                </div>

                <div className="items-section" data-testid={`items-section-${order.id}`}>
                  <h4 data-testid={`items-title-${order.id}`}>Items Ordered ({order.items.length})</h4>
                  <div className="items-list" data-testid={`items-list-${order.id}`}>
                    {order.items.map((item, index) => (
                      <div key={index} className="item-row" data-testid={`item-row-${order.id}-${index}`}>
                        <img src={item.image} alt={item.name} className="item-image" data-testid={`item-image-${order.id}-${index}`} />
                        <div className="item-info" data-testid={`item-info-${order.id}-${index}`}>
                          <p className="item-name" data-testid={`item-name-${order.id}-${index}`}>{item.name}</p>
                          <p className="item-category" data-testid={`item-category-${order.id}-${index}`}>{item.category}</p>
                        </div>
                        <div className="item-pricing" data-testid={`item-pricing-${order.id}-${index}`}>
                          <p className="item-qty" data-testid={`item-qty-${order.id}-${index}`}>Qty: {item.quantity}</p>
                          <p className="item-price" data-testid={`item-price-${order.id}-${index}`}>${item.price.toFixed(2)}</p>
                          <p className="item-total" data-testid={`item-total-${order.id}-${index}`}>${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="payment-summary" data-testid={`payment-summary-${order.id}`}>
                  <div className="summary-row" data-testid={`payment-subtotal-row-${order.id}`}>
                    <span data-testid={`payment-subtotal-label-${order.id}`}>Subtotal:</span>
                    <span data-testid={`payment-subtotal-value-${order.id}`}>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row" data-testid={`payment-shipping-row-${order.id}`}>
                    <span data-testid={`payment-shipping-label-${order.id}`}>Shipping:</span>
                    <span data-testid={`payment-shipping-value-${order.id}`}>FREE</span>
                  </div>
                  <div className="summary-row" data-testid={`payment-tax-row-${order.id}`}>
                    <span data-testid={`payment-tax-label-${order.id}`}>Tax:</span>
                    <span data-testid={`payment-tax-value-${order.id}`}>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="summary-row total" data-testid={`payment-total-row-${order.id}`}>
                    <span data-testid={`payment-total-label-${order.id}`}>Total:</span>
                    <span data-testid={`payment-total-value-${order.id}`}>${(order.subtotal + order.tax).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Link to="/" className="back-to-shopping" data-testid="back-to-shopping-link">
        ← Back to Shopping
      </Link>
    </div>
  );
}