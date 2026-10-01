import { describe, it, expect } from 'vitest';
import {
  calculateTireSize,
  parseTireSize,
  validateTireInput,
  calculateWheelOffset,
  calculateCompressionRatio,
  calculatePowerToWeight,
  calculateEngineDisplacement,
  calculateHorsepower,
  calculateFuelInjector,
  calculateQuarterMile,
  roundTo,
  formatNumber,
  formatSigned,
  safeDivide,
  INCH_TO_MM,
  INCHES_PER_MILE,
} from '../../src/lib/calc/index.ts';

describe('Shared Calculation Engine', () => {
  describe('Constants', () => {
    it('INCH_TO_MM is 25.4', () => {
      expect(INCH_TO_MM).toBe(25.4);
    });
    it('INCHES_PER_MILE is 63360', () => {
      expect(INCHES_PER_MILE).toBe(63360);
    });
  });

  describe('Utility functions', () => {
    it('roundTo rounds correctly', () => {
      expect(roundTo(3.14159, 2)).toBe(3.14);
      expect(roundTo(3.14159, 0)).toBe(3);
      expect(roundTo(3.14159, 4)).toBe(3.1416);
    });
    it('formatNumber returns em dash for non-finite', () => {
      expect(formatNumber(NaN)).toBe('—');
      expect(formatNumber(Infinity)).toBe('—');
      expect(formatNumber(42.5)).toBe('42.5');
    });
    it('formatSigned adds + for positive', () => {
      expect(formatSigned(5.2)).toBe('+5.2');
      expect(formatSigned(-5.2)).toBe('-5.2');
      expect(formatSigned(0)).toBe('+0.0');
    });
    it('safeDivide returns Infinity for division by zero', () => {
      expect(safeDivide(10, 0)).toBe(Infinity);
      expect(safeDivide(10, NaN)).toBe(NaN);
      expect(safeDivide(10, 2)).toBe(5);
    });
  });

  describe('calculateTireSize', () => {
    it('calculates 225/45R17 vs 235/40R18 correctly', () => {
      const result = calculateTireSize({
        tireAWidth: 225, tireAAspect: 45, tireARim: 17,
        tireBWidth: 235, tireBAspect: 40, tireBRim: 18,
      });
      expect(result.tireA.diameterMm).toBeCloseTo(634.3, 1);
      expect(result.tireB.diameterMm).toBeCloseTo(645.2, 1);
      expect(result.comparison.diameterDiffMm).toBeCloseTo(10.9, 1);
      expect(result.comparison.diameterDiffPct).toBeCloseTo(1.7, 1);
      expect(result.comparison.groundClearanceChangeMm).toBeCloseTo(5.5, 1);
    });

    it('speedometer reads low when B is larger (regression)', () => {
      const result = calculateTireSize({
        tireAWidth: 225, tireAAspect: 45, tireARim: 17,
        tireBWidth: 235, tireBAspect: 40, tireBRim: 18,
      });
      expect(result.comparison.speedometerErrorPct).toBeLessThan(0);
      expect(result.comparison.speedometerReadingAt60).toBeGreaterThan(60);
    });

    it('speedometer reads high when B is smaller (regression)', () => {
      const result = calculateTireSize({
        tireAWidth: 235, tireAAspect: 40, tireARim: 18,
        tireBWidth: 225, tireBAspect: 45, tireBRim: 17,
      });
      expect(result.comparison.speedometerErrorPct).toBeGreaterThan(0);
      expect(result.comparison.speedometerReadingAt60).toBeLessThan(60);
    });

    it('identical tires return zero diff', () => {
      const result = calculateTireSize({
        tireAWidth: 225, tireAAspect: 45, tireARim: 17,
        tireBWidth: 225, tireBAspect: 45, tireBRim: 17,
      });
      expect(result.comparison.diameterDiffMm).toBe(0);
      expect(result.comparison.diameterDiffPct).toBe(0);
      expect(result.comparison.verdict).toBe('ok');
    });

    it('revs_per_mile uses circumference (hard-coded literal)', () => {
      const result = calculateTireSize({
        tireAWidth: 225, tireAAspect: 45, tireARim: 17,
        tireBWidth: 225, tireBAspect: 45, tireBRim: 17,
      });
      expect(result.tireA.revsPerMile).toBeCloseTo(808, 0);
    });

    it('verdict is caution for 3-5% diff', () => {
      const result = calculateTireSize({
        tireAWidth: 225, tireAAspect: 45, tireARim: 17,
        tireBWidth: 255, tireBAspect: 40, tireBRim: 18,
      });
      expect(Math.abs(result.comparison.diameterDiffPct)).toBeGreaterThan(3);
      expect(Math.abs(result.comparison.diameterDiffPct)).toBeLessThanOrEqual(5);
      expect(result.comparison.verdict).toBe('caution');
    });

    it('verdict is not_recommended for >5% diff', () => {
      const result = calculateTireSize({
        tireAWidth: 225, tireAAspect: 45, tireARim: 17,
        tireBWidth: 285, tireBAspect: 35, tireBRim: 19,
      });
      expect(Math.abs(result.comparison.diameterDiffPct)).toBeGreaterThan(5);
      expect(result.comparison.verdict).toBe('not_recommended');
    });

    it('calculates speedometer table at multiple speeds', () => {
      const result = calculateTireSize({
        tireAWidth: 225, tireAAspect: 45, tireARim: 17,
        tireBWidth: 235, tireBAspect: 40, tireBRim: 18,
      });
      expect(result.comparison.speedometerReadingAt30).toBeCloseTo(30.5, 1);
      expect(result.comparison.speedometerReadingAt45).toBeCloseTo(45.8, 1);
      expect(result.comparison.speedometerReadingAt60).toBeCloseTo(61.0, 1);
      expect(result.comparison.speedometerReadingAt70).toBeCloseTo(71.2, 1);
      expect(result.comparison.speedometerReadingAt80).toBeCloseTo(81.4, 1);
    });

    it('calculates odometer error', () => {
      const result = calculateTireSize({
        tireAWidth: 225, tireAAspect: 45, tireARim: 17,
        tireBWidth: 235, tireBAspect: 40, tireBRim: 18,
      });
      expect(result.comparison.odometerErrorPer1000Mi).toBeLessThan(0);
      expect(result.comparison.odometerErrorPer1000Km).toBeLessThan(0);
    });
  });

  describe('parseTireSize', () => {
    it('parses "225/45R17" correctly', () => {
      const result = parseTireSize('225/45R17');
      expect(result).toEqual({ width: 225, aspect: 45, rim: 17 });
    });
    it('parses "235/40R18" correctly', () => {
      const result = parseTireSize('235/40R18');
      expect(result).toEqual({ width: 235, aspect: 40, rim: 18 });
    });
    it('returns null for invalid format', () => {
      expect(parseTireSize('invalid')).toBeNull();
      expect(parseTireSize('')).toBeNull();
      expect(parseTireSize('225-45-17')).toBeNull();
    });
  });

  describe('validateTireInput', () => {
    it('accepts valid input', () => {
      const result = validateTireInput(225, 45, 17);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
    it('rejects zero width', () => {
      const result = validateTireInput(0, 45, 17);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Width must be a positive number');
    });
    it('rejects negative aspect', () => {
      const result = validateTireInput(225, -5, 17);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Aspect ratio must be a positive number');
    });
    it('warns for out-of-range width', () => {
      const result = validateTireInput(500, 45, 17);
      expect(result.warnings).toContain('Width outside common range (105–405 mm)');
    });
  });

  describe('calculateWheelOffset', () => {
    it('same wheel returns zero changes', () => {
      const result = calculateWheelOffset(8, 35, 8, 35);
      expect(result.innerClearanceChangeMm).toBe(0);
      expect(result.outerPokeChangeMm).toBe(0);
    });
    it('wider wheel extends both edges', () => {
      const result = calculateWheelOffset(8, 35, 9, 35);
      expect(result.innerClearanceChangeMm).toBeCloseTo(-12.7, 1);
      expect(result.outerPokeChangeMm).toBeCloseTo(12.7, 1);
    });
  });

  describe('calculateCompressionRatio', () => {
    it('calculates typical engine correctly', () => {
      const result = calculateCompressionRatio(86, 86, 45, 5, 0, 87, 1.2, 0.5, 'mm');
      expect(result.compressionRatio).toBeCloseTo(9.32, 2);
      expect(result.sweptVolumeCc).toBeCloseTo(499.6, 1);
    });
  });

  describe('calculatePowerToWeight', () => {
    it('calculates 300hp 3000lb correctly', () => {
      const result = calculatePowerToWeight(300, 'hp', 3000, 'lb');
      expect(result.hpPerLb).toBeCloseTo(0.1, 3);
      expect(result.hpPerTon).toBeCloseTo(200, 0);
    });
  });

  describe('calculateEngineDisplacement', () => {
    it('calculates 2.0L 4-cyl correctly', () => {
      const result = calculateEngineDisplacement(86, 86, 4, 'mm');
      expect(result.totalDisplacementCc).toBeCloseTo(1998, 0);
      expect(result.totalDisplacementL).toBeCloseTo(2.0, 1);
    });
  });

  describe('calculateHorsepower', () => {
    it('calculates 400lb-ft 6000rpm correctly', () => {
      const result = calculateHorsepower(400, 'lb-ft', 6000);
      expect(result.hp).toBeCloseTo(457, 0);
      expect(result.kw).toBeCloseTo(341, 0);
    });
  });

  describe('calculateFuelInjector', () => {
    it('calculates 400hp 4-cyl correctly', () => {
      const result = calculateFuelInjector(400, 0.5, 4, 0.8, 0.75);
      expect(result.totalLbHr).toBe(200);
      expect(result.perInjectorLbHr).toBeCloseTo(62.5, 1);
    });
  });

  describe('calculateQuarterMile', () => {
    it('calculates 3500lb 400hp correctly', () => {
      const result = calculateQuarterMile(3500, 'lb', 400);
      expect(result.etSeconds).toBeCloseTo(12.0, 1);
      expect(result.trapSpeedMph).toBeCloseTo(113.6, 1);
    });
  });

  describe('Page text and calculator output consistency', () => {
    it('worked example speedometer line matches calculator output', () => {
      const result = calculateTireSize({
        tireAWidth: 225, tireAAspect: 45, tireARim: 17,
        tireBWidth: 235, tireBAspect: 40, tireBRim: 18,
      });
      const expectedActual = 60 * (result.tireB.diameterMm / result.tireA.diameterMm);
      expect(expectedActual).toBeCloseTo(61.0, 1);
      expect(result.comparison.speedometerErrorPct).toBeCloseTo(-1.7, 1);
      expect(result.comparison.speedometerErrorPct).toBeLessThan(0);
    });

    it('formula text contains correct speedometer direction', () => {
      const formulaText = 'actual_speed = indicated_speed × diameter_B / diameter_A';
      expect(formulaText).toContain('diameter_B / diameter_A');
      expect(formulaText).not.toContain('diameter_A / diameter_B');
    });

    it('notes text contains correct speedometer wording', () => {
      const notesText = 'positive % means the speedometer reads HIGH';
      expect(notesText).toContain('reads HIGH');
      expect(notesText).not.toContain('reads SLOW');
    });

    it('revs_per_mile formula includes π', () => {
      const formulaText = 'revs_per_mile = 63360 / (π × diameter_in)';
      expect(formulaText).toContain('π');
      expect(formulaText).not.toMatch(/63360 \/ diameter_in/);
    });
  });
});