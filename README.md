# 🎭 Playwright Automation Framework

A comprehensive end-to-end testing framework built with Playwright, featuring API testing, UI automation, visual testing, and advanced reporting capabilities.

## 📋 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Running Tests](#-running-tests)
- [Test Categories](#-test-categories)
- [Reporting](#-reporting)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

## ✨ Features

- **Multi-Browser Support**: Chrome, Firefox, Safari (WebKit)
- **API Testing**: REST API automation with request/response validation
- **UI Automation**: Web application testing with Page Object Model
- **Visual Testing**: Screenshot comparison and visual regression testing
- **Network Mocking**: API response mocking and interception
- **File Operations**: Upload/download testing with Excel file manipulation
- **Parallel Execution**: Fast test execution with configurable workers
- **Advanced Reporting**: Allure reports with screenshots and traces
- **CI/CD Ready**: GitHub Actions and Jenkins integration
- **Cross-Platform**: Windows, macOS, and Linux support

## 🔧 Prerequisites

- **Node.js**: Version 16 or higher
- **npm**: Version 8 or higher
- **Git**: For version control

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PlaywrightAutomation-1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env with your configuration
   nano .env
   ```

## 📁 Project Structure

```
PlaywrightAutomation-1/
├── src/
│   ├── config/           # Environment configurations
│   ├── fixtures/         # Test fixtures and custom test setup
│   ├── pages/           # Page Object Model classes
│   ├── tests/           # TypeScript test files
│   └── utils/           # Utility functions and helpers
├── tests/               # JavaScript test files
├── pageobjects/         # Page Object classes
├── test-results/        # Test execution results
├── allure-results/      # Allure test results
├── allure-report/       # Generated Allure reports
├── playwright-report/   # Playwright HTML reports
├── videos/             # Test execution videos
├── .env                # Environment variables
├── playwright.config.ts # Main Playwright configuration
├── playwright.config.dev.ts # Development configuration
└── package.json        # Project dependencies and scripts
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Encryption Salt
SALT=your-encryption-salt

# Test Environment URLs
BASE_URL=https://rahulshettyacademy.com/client
API_BASE_URL=https://rahulshettyacademy.com/api

# WebSocket endpoint for remote testing
PW_TEST_CONNECT_WS_ENDPOINT=ws://127.0.0.1:3000/

# Test credentials (encrypted)
userid=your-encrypted-userid
password=your-encrypted-password
```

### Playwright Configuration

The framework supports multiple configurations:

- `playwright.config.ts` - Production configuration
- `playwright.config.dev.ts` - Development configuration
- Environment-specific configs in `src/config/`

## 🏃‍♂️ Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug
```

### Browser-Specific Tests

```bash
# Run tests on Chromium only
npm run test:chromium

# Run tests on Firefox only
npm run test:firefox

# Run tests on WebKit (Safari) only
npm run test:webkit
```

### Test Categories

```bash
# Run API tests only
npm run test:api

# Run Web UI tests only
npm run test:web

# Run tests with specific tags
npx playwright test --grep "@Smoke"
npx playwright test --grep "@Critical"
npx playwright test --grep "@Regression"
```

### Advanced Options

```bash
# Run tests in parallel with custom workers
npx playwright test --workers=4

# Run specific test file
npx playwright test tests/login.spec.js

# Run tests with custom timeout
npx playwright test --timeout=60000

# Run tests and generate trace
npx playwright test --trace=on
```

## 🏷️ Test Categories

### Available Tags

- `@API` - API and backend tests
- `@Web` - Web UI automation tests
- `@Smoke` - Smoke tests for critical functionality
- `@Regression` - Full regression test suite
- `@Critical` - Critical path tests
- `@Slow` - Tests that take longer to execute
- `@Flaky` - Tests that may be unstable

### Test Types

1. **API Tests** (`src/tests/apiTest.spec.ts`)
   - REST API validation
   - Request/response testing
   - Authentication flows

2. **UI Tests** (`tests/ClientApp*.spec.js`)
   - User interface automation
   - Form interactions
   - Navigation testing

3. **Visual Tests** (`src/tests/visTest.spec.ts`)
   - Screenshot comparison
   - Visual regression testing
   - Layout validation

4. **Network Tests** (`tests/NetworkTest.spec.js`)
   - API mocking and interception
   - Network response validation

5. **File Operations** (`tests/upload-download.spec.js`)
   - File upload/download testing
   - Excel file manipulation

## 📊 Reporting

### Playwright HTML Report

```bash
# Generate and open HTML report
npm run report
```

### Allure Reports

```bash
# Generate and serve Allure report
npm run allure:report
```

### Report Features

- **Screenshots**: Automatic screenshots on failure
- **Videos**: Test execution recordings
- **Traces**: Detailed execution traces for debugging
- **Test Results**: Pass/fail status with timing
- **Error Details**: Stack traces and error messages

## 🎯 Best Practices

### Test Organization

1. **Use Page Object Model**: Keep page interactions in separate classes
2. **Test Data Management**: Use fixtures and factories for test data
3. **Assertions**: Use meaningful assertions with clear error messages
4. **Test Independence**: Each test should be independent and isolated

### Performance

1. **Parallel Execution**: Use appropriate worker count for your system
2. **Test Filtering**: Use tags to run specific test suites
3. **Resource Management**: Clean up resources after tests
4. **Timeouts**: Set appropriate timeouts for different operations

### Maintenance

1. **Regular Updates**: Keep Playwright and dependencies updated
2. **Code Reviews**: Review test code for quality and maintainability
3. **Documentation**: Document complex test scenarios
4. **Monitoring**: Track test execution metrics and flaky tests

## 🔍 Troubleshooting

### Common Issues

1. **Tests Timing Out**
   ```bash
   # Increase timeout in playwright.config.ts
   timeout: 60000
   ```

2. **Browser Installation Issues**
   ```bash
   # Reinstall browsers
   npx playwright install --force
   ```

3. **Environment Variable Issues**
   ```bash
   # Check if .env file exists and has correct values
   cat .env
   ```

4. **Port Conflicts**
   ```bash
   # Check if ports are available
   lsof -i :3000
   ```

### Debug Mode

```bash
# Run single test in debug mode
npx playwright test --debug tests/login.spec.js

# Run with headed browser for visual debugging
npx playwright test --headed --slowMo=1000
```

### Trace Analysis

```bash
# Generate trace for failed tests
npx playwright test --trace=retain-on-failure

# View trace file
npx playwright show-trace test-results/trace.zip
```

## 🤝 Contributing

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure they pass
5. Submit a pull request

### Code Standards

- Use TypeScript for new test files
- Follow existing naming conventions
- Add appropriate test tags
- Include documentation for complex tests
- Ensure tests are independent and reliable

### Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request code review

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: Report bugs and feature requests in GitHub Issues
- **Documentation**: Check the `/docs` folder for detailed guides
- **Community**: Join our discussions in GitHub Discussions

## 🔗 Useful Links

- [Playwright Documentation](https://playwright.dev/)
- [Allure Framework](https://docs.qameta.io/allure/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Happy Testing! 🎭✨**