# Technical Build Specification

## Recommended stack

- Astro + TypeScript
- Static output
- GitHub repository
- Cloudflare deployment
- No database/backend for MVP

Equivalent static frameworks are acceptable if the implementation stays simple.

## Suggested structure

```text
/
  AGENTS.md
  src/
    components/
      CalculatorShell.astro
      NumberField.astro
      UnitSelect.astro
      ResultCard.astro
      FormulaBlock.astro
      RelatedTools.astro
    lib/
      calculators/
        wheelOffset.ts
        compressionRatio.ts
        powerToWeight.ts
        engineDisplacement.ts
        horsepower.ts
        fuelInjector.ts
        quarterMile.ts
        tireSize.ts
      units.ts
      validation.ts
    pages/
      index.astro
      calculators/
      wheels-tires/
      engine/
      performance/
      fueling/
      guides/
  tests/
    calculators/
  public/
```

## Architecture rule

Calculation functions must be pure functions separate from form/UI components.

Good:

`calculateWheelOffset(input) -> result`

Bad:
formula logic scattered across event handlers and rendered markup.

## Tests

Each calculator module needs:
- normal case;
- unit-conversion case;
- boundary/invalid input case;
- at least one independently hand-checked reference case.

## SEO

Each calculator page:
- unique title/H1;
- concise definition;
- calculator above long-form explanation;
- formula/method section;
- worked example;
- limitations;
- related tools;
- canonical;
- metadata;
- breadcrumb markup where appropriate.

Do not auto-generate FAQ schema unless the visible page genuinely contains the questions and answers.

## Performance

- no large JS framework hydration for static explanatory sections;
- hydrate only interactive calculators;
- avoid oversized hero imagery;
- preserve core calculator usability without unnecessary animation.

## Analytics

Keep analytics isolated from formula code. Never require analytics for the calculator to function.
