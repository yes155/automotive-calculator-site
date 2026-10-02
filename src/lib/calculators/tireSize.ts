import { PI_OVER_4, MM_PER_MILE, MM_PER_KM } from '../calc/index.ts';
import { validatePositive, mergeValidations } from '../validation/index.ts';

export interface TireSizeInput {
  tireAWidth: number;
  tireAAspect: number;
  tireARim: number;
  tireBWidth: number;
  tireBAspect: number;
  tireBRim: number;
}

export interface TireSizeResult {
  tireA: {
    sidewallMm: number;
    diameterMm: number;
    diameterIn: number;
    circumferenceMm: number;
    revsPerMile: number;
    revsPerKm: number;
  };
  tireB: {
    sidewallMm: number;
    diameterMm: number;
    diameterIn: number;
    circumferenceMm: number;
    revsPerMile: number;
    revsPerKm: number;
  };
  comparison: {
    diameterDiffMm: number;
    diameterDiffPct: number;
    circumferenceDiffMm: number;
    circumferenceDiffPct: number;
    groundClearanceChangeMm: number;
    speedometerErrorPct: number;
    speedometerReadingAt60: number;
    speedometerReadingAt30: number;
    speedometerReadingAt45: number;
    speedometerReadingAt70: number;
    speedometerReadingAt80: number;
    verdict: 'ok' | 'caution' | 'not_recommended';
  };
  interpretation: string;
}

const INCH_TO_MM = 25.4;
const MM_TO_IN = 1 / INCH_TO_MM;

export function calculateTireSize(input: TireSizeInput): TireSizeResult {
  const { tireAWidth, tireAAspect, tireARim, tireBWidth, tireBAspect, tireBRim } = input;
  
  const tireASidewall = tireAWidth * tireAAspect / 100;
  const tireADiameterMm = 2 * tireASidewall + tireARim * INCH_TO_MM;
  const tireADiameterIn = tireADiameterMm * MM_TO_IN;
  const tireACircumference = Math.PI * tireADiameterMm;
  const tireARevsPerMile = MM_PER_MILE / tireACircumference;
  const tireARevsPerKm = MM_PER_KM / tireACircumference;
  
  const tireBSidewall = tireBWidth * tireBAspect / 100;
  const tireBDiameterMm = 2 * tireBSidewall + tireBRim * INCH_TO_MM;
  const tireBDiameterIn = tireBDiameterMm * MM_TO_IN;
  const tireBCircumference = Math.PI * tireBDiameterMm;
  const tireBRevsPerMile = MM_PER_MILE / tireBCircumference;
  const tireBRevsPerKm = MM_PER_KM / tireBCircumference;
  
  const diameterDiffMm = tireBDiameterMm - tireADiameterMm;
  const diameterDiffPct = (diameterDiffMm / tireADiameterMm) * 100;
  const circumferenceDiffMm = tireBCircumference - tireACircumference;
  const circumferenceDiffPct = (circumferenceDiffMm / tireACircumference) * 100;
  const groundClearanceChangeMm = diameterDiffMm / 2;
  
  const speedometerErrorPct = (tireADiameterMm / tireBDiameterMm - 1) * 100;
  const speedometerReadingAt60 = 60 * (tireBDiameterMm / tireADiameterMm);
  const speedometerReadingAt30 = 30 * (tireBDiameterMm / tireADiameterMm);
  const speedometerReadingAt45 = 45 * (tireBDiameterMm / tireADiameterMm);
  const speedometerReadingAt70 = 70 * (tireBDiameterMm / tireADiameterMm);
  const speedometerReadingAt80 = 80 * (tireBDiameterMm / tireADiameterMm);
  const verdict = Math.abs(diameterDiffPct) <= 3 ? 'ok' : Math.abs(diameterDiffPct) <= 5 ? 'caution' : 'not_recommended';
  
  const interpretation = 
    `Tire B is ${Math.abs(diameterDiffMm).toFixed(1)} mm (${Math.abs(diameterDiffPct).toFixed(1)}%) ` +
    `${diameterDiffMm === 0 ? 'unchanged' : diameterDiffMm > 0 ? 'larger' : 'smaller'} in diameter than Tire A. ` +
    `Ground clearance changes by ${Math.abs(groundClearanceChangeMm).toFixed(1)} mm. ` +
    `At 60 MPH indicated, actual speed = ${speedometerReadingAt60.toFixed(1)} MPH ` +
    (speedometerErrorPct === 0 ? '(no nominal speedometer change). ' : `(speedometer reads ${speedometerErrorPct > 0 ? 'high' : 'low'} by ${Math.abs(speedometerErrorPct).toFixed(1)}%). `) +
    `Note: Nominal tire dimensions can differ from measured dimensions by model, rim width, pressure, and load.`;
  
  return {
    tireA: {
      sidewallMm: tireASidewall,
      diameterMm: tireADiameterMm,
      diameterIn: tireADiameterIn,
      circumferenceMm: tireACircumference,
      revsPerMile: tireARevsPerMile,
      revsPerKm: tireARevsPerKm,
    },
    tireB: {
      sidewallMm: tireBSidewall,
      diameterMm: tireBDiameterMm,
      diameterIn: tireBDiameterIn,
      circumferenceMm: tireBCircumference,
      revsPerMile: tireBRevsPerMile,
      revsPerKm: tireBRevsPerKm,
    },
    comparison: {
      diameterDiffMm,
      diameterDiffPct,
      circumferenceDiffMm,
      circumferenceDiffPct,
      groundClearanceChangeMm,
      speedometerErrorPct,
      speedometerReadingAt60,
      speedometerReadingAt30,
      speedometerReadingAt45,
      speedometerReadingAt70,
      speedometerReadingAt80,
      verdict,
    },
    interpretation,
  };
}

export function validateTireSize(input: TireSizeInput) {
  const validations = [
    validatePositive(input.tireAWidth, 'Tire A width'),
    validatePositive(input.tireAAspect, 'Tire A aspect ratio'),
    validatePositive(input.tireARim, 'Tire A rim diameter'),
    validatePositive(input.tireBWidth, 'Tire B width'),
    validatePositive(input.tireBAspect, 'Tire B aspect ratio'),
    validatePositive(input.tireBRim, 'Tire B rim diameter'),
  ];
  
  return mergeValidations(...validations);
}
