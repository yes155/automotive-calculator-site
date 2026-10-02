import { describe, it, expect } from 'vitest';
import { validatePositive, validateNonNegative, validateRange } from '../../src/lib/validation';
import { validateCompressionRatio } from '../../src/lib/calculators/compressionRatio';
import { validateEngineDisplacement } from '../../src/lib/calculators/engineDisplacement';
import { validateHorsepower, calculateHorsepower } from '../../src/lib/calculators/horsepower';

describe('shared numeric validation', () => {
  for (const value of [NaN, Infinity, -Infinity]) {
    it(`rejects ${value} instead of silently passing comparisons`, () => {
      expect(validatePositive(value, 'Value').valid).toBe(false);
      expect(validateNonNegative(value, 'Value').valid).toBe(false);
      expect(validateRange(value, 'Value', 0, 100).valid).toBe(false);
    });
  }
  it('requires whole cylinder counts', () => {
    expect(validateEngineDisplacement({ bore: 86, stroke: 86, cylinders: 4.5, unitSystem: 'mm' }).valid).toBe(false);
  });
  it('accepts zero torque and produces zero power', () => {
    const input = { torque: 0, torqueUnit: 'lb-ft' as const, rpm: 6000 };
    expect(validateHorsepower(input).valid).toBe(true);
    expect(calculateHorsepower(input).hp).toBe(0);
  });
  it('rejects zero or negative compression clearance', () => {
    for (const pistonDomeCc of [45, 50]) {
      const input = { bore: 86, stroke: 86, chamberCc: 45, pistonDishCc: 0, pistonDomeCc, gasketBore: 87, gasketThickness: 0, deckClearance: 0, unitSystem: 'mm' as const };
      expect(validateCompressionRatio(input).errors).toContain('Total clearance volume must be greater than zero');
    }
  });
});
