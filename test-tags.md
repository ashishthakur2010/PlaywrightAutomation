# Test Tags Guide

## Available Tags:
- `@API` - API tests
- `@Web` - Web UI tests  
- `@Smoke` - Smoke tests
- `@Regression` - Regression tests
- `@Critical` - Critical path tests

## Usage Examples:
```bash
# Run only API tests
npm run test:api

# Run only smoke tests
npx playwright test --grep @Smoke

# Run tests excluding slow ones
npx playwright test --grep-invert @Slow

# Run specific browser tests
npm run test:chromium
```

## Test Organization:
- Keep API tests separate from UI tests
- Use descriptive test names
- Group related tests in describe blocks
- Add proper test data setup/teardown