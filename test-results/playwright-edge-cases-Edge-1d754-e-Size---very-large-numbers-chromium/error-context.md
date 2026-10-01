# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: playwright-edge-cases.test.ts >> Edge case handling >> Tire Size - very large numbers
- Location: tests\playwright-edge-cases.test.ts:58:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.field-error').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('.field-error').first() with timeout 5000ms
  - waiting for locator('.field-error').first()

```

```yaml
- link "Skip to main content":
  - /url: "#main-content"
- banner:
  - link "Automotive Calculators Home":
    - /url: /
    - text: Automotive Calculators
  - navigation "Main navigation":
    - list:
      - listitem:
        - link "All Calculators":
          - /url: /calculators/
      - listitem:
        - link "Wheels & Tires":
          - /url: /wheels-tires/
      - listitem:
        - link "Engine":
          - /url: /engine/
      - listitem:
        - link "Performance":
          - /url: /performance/
      - listitem:
        - link "Fueling":
          - /url: /fueling/
      - listitem:
        - link "Guides":
          - /url: /guides/
- main:
  - article:
    - heading "Tire Size Calculator" [level=1]
    - paragraph: Compare tire dimensions and speedometer effect. Enter section width (mm), aspect ratio (%), and wheel diameter (inches) for both tires.
    - region "Calculator Inputs":
      - heading "Calculator Inputs" [level=2]
      - group "Tire A (Current / Reference)":
        - text: Tire A (Current / Reference) Section Width (mm)
        - spinbutton "Section Width (mm)": "1e9"
        - text: Aspect Ratio (%)
        - spinbutton "Aspect Ratio (%)": "1e9"
        - text: Rim Diameter (inches)
        - spinbutton "Rim Diameter (inches)": "1e9"
      - group "Tire B (Proposed / Comparison)":
        - text: Tire B (Proposed / Comparison) Section Width (mm)
        - spinbutton "Section Width (mm)": "1e9"
        - text: Aspect Ratio (%)
        - spinbutton "Aspect Ratio (%)": "1e9"
        - text: Rim Diameter (inches)
        - spinbutton "Rim Diameter (inches)": "1e9"
      - button "Calculate"
      - link "Reset":
        - /url: /calculators/tire-size/
    - complementary "Results":
      - heading "Results" [level=2]
    - region "Formula & Method":
      - heading "Formula & Method" [level=2]
      - heading "Formula" [level=3]
      - code: sidewall_mm = section_width_mm × aspect_ratio / 100 diameter_mm = 2 × sidewall_mm + rim_in × 25.4 circumference_mm = π × diameter_mm revs_per_mile = 63360 / (π × diameter_in) diameter_diff_mm = diameter_B - diameter_A diameter_diff_pct = (diameter_diff / diameter_A) × 100 ground_clearance_change = diameter_diff / 2 actual_speed = indicated_speed × diameter_B / diameter_A speedometer_error_pct = (diameter_A / diameter_B − 1) × 100
      - term:
        - code: section_width_mm
      - definition: Tire section width(mm)
      - term:
        - code: aspect_ratio
      - definition: Aspect ratio (sidewall/width)(%)
      - term:
        - code: rim_in
      - definition: Wheel/rim diameter(inches)
      - term:
        - code: sidewall_mm
      - definition: Sidewall height(mm)
      - term:
        - code: diameter_mm
      - definition: Overall tire diameter(mm)
      - term:
        - code: circumference_mm
      - definition: Tire circumference(mm)
      - list:
        - listitem: Calculations use nominal tire dimensions — actual mounted dimensions vary by tire model, rim width, inflation pressure, and load.
        - listitem: Ground clearance change = diameter difference / 2 (radius change).
        - listitem: "Speedometer error: positive % means the speedometer reads HIGH (you travel slower than indicated); negative means it reads LOW."
        - listitem: "At 60 MPH indicated: actual = 60 × (diameter_B / diameter_A)."
        - listitem: Revs/mile useful for transmission/gearing calculations.
    - region "Worked Example":
      - heading "Worked Example" [level=2]
      - paragraph:
        - strong: "Example:"
        - text: 225/45R17 vs 235/40R18 (common plus-one sizing)
      - list:
        - listitem:
          - strong: "Tire A:"
          - text: 225 × 0.45 = 101.25 mm sidewall; 2×101.25 + 17×25.4 =
          - strong: 634.3 mm (24.97″)
        - listitem:
          - strong: "Tire B:"
          - text: 235 × 0.40 = 94.0 mm sidewall; 2×94.0 + 18×25.4 =
          - strong: 645.2 mm (25.40″)
        - listitem:
          - strong: "Difference:"
          - text: +10.9 mm (+1.7%) diameter; +5.5 mm ground clearance
        - listitem:
          - strong: "Speedometer:"
          - text: At 60 MPH indicated, actual = 60 × 645.2 / 634.3 =
          - strong: 61.0 MPH
          - text: (speedometer reads 1.7% low)
    - region "Limitations":
      - heading "Limitations" [level=2]
      - paragraph:
        - strong: "Notes & limitations:"
      - list:
        - listitem:
          - strong: "Nominal vs actual:"
          - text: Stated dimensions can differ from measured by ±2–3% due to tire model, construction, rim width, pressure, load, and wear.
        - listitem:
          - strong: Section width
          - text: is measured on design rim width — actual width changes with rim width.
        - listitem:
          - strong: Aspect ratio
          - text: is calculated at design load and pressure.
        - listitem:
          - strong: Speedometer calibration
          - text: assumes original tire was correct — if already off, error compounds.
        - listitem:
          - strong: "Does not check:"
          - text: fender clearance, suspension travel, brake caliper clearance, load rating, speed rating.
        - listitem: Always verify fitment with actual mounted measurements before purchasing.
    - region "Related Tools":
      - heading "Related Tools" [level=2]
      - navigation "Related calculators and guides":
        - list:
          - listitem:
            - link "Wheel Offset Calculator Check inner/outer clearance when changing wheels":
              - /url: /calculators/wheel-offset/
          - listitem:
            - link "Wheels & Tires Hub All wheel and tire tools":
              - /url: /wheels-tires/
