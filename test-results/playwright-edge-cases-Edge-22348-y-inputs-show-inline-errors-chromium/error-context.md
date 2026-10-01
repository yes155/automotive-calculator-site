# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: playwright-edge-cases.test.ts >> Edge case handling >> Power-to-Weight - empty inputs show inline errors
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
    - heading "Power-to-Weight Ratio Calculator" [level=1]
    - paragraph: Calculate power-to-weight ratio in multiple units. Enter power (hp or kW) and weight (lb or kg) — get hp/lb, hp/ton, kW/kg, W/kg, and inverse ratios.
    - region "Calculator Inputs":
      - heading "Calculator Inputs" [level=2]
      - group "Power":
        - text: Power Power
        - spinbutton "Power": "300"
        - combobox:
          - option "hp" [selected]
          - option "kW"
      - group "Weight":
        - text: Weight Weight
        - spinbutton "Weight": "3000"
        - combobox:
          - option "lb" [selected]
          - option "kg"
      - button "Calculate"
      - link "Reset":
        - /url: /calculators/power-to-weight/
    - complementary "Results":
      - heading "Results" [level=2]
      - status:
        - text: 0.1000 hp/lb Power-to-Weight
        - term: hp per US Ton
        - definition: "200"
        - term: kW/kg
        - definition: "0.164"
        - term: W/kg
        - definition: "164"
        - term: lb/hp
        - definition: "10.00"
        - term: kg/kW
        - definition: "6.08"
        - paragraph: 300 hp / 3000 lb = 0.1000 hp/lb (200 hp/ton, 0.164 kW/kg, 164 W/kg).
    - region "Formula & Method":
      - heading "Formula & Method" [level=2]
      - heading "Formula" [level=3]
      - code: hp/lb = power_hp / weight_lb hp/ton = power_hp / (weight_lb / 2000) kW/kg = power_kW / weight_kg W/kg = kW/kg × 1000 lb/hp = weight_lb / power_hp kg/kW = weight_kg / power_kW
      - term:
        - code: power_hp
      - definition: Power in horsepower(hp)
      - term:
        - code: power_kW
      - definition: Power in kilowatts(kW)
      - term:
        - code: weight_lb
      - definition: Weight in pounds(lb)
      - term:
        - code: weight_kg
      - definition: Weight in kilograms(kg)
      - term:
        - code: 1 hp
      - definition: Mechanical horsepower(= 0.745699872 kW)
      - term:
        - code: 1 lb
      - definition: Pound(= 0.45359237 kg)
      - list:
        - listitem: 1 mechanical hp = 0.745699872 kW exactly.
        - listitem: 1 lb = 0.45359237 kg exactly.
        - listitem: US ton = 2,000 lb (not metric tonne).
        - listitem: Power and weight must both be > 0.
    - region "Worked Example":
      - heading "Worked Example" [level=2]
      - paragraph:
        - strong: "Example:"
        - text: 300 hp, 3,000 lb
      - list:
        - listitem:
          - text: hp/lb = 300 / 3000 =
          - strong: "0.1000"
        - listitem:
          - text: hp/ton = 300 / (3000/2000) =
          - strong: "200"
        - listitem: kW = 300 × 0.7457 = 223.7; kg = 3000 × 0.4536 = 1360.8
        - listitem:
          - text: kW/kg = 223.7 / 1360.8 =
          - strong: "0.164"
        - listitem:
          - text: W/kg = 0.164 × 1000 =
          - strong: "164"
        - listitem:
          - text: lb/hp = 3000 / 300 =
          - strong: "10.00"
      - paragraph:
        - strong: "Mixed units:"
        - text: 300 hp, 1,361 kg
      - list:
        - listitem:
          - text: hp/lb = 300 / 3000 =
          - strong: "0.1000"
        - listitem:
          - text: kg/kW = 1361 / 223.7 =
          - strong: "6.08"
    - region "Limitations":
      - heading "Limitations" [level=2]
      - paragraph:
        - strong: "Limitations:"
      - list:
        - listitem: Power-to-weight is a single metric — does not capture torque curve, gearing, traction, aero
        - listitem: Crank hp vs wheel hp changes ratio by ~15–20%
        - listitem: Weight should include driver, fluids, cargo for accurate vehicle ratio
        - listitem: Does not indicate where in RPM range power is made
    - region "Related Tools":
      - heading "Related Tools" [level=2]
      - navigation "Related calculators and guides":
        - list:
          - listitem:
            - link "Horsepower Calculator Torque × RPM → hp/kW":
              - /url: /calculators/horsepower/
          - listitem:
            - link "Quarter Mile Estimator Empirical ET and trap speed":
              - /url: /calculators/quarter-mile/
          - listitem:
            - link "Horsepower vs Torque The relationship and 5252 crossover":
              - /url: /guides/horsepower-vs-torque/
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