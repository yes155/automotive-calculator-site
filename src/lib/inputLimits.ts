interface InputLimits {
  min?: number | string;
  max?: number | string;
  step?: number | string;
  unit?: string;
  approximate?: boolean;
}

const numbers = new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 });

export function formatInputLimits({ min, max, step, unit, approximate }: InputLimits): string {
  const hasMin = min !== undefined && min !== '' && Number.isFinite(Number(min));
  const hasMax = max !== undefined && max !== '' && Number.isFinite(Number(max));
  const format = (value: number | string) => numbers.format(Number(value)).replace(/^-/, '−');
  const suffix = unit ? ` ${unit}` : '';
  let range = '';
  if (hasMin && hasMax) range = `${format(min!)}–${format(max!)}${suffix}`;
  else if (hasMin) range = `${format(min!)}${suffix} or greater`;
  else if (hasMax) range = `${format(max!)}${suffix} or less`;

  const numericStep = step === undefined || step === '' ? 1 : Number(step);
  const precision = step === 'any' ? 'Decimals allowed.'
    : numericStep === 1 ? 'Whole numbers only.'
    : Number.isFinite(numericStep) && numericStep > 0 ? `Increments of ${format(numericStep)}${suffix}.` : '';
  return [range ? `Input limits: ${approximate ? 'approximately ' : ''}${range}.` : '', precision].filter(Boolean).join(' ');
}
