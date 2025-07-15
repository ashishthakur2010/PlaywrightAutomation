// @ts-check
const { defineConfig, devices } = require('@playwright/test');


/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  // Set testDir to the root or common parent directory
  testDir: '.',
  // Use testMatch to include tests from both folders
  testMatch: [
    'tests/**/*.spec.js',
    'src/tests/**/*.spec.js'
  ],
  reporter: [
    ['html'],
    ['junit'],
    ['json'],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  timeout: 30 * 1000,
  expect: {
    timeout: 10000,
  },
  use: {
    browserName: 'chromium',
    baseURL :'https://orgfarm-d2d41abef6-dev-ed.develop.my.salesforce.com/',
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'on',
  },
});
