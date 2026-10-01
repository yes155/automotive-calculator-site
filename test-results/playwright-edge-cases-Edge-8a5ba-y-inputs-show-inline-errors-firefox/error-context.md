# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: playwright-edge-cases.test.ts >> Edge case handling >> Wheel Offset - empty inputs show inline errors
- Location: tests\playwright-edge-cases.test.ts:16:5

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
    - heading "Wheel Offset Calculator" [level=1]
    - paragraph: Compare a current wheel with a proposed wheel and see how far the inner and outer edges move. Enter width (inches) and offset ET (mm) for both wheels.
    - region "Calculator Inputs":
      - heading "Calculator Inputs" [level=2]
      - group "Current Wheel":
        - text: Current Wheel Wheel Widthinches
        - spinbutton "Wheel Widthinches": "8"
        - text: Offset (ET)mm
        - spinbutton "Offset (ET)mm": "35"
      - group "New Wheel":
        - text: New Wheel Wheel Widthinches
        - spinbutton "Wheel Widthinches": "9"
        - text: Offset (ET)mm
        - spinbutton "Offset (ET)mm": "45"
      - button "Calculate"
      - link "Reset":
        - /url: /calculators/wheel-offset/
    - complementary "Results":
      - heading "Results" [level=2]
      - status:
        - text: New wheel moves 22.7 mm closer to the suspension and 2.7 mm farther outward toward the fender. Summary
        - term: Inner Clearance Change
        - definition: "-22.7 mm"
        - term: Outer Poke Change
        - definition: +2.7 mm
        - term: Old Inner Position
        - definition: 136.6 mm
        - term: Old Outer Position
        - definition: 66.6 mm
        - term: New Inner Position
        - definition: 159.3 mm
        - term: New Outer Position
        - definition: 69.3 mm
    - region "Formula & Method":
      - heading "Formula & Method" [level=2]
      - heading "Formula" [level=3]
      - code: half_width_mm = width_in × 25.4 / 2 inner_position = half_width_mm + offset_mm outer_position = half_width_mm - offset_mm inner_clearance_change = old_inner_position - new_inner_position outer_poke_change = new_outer_position - old_outer_position
      - term:
        - code: width_in
      - definition: Wheel width(inches)
      - term:
        - code: offset_mm
      - definition: Offset (ET)(mm)
      - term:
        - code: half_width_mm
      - definition: Half width(mm)
      - term:
        - code: inner_position
      - definition: Distance from hub to inner edge(mm)
      - term:
        - code: outer_position
      - definition: Distance from hub to outer edge(mm)
      - list:
        - listitem: Positive inner clearance change means the new wheel provides MORE clearance to suspension components.
        - listitem: Negative inner clearance change means the new wheel sits CLOSER to suspension (less clearance).
        - listitem: Positive outer poke change means the new wheel extends FARTHER toward the fender.
        - listitem: Negative outer poke change means the new wheel sits MORE INWARD toward the suspension.
    - region "Worked Example":
      - heading "Worked Example" [level=2]
      - paragraph:
        - strong: "Example:"
        - text: "Current wheel: 8″ × ET35. Proposed wheel: 9″ × ET45."
      - list:
        - listitem: "Old half-width: 8 × 25.4 / 2 = 101.6 mm"
        - listitem: "Old inner: 101.6 + 35 = 136.6 mm | Old outer: 101.6 − 35 = 66.6 mm"
        - listitem: "New half-width: 9 × 25.4 / 2 = 114.3 mm"
        - listitem: "New inner: 114.3 + 45 = 159.3 mm | New outer: 114.3 − 45 = 69.3 mm"
        - listitem:
          - text: "Inner clearance change: 136.6 − 159.3 ="
          - strong: −22.7 mm
          - text: (22.7 mm less clearance)
        - listitem:
          - text: "Outer poke change: 69.3 − 66.6 ="
          - strong: +2.7 mm
          - text: (2.7 mm farther out)
    - region "Limitations":
      - heading "Limitations" [level=2]
      - paragraph:
        - strong: "Important limitation:"
        - text: This calculator shows wheel rim geometry only. It does
        - emphasis: not
        - text: "guarantee:"
      - list:
        - listitem: Brake caliper clearance
        - listitem: Suspension component clearance (struts, control arms, tie rods)
        - listitem: Tire sidewall clearance (tires are wider than the rim)
        - listitem: Fender/lip clearance
        - listitem: Hub bore compatibility
        - listitem: Load rating adequacy
      - paragraph: Always verify fitment with a physical test fit or professional consultation before purchasing.
    - region "Related Tools":
      - heading "Related Tools" [level=2]
      - navigation "Related calculators and guides":
        - list:
          - listitem:
            - link "Tire Size Calculator Compare tire diameters and speedometer effect":
              - /url: /calculators/tire-size/
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
> 22  |       await expect(errors.first()).toBeVisible();
      |                                    ^ Error: expect(locator).toBeVisible() failed
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
```