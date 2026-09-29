import { describe, it, expect } from 'vitest';
import { calculatePowerToWeight, type PowerToWeightInput } from '../../src/lib/calculators/powerToWeight.ts';

describe('Power-to-Weight Calculator', () => {
  it('calculates known ratio correctly', () => {
    const input: PowerToWeightInput = {
      power: 300,
      powerUnit: 'hp',
      weight: 3000,
      weightUnit: 'lb',
    };
    
    const result = calculatePowerToWeight(input);
    
    expect(result.hpPerLb).toBeCloseTo(0.1, 3);
    expect(result.hpPerTon).toBeCloseTo(200, 0);
    expect(result.lbPerHp).toBeCloseTo(10, 3);
  });

  it('handles kW and kg inputs', () => {
    const input: PowerToWeightInput = {
      power: 223.71, // ~300 hp
      powerUnit: 'kw',
      weight: 1360.78, // ~3000 lb
      weightUnit: 'kg',
    };
    
    const result = calculatePowerToWeight(input);
    
    expect(result.hpPerLb).toBeCloseTo(0.1, 2);
    expect(result.hpPerTon).toBeCloseTo(200, 0);
    expect(result.kwPerKg).toBeCloseTo(0.164, 2);
    expect(result.wPerKg).toBeCloseTo(164, 0);
  });

  it('handles mixed units', () => {
    const input: PowerToWeightInput = {
      power: 300,
      powerUnit: 'hp',
      weight: 1360.78,
      weightUnit: 'kg',
    };
    
    const result = calculatePowerToWeight(input);
    
    expect(result.hpPerLb).toBeCloseTo(0.1, 3);
    expect(result.kgPerKw).toBeCloseTo(6.08, 1);
  });

  it('produces readable interpretation', () => {
    const input: PowerToWeightInput = {
      power: 300,
      powerUnit: 'hp',
      weight: 3000,
      weightUnit: 'lb',
    };
    
    const result = calculatePowerToWeight(input);
    
    expect(result.interpretation).toContain('hp/lb');
    expect(result.interpretation).toContain('hp/ton');
    expect(result.interpretation).toContain('kW/kg');
    expect(result.interpretation).toContain('W/kg');
  });

  it('calculates inverse ratios', () => {
    const input: PowerToWeightInput = {
      power: 500,
      powerUnit: 'hp',
      weight: 4000,
      weightUnit: 'lb',
    };
    
    const result = calculatePowerToWeight(input);
    
    expect(result.lbPerHp).toBeCloseTo(8, 3);
    expect(result.kgPerKw).toBeCloseTo(4.86, 1);
  });
});