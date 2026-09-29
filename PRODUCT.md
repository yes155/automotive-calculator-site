# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro + TypeScript, static output, Cloudflare deployment

## Users

**Primary:** DIY car enthusiasts, car owners, mechanics, tuners, and automotive students who need to calculate or verify specific vehicle/engine/wheel measurements while working on a car.

**Situation:** Researching a modification, diagnosing or checking an automotive specification, planning a build, comparing components, or verifying whether parts/specifications are compatible.

**Job:** Enter a small number of known vehicle or component measurements and get an accurate, immediately understandable result—such as wheel offset, tire/diameter differences, engine displacement, compression ratio, power-to-weight ratio, or other automotive calculations—without manually doing the mathematics.

**Priority:** Fast calculation + clear explanation + practical interpretation, rather than primarily an article/content site.

## Product Purpose

A practical, transparent automotive calculation toolkit built around real vehicle modification and specification tasks. Provides 8 interconnected calculators (wheel offset, tire size, compression ratio, engine displacement, horsepower, power-to-weight, quarter mile, fuel injector) with automotive-specific inputs, practical outputs, transparent formulas, unit flexibility, and decision-support context.

## Positioning

**Focused automotive calculation toolkit** — not a collection of isolated generic calculators.

Differentiation:
1. **Automotive-specific inputs** — terminology and measurements car owners/mechanics/tuners actually use
2. **Practical outputs** — results show what the number means for the vehicle or modification
3. **Connected calculations** — natural movement between tire size, wheel offset, engine displacement, compression ratio, horsepower, power-to-weight
4. **Transparent formulas** — each calculator explains formula, assumptions, units, calculation logic
5. **Unit flexibility** — common automotive units and conversions without manual conversion
6. **Decision-support context** — practical implications, differences, tolerances, compatibility considerations

## Operating Context

**Workflows:** User selects calculator → enters known measurements → gets result with interpretation → reads formula/assumptions → navigates to related calculator or guide.

**Environments:** Desktop (garage/shop computer), mobile (phone at track/under hood), tablet (workbench reference).

**Rituals:** Quick lookup during work, comparison before purchase, verification during build planning, learning via transparent formulas.

## Capabilities and Constraints

**Confirmed functionality:** 8 calculators with pure TS calculation functions, unit tests, accessible forms, result cards, formula blocks, worked examples, limitations, related tool links.

**Technical constraints:** Static output only (no backend), Astro framework, Cloudflare deployment, no JS framework hydration for static sections.

**Terminology:** Automotive-standard (ET offset, bore/stroke, BSFC, crank vs wheel HP, etc.).

**Explicitly undecided:** Visual world (colors, typography, logo, spacing system), whether to add user accounts/saved calculations, analytics approach.

## Brand Commitments

**Name:** "Automotive Calculators" (simple wordmark, recognizable at favicon size)

**Voice:** Professional, trustworthy, technically precise, accessible — not overly corporate, not "car dealership" or flashy racing.

**No existing logo, colors, fonts, or visual assets to preserve.** Visual system to be created fresh.

## Evidence on Hand

**Real content:** 8 calculator specifications with validated formulas, 5 technical guides with real data tables, worked examples with actual numbers, QA test cases with expected outputs.

**Absences (must not fabricate):** No user testimonials, no customer logos, no benchmarks, no pricing, no licensing claims, no deployment verification beyond Cloudflare preview.

## Product Principles

1. **Calculator-first** — the tool is the hero; explanation supports, never buries the calculation.
2. **Automotive-native** — inputs, outputs, and language match how practitioners actually work.
3. **Transparent math** — every formula is visible, verifiable, and explained in context.
4. **Practical interpretation** — numbers alone aren't enough; results explain what it means for the car.
5. **Fast and accessible** — static-first, mobile-usable, keyboard-navigable, screen-reader friendly.

## Accessibility & Inclusion

**Required standard:** WCAG 2.1 AA minimum. Visible focus states, proper labels, error messages tied to inputs, no meaning by color alone, minimum touch targets, results announced to AT where practical.

**Known needs:** Garage/shop lighting varies (high contrast needed), gloves may be worn (touch targets ≥44px), users may reference phone under hood (one-handed use), color-blind safe palette for status/results.