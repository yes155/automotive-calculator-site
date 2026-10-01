# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: playwright-edge-cases.test.ts >> Edge case handling >> Quarter Mile - non-numeric input
- Location: tests\playwright-edge-cases.test.ts:73:5

# Error details

```
Error: locator.fill: Error: Cannot type text into input[type=number]
Call log:
  - waiting for locator('input[type="number"]').first()
    - locator resolved to <input step="10" min="1000" max="10000" required="" value="3500" type="number" name="weight" id="weight-field" class="field-input" aria-invalid="false" placeholder="e.g., 3500" data-astro-cid-rrvtat5r=""/>
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
        - heading "Quarter Mile Calculator" [level=1] [ref=e29]
        - paragraph [ref=e30]: Estimate quarter-mile ET and trap speed from vehicle weight and horsepower. Based on empirical constants (5.825 and 234).
      - generic [ref=e31]:
        - region [ref=e32]:
          - heading "Calculator Inputs" [level=2] [ref=e33]
          - generic [ref=e34]:
            - group "Vehicle Specs" [ref=e35]:
              - generic [ref=e37]:
                - generic [ref=e38]:
                  - generic [ref=e39]: Vehicle Weight*
                  - spinbutton "Vehicle Weight" [ref=e40]: "3500"
                - combobox [ref=e41] [cursor=pointer]:
                  - option "lb" [selected]
                  - option "kg"
              - generic [ref=e42]:
                - generic [ref=e43]: Horsepower*
                - spinbutton "Horsepower" [ref=e44]: "400"
              - combobox [ref=e45] [cursor=pointer]:
                - option "Crank HP" [selected]
                - option "Wheel HP"
            - generic [ref=e46]:
              - button "Calculate" [ref=e47] [cursor=pointer]
              - link "Reset" [ref=e48] [cursor=pointer]:
                - /url: /calculators/quarter-mile/
        - complementary [ref=e49]:
          - heading "Results" [level=2] [ref=e50]
          - status [ref=e51]:
            - generic [ref=e52]:
              - generic [ref=e53]: 12.00s @ 113.6 MPH
              - generic [ref=e54]: Estimated Quarter Mile
            - generic [ref=e55]:
              - generic [ref=e56]:
                - term [ref=e57]: Vehicle Weight
                - definition [ref=e58]: 3,500 lb
              - generic [ref=e59]:
                - term [ref=e60]: Horsepower
                - definition [ref=e61]: 400 (crank)
              - generic [ref=e62]:
                - term [ref=e63]: Power-to-Weight
                - definition [ref=e64]: 0.1143 hp/lb
              - generic [ref=e65]:
                - term [ref=e66]: Empirical Constants
                - definition [ref=e67]: "ET: 5.825, Trap: 234"
            - paragraph [ref=e68]: "Estimated: 12.00s @ 113.6 MPH (3,500 lb, 400 hp (crank hp)). Power-to-weight: 0.1143 hp/lb. ⚠ This is an empirical estimate, not a prediction. Actual results depend on traction, gearing, launch, aero, drivetrain, weather, track, and driver."
      - region [ref=e69]:
        - heading "Formula & Method" [level=2] [ref=e70]
        - generic [ref=e71]:
          - heading "Empirical Formula" [level=3] [ref=e72]
          - code [ref=e75]: ET (seconds) = 5.825 × (weight_lb / horsepower)^(1/3) Trap Speed (MPH) = 234 × (horsepower / weight_lb)^(1/3) Power-to-Weight = horsepower / weight_lb
          - generic [ref=e76]:
            - generic [ref=e77]:
              - term [ref=e78]:
                - code [ref=e79]: weight_lb
              - definition [ref=e80]: Vehicle weight(lb)
            - generic [ref=e81]:
              - term [ref=e82]:
                - code [ref=e83]: horsepower
              - definition [ref=e84]: Engine power(hp)
            - generic [ref=e85]:
              - term [ref=e86]:
                - code [ref=e87]: "5.825"
              - definition [ref=e88]: ET constant (empirical)
            - generic [ref=e89]:
              - term [ref=e90]:
                - code [ref=e91]: "234"
              - definition [ref=e92]: Trap speed constant (empirical)
          - list [ref=e93]:
            - listitem [ref=e94]: Constants 5.825 and 234 are empirical — not derived from physical law.
            - listitem [ref=e95]: Model assumes typical street tire traction, manual/auto transmission, average launch.
            - listitem [ref=e96]: "Original source: Patrick Hale / Racing Systems Analysis (1980s drag racing data)."
            - listitem [ref=e97]: Results are estimates for comparison only — not predictions of actual runs.
      - region [ref=e98]:
        - heading "Worked Example" [level=2] [ref=e99]
        - generic [ref=e100]:
          - paragraph [ref=e101]:
            - strong [ref=e102]: "Example:"
            - text: 3,500 lb, 400 hp
          - list [ref=e103]:
            - listitem [ref=e104]: "Weight/HP ratio: 3500 / 400 = 8.75"
            - listitem [ref=e105]:
              - text: ET = 5.825 × 8.75^(1/3) = 5.825 × 2.06 =
              - strong [ref=e106]: 12.00s
            - listitem [ref=e107]:
              - text: Trap = 234 × (1/8.75)^(1/3) = 234 × 0.486 =
              - strong [ref=e108]: 113.6 MPH
            - listitem [ref=e109]:
              - text: "Power-to-weight: 400 / 3500 ="
              - strong [ref=e110]: 0.114 hp/lb
          - paragraph [ref=e111]:
            - strong [ref=e112]: "High power example:"
            - text: 2,500 lb, 600 hp
          - list [ref=e113]:
            - listitem [ref=e114]:
              - text: ET = 5.825 × (2500/600)^(1/3) =
              - strong [ref=e115]: 9.39s
            - listitem [ref=e116]:
              - text: Trap = 234 × (600/2500)^(1/3) =
              - strong [ref=e117]: 145.4 MPH
      - region [ref=e118]:
        - heading "Limitations" [level=2] [ref=e119]
        - generic [ref=e120]:
          - paragraph [ref=e121]:
            - strong [ref=e122]: "Critical limitations — this is an empirical estimate, NOT a prediction:"
          - list [ref=e123]:
            - listitem [ref=e124]:
              - strong [ref=e125]: "Traction:"
              - text: Wheel spin, surface prep, tire compound dramatically affect ET
            - listitem [ref=e126]:
              - strong [ref=e127]: "Gearing:"
              - text: Transmission ratios, final drive, shift points change acceleration
            - listitem [ref=e128]:
              - strong [ref=e129]: "Launch:"
              - text: Driver skill, launch RPM, 2-step, brake boost vary results
            - listitem [ref=e130]:
              - strong [ref=e131]: "Aero:"
              - text: Drag coefficient, frontal area affect trap speed at high HP
            - listitem [ref=e132]:
              - strong [ref=e133]: "Drivetrain:"
              - text: Manual vs auto, torque converter, diff type, driveline loss
            - listitem [ref=e134]:
              - strong [ref=e135]: "Weather:"
              - text: Temperature, humidity, altitude, DA (density altitude)
            - listitem [ref=e136]:
              - strong [ref=e137]: "Track:"
              - text: Surface grip, elevation, wind, prep quality
            - listitem [ref=e138]:
              - strong [ref=e139]: "Power type:"
              - text: Crank HP vs Wheel HP changes estimate by 15–20%
          - paragraph [ref=e140]: Always verify with actual track testing. Use for relative comparison only.
      - region [ref=e141]:
        - heading "Related Tools" [level=2] [ref=e142]
        - navigation "Related calculators and guides" [ref=e143]:
          - list [ref=e144]:
            - listitem [ref=e145]:
              - link "Power-to-Weight Ratio hp/lb, hp/ton, kW/kg, W/kg" [ref=e146] [cursor=pointer]:
                - /url: /calculators/power-to-weight/
                - generic [ref=e147]: Power-to-Weight Ratio
                - generic [ref=e148]: hp/lb, hp/ton, kW/kg, W/kg
            - listitem [ref=e149]:
              - link "Horsepower Calculator Torque × RPM → hp/kW" [ref=e150] [cursor=pointer]:
                - /url: /calculators/horsepower/
                - generic [ref=e151]: Horsepower Calculator
                - generic [ref=e152]: Torque × RPM → hp/kW
            - listitem [ref=e153]:
              - link "Methodology Source Patrick Hale / Racing Systems Analysis constants" [ref=e154] [cursor=pointer]:
                - /url: "#"
                - generic [ref=e155]: Methodology Source
                - generic [ref=e156]: Patrick Hale / Racing Systems Analysis constants
  - contentinfo [ref=e157]:
    - generic [ref=e158]:
      - paragraph [ref=e159]: © 2026 Automotive Calculators. Built for enthusiasts, by enthusiasts.
      - navigation "Footer navigation" [ref=e160]:
        - link "Calculators" [ref=e161] [cursor=pointer]:
          - /url: /calculators/
        - text: ·
        - link "Guides" [ref=e162] [cursor=pointer]:
          - /url: /guides/
        - text: ·
        - link "Privacy" [ref=e163] [cursor=pointer]:
          - /url: "#"
        - text: ·
        - link "About" [ref=e164] [cursor=pointer]:
          - /url: "#"
  - generic [ref=e167]:
    - button [ref=e168]
    - button [ref=e174]
    - button [ref=e178]
    - button [ref=e186]
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