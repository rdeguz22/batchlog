import { defineConfig, devices } from '@playwright/test';

// C3: Playwright runs Chromium and WebKit; Firefox is checked by hand. Viewport is 390 px (Part 4).
const phone = { viewport: { width: 390, height: 844 } };

export default defineConfig({
  testDir: 'tests/e2e',
  use: { baseURL: 'http://localhost:5173/batchlog/' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], ...phone } },
    { name: 'webkit', use: { ...devices['Desktop Safari'], ...phone } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173/batchlog/',
    reuseExistingServer: true,
  },
});
