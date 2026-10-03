import { test, expect } from '@playwright/test';

test('dashboard modules open the matching calculator and desktop panels sit side by side', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.locator('.module-card')).toHaveCount(8);
  await page.locator('.module-card').filter({ has: page.getByRole('heading', { name: 'Wheel Offset', exact: true }) }).click();
  await expect(page).toHaveURL(/\/calculators\/wheel-offset\/$/);
  await expect(page.getByRole('navigation', { name: 'Calculator tools' }).locator('[aria-current="page"]')).toContainText('Wheel Offset');
  const inputs = (await page.locator('.calc-inputs').boundingBox())!;
  const results = (await page.locator('.calc-results').boundingBox())!;
  expect(results.x).toBeGreaterThanOrEqual(inputs.x + inputs.width);
  expect(results.y).toBeCloseTo(inputs.y, 0);
});

test('phone navigation opens with the keyboard and calculator results stay below inputs', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const navigation = page.locator('.tool-navigation');
  await expect(navigation).not.toHaveAttribute('open', '');
  await navigation.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(navigation).toHaveAttribute('open', '');
  await page.getByRole('navigation', { name: 'Calculator tools' }).getByRole('link', { name: '05 Horsepower' }).click();
  await expect(page).toHaveURL(/\/calculators\/horsepower\/$/);
  await expect(page.locator('.tool-navigation')).not.toHaveAttribute('open', '');
  const inputs = (await page.locator('.calc-inputs').boundingBox())!;
  const results = (await page.locator('.calc-results').boundingBox())!;
  expect(results.y).toBeGreaterThanOrEqual(inputs.y + inputs.height);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});
