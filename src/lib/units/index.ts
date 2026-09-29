export const INCH_TO_MM = 25.4;
export const LB_TO_KG = 0.45359237;
export const HP_TO_KW = 0.745699872;
export const NM_TO_LBFT = 0.737562149;
export const LB_TO_G = 453.59237;
export const PI_OVER_4 = Math.PI / 4;

export function inchesToMm(inches: number): number {
  return inches * INCH_TO_MM;
}

export function mmToInches(mm: number): number {
  return mm / INCH_TO_MM;
}

export function lbToKg(lb: number): number {
  return lb * LB_TO_KG;
}

export function kgToLb(kg: number): number {
  return kg / LB_TO_KG;
}

export function hpToKw(hp: number): number {
  return hp * HP_TO_KW;
}

export function kwToHp(kw: number): number {
  return kw / HP_TO_KW;
}

export function nmToLbft(nm: number): number {
  return nm * NM_TO_LBFT;
}

export function lbftToNm(lbft: number): number {
  return lbft / NM_TO_LBFT;
}

export function lbToG(lb: number): number {
  return lb * LB_TO_G;
}

export function roundToDecimals(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}