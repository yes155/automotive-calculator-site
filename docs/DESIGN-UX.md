# Design & UX Brief

## Direction

Professional automotive utility interface, not a generic blog and not a gaming dashboard.

Use:
- light-first background;
- dark charcoal/navy text;
- restrained steel/graphite surfaces;
- one signal accent color for primary actions;
- strong numerical hierarchy;
- generous spacing.

Avoid:
- black-on-black sections;
- low-contrast gray text;
- excessive fake gauges;
- visual effects that make the calculator harder to scan.

## Calculator layout

Desktop:
- left/main: inputs;
- right: result card;
- below: formula, example, interpretation, limitations, related tools.

Mobile:
- inputs first;
- calculate action;
- result immediately after;
- explanation afterward.

## Result design

The result should answer the task in one glance.

Example for wheel offset:

**New wheel moves 8 mm closer to the suspension and 14 mm farther outward.**

Then show the detailed numbers below.

## Input rules

- Put units in or beside labels.
- Do not make users infer whether a field expects inches, millimeters, pounds, kilograms, hp, or kW.
- When switching unit systems, convert existing entered values instead of clearing them.
- Make Reset secondary to Calculate.
- Use sensible examples, not misleading prefilled “results”.

## Accessibility

- Visible focus states.
- Proper `<label>` elements.
- Error messages tied to inputs.
- No meaning conveyed by color alone.
- Minimum touch-target sizing.
- Results announced to assistive technology where practical.
