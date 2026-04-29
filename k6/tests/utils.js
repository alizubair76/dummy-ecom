/**
 * K6 Utility Functions
 * Common helper functions for k6 tests
 */

import { check, group, sleep } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';
import http from 'k6/http';

// Custom metrics
export const productLoadTime = new Trend('product_load_time');
export const checkoutFlowTime = new Trend('checkout_flow_time');
export const pageNavigationTime = new Trend('page_navigation_time');
export const apiErrorCount = new Counter('api_errors');
export const slowPageCount = new Counter('slow_pages');

/**
 * Performs an HTTP request with validation and metrics recording
 */
export function makeRequest(method, url, payload = null, params = {}) {
  const options = {
    headers: params.headers || {
      'Content-Type': 'application/json',
    },
    tags: params.tags || {},
  };

  const response = method === 'GET'
    ? http.get(url, options)
    : method === 'POST'
    ? http.post(url, JSON.stringify(payload), options)
    : method === 'PUT'
    ? http.put(url, JSON.stringify(payload), options)
    : http.del(url, options);

  // Track errors
  if (response.status >= 400) {
    apiErrorCount.add(1);
  }

  return response;
}

/**
 * Validates HTTP response
 */
export function validateResponse(response, expectedStatus = 200, checkName = 'Response OK') {
  return check(response, {
    [checkName]: (r) => r.status === expectedStatus,
    'no 5xx errors': (r) => r.status < 500,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
}

/**
 * Records page load performance
 */
export function recordPageLoad(response, pageName) {
  if (response.status === 200) {
    pageNavigationTime.add(response.timings.duration);
    if (response.timings.duration > 500) {
      slowPageCount.add(1);
    }
  }
  return response;
}

/**
 * Records product load performance
 */
export function recordProductLoad(response) {
  if (response.status === 200) {
    productLoadTime.add(response.timings.duration);
  }
  return response;
}

/**
 * Simulates user thinking time
 */
export function thinkTime(min = 1, max = 5) {
  sleep(__VU % 2 === 0 ? min : max);
}

/**
 * Simulates random user think time with variance
 */
export function randomThinkTime(baseTime = 2, variance = 1) {
  const randomVariance = (Math.random() - 0.5) * 2 * variance;
  sleep(Math.max(0.1, baseTime + randomVariance));
}

/**
 * Gets a random product ID
 */
export function getRandomProductId(min = 1, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Extracts data from JSON response
 */
export function extractData(response, path) {
  try {
    const data = response.json();
    return path.split('.').reduce((obj, prop) => obj[prop], data);
  } catch (e) {
    console.error('Failed to extract data:', e);
    return null;
  }
}

/**
 * Performs grouped requests with metrics
 */
export function performGroupedRequest(groupName, requestFn) {
  return group(groupName, () => {
    const startTime = new Date();
    const response = requestFn();
    const endTime = new Date();
    const duration = endTime - startTime;

    return {
      response,
      duration,
    };
  });
}
