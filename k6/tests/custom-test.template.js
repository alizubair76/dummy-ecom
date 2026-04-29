/**
 * K6 Custom Test Template
 * Copy this file and modify to create your own k6 tests
 */

import { check, group, sleep } from 'k6';
import http from 'k6/http';

// Configuration
const BASE_URL = __ENV.BASE_URL || 'http://localhost:5173';

export const options = {
  vus: 10,
  duration: '1m',
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    http_req_failed: ['rate<0.1'],
  },
};

// Setup function - runs before test
export function setup() {
  console.log('Setting up test...');
  return {
    timestamp: new Date().toISOString(),
  };
}

// Main test function - runs for each VU
export default function testCustom(data) {
  group('Custom Test - Section 1', () => {
    // Make a request
    const response = http.get(`${BASE_URL}/`);

    // Check response
    check(response, {
      'Status is 200': (r) => r.status === 200,
      'Response time < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);
  });

  group('Custom Test - Section 2', () => {
    const response = http.get(`${BASE_URL}/cart`);
    
    check(response, {
      'Status is 200': (r) => r.status === 200,
    });

    sleep(2);
  });
}

// Teardown function - runs after test
export function teardown(data) {
  console.log('Tearing down test...');
  console.log(`Test started at: ${data.timestamp}`);
}
