import { LB_TO_KG } from '../units/index.ts';
import { validatePositive, mergeValidations } from '../validation/index.ts';

export interface QuarterMileInput {
  weight: number;
  weightUnit: 'lb' | 'kg';
  horsepower: number;
  powerType?: 'crank' | 'wheel';
}

export interface QuarterMileResult {
  etSeconds: number;
  trapSpeedMph: number;
  powerToWeightRatio: number;
  interpretation: string;
}

const ET_CONSTANT = 5.825;
const TRAP_SPEED_CONSTANT = 234;

export function calculateQuarterMile(input: QuarterMileInput): QuarterMileResult {
  const { weight, weightUnit, horsepower, powerType } = input;
  
  const weightLb = weightUnit === 'lb' ? weight : weight / LB_TO_KG;
  
  const powerToWeight = horsepower / weightLb;
  
  const etSeconds = ET_CONSTANT * Math.pow(weightLb / horsepower, 1/3);
  const trapSpeedMph = TRAP_SPEED_CONSTANT * Math.pow(horsepower / weightLb, 1/3);
  
  const powerTypeLabel = powerType ? ` (${powerType} hp)` : '';
  
  const interpretation = 
    `Estimated: ${etSeconds.toFixed(2)}s @ ${trapSpeedMph.toFixed(1)} MPH ` +
    `(${weightLb.toLocaleString()} lb, ${horsepower} hp${powerTypeLabel}). ` +
    `Power-to-weight: ${powerToWeight.toFixed(4)} hp/lb. ` +
    `⚠ This is an empirical estimate, not a prediction. Actual results depend on traction, gearing, launch, aero, drivetrain, weather, track, and driver.`;
  
  return {
    etSeconds,
    trapSpeedMph,
    powerToWeightRatio: powerToWeight,
    interpretation,
  };
}

export function validateQuarterMile(input: QuarterMileInput) {
  const validations = [
    validatePositive(input.weight, 'Vehicle weight'),
    validatePositive(input.horsepower, 'Horsepower'),
  ];
  
  return mergeValidations(...validations);
}