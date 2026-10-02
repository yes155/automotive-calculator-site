import { calculateFuelInjector as calculateFuelInjectorModel } from '../calculators/fuelInjector';
/**
 * Shared calculation engine for automotive calculators.
 * Pure functions, no framework dependencies. Constants defined once.
 */

export const INCH_TO_MM = 25.4;
export const MM_TO_IN = 1 / INCH_TO_MM;
export const INCHES_PER_MILE = 63360;
export const MM_PER_MILE = 1609344;
export const MM_PER_KM = 1000000;
export const PI_OVER_4 = Math.PI / 4;
export const LB_TO_KG = 0.45359237;
export const HP_TO_KW = 0.745699872;
export const CC_TO_CI = 16.387064;

export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function formatNumber(value: number, decimals = 1): string {
  if (!isFinite(value)) return '—';
  return value.toFixed(decimals);
}

export function formatSigned(value: number, decimals = 1): string {
  if (!isFinite(value)) return '—';
  const formatted = Math.abs(value).toFixed(decimals);
  return value >= 0 ? `+${formatted}` : `-${formatted}`;
}

export function safeDivide(a: number, b: number): number {
  if (!isFinite(b)) return NaN;
  const result = a / b;
  return result;
}

export function calculateTireSize(input: {
  tireAWidth: number;
  tireAAspect: number;
  tireARim: number;
  tireBWidth: number;
  tireBAspect: number;
  tireBRim: number;
}) {
  const { tireAWidth, tireAAspect, tireARim, tireBWidth, tireBAspect, tireBRim } = input;

  const tireASidewall = tireAWidth * tireAAspect / 100;
  const tireADiameterMm = 2 * tireASidewall + tireARim * INCH_TO_MM;
  const tireADiameterIn = tireADiameterMm * MM_TO_IN;
  const tireACircumference = Math.PI * tireADiameterMm;
  const tireARevsPerMile = safeDivide(MM_PER_MILE, tireACircumference);
  const tireARevsPerKm = safeDivide(MM_PER_KM, tireACircumference);

  const tireBSidewall = tireBWidth * tireBAspect / 100;
  const tireBDiameterMm = 2 * tireBSidewall + tireBRim * INCH_TO_MM;
  const tireBDiameterIn = tireBDiameterMm * MM_TO_IN;
  const tireBCircumference = Math.PI * tireBDiameterMm;
  const tireBRevsPerMile = safeDivide(MM_PER_MILE, tireBCircumference);
  const tireBRevsPerKm = safeDivide(MM_PER_KM, tireBCircumference);

  const diameterDiffMm = tireBDiameterMm - tireADiameterMm;
  const diameterDiffPct = safeDivide(diameterDiffMm, tireADiameterMm) * 100;
  const circumferenceDiffMm = tireBCircumference - tireACircumference;
  const circumferenceDiffPct = safeDivide(circumferenceDiffMm, tireACircumference) * 100;
  const groundClearanceChangeMm = diameterDiffMm / 2;
  const sidewallDiffMm = tireBSidewall - tireASidewall;
  const rimDiffIn = tireBRim - tireARim;
  const widthDiffMm = tireBWidth - tireAWidth;

  const speedometerErrorPct = (safeDivide(tireADiameterMm, tireBDiameterMm) - 1) * 100;
  const speedometerReadingAt60 = 60 * safeDivide(tireBDiameterMm, tireADiameterMm);
  const speedometerReadingAt30 = 30 * safeDivide(tireBDiameterMm, tireADiameterMm);
  const speedometerReadingAt45 = 45 * safeDivide(tireBDiameterMm, tireADiameterMm);
  const speedometerReadingAt70 = 70 * safeDivide(tireBDiameterMm, tireADiameterMm);
  const speedometerReadingAt80 = 80 * safeDivide(tireBDiameterMm, tireADiameterMm);

  const odometerErrorPer1000Mi = (safeDivide(tireADiameterMm, tireBDiameterMm) - 1) * 1000;
  const odometerErrorPer1000Km = (safeDivide(tireADiameterMm, tireBDiameterMm) - 1) * 1000;

  const absPct = Math.abs(diameterDiffPct);
  let verdict: 'ok' | 'caution' | 'not_recommended';
  if (absPct <= 3) verdict = 'ok';
  else if (absPct <= 5) verdict = 'caution';
  else verdict = 'not_recommended';

  const interpretation =
    `Tire B is ${formatNumber(Math.abs(diameterDiffMm))} mm (${formatNumber(Math.abs(diameterDiffPct))}%) ` +
    `${diameterDiffMm > 0 ? 'larger' : 'smaller'} in diameter than Tire A. ` +
    `Ground clearance changes by ${formatNumber(Math.abs(groundClearanceChangeMm))} mm. ` +
    `At 60 MPH indicated, actual speed = ${formatNumber(speedometerReadingAt60)} MPH ` +
    `(speedometer reads ${speedometerErrorPct > 0 ? 'high' : 'low'} by ${formatNumber(Math.abs(speedometerErrorPct))}%). ` +
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
      sidewallDiffMm,
      rimDiffIn,
      widthDiffMm,
      speedometerErrorPct,
      speedometerReadingAt30,
      speedometerReadingAt45,
      speedometerReadingAt60,
      speedometerReadingAt70,
      speedometerReadingAt80,
      odometerErrorPer1000Mi,
      odometerErrorPer1000Km,
      verdict,
    },
    interpretation,
  };
}

