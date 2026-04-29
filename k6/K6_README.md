# K6 Performance Testing Guide

## Overview

This directory contains comprehensive k6 performance tests for the dummy e-commerce application. k6 is a modern load testing tool designed for testing the performance and reliability of APIs and web applications.

## 📋 Test Types

### 1. **Smoke Test** (`smoke-test.js`)
Quick sanity check to ensure the application is operational.
- **Duration**: ~1 minute
- **Users**: 5 VUs
- **Purpose**: Fast validation before running larger tests
- **Command**: `k6 run k6/tests/smoke-test.js`

### 2. **Load Test** (`load-test.js`)
Tests application under normal, expected operating conditions.
- **Ramp-up**: 2 minutes to 10 users
- **Steady state**: 5 minutes at 10 users
- **Ramp-down**: 2 minutes to 0 users
- **Purpose**: Measure baseline performance
- **Command**: `k6 run k6/tests/load-test.js`

### 3. **Stress Test** (`stress-test.js`)
Gradually increases load to find the application's breaking point.
- **Stages**: 10 → 25 → 50 → 100 users
- **Purpose**: Identify performance degradation under extreme load
- **Command**: `k6 run k6/tests/stress-test.js`

### 4. **Spike Test** (`spike-test.js`)
Simulates sudden traffic surges to test system resilience.
- **Pattern**: 10 users → sudden spike to 100 users → back to 10 users
- **Purpose**: Verify recovery from traffic spikes
- **Command**: `k6 run k6/tests/spike-test.js`

### 5. **Soak Test** (`soak-test.js`)
Extended duration test at constant load to identify memory leaks and stability issues.
- **Duration**: 30 minutes at 20 users (configurable)
- **Purpose**: Detect long-running stability issues
- **Command**: `k6 run k6/tests/soak-test.js`
- **Note**: Long-running test; adjust stages in `config/stages.js` if needed

### 6. **User Flow Test** (`user-flow.js`)
Simulates realistic user journey: browse → view details → add to cart → checkout.
- **Steps**: 8-step complete shopping flow
- **Purpose**: Test critical business workflows
- **Command**: `k6 run k6/tests/user-flow.js`

### 7. **Breakpoint Test** (`breakpoint-test.js`)
Aggressively increases load to find absolute breaking point.
- **Progression**: 10 → 20 → 40 → 80 → 160 → 320 users
- **Purpose**: Determine maximum system capacity
- **Command**: `k6 run k6/tests/breakpoint-test.js`

## 🚀 Quick Start

