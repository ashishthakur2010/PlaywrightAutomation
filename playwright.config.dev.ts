import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

export default defineConfig(baseConfig, {
  use: {
    ...baseConfig.use,
    baseURL: 'http://localhost:3000',
    // Development specific settings
    headless: false,
    slowMo: 1000,
  },
  workers: 1, // Run tests serially in dev
});