export function parseTireSize(str: string): { width: number; aspect: number; rim: number } | null {
  const match = str.trim().match(/^(\d{3})\/(\d{2,3})R(\d{2})$/i);
  if (!match) return null;
  return {
    width: parseInt(match[1], 10),
    aspect: parseInt(match[2], 10),
    rim: parseInt(match[3], 10),
  };
}

export function validateTireInput(width: number, aspect: number, rim: number): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!isFinite(width) || width <= 0) errors.push('Width must be a positive number');
  if (!isFinite(aspect) || aspect <= 0) errors.push('Aspect ratio must be a positive number');
  if (!isFinite(rim) || rim <= 0) errors.push('Rim diameter must be a positive number');

  if (isFinite(width) && (width < 105 || width > 405)) warnings.push('Width outside common range (105–405 mm)');
  if (isFinite(aspect) && (aspect < 20 || aspect > 90)) warnings.push('Aspect ratio outside common range (20–90)');
  if (isFinite(rim) && (rim < 10 || rim > 26)) warnings.push('Rim diameter outside common range (10–26 in)');

  return { valid: errors.length === 0, errors, warnings };
}

export function calculateWheelOffset(currentWidthIn: number, currentOffsetMm: number, newWidthIn: number, newOffsetMm: number) {
  const oldHalfWidthMm = (currentWidthIn * INCH_TO_MM) / 2;
  const newHalfWidthMm = (newWidthIn * INCH_TO_MM) / 2;
  const oldInnerPosition = oldHalfWidthMm + currentOffsetMm;
  const oldOuterPosition = oldHalfWidthMm - currentOffsetMm;
  const newInnerPosition = newHalfWidthMm + newOffsetMm;
  const newOuterPosition = newHalfWidthMm - newOffsetMm;
  const innerClearanceChange = oldInnerPosition - newInnerPosition;
  const outerPokeChange = newOuterPosition - oldOuterPosition;
  const innerDirection = innerClearanceChange > 0 ? 'away from' : 'closer to';
  const outerDirection = outerPokeChange > 0 ? 'farther outward' : 'inward';
  const interpretation = `New wheel moves ${formatNumber(Math.abs(innerClearanceChange))} mm ${innerDirection} the suspension and ${formatNumber(Math.abs(outerPokeChange))} mm ${outerDirection} toward the fender.`;
  return { oldInnerPositionMm: oldInnerPosition, oldOuterPositionMm: oldOuterPosition, newInnerPositionMm: newInnerPosition, newOuterPositionMm: newOuterPosition, innerClearanceChangeMm: innerClearanceChange, outerPokeChangeMm: outerPokeChange, interpretation };
}

export function calculateCompressionRatio(bore: number, stroke: number, chamberCc: number, pistonDishCc: number, pistonDomeCc: number, gasketBore: number, gasketThickness: number, deckClearance: number, unitSystem: 'mm' | 'in') {
  const toMm = (v: number) => unitSystem === 'in' ? v * INCH_TO_MM : v;
  const boreMm = toMm(bore), strokeMm = toMm(stroke), gasketBoreMm = toMm(gasketBore), gasketThicknessMm = toMm(gasketThickness), deckClearanceMm = toMm(deckClearance);
  const sweptVolumeCc = PI_OVER_4 * boreMm * boreMm * strokeMm / 1000;
  const gasketVolumeCc = PI_OVER_4 * gasketBoreMm * gasketBoreMm * gasketThicknessMm / 1000;
  const deckVolumeCc = PI_OVER_4 * boreMm * boreMm * deckClearanceMm / 1000;
  const clearanceVolumeCc = chamberCc + gasketVolumeCc + deckVolumeCc + pistonDishCc - pistonDomeCc;
  const compressionRatio = safeDivide(sweptVolumeCc + clearanceVolumeCc, clearanceVolumeCc);
  const interpretation = `Static compression ratio: ${formatNumber(compressionRatio, 2)}:1. Swept volume per cylinder: ${formatNumber(sweptVolumeCc)} cc. Total clearance volume: ${formatNumber(clearanceVolumeCc)} cc. Note: This is static compression ratio, not dynamic compression ratio.`;
  return { compressionRatio, sweptVolumeCc, totalClearanceVolumeCc: clearanceVolumeCc, componentVolumes: { chamberCc, gasketCc: gasketVolumeCc, deckCc: deckVolumeCc, dishCc: pistonDishCc, domeCc: pistonDomeCc }, interpretation };
}

