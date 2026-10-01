# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: playwright-edge-cases.test.ts >> Edge case handling >> Engine Displacement - zero/negative values handled
- Location: tests\playwright-edge-cases.test.ts:43:5

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
    - heading "Engine Displacement Calculator" [level=1]
    - paragraph: Calculate displacement from bore, stroke, and cylinder count. Results in cc, liters, cubic inches, per-cylinder volume, and bore/stroke ratio with geometry classification.
    - region "Calculator Inputs":
      - heading "Calculator Inputs" [level=2]
      - group "Engine Geometry":
        - text: Engine Geometry Boremm
        - spinbutton "Boremm": "-1"
        - text: Strokemm
        - spinbutton "Strokemm": "-1"
        - text: Cylinders
        - spinbutton "Cylinders": "-1"
      - radio "mm" [checked]
      - text: mm
      - radio "inches"
      - text: inches
      - button "Calculate"
      - link "Reset":
        - /url: /calculators/engine-displacement/
    - complementary "Results":
      - heading "Results" [level=2]
      - status:
        - text: 1998 cc (2.00 L, 121.9 cu in) Total Displacement
        - term: Per Cylinder
        - definition: 499.6 cc
        - term: Bore/Stroke Ratio
        - definition: "1.00"
        - term: Geometry
        - definition: Square (bore ≈ stroke) — balanced characteristics
        - paragraph: "Total displacement: 1998 cc (2.00 L, 121.9 cu in). Per cylinder: 499.6 cc. Bore/stroke ratio: 1.00 — Square (bore ≈ stroke) — balanced characteristics. Note: Bore/stroke ratio is descriptive geometry, not a performance predictor."
    - region "Formula & Method":
      - heading "Formula & Method" [level=2]
      - heading "Formula" [level=3]
      - code: V_cylinder = π/4 × bore² × stroke / 1000 Total = V_cylinder × cylinders Bore/Stroke Ratio = bore / stroke
      - term:
        - code: bore
      - definition: Cylinder bore(mm or in)
      - term:
        - code: stroke
      - definition: Piston stroke(mm or in)
      - term:
        - code: cylinders
      - definition: Number of cylinders
      - term:
        - code: V_cylinder
      - definition: Displacement per cylinder(cc)
      - list:
        - listitem: Bore/stroke ratio is descriptive geometry only — not a performance predictor.
        - listitem: "Oversquare (>1.05): bore > stroke, favors high-RPM power."
        - listitem: "Square (~1.0): bore ≈ stroke, balanced characteristics."
        - listitem: "Undersquare (<0.95): stroke > bore, favors low-end torque."
        - listitem: Also handles "bore stroke calculator" search intent.
    - region "Worked Example":
      - heading "Worked Example" [level=2]
      - paragraph:
        - strong: "Example:"
        - text: 86 mm bore, 86 mm stroke, 4 cylinders.
      - list:
        - listitem:
          - text: "Per cylinder: π/4 × 86² × 86 / 1000 ="
          - strong: 499.6 cc
        - listitem:
          - text: "Total: 499.6 × 4 ="
          - strong: 1,998 cc (2.00 L, 121.9 cu in)
        - listitem:
          - text: "Bore/stroke: 86/86 ="
          - strong: 1.00 (Square)
      - paragraph:
        - strong: "Example 2:"
        - text: 4.0″ bore, 3.0″ stroke, 8 cylinders (classic V8).
      - list:
        - listitem:
          - text: "Per cylinder: π/4 × 101.6² × 76.2 / 1000 ="
          - strong: 617.8 cc
        - listitem:
          - text: "Total: 617.8 × 8 ="
          - strong: 4,942 cc (4.94 L, 301.6 cu in)
        - listitem:
          - text: "Bore/stroke: 101.6/76.2 ="
          - strong: 1.33 (Oversquare)
    - region "Limitations":
      - heading "Limitations" [level=2]
      - paragraph:
        - strong: "Limitations:"
      - list:
        - listitem: Bore/stroke ratio describes geometry only — does not determine power/torque characteristics alone
        - listitem: Assumes perfect cylindrical bores (no taper, out-of-round)
        - listitem: Does not account for combustion chamber volume (see Compression Ratio Calculator)
        - listitem: Nominal dimensions may differ from actual machined dimensions
    - region "Related Tools":
      - heading "Related Tools" [level=2]
      - navigation "Related calculators and guides":
        - list:
          - listitem:
            - link "Compression Ratio Calculator Static CR with component breakdown":
              - /url: /calculators/compression-ratio/
          - listitem:
            - link "Bore vs Stroke Oversquare, square, undersquare explained":
              - /url: /guides/bore-vs-stroke/
          - listitem:
            - link "Engine Hub All engine geometry tools":
              - /url: /engine/
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
> 55  |       await expect(errors.first()).toBeVisible();
      |                                    ^ Error: expect(locator).toBeVisible() failed
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