# K6 Performance Testing Suite - File Structure & Documentation

## 📂 Directory Structure

```
k6/
├── config/                          # Configuration files
│   ├── options.js                   # Test options & execution profiles
│   ├── stages.js                    # Load progression stages
│   └── thresholds.js                # Performance thresholds
├── tests/                           # Test scenarios
│   ├── utils.js                     # Shared utility functions & custom metrics
│   ├── smoke-test.js                # Quick sanity check (1 min)
│   ├── load-test.js                 # Normal operating load (9 min)
│   ├── stress-test.js               # Increase until failure (11 min)
│   ├── spike-test.js                # Sudden traffic surge (3.5 min)
│   ├── soak-test.js                 # Extended stability test (30 min)
│   ├── user-flow.js                 # Complete shopping journey (2 min)
│   ├── breakpoint-test.js           # Find breaking point (10 min)
│   ├── api-performance.js           # API-specific performance tests
│   └── custom-test.template.js      # Template for creating custom tests
├── scripts/                         # Helper scripts
│   ├── run-tests.sh                 # Linux/macOS test runner
│   └── run-tests.bat                # Windows test runner
├── results/                         # Test results storage
│   └── (generated test reports)
├── K6_README.md                     # Comprehensive documentation
├── QUICKSTART.md                    # Quick start guide
├── NPM_SCRIPTS.json                 # npm scripts to add to package.json
└── FILE_STRUCTURE.md                # This file

```

## 📋 File Descriptions

### Configuration Files (`k6/config/`)

#### `options.js`
Reusable test configuration objects for different test types.
- `commonOptions` - Base options for all tests
- `loadTestOptions` - Standard load testing configuration
- `stressTestOptions` - Stress testing configuration
- `spikeTestOptions` - Spike testing configuration
- `soakTestOptions` - Soak testing configuration
- `smokeTestOptions` - Quick smoke test configuration
- `breakpointTestOptions` - Breakpoint testing configuration

#### `stages.js`
Defines VU (Virtual User) progression patterns for each test type.
- Gradual ramp-up for realistic load testing
- Aggressive ramp-up for stress/breakpoint testing
- Sudden spikes for spike testing
- Long duration patterns for soak testing

#### `thresholds.js`
Performance requirement definitions:
- Standard thresholds (p95 < 500ms, failure rate < 10%)
- Strict thresholds (production-ready, p95 < 300ms)
- Relaxed thresholds (for stress/spike tests)

### Test Files (`k6/tests/`)

#### `utils.js`
Shared utility functions used across all tests:
- `makeRequest()` - HTTP request wrapper with error tracking
- `validateResponse()` - Response validation with checks
- `recordPageLoad()` - Performance metric recording
- `recordProductLoad()` - Product-specific metrics
- `getRandomProductId()` - Random data generation
- `randomThinkTime()` - Realistic user think time simulation
- `extractData()` - JSON response parsing
- Custom metrics: `productLoadTime`, `checkoutFlowTime`, `pageNavigationTime`

#### `smoke-test.js` ⚡
Quick validation test (1 minute, 5 VUs)
- Tests: Home, Product, Cart, Checkout, Order History
- Validates basic functionality before larger tests
- **Best for**: CI/CD pipelines, quick checks

#### `load-test.js` 📈
Standard load testing (9 minutes)
- Ramp-up: 2 min to 10 users
- Steady state: 5 min at 10 users
- Ramp-down: 2 min to 0 users
- **Best for**: Baseline performance measurement

#### `stress-test.js` 💪
Gradual load increase (11 minutes)
- Progressive increase: 10 → 25 → 50 → 100 users
- Find performance degradation point
- **Best for**: Identifying system breaking points

#### `spike-test.js` ⚡
Sudden traffic spike (3.5 minutes)
- Normal load: 10 users
- Spike: 100 users
- Recovery measurement
- **Best for**: Testing spike resilience

#### `soak-test.js` 🧪
Extended duration test (30+ minutes)
- Constant load: 20 users for 30 minutes
- Detect memory leaks, connection issues
- **Best for**: Stability verification, resource monitoring

#### `user-flow.js` 🛒
Complete shopping experience (2 minutes)
- 8-step realistic user journey
- Browse → Details → Cart → Checkout
- **Best for**: End-to-end performance validation

#### `breakpoint-test.js` 🔴
Aggressive load until failure (10 minutes)
- Exponential increase: 10 → 20 → 40 → 80 → 160 → 320 users
- Find absolute system capacity
- **Best for**: Maximum capacity testing

#### `api-performance.js` 🌐
API-specific performance testing
- Product API endpoints
- Cart operations
- Checkout operations
- Concurrent request batching
- **Best for**: Backend API performance analysis

