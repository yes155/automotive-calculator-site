const INCH_TO_MM = 25.4;
const LB_TO_KG = 0.45359237;
const HP_TO_KW = 0.745699872;
const PI_OVER_4 = Math.PI / 4;

export function calculateWheelOffset(currentWidthIn, currentOffsetMm, newWidthIn, newOffsetMm) {
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
  const interpretation = `New wheel moves ${Math.abs(innerClearanceChange).toFixed(1)} mm ${innerDirection} the suspension and ${Math.abs(outerPokeChange).toFixed(1)} mm ${outerDirection} toward the fender.`;
  return { oldInnerPositionMm: oldInnerPosition, oldOuterPositionMm: oldOuterPosition, newInnerPositionMm: newInnerPosition, newOuterPositionMm: newOuterPosition, innerClearanceChangeMm: innerClearanceChange, outerPokeChangeMm: outerPokeChange, interpretation };
}

export function calculateCompressionRatio(bore, stroke, chamberCc, pistonDishCc, pistonDomeCc, gasketBore, gasketThickness, deckClearance, unitSystem) {
  const toMm = (v) => unitSystem === 'in' ? v * INCH_TO_MM : v;
  const boreMm = toMm(bore), strokeMm = toMm(stroke), gasketBoreMm = toMm(gasketBore), gasketThicknessMm = toMm(gasketThickness), deckClearanceMm = toMm(deckClearance);
  const sweptVolumeCc = PI_OVER_4 * boreMm * boreMm * strokeMm / 1000;
  const gasketVolumeCc = PI_OVER_4 * gasketBoreMm * gasketBoreMm * gasketThicknessMm / 1000;
  const deckVolumeCc = PI_OVER_4 * boreMm * boreMm * deckClearanceMm / 1000;
  const clearanceVolumeCc = chamberCc + gasketVolumeCc + deckVolumeCc + pistonDishCc - pistonDomeCc;
  const compressionRatio = (sweptVolumeCc + clearanceVolumeCc) / clearanceVolumeCc;
  const interpretation = `Static compression ratio: ${compressionRatio.toFixed(2)}:1. Swept volume per cylinder: ${sweptVolumeCc.toFixed(1)} cc. Total clearance volume: ${clearanceVolumeCc.toFixed(1)} cc. Note: This is static compression ratio, not dynamic compression ratio.`;
  return { compressionRatio, sweptVolumeCc, totalClearanceVolumeCc: clearanceVolumeCc, componentVolumes: { chamberCc, gasketCc: gasketVolumeCc, deckCc: deckVolumeCc, dishCc: pistonDishCc, domeCc: pistonDomeCc }, interpretation };
}

export function calculatePowerToWeight(power, powerUnit, weight, weightUnit) {
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
  const interpretation = `${powerHp.toFixed(0)} hp / ${weightLb.toFixed(0)} lb = ${hpPerLb.toFixed(4)} hp/lb (${hpPerTon.toFixed(0)} hp/ton, ${kwPerKg.toFixed(3)} kW/kg, ${wPerKg.toFixed(0)} W/kg).`;
  return { hpPerLb, hpPerTon, kwPerKg, wPerKg, lbPerHp, kgPerKw, interpretation };
}

export function calculateEngineDisplacement(bore, stroke, cylinders, unitSystem) {
  const toMm = (v) => unitSystem === 'in' ? v * INCH_TO_MM : v;
  const boreMm = toMm(bore), strokeMm = toMm(stroke);
  const perCylinderCc = PI_OVER_4 * boreMm * boreMm * strokeMm / 1000;
  const totalDisplacementCc = perCylinderCc * cylinders;
  const totalDisplacementL = totalDisplacementCc / 1000;
  const totalDisplacementCi = totalDisplacementCc / 16.387064;
  const boreStrokeRatio = boreMm / strokeMm;
  let geometryDescription;
  if (boreStrokeRatio > 1.05) geometryDescription = 'Oversquare (bore > stroke) — favors high RPM power';
  else if (boreStrokeRatio < 0.95) geometryDescription = 'Undersquare (stroke > bore) — favors low-end torque';
  else geometryDescription = 'Square (bore ≈ stroke) — balanced characteristics';
  const interpretation = `Total displacement: ${totalDisplacementCc.toFixed(0)} cc (${totalDisplacementL.toFixed(2)} L, ${totalDisplacementCi.toFixed(1)} cu in). Per cylinder: ${perCylinderCc.toFixed(1)} cc. Bore/stroke ratio: ${boreStrokeRatio.toFixed(2)} — ${geometryDescription}. Note: Bore/stroke ratio is descriptive geometry, not a performance predictor.`;
  return { totalDisplacementCc, totalDisplacementL, totalDisplacementCi, perCylinderCc, boreStrokeRatio, geometryDescription, interpretation };
}

export function calculateHorsepower(torque, torqueUnit, rpm) {
  const torqueLbft = torqueUnit === 'lb-ft' ? torque : torque * 0.737562149;
  const torqueNm = torqueUnit === 'nm' ? torque : torque / 0.737562149;
  const hp = (torqueLbft * rpm) / 5252.113;
  const kw = (torqueNm * rpm) / 9549.297;
  const interpretation = `${torqueLbft.toFixed(1)} lb-ft @ ${rpm.toLocaleString()} RPM = ${hp.toFixed(1)} hp (${kw.toFixed(1)} kW). At 5,252 RPM, torque (lb-ft) equals horsepower.`;
  return { hp, kw, torqueLbft, torqueNm, interpretation };
}

