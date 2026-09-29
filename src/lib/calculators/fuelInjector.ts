import { LB_TO_G } from '../units/index.ts';
import { validatePositive, validateRange, validateInteger, mergeValidations } from '../validation/index.ts';

export interface FuelInjectorInput {
  horsepower: number;
  bsfc: number;
  injectorCount: number;
  dutyCycle: number;
  fuelDensity: number;
}

export interface FuelInjectorResult {
  totalLbHr: number;
  perInjectorLbHr: number;
  perInjectorCcMin: number;
  totalCcMin: number;
  interpretation: string;
}

export function calculateFuelInjector(input: FuelInjectorInput): FuelInjectorResult {
  const { horsepower, bsfc, injectorCount, dutyCycle, fuelDensity } = input;
  
  const totalLbHr = horsepower * bsfc;
  const perInjectorLbHr = totalLbHr / (injectorCount * dutyCycle);
  const perInjectorCcMin = (perInjectorLbHr * LB_TO_G) / 60 / fuelDensity;
  const totalCcMin = perInjectorCcMin * injectorCount;
  
  const interpretation = 
    `Target: ${horsepower} hp × ${bsfc} BSFC = ${totalLbHr.toFixed(1)} lb/hr total. ` +
    `Per injector (${injectorCount} @ ${(dutyCycle * 100).toFixed(0)}% duty): ${perInjectorLbHr.toFixed(1)} lb/hr = ${perInjectorCcMin.toFixed(0)} cc/min @ ${fuelDensity} g/mL. ` +
    `Total flow: ${totalCcMin.toFixed(0)} cc/min. ` +
    `Note: Real sizing depends on fuel pressure, injector characterization, fuel type, target AFR, and system design.`;
  
  return {
    totalLbHr,
    perInjectorLbHr,
    perInjectorCcMin,
    totalCcMin,
    interpretation,
  };
}

export function validateFuelInjector(input: FuelInjectorInput) {
  const validations = [
    validatePositive(input.horsepower, 'Horsepower'),
    validatePositive(input.bsfc, 'BSFC'),
    validateRange(input.bsfc, 'BSFC', 0.3, 0.8, 0.4, 0.6),
    validateInteger(input.injectorCount, 'Injector count'),
    validateRange(input.injectorCount, 'Injector count', 1, 16),
    validateRange(input.dutyCycle, 'Duty cycle', 0.1, 1.0, 0.5, 0.85),
    validatePositive(input.fuelDensity, 'Fuel density'),
    validateRange(input.fuelDensity, 'Fuel density', 0.7, 0.9, 0.72, 0.78),
  ];
  
  return mergeValidations(...validations);
}