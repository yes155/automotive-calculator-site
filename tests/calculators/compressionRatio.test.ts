import { describe, it, expect } from 'vitest';
import { calculateCompressionRatio, type CompressionRatioInput } from '../../src/lib/calculators/compressionRatio.ts';

describe('Compression Ratio Calculator', () => {
  it('calculates correctly for typical engine', () => {
    const input: CompressionRatioInput = {
      bore: 86,
      stroke: 86,
      chamberCc: 45,
      pistonDishCc: 5,
      pistonDomeCc: 0,
      gasketBore: 87,
      gasketThickness: 1.2,
      deckClearance: 0.5,
      unitSystem: 'mm',
    };
    
    const result = calculateCompressionRatio(input);
    
    // Vs = π/4 * 86^2 * 86 / 1000 = ~499.6 cc
    // Vg = π/4 * 87^2 * 1.2 / 1000 = ~7.1 cc
    // Vd = π/4 * 86^2 * 0.5 / 1000 = ~2.9 cc
    // Vc = 45 + 7.1 + 2.9 + 5 - 0 = 60 cc
    // CR = (499.6 + 60) / 60 = 9.33:1
    expect(result.sweptVolumeCc).toBeCloseTo(499.6, 1);
    expect(result.componentVolumes.gasketCc).toBeCloseTo(7.1, 1);
    expect(result.componentVolumes.deckCc).toBeCloseTo(2.9, 1);
    expect(result.totalClearanceVolumeCc).toBeCloseTo(60, 1);
    expect(result.compressionRatio).toBeCloseTo(9.32, 2);
  });

  it('handles inch units', () => {
    const input: CompressionRatioInput = {
      bore: 3.386, // 86mm
      stroke: 3.386,
      chamberCc: 45,
      pistonDishCc: 5,
      pistonDomeCc: 0,
      gasketBore: 3.425, // 87mm
      gasketThickness: 0.047, // 1.2mm
      deckClearance: 0.02, // 0.5mm
      unitSystem: 'in',
    };
    
    const result = calculateCompressionRatio(input);
    
    expect(result.compressionRatio).toBeCloseTo(9.33, 1);
  });

  it('handles piston dome', () => {
    const input: CompressionRatioInput = {
      bore: 86,
      stroke: 86,
      chamberCc: 45,
      pistonDishCc: 0,
      pistonDomeCc: 5,
      gasketBore: 87,
      gasketThickness: 1.2,
      deckClearance: 0.5,
      unitSystem: 'mm',
    };
    
    const result = calculateCompressionRatio(input);
    
    // Vc = 45 + 7.1 + 2.9 + 0 - 5 = 50 cc
    // CR = (499.6 + 50) / 50 = 10.99:1
    expect(result.totalClearanceVolumeCc).toBeCloseTo(50, 1);
    expect(result.compressionRatio).toBeCloseTo(10.99, 1);
  });

  it('produces readable interpretation', () => {
    const input: CompressionRatioInput = {
      bore: 86,
      stroke: 86,
      chamberCc: 45,
      pistonDishCc: 5,
      pistonDomeCc: 0,
      gasketBore: 87,
      gasketThickness: 1.2,
      deckClearance: 0.5,
      unitSystem: 'mm',
    };
    
    const result = calculateCompressionRatio(input);
    
    expect(result.interpretation).toContain('Static compression ratio');
    expect(result.interpretation).toContain('Swept volume');
    expect(result.interpretation).toContain('clearance volume');
  });

  it('returns component breakdown', () => {
    const input: CompressionRatioInput = {
      bore: 86,
      stroke: 86,
      chamberCc: 45,
      pistonDishCc: 5,
      pistonDomeCc: 0,
      gasketBore: 87,
      gasketThickness: 1.2,
      deckClearance: 0.5,
      unitSystem: 'mm',
    };
    
    const result = calculateCompressionRatio(input);
    
    expect(result.componentVolumes.chamberCc).toBe(45);
    expect(result.componentVolumes.dishCc).toBe(5);
    expect(result.componentVolumes.domeCc).toBe(0);
    expect(result.componentVolumes.gasketCc).toBeGreaterThan(0);
    expect(result.componentVolumes.deckCc).toBeGreaterThan(0);
  });
});