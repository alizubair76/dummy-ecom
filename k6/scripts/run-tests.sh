#!/bin/bash
# K6 Test Runner Scripts
# This file contains helper scripts to run various k6 tests

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="${BASE_URL:-http://localhost:5173}"
RESULTS_DIR="./k6/results"

echo "📊 K6 Performance Testing Suite"
echo "================================"
echo "Base URL: $BASE_URL"
echo ""

# Create results directory if it doesn't exist
mkdir -p $RESULTS_DIR

# Function to run smoke test
run_smoke_test() {
    echo -e "${GREEN}🔥 Running Smoke Test...${NC}"
    k6 run k6/tests/smoke-test.js \
        --vus 5 \
        --duration 1m \
        --out json=$RESULTS_DIR/smoke-test-results.json
}

# Function to run load test
run_load_test() {
    echo -e "${GREEN}📈 Running Load Test...${NC}"
    k6 run k6/tests/load-test.js \
        --out json=$RESULTS_DIR/load-test-results.json
}

# Function to run stress test
run_stress_test() {
    echo -e "${RED}💪 Running Stress Test...${NC}"
    k6 run k6/tests/stress-test.js \
        --out json=$RESULTS_DIR/stress-test-results.json
}

# Function to run spike test
run_spike_test() {
    echo -e "${YELLOW}⚡ Running Spike Test...${NC}"
    k6 run k6/tests/spike-test.js \
        --out json=$RESULTS_DIR/spike-test-results.json
}

# Function to run soak test
run_soak_test() {
    echo -e "${GREEN}🧪 Running Soak Test...${NC}"
    k6 run k6/tests/soak-test.js \
        --out json=$RESULTS_DIR/soak-test-results.json
}

# Function to run user flow test
run_user_flow_test() {
    echo -e "${GREEN}🛒 Running User Flow Test...${NC}"
    k6 run k6/tests/user-flow.js \
        --out json=$RESULTS_DIR/user-flow-results.json
}

# Function to run breakpoint test
run_breakpoint_test() {
    echo -e "${RED}🔴 Running Breakpoint Test...${NC}"
    k6 run k6/tests/breakpoint-test.js \
        --out json=$RESULTS_DIR/breakpoint-test-results.json
}

# Function to run all tests
run_all_tests() {
    echo -e "${GREEN}🚀 Running All Tests...${NC}"
    run_smoke_test
    run_load_test
    run_stress_test
    run_spike_test
    run_user_flow_test
    # Uncomment to run soak test (takes 30+ minutes by default)
    # run_soak_test
    echo -e "${GREEN}✅ All tests completed!${NC}"
}

# Parse command line arguments
case "${1:-all}" in
    smoke)
        run_smoke_test
        ;;
    load)
        run_load_test
        ;;
    stress)
        run_stress_test
        ;;
    spike)
        run_spike_test
        ;;
    soak)
        run_soak_test
        ;;
    flow|user-flow)
        run_user_flow_test
        ;;
    breakpoint)
        run_breakpoint_test
        ;;
    all)
        run_all_tests
        ;;
    *)
        echo "Usage: $0 {smoke|load|stress|spike|soak|flow|breakpoint|all}"
        echo ""
        echo "Examples:"
        echo "  $0 smoke          # Run quick smoke test"
        echo "  $0 load           # Run load test"
        echo "  $0 stress         # Run stress test"
        echo "  $0 spike          # Run spike test"
        echo "  $0 soak           # Run soak test"
        echo "  $0 flow           # Run user flow test"
        echo "  $0 breakpoint     # Run breakpoint test"
        echo "  $0 all            # Run all tests (excluding soak)"
        exit 1
        ;;
esac
