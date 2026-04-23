import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/orderService';
import './Checkout.css';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const [orderData, setOrderData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    else if (!/^\d{13,19}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Valid card number required (13-19 digits)';
    }
    if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    else if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3-4 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare customer info without payment details
      const customerInfo = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode
      };

      // Submit order using the order service
      const result = await orderService.submitOrder(
        customerInfo,
        cartItems,
        getTotalPrice()
      );

      // Set order data for confirmation page
      setOrderData(result.order);
      
      // Clear cart after successful order
      clearCart();
    } catch (error) {
      console.error('Order submission error:', error);
      setErrors({ submit: error.message || 'Failed to submit order. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0 && !orderData) {
    return (
      <div className="checkout-container" data-testid="checkout-container">
        <div className="empty-cart-message" data-testid="empty-cart-message">
          <h2 data-testid="empty-cart-title">Your cart is empty</h2>
          <p data-testid="empty-cart-text">Add items to your cart before checking out.</p>
          <button
            className="continue-shopping-btn"
            onClick={() => navigate('/')}
            data-testid="continue-shopping-btn-checkout"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderData) {
    return (
      <div className="checkout-container" data-testid="checkout-container">
        <div className="order-success" data-testid="order-success-container">
          <div className="success-icon" data-testid="success-icon">✓</div>
          <h2 data-testid="success-title">Order Placed Successfully!</h2>
          <p data-testid="success-message">Thank you for your purchase!</p>
          
          <div className="order-details" data-testid="order-details">
            <h3 data-testid="order-confirmation-title">Order Confirmation</h3>
            <div className="order-info" data-testid="order-info">
              <p data-testid="order-number-row"><strong>Order Number:</strong> <span className="order-number" data-testid="order-number">{orderData.orderNumber}</span></p>
              <p data-testid="order-name-row"><strong>Name:</strong> <span data-testid="order-customer-name">{orderData.customerInfo.firstName} {orderData.customerInfo.lastName}</span></p>
              <p data-testid="order-email-row"><strong>Email:</strong> <span data-testid="order-customer-email">{orderData.customerInfo.email}</span></p>
              <p data-testid="order-address-row"><strong>Delivery Address:</strong> <span data-testid="order-delivery-address">{orderData.customerInfo.address}, {orderData.customerInfo.city}, {orderData.customerInfo.state} {orderData.customerInfo.zipCode}</span></p>
              <p data-testid="order-date-row"><strong>Order Date:</strong> <span data-testid="order-date">{new Date(orderData.createdAt).toLocaleDateString()}</span></p>
              <p data-testid="order-delivery-row"><strong>Estimated Delivery:</strong> <span data-testid="order-estimated-delivery">{new Date(orderData.estimatedDelivery).toLocaleDateString()}</span></p>
            </div>
          </div>

          <div className="order-summary-final" data-testid="order-summary-final">
            <h4 data-testid="summary-final-title">Order Summary</h4>
            <div className="summary-items" data-testid="summary-items-final">
              {orderData.items.map((item, index) => (
                <div key={index} className="summary-item-final" data-testid={`order-summary-item-${index}`}>
                  <span data-testid={`order-item-name-${index}`}>{item.name} × {item.quantity}</span>
                  <span data-testid={`order-item-total-${index}`}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-divider" data-testid="summary-divider-final-1"></div>
            <div className="summary-row-final" data-testid="order-subtotal-row">
              <span data-testid="order-subtotal-label">Subtotal:</span>
              <span data-testid="order-subtotal-value">${orderData.subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row-final" data-testid="order-tax-row">
              <span data-testid="order-tax-label">Tax:</span>
              <span data-testid="order-tax-value">${orderData.tax.toFixed(2)}</span>
            </div>
            <div className="summary-row-final" data-testid="order-shipping-row">
              <span data-testid="order-shipping-label">Shipping:</span>
              <span data-testid="order-shipping-value">FREE</span>
            </div>
            <div className="summary-row-final total" data-testid="order-total-row">
              <span data-testid="order-total-label">Total:</span>
              <span data-testid="order-total-value">${(orderData.subtotal + orderData.tax).toFixed(2)}</span>
            </div>
          </div>

          <div className="order-message" data-testid="order-message">
            <p data-testid="confirmation-email-text">A confirmation email has been sent to <strong>{orderData.customerInfo.email}</strong></p>
            <p data-testid="shipping-text">Your order will be shipped within 1-2 business days.</p>
            <p data-testid="delivery-text">Estimated delivery: 3-5 business days from shipment.</p>
            <p data-testid="tracking-text">Track your order using order number: <strong>{orderData.orderNumber}</strong></p>
          </div>

          <button
            className="back-to-home-btn"
            onClick={() => navigate('/')}
            data-testid="back-to-home-btn"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container" data-testid="checkout-container">
      <h1 data-testid="checkout-page-title">Checkout</h1>

      {errors.submit && (
        <div className="error-banner" data-testid="error-banner">
          <p data-testid="error-message">{errors.submit}</p>
        </div>
      )}

      <div className="checkout-content" data-testid="checkout-content">
        <div className="checkout-form-section" data-testid="checkout-form-section">
          <form onSubmit={handleSubmit} className="checkout-form" data-testid="checkout-form">
            {/* Shipping Information */}
            <fieldset className="form-section" data-testid="shipping-fieldset">
              <legend data-testid="shipping-legend">Shipping Information</legend>
              
              <div className="form-row" data-testid="form-row-names">
                <div className="form-group" data-testid="form-group-firstName">
                  <label htmlFor="firstName" data-testid="label-firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className={errors.firstName ? 'error' : ''}
                    data-testid="input-firstName"
                  />
                  {errors.firstName && <span className="error-message" data-testid="error-firstName">{errors.firstName}</span>}
                </div>

                <div className="form-group" data-testid="form-group-lastName">
                  <label htmlFor="lastName" data-testid="label-lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className={errors.lastName ? 'error' : ''}
                    data-testid="input-lastName"
                  />
                  {errors.lastName && <span className="error-message" data-testid="error-lastName">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-group" data-testid="form-group-email">
                <label htmlFor="email" data-testid="label-email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className={errors.email ? 'error' : ''}
                  data-testid="input-email"
                />
                {errors.email && <span className="error-message" data-testid="error-email">{errors.email}</span>}
              </div>

              <div className="form-group" data-testid="form-group-phone">
                <label htmlFor="phone" data-testid="label-phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className={errors.phone ? 'error' : ''}
                  data-testid="input-phone"
                />
                {errors.phone && <span className="error-message" data-testid="error-phone">{errors.phone}</span>}
              </div>

              <div className="form-group" data-testid="form-group-address">
                <label htmlFor="address" data-testid="label-address">Street Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  className={errors.address ? 'error' : ''}
                  data-testid="input-address"
                />
                {errors.address && <span className="error-message" data-testid="error-address">{errors.address}</span>}
              </div>

              <div className="form-row" data-testid="form-row-location">
                <div className="form-group" data-testid="form-group-city">
                  <label htmlFor="city" data-testid="label-city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    className={errors.city ? 'error' : ''}
                    data-testid="input-city"
                  />
                  {errors.city && <span className="error-message" data-testid="error-city">{errors.city}</span>}
                </div>

                <div className="form-group" data-testid="form-group-state">
                  <label htmlFor="state" data-testid="label-state">State/Province *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                    className={errors.state ? 'error' : ''}
                    data-testid="input-state"
                  />
                  {errors.state && <span className="error-message" data-testid="error-state">{errors.state}</span>}
                </div>

                <div className="form-group" data-testid="form-group-zipCode">
                  <label htmlFor="zipCode" data-testid="label-zipCode">ZIP Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    className={errors.zipCode ? 'error' : ''}
                    data-testid="input-zipCode"
                  />
                  {errors.zipCode && <span className="error-message" data-testid="error-zipCode">{errors.zipCode}</span>}
                </div>
              </div>
            </fieldset>

            {/* Payment Information */}
            <fieldset className="form-section" data-testid="payment-fieldset">
              <legend data-testid="payment-legend">Payment Information</legend>
              
              <div className="form-group" data-testid="form-group-cardNumber">
                <label htmlFor="cardNumber" data-testid="label-cardNumber">Card Number *</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  className={errors.cardNumber ? 'error' : ''}
                  data-testid="input-cardNumber"
                />
                {errors.cardNumber && <span className="error-message" data-testid="error-cardNumber">{errors.cardNumber}</span>}
              </div>

              <div className="form-group" data-testid="form-group-cardName">
                <label htmlFor="cardName" data-testid="label-cardName">Cardholder Name *</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={errors.cardName ? 'error' : ''}
                  data-testid="input-cardName"
                />
                {errors.cardName && <span className="error-message" data-testid="error-cardName">{errors.cardName}</span>}
              </div>

              <div className="form-row" data-testid="form-row-payment">
                <div className="form-group" data-testid="form-group-expiryDate">
                  <label htmlFor="expiryDate" data-testid="label-expiryDate">Expiry Date (MM/YY) *</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="12/25"
                    className={errors.expiryDate ? 'error' : ''}
                    data-testid="input-expiryDate"
                  />
                  {errors.expiryDate && <span className="error-message" data-testid="error-expiryDate">{errors.expiryDate}</span>}
                </div>

                <div className="form-group" data-testid="form-group-cvv">
                  <label htmlFor="cvv" data-testid="label-cvv">CVV *</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className={errors.cvv ? 'error' : ''}
                    data-testid="input-cvv"
                  />
                  {errors.cvv && <span className="error-message" data-testid="error-cvv">{errors.cvv}</span>}
                </div>
              </div>
            </fieldset>

            <div className="form-actions" data-testid="form-actions">
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={() => navigate('/cart')}
                disabled={isSubmitting}
                data-testid="back-to-cart-btn"
              >
                Back to Cart
              </button>
              <button 
                type="submit" 
                className="place-order-btn"
                disabled={isSubmitting}
                data-testid="place-order-btn"
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="order-summary-section" data-testid="order-summary-section">
          <h2 data-testid="summary-title">Order Summary</h2>

          <div className="cart-items-summary" data-testid="cart-items-summary">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item" data-testid={`summary-item-${item.id}`}>
                <div className="item-image" data-testid={`summary-item-image-${item.id}`}>
                  <img src={item.image} alt={item.name} data-testid={`summary-item-img-${item.id}`} />
                </div>
                <div className="item-details" data-testid={`summary-item-details-${item.id}`}>
                  <p className="item-name" data-testid={`summary-item-name-${item.id}`}>{item.name}</p>
                  <p className="item-price" data-testid={`summary-item-price-${item.id}`}>
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <div className="item-total" data-testid={`summary-item-total-${item.id}`}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="summary-divider" data-testid="summary-divider-1"></div>

          <div className="summary-details" data-testid="summary-details">
            <div className="summary-row" data-testid="checkout-subtotal-row">
              <span data-testid="checkout-subtotal-label">Subtotal:</span>
              <span data-testid="checkout-subtotal-value">${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="summary-row" data-testid="checkout-shipping-row">
              <span data-testid="checkout-shipping-label">Shipping:</span>
              <span className="shipping-free" data-testid="checkout-shipping-value">FREE</span>
            </div>
            <div className="summary-row" data-testid="checkout-tax-row">
              <span data-testid="checkout-tax-label">Tax:</span>
              <span data-testid="checkout-tax-value">${(getTotalPrice() * 0.1).toFixed(2)}</span>
            </div>
          </div>

          <div className="summary-divider" data-testid="summary-divider-2"></div>

          <div className="summary-row total-row" data-testid="checkout-total-row">
            <span data-testid="checkout-total-label">Total:</span>
            <span className="total-amount" data-testid="checkout-total-value">
              ${(getTotalPrice() + getTotalPrice() * 0.1).toFixed(2)}
            </span>
          </div>

          <div className="security-badge" data-testid="security-badge">
            <p data-testid="security-text">🔒 Secure checkout powered by TechHub</p>
          </div>
        </div>
      </div>
    </div>
  );
}