- contentinfo:
  - paragraph: © 2026 Automotive Calculators. Built for enthusiasts, by enthusiasts.
  - navigation "Footer navigation":
    - link "Calculators":
      - /url: /calculators/
    - text: ·
    - link "Guides":
      - /url: /guides/
    - text: ·
    - link "Privacy":
      - /url: "#"
    - text: ·
    - link "About":
      - /url: "#"
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const calculators = [
  4   |   { path: '/calculators/wheel-offset/', name: 'Wheel Offset', defaults: { currentWidthIn: '8', currentOffsetMm: '35', newWidthIn: '9', newOffsetMm: '45' } },
  5   |   { path: '/calculators/compression-ratio/', name: 'Compression Ratio', defaults: { bore: '86', stroke: '86', chamberCc: '45', pistonDishCc: '5', pistonDomeCc: '0', gasketBore: '87', gasketThickness: '1.2', deckClearance: '0.5', unitSystem: 'mm' } },
  6   |   { path: '/calculators/power-to-weight/', name: 'Power-to-Weight', defaults: { power: '300', powerUnit: 'hp', weight: '3000', weightUnit: 'lb' } },
  7   |   { path: '/calculators/engine-displacement/', name: 'Engine Displacement', defaults: { bore: '86', stroke: '86', cylinders: '4', unitSystem: 'mm' } },
  8   |   { path: '/calculators/horsepower/', name: 'Horsepower', defaults: { torque: '400', torqueUnit: 'lb-ft', rpm: '6000' } },
  9   |   { path: '/calculators/fuel-injector/', name: 'Fuel Injector', defaults: { horsepower: '400', bsfc: '0.5', injectorCount: '4', dutyCycle: '0.8', fuelDensity: '0.75' } },
  10  |   { path: '/calculators/quarter-mile/', name: 'Quarter Mile', defaults: { weight: '3500', weightUnit: 'lb', horsepower: '400', powerType: 'crank' } },
  11  |   { path: '/calculators/tire-size/', name: 'Tire Size', defaults: { tireAWidth: '225', tireAAspect: '45', tireARim: '17', tireBWidth: '235', tireBAspect: '40', tireBRim: '18' } },
  12  | ];
  13  | 
  14  | test.describe('Edge case handling', () => {
  15  |   for (const calc of calculators) {
  16  |     test(`${calc.name} - empty inputs show inline errors`, async ({ page }) => {
  17  |       await page.goto(calc.path);
  18  |       await page.click('button[type="submit"]');
  19  |       
  20  |       // Check for inline errors
  21  |       const errors = page.locator('.field-error');
  22  |       await expect(errors.first()).toBeVisible();
  23  |     });
  24  | 
  25  |     test(`${calc.name} - invalid inputs show errors`, async ({ page }) => {
  26  |       await page.goto(calc.path);
  27  |       
  28  |       // Try various invalid inputs
  29  |       const inputs = page.locator('input[type="number"]');
  30  |       const count = await inputs.count();
  31  |       
  32  |       for (let i = 0; i < count; i++) {
  33  |         await inputs.nth(i).fill('abc');
  34  |         await page.click('button[type="submit"]');
  35  |         const errors = page.locator('.field-error');
  36  |         await expect(errors.first()).toBeVisible();
  37  |         
  38  |         // Clear and try next
  39  |         await page.reload();
  40  |       }
  41  |     });
  42  | 
  43  |     test(`${calc.name} - zero/negative values handled`, async ({ page }) => {
  44  |       await page.goto(calc.path);
  45  |       
  46  |       const inputs = page.locator('input[type="number"]');
  47  |       const count = await inputs.count();
  48  |       
  49  |       for (let i = 0; i < count; i++) {
  50  |         await inputs.nth(i).fill('-1');
  51  |       }
  52  |       await page.click('button[type="submit"]');
  53  |       
  54  |       const errors = page.locator('.field-error');
  55  |       await expect(errors.first()).toBeVisible();
  56  |     });
  57  | 
  58  |     test(`${calc.name} - very large numbers`, async ({ page }) => {
  59  |       await page.goto(calc.path);
  60  |       
  61  |       const inputs = page.locator('input[type="number"]');
  62  |       const count = await inputs.count();
  63  |       
  64  |       for (let i = 0; i < count; i++) {
  65  |         await inputs.nth(i).fill('1e9');
  66  |       }
  67  |       await page.click('button[type="submit"]');
  68  |       
  69  |       const errors = page.locator('.field-error');
> 70  |       await expect(errors.first()).toBeVisible();
      |                                    ^ Error: expect(locator).toBeVisible() failed
  71  |     });
  72  | 
  73  |     test(`${calc.name} - non-numeric input`, async ({ page }) => {
  74  |       await page.goto(calc.path);
  75  |       
  76  |       const inputs = page.locator('input[type="number"]');
  77  |       const count = await inputs.count();
  78  |       
  79  |       for (let i = 0; i < count; i++) {
  80  |         await inputs.nth(i).fill('abc');
  81  |       }
  82  |       await page.click('button[type="submit"]');
  83  |       
  84  |       const errors = page.locator('.field-error');
  85  |       await expect(errors.first()).toBeVisible();
  86  |     });
  87  |   }
  88  | });
  89  | 
  90  | test.describe('Calculation correctness', () => {
  91  |   test('Tire Size - known values', async ({ page }) => {
  92  |     await page.goto('/calculators/tire-size/');
  93  |     
  94  |     // Fill in 225/45R17 vs 235/40R18
  95  |     await page.fill('#tireAWidth-field', '225');
  96  |     await page.fill('#tireAAspect-field', '45');
  97  |     await page.fill('#tireARim-field', '17');
  98  |     await page.fill('#tireBWidth-field', '235');
  99  |     await page.fill('#tireBAspect-field', '40');
  100 |     await page.fill('#tireBRim-field', '18');
  101 |     await page.click('button[type="submit"]');
  102 |     
  103 |     // Check results
  104 |     const resultPanel = page.locator('.result-panel');
  105 |     await expect(resultPanel).toContainText('10.9 mm');
  106 |     await expect(resultPanel).toContainText('61.0 MPH');
  107 |     await expect(resultPanel).toContainText('808');
  108 |     await expect(resultPanel).toContainText('794');
  109 |   });
  110 | 
  111 |   test('Tire Size - speedometer table', async ({ page }) => {
  112 |     await page.goto('/calculators/tire-size/');
  113 |     
  114 |     await page.fill('#tireAWidth-field', '225');
  115 |     await page.fill('#tireAAspect-field', '45');
  116 |     await page.fill('#tireARim-field', '17');
  117 |     await page.fill('#tireBWidth-field', '235');
  118 |     await page.fill('#tireBAspect-field', '40');
  119 |     await page.fill('#tireBRim-field', '18');
  120 |     await page.click('button[type="submit"]');
  121 |     
  122 |     // Check speedometer table
  123 |     const table = page.locator('.speedo-table table');
  124 |     await expect(table).toContainText('30');
  125 |     await expect(table.locator('tbody tr').nth(0)).toContainText('30.5');
  126 |     await expect(table.locator('tbody tr').nth(2)).toContainText('61.0');
  127 |   });
  128 | 
  129 |   test('Compression Ratio - known value', async ({ page }) => {
  130 |     await page.goto('/calculators/compression-ratio/');
  131 |     
  132 |     await page.fill('#bore-field', '86');
  133 |     await page.fill('#stroke-field', '86');
  134 |     await page.fill('#chamberCc-field', '45');
  135 |     await page.fill('#pistonDishCc-field', '5');
  136 |     await page.fill('#pistonDomeCc-field', '0');
  137 |     await page.fill('#gasketBore-field', '87');
  138 |     await page.fill('#gasketThickness-field', '1.2');
  139 |     await page.fill('#deckClearance-field', '0.5');
  140 |     await page.click('button[type="submit"]');
  141 |     
  142 |     await expect(page.locator('.result-panel')).toContainText('9.32:1');
  143 |   });
  144 | });
```