import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000', // Playwright will wait for this URL
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
    url: 'http://localhost:3000', // The URL the server should be listening on
    reuseExistingServer: !process.env.CI, // Don't reuse server in CI environments
    timeout: 120 * 1000, // Give the server up to 120 seconds to start
    stdout: 'pipe', // Pipe server output to Playwright's console
    stderr: 'pipe', // Pipe server error output
  },
});