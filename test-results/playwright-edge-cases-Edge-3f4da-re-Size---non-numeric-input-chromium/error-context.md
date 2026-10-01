# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: playwright-edge-cases.test.ts >> Edge case handling >> Tire Size - non-numeric input
- Location: tests\playwright-edge-cases.test.ts:73:5

# Error details

```
Error: locator.fill: Error: Cannot type text into input[type=number]
Call log:
  - waiting for locator('input[type="number"]').first()
    - locator resolved to <input step="5" min="155" max="400" value="225" required="" type="number" name="tireAWidth" class="field-input" aria-invalid="false" id="tireAWidth-field" placeholder="e.g., 225" data-astro-cid-rrvtat5r=""/>
    - fill("abc")
  - attempting fill action
    - waiting for element to be visible, enabled and editable

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Automotive Calculators Home" [ref=e5] [cursor=pointer]:
        - /url: /
        - generic [ref=e10]: Automotive Calculators
      - navigation "Main navigation" [ref=e11]:
        - list [ref=e12]:
          - listitem [ref=e13]:
            - link "All Calculators" [ref=e14] [cursor=pointer]:
              - /url: /calculators/
          - listitem [ref=e15]:
            - link "Wheels & Tires" [ref=e16] [cursor=pointer]:
              - /url: /wheels-tires/
          - listitem [ref=e17]:
            - link "Engine" [ref=e18] [cursor=pointer]:
              - /url: /engine/
          - listitem [ref=e19]:
            - link "Performance" [ref=e20] [cursor=pointer]:
              - /url: /performance/
          - listitem [ref=e21]:
            - link "Fueling" [ref=e22] [cursor=pointer]:
              - /url: /fueling/
          - listitem [ref=e23]:
            - link "Guides" [ref=e24] [cursor=pointer]:
              - /url: /guides/
  - main [ref=e25]:
    - article [ref=e26]:
      - generic [ref=e28]:
        - heading "Tire Size Calculator" [level=1] [ref=e29]
        - paragraph [ref=e30]: Compare tire dimensions and speedometer effect. Enter section width (mm), aspect ratio (%), and wheel diameter (inches) for both tires.
      - generic [ref=e31]:
        - region [ref=e32]:
          - heading "Calculator Inputs" [level=2] [ref=e33]
          - generic [ref=e34]:
            - group "Tire A (Current / Reference)" [ref=e35]:
              - generic [ref=e37]:
                - generic [ref=e38]: Section Width (mm)*
                - spinbutton "Section Width (mm)" [ref=e39]: "225"
              - generic [ref=e40]:
                - generic [ref=e41]: Aspect Ratio (%)*
                - spinbutton "Aspect Ratio (%)" [ref=e42]: "45"
              - generic [ref=e43]:
                - generic [ref=e44]: Rim Diameter (inches)*
                - spinbutton "Rim Diameter (inches)" [ref=e45]: "17"
            - group "Tire B (Proposed / Comparison)" [ref=e46]:
              - generic [ref=e48]:
                - generic [ref=e49]: Section Width (mm)*
                - spinbutton "Section Width (mm)" [ref=e50]: "235"
              - generic [ref=e51]:
                - generic [ref=e52]: Aspect Ratio (%)*
                - spinbutton "Aspect Ratio (%)" [ref=e53]: "40"
              - generic [ref=e54]:
                - generic [ref=e55]: Rim Diameter (inches)*
                - spinbutton "Rim Diameter (inches)" [ref=e56]: "18"
            - generic [ref=e57]:
              - button "Calculate" [ref=e58] [cursor=pointer]
              - link "Reset" [ref=e59] [cursor=pointer]:
                - /url: /calculators/tire-size/
        - complementary [ref=e60]:
          - heading "Results" [level=2] [ref=e61]
      - region [ref=e62]:
        - heading "Formula & Method" [level=2] [ref=e63]
        - generic [ref=e64]:
          - heading "Formula" [level=3] [ref=e65]
          - code [ref=e68]: sidewall_mm = section_width_mm × aspect_ratio / 100 diameter_mm = 2 × sidewall_mm + rim_in × 25.4 circumference_mm = π × diameter_mm revs_per_mile = 63360 / (π × diameter_in) diameter_diff_mm = diameter_B - diameter_A diameter_diff_pct = (diameter_diff / diameter_A) × 100 ground_clearance_change = diameter_diff / 2 actual_speed = indicated_speed × diameter_B / diameter_A speedometer_error_pct = (diameter_A / diameter_B − 1) × 100
          - generic [ref=e69]:
            - generic [ref=e70]:
              - term [ref=e71]:
                - code [ref=e72]: section_width_mm
              - definition [ref=e73]: Tire section width(mm)
            - generic [ref=e74]:
              - term [ref=e75]:
                - code [ref=e76]: aspect_ratio
              - definition [ref=e77]: Aspect ratio (sidewall/width)(%)
            - generic [ref=e78]:
              - term [ref=e79]:
                - code [ref=e80]: rim_in
              - definition [ref=e81]: Wheel/rim diameter(inches)
            - generic [ref=e82]:
              - term [ref=e83]:
                - code [ref=e84]: sidewall_mm
              - definition [ref=e85]: Sidewall height(mm)
            - generic [ref=e86]:
              - term [ref=e87]:
                - code [ref=e88]: diameter_mm
              - definition [ref=e89]: Overall tire diameter(mm)
            - generic [ref=e90]:
              - term [ref=e91]:
                - code [ref=e92]: circumference_mm
              - definition [ref=e93]: Tire circumference(mm)
          - list [ref=e94]:
            - listitem [ref=e95]: Calculations use nominal tire dimensions — actual mounted dimensions vary by tire model, rim width, inflation pressure, and load.
            - listitem [ref=e96]: Ground clearance change = diameter difference / 2 (radius change).
            - listitem [ref=e97]: "Speedometer error: positive % means the speedometer reads HIGH (you travel slower than indicated); negative means it reads LOW."
            - listitem [ref=e98]: "At 60 MPH indicated: actual = 60 × (diameter_B / diameter_A)."
            - listitem [ref=e99]: Revs/mile useful for transmission/gearing calculations.
      - region [ref=e100]:
        - heading "Worked Example" [level=2] [ref=e101]
        - generic [ref=e102]:
          - paragraph [ref=e103]:
            - strong [ref=e104]: "Example:"
            - text: 225/45R17 vs 235/40R18 (common plus-one sizing)
          - list [ref=e105]:
            - listitem [ref=e106]:
              - strong [ref=e107]: "Tire A:"
              - text: 225 × 0.45 = 101.25 mm sidewall; 2×101.25 + 17×25.4 =
              - strong [ref=e108]: 634.3 mm (24.97″)
            - listitem [ref=e109]:
              - strong [ref=e110]: "Tire B:"
              - text: 235 × 0.40 = 94.0 mm sidewall; 2×94.0 + 18×25.4 =
              - strong [ref=e111]: 645.2 mm (25.40″)
            - listitem [ref=e112]:
              - strong [ref=e113]: "Difference:"
              - text: +10.9 mm (+1.7%) diameter; +5.5 mm ground clearance
            - listitem [ref=e114]:
              - strong [ref=e115]: "Speedometer:"
              - text: At 60 MPH indicated, actual = 60 × 645.2 / 634.3 =
              - strong [ref=e116]: 61.0 MPH
              - text: (speedometer reads 1.7% low)
      - region [ref=e117]:
        - heading "Limitations" [level=2] [ref=e118]
        - generic [ref=e119]:
          - paragraph [ref=e120]:
            - strong [ref=e121]: "Notes & limitations:"
          - list [ref=e122]:
            - listitem [ref=e123]:
              - strong [ref=e124]: "Nominal vs actual:"
              - text: Stated dimensions can differ from measured by ±2–3% due to tire model, construction, rim width, pressure, load, and wear.
            - listitem [ref=e125]:
              - strong [ref=e126]: Section width
              - text: is measured on design rim width — actual width changes with rim width.
            - listitem [ref=e127]:
              - strong [ref=e128]: Aspect ratio
              - text: is calculated at design load and pressure.
            - listitem [ref=e129]:
              - strong [ref=e130]: Speedometer calibration
              - text: assumes original tire was correct — if already off, error compounds.
            - listitem [ref=e131]:
              - strong [ref=e132]: "Does not check:"
              - text: fender clearance, suspension travel, brake caliper clearance, load rating, speed rating.
            - listitem [ref=e133]: Always verify fitment with actual mounted measurements before purchasing.
      - region [ref=e134]:
        - heading "Related Tools" [level=2] [ref=e135]
        - navigation "Related calculators and guides" [ref=e136]:
          - list [ref=e137]:
            - listitem [ref=e138]:
              - link "Wheel Offset Calculator Check inner/outer clearance when changing wheels" [ref=e139] [cursor=pointer]:
                - /url: /calculators/wheel-offset/
                - generic [ref=e140]: Wheel Offset Calculator
                - generic [ref=e141]: Check inner/outer clearance when changing wheels
            - listitem [ref=e142]:
              - link "Wheels & Tires Hub All wheel and tire tools" [ref=e143] [cursor=pointer]:
                - /url: /wheels-tires/
                - generic [ref=e144]: Wheels & Tires Hub
                - generic [ref=e145]: All wheel and tire tools
  - contentinfo [ref=e146]:
    - generic [ref=e147]:
      - paragraph [ref=e148]: © 2026 Automotive Calculators. Built for enthusiasts, by enthusiasts.
      - navigation "Footer navigation" [ref=e149]:
        - link "Calculators" [ref=e150] [cursor=pointer]:
          - /url: /calculators/
        - text: ·
        - link "Guides" [ref=e151] [cursor=pointer]:
          - /url: /guides/
        - text: ·
        - link "Privacy" [ref=e152] [cursor=pointer]:
          - /url: "#"
        - text: ·
        - link "About" [ref=e153] [cursor=pointer]:
          - /url: "#"
  - generic [ref=e156]:
    - button [ref=e157]
    - button [ref=e163]
    - button [ref=e167]
    - button [ref=e175]
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
  70  |       await expect(errors.first()).toBeVisible();
  71  |     });
  72  | 
  73  |     test(`${calc.name} - non-numeric input`, async ({ page }) => {
  74  |       await page.goto(calc.path);
  75  |       
  76  |       const inputs = page.locator('input[type="number"]');
  77  |       const count = await inputs.count();
  78  |       
  79  |       for (let i = 0; i < count; i++) {
> 80  |         await inputs.nth(i).fill('abc');
      |                             ^ Error: locator.fill: Error: Cannot type text into input[type=number]
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