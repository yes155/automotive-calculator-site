# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: playwright-edge-cases.test.ts >> Edge case handling >> Compression Ratio - non-numeric input
- Location: tests\playwright-edge-cases.test.ts:73:5

# Error details

```
Error: locator.fill: Error: Cannot type text into input[type=number]
Call log:
  - waiting for locator('input[type="number"]').first()
    - locator resolved to <input min="50" max="150" value="86" step="0.1" name="bore" required="" type="number" id="bore-field" class="field-input" aria-invalid="false" placeholder="e.g., 86" data-astro-cid-rrvtat5r=""/>
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
        - heading "Compression Ratio Calculator" [level=1] [ref=e29]
        - paragraph [ref=e30]: Calculate static compression ratio with component volume breakdown. Enter bore, stroke, combustion chamber volume, piston dish/dome volumes, head gasket specs, and deck clearance.
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
            - group "Volumes (cc)" [ref=e43]:
              - generic [ref=e45]:
                - generic [ref=e46]: Combustion Chamber*
                - spinbutton "Combustion Chamber" [ref=e47]: "45"
              - generic [ref=e48]:
                - generic [ref=e49]: Piston Dish (positive)*
                - spinbutton "Piston Dish (positive)" [ref=e50]: "5"
              - generic [ref=e51]:
                - generic [ref=e52]: Piston Dome (positive)*
                - spinbutton "Piston Dome (positive)" [ref=e53]: "0"
            - group "Head Gasket & Deck" [ref=e54]:
              - generic [ref=e56]:
                - generic [ref=e57]: Gasket Boremm*
                - spinbutton "Gasket Boremm" [ref=e58]: "87"
              - generic [ref=e59]:
                - generic [ref=e60]: Gasket Thicknessmm*
                - spinbutton "Gasket Thicknessmm" [ref=e61]: "1.2"
              - generic [ref=e62]:
                - generic [ref=e63]: Deck Clearancemm*
                - spinbutton "Deck Clearancemm" [ref=e64]: "0.5"
            - generic [ref=e65]:
              - generic [ref=e66] [cursor=pointer]:
                - radio "mm" [checked] [ref=e67]
                - generic [ref=e68]: mm
              - generic [ref=e69] [cursor=pointer]:
                - radio "inches" [ref=e70]
                - generic [ref=e71]: inches
              - button "Calculate" [ref=e72] [cursor=pointer]
              - link "Reset" [ref=e73] [cursor=pointer]:
                - /url: /calculators/compression-ratio/
        - complementary [ref=e74]:
          - heading "Results" [level=2] [ref=e75]
          - status [ref=e76]:
            - generic [ref=e77]:
              - generic [ref=e78]: 9.32:1
              - generic [ref=e79]: Static Compression Ratio
            - generic [ref=e80]:
              - generic [ref=e81]:
                - term [ref=e82]: Swept Volume / Cylinder
                - definition [ref=e83]: 499.6 cc
              - generic [ref=e84]:
                - term [ref=e85]: Total Clearance Volume
                - definition [ref=e86]: 60.0 cc
              - generic [ref=e87]:
                - term [ref=e88]: Chamber Volume
                - definition [ref=e89]: 45.0 cc
              - generic [ref=e90]:
                - term [ref=e91]: Gasket Volume
                - definition [ref=e92]: 7.1 cc
              - generic [ref=e93]:
                - term [ref=e94]: Deck Volume
                - definition [ref=e95]: 2.9 cc
              - generic [ref=e96]:
                - term [ref=e97]: Piston Dish
                - definition [ref=e98]: 5.0 cc
              - generic [ref=e99]:
                - term [ref=e100]: Piston Dome
                - definition [ref=e101]: 0.0 cc
            - paragraph [ref=e102]: "Static compression ratio: 9.32:1. Swept volume per cylinder: 499.6 cc. Total clearance volume: 60.0 cc. Note: This is static compression ratio, not dynamic compression ratio."
      - region [ref=e103]:
        - heading "Formula & Method" [level=2] [ref=e104]
        - generic [ref=e105]:
          - heading "Formula" [level=3] [ref=e106]
          - code [ref=e109]: Vs = π/4 × bore² × stroke / 1000 Vg = π/4 × gasket_bore² × gasket_thickness / 1000 Vd = π/4 × bore² × deck_clearance / 1000 Vc = chamber + Vg + Vd + dish - dome CR = (Vs + Vc) / Vc
          - generic [ref=e110]:
            - generic [ref=e111]:
              - term [ref=e112]:
                - code [ref=e113]: Vs
              - definition [ref=e114]: Swept volume per cylinder(cc)
            - generic [ref=e115]:
              - term [ref=e116]:
                - code [ref=e117]: Vg
              - definition [ref=e118]: Gasket volume(cc)
            - generic [ref=e119]:
              - term [ref=e120]:
                - code [ref=e121]: Vd
              - definition [ref=e122]: Deck clearance volume(cc)
            - generic [ref=e123]:
              - term [ref=e124]:
                - code [ref=e125]: Vc
              - definition [ref=e126]: Total clearance volume(cc)
            - generic [ref=e127]:
              - term [ref=e128]:
                - code [ref=e129]: CR
              - definition [ref=e130]: Compression ratio(ratio)
          - list [ref=e131]:
            - listitem [ref=e132]: All linear dimensions converted to mm before volume calculation.
            - listitem [ref=e133]: "Volumes in cc: 1 cm³ = 1000 mm³."
            - listitem [ref=e134]: Piston dome volume is subtracted (reduces clearance volume).
            - listitem [ref=e135]: Static CR ≠ Dynamic CR. Does not determine octane requirement alone.
      - region [ref=e136]:
        - heading "Worked Example" [level=2] [ref=e137]
        - generic [ref=e138]:
          - paragraph [ref=e139]:
            - strong [ref=e140]: "Example:"
            - text: 86 mm bore, 86 mm stroke, 45 cc chamber, 5 cc dish, 0 dome, 87 mm gasket bore, 1.2 mm gasket, 0.5 mm deck.
          - list [ref=e141]:
            - listitem [ref=e142]:
              - text: Vs = π/4 × 86² × 86 / 1000 =
              - strong [ref=e143]: 499.6 cc
            - listitem [ref=e144]:
              - text: Vg = π/4 × 87² × 1.2 / 1000 =
              - strong [ref=e145]: 7.1 cc
            - listitem [ref=e146]:
              - text: Vd = π/4 × 86² × 0.5 / 1000 =
              - strong [ref=e147]: 2.9 cc
            - listitem [ref=e148]:
              - text: Vc = 45 + 7.1 + 2.9 + 5 - 0 =
              - strong [ref=e149]: 60 cc
            - listitem [ref=e150]:
              - text: CR = (499.6 + 60) / 60 =
              - strong [ref=e151]: 9.32:1
      - region [ref=e152]:
        - heading "Limitations" [level=2] [ref=e153]
        - generic [ref=e154]:
          - paragraph [ref=e155]:
            - strong [ref=e156]: "Important limitation:"
            - text: This calculates
            - emphasis [ref=e157]: static
            - text: compression ratio only.
          - list [ref=e158]:
            - listitem [ref=e159]: Does not account for intake valve closing timing (dynamic CR)
            - listitem [ref=e160]: Does not determine octane requirement by itself
            - listitem [ref=e161]: Assumes perfect sealing, no blow-by
            - listitem [ref=e162]: Real-world CR affected by carbon deposits, head gasket crush, block decking
      - region [ref=e163]:
        - heading "Related Tools" [level=2] [ref=e164]
        - navigation "Related calculators and guides" [ref=e165]:
          - list [ref=e166]:
            - listitem [ref=e167]:
              - link "Engine Displacement Calculator Calculate displacement from bore/stroke/cylinders" [ref=e168] [cursor=pointer]:
                - /url: /calculators/engine-displacement/
                - generic [ref=e169]: Engine Displacement Calculator
                - generic [ref=e170]: Calculate displacement from bore/stroke/cylinders
            - listitem [ref=e171]:
              - link "Compression Ratio Explained Static vs dynamic CR, octane considerations" [ref=e172] [cursor=pointer]:
                - /url: /guides/compression-ratio-explained/
                - generic [ref=e173]: Compression Ratio Explained
                - generic [ref=e174]: Static vs dynamic CR, octane considerations
            - listitem [ref=e175]:
              - link "Bore vs Stroke Oversquare, square, undersquare geometries" [ref=e176] [cursor=pointer]:
                - /url: /guides/bore-vs-stroke/
                - generic [ref=e177]: Bore vs Stroke
                - generic [ref=e178]: Oversquare, square, undersquare geometries
  - contentinfo [ref=e179]:
    - generic [ref=e180]:
      - paragraph [ref=e181]: © 2026 Automotive Calculators. Built for enthusiasts, by enthusiasts.
      - navigation "Footer navigation" [ref=e182]:
        - link "Calculators" [ref=e183] [cursor=pointer]:
          - /url: /calculators/
        - text: ·
        - link "Guides" [ref=e184] [cursor=pointer]:
          - /url: /guides/
        - text: ·
        - link "Privacy" [ref=e185] [cursor=pointer]:
          - /url: "#"
        - text: ·
        - link "About" [ref=e186] [cursor=pointer]:
          - /url: "#"
  - generic [ref=e189]:
    - button [ref=e190]
    - button [ref=e196]
    - button [ref=e200]
    - button [ref=e208]
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