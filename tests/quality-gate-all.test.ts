import { describe, it, expect } from 'vitest';
import {
  calculateWheelOffset,
  calculateCompressionRatio,
  calculatePowerToWeight,
  calculateEngineDisplacement,
  calculateHorsepower,
  calculateFuelInjector,
  calculateQuarterMile,
  calculateTireSize,
  INCH_TO_MM,
  MM_PER_MILE,
  MM_PER_KM,
  LB_TO_KG,
  HP_TO_KW,
} from '../src/lib/calc/index.ts';

describe('GATE 1: Calculation Correctness — All Calculators', () => {
  describe('Wheel Offset', () => {
    it('identity: same wheel => zero changes', () => {
      const r = calculateWheelOffset(8, 35, 8, 35);
      expect(r.innerClearanceChangeMm).toBe(0);
      expect(r.outerPokeChangeMm).toBe(0);
    });
    it('directional: wider wheel => inner decreases, outer increases', () => {
      const r = calculateWheelOffset(8, 35, 9, 35);
      expect(r.innerClearanceChangeMm).toBeLessThan(0);
      expect(r.outerPokeChangeMm).toBeGreaterThan(0);
    });
    it('symmetry: swap => diffs flip sign', () => {
      const r1 = calculateWheelOffset(8, 35, 9, 45);
      const r2 = calculateWheelOffset(9, 45, 8, 35);
      expect(r1.innerClearanceChangeMm).toBeCloseTo(-r2.innerClearanceChangeMm, 1);
    });
    it('known value: 8 ET35 -> 9 ET45', () => {
      const r = calculateWheelOffset(8, 35, 9, 45);
      expect(r.innerClearanceChangeMm).toBeCloseTo(-22.7, 1);
      expect(r.outerPokeChangeMm).toBeCloseTo(2.7, 1);
    });
  });

  describe('Compression Ratio', () => {
    it('known value: 86/86/45/5/0/87/1.2/0.5 => 9.32:1', () => {
      const r = calculateCompressionRatio(86, 86, 45, 5, 0, 87, 1.2, 0.5, 'mm');
      expect(r.compressionRatio).toBeCloseTo(9.32, 2);
    });
    it('identity: zero clearance volume => infinite CR (edge case)', () => {
      const r = calculateCompressionRatio(86, 86, 0, 0, 0, 87, 0, 0, 'mm');
      expect(r.compressionRatio).toBe(Infinity);
    });
    it('directional: larger chamber => lower CR', () => {
      const r1 = calculateCompressionRatio(86, 86, 45, 5, 0, 87, 1.2, 0.5, 'mm');
      const r2 = calculateCompressionRatio(86, 86, 55, 5, 0, 87, 1.2, 0.5, 'mm');
      expect(r2.compressionRatio).toBeLessThan(r1.compressionRatio);
    });
  });

  describe('Power-to-Weight', () => {
    it('known value: 300hp 3000lb => 0.1 hp/lb', () => {
      const r = calculatePowerToWeight(300, 'hp', 3000, 'lb');
      expect(r.hpPerLb).toBeCloseTo(0.1, 3);
      expect(r.hpPerTon).toBeCloseTo(200, 0);
    });
    it('identity: same power and weight => 1:1 ratio', () => {
      const r = calculatePowerToWeight(300, 'hp', 300, 'lb');
      expect(r.hpPerLb).toBeCloseTo(1, 3);
    });
    it('directional: more power => higher ratio', () => {
      const r1 = calculatePowerToWeight(300, 'hp', 3000, 'lb');
      const r2 = calculatePowerToWeight(400, 'hp', 3000, 'lb');
      expect(r2.hpPerLb).toBeGreaterThan(r1.hpPerLb);
    });
    it('unit conversion: hp to kW', () => {
      const r = calculatePowerToWeight(300, 'hp', 3000, 'lb');
      expect(r.kwPerKg).toBeCloseTo(0.164, 2);
    });
  });

  describe('Engine Displacement', () => {
    it('known value: 86/86/4 => 1998 cc', () => {
      const r = calculateEngineDisplacement(86, 86, 4, 'mm');
      expect(r.totalDisplacementCc).toBeCloseTo(1998, 0);
      expect(r.totalDisplacementL).toBeCloseTo(2.0, 1);
    });
    it('identity: zero cylinders => zero displacement', () => {
      const r = calculateEngineDisplacement(86, 86, 0, 'mm');
      expect(r.totalDisplacementCc).toBe(0);
    });
    it('directional: more cylinders => more displacement', () => {
      const r1 = calculateEngineDisplacement(86, 86, 4, 'mm');
      const r2 = calculateEngineDisplacement(86, 86, 6, 'mm');
      expect(r2.totalDisplacementCc).toBeGreaterThan(r1.totalDisplacementCc);
    });
    it('unit conversion: mm to inches', () => {
      const r = calculateEngineDisplacement(86, 86, 4, 'mm');
      expect(r.totalDisplacementCi).toBeCloseTo(121.9, 1);
    });
  });

  describe('Horsepower', () => {
    it('known value: 400lb-ft 6000rpm => 457 hp', () => {
      const r = calculateHorsepower(400, 'lb-ft', 6000);
      expect(r.hp).toBeCloseTo(457, 0);
      expect(r.kw).toBeCloseTo(341, 0);
    });
    it('identity: zero torque => zero hp', () => {
      const r = calculateHorsepower(0, 'lb-ft', 6000);
      expect(r.hp).toBe(0);
    });
    it('directional: more torque => more hp', () => {
      const r1 = calculateHorsepower(400, 'lb-ft', 6000);
      const r2 = calculateHorsepower(500, 'lb-ft', 6000);
      expect(r2.hp).toBeGreaterThan(r1.hp);
    });
    it('5252 crossover: torque = hp at 5252 rpm', () => {
      const r = calculateHorsepower(525, 'lb-ft', 5252);
      expect(r.hp).toBeCloseTo(525, 0);
    });
  });

  describe('Fuel Injector', () => {
    it('known value: 400hp 0.5 4 0.8 0.75 => 630 cc/min', () => {
      const r = calculateFuelInjector(400, 0.5, 4, 0.8, 0.75);
      expect(r.perInjectorCcMin).toBeCloseTo(630, 0);
      expect(r.perInjectorLbHr).toBeCloseTo(62.5, 1);
    });
    it('identity: zero hp => zero flow', () => {
      const r = calculateFuelInjector(0, 0.5, 4, 0.8, 0.75);
      expect(r.totalLbHr).toBe(0);
    });
    it('directional: more hp => more flow', () => {
      const r1 = calculateFuelInjector(400, 0.5, 4, 0.8, 0.75);
      const r2 = calculateFuelInjector(500, 0.5, 4, 0.8, 0.75);
      expect(r2.totalLbHr).toBeGreaterThan(r1.totalLbHr);
    });
  });

  describe('Quarter Mile', () => {
    it('known value: 3500lb 400hp => 12.0s 113.6mph', () => {
      const r = calculateQuarterMile(3500, 'lb', 400);
      expect(r.etSeconds).toBeCloseTo(12.0, 1);
      expect(r.trapSpeedMph).toBeCloseTo(113.6, 1);
    });
    it('identity: zero hp => infinite ET (edge case)', () => {
      const r = calculateQuarterMile(3500, 'lb', 0);
      expect(r.etSeconds).toBe(Infinity);
    });
    it('directional: more hp => faster ET', () => {
      const r1 = calculateQuarterMile(3500, 'lb', 400);
      const r2 = calculateQuarterMile(3500, 'lb', 500);
      expect(r2.etSeconds).toBeLessThan(r1.etSeconds);
    });
  });

  describe('Tire Size', () => {
    it('known value: 225/45R17 vs 235/40R18', () => {
      const r = calculateTireSize({ tireAWidth: 225, tireAAspect: 45, tireARim: 17, tireBWidth: 235, tireBAspect: 40, tireBRim: 18 });
      expect(r.tireA.diameterMm).toBeCloseTo(634.3, 1);
      expect(r.tireB.diameterMm).toBeCloseTo(645.2, 1);
      expect(r.comparison.diameterDiffMm).toBeCloseTo(10.9, 1);
      expect(r.comparison.speedometerErrorPct).toBeCloseTo(-1.7, 1);
      expect(r.comparison.speedometerReadingAt60).toBeCloseTo(61.0, 1);
      expect(r.tireA.revsPerMile).toBeCloseTo(808, 0);
      expect(r.tireB.revsPerMile).toBeCloseTo(794, 0);
    });
    it('known value: 325/45R17 vs 289/40R18', () => {
      const r = calculateTireSize({ tireAWidth: 325, tireAAspect: 45, tireARim: 17, tireBWidth: 289, tireBAspect: 40, tireBRim: 18 });
      expect(r.tireA.diameterMm).toBeCloseTo(724.3, 1);
      expect(r.tireB.diameterMm).toBeCloseTo(688.4, 1);
      expect(r.comparison.diameterDiffMm).toBeCloseTo(-35.9, 1);
      expect(r.comparison.speedometerErrorPct).toBeCloseTo(5.2, 1);
      expect(r.comparison.speedometerReadingAt60).toBeCloseTo(57.0, 1);
    });
    it('identity: identical tires => zero diff', () => {
      const r = calculateTireSize({ tireAWidth: 225, tireAAspect: 45, tireARim: 17, tireBWidth: 225, tireBAspect: 45, tireBRim: 17 });
      expect(r.comparison.diameterDiffMm).toBe(0);
      expect(r.comparison.speedometerErrorPct).toBe(0);
    });
    it('symmetry: swap => diffs flip sign', () => {
      const r1 = calculateTireSize({ tireAWidth: 225, tireAAspect: 45, tireARim: 17, tireBWidth: 235, tireBAspect: 40, tireBRim: 18 });
      const r2 = calculateTireSize({ tireAWidth: 235, tireAAspect: 40, tireARim: 18, tireBWidth: 225, tireBAspect: 45, tireBRim: 17 });
      expect(r1.comparison.diameterDiffMm).toBeCloseTo(-r2.comparison.diameterDiffMm, 1);
    });
    it('directional: larger B => speedometer reads low', () => {
      const r = calculateTireSize({ tireAWidth: 225, tireAAspect: 45, tireARim: 17, tireBWidth: 235, tireBAspect: 40, tireBRim: 18 });
      expect(r.comparison.speedometerErrorPct).toBeLessThan(0);
      expect(r.comparison.speedometerReadingAt60).toBeGreaterThan(60);
    });
    it('fuzz: 1000 random inputs => no NaN/Infinity', () => {
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
});

describe('GATE 2: Input Handling — All Calculators', () => {
  describe('Wheel Offset', () => {
    it('handles zero width', () => {
      const r = calculateWheelOffset(0, 35, 9, 45);
      expect(isFinite(r.innerClearanceChangeMm)).toBe(true);
    });
    it('handles negative offset', () => {
      const r = calculateWheelOffset(8, -35, 9, 45);
      expect(isFinite(r.innerClearanceChangeMm)).toBe(true);
    });
  });

  describe('Compression Ratio', () => {
    it('handles zero chamber volume', () => {
      const r = calculateCompressionRatio(86, 86, 0, 0, 0, 87, 0, 0, 'mm');
      expect(r.compressionRatio).toBe(Infinity);
    });
  });

  describe('Power-to-Weight', () => {
    it('handles zero power', () => {
      const r = calculatePowerToWeight(0, 'hp', 3000, 'lb');
      expect(r.hpPerLb).toBe(0);
    });
  });

  describe('Engine Displacement', () => {
    it('handles zero cylinders', () => {
      const r = calculateEngineDisplacement(86, 86, 0, 'mm');
      expect(r.totalDisplacementCc).toBe(0);
    });
  });

  describe('Horsepower', () => {
    it('handles zero torque', () => {
      const r = calculateHorsepower(0, 'lb-ft', 6000);
      expect(r.hp).toBe(0);
    });
  });

  describe('Fuel Injector', () => {
    it('handles zero hp', () => {
      const r = calculateFuelInjector(0, 0.5, 4, 0.8, 0.75);
      expect(r.totalLbHr).toBe(0);
    });
  });

  describe('Quarter Mile', () => {
    it('handles zero hp', () => {
      const r = calculateQuarterMile(3500, 'lb', 0);
      expect(r.etSeconds).toBe(Infinity);
    });
  });

  describe('Tire Size', () => {
    it('handles zero width', () => {
      const r = calculateTireSize({ tireAWidth: 0, tireAAspect: 45, tireARim: 17, tireBWidth: 235, tireBAspect: 40, tireBRim: 18 });
      expect(isFinite(r.tireA.diameterMm)).toBe(true);
    });
  });
});