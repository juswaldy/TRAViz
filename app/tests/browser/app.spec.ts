import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

test('create, split, save, reload, and handle a stale tab without losing its draft', async ({ page, context }) => {
  await page.goto('/');
  await page.getByLabel('Comparison title', { exact: true }).fill('Psalm comparison');
  await page.getByLabel('Source 1 label', { exact: true }).fill('Psalm 14');
  await page.getByLabel('Source 2 label', { exact: true }).fill('Psalm 53');
  await page.getByLabel('Row 1 source 1 text', { exact: true }).fill('אָמַר נָבָל\n\nאֱלֹהִים');
  await page.getByLabel('Row 1 source 2 text', { exact: true }).fill('אָמַר נָבָל\nאֱלֹהִים');
  await page.getByRole('button', { name: 'Split on line breaks' }).click();
  await expect(page.getByRole('dialog')).toContainText('3 rows from line breaks');
  await page.getByRole('button', { name: 'Apply rows' }).click();
  await expect(page.getByLabel('Row 2 source 1 text', { exact: true })).toHaveValue('');
  await expect(page.getByLabel('Row 3 source 2 text', { exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Save comparison', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Saved locally');
  await page.reload();
  await page.getByRole('navigation', { name: 'Saved comparisons' }).getByRole('button', { name: /Psalm comparison/ }).click();
  await expect(page.getByLabel('Row 1 source 1 text', { exact: true })).toHaveValue('אָמַר נָבָל');
  const second = await context.newPage();
  await second.goto('/');
  await second.getByRole('navigation', { name: 'Saved comparisons' }).getByRole('button', { name: /Psalm comparison/ }).click();
  await page.getByLabel('Comparison notes').fill('Saved from the first tab');
  await page.getByRole('button', { name: 'Save comparison', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Saved locally');
  await second.getByLabel('Comparison notes').fill('Keep this conflicting draft');
  await second.getByRole('button', { name: 'Save comparison', exact: true }).click();
  await expect(second.getByRole('alert')).toContainText('changed in another tab');
  await expect(second.getByLabel('Comparison notes')).toHaveValue('Keep this conflicting draft');
});

test('renders local Hebrew, Greek, and English fixtures and literal markup safely', async ({ page }) => {
  const errors: string[] = [];
  const remote: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => { if (!request.url().startsWith('http://127.0.0.1:3001')) remote.push(request.url()); });
  await page.goto('/');
  // Read literal arrays from trusted repository fixtures without evaluating JS.
  const fixtures = ['test/bible-hebrew/data/ps14-ps53.js', 'test/bible-greek/data/conversion.js', 'test/bible-nwt/data.js'];
  for (const [index, filename] of fixtures.entries()) {
    const text = readFileSync(resolve('..', filename), 'utf8');
    const array = text.match(/var bibleVerses\s*=\s*([\s\S]*?);\s*$/)![1];
    const rows = JSON.parse(array) as string[][];
    await page.getByLabel('Row 1 source 1 text', { exact: true }).fill(rows[0][0]);
    await page.getByLabel('Row 1 source 2 text', { exact: true }).fill(rows[0][1]);
    await page.getByLabel('Hebrew / RTL graph').setChecked(index === 0);
    await page.getByRole('button', { name: 'Update preview' }).click();
    await expect(page.frameLocator('iframe').locator('svg')).toBeVisible();
    await expect(page.frameLocator('iframe').locator('svg text').filter({ hasText: rows[0][0].split(' ')[0] }).first()).toBeVisible();
    await expect(page.locator('iframe')).toHaveCount(1);
  }
  const payload = '<img/src=x/onerror=parent.__executed=1> & <> λόγος';
  await page.getByLabel('Source 1 label', { exact: true }).fill('<img src=x onerror=parent.__executed=1>');
  await page.getByLabel('Row 1 source 1 text', { exact: true }).fill(payload);
  await page.getByLabel('Row 1 source 2 text', { exact: true }).fill(payload + ' text');
  await page.getByRole('button', { name: 'Update preview' }).click();
  const frame = page.frameLocator('iframe');
  await expect(frame.locator('svg')).toBeVisible();
  await expect(frame.locator('svg')).toContainText('<img/src=x/onerror=parent.__executed=1>');
  const token = frame.locator('svg text').filter({ hasText: '<img/src=x/onerror=parent.__executed=1>' }).first();
  await token.click();
  await expect(frame.locator('.qtip-content').filter({ hasText: '<img src=x onerror=parent.__executed=1>' }).first()).toBeVisible();
  const tooltip = frame.locator('.qtip').filter({ hasText: '<img src=x onerror=parent.__executed=1>' }).first();
  await expect.poll(() => tooltip.evaluate((node) => node.getBoundingClientRect().left)).toBeGreaterThanOrEqual(0);
  expect(await page.evaluate(() => (window as Window & { __executed?: number }).__executed)).toBeUndefined();
  await expect(frame.locator('img')).toHaveCount(0);
  expect(remote).toEqual([]);
  expect(errors).toEqual([]);
  await page.screenshot({ path: 'test-results/workspace.png', fullPage: true });
});

test('failed saves keep edits and keyboard users can cancel splitting', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Row 1 source 1 text', { exact: true }).fill('one\ntwo');
  await page.getByRole('button', { name: 'Split on line breaks' }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByLabel('Row 1 source 1 text', { exact: true })).toHaveValue('one\ntwo');
  await page.route('**/api/parallels', (route) => route.request().method() === 'POST' ? route.abort() : route.continue());
  await page.getByRole('button', { name: 'Save comparison', exact: true }).click();
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.getByLabel('Row 1 source 1 text', { exact: true })).toHaveValue('one\ntwo');
  await expect(page.getByRole('status')).toHaveText('Unsaved changes');
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
