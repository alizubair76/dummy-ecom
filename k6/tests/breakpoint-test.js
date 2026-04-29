/**
 * K6 Breakpoint Test - Find System Limits
 * Aggressively increases load to find the breaking point
 *
 * Run: k6 run k6/tests/breakpoint-test.js
 */

import { breakpointTestStages } from '../config/stages.js';
import { relaxedThresholds } from '../config/thresholds.js';
import { check, group } from 'k6';
import http from 'k6/http';
import {
  makeRequest,
  validateResponse,
  getRandomProductId,
  randomThinkTime,
  slowPageCount,
  apiErrorCount,
} from './utils.js';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5173';

export const options = {
  stages: breakpointTestStages,
  thresholds: relaxedThresholds,
};

export default function breakpointTest() {
  group('Breakpoint Test - Aggressive Load', () => {
    // Rapid homepage requests
    const homeRes = makeRequest('GET', `${BASE_URL}/`, null, {
      tags: { breakpoint: 'true' },
    });
    validateResponse(homeRes, 200, 'Homepage responds under breakpoint load');
    
    if (homeRes.timings.duration > 2000) {
      slowPageCount.add(1);
    }
  });

  group('Breakpoint Test - Product Pressure', () => {
    // Multiple rapid product requests
    for (let i = 0; i < 2; i++) {
      const productId = getRandomProductId(1, 10);
      const res = makeRequest('GET', `${BASE_URL}/product/${productId}`, null, {
        tags: { breakpoint: 'true' },
      });
      
      if (res.status >= 400) {
        apiErrorCount.add(1);
      }
      validateResponse(res, [200, 429, 500], `Product ${productId} under pressure`);
    }
  });

  group('Breakpoint Test - Cart Persistence', () => {
    const res = makeRequest('GET', `${BASE_URL}/cart`, null, {
      tags: { breakpoint: 'true' },
    });
    validateResponse(res, [200, 500], 'Cart accessible at breakpoint');
  });

  randomThinkTime(0.2, 0.8);
}
