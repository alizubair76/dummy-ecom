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
      <div className="order-history-container">
        <h1>Order History</h1>

        <form className="search-form" onSubmit={handleSearchSubmit}>
          <div className="search-box">
            <input
              type="email"
              placeholder="Search orders by email..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">Search</button>
          </div>
        </form>

        <div className="no-orders">
          <p>No orders found</p>
          {filterEmail && (
            <button className="clear-filter-btn" onClick={handleClearFilter}>
              Clear Filter
            </button>
          )}
          <Link to="/" className="continue-shopping-link">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history-container">
      <h1>Order History</h1>

      <form className="search-form" onSubmit={handleSearchSubmit}>
        <div className="search-box">
          <input
            type="email"
            placeholder="Search orders by email..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
          {filterEmail && (
            <button 
              type="button" 
              className="clear-filter-btn" 
              onClick={handleClearFilter}
            >
              Clear
            </button>
          )}
        </div>
      </form>

      <div className="orders-summary">
        <div className="summary-card">
          <p className="summary-label">Total Orders</p>
          <p className="summary-value">{orders.length}</p>
        </div>
        <div className="summary-card">
          <p className="summary-label">Total Spent</p>
          <p className="summary-value">
            ${orders.reduce((sum, order) => sum + order.subtotal, 0).toFixed(2)}
          </p>
        </div>
        <div className="summary-card">
          <p className="summary-label">Confirmed</p>
          <p className="summary-value">
            {orders.filter(o => o.status === 'confirmed').length}
          </p>
        </div>
        <div className="summary-card">
          <p className="summary-label">Delivered</p>
          <p className="summary-value">
            {orders.filter(o => o.status === 'delivered').length}
          </p>
        </div>
      </div>

      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div 
              className="order-header"
              onClick={() => handleExpandOrder(order.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="order-header-left">
                <h3>{order.orderNumber}</h3>
                <p className="order-date">
                  {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>

              <div className="order-header-right">
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                <p className="order-total">${(order.subtotal + order.tax).toFixed(2)}</p>
                <span className="expand-icon">
                  {expandedOrder === order.id ? '▲' : '▼'}
                </span>
              </div>
            </div>

            {expandedOrder === order.id && (
              <div className="order-details-expanded">
                <div className="order-info-section">
                  <h4>Order Information</h4>
                  <div className="info-row">
                    <span className="info-label">Order Number:</span>
                    <span className="info-value">{order.orderNumber}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Order Date:</span>
                    <span className="info-value">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Status:</span>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Estimated Delivery:</span>
                    <span className="info-value">{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="customer-info-section">
                  <h4>Customer Information</h4>
                  <div className="info-row">
                    <span className="info-label">Name:</span>
                    <span className="info-value">{order.customerInfo.firstName} {order.customerInfo.lastName}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{order.customerInfo.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone:</span>
                    <span className="info-value">{order.customerInfo.phone}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Address:</span>
                    <span className="info-value">
                      {order.customerInfo.address}, {order.customerInfo.city}, {order.customerInfo.state} {order.customerInfo.zipCode}
                    </span>
                  </div>
                </div>

                <div className="items-section">
                  <h4>Items Ordered ({order.items.length})</h4>
                  <div className="items-list">
                    {order.items.map((item, index) => (
                      <div key={index} className="item-row">
                        <img src={item.image} alt={item.name} className="item-image" />
                        <div className="item-info">
                          <p className="item-name">{item.name}</p>
                          <p className="item-category">{item.category}</p>
                        </div>
                        <div className="item-pricing">
                          <p className="item-qty">Qty: {item.quantity}</p>
                          <p className="item-price">${item.price.toFixed(2)}</p>
                          <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="payment-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>FREE</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax:</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>${(order.subtotal + order.tax).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Link to="/" className="back-to-shopping">
        ← Back to Shopping
      </Link>
    </div>
  );
}
