import { describe, it, expect } from 'vitest';
import { calculateEngineDisplacement, type EngineDisplacementInput } from '../../src/lib/calculators/engineDisplacement.ts';

describe('Engine Displacement Calculator', () => {
  it('calculates ~2.0L four-cylinder correctly', () => {
    const input: EngineDisplacementInput = {
      bore: 86,
      stroke: 86,
      cylinders: 4,
      unitSystem: 'mm',
    };
    
    const result = calculateEngineDisplacement(input);
    
    // π/4 * 86^2 * 86 / 1000 = 499.56 cc per cylinder
    // Total = 1998.2 cc = 1.998 L = 121.9 cu in
    expect(result.perCylinderCc).toBeCloseTo(499.6, 1);
    expect(result.totalDisplacementCc).toBeCloseTo(1998, 0);
    expect(result.totalDisplacementL).toBeCloseTo(2.0, 1);
    expect(result.totalDisplacementCi).toBeCloseTo(121.9, 1);
  });

  it('handles inch units', () => {
    const input: EngineDisplacementInput = {
      bore: 3.386, // 86mm
      stroke: 3.386,
      cylinders: 4,
      unitSystem: 'in',
    };
    
    const result = calculateEngineDisplacement(input);
    
    expect(result.totalDisplacementCc).toBeCloseTo(1999, 0);
  });

  it('calculates V8 correctly', () => {
    const input: EngineDisplacementInput = {
      bore: 4.0, // 101.6mm
      stroke: 3.0, // 76.2mm
      cylinders: 8,
      unitSystem: 'in',
    };
    
    const result = calculateEngineDisplacement(input);
    
    // Actual: π/4 * 101.6^2 * 76.2 / 1000 = 617.8 cc per cylinder
    // Total = 4942 cc = 4.94 L = 301.6 cu in
    expect(result.totalDisplacementCc).toBeCloseTo(4942, 0);
    expect(result.totalDisplacementL).toBeCloseTo(4.94, 1);
    expect(result.totalDisplacementCi).toBeCloseTo(301.6, 1);
  });

  it('identifies oversquare geometry', () => {
    const input: EngineDisplacementInput = {
      bore: 90,
      stroke: 70,
      cylinders: 4,
      unitSystem: 'mm',
    };
    
    const result = calculateEngineDisplacement(input);
    
    expect(result.boreStrokeRatio).toBeCloseTo(1.286, 2);
    expect(result.geometryDescription).toContain('Oversquare');
  });

  it('identifies undersquare geometry', () => {
    const input: EngineDisplacementInput = {
      bore: 80,
      stroke: 95,
      cylinders: 4,
      unitSystem: 'mm',
    };
    
    const result = calculateEngineDisplacement(input);
    
    expect(result.boreStrokeRatio).toBeCloseTo(0.842, 2);
    expect(result.geometryDescription).toContain('Undersquare');
  });

  it('identifies square geometry', () => {
    const input: EngineDisplacementInput = {
      bore: 86,
      stroke: 86,
      cylinders: 4,
      unitSystem: 'mm',
    };
    
    const result = calculateEngineDisplacement(input);
    
    expect(result.boreStrokeRatio).toBeCloseTo(1.0, 2);
    expect(result.geometryDescription).toContain('Square');
  });

  it('produces readable interpretation', () => {
    const input: EngineDisplacementInput = {
      bore: 86,
      stroke: 86,
      cylinders: 4,
      unitSystem: 'mm',
    };
    
    const result = calculateEngineDisplacement(input);
    
    expect(result.interpretation).toContain('Total displacement');
    expect(result.interpretation).toContain('Per cylinder');
    expect(result.interpretation).toContain('Bore/stroke ratio');
    expect(result.interpretation).toContain('descriptive geometry');
  });
});