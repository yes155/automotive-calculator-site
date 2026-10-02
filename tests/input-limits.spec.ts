import { test, expect } from '@playwright/test';

const ids = ['wheel-offset', 'compression-ratio', 'engine-displacement', 'horsepower',
  'fuel-injector', 'power-to-weight', 'quarter-mile', 'tire-size'];

test('all eight calculators show directions and accessible input limits before entry', async ({ page }) => {
  for (const id of ids) {
    await test.step(id, async () => {
      await page.goto(`/calculators/${id}/`);
      await expect(page.locator('.input-directions')).toBeVisible();
      for (const field of await page.locator('input[type="number"]').all()) {
        const name = await field.getAttribute('name');
        const hint = page.locator(`[id="${name}-limits"]`);
        await expect(hint).toBeVisible();
        await expect(hint).toContainText('Input limits:');
        expect((await field.getAttribute('aria-describedby'))?.split(' ')).toContain(`${name}-limits`);
      }
    });
  }
});

test('US wheel limits stay visible alongside errors and after reset', async ({ page }) => {
  await page.goto('/calculators/wheel-offset/');
  await expect(page.locator('#currentWidthIn-limits')).toHaveText('Input limits: 3–20 inches. Increments of 0.5 inches.');
  await expect(page.locator('#currentOffsetMm-limits')).toHaveText('Input limits: −100–100 mm. Whole numbers only.');
  await page.locator('[name="currentWidthIn"]').fill('201');
  await page.getByRole('button', { name: 'Calculate', exact: true }).click();
  await expect(page.locator('#currentWidthIn-field-client-error')).toBeVisible();
  await expect(page.locator('#currentWidthIn-limits')).toBeVisible();
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(page.locator('#currentWidthIn-limits')).toHaveText('Input limits: 3–20 inches. Increments of 0.5 inches.');
});

test('unit changes update bounds, units, precision and reset hints', async ({ page }) => {
  await page.goto('/calculators/power-to-weight/');
  await expect(page.locator('[name="weightUnit"]')).toHaveValue('lb');
  await expect(page.locator('[name="powerUnit"]')).toHaveValue('hp');
  await expect(page.locator('#weight-limits')).toHaveText('Input limits: 500–10,000 lb. Increments of 10 lb.');
  await page.locator('[name="weightUnit"]').selectOption('kg');
  await expect(page.locator('#weight-limits')).toHaveText('Input limits: approximately 226.796185–4,535.9237 kg. Decimals allowed.');
  await page.locator('[name="powerUnit"]').selectOption('kw');
  await expect(page.locator('#power-limits')).toContainText('kW. Decimals allowed.');
  await expect(page.locator('.result-value')).toHaveText('0.1000 hp/lb');
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(page.locator('#weight-limits')).toHaveText('Input limits: 500–10,000 lb. Increments of 10 lb.');
  await expect(page.locator('#power-limits')).toHaveText('Input limits: 1–5,000 hp. Whole numbers only.');
  await page.goto('/calculators/engine-displacement/?unitSystem=in');
  await expect(page.locator('#bore-limits')).toHaveText('Input limits: approximately 1.968504–7.874016 in. Decimals allowed.');
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(page.locator('#bore-limits')).toHaveText('Input limits: 50–200 mm. Increments of 0.1 mm.');
});

test('US form directions explain tire markings and decimal duty cycles', async ({ page }) => {
  await page.goto('/calculators/fuel-injector/');
  await expect(page.locator('#dutyCycle-help')).toContainText('0.80 = 80%');
  expect((await page.locator('[name="dutyCycle"]').getAttribute('aria-describedby'))?.split(' ')).toContain('dutyCycle-help');
  await page.goto('/calculators/tire-size/');
  await expect(page.locator('.input-directions')).toContainText('225/45R17');
  await expect(page.locator('.input-directions')).toContainText('mph');
  await expect(page.locator('#tireARim-limits')).toHaveText('Input limits: 13–24 inches. Whole numbers only.');
});

test('limits and units are present in static HTML without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.goto('http://127.0.0.1:4323/calculators/horsepower/');
    await expect(page.locator('#torque-limits')).toHaveText('Input limits: 0–2,000 lb-ft. Whole numbers only.');
    await expect(page.locator('#rpm-limits')).toHaveText('Input limits: 0–15,000 RPM. Increments of 10 RPM.');
    await expect(page.locator('.input-directions')).toContainText('Enter torque in lb-ft');
  } finally { await context.close(); }
});
