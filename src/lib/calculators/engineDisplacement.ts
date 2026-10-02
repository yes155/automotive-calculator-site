import { PI_OVER_4 } from '../units/index.ts';
import { validatePositive, validateInteger, mergeValidations } from '../validation/index.ts';

export interface EngineDisplacementInput {
  bore: number;
  stroke: number;
  cylinders: number;
  unitSystem: 'mm' | 'in';
}

export interface EngineDisplacementResult {
  totalDisplacementCc: number;
  totalDisplacementL: number;
  totalDisplacementCi: number;
  perCylinderCc: number;
  boreStrokeRatio: number;
  geometryDescription: string;
  interpretation: string;
}

const INCH_TO_MM = 25.4;
const CC_TO_CI = 16.387064;

function toMm(value: number, unitSystem: 'mm' | 'in'): number {
  return unitSystem === 'in' ? value * INCH_TO_MM : value;
}

export function calculateEngineDisplacement(input: EngineDisplacementInput): EngineDisplacementResult {
  const { bore, stroke, cylinders, unitSystem } = input;
  
  const boreMm = toMm(bore, unitSystem);
  const strokeMm = toMm(stroke, unitSystem);
  
  const perCylinderCc = PI_OVER_4 * boreMm * boreMm * strokeMm / 1000;
  const totalDisplacementCc = perCylinderCc * cylinders;
  const totalDisplacementL = totalDisplacementCc / 1000;
  const totalDisplacementCi = totalDisplacementCc / CC_TO_CI;
  
  const boreStrokeRatio = boreMm / strokeMm;
  
  let geometryDescription: string;
  if (boreStrokeRatio > 1.05) {
    geometryDescription = 'Oversquare (bore > stroke) — favors high RPM power';
  } else if (boreStrokeRatio < 0.95) {
    geometryDescription = 'Undersquare (stroke > bore) — favors low-end torque';
  } else {
    geometryDescription = 'Square (bore ≈ stroke) — balanced characteristics';
  }
  
  const interpretation = 
    `Total displacement: ${totalDisplacementCc.toFixed(0)} cc (${totalDisplacementL.toFixed(2)} L, ${totalDisplacementCi.toFixed(1)} cu in). ` +
    `Per cylinder: ${perCylinderCc.toFixed(1)} cc. ` +
    `Bore/stroke ratio: ${boreStrokeRatio.toFixed(2)} — ${geometryDescription}. ` +
    `Note: Bore/stroke ratio is descriptive geometry, not a performance predictor.`;
  
  return {
    totalDisplacementCc,
    totalDisplacementL,
    totalDisplacementCi,
    perCylinderCc,
    boreStrokeRatio,
    geometryDescription,
    interpretation,
  };
}

export function validateEngineDisplacement(input: EngineDisplacementInput) {
  const validations = [
    validatePositive(input.bore, 'Bore'),
    validatePositive(input.stroke, 'Stroke'),
    validatePositive(input.cylinders, 'Cylinders'),
    validateInteger(input.cylinders, 'Cylinders'),
  ];
  
  return mergeValidations(...validations);
}
