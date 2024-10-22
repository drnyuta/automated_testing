import { test, expect } from '@playwright/test';

test('homepage should have the correct title', async ({ page }) => {
  await page.goto('https://google.com');

  await expect(page).toHaveTitle('Google');
});
