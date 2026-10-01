# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: playwright-edge-cases.test.ts >> Edge case handling >> Power-to-Weight - non-numeric input
- Location: tests\playwright-edge-cases.test.ts:73:5

# Error details

```
Error: locator.fill: Error: Cannot type text into input[type=number]
Call log:
  - waiting for locator('input[type="number"]').first()
    - locator resolved to <input min="1" step="1" max="5000" value="300" required="" name="power" type="number" id="power-field" class="field-input" aria-invalid="false" placeholder="e.g., 300" data-astro-cid-rrvtat5r=""/>
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
        - heading "Power-to-Weight Ratio Calculator" [level=1] [ref=e29]
        - paragraph [ref=e30]: Calculate power-to-weight ratio in multiple units. Enter power (hp or kW) and weight (lb or kg) — get hp/lb, hp/ton, kW/kg, W/kg, and inverse ratios.
      - generic [ref=e31]:
        - region [ref=e32]:
          - heading "Calculator Inputs" [level=2] [ref=e33]
          - generic [ref=e34]:
            - group "Power" [ref=e35]:
              - generic [ref=e37]:
                - generic [ref=e38]:
                  - generic [ref=e39]: Power*
                  - spinbutton "Power" [ref=e40]: "300"
                - combobox [ref=e41] [cursor=pointer]:
                  - option "hp" [selected]
                  - option "kW"
            - group "Weight" [ref=e42]:
              - generic [ref=e44]:
                - generic [ref=e45]:
                  - generic [ref=e46]: Weight*
                  - spinbutton "Weight" [ref=e47]: "3000"
                - combobox [ref=e48] [cursor=pointer]:
                  - option "lb" [selected]
                  - option "kg"
            - generic [ref=e49]:
              - button "Calculate" [ref=e50] [cursor=pointer]
              - link "Reset" [ref=e51] [cursor=pointer]:
                - /url: /calculators/power-to-weight/
        - complementary [ref=e52]:
          - heading "Results" [level=2] [ref=e53]
          - status [ref=e54]:
            - generic [ref=e55]:
              - generic [ref=e56]: 0.1000 hp/lb
              - generic [ref=e57]: Power-to-Weight
            - generic [ref=e58]:
              - generic [ref=e59]:
                - term [ref=e60]: hp per US Ton
                - definition [ref=e61]: "200"
              - generic [ref=e62]:
                - term [ref=e63]: kW/kg
                - definition [ref=e64]: "0.164"
              - generic [ref=e65]:
                - term [ref=e66]: W/kg
                - definition [ref=e67]: "164"
              - generic [ref=e68]:
                - term [ref=e69]: lb/hp
                - definition [ref=e70]: "10.00"
              - generic [ref=e71]:
                - term [ref=e72]: kg/kW
                - definition [ref=e73]: "6.08"
            - paragraph [ref=e74]: 300 hp / 3000 lb = 0.1000 hp/lb (200 hp/ton, 0.164 kW/kg, 164 W/kg).
      - region [ref=e75]:
        - heading "Formula & Method" [level=2] [ref=e76]
        - generic [ref=e77]:
          - heading "Formula" [level=3] [ref=e78]
          - code [ref=e81]: hp/lb = power_hp / weight_lb hp/ton = power_hp / (weight_lb / 2000) kW/kg = power_kW / weight_kg W/kg = kW/kg × 1000 lb/hp = weight_lb / power_hp kg/kW = weight_kg / power_kW
          - generic [ref=e82]:
            - generic [ref=e83]:
              - term [ref=e84]:
                - code [ref=e85]: power_hp
              - definition [ref=e86]: Power in horsepower(hp)
            - generic [ref=e87]:
              - term [ref=e88]:
                - code [ref=e89]: power_kW
              - definition [ref=e90]: Power in kilowatts(kW)
            - generic [ref=e91]:
              - term [ref=e92]:
                - code [ref=e93]: weight_lb
              - definition [ref=e94]: Weight in pounds(lb)
            - generic [ref=e95]:
              - term [ref=e96]:
                - code [ref=e97]: weight_kg
              - definition [ref=e98]: Weight in kilograms(kg)
            - generic [ref=e99]:
              - term [ref=e100]:
                - code [ref=e101]: 1 hp
              - definition [ref=e102]: Mechanical horsepower(= 0.745699872 kW)
            - generic [ref=e103]:
              - term [ref=e104]:
                - code [ref=e105]: 1 lb
              - definition [ref=e106]: Pound(= 0.45359237 kg)
          - list [ref=e107]:
            - listitem [ref=e108]: 1 mechanical hp = 0.745699872 kW exactly.
            - listitem [ref=e109]: 1 lb = 0.45359237 kg exactly.
            - listitem [ref=e110]: US ton = 2,000 lb (not metric tonne).
            - listitem [ref=e111]: Power and weight must both be > 0.
      - region [ref=e112]:
        - heading "Worked Example" [level=2] [ref=e113]
        - generic [ref=e114]:
          - paragraph [ref=e115]:
            - strong [ref=e116]: "Example:"
            - text: 300 hp, 3,000 lb
          - list [ref=e117]:
            - listitem [ref=e118]:
              - text: hp/lb = 300 / 3000 =
              - strong [ref=e119]: "0.1000"
            - listitem [ref=e120]:
              - text: hp/ton = 300 / (3000/2000) =
              - strong [ref=e121]: "200"
            - listitem [ref=e122]: kW = 300 × 0.7457 = 223.7; kg = 3000 × 0.4536 = 1360.8
            - listitem [ref=e123]:
              - text: kW/kg = 223.7 / 1360.8 =
              - strong [ref=e124]: "0.164"
            - listitem [ref=e125]:
              - text: W/kg = 0.164 × 1000 =
              - strong [ref=e126]: "164"
            - listitem [ref=e127]:
              - text: lb/hp = 3000 / 300 =
              - strong [ref=e128]: "10.00"
          - paragraph [ref=e129]:
            - strong [ref=e130]: "Mixed units:"
            - text: 300 hp, 1,361 kg
          - list [ref=e131]:
            - listitem [ref=e132]:
              - text: hp/lb = 300 / 3000 =
              - strong [ref=e133]: "0.1000"
            - listitem [ref=e134]:
              - text: kg/kW = 1361 / 223.7 =
              - strong [ref=e135]: "6.08"
      - region [ref=e136]:
        - heading "Limitations" [level=2] [ref=e137]
        - generic [ref=e138]:
          - paragraph [ref=e139]:
            - strong [ref=e140]: "Limitations:"
          - list [ref=e141]:
            - listitem [ref=e142]: Power-to-weight is a single metric — does not capture torque curve, gearing, traction, aero
            - listitem [ref=e143]: Crank hp vs wheel hp changes ratio by ~15–20%
            - listitem [ref=e144]: Weight should include driver, fluids, cargo for accurate vehicle ratio
            - listitem [ref=e145]: Does not indicate where in RPM range power is made
      - region [ref=e146]:
        - heading "Related Tools" [level=2] [ref=e147]
        - navigation "Related calculators and guides" [ref=e148]:
          - list [ref=e149]:
            - listitem [ref=e150]:
              - link "Horsepower Calculator Torque × RPM → hp/kW" [ref=e151] [cursor=pointer]:
                - /url: /calculators/horsepower/
                - generic [ref=e152]: Horsepower Calculator
                - generic [ref=e153]: Torque × RPM → hp/kW
            - listitem [ref=e154]:
              - link "Quarter Mile Estimator Empirical ET and trap speed" [ref=e155] [cursor=pointer]:
                - /url: /calculators/quarter-mile/
                - generic [ref=e156]: Quarter Mile Estimator
                - generic [ref=e157]: Empirical ET and trap speed
            - listitem [ref=e158]:
              - link "Horsepower vs Torque The relationship and 5252 crossover" [ref=e159] [cursor=pointer]:
                - /url: /guides/horsepower-vs-torque/
                - generic [ref=e160]: Horsepower vs Torque
                - generic [ref=e161]: The relationship and 5252 crossover
  - contentinfo [ref=e162]:
    - generic [ref=e163]:
      - paragraph [ref=e164]: © 2026 Automotive Calculators. Built for enthusiasts, by enthusiasts.
      - navigation "Footer navigation" [ref=e165]:
        - link "Calculators" [ref=e166] [cursor=pointer]:
          - /url: /calculators/
        - text: ·
        - link "Guides" [ref=e167] [cursor=pointer]:
          - /url: /guides/
        - text: ·
        - link "Privacy" [ref=e168] [cursor=pointer]:
          - /url: "#"
        - text: ·
        - link "About" [ref=e169] [cursor=pointer]:
          - /url: "#"
  - generic [ref=e172]:
    - button [ref=e173]
    - button [ref=e179]
    - button [ref=e183]
    - button [ref=e191]
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