import { test, expect } from '@playwright/test';

test('out-of-range wheel width explains the error and recovers after correction', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/calculators/wheel-offset/');
  for (const [name, value] of Object.entries({ currentWidthIn: '35', currentOffsetMm: '35', newWidthIn: '15', newOffsetMm: '49' })) {
    await page.locator(`[name="${name}"]`).fill(value);
  }
  await page.getByRole('button', { name: 'Calculate', exact: true }).click();
  await expect(page.locator('[name="currentWidthIn"]')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#currentWidthIn-field-client-error')).toBeVisible();
  await expect(page.locator('#currentWidthIn-field-client-error')).toHaveText('Current wheel width must be between 3 and 20 inches.');
  await expect(page.locator('.calc-results [role="alert"]')).toBeVisible();
  await expect(page.locator('.calc-results [role="alert"]')).toContainText('between 3 and 20 inches');
  await expect(page.locator('.result-panel')).toBeHidden();

  await page.locator('[name="currentWidthIn"]').fill('15');
  await page.getByRole('button', { name: 'Calculate', exact: true }).click();
  await expect(page.locator('[name="currentWidthIn"]')).toHaveAttribute('aria-invalid', 'false');
  await expect(page.locator('#currentWidthIn-field-client-error')).toBeHidden();
  await expect(page.locator('.calc-results [role="alert"]')).toBeHidden();
  await expect(page.locator('.result-panel')).toBeVisible();
  for (const label of ['Inner Clearance Change', 'Outer Poke Change']) {
    await expect(page.locator('.result-row').filter({ has: page.getByText(label, { exact: true }) }).locator('dd')).toHaveText('-14.0 mm');
  }
  expect(errors).toEqual([]);
});
