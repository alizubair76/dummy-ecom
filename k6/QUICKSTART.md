# K6 Performance Testing - Quick Start Guide

## 📦 Installation

### Prerequisites
- Node.js 14+ installed
- Your e-commerce application running

### Install k6

**Windows (using Chocolatey):**
```powershell
choco install k6
```

**Windows (direct download):**
Download from [https://k6.io/docs/getting-started/installation/](https://k6.io/docs/getting-started/installation/)

**macOS:**
```bash
brew install k6
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install -y apt-transport-https
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --import https://dl.k6.io/key.gpg
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6-sources.list
sudo apt-get update
sudo apt-get install k6
```

**Verify Installation:**
```bash
k6 version
```

## 🚀 First Test Run

### 1. Start Your Application
```bash
npm run dev
# Opens at http://localhost:5173
```

### 2. Run Smoke Test (Quick 1-minute test)
```bash
npm run test:k6:smoke
```

### 3. Interpret Results

You'll see output like:
```
     data_received..................: 45 kB   450 B/s
     data_sent.......................: 3.5 kB 35 B/s
     http_req_duration...............: avg=150ms  p(95)=250ms p(99)=350ms
     http_req_failed.................: 0.00%
     http_req_waiting................: avg=140ms  p(95)=240ms p(99)=340ms
     iteration_duration..............: avg=2.3s   min=1.2s  max=4.5s
     iterations.......................: 10     100/s
     vus_max..........................: 5
```

**Green ✓** = Test passed  
**Red ✗** = Test failed (exceeds thresholds)

## 📊 Available Tests

### Quick Tests (< 5 minutes)
```bash
npm run test:k6:smoke       # 1 min - Quick sanity check
npm run test:k6:load        # ~9 min - Normal operating load
```

### Performance Tests (5-15 minutes)
```bash
npm run test:k6:stress      # ~11 min - Increase load until failure
npm run test:k6:spike       # ~3.5 min - Sudden traffic surge
npm run test:k6:flow        # ~2 min - Complete shopping flow
```

### Advanced Tests (30+ minutes)
```bash
npm run test:k6:breakpoint  # ~10 min - Find absolute breaking point
npm run test:k6:soak        # ~40 min - Long duration stability test
```

## 🎯 Common Commands

### Run with Custom URL
```bash
BASE_URL=https://myapp.com npm run test:k6:smoke
```

### Run with Custom VU Count
```bash
k6 run k6/tests/smoke-test.js --vus 10 --duration 2m
```

### Export Results to JSON
```bash
k6 run k6/tests/load-test.js --out json=results.json
```

### Send Results to k6 Cloud
```bash
k6 run k6/tests/load-test.js --cloud
```

## 🔍 Key Metrics Explained

| Metric | Good Value | What It Means |
|--------|-----------|--------------|
| `http_req_duration` | p95 < 500ms | 95% of requests complete in <500ms |
| `http_req_failed` | < 10% | Less than 10% of requests fail |
| `http_req_waiting` | p95 < 400ms | Server response time is good |
| `iterations` | High | Many requests completed |
| `vus_max` | Matches expected | Correct number of virtual users |

## 📈 Understanding Test Results

### Scenario 1: All Green ✓
```
✓ checks................................: 98.5% (197 / 200)
✓ http_req_duration...................: avg=120ms p(95)=350ms p(99)=450ms
✓ http_req_failed......................: 0.00%
```
**Interpretation**: System performing excellently. All thresholds met.

### Scenario 2: Some Failures
```
✗ checks................................: 95.0% (190 / 200)
✗ http_req_duration...................: avg=800ms p(95)=2000ms p(99)=4000ms
✓ http_req_failed......................: 5.00%
```
**Interpretation**: Performance degrading under load. Response times increasing.

### Scenario 3: Critical Issues
```
✗ checks................................: 60.0% (120 / 200)
✗ http_req_failed......................: 35.00%
```
**Interpretation**: System experiencing serious issues. Many requests failing.

## 🛠️ Customizing Tests

### Modify VU Progression (How many users)
Edit `k6/config/stages.js`:
```javascript
export const loadTestStages = [
  { duration: '5m', target: 50 },   // Increase to 50 users
  { duration: '10m', target: 50 },  // Hold for 10 minutes
  { duration: '5m', target: 0 },    // Ramp down
];
```

### Adjust Performance Thresholds
Edit `k6/config/thresholds.js`:
```javascript
export const thresholds = {
  http_req_duration: [
    'p(95)<300',   // Stricter: 95% requests < 300ms
    'p(99)<600',
  ],
  http_req_failed: ['rate<0.05'], // Stricter: less than 5% failures
};
```

## 📊 Running Multiple Tests

### Sequential Execution
```bash
# Run each test one after another
npm run test:k6:smoke && npm run test:k6:load && npm run test:k6:stress
```

### All Tests (Linux/macOS)
```bash
bash k6/scripts/run-tests.sh all
```

### All Tests (Windows)
```batch
k6\scripts\run-tests.bat all
```

## 🐛 Troubleshooting

### Issue: "Command not found: k6"
**Solution**: Ensure k6 is installed and in your PATH
```bash
k6 version  # Verify installation
```

### Issue: "Connection refused"
**Solution**: Make sure your app is running
```bash
npm run dev  # In another terminal
```

### Issue: "High failure rate"
**Solution**: 
1. Check application logs
2. Verify database is running
3. Check network connectivity
4. Reduce VU count to identify breaking point

### Issue: "Timeout errors"
**Solution**:
1. Increase timeout in test configuration
2. Check server resource usage
3. Verify network isn't throttled

## 📚 Next Steps

1. **Establish Baseline**: Run smoke test to confirm setup
2. **Load Test**: Identify normal performance under expected load
3. **Stress Test**: Find where performance degrades
4. **Optimize**: Use findings to optimize application
5. **Monitor**: Regularly run tests to track performance

## 📖 Learn More

- [k6 Official Documentation](https://k6.io/docs/)
- [k6 JavaScript API Reference](https://k6.io/docs/javascript-api/)
- [Performance Testing Best Practices](https://k6.io/docs/testing-guides/)
- [Real-world k6 Examples](https://github.com/grafana/k6/tree/master/samples)

## 💡 Tips & Best Practices

1. **Always start with smoke test** - Validates your setup
2. **Test during off-peak hours** - Avoid production impact
3. **Monitor infrastructure** - Check CPU, memory during tests
4. **Establish baselines** - Know what "normal" looks like
5. **Increase gradually** - Don't shock the system with spike
6. **Use realistic data** - Simulate actual user behavior
7. **Repeat tests** - Consistency matters more than one-time results

## 🎓 Common Test Patterns

### Pattern 1: Browser User Journey
```javascript
// Visit homepage → browse products → add to cart → checkout
```
Used by: `user-flow.js`

### Pattern 2: API Stress
```javascript
// Thousands of parallel requests to specific endpoints
```
Used by: `stress-test.js`, `breakpoint-test.js`

### Pattern 3: Real-world Load
```javascript
// Ramp up gradually to peak expected usage, hold, ramp down
```
Used by: `load-test.js`, `soak-test.js`

## 📞 Getting Help

For issues or questions:
1. Review the test error messages
2. Check the K6_README.md for detailed documentation
3. Consult [k6 Community Forums](https://community.k6.io/)
4. Review [k6 GitHub Issues](https://github.com/grafana/k6/issues)
