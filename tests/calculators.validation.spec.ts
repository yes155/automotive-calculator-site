import { test, expect } from '@playwright/test';

const calculators = [
  { path: '/calculators/wheel-offset/', name: 'Wheel Offset', defaults: { currentWidthIn: '8', currentOffsetMm: '35', newWidthIn: '9', newOffsetMm: '45' } },
  { path: '/calculators/compression-ratio/', name: 'Compression Ratio', defaults: { bore: '86', stroke: '86', chamberCc: '45', pistonDishCc: '5', pistonDomeCc: '0', gasketBore: '87', gasketThickness: '1.2', deckClearance: '0.5', unitSystem: 'mm' } },
  { path: '/calculators/power-to-weight/', name: 'Power-to-Weight', defaults: { power: '300', powerUnit: 'hp', weight: '3000', weightUnit: 'lb' } },
  { path: '/calculators/engine-displacement/', name: 'Engine Displacement', defaults: { bore: '86', stroke: '86', cylinders: '4', unitSystem: 'mm' } },
  { path: '/calculators/horsepower/', name: 'Horsepower', defaults: { torque: '400', torqueUnit: 'lb-ft', rpm: '6000' } },
  { path: '/calculators/fuel-injector/', name: 'Fuel Injector', defaults: { horsepower: '400', bsfc: '0.5', injectorCount: '4', dutyCycle: '0.8', fuelDensity: '0.75' } },
  { path: '/calculators/quarter-mile/', name: 'Quarter Mile', defaults: { weight: '3500', weightUnit: 'lb', horsepower: '400', powerType: 'crank' } },
  { path: '/calculators/tire-size/', name: 'Tire Size', defaults: { tireAWidth: '225', tireAAspect: '45', tireARim: '17', tireBWidth: '235', tireBAspect: '40', tireBRim: '18' } },
];

test.describe('Edge case handling', () => {
  for (const calc of calculators) {
    test(`${calc.name} - empty inputs show inline errors`, async ({ page }) => {
      await page.goto(calc.path);
      for (const field of await page.locator('input[type="number"]').all()) await field.fill('');
      await page.click('button[type="submit"]');
      
      // Check for inline errors
      const errors = page.locator('.calculator-field-error:visible');
      await expect(errors.first()).toBeVisible();
    });

    test(`${calc.name} - invalid inputs show errors`, async ({ page }) => {
      await page.goto(calc.path);
      
      // Try various invalid inputs
      const inputs = page.locator('input[type="number"]');
      const count = await inputs.count();
      
      for (let i = 0; i < count; i++) {
        await inputs.nth(i).fill('');
        await inputs.nth(i).pressSequentially('abc');
        await page.click('button[type="submit"]');
        const errors = page.locator('.calculator-field-error:visible');
        await expect(errors.first()).toBeVisible();
        
        // Clear and try next
        await page.reload();
      }
    });

    test(`${calc.name} - zero/negative values handled`, async ({ page }) => {
      await page.goto(calc.path);
      
      const inputs = page.locator('input[type="number"]');
      const count = await inputs.count();
      
      for (let i = 0; i < count; i++) {
        await inputs.nth(i).fill('-1');
      }
      await page.click('button[type="submit"]');
      
      const errors = page.locator('.calculator-field-error:visible');
      await expect(errors.first()).toBeVisible();
    });

    test(`${calc.name} - very large numbers`, async ({ page }) => {
      await page.goto(calc.path);
      
      const inputs = page.locator('input[type="number"]');
      const count = await inputs.count();
      
      for (let i = 0; i < count; i++) {
        await inputs.nth(i).fill('1e9');
      }
      await page.click('button[type="submit"]');
      
      const errors = page.locator('.calculator-field-error:visible');
      await expect(errors.first()).toBeVisible();
    });

    test(`${calc.name} - non-numeric input`, async ({ page }) => {
      await page.goto(calc.path);
      
      const inputs = page.locator('input[type="number"]');
      const count = await inputs.count();
      
      for (let i = 0; i < count; i++) {
        await inputs.nth(i).fill('');
        await inputs.nth(i).pressSequentially('abc');
      }
      await page.click('button[type="submit"]');
      
      const errors = page.locator('.calculator-field-error:visible');
      await expect(errors.first()).toBeVisible();
    });
  }
});

test.describe('Calculation correctness', () => {
  test('Tire Size - known values', async ({ page }) => {
    await page.goto('/calculators/tire-size/');
    
    // Fill in 225/45R17 vs 235/40R18
    await page.fill('#tireAWidth-field', '225');
    await page.fill('#tireAAspect-field', '45');
    await page.fill('#tireARim-field', '17');
    await page.fill('#tireBWidth-field', '235');
    await page.fill('#tireBAspect-field', '40');
    await page.fill('#tireBRim-field', '18');
    await page.click('button[type="submit"]');
    
    // Check results
    const resultPanel = page.locator('.result-panel');
    await expect(resultPanel).toContainText('10.9 mm');
    await expect(resultPanel).toContainText('61.0 MPH');
    await expect(resultPanel).toContainText('808');
    await expect(resultPanel).toContainText('794');
  });

  test('Tire Size - speedometer table', async ({ page }) => {
    await page.goto('/calculators/tire-size/');
    
    await page.fill('#tireAWidth-field', '225');
    await page.fill('#tireAAspect-field', '45');
    await page.fill('#tireARim-field', '17');
    await page.fill('#tireBWidth-field', '235');
    await page.fill('#tireBAspect-field', '40');
    await page.fill('#tireBRim-field', '18');
    await page.click('button[type="submit"]');
    
    // Check speedometer table
    const table = page.locator('.speedo-table table');
    await expect(table).toContainText('30');
    await expect(table.locator('tbody tr').nth(0)).toContainText('30.5');
    await expect(table.locator('tbody tr').nth(2)).toContainText('61.0');
  });

  test('Compression Ratio - known value', async ({ page }) => {
    await page.goto('/calculators/compression-ratio/');
    
    await page.fill('#bore-field', '86');
    await page.fill('#stroke-field', '86');
    await page.fill('#chamberCc-field', '45');
    await page.fill('#pistonDishCc-field', '5');
    await page.fill('#pistonDomeCc-field', '0');
    await page.fill('#gasketBore-field', '87');
    await page.fill('#gasketThickness-field', '1.2');
    await page.fill('#deckClearance-field', '0.5');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('.result-panel')).toContainText('9.32:1');
  });
});