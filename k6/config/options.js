/**
 * K6 Common Options Configuration
 * Reusable configuration objects for different test types
 */

import { thresholds, strictThresholds, relaxedThresholds } from './thresholds.js';
import {
  loadTestStages,
  stressTestStages,
  spikeTestStages,
  soakTestStages,
  smokeTestStages,
  breakpointTestStages,
} from './stages.js';

// Common options for all tests
export const commonOptions = {
  vus: 1,
  duration: '30s',
  thresholds: thresholds,
  setupTimeout: '30s',
  teardownTimeout: '30s',
};

// Load Test Options
export const loadTestOptions = {
  stages: loadTestStages,
  thresholds: thresholds,
  setupTimeout: '30s',
  teardownTimeout: '30s',
};

// Stress Test Options
export const stressTestOptions = {
  stages: stressTestStages,
  thresholds: relaxedThresholds, // More relaxed during stress
  setupTimeout: '30s',
  teardownTimeout: '30s',
};

// Spike Test Options
export const spikeTestOptions = {
  stages: spikeTestStages,
  thresholds: relaxedThresholds,
  setupTimeout: '30s',
  teardownTimeout: '30s',
};

// Soak Test Options
export const soakTestOptions = {
  stages: soakTestStages,
  thresholds: strictThresholds, // Stricter for long duration tests
  setupTimeout: '30s',
  teardownTimeout: '30s',
};

// Smoke Test Options
export const smokeTestOptions = {
  stages: smokeTestStages,
  thresholds: thresholds,
  setupTimeout: '30s',
  teardownTimeout: '30s',
};

// Breakpoint Test Options
export const breakpointTestOptions = {
  stages: breakpointTestStages,
  thresholds: relaxedThresholds,
  setupTimeout: '30s',
  teardownTimeout: '30s',
};
