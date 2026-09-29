import { PI_OVER_4 } from '../units/index.ts';
import { validatePositive, validateNonNegative, mergeValidations } from '../validation/index.ts';

export interface CompressionRatioInput {
  bore: number;
  stroke: number;
  chamberCc: number;
  pistonDishCc: number;
  pistonDomeCc: number;
  gasketBore: number;
  gasketThickness: number;
  deckClearance: number;
  unitSystem: 'mm' | 'in';
}

export interface CompressionRatioResult {
  compressionRatio: number;
  sweptVolumeCc: number;
  totalClearanceVolumeCc: number;
  componentVolumes: {
    chamberCc: number;
    gasketCc: number;
    deckCc: number;
    dishCc: number;
    domeCc: number;
  };
  interpretation: string;
}

const INCH_TO_MM = 25.4;

function toMm(value: number, unitSystem: 'mm' | 'in'): number {
  return unitSystem === 'in' ? value * INCH_TO_MM : value;
}

export function calculateCompressionRatio(input: CompressionRatioInput): CompressionRatioResult {
  const { bore, stroke, chamberCc, pistonDishCc, pistonDomeCc, gasketBore, gasketThickness, deckClearance, unitSystem } = input;
  
  const boreMm = toMm(bore, unitSystem);
  const strokeMm = toMm(stroke, unitSystem);
  const gasketBoreMm = toMm(gasketBore, unitSystem);
  const gasketThicknessMm = toMm(gasketThickness, unitSystem);
  const deckClearanceMm = toMm(deckClearance, unitSystem);
  
  const sweptVolumeCc = PI_OVER_4 * boreMm * boreMm * strokeMm / 1000;
  
  const gasketVolumeCc = PI_OVER_4 * gasketBoreMm * gasketBoreMm * gasketThicknessMm / 1000;
  
  const deckVolumeCc = PI_OVER_4 * boreMm * boreMm * deckClearanceMm / 1000;
  
  const clearanceVolumeCc = chamberCc + gasketVolumeCc + deckVolumeCc + pistonDishCc - pistonDomeCc;
  
  const compressionRatio = (sweptVolumeCc + clearanceVolumeCc) / clearanceVolumeCc;
  
  const interpretation = 
    `Static compression ratio: ${compressionRatio.toFixed(2)}:1. ` +
    `Swept volume per cylinder: ${sweptVolumeCc.toFixed(1)} cc. ` +
    `Total clearance volume: ${clearanceVolumeCc.toFixed(1)} cc. ` +
    `Note: This is static compression ratio, not dynamic compression ratio.`;
  
  return {
    compressionRatio,
    sweptVolumeCc,
    totalClearanceVolumeCc: clearanceVolumeCc,
    componentVolumes: {
      chamberCc,
      gasketCc: gasketVolumeCc,
      deckCc: deckVolumeCc,
      dishCc: pistonDishCc,
      domeCc: pistonDomeCc,
    },
    interpretation,
  };
}

export function validateCompressionRatio(input: CompressionRatioInput) {
  const validations = [
    validatePositive(input.bore, 'Bore'),
    validatePositive(input.stroke, 'Stroke'),
    validatePositive(input.chamberCc, 'Chamber volume'),
    validateNonNegative(input.pistonDishCc, 'Piston dish volume'),
    validateNonNegative(input.pistonDomeCc, 'Piston dome volume'),
    validatePositive(input.gasketBore, 'Gasket bore'),
    validateNonNegative(input.gasketThickness, 'Gasket thickness'),
    validateNonNegative(input.deckClearance, 'Deck clearance'),
  ];
  
  return mergeValidations(...validations);
}