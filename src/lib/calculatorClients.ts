import { bindCalculator, renderResult, signed } from './bindCalculator';
import { calculateWheelOffset, validateWheelOffset } from './calculators/wheelOffset';
import { calculateCompressionRatio, validateCompressionRatio } from './calculators/compressionRatio';
import { calculateEngineDisplacement, validateEngineDisplacement } from './calculators/engineDisplacement';
import { calculateHorsepower, validateHorsepower } from './calculators/horsepower';
import { calculateFuelInjector, validateFuelInjector } from './calculators/fuelInjector';
import { calculatePowerToWeight, validatePowerToWeight } from './calculators/powerToWeight';
import { calculateQuarterMile, validateQuarterMile } from './calculators/quarterMile';
import { calculateTireSize, validateTireSize } from './calculators/tireSize';
import { HP_TO_KW, LB_TO_KG, NM_TO_LBFT } from './units';

const weightUnits = { name: 'weightUnit', fields: ['weight'], factors: { lb: LB_TO_KG, kg: 1 } };

bindCalculator('wheel-offset', {
  calculate: calculateWheelOffset, validate: validateWheelOffset,
  labels: { currentWidthIn: 'Current wheel width', currentOffsetMm: 'Current offset (ET)', newWidthIn: 'New wheel width', newOffsetMm: 'New offset (ET)' },
  render: (panel, r) => renderResult(panel, r.interpretation, [
    `${signed(r.innerClearanceChangeMm)} mm`, `${signed(r.outerPokeChangeMm)} mm`,
    `${r.oldInnerPositionMm.toFixed(1)} mm`, `${r.oldOuterPositionMm.toFixed(1)} mm`,
    `${r.newInnerPositionMm.toFixed(1)} mm`, `${r.newOuterPositionMm.toFixed(1)} mm`,
  ]),
});

bindCalculator('compression-ratio', {
  calculate: calculateCompressionRatio, validate: validateCompressionRatio,
  units: [{ name: 'unitSystem', fields: ['bore', 'stroke', 'gasketBore', 'gasketThickness', 'deckClearance'], factors: { mm: 1, in: 25.4 } }],
  render: (panel, r) => renderResult(panel, `${r.compressionRatio.toFixed(2)}:1`, [
    r.sweptVolumeCc, r.totalClearanceVolumeCc, r.componentVolumes.chamberCc,
    r.componentVolumes.gasketCc, r.componentVolumes.deckCc, r.componentVolumes.dishCc, r.componentVolumes.domeCc,
  ].map(value => `${value.toFixed(1)} cc`), r.interpretation),
});

bindCalculator('engine-displacement', {
  calculate: calculateEngineDisplacement, validate: validateEngineDisplacement,
  units: [{ name: 'unitSystem', fields: ['bore', 'stroke'], factors: { mm: 1, in: 25.4 } }],
  render: (panel, r) => renderResult(panel, `${r.totalDisplacementCc.toFixed(0)} cc (${r.totalDisplacementL.toFixed(2)} L, ${r.totalDisplacementCi.toFixed(1)} cu in)`, [
    `${r.perCylinderCc.toFixed(1)} cc`, r.boreStrokeRatio.toFixed(2), r.geometryDescription,
  ], r.interpretation),
});

bindCalculator('horsepower', {
  calculate: calculateHorsepower, validate: validateHorsepower,
  units: [{ name: 'torqueUnit', fields: ['torque'], factors: { 'lb-ft': 1, nm: NM_TO_LBFT }, labels: { 'lb-ft': 'lb-ft', nm: 'N·m' } }],
  render: (panel, r, input) => renderResult(panel, `${r.hp.toFixed(1)} hp (${r.kw.toFixed(1)} kW)`, [
    `${r.torqueLbft.toFixed(1)} lb-ft / ${r.torqueNm.toFixed(1)} N·m`, input.rpm.toLocaleString(),
  ], r.interpretation),
});

bindCalculator('fuel-injector', {
  calculate: calculateFuelInjector, validate: validateFuelInjector,
  render: (panel, r, input) => renderResult(panel, `${r.perInjectorCcMin.toFixed(0)} cc/min (${r.perInjectorLbHr.toFixed(1)} lb/hr)`, [
    `${r.totalLbHr.toFixed(1)} lb/hr (${r.totalCcMin.toFixed(0)} cc/min)`, r.perInjectorLbHr.toFixed(1),
    String(input.injectorCount), `${(input.dutyCycle * 100).toFixed(0)}%`, input.bsfc.toFixed(2), `${input.fuelDensity} g/mL`,
  ], r.interpretation),
});

