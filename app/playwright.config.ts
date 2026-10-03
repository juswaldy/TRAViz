import { defineConfig } from '@playwright/test';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export default defineConfig({
  testDir: './tests/browser',
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:3001',
    viewport: { width: 1440, height: 1100 },
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {},
  },
  webServer: {
    command: 'npm start',
    url: 'http://127.0.0.1:3001/api/health',
    env: { TRAVIZ_DATABASE: join(tmpdir(), `traviz-browser-${process.pid}.sqlite`) },
    reuseExistingServer: false,
  },
});
