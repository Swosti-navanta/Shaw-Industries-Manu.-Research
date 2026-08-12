# Glossary — the vocabulary in the prototype

Every industry term that appears on screen, plus a few you'll hear in the room. If you're new to
manufacturing or to carpet, read this before the click-through.

## The pair that gets confused most

**Schedule attainment** — of what you said you'd make this week, how much you actually made. A
volume number, usually a percentage.

**Schedule adherence** — whether you made it *in the planned sequence, on the planned day*.
Stricter, and the more useful number.

Sawyer's view shows 97% attainment against 62% adherence deliberately. You can hit both at once by
making everything you promised in the wrong order and catching up on Friday — the volume number
looks fine while every customer promise is broken. That gap is the argument for Sawyer existing.

## Scheduling

**Released sequence** — the plan handed to the floor: which run, on which line, in what order.
"Released" is the operative word. Before release it's a plan; after release it's a commitment.

**Slot** — position in that sequence. The slot column is what changes when you accept Rowan's
recommendation.

**Finite capacity** — planning against what the plant can actually run. The contrast is *infinite*
capacity, which assumes unlimited machines. That distinction is the whole reason detailed
scheduling software exists.

**Changeover / sequence-dependent setup** — the cost of switching between runs. In carpet it's
heavily sequence-dependent: light to dark is cheap, dark to light needs a full purge. This is what
makes sequencing an optimisation problem rather than a sorted list, and why the sequence table has
a changeover column in dollars.

**Campaign / block scheduling** — grouping similar runs together to avoid changeovers. A soft rule
in Sawyer's constraint model.

**PM window** — preventive maintenance. Booked-out machine hours the scheduler must plan around.
Careful: in SAP, PM also means the Plant Maintenance module, so check which someone means.

**Locked window** — the period inside which the schedule can't change. Also called a frozen period
or planning time fence. Set to 48h in the thresholds screen.

**Constraint line / bottleneck** — the stage that sets throughput for the whole plant. An hour lost
there is lost for the whole plant and can't be recovered; an hour lost anywhere else is usually
free. So "which machine went down" is the wrong question — "did the constraint stop" is the right
one.

**Achieved rate versus standard rate** — what the line really does versus what the plan assumes,
in **yd/hr** (linear yards per hour). The prototype shows Backing 2 at 369 against a 420 standard.

## The carpet-specific term doing the most work

**Dye lot** — carpet dyed in one batch. Two lots of the same colour will not shade-match, so a
large order should come from a single lot. A genuine hard scheduling constraint, and the hinge of
the entire demo. **Shade variation** is what you get when you break it.

Caveat: the spec flags this as a general carpet fact, not a verified Shaw operating rule.

## Execution

**MES** — Manufacturing Execution System. Dispatches work to the floor and confirms what was made;
sits between the ERP and the machines. The line "your MES runs the make" is doing defensive work —
it says we are not replacing it.

**Alert band / deviation** — the tolerance around plan rate. Drift inside the band is logged;
outside it, an alert fires. Set to ±8%, which is why 369 against 420 (−12%) escalates.

**Downtime and reason codes** — planned downtime is changeover, PM, cleaning; unplanned is
breakdown, material-out, quality hold, no operator. The reason code is captured at the machine. The
common real-world failure is a supervisor entering it hours later from memory, which is why the
downtime tile reads "reason code pending".

**Yield** — good output divided by input.

**Quality hold** — a batch stopped pending a quality decision.

## Traceability

**Batch genealogy** — the record of which input lot went into which output unit. Yarn lot → dye lot
→ batch → roll. This is what makes a claim *settleable* rather than arguable.

**Traceback** — walking that chain backwards from a field claim to the run that caused it.

**BCF** — bulked continuous filament, the yarn form. **Solution-dyed** means colour goes into the
polymer at extrusion rather than being applied later, so there's no separate dyeing step.
**lin yd** is linear yards.

## Quality and the commercial argument

**End-of-line inspection** — measurement against **spec** at the end of the line.

**First quality versus seconds** — the grade call. **Off-quality** is product that misses
first-quality spec: streaking, dye variation, tufting faults, width out of tolerance. Critically,
off-quality carpet is not scrapped — it's downgraded to **seconds** and sold through outlet
channels.

**Margin gap** — so the loss isn't material cost, it's the difference between first-quality price
and seconds price, on every roll. That's why Wren's hero number is a dollar figure, and why quality
carries the commercial case.

**Grading and disposition** — assigning the grade and deciding what happens to what fails.
**Borderline** rolls are the ones that go to a person.

## Customer commitments

**Promised date** versus **fixed install date** — a promised date can sometimes move; a fixed
install date usually can't, because a crew is booked. That asymmetry is what makes Option A viable
and Option B dangerous.

## Not on screen, but you'll hear them

**MPS** — Master Production Schedule. What finished goods to make, how much, in which week. Not a
calculation but a *commitment* with a cadence and a sign-off; sales promise against it.

**MRP** — Material Requirements Planning. Explodes the MPS into what materials are needed and when.
MPS says what to *make*; MRP says what to *buy and stage*. MPS drives MRP, never the reverse.

**RCCP** — Rough-Cut Capacity Planning. A sanity check that the MPS week is broadly runnable. Not a
machine-by-machine proof.

**APS** — Advanced Planning and Scheduling. The software category that produces these plans.
Vendors: OMP, Kinaxis, Blue Yonder, o9, Quintiq, SAP.

**MPS versus APS** — not the same kind of thing. MPS is a *plan*; APS is *software that produces
plans*. The MPS is usually produced inside the APS. A step, not a rival.

**The layering worth memorising:** S&OP (what will we sell, months, product family) → MPS (what
will we make, weeks, SKU) → MRP (what materials, weeks, components) → detailed scheduling (which
machine, what hour, days, operation) → MES (did it happen, now, machine). **APS plans, MES
executes.** Most plant pain lives in the seam between them.

**OEE** = Availability × Performance × Quality. Was the machine up × did it run at rate × was the
output good.

**WIP** — work in progress. Part-made goods sitting between stages.

## Do not say

**PP/DS** — SAP's detailed scheduling product. This is Baladna vocabulary; Shaw's known stack
contains no SAP. Use "APS" or "your planning and scheduling system".

**Control tower** — banned. Shaw asked twice. It implies a system that replaces theirs. See
`shaw-workshop-build/positioning.md` for the full list and the approved replacements.
