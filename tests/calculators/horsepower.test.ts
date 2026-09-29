import { describe, it, expect } from 'vitest';
import { calculateHorsepower, type HorsepowerInput } from '../../src/lib/calculators/horsepower.ts';

describe('Horsepower Calculator', () => {
  it('calculates 5252 crossover correctly', () => {
    const input: HorsepowerInput = {
      torque: 525.2113,
      torqueUnit: 'lb-ft',
      rpm: 5252.113,
    };
    
    const result = calculateHorsepower(input);
    
    expect(result.hp).toBeCloseTo(525.21, 1);
    expect(result.kw).toBeCloseTo(391.65, 1);
  });

  it('handles N·m input', () => {
    const input: HorsepowerInput = {
      torque: 712.1, // ~525 lb-ft
      torqueUnit: 'nm',
      rpm: 5252.113,
    };
    
    const result = calculateHorsepower(input);
    
    expect(result.hp).toBeCloseTo(525.2, 1);
    expect(result.torqueLbft).toBeCloseTo(525.2, 1);
  });

  it('calculates typical engine values', () => {
    const input: HorsepowerInput = {
      torque: 400,
      torqueUnit: 'lb-ft',
      rpm: 6000,
    };
    
    const result = calculateHorsepower(input);
    
    // 400 * 6000 / 5252.113 = 457 hp
    expect(result.hp).toBeCloseTo(457, 0);
    expect(result.kw).toBeCloseTo(341, 0);
  });

  it('handles low RPM', () => {
    const input: HorsepowerInput = {
      torque: 300,
      torqueUnit: 'lb-ft',
      rpm: 2000,
    };
    
    const result = calculateHorsepower(input);
    
    // 300 * 2000 / 5252.113 = 114 hp
    expect(result.hp).toBeCloseTo(114, 0);
  });

  it('produces readable interpretation', () => {
    const input: HorsepowerInput = {
      torque: 400,
      torqueUnit: 'lb-ft',
      rpm: 6000,
    };
    
    const result = calculateHorsepower(input);
    
    expect(result.interpretation).toContain('hp');
    expect(result.interpretation).toContain('kW');
    expect(result.interpretation).toContain('5,252 RPM');
  });

  it('converts torque units correctly', () => {
    const input: HorsepowerInput = {
      torque: 500,
      torqueUnit: 'lb-ft',
      rpm: 5000,
    };
    
    const result = calculateHorsepower(input);
    
    expect(result.torqueNm).toBeCloseTo(678, 0);
    
    const inputNm: HorsepowerInput = {
      torque: 678,
      torqueUnit: 'nm',
      rpm: 5000,
    };
    
    const resultNm = calculateHorsepower(inputNm);
    
    expect(resultNm.torqueLbft).toBeCloseTo(500, 0);
    expect(resultNm.hp).toBeCloseTo(result.hp, 0);
  });
});