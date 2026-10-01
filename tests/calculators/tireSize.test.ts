import { describe, it, expect } from 'vitest';
import { calculateTireSize, type TireSizeInput } from '../../src/lib/calculators/tireSize.ts';

describe('Tire Size Calculator', () => {
  it('calculates identical tires as no change', () => {
    const input: TireSizeInput = {
      tireAWidth: 225,
      tireAAspect: 45,
      tireARim: 17,
      tireBWidth: 225,
      tireBAspect: 45,
      tireBRim: 17,
    };
    
    const result = calculateTireSize(input);
    
    expect(result.comparison.diameterDiffMm).toBeCloseTo(0, 1);
    expect(result.comparison.diameterDiffPct).toBeCloseTo(0, 1);
    expect(result.comparison.circumferenceDiffMm).toBeCloseTo(0, 1);
    expect(result.comparison.groundClearanceChangeMm).toBeCloseTo(0, 1);
    expect(result.comparison.speedometerErrorPct).toBeCloseTo(0, 1);
    expect(result.comparison.speedometerReadingAt60).toBeCloseTo(60, 1);
  });

  it('calculates 225/45R17 correctly', () => {
    const input: TireSizeInput = {
      tireAWidth: 225,
      tireAAspect: 45,
      tireARim: 17,
      tireBWidth: 225,
      tireBAspect: 45,
      tireBRim: 17,
    };
    
    const result = calculateTireSize(input);
    
    // Sidewall = 225 * 0.45 = 101.25 mm
    // Diameter = 2 * 101.25 + 17 * 25.4 = 202.5 + 431.8 = 634.3 mm = 24.97 in
    // Circumference = π * 634.3 = 1992.7 mm
    expect(result.tireA.sidewallMm).toBeCloseTo(101.25, 1);
    expect(result.tireA.diameterMm).toBeCloseTo(634.3, 1);
    expect(result.tireA.diameterIn).toBeCloseTo(24.97, 1);
    expect(result.tireA.circumferenceMm).toBeCloseTo(1992.7, 1);
  });

  it('calculates plus-sizing example', () => {
    const input: TireSizeInput = {
      tireAWidth: 225,
      tireAAspect: 45,
      tireARim: 17,
      tireBWidth: 235,
      tireBAspect: 40,
      tireBRim: 18,
    };
    
    const result = calculateTireSize(input);
    
    // Tire A: 634.3 mm
    // Tire B: sidewall = 235 * 0.40 = 94 mm, diameter = 188 + 457.2 = 645.2 mm
    // Diff = 10.9 mm, 1.7%
    // Ground clearance change = 10.9 / 2 = 5.45 mm
    expect(result.tireB.sidewallMm).toBeCloseTo(94, 1);
    expect(result.tireB.diameterMm).toBeCloseTo(645.2, 1);
    expect(result.comparison.diameterDiffMm).toBeCloseTo(10.9, 1);
    expect(result.comparison.diameterDiffPct).toBeCloseTo(1.7, 1);
    expect(result.comparison.groundClearanceChangeMm).toBeCloseTo(5.45, 1);
  });

it('calculates speedometer effect correctly', () => {
    const input: TireSizeInput = {
      tireAWidth: 225,
      tireAAspect: 45,
      tireARim: 17,
      tireBWidth: 235,
      tireBAspect: 40,
      tireBRim: 18,
    };
    
    const result = calculateTireSize(input);
    
    // Tire B is larger, so speedometer reads low
    // At 60 indicated, actual = 60 * (645.2 / 634.3) = 61.0
    expect(result.comparison.speedometerReadingAt60).toBeCloseTo(61.0, 1);
    expect(result.comparison.speedometerErrorPct).toBeCloseTo(-1.7, 1);
  });

  it('handles smaller tire B', () => {
    const input: TireSizeInput = {
      tireAWidth: 245,
      tireAAspect: 40,
      tireARim: 18,
      tireBWidth: 225,
      tireBAspect: 45,
      tireBRim: 17,
    };
    
    const result = calculateTireSize(input);
    
    // Tire B is smaller
    expect(result.comparison.diameterDiffMm).toBeLessThan(0);
    expect(result.comparison.groundClearanceChangeMm).toBeLessThan(0);
    expect(result.comparison.speedometerReadingAt60).toBeLessThan(60);
  });

  it('produces readable interpretation', () => {
    const input: TireSizeInput = {
      tireAWidth: 225,
      tireAAspect: 45,
      tireARim: 17,
      tireBWidth: 235,
      tireBAspect: 40,
      tireBRim: 18,
    };
    
    const result = calculateTireSize(input);
    
    expect(result.interpretation).toContain('mm');
    expect(result.interpretation).toContain('%');
    expect(result.interpretation).toContain('Ground clearance');
    expect(result.interpretation).toContain('speedometer');
    expect(result.interpretation).toContain('MPH');
  });

  it('calculates revs per mile', () => {
    const input: TireSizeInput = {
      tireAWidth: 225,
      tireAAspect: 45,
      tireARim: 17,
      tireBWidth: 225,
      tireBAspect: 45,
      tireBRim: 17,
    };
    
    const result = calculateTireSize(input);
    
    // 1609344 mm/mile / (π * 634.3 mm) = ~808 revs/mile
    expect(result.tireA.revsPerMile).toBeCloseTo(808, 0);
  });
});