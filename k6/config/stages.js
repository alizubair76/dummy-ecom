/**
 * K6 Load Testing Stages Configuration
 * Defines different load patterns for various test scenarios
 */

// Load Test: Gradual increase to normal load
export const loadTestStages = [
  { duration: '2m', target: 10 },   // Ramp up to 10 users over 2 minutes
  { duration: '5m', target: 10 },   // Stay at 10 users for 5 minutes
  { duration: '2m', target: 0 },    // Ramp down to 0 users over 2 minutes
];

// Stress Test: Increase load until system fails
export const stressTestStages = [
  { duration: '2m', target: 10 },   // Start with 10 users
  { duration: '2m', target: 25 },   // Increase to 25 users
  { duration: '2m', target: 50 },   // Increase to 50 users
  { duration: '2m', target: 100 },  // Increase to 100 users
  { duration: '3m', target: 100 },  // Hold at 100 users
  { duration: '2m', target: 0 },    // Ramp down
];

// Spike Test: Sudden traffic spike
export const spikeTestStages = [
  { duration: '1m', target: 10 },   // Normal load (10 users)
  { duration: '30s', target: 100 }, // Sudden spike to 100 users
  { duration: '1m', target: 100 },  // Hold spike
  { duration: '30s', target: 10 },  // Drop back to normal
  { duration: '1m', target: 0 },    // Ramp down
];

// Soak Test: Long duration at consistent load
export const soakTestStages = [
  { duration: '5m', target: 20 },   // Ramp up to 20 users
  { duration: '30m', target: 20 },  // Hold for 30 minutes (long duration)
  { duration: '5m', target: 0 },    // Ramp down
];

// Smoke Test: Quick validation
export const smokeTestStages = [
  { duration: '30s', target: 5 },   // Quick ramp to 5 users
  { duration: '30s', target: 0 },   // Ramp down
];

// Breakpoint Test: Aggressively increase until failure
export const breakpointTestStages = [
  { duration: '1m', target: 10 },
  { duration: '1m', target: 20 },
  { duration: '1m', target: 40 },
  { duration: '1m', target: 80 },
  { duration: '1m', target: 160 },
  { duration: '1m', target: 320 },
  { duration: '2m', target: 0 },
];
