import { describe, it, expect } from 'vitest';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:4321';

interface TestCase {
  name: string;
  path: string;
  formData: Record<string, string>;
  expectedInResponse: string[];
}

const testCases: TestCase[] = [
  {
    name: 'Wheel Offset - default values',
    path: '/calculators/wheel-offset/',
    formData: { currentWidthIn: '8', currentOffsetMm: '35', newWidthIn: '9', newOffsetMm: '45' },
    expectedInResponse: ['22.7', 'Summary'],
  },
  {
    name: 'Wheel Offset - custom values',
    path: '/calculators/wheel-offset/',
    formData: { currentWidthIn: '7', currentOffsetMm: '20', newWidthIn: '8', newOffsetMm: '30' },
    expectedInResponse: ['Summary'],
  },
  {
    name: 'Compression Ratio - typical engine',
    path: '/calculators/compression-ratio/',
    formData: { bore: '86', stroke: '86', chamberCc: '45', pistonDishCc: '5', pistonDomeCc: '0', gasketBore: '87', gasketThickness: '1.2', deckClearance: '0.5', unitSystem: 'mm' },
    expectedInResponse: ['9.32:1', '499.6 cc', 'Static Compression Ratio'],
  },
  {
    name: 'Power-to-Weight - 300hp 3000lb',
    path: '/calculators/power-to-weight/',
    formData: { power: '300', powerUnit: 'hp', weight: '3000', weightUnit: 'lb' },
    expectedInResponse: ['0.1000 hp/lb', '200', 'Power-to-Weight'],
  },
  {
    name: 'Engine Displacement - 2.0L 4-cyl',
    path: '/calculators/engine-displacement/',
    formData: { bore: '86', stroke: '86', cylinders: '4', unitSystem: 'mm' },
    expectedInResponse: ['1,998 cc', '2.00 L', '121.9 cu in', '1.00', 'Square'],
  },
  {
    name: 'Horsepower - 400lb-ft 6000rpm',
    path: '/calculators/horsepower/',
    formData: { torque: '400', torqueUnit: 'lb-ft', rpm: '6000' },
    expectedInResponse: ['456.9 hp', '340.7 kW', 'Power Output'],
  },
  {
    name: 'Fuel Injector - 400hp 4-cyl',
    path: '/calculators/fuel-injector/',
    formData: { horsepower: '400', bsfc: '0.5', injectorCount: '4', dutyCycle: '0.8', fuelDensity: '0.75' },
    expectedInResponse: ['630 cc/min', '62.5 lb/hr', 'Per Injector Flow'],
  },
  {
    name: 'Quarter Mile - 3500lb 400hp',
    path: '/calculators/quarter-mile/',
    formData: { weight: '3500', weightUnit: 'lb', horsepower: '400', powerType: 'crank' },
    expectedInResponse: ['12.00s', '113.6 MPH', 'Estimated Quarter Mile'],
  },
  {
    name: 'Tire Size - default values',
    path: '/calculators/tire-size/',
    formData: { tireAWidth: '225', tireAAspect: '45', tireARim: '17', tireBWidth: '235', tireBAspect: '40', tireBRim: '18' },
    expectedInResponse: ['10.9', 'Diameter Difference'],
  },
  {
    name: 'Tire Size - plus sizing',
    path: '/calculators/tire-size/',
    formData: { tireAWidth: '225', tireAAspect: '45', tireARim: '17', tireBWidth: '235', tireBAspect: '40', tireBRim: '18' },
    expectedInResponse: ['10.9 mm', '1.7%', '645.2 mm'],
  },
];

async function submitForm(path: string, formData: Record<string, string>): Promise<string> {
  const url = `${BASE_URL}${path}`;
  const body = new URLSearchParams(formData).toString();
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    redirect: 'manual',
  });
  return response.text();
}

describe('Calculator End-to-End Tests', () => {
  for (const tc of testCases) {
    it(`${tc.name} returns expected results`, async () => {
      const html = await submitForm(tc.path, tc.formData);
      for (const expected of tc.expectedInResponse) {
        expect(html).toContain(expected);
      }
    }, 15000);
  }

  it('all calculator pages return 200', async () => {
    const paths = [
      '/calculators/wheel-offset/',
      '/calculators/compression-ratio/',
      '/calculators/power-to-weight/',
      '/calculators/engine-displacement/',
      '/calculators/horsepower/',
      '/calculators/fuel-injector/',
      '/calculators/quarter-mile/',
      '/calculators/tire-size/',
    ];
    for (const path of paths) {
      const response = await fetch(`${BASE_URL}${path}`);
      expect(response.status).toBe(200);
    }
  }, 15000);

  it('all hub pages return 200', async () => {
    const paths = [
      '/calculators/',
      '/wheels-tires/',
      '/engine/',
      '/performance/',
      '/fueling/',
      '/guides/',
    ];
    for (const path of paths) {
      const response = await fetch(`${BASE_URL}${path}`);
      expect(response.status).toBe(200);
    }
  }, 15000);

  it('all guide pages return 200', async () => {
    const paths = [
      '/guides/wheel-offset-explained/',
      '/guides/compression-ratio-explained/',
      '/guides/bore-vs-stroke/',
      '/guides/horsepower-vs-torque/',
      '/guides/bsfc-explained/',
    ];
    for (const path of paths) {
      const response = await fetch(`${BASE_URL}${path}`);
      expect(response.status).toBe(200);
    }
  }, 15000);
});
