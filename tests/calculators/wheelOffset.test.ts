import { describe, it, expect } from 'vitest';
import { calculateWheelOffset, type WheelOffsetInput } from '../../src/lib/calculators/wheelOffset.ts';

describe('Wheel Offset Calculator', () => {
  it('same wheel returns zero changes', () => {
    const input: WheelOffsetInput = {
      currentWidthIn: 8,
      currentOffsetMm: 35,
      newWidthIn: 8,
      newOffsetMm: 35,
    };
    
    const result = calculateWheelOffset(input);
    
    expect(result.innerClearanceChangeMm).toBe(0);
    expect(result.outerPokeChangeMm).toBe(0);
  });

  it('wider wheel same ET extends both inner and outer equally', () => {
    const input: WheelOffsetInput = {
      currentWidthIn: 8,
      currentOffsetMm: 35,
      newWidthIn: 9,
      newOffsetMm: 35,
    };
    
    const result = calculateWheelOffset(input);
    
    // 1 inch = 25.4mm, half = 12.7mm
    expect(result.innerClearanceChangeMm).toBeCloseTo(-12.7, 1);
    expect(result.outerPokeChangeMm).toBeCloseTo(12.7, 1);
  });

  it('same width more positive offset moves wheel outward', () => {
    const input: WheelOffsetInput = {
      currentWidthIn: 8,
      currentOffsetMm: 35,
      newWidthIn: 8,
      newOffsetMm: 45,
    };
    
    const result = calculateWheelOffset(input);
    
    // +10mm offset: inner moves 10mm closer to suspension (less clearance = negative), outer moves 10mm outward (positive)
    expect(result.innerClearanceChangeMm).toBeCloseTo(-10, 1);
    expect(result.outerPokeChangeMm).toBeCloseTo(-10, 1);
  });

  it('same width more negative offset moves wheel inward', () => {
    const input: WheelOffsetInput = {
      currentWidthIn: 8,
      currentOffsetMm: 35,
      newWidthIn: 8,
      newOffsetMm: 25,
    };
    
    const result = calculateWheelOffset(input);
    
    // -10mm offset: inner moves 10mm away from suspension (more clearance = positive), outer moves 10mm inward (negative)
    expect(result.innerClearanceChangeMm).toBeCloseTo(10, 1);
    expect(result.outerPokeChangeMm).toBeCloseTo(10, 1);
  });

  it('calculates positions correctly', () => {
    const input: WheelOffsetInput = {
      currentWidthIn: 8,
      currentOffsetMm: 35,
      newWidthIn: 9,
      newOffsetMm: 45,
    };
    
    const result = calculateWheelOffset(input);
    
    // Old: half = 101.6, inner = 136.6, outer = 66.6
    // New: half = 114.3, inner = 159.3, outer = 69.3
    expect(result.oldInnerPositionMm).toBeCloseTo(136.6, 1);
    expect(result.oldOuterPositionMm).toBeCloseTo(66.6, 1);
    expect(result.newInnerPositionMm).toBeCloseTo(159.3, 1);
    expect(result.newOuterPositionMm).toBeCloseTo(69.3, 1);
  });

  it('handles negative offset correctly', () => {
    const input: WheelOffsetInput = {
      currentWidthIn: 7,
      currentOffsetMm: -10,
      newWidthIn: 7.5,
      newOffsetMm: -5,
    };
    
    const result = calculateWheelOffset(input);
    
    // 7 in = 177.8mm, half = 88.9mm. With offset -10: inner = 78.9, outer = 98.9
    expect(result.oldInnerPositionMm).toBeCloseTo(78.9, 1);
    expect(result.oldOuterPositionMm).toBeCloseTo(98.9, 1);
  });

  it('produces readable interpretation', () => {
    const input: WheelOffsetInput = {
      currentWidthIn: 8,
      currentOffsetMm: 35,
      newWidthIn: 9,
      newOffsetMm: 45,
    };
    
    const result = calculateWheelOffset(input);
    
    expect(result.interpretation).toContain('mm');
    expect(result.interpretation).toContain('suspension');
    expect(result.interpretation).toContain('fender');
  });
});