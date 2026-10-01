import { describe, it, expect } from 'vitest';
import {
  calculateTireSize,
  parseTireSize,
  validateTireInput,
  INCH_TO_MM,
  MM_PER_MILE,
  MM_PER_KM,
} from '../src/lib/calc/index.ts';

describe('GATE 1: Calculation Correctness', () => {
  describe('1.1 Independent oracle (hand-calculated literals)', () => {
    it('tire diameter: 225/45R17 = 634.3 mm', () => {
      const sidewall = 225 * 0.45;
      const diameter = 2 * sidewall + 17 * 25.4;
      expect(diameter).toBeCloseTo(634.3, 1);
    });
    it('tire diameter: 235/40R18 = 645.2 mm', () => {
      const sidewall = 235 * 0.40;
      const diameter = 2 * sidewall + 18 * 25.4;
      expect(diameter).toBeCloseTo(645.2, 1);
    });
    it('speedometer: 60 * 645.2/634.3 = 61.0', () => {
      expect(60 * 645.2 / 634.3).toBeCloseTo(61.0, 1);
    });
    it('speedometer error: (634.3/645.2 - 1)*100 = -1.7%', () => {
      expect((634.3 / 645.2 - 1) * 100).toBeCloseTo(-1.7, 1);
    });
    it('revs/mile: 1609344/(π*634.3) = 808', () => {
      expect(1609344 / (Math.PI * 634.3)).toBeCloseTo(808, 0);
    });
    it('revs/mile: 1609344/(π*645.2) = 794', () => {
      expect(1609344 / (Math.PI * 645.2)).toBeCloseTo(794, 0);
    });
  });

  describe('1.2 Known-value tests (hard-coded literals)', () => {
    it('225/45R17 vs 235/40R18 (worked example)', () => {
      const r = calculateTireSize({ tireAWidth: 225, tireAAspect: 45, tireARim: 17, tireBWidth: 235, tireBAspect: 40, tireBRim: 18 });
      expect(r.tireA.diameterMm).toBeCloseTo(634.3, 1);
      expect(r.tireB.diameterMm).toBeCloseTo(645.2, 1);
      expect(r.comparison.diameterDiffMm).toBeCloseTo(10.9, 1);
      expect(r.comparison.diameterDiffPct).toBeCloseTo(1.7, 1);
      expect(r.comparison.speedometerErrorPct).toBeCloseTo(-1.7, 1);
      expect(r.comparison.speedometerReadingAt60).toBeCloseTo(61.0, 1);
      expect(r.tireA.revsPerMile).toBeCloseTo(808, 0);
      expect(r.tireB.revsPerMile).toBeCloseTo(794, 0);
    });
    it('speedometer table: 30→30.5, 45→45.8, 60→61.0, 70→71.2, 80→81.4', () => {
      const r = calculateTireSize({ tireAWidth: 225, tireAAspect: 45, tireARim: 17, tireBWidth: 235, tireBAspect: 40, tireBRim: 18 });
      expect(r.comparison.speedometerReadingAt30).toBeCloseTo(30.5, 1);
      expect(r.comparison.speedometerReadingAt45).toBeCloseTo(45.8, 1);
      expect(r.comparison.speedometerReadingAt60).toBeCloseTo(61.0, 1);
      expect(r.comparison.speedometerReadingAt70).toBeCloseTo(71.2, 1);
      expect(r.comparison.speedometerReadingAt80).toBeCloseTo(81.4, 1);
    });
    it('265/70R17 vs 265/70R17 (identical)', () => {
      const r = calculateTireSize({ tireAWidth: 265, tireAAspect: 70, tireARim: 17, tireBWidth: 265, tireBAspect: 70, tireBRim: 17 });
      expect(r.comparison.diameterDiffMm).toBe(0);
      expect(r.comparison.diameterDiffPct).toBe(0);
      expect(r.comparison.speedometerErrorPct).toBe(0);
      expect(r.comparison.verdict).toBe('ok');
    });
  });

  describe('1.3 Directional / sanity tests', () => {
    it('larger B => speedometer reads low (negative error)', () => {
      const r = calculateTireSize({ tireAWidth: 225, tireAAspect: 45, tireARim: 17, tireBWidth: 235, tireBAspect: 40, tireBRim: 18 });
      expect(r.comparison.speedometerErrorPct).toBeLessThan(0);
      expect(r.comparison.speedometerReadingAt60).toBeGreaterThan(60);
    });
    it('smaller B => speedometer reads high (positive error)', () => {
      const r = calculateTireSize({ tireAWidth: 235, tireAAspect: 40, tireARim: 18, tireBWidth: 225, tireBAspect: 45, tireBRim: 17 });
      expect(r.comparison.speedometerErrorPct).toBeGreaterThan(0);
      expect(r.comparison.speedometerReadingAt60).toBeLessThan(60);
    });
    it('identity: identical A and B => all diffs 0', () => {
      const r = calculateTireSize({ tireAWidth: 225, tireAAspect: 45, tireARim: 17, tireBWidth: 225, tireBAspect: 45, tireBRim: 17 });
      expect(r.comparison.diameterDiffMm).toBe(0);
      expect(r.comparison.circumferenceDiffMm).toBe(0);
      expect(r.comparison.groundClearanceChangeMm).toBe(0);
      expect(r.comparison.speedometerErrorPct).toBe(0);
    });
    it('symmetry: swap A and B => diffs flip sign', () => {
      const r1 = calculateTireSize({ tireAWidth: 225, tireAAspect: 45, tireARim: 17, tireBWidth: 235, tireBAspect: 40, tireBRim: 18 });
      const r2 = calculateTireSize({ tireAWidth: 235, tireAAspect: 40, tireARim: 18, tireBWidth: 225, tireBAspect: 45, tireBRim: 17 });
      expect(r1.comparison.diameterDiffMm).toBeCloseTo(-r2.comparison.diameterDiffMm, 1);
      expect(r1.comparison.speedometerErrorPct).toBeCloseTo(-r2.comparison.speedometerErrorPct, 1);
    });
  });

  describe('1.4 Unit tests', () => {
    it('INCH_TO_MM is 25.4', () => {
      expect(INCH_TO_MM).toBe(25.4);
    });
    it('MM_PER_MILE is 1609344', () => {
      expect(MM_PER_MILE).toBe(1609344);
    });
    it('MM_PER_KM is 1000000', () => {
      expect(MM_PER_KM).toBe(1000000);
    });
    it('revs/mile and revs/km are consistent', () => {
      const r = calculateTireSize({ tireAWidth: 225, tireAAspect: 45, tireARim: 17, tireBWidth: 225, tireBAspect: 45, tireBRim: 17 });
      expect(r.tireA.revsPerKm).toBeCloseTo(r.tireA.revsPerMile / 1.60934, 0);
    });
  });

  describe('1.5 Property/fuzz tests', () => {
    it('1000 random valid inputs produce no NaN/Infinity', () => {
      for (let i = 0; i < 1000; i++) {
        const aW = 155 + Math.random() * 250;
        const aA = 25 + Math.random() * 60;
        const aR = 13 + Math.random() * 11;
        const bW = 155 + Math.random() * 250;
        const bA = 25 + Math.random() * 60;
        const bR = 13 + Math.random() * 11;
        const r = calculateTireSize({ tireAWidth: aW, tireAAspect: aA, tireARim: aR, tireBWidth: bW, tireBAspect: bA, tireBRim: bR });
        expect(isFinite(r.tireA.diameterMm)).toBe(true);
        expect(isFinite(r.tireB.diameterMm)).toBe(true);
        expect(isFinite(r.comparison.diameterDiffMm)).toBe(true);
        expect(isFinite(r.comparison.speedometerErrorPct)).toBe(true);
        expect(r.tireA.diameterMm).toBeGreaterThan(0);
        expect(r.tireB.diameterMm).toBeGreaterThan(0);
      }
    });
  });

  describe('1.6 Precision', () => {
    it('handles floating point drift', () => {
      const r = calculateTireSize({ tireAWidth: 225.1, tireAAspect: 45.1, tireARim: 17.1, tireBWidth: 235.1, tireBAspect: 40.1, tireBRim: 18.1 });
      expect(isFinite(r.tireA.diameterMm)).toBe(true);
      expect(isFinite(r.tireB.diameterMm)).toBe(true);
    });
  });

  describe('1.7 Cross-check: page text and calculator output', () => {
    it('worked example matches calculator output', () => {
      const r = calculateTireSize({ tireAWidth: 225, tireAAspect: 45, tireARim: 17, tireBWidth: 235, tireBAspect: 40, tireBRim: 18 });
      expect(r.tireA.diameterMm).toBeCloseTo(634.3, 1);
      expect(r.tireB.diameterMm).toBeCloseTo(645.2, 1);
      expect(r.comparison.speedometerReadingAt60).toBeCloseTo(61.0, 1);
      expect(r.comparison.speedometerErrorPct).toBeCloseTo(-1.7, 1);
    });
  });
});

