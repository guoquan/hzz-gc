import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000/hzz-gc', // Playwright will wait for this URL
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npx serve out -l 3000', // Command to serve static files
    url: 'http://localhost:3000/hzz-gc/en', // Playwright will wait for this specific URL
    timeout: 360 * 1000, // 6 minutes for serve to start and respond
    reuseExistingServer: !process.env.CI,
    // workingDirectory: './web', // Serve from the web directory
  },
});