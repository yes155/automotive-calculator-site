# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: playwright-edge-cases.test.ts >> Edge case handling >> Fuel Injector - invalid inputs show errors
- Location: tests\playwright-edge-cases.test.ts:25:5

# Error details

```
Error: locator.fill: Error: Cannot type text into input[type=number]
Call log:
  - waiting for locator('input[type="number"]').first()
    - locator resolved to <input min="50" step="1" max="2000" value="400" required="" type="number" name="horsepower" class="field-input" aria-invalid="false" id="horsepower-field" placeholder="e.g., 400" data-astro-cid-rrvtat5r="" data-astro-source-loc="29:4" data-astro-source-file="C:/Users/HomePC/Documents/Default Project/automotive-calculator-site/src/components/NumberField.astro"/>
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
        - heading "Fuel Injector Calculator" [level=1] [ref=e29]
        - paragraph [ref=e30]: Estimate required injector flow (lb/hr and cc/min per injector) from target horsepower, BSFC, number of injectors, max duty cycle, and fuel density.
      - generic [ref=e31]:
        - region [ref=e32]:
          - heading "Calculator Inputs" [level=2] [ref=e33]
          - generic [ref=e34]:
            - group "Engine & Fuel" [ref=e35]:
              - generic [ref=e37]:
                - generic [ref=e38]: Target Horsepower*
                - spinbutton "Target Horsepower" [ref=e39]: "400"
              - generic [ref=e40]:
                - generic [ref=e41]: BSFC (lb/hp/hr)*
                - spinbutton "BSFC (lb/hp/hr)" [ref=e42]: "0.5"
              - generic [ref=e43]:
                - generic [ref=e44]: Fuel Densityg/mL*
                - spinbutton "Fuel Densityg/mL" [ref=e45]: "0.75"
            - group "Injector Setup" [ref=e46]:
              - generic [ref=e48]:
                - generic [ref=e49]: Number of Injectors*
                - spinbutton "Number of Injectors" [ref=e50]: "4"
              - generic [ref=e51]:
                - generic [ref=e52]: Max Duty Cycle*
                - spinbutton "Max Duty Cycle" [ref=e53]: "0.8"
            - generic [ref=e54]:
              - button "Calculate" [ref=e55] [cursor=pointer]
              - link "Reset" [ref=e56] [cursor=pointer]:
                - /url: /calculators/fuel-injector/
        - complementary [ref=e57]:
          - heading "Results" [level=2] [ref=e58]
          - status [ref=e59]:
            - generic [ref=e60]:
              - generic [ref=e61]: 630 cc/min (62.5 lb/hr)
              - generic [ref=e62]: Per Injector Flow
            - generic [ref=e63]:
              - generic [ref=e64]:
                - term [ref=e65]: Total Fuel Flow
                - definition [ref=e66]: 200.0 lb/hr (2520 cc/min)
              - generic [ref=e67]:
                - term [ref=e68]: Per Injector (lb/hr)
                - definition [ref=e69]: "62.5"
              - generic [ref=e70]:
                - term [ref=e71]: Injectors
                - definition [ref=e72]: "4"
              - generic [ref=e73]:
                - term [ref=e74]: Duty Cycle
                - definition [ref=e75]: 80%
              - generic [ref=e76]:
                - term [ref=e77]: BSFC
                - definition [ref=e78]: "0.50"
              - generic [ref=e79]:
                - term [ref=e80]: Fuel Density
                - definition [ref=e81]: 0.75 g/mL
            - paragraph [ref=e82]: "Target: 400 hp × 0.5 BSFC = 200.0 lb/hr total. Per injector (4 @ 80% duty): 62.5 lb/hr = 630 cc/min @ 0.75 g/mL. Total flow: 2520 cc/min. Note: Real sizing depends on fuel pressure, injector characterization, fuel type, target AFR, and system design."
      - region [ref=e83]:
        - heading "Formula & Method" [level=2] [ref=e84]
        - generic [ref=e85]:
          - heading "Formula" [level=3] [ref=e86]
          - code [ref=e89]: total_lb_hr = horsepower × BSFC per_injector_lb_hr = total_lb_hr / (injector_count × duty_cycle) cc_min = per_injector_lb_hr × 453.59237 / 60 / density_g_ml
          - generic [ref=e90]:
            - generic [ref=e91]:
              - term [ref=e92]:
                - code [ref=e93]: horsepower
              - definition [ref=e94]: Target power(hp)
            - generic [ref=e95]:
              - term [ref=e96]:
                - code [ref=e97]: BSFC
              - definition [ref=e98]: Brake-specific fuel consumption(lb/hp/hr)
            - generic [ref=e99]:
              - term [ref=e100]:
                - code [ref=e101]: injector_count
              - definition [ref=e102]: Number of injectors
            - generic [ref=e103]:
              - term [ref=e104]:
                - code [ref=e105]: duty_cycle
              - definition [ref=e106]: Max injector duty cycle(decimal (0–1))
            - generic [ref=e107]:
              - term [ref=e108]:
                - code [ref=e109]: density
              - definition [ref=e110]: Fuel density(g/mL)
          - list [ref=e111]:
            - listitem [ref=e112]: "Typical BSFC: 0.45–0.50 (NA gasoline), 0.55–0.65 (forced induction gasoline), 0.60–0.75 (E85)."
            - listitem [ref=e113]: Do not silently use a performance-sensitive BSFC preset — name the assumption and let the user edit it.
            - listitem [ref=e114]: "Typical fuel density: 0.72–0.78 g/mL (gasoline), ~0.79 g/mL (E85)."
            - listitem [ref=e115]: Duty cycle >85% risks injector overheating and inconsistent flow.
      - region [ref=e116]:
        - heading "Worked Example" [level=2] [ref=e117]
        - generic [ref=e118]:
          - paragraph [ref=e119]:
            - strong [ref=e120]: "Example:"
            - text: 400 hp, BSFC 0.50, 4 injectors, 80% duty, gasoline (0.75 g/mL)
          - list [ref=e121]:
            - listitem [ref=e122]:
              - text: "Total: 400 × 0.50 ="
              - strong [ref=e123]: 200 lb/hr
            - listitem [ref=e124]:
              - text: "Per injector: 200 / (4 × 0.8) ="
              - strong [ref=e125]: 62.5 lb/hr
            - listitem [ref=e126]:
              - text: "cc/min: 62.5 × 453.59237 / 60 / 0.75 ="
              - strong [ref=e127]: 630 cc/min
          - paragraph [ref=e128]:
            - strong [ref=e129]: "Same setup, E85 (0.79 g/mL):"
          - list [ref=e130]:
            - listitem [ref=e131]:
              - text: "cc/min: 62.5 × 453.59237 / 60 / 0.79 ="
              - strong [ref=e132]: 598 cc/min
      - region [ref=e133]:
        - heading "Limitations" [level=2] [ref=e134]
        - generic [ref=e135]:
          - paragraph [ref=e136]:
            - strong [ref=e137]: "Important limitations:"
          - list [ref=e138]:
            - listitem [ref=e139]: Real sizing depends on fuel pressure, injector characterization data, fuel type, target lambda/AFR
            - listitem [ref=e140]: BSFC varies significantly with engine design, compression, cam, tuning, load
            - listitem [ref=e141]: Injector flow ratings typically at 43.5 psi (3 bar) — flow changes with pressure
            - listitem [ref=e142]: Pulse width, latency, and dead time affect actual delivered fuel
            - listitem [ref=e143]: Always verify with injector manufacturer data and dyno tuning
      - region [ref=e144]:
        - heading "Related Tools" [level=2] [ref=e145]
        - navigation "Related calculators and guides" [ref=e146]:
          - list [ref=e147]:
            - listitem [ref=e148]:
              - link "BSFC Explained What BSFC measures and why it varies" [ref=e149] [cursor=pointer]:
                - /url: /guides/bsfc-explained/
                - generic [ref=e150]: BSFC Explained
                - generic [ref=e151]: What BSFC measures and why it varies
            - listitem [ref=e152]:
              - link "Horsepower Calculator Torque × RPM → hp/kW" [ref=e153] [cursor=pointer]:
                - /url: /calculators/horsepower/
                - generic [ref=e154]: Horsepower Calculator
                - generic [ref=e155]: Torque × RPM → hp/kW
            - listitem [ref=e156]:
              - link "Fueling Hub All fuel system tools" [ref=e157] [cursor=pointer]:
                - /url: /fueling/
                - generic [ref=e158]: Fueling Hub
                - generic [ref=e159]: All fuel system tools
  - contentinfo [ref=e160]:
    - generic [ref=e161]:
      - paragraph [ref=e162]: © 2026 Automotive Calculators. Built for enthusiasts, by enthusiasts.
      - navigation "Footer navigation" [ref=e163]:
        - link "Calculators" [ref=e164] [cursor=pointer]:
          - /url: /calculators/
        - text: ·
        - link "Guides" [ref=e165] [cursor=pointer]:
          - /url: /guides/
        - text: ·
        - link "Privacy" [ref=e166] [cursor=pointer]:
          - /url: "#"
        - text: ·
        - link "About" [ref=e167] [cursor=pointer]:
          - /url: "#"
  - generic [ref=e170]:
    - button [ref=e171]
    - button [ref=e177]
    - button [ref=e181]
    - button [ref=e189]
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
> 33  |         await inputs.nth(i).fill('abc');
      |                             ^ Error: locator.fill: Error: Cannot type text into input[type=number]
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
```