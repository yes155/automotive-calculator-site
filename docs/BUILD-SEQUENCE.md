# Build Sequence

## Phase 0 — repository shell
- Initialize static project.
- Add shared layout, typography, header/footer, calculator shell.
- Add test runner.
- Add unit conversion utilities.
- Add sitemap/canonical/meta framework.

## Phase 1 — first three calculators
1. Wheel Offset
2. Compression Ratio
3. Power-to-Weight

Why:
- three different calculation types;
- validates component system;
- validates unit handling;
- creates Wheels, Engine, and Performance clusters immediately.

Gate:
- all formula tests pass;
- mobile inputs/results work;
- shared component system is stable.

## Phase 2 — engine/performance depth
4. Engine Displacement
5. Horsepower
6. Fuel Injector

Gate:
- cross-unit conversions tested;
- output wording clear;
- methodology sections written.

## Phase 3 — empirical estimator
7. Quarter Mile

Gate:
- formula is explicitly described as empirical;
- constants documented;
- limitations prominent.

## Phase 4 — authority-stage
8. Tire Size

Do not make launch dependent on this harder term.

## Phase 5 — supporting guides
Publish only guides in CONTENT-LINKING-MAP.md that have distinct informational intent.

## Phase 6 — launch QA
Run:
- calculator tests;
- build;
- link audit;
- title/meta audit;
- canonical/sitemap audit;
- mobile QA;
- accessibility spot-check;
- asset check;
- Lighthouse/performance review;
- Cloudflare preview review.
