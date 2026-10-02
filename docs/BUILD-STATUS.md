# Build status and reference decisions

Updated: 2026-10-02

The other documents preserve the supplied planning handoff. Their phase descriptions are references, not a live completion tracker. The implementation has eight calculators, four category hubs, five guides, an all-calculators index, About, and Methodology.

## Implemented

- Calculator pages call tested formula modules through the shared browser binder.
- Invalid inputs produce visible errors. Corrections restore results. Unit changes convert entered values and field bounds.
- Static-hosted pages restore URL inputs in the browser, applying units before supplied numbers. Successful calculation saves inputs in the current URL. Reset restores defaults, units and bounds, clears calculator parameters and recalculates without navigation.
- Footer destinations are real pages. Guides use Article schema when an origin is configured. Unsupported SearchAction markup was removed.
- Canonicals, social URLs, JSON-LD, robots and sitemap share one build-time origin. Missing-origin builds and explicitly marked previews are not indexable.
- Narrow layouts have scrollable guide tables/formulas, wrapping actions/navigation, 44px form controls, and results in document flow. Reduced-motion preferences disable transitions.

## Formula and copy corrections

- Tire revolutions use 1,609,344 mm per mile divided by circumference in mm.
- Injector total volume flow now means required engine demand, matching total lb/hr. Rated capacity includes duty-cycle headroom. At 400 hp, BSFC 0.50 and density 0.75, demand is 200 lb/hr or about 2,016 cc/min. Four injectors at 80% duty each require rated flow of about 630 cc/min. Per-injector sizing is unchanged. The module and legacy adapter share this implementation.
- The quarter-mile 2,500 lb / 600 hp example is 9.37 seconds. The crank/wheel selector labels the measurement and applies no drivetrain correction. Unsupported origin attribution and universal percentage-loss claims were removed. Constants remain 5.825 and 234.
- Higher positive offset reduces inner clearance at the same width. The guide now agrees with the calculator and its effects table.
- Compression ratio does not prescribe octane. The guide links to the DOE/EPA explanation instead of a universal ratio-to-fuel table.
- The BSFC guide uses worked arithmetic and Holley's sizing explanation. Unsourced tuning targets and universal fuel-change percentages were removed.
- Tire badges describe diameter differences, not confirmed fitment. Nominal tire dimensions and bore/stroke geometry retain their stated limits.

## Reference scope

- Bore/stroke remains within Engine Displacement. No duplicate URL was introduced.
- Tire Size already exists and stays available; its research priority does not require removing a working tool.
- Current input ranges remain intentional UI constraints, including wheel width 3–20 inches. Changing these accepted bounds requires a product decision.
- The existing visual system remains while the separate Stitch design work proceeds. The older light-first handoff has not triggered an automatic redesign.

## Remaining launch work

- Assign the real deployment origin and configure production/preview values.
- Review the Stitch design before applying a visual overhaul.
- Verify Cloudflare hosting, HTTPS, redirects, indexing and performance on the deployed site.
- Decide ownership/contact information and analytics/advertising before adding corresponding public claims or policies.
- Some legacy calculation helpers remain for compatibility. Module and browser tests cover the production formula path. Future formula changes must not introduce a parallel implementation.

## Verification for this update

- Clean `npm ci` succeeded.
- 168 Vitest tests passed across 13 files.
- 71 Chromium Playwright tests passed, including all 22 pages at 320px, local links/fragments, deployed-origin metadata, URL input restoration and reset recovery.
- The static build succeeded. A separate unconfigured build verified noindex, no fabricated canonical, disallow robots and an empty sitemap.
- Desktop and mobile Wheel Offset screenshots were inspected.
- `63360` remains only as an inches-per-mile constant and a displayed formula whose circumference is in inches. No page uses `is:inline`.

Chromium was exercised with an existing executable through `CHROMIUM_EXECUTABLE_PATH`; this does not establish that the standard browser download succeeds on every machine.