export function calculateFuelInjector(horsepower, bsfc, injectorCount, dutyCycle, fuelDensity) {
  const totalLbHr = horsepower * bsfc;
  const perInjectorLbHr = totalLbHr / (injectorCount * dutyCycle);
  const perInjectorCcMin = (perInjectorLbHr * 453.59237) / 60 / fuelDensity;
  const totalCcMin = perInjectorCcMin * injectorCount;
  const interpretation = `Target: ${horsepower} hp × ${bsfc} BSFC = ${totalLbHr.toFixed(1)} lb/hr total. Per injector (${injectorCount} @ ${(dutyCycle * 100).toFixed(0)}% duty): ${perInjectorLbHr.toFixed(1)} lb/hr = ${perInjectorCcMin.toFixed(0)} cc/min @ ${fuelDensity} g/mL. Total flow: ${totalCcMin.toFixed(0)} cc/min. Note: Real sizing depends on fuel pressure, injector characterization, fuel type, target AFR, and system design.`;
  return { totalLbHr, perInjectorLbHr, perInjectorCcMin, totalCcMin, interpretation };
}

export function calculateQuarterMile(weight, weightUnit, horsepower, powerType) {
  const weightLb = weightUnit === 'lb' ? weight : weight / LB_TO_KG;
  const powerToWeight = horsepower / weightLb;
  const etSeconds = 5.825 * Math.pow(weightLb / horsepower, 1/3);
  const trapSpeedMph = 234 * Math.pow(horsepower / weightLb, 1/3);
  const powerTypeLabel = powerType ? ` (${powerType} hp)` : '';
  const interpretation = `Estimated: ${etSeconds.toFixed(2)}s @ ${trapSpeedMph.toFixed(1)} MPH (${weightLb.toLocaleString()} lb, ${horsepower} hp${powerTypeLabel}). Power-to-weight: ${powerToWeight.toFixed(4)} hp/lb. This is an empirical estimate, not a prediction. Actual results depend on traction, gearing, launch, aero, drivetrain, weather, track, and driver.`;
  return { etSeconds, trapSpeedMph, powerToWeightRatio: powerToWeight, interpretation };
}

export function calculateTireSize(tireAWidth, tireAAspect, tireARim, tireBWidth, tireBAspect, tireBRim) {
  const tireASidewall = tireAWidth * tireAAspect / 100;
  const tireADiameterMm = 2 * tireASidewall + tireARim * INCH_TO_MM;
  const tireADiameterIn = tireADiameterMm / INCH_TO_MM;
  const tireACircumference = Math.PI * tireADiameterMm;
  const tireARevsPerMile = 63360 / tireACircumference;
  const tireBSidewall = tireBWidth * tireBAspect / 100;
  const tireBDiameterMm = 2 * tireBSidewall + tireBRim * INCH_TO_MM;
  const tireBDiameterIn = tireBDiameterMm / INCH_TO_MM;
  const tireBCircumference = Math.PI * tireBDiameterMm;
  const tireBRevsPerMile = 63360 / tireBCircumference;
  const diameterDiffMm = tireBDiameterMm - tireADiameterMm;
  const diameterDiffPct = (diameterDiffMm / tireADiameterMm) * 100;
  const circumferenceDiffMm = tireBCircumference - tireACircumference;
  const circumferenceDiffPct = (circumferenceDiffMm / tireACircumference) * 100;
  const groundClearanceChangeMm = diameterDiffMm / 2;
  const speedometerErrorPct = (tireADiameterMm / tireBDiameterMm - 1) * 100;
  const speedometerReadingAt60 = 60 * (tireBDiameterMm / tireADiameterMm);
  const interpretation = `Tire B is ${Math.abs(diameterDiffMm).toFixed(1)} mm (${Math.abs(diameterDiffPct).toFixed(1)}%) ${diameterDiffMm > 0 ? 'larger' : 'smaller'} in diameter than Tire A. Ground clearance changes by ${Math.abs(groundClearanceChangeMm).toFixed(1)} mm. At 60 MPH indicated, actual speed = ${speedometerReadingAt60.toFixed(1)} MPH (speedometer reads ${speedometerErrorPct > 0 ? 'high' : 'low'} by ${Math.abs(speedometerErrorPct).toFixed(1)}%). Note: Nominal tire dimensions can differ from measured dimensions by model, rim width, pressure, and load.`;
  return { tireA: { sidewallMm: tireASidewall, diameterMm: tireADiameterMm, diameterIn: tireADiameterIn, circumferenceMm: tireACircumference, revsPerMile: tireARevsPerMile }, tireB: { sidewallMm: tireBSidewall, diameterMm: tireBDiameterMm, diameterIn: tireBDiameterIn, circumferenceMm: tireBCircumference, revsPerMile: tireBRevsPerMile }, comparison: { diameterDiffMm, diameterDiffPct, circumferenceDiffMm, circumferenceDiffPct, groundClearanceChangeMm, speedometerErrorPct, speedometerReadingAt60 }, interpretation };
}
