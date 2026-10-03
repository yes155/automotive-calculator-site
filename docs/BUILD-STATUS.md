# Build status and reference decisions

Updated: 2026-10-03

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
- The user-approved TINK-ON screenshot is now the visual reference. The site uses a light gray instrument workbench, thin borders, rounded modules, dotted work areas, monospace chrome, and black action buttons. See DESIGN.md for implementation and review details.
- The primary audience is the United States. Power, weight and torque defaults use hp, lb and lb-ft. Wheel widths and rim diameters use inches; tire section width and ET retain their labeled millimeter conventions. Engine dimensions support inches and millimeters. Input directions, US number formatting, persistent range/increment hints, and decimal duty-cycle examples are shown before entry. Hints update with converted units and are connected to inputs through accessible descriptions.

## Remaining launch work

- Assign the real deployment origin and configure production/preview values.
- Review the implemented workbench against the supplied screenshot and adjust any final design preferences.
- Verify Cloudflare hosting, HTTPS, redirects, indexing and performance on the deployed site.
- Decide ownership/contact information and analytics/advertising before adding corresponding public claims or policies.
- Some legacy calculation helpers remain for compatibility. Module and browser tests cover the production formula path. Future formula changes must not introduce a parallel implementation.

## Verification for this update

- Clean `npm ci` succeeded.
- 168 Vitest tests passed across 13 files.
- 78 distinct Chromium Playwright tests passed: the existing 76-test suite plus two dashboard/navigation tests. The final 14-test readiness/navigation run passed after the button contrast correction, including all 22 pages at 320px, local links/fragments, deployed-origin metadata, URL input restoration and reset recovery, plus persistent input limits, unit conversion hints and static directions without JavaScript.
- The static build succeeded. A separate unconfigured build verified noindex, no fabricated canonical, disallow robots and an empty sitemap.
- Desktop and mobile dashboard and Wheel Offset screenshots, plus a desktop technical guide, were inspected. Guide action text was rechecked after correcting scoped-style precedence.
- `63360` remains only as an inches-per-mile constant and a displayed formula whose circumference is in inches. No page uses `is:inline`.

The standard Playwright Chromium download returned a truncated archive in this workspace. Browser verification used a Chromium executable extracted from @sparticuz/chromium through `CHROMIUM_EXECUTABLE_PATH`; no browser package was added to the project dependencies.
