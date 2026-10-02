import { test, expect } from '@playwright/test';

const examples = [
  { id: 'wheel-offset', field: 'newWidthIn', value: '10', expected: 'Inner edge moves 35.4 mm closer to the suspension; outer edge moves 15.4 mm outward toward the fender.' },
  { id: 'compression-ratio', field: 'bore', value: '90', expected: '10.07:1' },
  { id: 'engine-displacement', field: 'bore', value: '90', expected: '2188 cc (2.19 L, 133.5 cu in)' },
  { id: 'horsepower', field: 'torque', value: '500', expected: '571.2 hp (425.9 kW)' },
  { id: 'fuel-injector', field: 'horsepower', value: '500', expected: '787 cc/min (78.1 lb/hr)' },
  { id: 'power-to-weight', field: 'power', value: '400', expected: '0.1333 hp/lb' },
  { id: 'quarter-mile', field: 'horsepower', value: '500', expected: '11.14s @ 122.3 MPH' },
  { id: 'tire-size', field: 'tireBWidth', value: '245', expected: '+18.9 mm (+3.0%)' },
];

test('all eight built calculator pages recalculate without browser errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  for (const example of examples) {
    await test.step(example.id, async () => {
      await page.goto(`/calculators/${example.id}/`);
      const before = await page.locator('.result-value').textContent();
      await page.locator(`[name="${example.field}"]`).fill(example.value);
      await page.getByRole('button', { name: 'Calculate', exact: true }).click();
      await expect(page.locator('.result-value')).toHaveText(example.expected);
      expect(example.expected).not.toBe(before);
      expect(errors).toEqual([]);
    });
  }
});

for (const example of examples) {
  test(`${example.id}: every field explains missing and range errors and recovers`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto(`/calculators/${example.id}/`);
    await page.locator(`[name="${example.field}"]`).fill(example.value);
    await page.getByRole('button', { name: 'Calculate', exact: true }).click();
    await expect(page.locator('.result-value')).toHaveText(example.expected);
    const fields = page.locator('form input[type="number"]');
    for (let index = 0; index < await fields.count(); index++) {
      const field = fields.nth(index);
      const original = await field.inputValue();
      const errorId = `${await field.getAttribute('id')}-client-error`;
      const error = page.locator(`[id="${errorId}"]`);
      const min = Number(await field.getAttribute('min'));
      const max = Number(await field.getAttribute('max'));
      for (const value of ['', String(min - 1), String(max + 1)]) {
        await field.fill(value);
        await page.getByRole('button', { name: 'Calculate', exact: true }).click();
        await expect(field).toHaveAttribute('aria-invalid', 'true');
        await expect(error).toBeVisible();
        await expect(page.locator('.calc-results .calculator-error-summary')).toBeVisible();
        await expect(page.locator('.result-panel')).toBeHidden();
        if (value === '') await expect(error).toContainText('must be a number');
        else await expect(error).toContainText(`between ${min} and ${max}`);
        await field.fill(original);
        await page.getByRole('button', { name: 'Calculate', exact: true }).click();
        await expect(error).toBeHidden();
        await expect(field).toHaveAttribute('aria-invalid', 'false');
        await expect(page.locator('.calc-results .calculator-error-summary')).toBeHidden();
        await expect(page.locator('.result-panel')).toBeVisible();
        await expect(page.locator('.result-value')).toHaveText(example.expected);
      }
    }
    await fields.first().fill('');
    await fields.first().pressSequentially('abc');
    await expect(fields.first()).toHaveValue('');
    await page.getByRole('button', { name: 'Calculate', exact: true }).click();
    await expect(page.locator('.calc-results .calculator-error-summary')).toContainText('must be a number');
    expect(errors).toEqual([]);
  });
}

test('compression rejects nonpositive clearance with an explanation', async ({ page }) => {
  await page.goto('/calculators/compression-ratio/');
  for (const [name, value] of Object.entries({ chamberCc: '1', pistonDishCc: '0', pistonDomeCc: '50', gasketThickness: '0', deckClearance: '0' })) await page.locator(`[name="${name}"]`).fill(value);
  await page.getByRole('button', { name: 'Calculate', exact: true }).click();
  await expect(page.locator('.calculator-error-summary')).toContainText('Total clearance volume must be greater than zero');
  await expect(page.locator('.result-panel')).toBeHidden();
  await page.locator('[name="pistonDomeCc"]').fill('0');
  await page.getByRole('button', { name: 'Calculate', exact: true }).click();
  await expect(page.locator('.calculator-error-summary')).toBeHidden();
  await expect(page.locator('.result-panel')).toBeVisible();
});

for (const id of ['compression-ratio', 'engine-displacement', 'horsepower', 'power-to-weight', 'quarter-mile']) {
  test(`${id}: unit changes preserve the result and convert field ranges`, async ({ page }) => {
    await page.goto(`/calculators/${id}/`);
    const before = await page.locator('.result-value').textContent();
    if (id === 'compression-ratio' || id === 'engine-displacement') {
      await page.locator('[name="unitSystem"][value="in"]').check();
      await expect(page.locator('[name="bore"]')).toHaveAttribute('step', 'any');
      expect(Number(await page.locator('[name="bore"]').inputValue())).toBeCloseTo(86 / 25.4, 8);
      expect(Number(await page.locator('[name="bore"]').getAttribute('min'))).toBeCloseTo(50 / 25.4, 8);
      await page.locator('[name="unitSystem"][value="mm"]').check();
    } else {
      const name = id === 'horsepower' ? 'torqueUnit' : 'weightUnit';
      await page.locator(`[name="${name}"]`).selectOption(id === 'horsepower' ? 'nm' : 'kg');
      await expect(page.locator('.result-value')).toHaveText(before!);
      await page.locator(`[name="${name}"]`).selectOption(id === 'horsepower' ? 'lb-ft' : 'lb');
      if (id === 'power-to-weight') {
        await page.locator('[name="powerUnit"]').selectOption('kw');
        await expect(page.locator('.result-value')).toHaveText(before!);
      }
    }
    await expect(page.locator('.calculator-error-summary')).toBeHidden();
    await expect(page.locator('.result-value')).toHaveText(before!);
  });
}
