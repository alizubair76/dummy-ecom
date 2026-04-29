# JMeter Test Plan for Dummy-Ecom

This directory contains a JMeter test plan (`dummy-ecom-test-plan.jmx`) for load testing and performance testing the dummy-ecom e-commerce application.

## Prerequisites

1. **JMeter Installation**
   - Download JMeter from: https://jmeter.apache.org/download_jmeter.cgi
   - Requires Java (JDK 8 or higher)
   - Extract and add JMeter to your PATH (optional, but recommended)

2. **Application Running**
   ```bash
   npm install
   npm run dev
   ```
   The app will run on `http://localhost:5173`

## Test Plan Overview

### Functional Test: "E-Commerce User Transactions"
This is the default test that simulates realistic user behavior:

- **Thread Group Configuration:**
  - Users: 5 (configurable via `NUM_USERS`)
  - Ramp-up: 10 seconds (configurable via `RAMP_TIME`)
  - Loop Count: 2 iterations per user (configurable via `LOOP_COUNT`)

- **User Flow:**
  1. Browse home page
  2. View product listing
  3. View product details (Product ID: 1)
  4. View shopping cart
  5. Visit checkout page
  6. View order history

- **Think Times:**
  - Between page transitions: 1-2 seconds
  - Realistic user behavior simulation

### Stress Test: "High Load" (Disabled by default)
A more aggressive test configuration (disabled):
- 50 concurrent users
- 3 iterations per user
- 30-second ramp-up time
- Enable by right-clicking the thread group and selecting "Enable"

## Key Configuration Variables

Edit these in the Test Plan user-defined variables:

- `BASE_URL`: Application base URL (default: `http://localhost:5173`)
- `NUM_USERS`: Number of concurrent users
- `RAMP_TIME`: Time in seconds to ramp up all threads
- `LOOP_COUNT`: Number of iterations per user
- `PRODUCT_IDS`: Available product IDs (1,2,3,4,6,7,8)

## Running the Test

### Option 1: GUI Mode (Recommended for Setup & Debugging)
```bash
jmeter -t dummy-ecom-test-plan.jmx
```

### Option 2: Non-GUI Mode (Command Line - Better for CI/CD)
```bash
jmeter -n -t dummy-ecom-test-plan.jmx -l results.jtl -j jmeter.log
```

### Option 3: With Report Generation (JMeter 5.3+)
```bash
jmeter -n -t dummy-ecom-test-plan.jmx -l results.jtl -j jmeter.log -e -o htmlreports
```

## Results & Reporting

### Real-Time Monitoring (GUI Mode)
- **Aggregate Graph**: Shows response times and throughput
- **View Results in Table**: Detailed results for each request

### Generate HTML Report (Non-GUI Mode)
After running the test with `-e -o htmlreports`:
```
open htmlreports/index.html
```

### Key Metrics to Monitor
- **Response Time**: Average, Min, Max
- **Throughput**: Requests per second
- **Error Rate**: Failed requests percentage
- **95th/99th Percentile**: Performance under load

## Modifying the Test Plan

### Add/Remove HTTP Requests
1. Open the .jmx file in JMeter
2. Add new HTTP Sampler under the Thread Group
3. Configure the request path and method
4. Add assertions as needed

### Add Data Parameterization
1. Use CSV Data Set Config to load test data
2. Add variables for dynamic product IDs or user data

### Example: Test Multiple Products
Add a Loop Controller with a CSV file containing product IDs:
```csv
productId
1
2
3
4
6
7
8
```

Then use `${productId}` in the request path.

## Common Issues

### Connection Refused Error
- Ensure the app is running on `http://localhost:5173`
- Run: `npm run dev`

### High Error Rate
- Check response codes in "View Results in Table"
- Verify the application is responding correctly
- Check browser console for JavaScript errors

### Slow Test Execution
- Reduce `NUM_USERS` or `LOOP_COUNT`
- Check your system resources (CPU, memory, network)

## Performance Baseline

Expected metrics on a local machine:

| Metric | Expected Value |
|--------|---|
| Avg Response Time | < 100ms |
| P95 Response Time | < 200ms |
| Error Rate | 0% |
| Throughput | > 50 req/sec |

## Best Practices

1. **Start Small**: Begin with 5 users, then gradually increase
2. **Warm-up Phase**: Add a ramp-up period before measurements
3. **Think Times**: Simulate realistic user delays
4. **Clean State**: Clear cookies/cache between test runs
5. **Monitor**: Watch CPU, memory, and network during tests
6. **Multiple Runs**: Run tests multiple times for consistency

## Integration with CI/CD

Example GitHub Actions workflow:
```yaml
- name: Run JMeter Tests
  run: |
    jmeter -n -t dummy-ecom-test-plan.jmx \
      -l results.jtl \
      -e -o htmlreports
    
- name: Upload Report
  uses: actions/upload-artifact@v2
  with:
    name: jmeter-report
    path: htmlreports/
```

## Useful JMeter Commands

```bash
# GUI Mode with specific options
jmeter -t dummy-ecom-test-plan.jmx

# Non-GUI with custom Java heap
jmeter -Xmx1024m -n -t dummy-ecom-test-plan.jmx -l results.jtl

# Run specific thread group only
jmeter -n -t dummy-ecom-test-plan.jmx -Gthread.group.name="E-Commerce User Transactions" -l results.jtl

# Change properties at runtime
jmeter -n -t dummy-ecom-test-plan.jmx -Jhost=localhost -Jport=5173 -l results.jtl
```

## Additional Resources

- [JMeter Official Documentation](https://jmeter.apache.org/usermanual/index.html)
- [JMeter Best Practices](https://jmeter.apache.org/usermanual/best-practices.html)
- [Performance Testing Guide](https://jmeter.apache.org/usermanual/component_reference.html)

---

**Last Updated**: April 2026
