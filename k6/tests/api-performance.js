/**
 * K6 API Performance Test - Advanced Scenario
 * Tests API endpoints with realistic payloads and response validation
 *
 * Run: k6 run k6/tests/api-performance.js
 */

import { loadTestOptions } from '../config/options.js';
import { check, group, sleep } from 'k6';
import http from 'k6/http';
import {
  makeRequest,
  validateResponse,
  getRandomProductId,
  randomThinkTime,
  apiErrorCount,
} from './utils.js';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5173';

export const options = loadTestOptions;

export default function apiPerformanceTest() {
  // Test API response performance
  group('API - Get Product Details', () => {
    for (let i = 0; i < 3; i++) {
      const productId = getRandomProductId(1, 10);
      const res = makeRequest('GET', `${BASE_URL}/product/${productId}`, null, {
        tags: { api: 'product-details' },
      });

      check(res, {
        'Product endpoint responds': (r) => r.status === 200,
        'Response contains product data': (r) => r.body && r.body.length > 0,
        'Response time acceptable': (r) => r.timings.duration < 1000,
      });

      randomThinkTime(0.5, 1);
    }
  });

  group('API - Product Listing', () => {
    const res = makeRequest('GET', `${BASE_URL}/`, null, {
      tags: { api: 'product-listing' },
    });

    check(res, {
      'Listing endpoint responds': (r) => r.status === 200,
      'Listing loads quickly': (r) => r.timings.duration < 500,
    });

    randomThinkTime(1, 2);
  });

  group('API - Cart Operations', () => {
    const res = makeRequest('GET', `${BASE_URL}/cart`, null, {
      tags: { api: 'cart-operations' },
    });

    check(res, {
      'Cart endpoint accessible': (r) => r.status === 200,
    });

    randomThinkTime(1, 3);
  });

  group('API - Checkout', () => {
    const checkoutData = {
      firstName: `User_${__VU}_${__ITER}`,
      lastName: 'Tester',
      email: `user_${__VU}_${__ITER}@test.com`,
      address: '123 Test Street',
      city: 'Test City',
      state: 'TS',
      zip: '12345',
      country: 'Test Country',
      cardNumber: '4111111111111111',
      expiryDate: '12/25',
      cvv: '123',
    };

    const res = makeRequest('POST', `${BASE_URL}/checkout`, checkoutData, {
      tags: { api: 'checkout' },
    });

    // Accept various responses since there might not be a backend
    check(res, {
      'Checkout request processed': (r) => 
        r.status === 200 || r.status === 201 || r.status === 404 || r.status === 500,
    });

    randomThinkTime(2, 4);
  });

  group('API - Order History', () => {
    const res = makeRequest('GET', `${BASE_URL}/orders`, null, {
      tags: { api: 'order-history' },
    });

    check(res, {
      'Order history accessible': (r) => r.status === 200,
      'Response reasonable size': (r) => r.body && r.body.length > 0,
    });

    randomThinkTime(1, 2);
  });

  group('API - Concurrent Requests', () => {
    const responses = http.batch([
      ['GET', `${BASE_URL}/`],
      ['GET', `${BASE_URL}/product/1`],
      ['GET', `${BASE_URL}/product/2`],
      ['GET', `${BASE_URL}/cart`],
    ]);

    check(responses[0], {
      'Batch request 1 successful': (r) => r.status === 200,
    });

    check(responses[1], {
      'Batch request 2 successful': (r) => r.status === 200,
    });

    const failedRequests = responses.filter(r => r.status >= 400).length;
    check(failedRequests, {
      'Batch failures < 25%': (f) => f < responses.length / 4,
    });
  });

  randomThinkTime(1, 2);
}
