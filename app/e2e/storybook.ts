import type { Page } from '@playwright/test';

// Copied from the spartan-native repository (packages/theme/e2e/storybook.ts); keep the two in step.

// Every skin the theme styles, as the Storybook "OS" global values.
export const SKINS = ['win', 'w10', 'mac', 'macc', 'gtk', 'qt', 'cros'] as const;

/** Opens a story (full Storybook id) with the given globals and waits until it has rendered. */
export async function openStory(page: Page, id: string, globals: Record<string, string>): Promise<void> {
  const g = Object.entries(globals)
    .map(([k, v]) => `${k}:${v}`)
    .join(';');
  await page.goto(`/iframe.html?id=${id}&viewMode=story&globals=${g}`);
  await page.locator('#storybook-root > *').first().waitFor();
  await page.evaluate(() => document.fonts.ready);
}
