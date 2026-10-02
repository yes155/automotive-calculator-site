import { describe, it, expect } from 'vitest';
import { calculateFuelInjector, type FuelInjectorInput } from '../../src/lib/calculators/fuelInjector.ts';

describe('Fuel Injector Calculator', () => {
  it('calculates mass flow arithmetic correctly', () => {
    const input: FuelInjectorInput = {
      horsepower: 400,
      bsfc: 0.5,
      injectorCount: 4,
      dutyCycle: 0.8,
      fuelDensity: 0.75,
    };
    
    const result = calculateFuelInjector(input);
    
    // 400 * 0.5 = 200 lb/hr total
    // 200 / (4 * 0.8) = 62.5 lb/hr per injector
    // 62.5 * 453.59237 / 60 / 0.75 = 630 cc/min
    expect(result.totalLbHr).toBe(200);
    expect(result.perInjectorLbHr).toBeCloseTo(62.5, 1);
    expect(result.perInjectorCcMin).toBeCloseTo(630, 0);
    expect(result.totalCcMin).toBeCloseTo(2016, 0);
  });

  it('duty-cycle headroom changes injector capacity, not required engine flow', () => {
    const common = { horsepower: 400, bsfc: 0.5, injectorCount: 4, fuelDensity: 0.75 };
    const at80 = calculateFuelInjector({ ...common, dutyCycle: 0.8 });
    const at100 = calculateFuelInjector({ ...common, dutyCycle: 1 });
    expect(at80.totalLbHr).toBe(at100.totalLbHr);
    expect(at80.totalCcMin).toBe(at100.totalCcMin);
    expect(at80.totalCcMin * 0.75 * 60 / 453.59237).toBeCloseTo(200, 8);
    expect(at80.perInjectorLbHr).toBeCloseTo(at100.perInjectorLbHr / 0.8, 8);
  });

  it('handles different BSFC values', () => {
    const input: FuelInjectorInput = {
      horsepower: 500,
      bsfc: 0.45,
      injectorCount: 8,
      dutyCycle: 0.85,
      fuelDensity: 0.74,
    };
    
    const result = calculateFuelInjector(input);
    
    // 500 * 0.45 = 225 lb/hr total
    // 225 / (8 * 0.85) = 33.09 lb/hr per injector
    expect(result.totalLbHr).toBe(225);
    expect(result.perInjectorLbHr).toBeCloseTo(33.09, 1);
  });

  it('handles E85 fuel density', () => {
    const input: FuelInjectorInput = {
      horsepower: 400,
      bsfc: 0.5,
      injectorCount: 4,
      dutyCycle: 0.8,
      fuelDensity: 0.79, // E85 ~0.79 g/mL
    };
    
    const result = calculateFuelInjector(input);
    
    // Same lb/hr but higher density = lower cc/min
    expect(result.perInjectorLbHr).toBeCloseTo(62.5, 1);
    expect(result.perInjectorCcMin).toBeLessThan(629); // Lower than gasoline
  });

  it('handles 6-cylinder engine', () => {
    const input: FuelInjectorInput = {
      horsepower: 350,
      bsfc: 0.5,
      injectorCount: 6,
      dutyCycle: 0.8,
      fuelDensity: 0.75,
    };
    
    const result = calculateFuelInjector(input);
    
    // 350 * 0.5 = 175 lb/hr total
    // 175 / (6 * 0.8) = 36.46 lb/hr per injector
    expect(result.totalLbHr).toBe(175);
    expect(result.perInjectorLbHr).toBeCloseTo(36.46, 1);
  });

  it('produces readable interpretation', () => {
    const input: FuelInjectorInput = {
      horsepower: 400,
      bsfc: 0.5,
      injectorCount: 4,
      dutyCycle: 0.8,
      fuelDensity: 0.75,
    };
    
    const result = calculateFuelInjector(input);
    
    expect(result.interpretation).toContain('lb/hr');
    expect(result.interpretation).toContain('cc/min');
    expect(result.interpretation).toContain('duty');
    expect(result.interpretation).toContain('Note:');
  });

  it('handles 100% duty cycle edge case', () => {
    const input: FuelInjectorInput = {
      horsepower: 400,
      bsfc: 0.5,
      injectorCount: 4,
      dutyCycle: 1.0,
      fuelDensity: 0.75,
    };
    
    const result = calculateFuelInjector(input);
    
    // 200 / (4 * 1.0) = 50 lb/hr per injector
    expect(result.perInjectorLbHr).toBe(50);
  });
});
