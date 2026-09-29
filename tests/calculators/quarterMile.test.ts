import { describe, it, expect } from 'vitest';
import { calculateQuarterMile, type QuarterMileInput } from '../../src/lib/calculators/quarterMile.ts';

describe('Quarter Mile Calculator', () => {
  it('calculates typical values', () => {
    const input: QuarterMileInput = {
      weight: 3500,
      weightUnit: 'lb',
      horsepower: 400,
    };
    
    const result = calculateQuarterMile(input);
    
    // ET = 5.825 * (3500/400)^(1/3) = 12.00s
    // Trap = 234 * (400/3500)^(1/3) = 113.6 mph
    expect(result.etSeconds).toBeCloseTo(12.00, 1);
    expect(result.trapSpeedMph).toBeCloseTo(113.6, 1);
    expect(result.powerToWeightRatio).toBeCloseTo(0.1143, 3);
  });

  it('handles kg input', () => {
    const input: QuarterMileInput = {
      weight: 1588, // ~3500 lb
      weightUnit: 'kg',
      horsepower: 400,
    };
    
    const result = calculateQuarterMile(input);
    
    expect(result.etSeconds).toBeCloseTo(12.00, 1);
    expect(result.trapSpeedMph).toBeCloseTo(113.55, 1);
  });

  it('handles high power-to-weight', () => {
    const input: QuarterMileInput = {
      weight: 2500,
      weightUnit: 'lb',
      horsepower: 600,
    };
    
    const result = calculateQuarterMile(input);
    
    // ET = 5.825 * (2500/600)^(1/3) = 9.39s
    // Trap = 234 * (600/2500)^(1/3) = 145.4 mph
    expect(result.etSeconds).toBeCloseTo(9.39, 1);
    expect(result.trapSpeedMph).toBeCloseTo(145.4, 1);
    expect(result.powerToWeightRatio).toBeCloseTo(0.24, 2);
  });

  it('handles low power-to-weight', () => {
    const input: QuarterMileInput = {
      weight: 4500,
      weightUnit: 'lb',
      horsepower: 200,
    };
    
    const result = calculateQuarterMile(input);
    
    // ET = 5.825 * (4500/200)^(1/3) = 16.44s
    // Trap = 234 * (200/4500)^(1/3) = 82.9 mph
    expect(result.etSeconds).toBeCloseTo(16.44, 1);
    expect(result.trapSpeedMph).toBeCloseTo(82.9, 1);
  });

  it('includes power type in interpretation', () => {
    const input: QuarterMileInput = {
      weight: 3500,
      weightUnit: 'lb',
      horsepower: 400,
      powerType: 'wheel',
    };
    
    const result = calculateQuarterMile(input);
    
    expect(result.interpretation).toContain('wheel hp');
  });

  it('produces readable interpretation with warning', () => {
    const input: QuarterMileInput = {
      weight: 3500,
      weightUnit: 'lb',
      horsepower: 400,
    };
    
    const result = calculateQuarterMile(input);
    
    expect(result.interpretation).toContain('Estimated');
    expect(result.interpretation).toContain('empirical estimate');
    expect(result.interpretation).toContain('traction');
    expect(result.interpretation).toContain('gearing');
    expect(result.interpretation).toContain('weather');
  });
});