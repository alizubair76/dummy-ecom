/**
 * K6 Spike Test - Sudden Traffic Spike Handling
 * Simulates sudden burst of users to test system resilience
 *
 * Run: k6 run k6/tests/spike-test.js
 */

import { spikeTestOptions } from '../config/options.js';
import { check, group } from 'k6';
import http from 'k6/http';
import {
  makeRequest,
  validateResponse,
  recordPageLoad,
  getRandomProductId,
  randomThinkTime,
} from './utils.js';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5173';

export const options = spikeTestOptions;

export default function spikeTest() {
  // Simulate rapid browsing during spike
  group('Spike Test - Rapid Product Browsing', () => {
    for (let i = 0; i < 3; i++) {
      const productId = getRandomProductId(1, 10);
      const res = makeRequest('GET', `${BASE_URL}/product/${productId}`, null, {
        tags: { spike: 'true' },
      });
      validateResponse(res, 200, `Product ${productId} loaded during spike`);
      randomThinkTime(0.1, 0.5); // Short think time during spike
    }
  });

  group('Spike Test - Homepage during Spike', () => {
    const res = makeRequest('GET', `${BASE_URL}/`, null, {
      tags: { spike: 'true' },
    });
    recordPageLoad(res, 'spike-home');
    validateResponse(res, 200, 'Homepage responsive during spike');
  });

  group('Spike Test - Cart Access during Spike', () => {
    const res = makeRequest('GET', `${BASE_URL}/cart`, null, {
      tags: { spike: 'true' },
    });
    validateResponse(res, 200, 'Cart accessible during spike');
  });
}
