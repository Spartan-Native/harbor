import { defineConfig, devices } from '@playwright/test';

// Visual regression: screenshots of the built Storybook.
//   npm run test:visual                              build Storybook, then compare
//   npm run test:visual -- --update-snapshots        accept the new look
const PORT = 6112;

export default defineConfig({
  testDir: 'app/e2e',
  // Baselines are per OS: fonts and anti-aliasing differ between machines.
  snapshotPathTemplate: '{testDir}/__screenshots__/{platform}/{arg}{ext}',
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'dist/playwright-report' }]],
  outputDir: 'dist/playwright-results',
  use: {
    ...devices['Desktop Chrome'],
    viewport: { width: 1100, height: 900 },
    deviceScaleFactor: 1,
    baseURL: `http://localhost:${PORT}`,
  },
  expect: {
    // Zero differing pixels, with a near-exact colour match (same settings as the spartan-native packages).
    toHaveScreenshot: { animations: 'disabled', caret: 'hide', maxDiffPixels: 0, threshold: 0.01 },
  },
  projects: [{ name: 'harbor' }],
  webServer: {
    command: `python3 -m http.server ${PORT} -d dist/storybook/harbor-backup`,
    url: `http://localhost:${PORT}/iframe.html`,
    reuseExistingServer: true,
  },
});
