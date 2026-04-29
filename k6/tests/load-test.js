/**
 * K6 Load Test - Basic Load Testing Scenario
 * Tests the application under normal operating conditions
 *
 * Run: k6 run k6/tests/load-test.js
 * Run with custom URL: k6 run k6/tests/load-test.js --vus 10 --duration 10m
 */

import { loadTestOptions } from '../config/options.js';
import { check, group, sleep } from 'k6';
import http from 'k6/http';
import {
  makeRequest,
  validateResponse,
  recordPageLoad,
  getRandomProductId,
  randomThinkTime,
} from './utils.js';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5173';

export const options = loadTestOptions;

export default function loadTest() {
  group('Load Test - Product Listing', () => {
    // Load homepage
    const homeRes = makeRequest('GET', `${BASE_URL}/`, null, {
      tags: { page: 'home' },
    });
    recordPageLoad(homeRes, 'home');
    validateResponse(homeRes, 200, 'Homepage loaded');
    randomThinkTime(1, 2);
  });

  group('Load Test - Product Details', () => {
    // Get random product
    const productId = getRandomProductId(1, 10);
    const productRes = makeRequest('GET', `${BASE_URL}/product/${productId}`, null, {
      tags: { page: 'product-detail' },
    });
    recordPageLoad(productRes, 'product-detail');
    validateResponse(productRes, 200, 'Product detail loaded');
    randomThinkTime(2, 3);
  });

  group('Load Test - Shopping Cart', () => {
    // Access shopping cart
    const cartRes = makeRequest('GET', `${BASE_URL}/cart`, null, {
      tags: { page: 'cart' },
    });
    recordPageLoad(cartRes, 'cart');
    validateResponse(cartRes, 200, 'Shopping cart loaded');
    randomThinkTime(1, 2);
  });

  // Random think time between actions
  randomThinkTime(1, 3);
}
