export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validatePositive(value: number, fieldName: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (value <= 0) {
    errors.push(`${fieldName} must be greater than zero`);
  }
  
  return { valid: errors.length === 0, errors, warnings };
}

export function validateNonNegative(value: number, fieldName: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (value < 0) {
    errors.push(`${fieldName} cannot be negative`);
  }
  
  return { valid: errors.length === 0, errors, warnings };
}

export function validateRange(
  value: number,
  fieldName: string,
  min: number,
  max: number,
  warnMin?: number,
  warnMax?: number
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (value < min || value > max) {
    errors.push(`${fieldName} must be between ${min} and ${max}`);
  }
  
  if (warnMin !== undefined && warnMax !== undefined) {
    if (value < warnMin || value > warnMax) {
      warnings.push(`${fieldName} is outside typical range (${warnMin}–${warnMax})`);
    }
  }
  
  return { valid: errors.length === 0, errors, warnings };
}

export function validateInteger(value: number, fieldName: string): ValidationResult {
  const errors: string[] = [];
  
  if (!Number.isInteger(value)) {
    errors.push(`${fieldName} must be a whole number`);
  }
  
  return { valid: errors.length === 0, errors, warnings: [] };
}

export function mergeValidations(...results: ValidationResult[]): ValidationResult {
  const errors = results.flatMap(r => r.errors);
  const warnings = results.flatMap(r => r.warnings);
  return { valid: errors.length === 0, errors, warnings };
}