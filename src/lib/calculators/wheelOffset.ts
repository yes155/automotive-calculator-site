import { validatePositive, validateRange, mergeValidations } from '../validation/index.ts';

export interface WheelOffsetInput {
  currentWidthIn: number;
  currentOffsetMm: number;
  newWidthIn: number;
  newOffsetMm: number;
}

export interface WheelOffsetResult {
  oldInnerPositionMm: number;
  oldOuterPositionMm: number;
  newInnerPositionMm: number;
  newOuterPositionMm: number;
  innerClearanceChangeMm: number;
  outerPokeChangeMm: number;
  interpretation: string;
}

export function calculateWheelOffset(input: WheelOffsetInput): WheelOffsetResult {
  const { currentWidthIn, currentOffsetMm, newWidthIn, newOffsetMm } = input;
  
  const INCH_TO_MM = 25.4;
  
  const oldHalfWidthMm = (currentWidthIn * INCH_TO_MM) / 2;
  const newHalfWidthMm = (newWidthIn * INCH_TO_MM) / 2;
  
  const oldInnerPosition = oldHalfWidthMm + currentOffsetMm;
  const oldOuterPosition = oldHalfWidthMm - currentOffsetMm;
  const newInnerPosition = newHalfWidthMm + newOffsetMm;
  const newOuterPosition = newHalfWidthMm - newOffsetMm;
  
  const innerClearanceChange = oldInnerPosition - newInnerPosition;
  const outerPokeChange = newOuterPosition - oldOuterPosition;
  
  const innerDescription = innerClearanceChange === 0
    ? 'Inner edge unchanged'
    : `Inner edge moves ${Math.abs(innerClearanceChange).toFixed(1)} mm ${innerClearanceChange > 0 ? 'away from' : 'closer to'} the suspension`;
  const outerDescription = outerPokeChange === 0
    ? 'outer edge unchanged'
    : `outer edge moves ${Math.abs(outerPokeChange).toFixed(1)} mm ${outerPokeChange > 0 ? 'outward toward' : 'inward away from'} the fender`;
  const interpretation = `${innerDescription}; ${outerDescription}.`;
  
  return {
    oldInnerPositionMm: oldInnerPosition,
    oldOuterPositionMm: oldOuterPosition,
    newInnerPositionMm: newInnerPosition,
    newOuterPositionMm: newOuterPosition,
    innerClearanceChangeMm: innerClearanceChange,
    outerPokeChangeMm: outerPokeChange,
    interpretation,
  };
}

export function validateWheelOffset(input: WheelOffsetInput) {
  const validations = [
    validatePositive(input.currentWidthIn, 'Current wheel width'),
    validatePositive(input.newWidthIn, 'New wheel width'),
    validateRange(input.currentWidthIn, 'Current wheel width', 3, 20, 4, 15),
    validateRange(input.newWidthIn, 'New wheel width', 3, 20, 4, 15),
    validateRange(input.currentOffsetMm, 'Current offset', -100, 100, -50, 80),
    validateRange(input.newOffsetMm, 'New offset', -100, 100, -50, 80),
  ];
  
  return mergeValidations(...validations);
}