describe('GATE 2: User Input Handling', () => {
  describe('parseTireSize', () => {
    it('parses "225/45R17" correctly', () => {
      expect(parseTireSize('225/45R17')).toEqual({ width: 225, aspect: 45, rim: 17 });
    });
    it('returns null for invalid formats', () => {
      expect(parseTireSize('invalid')).toBeNull();
      expect(parseTireSize('')).toBeNull();
      expect(parseTireSize('abc')).toBeNull();
      expect(parseTireSize('1e309')).toBeNull();
    });
  });

  describe('validateTireInput', () => {
    it('accepts valid input', () => {
      const r = validateTireInput(225, 45, 17);
      expect(r.valid).toBe(true);
      expect(r.errors).toHaveLength(0);
    });
    it('rejects zero width', () => {
      const r = validateTireInput(0, 45, 17);
      expect(r.valid).toBe(false);
      expect(r.errors).toContain('Width must be a positive number');
    });
    it('rejects negative aspect', () => {
      const r = validateTireInput(225, -5, 17);
      expect(r.valid).toBe(false);
      expect(r.errors).toContain('Aspect ratio must be a positive number');
    });
    it('warns for non-standard width 500', () => {
      const r = validateTireInput(500, 45, 17);
      expect(r.warnings).toContain('Width outside common range (105–405 mm)');
    });
    it('does not warn for width 289 (within range)', () => {
      const r = validateTireInput(289, 45, 17);
      expect(r.warnings).toHaveLength(0);
    });
  });
});