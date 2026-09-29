import { HP_TO_KW, LB_TO_KG } from '../units/index.ts';
import { validatePositive, mergeValidations } from '../validation/index.ts';

export interface PowerToWeightInput {
  power: number;
  powerUnit: 'hp' | 'kw';
  weight: number;
  weightUnit: 'lb' | 'kg';
}

export interface PowerToWeightResult {
  hpPerLb: number;
  hpPerTon: number;
  kwPerKg: number;
  wPerKg: number;
  lbPerHp: number;
  kgPerKw: number;
  interpretation: string;
}

export function calculatePowerToWeight(input: PowerToWeightInput): PowerToWeightResult {
  const { power, powerUnit, weight, weightUnit } = input;
  
  const powerHp = powerUnit === 'hp' ? power : power / HP_TO_KW;
  const powerKw = powerUnit === 'kw' ? power : power * HP_TO_KW;
  
  const weightLb = weightUnit === 'lb' ? weight : weight / LB_TO_KG;
  const weightKg = weightUnit === 'kg' ? weight : weight * LB_TO_KG;
  
  const hpPerLb = powerHp / weightLb;
  const hpPerTon = powerHp / (weightLb / 2000);
  const kwPerKg = powerKw / weightKg;
  const wPerKg = kwPerKg * 1000;
  const lbPerHp = weightLb / powerHp;
  const kgPerKw = weightKg / powerKw;
  
  const interpretation = 
    `${powerHp.toFixed(0)} hp / ${weightLb.toFixed(0)} lb = ${hpPerLb.toFixed(4)} hp/lb ` +
    `(${hpPerTon.toFixed(0)} hp/ton, ${kwPerKg.toFixed(3)} kW/kg, ${wPerKg.toFixed(0)} W/kg).`;
  
  return {
    hpPerLb,
    hpPerTon,
    kwPerKg,
    wPerKg,
    lbPerHp,
    kgPerKw,
    interpretation,
  };
}

export function validatePowerToWeight(input: PowerToWeightInput) {
  const validations = [
    validatePositive(input.power, 'Power'),
    validatePositive(input.weight, 'Weight'),
  ];
  
  return mergeValidations(...validations);
}