bindCalculator('power-to-weight', {
  calculate: calculatePowerToWeight, validate: validatePowerToWeight,
  units: [{ name: 'powerUnit', fields: ['power'], factors: { hp: HP_TO_KW, kw: 1 }, labels: { hp: 'hp', kw: 'kW' } }, weightUnits],
  render: (panel, r) => renderResult(panel, `${r.hpPerLb.toFixed(4)} hp/lb`, [
    r.hpPerTon.toFixed(0), r.kwPerKg.toFixed(3), r.wPerKg.toFixed(0), r.lbPerHp.toFixed(2), r.kgPerKw.toFixed(2),
  ], r.interpretation),
});

bindCalculator('quarter-mile', {
  calculate: calculateQuarterMile, validate: validateQuarterMile,
  units: [weightUnits],
  render: (panel, r, input) => renderResult(panel, `${r.etSeconds.toFixed(2)}s @ ${r.trapSpeedMph.toFixed(1)} MPH`, [
    `${(input.weightUnit === 'lb' ? input.weight : input.weight / LB_TO_KG).toLocaleString()} lb`,
    `${input.horsepower} (${input.powerType ?? 'crank'})`, r.powerToWeightRatio.toFixed(4), 'ET: 5.825, Trap: 234',
  ], r.interpretation),
});

bindCalculator('tire-size', {
  calculate: calculateTireSize, validate: validateTireSize,
  labels: { tireAWidth: 'Tire A section width (mm)', tireAAspect: 'Tire A aspect ratio (%)', tireARim: 'Tire A rim diameter (inches)', tireBWidth: 'Tire B section width (mm)', tireBAspect: 'Tire B aspect ratio (%)', tireBRim: 'Tire B rim diameter (inches)' },
  render: (panel, r) => {
    const c = r.comparison;
    const speedoLabel = `Speedometer reads ${Math.abs(c.speedometerErrorPct).toFixed(1)}% ${c.speedometerErrorPct > 0 ? 'high' : 'low'}: 60 shown = ${c.speedometerReadingAt60.toFixed(1)} actual`;
    renderResult(panel, `${signed(c.diameterDiffMm)} mm (${signed(c.diameterDiffPct)}%)`, [
      `${r.tireA.diameterIn.toFixed(2)} in (${r.tireA.diameterMm.toFixed(1)} mm)`,
      `${r.tireB.diameterIn.toFixed(2)} in (${r.tireB.diameterMm.toFixed(1)} mm)`,
      `${signed(c.circumferenceDiffMm)} mm (${signed(c.circumferenceDiffPct)}%)`, `${signed(c.groundClearanceChangeMm)} mm`,
      `${Math.round(r.tireA.revsPerMile).toLocaleString()} / ${Math.round(r.tireB.revsPerMile).toLocaleString()}`,
      `${Math.round(r.tireA.revsPerKm).toLocaleString()} / ${Math.round(r.tireB.revsPerKm).toLocaleString()}`,
      `${c.speedometerReadingAt60.toFixed(1)} MPH actual`, speedoLabel,
    ], r.interpretation);
    const badge = panel.querySelector<HTMLElement>('.verdict-badge');
    if (badge) {
      badge.classList.remove('verdict-ok', 'verdict-warn', 'verdict-bad');
      badge.classList.add(c.verdict === 'ok' ? 'verdict-ok' : c.verdict === 'caution' ? 'verdict-warn' : 'verdict-bad');
      badge.textContent = c.verdict === 'ok' ? 'Within common 3% tolerance' : c.verdict === 'caution' ? 'Caution: 3–5% difference' : 'Not recommended: >5% difference';
    }
    const speeds = [c.speedometerReadingAt30, c.speedometerReadingAt45, c.speedometerReadingAt60, c.speedometerReadingAt70, c.speedometerReadingAt80];
    panel.querySelectorAll('.speedo-table tbody tr td:last-child').forEach((cell, index) => { cell.textContent = speeds[index].toFixed(1); });
  },
});
