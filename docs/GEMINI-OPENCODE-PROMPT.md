# Gemini / Coding-Agent Takeover Prompt

You are taking over an already researched automotive calculator-site project.

Do not restart niche discovery.

Read all files in `/docs/` and treat them as approved decisions.

Start with Phase 0 and Phase 1 in `BUILD-SEQUENCE.md`.

Before writing UI code:
1. implement pure calculation functions;
2. add unit tests;
3. verify formulas against `CALCULATOR-SPECS.md`.

Do not create a standalone bore-stroke URL at MVP.

For every calculator PR/change, report:
- files changed;
- formula implemented;
- tests added;
- assumptions;
- remaining QA items.

If implementation conflicts with the handoff, record the conflict rather than silently changing the specification.
