/**
 * K6 Stress Test - System Breaking Point Analysis
 * Gradually increases load until the system reaches its breaking point
 *
 * Run: k6 run k6/tests/stress-test.js
 */

import { stressTestOptions } from '../config/options.js';
import { check, group } from 'k6';
import http from 'k6/http';
import {
  makeRequest,
  validateResponse,
  recordPageLoad,
  getRandomProductId,
  randomThinkTime,
  slowPageCount,
} from './utils.js';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5173';

export const options = stressTestOptions;

export default function stressTest() {
  group('Stress Test - Homepage', () => {
    const res = makeRequest('GET', `${BASE_URL}/`, null, {
      tags: { page: 'home', test: 'stress' },
    });
    recordPageLoad(res, 'stress-home');
    validateResponse(res, 200, 'Homepage available under stress');
    
    if (res.timings.duration > 1000) {
      slowPageCount.add(1);
    }
  });

  group('Stress Test - Random Product', () => {
    const productId = getRandomProductId(1, 10);
    const res = makeRequest('GET', `${BASE_URL}/product/${productId}`, null, {
      tags: { page: 'product-detail', test: 'stress' },
    });
    recordPageLoad(res, 'stress-product');
    validateResponse(res, 200, 'Product detail available under stress');
  });

  group('Stress Test - Checkout Page', () => {
    const res = makeRequest('GET', `${BASE_URL}/checkout`, null, {
      tags: { page: 'checkout', test: 'stress' },
    });
    validateResponse(res, 200, 'Checkout page available under stress');
  });

  group('Stress Test - Order History', () => {
    const res = makeRequest('GET', `${BASE_URL}/orders`, null, {
      tags: { page: 'orders', test: 'stress' },
    });
    validateResponse(res, 200, 'Order history available under stress');
  });

  randomThinkTime(0.5, 1.5);
}
