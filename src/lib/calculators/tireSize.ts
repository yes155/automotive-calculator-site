import { PI_OVER_4 } from '../units/index.ts';
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
  };
  tireB: {
    sidewallMm: number;
    diameterMm: number;
    diameterIn: number;
    circumferenceMm: number;
    revsPerMile: number;
  };
  comparison: {
    diameterDiffMm: number;
    diameterDiffPct: number;
    circumferenceDiffMm: number;
    circumferenceDiffPct: number;
    groundClearanceChangeMm: number;
    speedometerErrorPct: number;
    speedometerReadingAt60: number;
  };
  interpretation: string;
}

const INCH_TO_MM = 25.4;
const MM_TO_IN = 1 / INCH_TO_MM;
const INCHES_PER_MILE = 63360;

export function calculateTireSize(input: TireSizeInput): TireSizeResult {
  const { tireAWidth, tireAAspect, tireARim, tireBWidth, tireBAspect, tireBRim } = input;
  
  const tireASidewall = tireAWidth * tireAAspect / 100;
  const tireADiameterMm = 2 * tireASidewall + tireARim * INCH_TO_MM;
  const tireADiameterIn = tireADiameterMm * MM_TO_IN;
  const tireACircumference = Math.PI * tireADiameterMm;
  const tireARevsPerMile = INCHES_PER_MILE / tireACircumference;
  
  const tireBSidewall = tireBWidth * tireBAspect / 100;
  const tireBDiameterMm = 2 * tireBSidewall + tireBRim * INCH_TO_MM;
  const tireBDiameterIn = tireBDiameterMm * MM_TO_IN;
  const tireBCircumference = Math.PI * tireBDiameterMm;
  const tireBRevsPerMile = INCHES_PER_MILE / tireBCircumference;
  
  const diameterDiffMm = tireBDiameterMm - tireADiameterMm;
  const diameterDiffPct = (diameterDiffMm / tireADiameterMm) * 100;
  const circumferenceDiffMm = tireBCircumference - tireACircumference;
  const circumferenceDiffPct = (circumferenceDiffMm / tireACircumference) * 100;
  const groundClearanceChangeMm = diameterDiffMm / 2;
  
  const speedometerErrorPct = (tireADiameterMm / tireBDiameterMm - 1) * 100;
  const speedometerReadingAt60 = 60 * (tireBDiameterMm / tireADiameterMm);
  
  const interpretation = 
    `Tire B is ${Math.abs(diameterDiffMm).toFixed(1)} mm (${Math.abs(diameterDiffPct).toFixed(1)}%) ` +
    `${diameterDiffMm > 0 ? 'larger' : 'smaller'} in diameter than Tire A. ` +
    `Ground clearance changes by ${Math.abs(groundClearanceChangeMm).toFixed(1)} mm. ` +
    `At 60 MPH indicated, actual speed = ${speedometerReadingAt60.toFixed(1)} MPH ` +
    `(speedometer reads ${speedometerErrorPct > 0 ? 'high' : 'low'} by ${Math.abs(speedometerErrorPct).toFixed(1)}%). ` +
    `Note: Nominal tire dimensions can differ from measured dimensions by model, rim width, pressure, and load.`;
  
  return {
    tireA: {
      sidewallMm: tireASidewall,
      diameterMm: tireADiameterMm,
      diameterIn: tireADiameterIn,
      circumferenceMm: tireACircumference,
      revsPerMile: tireARevsPerMile,
    },
    tireB: {
      sidewallMm: tireBSidewall,
      diameterMm: tireBDiameterMm,
      diameterIn: tireBDiameterIn,
      circumferenceMm: tireBCircumference,
      revsPerMile: tireBRevsPerMile,
    },
    comparison: {
      diameterDiffMm,
      diameterDiffPct,
      circumferenceDiffMm,
      circumferenceDiffPct,
      groundClearanceChangeMm,
      speedometerErrorPct,
      speedometerReadingAt60,
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