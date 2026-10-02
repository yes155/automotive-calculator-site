import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  workers: 2,
  reporter: 'list',
  outputDir: 'test-results',
  use: {
    browserName: 'chromium',
    baseURL: 'http://127.0.0.1:4323',
    launchOptions: process.env.CHROMIUM_EXECUTABLE_PATH ? {
      executablePath: process.env.CHROMIUM_EXECUTABLE_PATH,
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    } : {},
  },
  webServer: {
    command: 'npm run build && node scripts/serve-built.mjs',
    env: { SITE_URL: 'https://autocalc.test', SITE_NOINDEX: 'false' },
    url: 'http://127.0.0.1:4323',
    reuseExistingServer: false,
  },
});
