# Calculator Formula Specifications

## 1. Wheel Offset Calculator

### User task
Compare a current wheel with a proposed wheel and show how far the inner and outer edges move.

### Inputs
- Current wheel width (in)
- Current offset ET (mm)
- New wheel width (in)
- New offset ET (mm)

### Derived values

Half-width in millimeters:

`half_width_mm = width_in × 25.4 / 2`

Distance from hub mounting plane toward suspension:

`inner_position = half_width_mm + offset_mm`

Distance from hub mounting plane toward fender:

`outer_position = half_width_mm - offset_mm`

Changes:

`inner_extension = new_inner_position - old_inner_position`

Positive inner extension means the new wheel sits closer to the suspension.

`outer_poke = new_outer_position - old_outer_position`

Positive outer poke means the new wheel extends farther toward the fender.

`inner_clearance_change = old_inner_position - new_inner_position`

Positive means more inner clearance; negative means less.

### Outputs
- Inner clearance change (mm)
- Outer poke/retraction change (mm)
- Plain-language interpretation

### Validation
- Width > 0
- Reasonable width range should warn, not hard fail
- Offset may be negative, zero, or positive

### Important limitation
This is wheel-rim geometry only. It does not guarantee caliper, suspension, tire, fender, or hub clearance.

---

## 2. Static Compression Ratio Calculator

### Inputs
- Bore
- Stroke
- Combustion chamber volume (cc)
- Piston dish volume (cc, positive)
- Piston dome volume (cc, positive)
- Head-gasket bore
- Head-gasket compressed thickness
- Deck clearance
- Unit system for linear dimensions

### Swept volume per cylinder

`Vs = π / 4 × bore² × stroke`

Convert to cc before combining with chamber volumes.

### Gasket volume

`Vg = π / 4 × gasket_bore² × gasket_thickness`

### Deck volume

`Vd = π / 4 × bore² × deck_clearance`

### Clearance volume

`Vc = chamber_cc + gasket_cc + deck_cc + dish_cc - dome_cc`

### Compression ratio

`CR = (Vs + Vc) / Vc`

### Validation
- `Vc > 0`
- All physical dimensions non-negative
- Bore and stroke > 0
- Warn when piston dome exceeds the other clearance-volume components

### Outputs
- Compression ratio, e.g. `10.52:1`
- Swept volume per cylinder
- Total clearance volume
- Component-volume breakdown

### Limitation
Static compression ratio is not dynamic compression ratio and does not by itself determine octane requirement.

---

## 3. Power-to-Weight Ratio Calculator

### Inputs
- Power value
- Power unit: hp or kW
- Weight value
- Weight unit: lb or kg

### Canonical conversions
- `1 mechanical hp = 0.745699872 kW`
- `1 lb = 0.45359237 kg`

### Outputs
- hp/lb
- hp per US ton (2000 lb)
- kW/kg
- W/kg
- lb/hp
- kg/kW

### Validation
Power and weight must be > 0.

---

## 4. Engine Displacement Calculator

### Inputs
- Bore
- Stroke
- Number of cylinders
- Dimension unit: mm or in

### Per-cylinder volume

`V = π / 4 × bore² × stroke`

### Total displacement

`total = V × cylinders`

### Outputs
- cc
- liters
- cubic inches
- per-cylinder displacement
- bore/stroke ratio

### Bore/stroke ratio

`ratio = bore / stroke`

Interpret only as descriptive geometry:
- >1: oversquare
- ≈1: square
- <1: undersquare

Avoid implying that bore/stroke ratio alone determines performance.

### Keyword decision
The validated `bore stroke calculator` keyword is handled here at launch unless separate task/intent evidence emerges.

---

## 5. Horsepower Calculator

### Primary task
Calculate mechanical horsepower from torque and RPM.

### Imperial formula

`hp = torque_lb_ft × rpm / 5252.113`

### Metric path

Convert N·m to lb-ft, or calculate:

`kW = torque_Nm × rpm / 9549.297`

Then:

`hp = kW / 0.745699872`

### Inputs
- Torque
- Torque unit: lb-ft or N·m
- RPM

### Outputs
- Mechanical horsepower
- kW
- Converted torque

### Validation
- RPM >= 0
- Torque may be 0 but should normally be positive for the intended use

### Limitation
Calculated shaft power from torque/RPM is not the same as advertised engine power unless the torque value represents the same measurement point.

---

## 6. Fuel Injector Calculator

### Inputs
- Target horsepower
- BSFC (lb fuel / hp / hr)
- Number of injectors
- Maximum duty cycle as a decimal
- Fuel density (g/mL) or a clearly labeled preset

### Required total fuel mass flow

`total_lb_hr = horsepower × BSFC`

### Required flow per injector

`injector_lb_hr = total_lb_hr / (injector_count × duty_cycle)`

### Convert lb/hr to cc/min

`cc_min = injector_lb_hr × 453.59237 / 60 / density_g_ml`

### Outputs
- lb/hr per injector
- cc/min per injector
- total fuel flow
- duty-cycle assumption
- BSFC assumption

### Validation
- horsepower > 0
- BSFC > 0
- injector_count integer >= 1
- `0 < duty_cycle <= 1`
- density > 0

### UX note
Do not silently use a performance-sensitive BSFC preset. If presets are offered, name the assumption and let the user edit it.

### Limitation
Real injector sizing also depends on fuel pressure, injector characterization, fuel type, target lambda/AFR, and system design.

---

## 7. Quarter Mile Calculator

### Task
Provide an approximate quarter-mile estimate from vehicle weight and horsepower.

### Baseline empirical model

Estimated elapsed time:

`ET_seconds = 5.825 × (weight_lb / horsepower)^(1/3)`

Estimated trap speed:

`MPH = 234 × (horsepower / weight_lb)^(1/3)`

### Inputs
- Vehicle weight (lb or kg)
- Horsepower
- Optional power type label: crank or wheel horsepower (for context only)

### Outputs
- Estimated ET
- Estimated trap speed
- Power-to-weight ratio

### Critical wording
This is an empirical estimate, not a prediction of an actual run.

Actual results depend on:
- traction;
- gearing;
- launch;
- aero;
- drivetrain;
- weather;
- track conditions;
- driver.

### QA requirement
Before publication, document the chosen empirical constants in the methodology/source note so they are not presented as a physical law.

---

## 8. Tire Size Calculator — Phase 2

### Inputs for each tire
- Section width (mm)
- Aspect ratio (%)
- Wheel diameter (in)

### Sidewall height

`sidewall_mm = section_width_mm × aspect_ratio / 100`

### Overall diameter

`diameter_mm = 2 × sidewall_mm + wheel_diameter_in × 25.4`

### Circumference

`circumference_mm = π × diameter_mm`

### Comparison outputs
- Diameter difference
- Circumference difference
- Percentage difference
- Ground-clearance change = diameter difference / 2
- Approximate speedometer effect

If the speedometer is calibrated for Tire A:

`actual_speed = indicated_speed × diameter_B / diameter_A`

### Limitation
Nominal tire dimensions can differ from measured dimensions by model, rim width, pressure, and load.
