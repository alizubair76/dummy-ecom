/**
 * K6 Smoke Test - Quick Sanity Check
 * Fast validation that basic functionality works before running larger tests
 *
 * Run: k6 run k6/tests/smoke-test.js
 */

import { smokeTestOptions } from '../config/options.js';
import { check, group } from 'k6';
import http from 'k6/http';
import {
  makeRequest,
  validateResponse,
  recordPageLoad,
} from './utils.js';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5173';

export const options = smokeTestOptions;

export default function smokeTest() {
  group('Smoke Test - Homepage', () => {
    const res = makeRequest('GET', `${BASE_URL}/`);
    recordPageLoad(res, 'smoke-home');
    check(res, {
      'Homepage Status OK': (r) => r.status === 200,
      'Homepage loads quickly': (r) => r.timings.duration < 2000,
    });
  });

  group('Smoke Test - Product Listing', () => {
    const res = makeRequest('GET', `${BASE_URL}/product/1`);
    validateResponse(res, 200, 'Product page accessible');
  });

  group('Smoke Test - Shopping Cart', () => {
    const res = makeRequest('GET', `${BASE_URL}/cart`);
    validateResponse(res, 200, 'Cart page accessible');
  });

  group('Smoke Test - Checkout Page', () => {
    const res = makeRequest('GET', `${BASE_URL}/checkout`);
    validateResponse(res, 200, 'Checkout page accessible');
  });

  group('Smoke Test - Order History', () => {
    const res = makeRequest('GET', `${BASE_URL}/orders`);
    validateResponse(res, 200, 'Order history page accessible');
  });
}
