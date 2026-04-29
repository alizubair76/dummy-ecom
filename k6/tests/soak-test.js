/**
 * K6 Soak Test - Extended Duration Stability
 * Tests system stability over an extended period
 *
 * Run: k6 run k6/tests/soak-test.js
 * Note: Default duration is 30 minutes. Adjust stages in config/stages.js as needed
 */

import { soakTestOptions } from '../config/options.js';
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

export const options = soakTestOptions;

export default function soakTest() {
  group('Soak Test - Realistic User Session', () => {
    // Browse homepage
    const homeRes = makeRequest('GET', `${BASE_URL}/`, null, {
      tags: { soak: 'true' },
    });
    recordPageLoad(homeRes, 'soak-home');
    validateResponse(homeRes, 200, 'Homepage accessible during soak');
    randomThinkTime(2, 4);

    // Browse several products
    for (let i = 0; i < 3; i++) {
      const productId = getRandomProductId(1, 10);
      const productRes = makeRequest('GET', `${BASE_URL}/product/${productId}`, null, {
        tags: { soak: 'true' },
      });
      recordPageLoad(productRes, 'soak-product');
      validateResponse(productRes, 200, `Product ${productId} loaded during soak`);
      randomThinkTime(3, 5);
    }

    // Access cart
    const cartRes = makeRequest('GET', `${BASE_URL}/cart`, null, {
      tags: { soak: 'true' },
    });
    validateResponse(cartRes, 200, 'Cart accessible during soak');
    randomThinkTime(2, 4);

    // Browse order history
    const ordersRes = makeRequest('GET', `${BASE_URL}/orders`, null, {
      tags: { soak: 'true' },
    });
    validateResponse(ordersRes, 200, 'Order history accessible during soak');
    randomThinkTime(3, 6);
  });
}
