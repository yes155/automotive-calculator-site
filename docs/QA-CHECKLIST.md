# QA Checklist

## Formula
- [ ] Exact formula matches CALCULATOR-SPECS.md
- [ ] Units convert correctly
- [ ] Rounding occurs only for display, not intermediate calculations
- [ ] Zero/negative/invalid values handled intentionally
- [ ] Result labels include units
- [ ] At least three test cases per calculator

## UX
- [ ] Calculator usable at 320px width
- [ ] Labels remain visible
- [ ] Unit switches do not erase valid input
- [ ] Error states explain how to fix the input
- [ ] Result appears immediately after calculation on mobile
- [ ] Reset does not cause page navigation

## Content
- [ ] One clear task per URL
- [ ] Formula/method visible
- [ ] Worked example visible
- [ ] Assumptions visible
- [ ] Limitations visible
- [ ] Related tools relevant
- [ ] Guides do not duplicate calculator copy

## Technical SEO
- [ ] Unique title
- [ ] Unique H1
- [ ] Canonical correct
- [ ] Indexability correct
- [ ] Sitemap includes intended pages
- [ ] No orphan calculator pages
- [ ] Breadcrumbs work
- [ ] Structured data matches visible content

## Deployment
- [ ] Production build succeeds
- [ ] No missing assets
- [ ] No console errors affecting tools
- [ ] All internal links return expected pages
- [ ] HTTPS works
- [ ] www/non-www behavior intentional
