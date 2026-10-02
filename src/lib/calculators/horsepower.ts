import { HP_TO_KW } from '../units/index.ts';
import { validatePositive, validateNonNegative, mergeValidations } from '../validation/index.ts';

export interface HorsepowerInput {
  torque: number;
  torqueUnit: 'lb-ft' | 'nm';
  rpm: number;
}

export interface HorsepowerResult {
  hp: number;
  kw: number;
  torqueLbft: number;
  torqueNm: number;
  interpretation: string;
}

const RPM_CONSTANT_HP = 5252.113;
const RPM_CONSTANT_KW = 9549.297;

export function calculateHorsepower(input: HorsepowerInput): HorsepowerResult {
  const { torque, torqueUnit, rpm } = input;
  
  const torqueLbft = torqueUnit === 'lb-ft' ? torque : torque * 0.737562149;
  const torqueNm = torqueUnit === 'nm' ? torque : torque / 0.737562149;
  
  const hp = (torqueLbft * rpm) / RPM_CONSTANT_HP;
  const kw = (torqueNm * rpm) / RPM_CONSTANT_KW;
  
  const interpretation = 
    `${torqueLbft.toFixed(1)} lb-ft @ ${rpm.toLocaleString()} RPM = ${hp.toFixed(1)} hp (${kw.toFixed(1)} kW). ` +
    `At 5,252 RPM, torque (lb-ft) equals horsepower.`;
  
  return {
    hp,
    kw,
    torqueLbft,
    torqueNm,
    interpretation,
  };
}

export function validateHorsepower(input: HorsepowerInput) {
  const validations = [
    validateNonNegative(input.torque, 'Torque'),
    validateNonNegative(input.rpm, 'RPM'),
  ];
  
  return mergeValidations(...validations);
}