### Prerequisites
1. Install k6: [https://k6.io/docs/getting-started/installation/](https://k6.io/docs/getting-started/installation/)
2. Have the application running on `http://localhost:5173`

### Running Tests

**On Linux/macOS:**
```bash
# Run a single test
k6 run k6/tests/smoke-test.js

# Run with custom base URL
BASE_URL=http://example.com k6 run k6/tests/load-test.js

# Run all tests using helper script
bash k6/scripts/run-tests.sh all
```

**On Windows (Command Prompt):**
```batch
# Run a single test
k6 run k6\tests\smoke-test.js

# Run with custom base URL
set BASE_URL=http://example.com
k6 run k6\tests\load-test.js

# Run all tests using helper script
k6\scripts\run-tests.bat all
```

**PowerShell:**
```powershell
# Run a single test
k6 run k6/tests/smoke-test.js

# Run with custom base URL
$env:BASE_URL = "http://example.com"
k6 run k6/tests/load-test.js
```

## 📊 Performance Thresholds

The tests include predefined performance thresholds (defined in `config/thresholds.js`):

### Standard Thresholds
- **Response time (p95)**: < 500ms
- **Response time (p99)**: < 1000ms
- **Failure rate**: < 10%
- **Connection time (p95)**: < 100ms

### Strict Thresholds (for production)
- **Response time (p95)**: < 300ms
- **Response time (p99)**: < 600ms
- **Failure rate**: < 5%

### Relaxed Thresholds (for stress/breakpoint tests)
- **Response time (p95)**: < 1000ms
- **Response time (p99)**: < 2000ms
- **Failure rate**: < 15%

## 🎯 Configuration

### Modifying Test Stages
Edit `config/stages.js` to customize VU ramp-up patterns:

```javascript
export const loadTestStages = [
  { duration: '2m', target: 10 },   // Ramp up to 10 users over 2 minutes
  { duration: '5m', target: 10 },   // Stay at 10 users for 5 minutes
  { duration: '2m', target: 0 },    // Ramp down to 0 users over 2 minutes
];
```

### Custom Thresholds
Edit `config/thresholds.js` to adjust performance requirements:

```javascript
export const thresholds = {
  http_req_duration: [
    'p(95)<500',  // 95% of requests under 500ms
    'p(99)<1000', // 99% of requests under 1000ms
  ],
  http_req_failed: ['rate<0.1'], // Less than 10% failures
};
```

## 📈 Metrics Collected

### Standard HTTP Metrics
- `http_req_duration` - Request duration
- `http_req_waiting` - Server processing time
- `http_req_connecting` - Connection establishment time
- `http_req_failed` - Failed request count

### Custom Metrics
- `product_load_time` - Product page load time
- `checkout_flow_time` - Complete checkout flow duration
- `page_navigation_time` - Page navigation duration
- `api_errors` - Count of API errors
- `slow_pages` - Count of slow page loads (>500ms)

## 📝 Output & Reporting

### Real-time Output
Tests display real-time metrics including:
- Active VUs (Virtual Users)
- Request throughput
- Success/failure rates
- Response time percentiles

### JSON Export
Results can be exported to JSON for further analysis:

```bash
k6 run k6/tests/load-test.js --out json=results.json
```

### Export to Cloud
Send results to k6 Cloud for detailed analysis:

```bash
k6 run k6/tests/load-test.js --cloud
```

## 🔍 Understanding Results

### Key Metrics to Analyze

**Response Time Percentiles (p95, p99)**
- p95: 95% of requests respond faster than this value
- p99: 99% of requests respond faster than this value
- Lower is better; indicates consistent performance

**Failure Rate**
- Percentage of failed requests
- Look for spikes under high load

**Throughput (RPS)**
- Requests per second
- Indicates system capacity

**VU Ramp-up**
- How the system performs as load increases
- Identify point where performance degrades

## 🛠️ Troubleshooting

### Test Not Running
1. Verify k6 is installed: `k6 version`
2. Check application is running: `curl http://localhost:5173`
3. Check firewall isn't blocking connections

### Threshold Failures
- Review the metrics in the output
- Adjust thresholds if expectations are wrong
- Investigate server-side bottlenecks

### High Error Rates
- Check application logs
- Verify database connections
- Review error messages in k6 output

## 📚 Additional Resources

- [k6 Documentation](https://k6.io/docs/)
- [k6 JavaScript API](https://k6.io/docs/javascript-api/)
- [HTTP Client Library](https://k6.io/docs/javascript-api/k6-http/)
- [Threshold Configuration](https://k6.io/docs/using-k6/thresholds/)
- [Scripting Examples](https://k6.io/docs/examples/)

## 🤝 Best Practices

1. **Start with smoke test** - Validate setup before larger tests
2. **Run during off-peak** - Avoid interfering with production users
3. **Isolate variables** - Test one thing at a time
4. **Review baselines** - Establish performance baselines for comparison
5. **Monitor infrastructure** - Track CPU, memory, network during tests
6. **Gradual load increase** - Avoid shocking the system
7. **Use realistic scenarios** - Simulate actual user behavior

## 📋 Test Execution Checklist

- [ ] Application is running on `http://localhost:5173`
- [ ] k6 is installed and in PATH
- [ ] No other tests are running
- [ ] Network connectivity is stable
- [ ] Infrastructure resources are available
- [ ] Baseline metrics are established
- [ ] Threshold expectations are realistic
