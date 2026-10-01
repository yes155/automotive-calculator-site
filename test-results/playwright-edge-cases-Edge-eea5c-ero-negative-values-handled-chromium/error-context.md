# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: playwright-edge-cases.test.ts >> Edge case handling >> Fuel Injector - zero/negative values handled
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
    - heading "Fuel Injector Calculator" [level=1]
    - paragraph: Estimate required injector flow (lb/hr and cc/min per injector) from target horsepower, BSFC, number of injectors, max duty cycle, and fuel density.
    - region "Calculator Inputs":
      - heading "Calculator Inputs" [level=2]
      - group "Engine & Fuel":
        - text: Engine & Fuel Target Horsepower
        - spinbutton "Target Horsepower": "-1"
        - text: BSFC (lb/hp/hr)
        - spinbutton "BSFC (lb/hp/hr)": "-1"
        - text: Fuel Densityg/mL
        - spinbutton "Fuel Densityg/mL": "-1"
      - group "Injector Setup":
        - text: Injector Setup Number of Injectors
        - spinbutton "Number of Injectors": "-1"
        - text: Max Duty Cycle
        - spinbutton "Max Duty Cycle": "-1"
      - button "Calculate"
      - link "Reset":
        - /url: /calculators/fuel-injector/
    - complementary "Results":
      - heading "Results" [level=2]
      - status:
        - text: 630 cc/min (62.5 lb/hr) Per Injector Flow
        - term: Total Fuel Flow
        - definition: 200.0 lb/hr (2520 cc/min)
        - term: Per Injector (lb/hr)
        - definition: "62.5"
        - term: Injectors
        - definition: "4"
        - term: Duty Cycle
        - definition: 80%
        - term: BSFC
        - definition: "0.50"
        - term: Fuel Density
        - definition: 0.75 g/mL
        - paragraph: "Target: 400 hp × 0.5 BSFC = 200.0 lb/hr total. Per injector (4 @ 80% duty): 62.5 lb/hr = 630 cc/min @ 0.75 g/mL. Total flow: 2520 cc/min. Note: Real sizing depends on fuel pressure, injector characterization, fuel type, target AFR, and system design."
    - region "Formula & Method":
      - heading "Formula & Method" [level=2]
      - heading "Formula" [level=3]
      - code: total_lb_hr = horsepower × BSFC per_injector_lb_hr = total_lb_hr / (injector_count × duty_cycle) cc_min = per_injector_lb_hr × 453.59237 / 60 / density_g_ml
      - term:
        - code: horsepower
      - definition: Target power(hp)
      - term:
        - code: BSFC
      - definition: Brake-specific fuel consumption(lb/hp/hr)
      - term:
        - code: injector_count
      - definition: Number of injectors
      - term:
        - code: duty_cycle
      - definition: Max injector duty cycle(decimal (0–1))
      - term:
        - code: density
      - definition: Fuel density(g/mL)
      - list:
        - listitem: "Typical BSFC: 0.45–0.50 (NA gasoline), 0.55–0.65 (forced induction gasoline), 0.60–0.75 (E85)."
        - listitem: Do not silently use a performance-sensitive BSFC preset — name the assumption and let the user edit it.
        - listitem: "Typical fuel density: 0.72–0.78 g/mL (gasoline), ~0.79 g/mL (E85)."
        - listitem: Duty cycle >85% risks injector overheating and inconsistent flow.
    - region "Worked Example":
      - heading "Worked Example" [level=2]
      - paragraph:
        - strong: "Example:"
        - text: 400 hp, BSFC 0.50, 4 injectors, 80% duty, gasoline (0.75 g/mL)
      - list:
        - listitem:
          - text: "Total: 400 × 0.50 ="
          - strong: 200 lb/hr
        - listitem:
          - text: "Per injector: 200 / (4 × 0.8) ="
          - strong: 62.5 lb/hr
        - listitem:
          - text: "cc/min: 62.5 × 453.59237 / 60 / 0.75 ="
          - strong: 630 cc/min
      - paragraph:
        - strong: "Same setup, E85 (0.79 g/mL):"
      - list:
        - listitem:
          - text: "cc/min: 62.5 × 453.59237 / 60 / 0.79 ="
          - strong: 598 cc/min
    - region "Limitations":
      - heading "Limitations" [level=2]
      - paragraph:
        - strong: "Important limitations:"
      - list:
        - listitem: Real sizing depends on fuel pressure, injector characterization data, fuel type, target lambda/AFR
        - listitem: BSFC varies significantly with engine design, compression, cam, tuning, load
        - listitem: Injector flow ratings typically at 43.5 psi (3 bar) — flow changes with pressure
        - listitem: Pulse width, latency, and dead time affect actual delivered fuel
        - listitem: Always verify with injector manufacturer data and dyno tuning
    - region "Related Tools":
      - heading "Related Tools" [level=2]
      - navigation "Related calculators and guides":
        - list:
          - listitem:
            - link "BSFC Explained What BSFC measures and why it varies":
              - /url: /guides/bsfc-explained/
          - listitem:
            - link "Horsepower Calculator Torque × RPM → hp/kW":
              - /url: /calculators/horsepower/
          - listitem:
            - link "Fueling Hub All fuel system tools":
              - /url: /fueling/
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