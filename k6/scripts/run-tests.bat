@REM K6 Test Runner Script for Windows
@REM This file contains commands to run various k6 tests
@REM Usage: run-tests.bat [smoke|load|stress|spike|soak|flow|breakpoint|all]

@echo off
setlocal enabledelayedexpansion

set BASE_URL=%BASE_URL%http://localhost:5173
if "%BASE_URL%"=="" set BASE_URL=http://localhost:5173

set RESULTS_DIR=k6\results

if not exist "%RESULTS_DIR%" mkdir "%RESULTS_DIR%"

echo.
echo 📊 K6 Performance Testing Suite
echo ================================
echo Base URL: %BASE_URL%
echo.

if "%1%"=="" goto run_all
if "%1%"=="smoke" goto run_smoke
if "%1%"=="load" goto run_load
if "%1%"=="stress" goto run_stress
if "%1%"=="spike" goto run_spike
if "%1%"=="soak" goto run_soak
if "%1%"=="flow" goto run_flow
if "%1%"=="breakpoint" goto run_breakpoint
if "%1%"=="all" goto run_all
goto usage

:run_smoke
echo 🔥 Running Smoke Test...
k6 run k6/tests/smoke-test.js --vus 5 --duration 1m --out json=%RESULTS_DIR%\smoke-test-results.json
goto end

:run_load
echo 📈 Running Load Test...
k6 run k6/tests/load-test.js --out json=%RESULTS_DIR%\load-test-results.json
goto end

:run_stress
echo 💪 Running Stress Test...
k6 run k6/tests/stress-test.js --out json=%RESULTS_DIR%\stress-test-results.json
goto end

:run_spike
echo ⚡ Running Spike Test...
k6 run k6/tests/spike-test.js --out json=%RESULTS_DIR%\spike-test-results.json
goto end

:run_soak
echo 🧪 Running Soak Test...
k6 run k6/tests/soak-test.js --out json=%RESULTS_DIR%\soak-test-results.json
goto end

:run_flow
echo 🛒 Running User Flow Test...
k6 run k6/tests/user-flow.js --out json=%RESULTS_DIR%\user-flow-results.json
goto end

:run_breakpoint
echo 🔴 Running Breakpoint Test...
k6 run k6/tests/breakpoint-test.js --out json=%RESULTS_DIR%\breakpoint-test-results.json
goto end

:run_all
echo 🚀 Running All Tests...
call :run_smoke
call :run_load
call :run_stress
call :run_spike
call :run_flow
echo ✅ All tests completed!
goto end

:usage
echo Usage: %0 [smoke^|load^|stress^|spike^|soak^|flow^|breakpoint^|all]
echo.
echo Examples:
echo   %0 smoke          REM Run quick smoke test
echo   %0 load           REM Run load test
echo   %0 stress         REM Run stress test
echo   %0 spike          REM Run spike test
echo   %0 soak           REM Run soak test
echo   %0 flow           REM Run user flow test
echo   %0 breakpoint     REM Run breakpoint test
echo   %0 all            REM Run all tests
echo.

:end
endlocal
