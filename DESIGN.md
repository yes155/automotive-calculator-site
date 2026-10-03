# Automotive workbench design

Implemented 2026-10-03 from the user-approved TINK-ON reference screenshot. The screenshot replaces the previous dark charcoal/orange direction. The primary audience remains the United States.

## Visual system

- A light gray page surrounds a rounded chassis with a slim brand rail, a tool sidebar, and a shared footer.
- Panels use thin neutral borders, restrained radii, and flat surfaces. Black Calculate buttons establish the primary action. Blue-gray ink and pale drafting dots/diagonal lines echo the reference without adding ornamental controls.
- Self-hosted IBM Plex Mono identifies modules, measurements, navigation, headings, and controls. Longer explanations use a system sans-serif font for readability. No external font request is required.
- The home workbench combines a large illustrated introduction with eight numbered tool pads, a usage strip, and five linked field notes. Each pad opens an existing calculator.
- Calculator inputs and output share visible panel headings. Desktop fields can pair within fieldsets, and results sit alongside inputs. Formulas, examples, limitations, and related tools use the same panel system.
- Guides, category hubs, About, and Methodology inherit the shared navigation, palette, typography, and controls. The four-pad favicon matches the brand mark.

## Interaction and accessibility

- The active calculator is marked with aria-current. On phones the sidebar becomes a native disclosure, operable with the keyboard. Its initial state adapts to the viewport; without JavaScript the full navigation remains available.
- Calculator inputs, default units, field limits, conversion, accessible errors, saved URLs, and Reset use the established production implementation.
- Inputs, results, method, and limitations have working in-page navigation. Narrow layouts stack results below the form, and wide formulas/tables scroll within their containers.
- Focus rings, minimum 44px form controls, reduced-motion support, semantic headings, and the skip link remain available. Decorative SVG drafting illustrations are hidden from assistive technology.
- Filled action buttons explicitly set light text across all page styles. This addresses the guide-page link-color conflict found during screenshot review.

## Live reference refinement

The live interface at https://tinkon.zui.ooo/ was inspected on 2026-10-03, including computed typography/colors and the P5 selection state. It uses IBM Plex Mono, a #dfe0e2 page background, #eceef0 device surface, #f4f5f7 paper/pads, #1c1d20 ink, 24px device corners, and 1px borders at 22% black opacity. Selected pads use a 2px dark border.

The automotive implementation adopts those palette values and typography, a slimmer header, outlined active navigation, pad hover/focus treatment, and framed calculator action strips. Existing readable body text, 44px form controls, and responsive content layouts remain appropriate for this site's longer content.

Four Latin WOFF2 weights (400–700, about 60 KB total) are self-hosted. Font files came from @fontsource/ibm-plex-mono 5.3.0 with the SIL Open Font License included in public/fonts. No font service or runtime dependency was added. The normal weight is preloaded and font-display: swap preserves fallback rendering.

The reviewed dashboard is captured in [design-preview.png](docs/design-preview.png).

## Review and validation

- Clean npm ci, the 22-page static build, and 168 unit tests passed.
- All 78 Chromium browser tests passed after the live-reference refinements, including dashboard navigation, active tool marking, keyboard disclosure, desktop/mobile panel placement, every page at 320px width, and result recovery across all eight calculators.
- Desktop screenshots of the dashboard, Wheel Offset, and a guide, plus phone screenshots of the dashboard and Wheel Offset, were inspected. The corrected guide action colors were checked in the rendered page. Updated desktop/phone views were inspected after the font/palette refinements, and local font loading was verified in the browser.

## Remaining release work

The implementation is on the repair branch. Production domain configuration, deployment verification, merge to master, and ownership/contact/analytics decisions remain tracked in docs/BUILD-STATUS.md.