#### `custom-test.template.js` 🎨
Template for creating custom tests
- Provides skeleton structure
- Demonstrates best practices
- Ready to copy and modify

### Script Files (`k6/scripts/`)

#### `run-tests.sh`
Bash script for Linux/macOS
- Functions for each test type
- Automatic result export to JSON
- Usage: `bash k6/scripts/run-tests.sh [smoke|load|stress|spike|soak|flow|breakpoint|all]`

#### `run-tests.bat`
Batch script for Windows
- Similar functionality to shell script
- Usage: `k6\scripts\run-tests.bat [smoke|load|stress|spike|soak|flow|breakpoint|all]`

### Documentation Files

#### `K6_README.md` 📚
Comprehensive documentation:
- Test type descriptions
- Running instructions
- Threshold explanations
- Metrics collection guide
- Troubleshooting guide
- Best practices

#### `QUICKSTART.md` 🚀
Quick start guide for new users:
- Installation instructions
- First test run walkthrough
- Result interpretation
- Common commands
- Customization examples
- Troubleshooting tips

#### `NPM_SCRIPTS.json` 📦
npm scripts to add to package.json:
- `npm run test:k6:smoke`
- `npm run test:k6:load`
- `npm run test:k6:stress`
- etc.

## 🚀 Quick Reference

### Running Tests

**Individual Tests:**
```bash
npm run test:k6:smoke      # ~1 minute
npm run test:k6:load       # ~9 minutes
npm run test:k6:stress     # ~11 minutes
npm run test:k6:spike      # ~3.5 minutes
npm run test:k6:soak       # ~40 minutes
npm run test:k6:flow       # ~2 minutes
npm run test:k6:breakpoint # ~10 minutes
```

**All Tests (except soak):**
```bash
npm run test:k6:all
```

### Custom Commands

**With different base URL:**
```bash
BASE_URL=https://myapp.com npm run test:k6:load
```

**Export to JSON:**
```bash
k6 run k6/tests/load-test.js --out json=results.json
```

**Custom VU count:**
```bash
k6 run k6/tests/load-test.js --vus 50 --duration 5m
```

## 📊 Test Matrix

| Test | Duration | VUs | Use Case |
|------|----------|-----|----------|
| Smoke | 1 min | 5 | Quick validation |
| Load | 9 min | 10 | Baseline perf |
| Stress | 11 min | 10→100 | Find breaking point |
| Spike | 3.5 min | 10→100→10 | Spike resilience |
| Soak | 40 min | 20 | Long-term stability |
| User Flow | 2 min | 10 | E2E journey |
| Breakpoint | 10 min | 10→320 | Max capacity |
| API Perf | 9 min | 10 | API endpoints |

## 🎯 Recommended Test Schedule

### Daily (CI/CD Pipeline)
```bash
npm run test:k6:smoke       # Quick sanity check
```

### Weekly
```bash
npm run test:k6:load        # Baseline performance
npm run test:k6:stress      # Breaking point identification
npm run test:k6:spike       # Spike resilience
```

### Monthly
```bash
npm run test:k6:soak        # Long-term stability
npm run test:k6:breakpoint  # Capacity planning
```

### Before Major Releases
```bash
npm run test:k6:all         # Comprehensive test suite
```

## 💾 Results Storage

Test results are saved to `k6/results/` directory:
- `smoke-test-results.json`
- `load-test-results.json`
- `stress-test-results.json`
- `spike-test-results.json`
- `soak-test-results.json`
- `user-flow-results.json`
- `breakpoint-test-results.json`

Results can be imported into k6 Cloud for visualization and comparison.

## 🔧 Customization Points

### Easy (No code changes)
- VU counts: Use `--vus` flag
- Duration: Use `--duration` flag
- Base URL: Use `BASE_URL` environment variable

### Intermediate (Config file changes)
- Edit `k6/config/stages.js` for different ramp-up patterns
- Edit `k6/config/thresholds.js` for performance requirements
- Edit `k6/config/options.js` for test configurations

### Advanced (Test file changes)
- Modify individual test files for specific scenarios
- Copy `custom-test.template.js` to create new tests
- Add custom metrics and checks

## 📞 Support & Documentation

- **Installation Help**: See QUICKSTART.md
- **Detailed Documentation**: See K6_README.md
- **Official k6 Docs**: https://k6.io/docs/
- **API Reference**: https://k6.io/docs/javascript-api/

## ✅ Validation Checklist

- [ ] k6 is installed (`k6 version`)
- [ ] Application runs on http://localhost:5173
- [ ] Network connectivity is stable
- [ ] No other k6 tests are running
- [ ] Sufficient system resources available
- [ ] Results directory exists (`k6/results/`)
- [ ] npm scripts added to package.json
