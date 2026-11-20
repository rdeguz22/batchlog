import { expect, test } from '@playwright/test';

test('the app loads', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'BatchLog' })).toBeVisible();
});

test('I1: no horizontal scrolling at phone width', async ({ page }) => {
  await page.goto('./');
  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(width).toBeLessThanOrEqual(page.viewportSize()!.width);
});

test('T18: Start a new batch opens New Batch', async ({ page }) => {
  await page.goto('./');
  await page.locator('[data-action="T18"]').first().click();
  await expect(page.getByRole('heading', { name: 'New Batch' })).toBeVisible();
});

// Flows to write as screens get built:
test.fixme('F1–F3 sign up opens About You', async () => {});
test.fixme('F26 Next is disabled with a reason until a name and ingredient exist', async () => {});
test.fixme('F40 Save batch opens the batch at 100% and adds it to Home', async () => {});
test.fixme('D1 a batch is still listed after reload', async () => {});
