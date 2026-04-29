/**
 * K6 Performance Thresholds Configuration
 * Defines acceptable performance limits for various metrics
 */

export const thresholds = {
  // HTTP Request Duration Thresholds
  http_req_duration: [
    'p(95)<500',  // 95% of requests complete in less than 500ms
    'p(99)<1000', // 99% of requests complete in less than 1000ms
  ],
  http_req_failed: ['rate<0.1'], // Less than 10% failure rate
  http_req_waiting: ['p(95)<400'], // 95% of requests waiting less than 400ms
  http_req_connecting: ['p(95)<100'], // Connection time under 100ms

  // Custom Metrics Thresholds
  'product_load_time': [
    'p(95)<600',
    'p(99)<1200',
  ],
  'checkout_flow_time': [
    'p(95)<2000',
    'p(99)<3000',
  ],
  'page_navigation_time': [
    'p(95)<800',
    'p(99)<1500',
  ],
};

export const strictThresholds = {
  // Stricter thresholds for production
  http_req_duration: [
    'p(95)<300',
    'p(99)<600',
  ],
  http_req_failed: ['rate<0.05'],
  http_req_waiting: ['p(95)<250'],
};

export const relaxedThresholds = {
  // More relaxed thresholds for development/testing
  http_req_duration: [
    'p(95)<1000',
    'p(99)<2000',
  ],
  http_req_failed: ['rate<0.15'],
};