export function calculatePowerToWeight(power: number, powerUnit: 'hp' | 'kw', weight: number, weightUnit: 'lb' | 'kg') {
  const powerHp = powerUnit === 'hp' ? power : power / HP_TO_KW;
  const powerKw = powerUnit === 'kw' ? power : power * HP_TO_KW;
  const weightLb = weightUnit === 'lb' ? weight : weight / LB_TO_KG;
  const weightKg = weightUnit === 'kg' ? weight : weight * LB_TO_KG;
  const hpPerLb = safeDivide(powerHp, weightLb);
  const hpPerTon = safeDivide(powerHp, weightLb / 2000);
  const kwPerKg = safeDivide(powerKw, weightKg);
  const wPerKg = kwPerKg * 1000;
  const lbPerHp = safeDivide(weightLb, powerHp);
  const kgPerKw = safeDivide(weightKg, powerKw);
  const interpretation = `${powerHp.toFixed(0)} hp / ${weightLb.toFixed(0)} lb = ${hpPerLb.toFixed(4)} hp/lb (${hpPerTon.toFixed(0)} hp/ton, ${kwPerKg.toFixed(3)} kW/kg, ${wPerKg.toFixed(0)} W/kg).`;
  return { hpPerLb, hpPerTon, kwPerKg, wPerKg, lbPerHp, kgPerKw, interpretation };
}

export function calculateEngineDisplacement(bore: number, stroke: number, cylinders: number, unitSystem: 'mm' | 'in') {
  const toMm = (v: number) => unitSystem === 'in' ? v * INCH_TO_MM : v;
  const boreMm = toMm(bore), strokeMm = toMm(stroke);
  const perCylinderCc = PI_OVER_4 * boreMm * boreMm * strokeMm / 1000;
  const totalDisplacementCc = perCylinderCc * cylinders;
  const totalDisplacementL = totalDisplacementCc / 1000;
  const totalDisplacementCi = totalDisplacementCc / CC_TO_CI;
  const boreStrokeRatio = safeDivide(boreMm, strokeMm);
  let geometryDescription;
  if (boreStrokeRatio > 1.05) geometryDescription = 'Oversquare (bore > stroke) — favors high RPM power';
  else if (boreStrokeRatio < 0.95) geometryDescription = 'Undersquare (stroke > bore) — favors low-end torque';
  else geometryDescription = 'Square (bore ≈ stroke) — balanced characteristics';
  const interpretation = `Total displacement: ${totalDisplacementCc.toFixed(0)} cc (${totalDisplacementL.toFixed(2)} L, ${totalDisplacementCi.toFixed(1)} cu in). Per cylinder: ${perCylinderCc.toFixed(1)} cc. Bore/stroke ratio: ${boreStrokeRatio.toFixed(2)} — ${geometryDescription}. Note: Bore/stroke ratio is descriptive geometry, not a performance predictor.`;
  return { totalDisplacementCc, totalDisplacementL, totalDisplacementCi, perCylinderCc, boreStrokeRatio, geometryDescription, interpretation };
}

export function calculateHorsepower(torque: number, torqueUnit: 'lb-ft' | 'nm', rpm: number) {
  const torqueLbft = torqueUnit === 'lb-ft' ? torque : torque * 0.737562149;
  const torqueNm = torqueUnit === 'nm' ? torque : torque / 0.737562149;
  const hp = (torqueLbft * rpm) / 5252.113;
  const kw = (torqueNm * rpm) / 9549.297;
  const interpretation = `${torqueLbft.toFixed(1)} lb-ft @ ${rpm.toLocaleString()} RPM = ${hp.toFixed(1)} hp (${kw.toFixed(1)} kW). At 5,252 RPM, torque (lb-ft) equals horsepower.`;
  return { hp, kw, torqueLbft, torqueNm, interpretation };
}

export function calculateFuelInjector(horsepower: number, bsfc: number, injectorCount: number, dutyCycle: number, fuelDensity: number) {
  return calculateFuelInjectorModel({ horsepower, bsfc, injectorCount, dutyCycle, fuelDensity });
}

export function calculateQuarterMile(weight: number, weightUnit: 'lb' | 'kg', horsepower: number, powerType?: 'crank' | 'wheel') {
  const weightLb = weightUnit === 'lb' ? weight : weight / LB_TO_KG;
  const powerToWeight = safeDivide(horsepower, weightLb);
  const etSeconds = 5.825 * Math.pow(safeDivide(weightLb, horsepower), 1 / 3);
  const trapSpeedMph = 234 * Math.pow(safeDivide(horsepower, weightLb), 1 / 3);
  const powerTypeLabel = powerType ? ` (${powerType} hp)` : '';
  const interpretation = `Estimated: ${etSeconds.toFixed(2)}s @ ${trapSpeedMph.toFixed(1)} MPH (${weightLb.toLocaleString()} lb, ${horsepower} hp${powerTypeLabel}). Power-to-weight: ${powerToWeight.toFixed(4)} hp/lb. This is an empirical estimate, not a prediction. Actual results depend on traction, gearing, launch, aero, drivetrain, weather, track, and driver.`;
  return { etSeconds, trapSpeedMph, powerToWeightRatio: powerToWeight, interpretation };
}