import type { ValidationResult } from './validation';
import { formatInputLimits } from './inputLimits';

interface UnitGroup {
  name: string;
  fields: string[];
  factors: Record<string, number>;
  labels?: Record<string, string>;
}

interface Options<Input, Result> {
  calculate: (input: Input) => Result;
  validate: (input: Input) => ValidationResult;
  render: (panel: HTMLElement, result: Result, input: Input) => void;
  labels?: Record<string, string>;
  units?: UnitGroup[];
}

export function renderResult(panel: HTMLElement, primary: string, rows: string[], interpretation?: string) {
  const value = panel.querySelector('.result-value');
  if (value) value.textContent = primary;
  panel.querySelectorAll('.result-row dd').forEach((cell, index) => { cell.textContent = rows[index] ?? ''; });
  const description = panel.querySelector('.result-interpretation');
  if (description && interpretation !== undefined) description.textContent = interpretation;
}

export function signed(value: number, decimals = 1) {
  return `${value > 0 ? '+' : ''}${value.toFixed(decimals)}`;
}

function finiteResult(value: unknown): boolean {
  if (typeof value === 'number') return Number.isFinite(value);
  if (value !== null && typeof value === 'object') return Object.values(value).every(finiteResult);
  return true;
}

export function bindCalculator<Input extends object, Result>(id: string, options: Options<Input, Result>) {
  const form = document.querySelector<HTMLFormElement>(`form[data-calculator="${id}"]`);
  const root = form?.closest('article[data-calculator]');
  const panel = root?.querySelector<HTMLElement>('.result-panel');
  if (!form || !panel) return;

  const message = document.createElement('p');
  message.className = 'calculator-error-summary';
  message.setAttribute('role', 'alert');
  message.hidden = true;
  panel.before(message);
  const warning = document.createElement('p');
  warning.className = 'calculator-warning';
  warning.setAttribute('role', 'status');
  warning.hidden = true;
  panel.before(warning);
  const fields = [...form.querySelectorAll<HTMLInputElement>('input[type="number"]')];
  const defaults = fields.map(field => ({ field, min: field.min, max: field.max, step: field.step }));
  const defaultControls = [...form.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input, select')]
    .map(control => ({ control, value: control.value, checked: control instanceof HTMLInputElement ? control.checked : undefined }));
  const resetUnits: (() => void)[] = [];
  const updateLimits = (field: HTMLInputElement) => {
    const hint = document.getElementById(`${field.name}-limits`);
    if (hint) hint.textContent = formatInputLimits({ min: field.min, max: field.max, step: field.step, unit: field.dataset.unit, approximate: field.dataset.approximateLimits === 'true' });
  };
  let persistInputs = false;
  const errors = new Map<HTMLInputElement, HTMLParagraphElement>();
  fields.forEach(field => {
    const error = document.createElement('p');
    error.id = `${field.id}-client-error`;
    error.className = 'calculator-field-error';
    error.hidden = true;
    field.after(error);
    errors.set(field, error);
    field.setAttribute('aria-describedby', [field.getAttribute('aria-describedby'), error.id].filter(Boolean).join(' '));
  });

  const fail = (messages: string[]) => {
    message.textContent = messages.join(' ');
    message.hidden = false;
    panel.hidden = true;
    warning.hidden = true;
  };

  form.addEventListener('submit', event => {
    event.preventDefault();
    message.hidden = true;
    warning.hidden = true;
    const invalid: HTMLInputElement[] = [];
    const messages: string[] = [];
    fields.forEach(field => {
      const label = options.labels?.[field.name] ?? field.dataset.label ?? field.name;
      const unit = field.dataset.unit ? ` ${field.dataset.unit}` : '';
      let errorText = '';
      if (field.value.trim() === '' || !Number.isFinite(field.valueAsNumber)) {
        errorText = `${label} must be a number.`;
      } else if (field.validity.rangeOverflow || field.validity.rangeUnderflow) {
        errorText = `${label} must be between ${field.min} and ${field.max}${unit}.`;
      } else if (field.validity.stepMismatch) {
        errorText = `${label} must use increments of ${field.step}${unit}.`;
      }
      const error = errors.get(field)!;
      error.textContent = errorText;
      error.hidden = !errorText;
      field.setAttribute('aria-invalid', errorText ? 'true' : 'false');
      if (errorText) { invalid.push(field); messages.push(errorText); }
    });
    if (invalid.length) {
      fail(messages);
      invalid[0].focus();
      return;
    }
    const data: Record<string, string | number> = Object.fromEntries(new FormData(form)) as Record<string, string>;
    fields.forEach(field => { data[field.name] = field.valueAsNumber; });
    form.querySelectorAll<HTMLSelectElement>('select').forEach(select => {
      if (![...select.options].some(option => option.value === select.value)) messages.push('Choose a valid unit or option.');
    });
    if (messages.length) { fail(messages); return; }
    try {
      const input = data as Input;
      const validation = options.validate(input);
      if (!validation.valid) { fail(validation.errors); return; }
      const result = options.calculate(input);
      if (!finiteResult(result)) { fail(['These inputs cannot produce a finite result. Check the highlighted values and units.']); return; }
      options.render(panel, result, input);
      panel.hidden = false;
      warning.textContent = validation.warnings.join(' ');
      warning.hidden = validation.warnings.length === 0;
      if (persistInputs) {
        const url = new URL(window.location.href);
        new FormData(form).forEach((value, name) => url.searchParams.set(name, String(value)));
        window.history.replaceState(null, '', url);
      }
    } catch (error) {
      fail([error instanceof Error ? error.message : 'Unable to calculate with these inputs.']);
    }
  });

  for (const group of options.units ?? []) {
    const getUnit = () => String(new FormData(form).get(group.name));
    let previous = getUnit();
    const controls = [...form.querySelectorAll<HTMLInputElement | HTMLSelectElement>(`[name="${group.name}"]`)];
    const convertedFields = fields.filter(field => group.fields.includes(field.name));
    const setLabels = (unit: string) => convertedFields.forEach(field => {
      field.dataset.unit = group.labels?.[unit] ?? unit;
      let label = field.closest('.field')?.querySelector<HTMLElement>('.field-unit');
      if (!label) {
        label = document.createElement('span');
        label.className = 'field-unit';
        field.closest('.field')?.querySelector('.field-label')?.append(label);
      }
      label.textContent = field.dataset.unit;
      updateLimits(field);
    });
    setLabels(previous);
    resetUnits.push(() => { previous = getUnit(); setLabels(previous); });
    controls.forEach(control => control.addEventListener('change', () => {
      const next = getUnit();
      const factor = group.factors[previous] / group.factors[next];
      if (!Number.isFinite(factor) || next === previous) return;
      convertedFields.forEach(field => {
        for (const attribute of ['min', 'max'] as const) {
          if (field[attribute] !== '') field[attribute] = Number((Number(field[attribute]) * factor).toPrecision(12)).toString();
        }
        if (field.value !== '' && Number.isFinite(field.valueAsNumber)) field.value = Number((field.valueAsNumber * factor).toPrecision(12)).toString();
        field.step = 'any';
        field.dataset.approximateLimits = 'true';
      });
      previous = next;
      setLabels(next);
      form.requestSubmit();
    }));
  }

  form.addEventListener('reset', event => {
    // Restore complete state before calculating. Reset event microtasks can run
    // before the browser's default action updates the control values.
    event.preventDefault();
    defaultControls.forEach(({ control, value, checked }) => {
      control.value = value;
      if (control instanceof HTMLInputElement && checked !== undefined) control.checked = checked;
    });
    defaults.forEach(({ field, min, max, step }) => {
      Object.assign(field, { min, max, step });
      delete field.dataset.approximateLimits;
    });
    resetUnits.forEach(reset => reset());
    fields.forEach(updateLimits);
    form.requestSubmit();
    const url = new URL(window.location.href);
    new FormData(form).forEach((_, name) => url.searchParams.delete(name));
    window.history.replaceState(null, '', url);
  });

  // Static HTML cannot read the request query. Restore units before values so
  // supplied measurements are interpreted in the selected units exactly once.
  const params = new URLSearchParams(window.location.search);
  let invalidOption = false;
  for (const select of form.querySelectorAll<HTMLSelectElement>('select')) {
    if (!params.has(select.name)) continue;
    const value = params.get(select.name)!;
    if (![...select.options].some(option => option.value === value)) { invalidOption = true; continue; }
    select.value = value;
    select.dispatchEvent(new Event('change'));
  }
  for (const radio of form.querySelectorAll<HTMLInputElement>('input[type="radio"]')) {
    if (!params.has(radio.name)) continue;
    const value = params.get(radio.name)!;
    const choices = [...form.querySelectorAll<HTMLInputElement>('input[type="radio"]')].filter(choice => choice.name === radio.name);
    if (!choices.some(choice => choice.value === value)) invalidOption = true;
    if (radio.value === value) { radio.checked = true; radio.dispatchEvent(new Event('change')); }
  }
  fields.forEach(field => { if (params.has(field.name)) field.value = params.get(field.name)!; });
  form.requestSubmit();
  if (invalidOption) fail(['The link contains an unsupported unit or option. Choose a valid option and calculate again.']);
  persistInputs = true;
}
