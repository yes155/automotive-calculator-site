# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: playwright-edge-cases.test.ts >> Edge case handling >> Engine Displacement - non-numeric input
- Location: tests\playwright-edge-cases.test.ts:73:5

# Error details

```
Error: locator.fill: Error: Cannot type text into input[type=number]
Call log:
  - waiting for locator('input[type="number"]').first()
    - locator resolved to <input min="50" max="200" value="86" step="0.1" name="bore" required="" type="number" id="bore-field" class="field-input" aria-invalid="false" placeholder="e.g., 86" data-astro-cid-rrvtat5r=""/>
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
        - heading "Engine Displacement Calculator" [level=1] [ref=e29]
        - paragraph [ref=e30]: Calculate displacement from bore, stroke, and cylinder count. Results in cc, liters, cubic inches, per-cylinder volume, and bore/stroke ratio with geometry classification.
      - generic [ref=e31]:
        - region [ref=e32]:
          - heading "Calculator Inputs" [level=2] [ref=e33]
          - generic [ref=e34]:
            - group "Engine Geometry" [ref=e35]:
              - generic [ref=e37]:
                - generic [ref=e38]: Boremm*
                - spinbutton "Boremm" [ref=e39]: "86"
              - generic [ref=e40]:
                - generic [ref=e41]: Strokemm*
                - spinbutton "Strokemm" [ref=e42]: "86"
              - generic [ref=e43]:
                - generic [ref=e44]: Cylinders*
                - spinbutton "Cylinders" [ref=e45]: "4"
            - generic [ref=e46]:
              - generic [ref=e47] [cursor=pointer]:
                - radio "mm" [checked] [ref=e48]
                - generic [ref=e49]: mm
              - generic [ref=e50] [cursor=pointer]:
                - radio "inches" [ref=e51]
                - generic [ref=e52]: inches
              - button "Calculate" [ref=e53] [cursor=pointer]
              - link "Reset" [ref=e54] [cursor=pointer]:
                - /url: /calculators/engine-displacement/
        - complementary [ref=e55]:
          - heading "Results" [level=2] [ref=e56]
          - status [ref=e57]:
            - generic [ref=e58]:
              - generic [ref=e59]: 1998 cc (2.00 L, 121.9 cu in)
              - generic [ref=e60]: Total Displacement
            - generic [ref=e61]:
              - generic [ref=e62]:
                - term [ref=e63]: Per Cylinder
                - definition [ref=e64]: 499.6 cc
              - generic [ref=e65]:
                - term [ref=e66]: Bore/Stroke Ratio
                - definition [ref=e67]: "1.00"
              - generic [ref=e68]:
                - term [ref=e69]: Geometry
                - definition [ref=e70]: Square (bore ≈ stroke) — balanced characteristics
            - paragraph [ref=e71]: "Total displacement: 1998 cc (2.00 L, 121.9 cu in). Per cylinder: 499.6 cc. Bore/stroke ratio: 1.00 — Square (bore ≈ stroke) — balanced characteristics. Note: Bore/stroke ratio is descriptive geometry, not a performance predictor."
      - region [ref=e72]:
        - heading "Formula & Method" [level=2] [ref=e73]
        - generic [ref=e74]:
          - heading "Formula" [level=3] [ref=e75]
          - code [ref=e78]: V_cylinder = π/4 × bore² × stroke / 1000 Total = V_cylinder × cylinders Bore/Stroke Ratio = bore / stroke
          - generic [ref=e79]:
            - generic [ref=e80]:
              - term [ref=e81]:
                - code [ref=e82]: bore
              - definition [ref=e83]: Cylinder bore(mm or in)
            - generic [ref=e84]:
              - term [ref=e85]:
                - code [ref=e86]: stroke
              - definition [ref=e87]: Piston stroke(mm or in)
            - generic [ref=e88]:
              - term [ref=e89]:
                - code [ref=e90]: cylinders
              - definition [ref=e91]: Number of cylinders
            - generic [ref=e92]:
              - term [ref=e93]:
                - code [ref=e94]: V_cylinder
              - definition [ref=e95]: Displacement per cylinder(cc)
          - list [ref=e96]:
            - listitem [ref=e97]: Bore/stroke ratio is descriptive geometry only — not a performance predictor.
            - listitem [ref=e98]: "Oversquare (>1.05): bore > stroke, favors high-RPM power."
            - listitem [ref=e99]: "Square (~1.0): bore ≈ stroke, balanced characteristics."
            - listitem [ref=e100]: "Undersquare (<0.95): stroke > bore, favors low-end torque."
            - listitem [ref=e101]: Also handles "bore stroke calculator" search intent.
      - region [ref=e102]:
        - heading "Worked Example" [level=2] [ref=e103]
        - generic [ref=e104]:
          - paragraph [ref=e105]:
            - strong [ref=e106]: "Example:"
            - text: 86 mm bore, 86 mm stroke, 4 cylinders.
          - list [ref=e107]:
            - listitem [ref=e108]:
              - text: "Per cylinder: π/4 × 86² × 86 / 1000 ="
              - strong [ref=e109]: 499.6 cc
            - listitem [ref=e110]:
              - text: "Total: 499.6 × 4 ="
              - strong [ref=e111]: 1,998 cc (2.00 L, 121.9 cu in)
            - listitem [ref=e112]:
              - text: "Bore/stroke: 86/86 ="
              - strong [ref=e113]: 1.00 (Square)
          - paragraph [ref=e114]:
            - strong [ref=e115]: "Example 2:"
            - text: 4.0″ bore, 3.0″ stroke, 8 cylinders (classic V8).
          - list [ref=e116]:
            - listitem [ref=e117]:
              - text: "Per cylinder: π/4 × 101.6² × 76.2 / 1000 ="
              - strong [ref=e118]: 617.8 cc
            - listitem [ref=e119]:
              - text: "Total: 617.8 × 8 ="
              - strong [ref=e120]: 4,942 cc (4.94 L, 301.6 cu in)
            - listitem [ref=e121]:
              - text: "Bore/stroke: 101.6/76.2 ="
              - strong [ref=e122]: 1.33 (Oversquare)
      - region [ref=e123]:
        - heading "Limitations" [level=2] [ref=e124]
        - generic [ref=e125]:
          - paragraph [ref=e126]:
            - strong [ref=e127]: "Limitations:"
          - list [ref=e128]:
            - listitem [ref=e129]: Bore/stroke ratio describes geometry only — does not determine power/torque characteristics alone
            - listitem [ref=e130]: Assumes perfect cylindrical bores (no taper, out-of-round)
            - listitem [ref=e131]: Does not account for combustion chamber volume (see Compression Ratio Calculator)
            - listitem [ref=e132]: Nominal dimensions may differ from actual machined dimensions
      - region [ref=e133]:
        - heading "Related Tools" [level=2] [ref=e134]
        - navigation "Related calculators and guides" [ref=e135]:
          - list [ref=e136]:
            - listitem [ref=e137]:
              - link "Compression Ratio Calculator Static CR with component breakdown" [ref=e138] [cursor=pointer]:
                - /url: /calculators/compression-ratio/
                - generic [ref=e139]: Compression Ratio Calculator
                - generic [ref=e140]: Static CR with component breakdown
            - listitem [ref=e141]:
              - link "Bore vs Stroke Oversquare, square, undersquare explained" [ref=e142] [cursor=pointer]:
                - /url: /guides/bore-vs-stroke/
                - generic [ref=e143]: Bore vs Stroke
                - generic [ref=e144]: Oversquare, square, undersquare explained
            - listitem [ref=e145]:
              - link "Engine Hub All engine geometry tools" [ref=e146] [cursor=pointer]:
                - /url: /engine/
                - generic [ref=e147]: Engine Hub
                - generic [ref=e148]: All engine geometry tools
  - contentinfo [ref=e149]:
    - generic [ref=e150]:
      - paragraph [ref=e151]: © 2026 Automotive Calculators. Built for enthusiasts, by enthusiasts.
      - navigation "Footer navigation" [ref=e152]:
        - link "Calculators" [ref=e153] [cursor=pointer]:
          - /url: /calculators/
        - text: ·
        - link "Guides" [ref=e154] [cursor=pointer]:
          - /url: /guides/
        - text: ·
        - link "Privacy" [ref=e155] [cursor=pointer]:
          - /url: "#"
        - text: ·
        - link "About" [ref=e156] [cursor=pointer]:
          - /url: "#"
  - generic [ref=e159]:
    - button [ref=e160]
    - button [ref=e166]
    - button [ref=e170]
    - button [ref=e178]
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