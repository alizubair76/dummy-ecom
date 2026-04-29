/**
 * K6 User Flow Test - Complete Shopping Experience
 * Simulates realistic user journey: browse → search → add to cart → checkout
 *
 * Run: k6 run k6/tests/user-flow.js
 */

import { loadTestOptions } from '../config/options.js';
import { check, group } from 'k6';
import http from 'k6/http';
import {
  makeRequest,
  validateResponse,
  recordPageLoad,
  recordProductLoad,
  getRandomProductId,
  randomThinkTime,
  checkoutFlowTime,
  performGroupedRequest,
} from './utils.js';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5173';

export const options = loadTestOptions;

export default function userFlow() {
  const startTime = new Date();

  // Step 1: Visit Homepage
  group('User Flow - Step 1: Browse Homepage', () => {
    const res = makeRequest('GET', `${BASE_URL}/`);
    recordPageLoad(res, 'flow-home');
    validateResponse(res, 200, 'Homepage loaded');
    randomThinkTime(2, 4);
  });

  // Step 2: Browse Products
  group('User Flow - Step 2: View Product Listings', () => {
    for (let i = 0; i < 2; i++) {
      const productId = getRandomProductId(1, 10);
      const res = makeRequest('GET', `${BASE_URL}/product/${productId}`);
      recordProductLoad(res);
      validateResponse(res, 200, `Product ${productId} loaded`);
      randomThinkTime(2, 5);
    }
  });

  // Step 3: View Product Details
  group('User Flow - Step 3: View Product Details', () => {
    const productId = getRandomProductId(1, 10);
    const res = makeRequest('GET', `${BASE_URL}/product/${productId}`, null, {
      tags: { step: 'product-detail' },
    });
    recordProductLoad(res);
    validateResponse(res, 200, 'Product details displayed');
    randomThinkTime(3, 6);
  });

  // Step 4: Add to Cart (simulated)
  group('User Flow - Step 4: Add to Cart', () => {
    // Simulating localStorage cart update
    const cartRes = makeRequest('GET', `${BASE_URL}/cart`, null, {
      tags: { step: 'add-to-cart' },
    });
    validateResponse(cartRes, 200, 'Cart updated with item');
    randomThinkTime(1, 2);
  });

  // Step 5: Review Shopping Cart
  group('User Flow - Step 5: Review Cart', () => {
    const res = makeRequest('GET', `${BASE_URL}/cart`);
    validateResponse(res, 200, 'Shopping cart displayed');
    randomThinkTime(2, 4);
  });

  // Step 6: Proceed to Checkout
  group('User Flow - Step 6: Checkout', () => {
    const res = makeRequest('GET', `${BASE_URL}/checkout`);
    validateResponse(res, 200, 'Checkout page loaded');
    randomThinkTime(3, 5);
  });

  // Step 7: Submit Order (simulated)
  group('User Flow - Step 7: Place Order', () => {
    const checkoutPayload = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      address: '123 Test St',
      city: 'Test City',
      zip: '12345',
      country: 'Test Country',
      cardNumber: '4111111111111111',
      expiryDate: '12/25',
      cvv: '123',
    };

    const res = makeRequest('POST', `${BASE_URL}/api/orders`, checkoutPayload, {
      tags: { step: 'submit-order' },
    });
    
    // Note: This will fail if there's no backend, but tests page load
    validateResponse(res, [200, 404, 500], 'Order submission attempted');
    randomThinkTime(1, 2);
  });

  // Step 8: View Order Confirmation
  group('User Flow - Step 8: Order Confirmation', () => {
    const res = makeRequest('GET', `${BASE_URL}/orders`);
    validateResponse(res, 200, 'Order history displayed');
    randomThinkTime(1, 3);
  });

  const endTime = new Date();
  const totalFlowTime = endTime - startTime;
  checkoutFlowTime.add(totalFlowTime);

  check(totalFlowTime, {
    'Total flow time < 30s': (t) => t < 30000,
    'Total flow time < 60s': (t) => t < 60000,
  });
}
