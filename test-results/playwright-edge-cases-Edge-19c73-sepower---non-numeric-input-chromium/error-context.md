# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: playwright-edge-cases.test.ts >> Edge case handling >> Horsepower - non-numeric input
- Location: tests\playwright-edge-cases.test.ts:73:5

# Error details

```
Error: locator.fill: Error: Cannot type text into input[type=number]
Call log:
  - waiting for locator('input[type="number"]').first()
    - locator resolved to <input min="0" step="1" max="2000" value="400" required="" type="number" name="torque" id="torque-field" class="field-input" aria-invalid="false" placeholder="e.g., 400" data-astro-cid-rrvtat5r=""/>
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
        - heading "Horsepower Calculator" [level=1] [ref=e29]
        - paragraph [ref=e30]: Calculate mechanical horsepower (hp) and kilowatts (kW) from torque and RPM. Enter torque in lb-ft or N·m.
      - generic [ref=e31]:
        - region [ref=e32]:
          - heading "Calculator Inputs" [level=2] [ref=e33]
          - generic [ref=e34]:
            - group "Inputs" [ref=e35]:
              - generic [ref=e37]:
                - generic [ref=e38]:
                  - generic [ref=e39]: Torque*
                  - spinbutton "Torque" [ref=e40]: "400"
                - combobox [ref=e41] [cursor=pointer]:
                  - option "lb-ft" [selected]
                  - option "N·m"
              - generic [ref=e42]:
                - generic [ref=e43]: RPM*
                - spinbutton "RPM" [ref=e44]: "6000"
            - generic [ref=e45]:
              - button "Calculate" [ref=e46] [cursor=pointer]
              - link "Reset" [ref=e47] [cursor=pointer]:
                - /url: /calculators/horsepower/
        - complementary [ref=e48]:
          - heading "Results" [level=2] [ref=e49]
          - status [ref=e50]:
            - generic [ref=e51]:
              - generic [ref=e52]: 457.0 hp (340.8 kW)
              - generic [ref=e53]: Power Output
            - generic [ref=e54]:
              - generic [ref=e55]:
                - term [ref=e56]: Torque
                - definition [ref=e57]: 400.0 lb-ft / 542.3 N·m
              - generic [ref=e58]:
                - term [ref=e59]: RPM
                - definition [ref=e60]: 6,000
            - paragraph [ref=e61]: 400.0 lb-ft @ 6,000 RPM = 457.0 hp (340.8 kW). At 5,252 RPM, torque (lb-ft) equals horsepower.
      - region [ref=e62]:
        - heading "Formula & Method" [level=2] [ref=e63]
        - generic [ref=e64]:
          - heading "Formula" [level=3] [ref=e65]
          - code [ref=e68]: hp = torque_lbft × RPM / 5252.113 kW = torque_Nm × RPM / 9549.297 hp = kW / 0.745699872
          - generic [ref=e69]:
            - generic [ref=e70]:
              - term [ref=e71]:
                - code [ref=e72]: torque_lbft
              - definition [ref=e73]: Torque in pound-feet(lb-ft)
            - generic [ref=e74]:
              - term [ref=e75]:
                - code [ref=e76]: torque_Nm
              - definition [ref=e77]: Torque in Newton-meters(N·m)
            - generic [ref=e78]:
              - term [ref=e79]:
                - code [ref=e80]: RPM
              - definition [ref=e81]: Engine speed(rev/min)
            - generic [ref=e82]:
              - term [ref=e83]:
                - code [ref=e84]: "5252.113"
              - definition [ref=e85]: Constant (33,000 / 2π)
            - generic [ref=e86]:
              - term [ref=e87]:
                - code [ref=e88]: "9549.297"
              - definition [ref=e89]: Constant (60,000 / 2π)
          - list [ref=e90]:
            - listitem [ref=e91]: At 5,252 RPM, torque (lb-ft) numerically equals horsepower.
            - listitem [ref=e92]: Calculated shaft power from torque/RPM ≠ advertised engine power unless measured at same point.
            - listitem [ref=e93]: 1 mechanical hp = 0.745699872 kW exactly.
            - listitem [ref=e94]: 1 lb-ft = 1.35581795 N·m.
      - region [ref=e95]:
        - heading "Worked Example" [level=2] [ref=e96]
        - generic [ref=e97]:
          - paragraph [ref=e98]:
            - strong [ref=e99]: "Example:"
            - text: 400 lb-ft @ 6,000 RPM
          - list [ref=e100]:
            - listitem [ref=e101]:
              - text: hp = 400 × 6000 / 5252.113 =
              - strong [ref=e102]: 456.9 hp
            - listitem [ref=e103]:
              - text: kW = 456.9 × 0.7457 =
              - strong [ref=e104]: 340.7 kW
          - paragraph [ref=e105]:
            - strong [ref=e106]: "5252 Crossover Example:"
            - text: 525.2 lb-ft @ 5,252 RPM
          - list [ref=e107]:
            - listitem [ref=e108]:
              - text: hp = 525.2 × 5252 / 5252.113 =
              - strong [ref=e109]: 525.2 hp
            - listitem [ref=e110]: Torque (lb-ft) = Horsepower at exactly 5,252 RPM
      - region [ref=e111]:
        - heading "Limitations" [level=2] [ref=e112]
        - generic [ref=e113]:
          - paragraph [ref=e114]:
            - strong [ref=e115]: "Limitations:"
          - list [ref=e116]:
            - listitem [ref=e117]: Calculated power assumes torque value at the same measurement point as RPM
            - listitem [ref=e118]: Advertised engine power often differs from calculated shaft power
            - listitem [ref=e119]: Does not account for drivetrain losses (wheel hp vs crank hp)
            - listitem [ref=e120]: Peak torque and peak power occur at different RPMs
            - listitem [ref=e121]: Measurement standard (SAE vs DIN vs JIS) affects absolute values
      - region [ref=e122]:
        - heading "Related Tools" [level=2] [ref=e123]
        - navigation "Related calculators and guides" [ref=e124]:
          - list [ref=e125]:
            - listitem [ref=e126]:
              - link "Power-to-Weight Ratio hp/lb, hp/ton, kW/kg, W/kg" [ref=e127] [cursor=pointer]:
                - /url: /calculators/power-to-weight/
                - generic [ref=e128]: Power-to-Weight Ratio
                - generic [ref=e129]: hp/lb, hp/ton, kW/kg, W/kg
            - listitem [ref=e130]:
              - link "Quarter Mile Estimator Empirical ET and trap speed" [ref=e131] [cursor=pointer]:
                - /url: /calculators/quarter-mile/
                - generic [ref=e132]: Quarter Mile Estimator
                - generic [ref=e133]: Empirical ET and trap speed
            - listitem [ref=e134]:
              - link "Horsepower vs Torque The relationship and 5252 crossover" [ref=e135] [cursor=pointer]:
                - /url: /guides/horsepower-vs-torque/
                - generic [ref=e136]: Horsepower vs Torque
                - generic [ref=e137]: The relationship and 5252 crossover
  - contentinfo [ref=e138]:
    - generic [ref=e139]:
      - paragraph [ref=e140]: © 2026 Automotive Calculators. Built for enthusiasts, by enthusiasts.
      - navigation "Footer navigation" [ref=e141]:
        - link "Calculators" [ref=e142] [cursor=pointer]:
          - /url: /calculators/
        - text: ·
        - link "Guides" [ref=e143] [cursor=pointer]:
          - /url: /guides/
        - text: ·
        - link "Privacy" [ref=e144] [cursor=pointer]:
          - /url: "#"
        - text: ·
        - link "About" [ref=e145] [cursor=pointer]:
          - /url: "#"
  - generic [ref=e148]:
    - button [ref=e149]
    - button [ref=e155]
    - button [ref=e159]
    - button [ref=e167]
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