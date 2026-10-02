# Automotive Calculator Site — Build Handoff

## Project status

Research is complete enough to move into architecture and implementation.

Portfolio position:
- Tier: A+
- Working score: 98/100
- Verdict: Top finalist
- Launch strategy: enter through distinct, lower/moderate-difficulty utilities before depending on the hardest tire-size head term.

## Site purpose

Build a fast, trustworthy automotive calculator site for DIY enthusiasts, tuners, builders, and car owners.

Core topic graph:
1. Wheels & Tires
2. Engine Geometry
3. Performance
4. Fueling

## Critical rule from the completed dental project

Do not create a page merely because a keyword exists.

A calculator URL must own a distinct user task.

Keep:
- calculator pages,
- explanatory guides,
- comparison/reference content

visibly and semantically separate.

## Recommended implementation

Static-first site using Astro + TypeScript (or an equivalently simple static framework).

Requirements:
- no backend for MVP;
- calculation logic separated from UI;
- unit-tested formula modules;
- calculator state shareable through URL parameters only where useful;
- accessible, mobile-first forms;
- light-first design;
- deploy from GitHub to Cloudflare.

## First implementation order

1. Wheel Offset Calculator
2. Compression Ratio Calculator
3. Power-to-Weight Ratio Calculator
4. Engine Displacement Calculator
5. Horsepower Calculator
6. Fuel Injector Calculator
7. Quarter Mile Calculator
8. Tire Size Calculator — phase 2 / authority-stage

`bore stroke calculator` is currently treated as part of the Engine Displacement/Bore-Stroke task family unless later SERP validation proves a separate intent.

## Definition of done

A calculator is not done because the form works.

It must also have:
- formula/method;
- variable definitions;
- unit handling;
- assumptions;
- validation;
- worked example;
- result interpretation;
- limitations;
- related tools;
- formula test cases;
- responsive and accessibility QA.
