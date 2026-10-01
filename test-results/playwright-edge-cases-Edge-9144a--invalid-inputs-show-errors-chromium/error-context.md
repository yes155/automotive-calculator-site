# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: playwright-edge-cases.test.ts >> Edge case handling >> Wheel Offset - invalid inputs show errors
- Location: tests\playwright-edge-cases.test.ts:25:5

# Error details

```
Error: locator.fill: Error: Cannot type text into input[type=number]
Call log:
  - waiting for locator('input[type="number"]').first()
    - locator resolved to <input min="3" max="20" value="8" step="0.5" required="" type="number" class="field-input" aria-invalid="false" name="currentWidthIn" placeholder="e.g., 8" id="currentWidthIn-field" data-astro-cid-rrvtat5r="" data-astro-source-loc="29:4" data-astro-source-file="C:/Users/HomePC/Documents/Default Project/automotive-calculator-site/src/components/NumberField.astro"/>
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
        - heading "Wheel Offset Calculator" [level=1] [ref=e29]
        - paragraph [ref=e30]: Compare a current wheel with a proposed wheel and see how far the inner and outer edges move. Enter width (inches) and offset ET (mm) for both wheels.
      - generic [ref=e31]:
        - region [ref=e32]:
          - heading "Calculator Inputs" [level=2] [ref=e33]
          - generic [ref=e34]:
            - group "Current Wheel" [ref=e35]:
              - generic [ref=e37]:
                - generic [ref=e38]: Wheel Widthinches*
                - spinbutton "Wheel Widthinches" [ref=e39]: "8"
              - generic [ref=e40]:
                - generic [ref=e41]: Offset (ET)mm*
                - spinbutton "Offset (ET)mm" [ref=e42]: "35"
            - group "New Wheel" [ref=e43]:
              - generic [ref=e45]:
                - generic [ref=e46]: Wheel Widthinches*
                - spinbutton "Wheel Widthinches" [ref=e47]: "9"
              - generic [ref=e48]:
                - generic [ref=e49]: Offset (ET)mm*
                - spinbutton "Offset (ET)mm" [ref=e50]: "45"
            - generic [ref=e51]:
              - button "Calculate" [ref=e52] [cursor=pointer]
              - link "Reset" [ref=e53] [cursor=pointer]:
                - /url: /calculators/wheel-offset/
        - complementary [ref=e54]:
          - heading "Results" [level=2] [ref=e55]
          - status [ref=e56]:
            - generic [ref=e57]:
              - generic [ref=e58]: New wheel moves 22.7 mm closer to the suspension and 2.7 mm farther outward toward the fender.
              - generic [ref=e59]: Summary
            - generic [ref=e60]:
              - generic [ref=e61]:
                - term [ref=e62]: Inner Clearance Change
                - definition [ref=e63]: "-22.7 mm"
              - generic [ref=e64]:
                - term [ref=e65]: Outer Poke Change
                - definition [ref=e66]: +2.7 mm
              - generic [ref=e67]:
                - term [ref=e68]: Old Inner Position
                - definition [ref=e69]: 136.6 mm
              - generic [ref=e70]:
                - term [ref=e71]: Old Outer Position
                - definition [ref=e72]: 66.6 mm
              - generic [ref=e73]:
                - term [ref=e74]: New Inner Position
                - definition [ref=e75]: 159.3 mm
              - generic [ref=e76]:
                - term [ref=e77]: New Outer Position
                - definition [ref=e78]: 69.3 mm
      - region [ref=e79]:
        - heading "Formula & Method" [level=2] [ref=e80]
        - generic [ref=e81]:
          - heading "Formula" [level=3] [ref=e82]
          - code [ref=e85]: half_width_mm = width_in × 25.4 / 2 inner_position = half_width_mm + offset_mm outer_position = half_width_mm - offset_mm inner_clearance_change = old_inner_position - new_inner_position outer_poke_change = new_outer_position - old_outer_position
          - generic [ref=e86]:
            - generic [ref=e87]:
              - term [ref=e88]:
                - code [ref=e89]: width_in
              - definition [ref=e90]: Wheel width(inches)
            - generic [ref=e91]:
              - term [ref=e92]:
                - code [ref=e93]: offset_mm
              - definition [ref=e94]: Offset (ET)(mm)
            - generic [ref=e95]:
              - term [ref=e96]:
                - code [ref=e97]: half_width_mm
              - definition [ref=e98]: Half width(mm)
            - generic [ref=e99]:
              - term [ref=e100]:
                - code [ref=e101]: inner_position
              - definition [ref=e102]: Distance from hub to inner edge(mm)
            - generic [ref=e103]:
              - term [ref=e104]:
                - code [ref=e105]: outer_position
              - definition [ref=e106]: Distance from hub to outer edge(mm)
          - list [ref=e107]:
            - listitem [ref=e108]: Positive inner clearance change means the new wheel provides MORE clearance to suspension components.
            - listitem [ref=e109]: Negative inner clearance change means the new wheel sits CLOSER to suspension (less clearance).
            - listitem [ref=e110]: Positive outer poke change means the new wheel extends FARTHER toward the fender.
            - listitem [ref=e111]: Negative outer poke change means the new wheel sits MORE INWARD toward the suspension.
      - region [ref=e112]:
        - heading "Worked Example" [level=2] [ref=e113]
        - generic [ref=e114]:
          - paragraph [ref=e115]:
            - strong [ref=e116]: "Example:"
            - text: "Current wheel: 8″ × ET35. Proposed wheel: 9″ × ET45."
          - list [ref=e117]:
            - listitem [ref=e118]: "Old half-width: 8 × 25.4 / 2 = 101.6 mm"
            - listitem [ref=e119]: "Old inner: 101.6 + 35 = 136.6 mm | Old outer: 101.6 − 35 = 66.6 mm"
            - listitem [ref=e120]: "New half-width: 9 × 25.4 / 2 = 114.3 mm"
            - listitem [ref=e121]: "New inner: 114.3 + 45 = 159.3 mm | New outer: 114.3 − 45 = 69.3 mm"
            - listitem [ref=e122]:
              - text: "Inner clearance change: 136.6 − 159.3 ="
              - strong [ref=e123]: −22.7 mm
              - text: (22.7 mm less clearance)
            - listitem [ref=e124]:
              - text: "Outer poke change: 69.3 − 66.6 ="
              - strong [ref=e125]: +2.7 mm
              - text: (2.7 mm farther out)
      - region [ref=e126]:
        - heading "Limitations" [level=2] [ref=e127]
        - generic [ref=e128]:
          - paragraph [ref=e129]:
            - strong [ref=e130]: "Important limitation:"
            - text: This calculator shows wheel rim geometry only. It does
            - emphasis [ref=e131]: not
            - text: "guarantee:"
          - list [ref=e132]:
            - listitem [ref=e133]: Brake caliper clearance
            - listitem [ref=e134]: Suspension component clearance (struts, control arms, tie rods)
            - listitem [ref=e135]: Tire sidewall clearance (tires are wider than the rim)
            - listitem [ref=e136]: Fender/lip clearance
            - listitem [ref=e137]: Hub bore compatibility
            - listitem [ref=e138]: Load rating adequacy
          - paragraph [ref=e139]: Always verify fitment with a physical test fit or professional consultation before purchasing.
      - region [ref=e140]:
        - heading "Related Tools" [level=2] [ref=e141]
        - navigation "Related calculators and guides" [ref=e142]:
          - list [ref=e143]:
            - listitem [ref=e144]:
              - link "Tire Size Calculator Compare tire diameters and speedometer effect" [ref=e145] [cursor=pointer]:
                - /url: /calculators/tire-size/
                - generic [ref=e146]: Tire Size Calculator
                - generic [ref=e147]: Compare tire diameters and speedometer effect
            - listitem [ref=e148]:
              - link "Wheels & Tires Hub All wheel and tire tools" [ref=e149] [cursor=pointer]:
                - /url: /wheels-tires/
                - generic [ref=e150]: Wheels & Tires Hub
                - generic [ref=e151]: All wheel and tire tools
  - contentinfo [ref=e152]:
    - generic [ref=e153]:
      - paragraph [ref=e154]: © 2026 Automotive Calculators. Built for enthusiasts, by enthusiasts.
      - navigation "Footer navigation" [ref=e155]:
        - link "Calculators" [ref=e156] [cursor=pointer]:
          - /url: /calculators/
        - text: ·
        - link "Guides" [ref=e157] [cursor=pointer]:
          - /url: /guides/
        - text: ·
        - link "Privacy" [ref=e158] [cursor=pointer]:
          - /url: "#"
        - text: ·
        - link "About" [ref=e159] [cursor=pointer]:
          - /url: "#"
  - generic [ref=e162]:
    - button [ref=e163]
    - button [ref=e169]
    - button [ref=e173]
    - button [ref=e181]
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