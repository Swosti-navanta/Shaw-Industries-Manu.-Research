# Make (agent Rowan) - the exception engine over the live run

**Module:** Shaw Research · **File:** 02-journeys/04-make.md · **Status:** draft for review · **Primary source:** demo build (`unifyapps-manufacturing-demo 1.html`) + workshop spec

All figures, IDs and proper nouns below are invented demo data - internally consistent, benchmarked against nothing.

## 1. What this surface is

The richest screen in the demo. Inventory, top to bottom:

- **Page header** - "Backing 2 is -12% under plan"; sub-line "Rowan reads the run against the released plan and raises what matters, to whom." The sidebar badge and the header decision counter both include Rowan's pending decision.
- **Hero card** - **+5h 10m** projected finish in red, "and still opening. Deviation open since 06:38 on Cascade Twist · Dune 240."
- **Four KPI tiles**, each opening a drill-in drawer with a 7-reading trend sparkline, a plain-English summary and an impact figure:
  - *Achieved rate* 369 yd/hr vs std 420 (alert) - drawer explains -12% is past the ±8% alert band, hence the 06:38 escalation; includes the downtime Pareto.
  - *Downtime* 48m, "reason code pending" (alert) - drawer names the honest failure: codes "captured at the machine, often entered late from memory". Pareto: material-out 19m, changeover 12m, quality hold 9m, no operator 5m, minor stops 3m.
  - *Yield* 94.1%, -1.9 pts - loss split: shade variation 2.1%, edge trim 1.0%, tuft faults 0.5%.
  - *Output* 2,940 lin yd this shift - "behind the plan curve by ~340 yd and opening."
- **Rate chart** - plan (flat 420) vs achieved (416 declining to 369), shortfall washed red between the lines, a dashed 06:38 deviation marker, and direct end-labels ("420 plan", "369 now") instead of a legend.
- **Batch genealogy** - Y-30918 → DL-4471 → B-88214 → R-11204, every node a drawer: yarn detail (solution-dyed BCF, creel position); dye lot (2,950 lin yd, commitment table, split-risk ~ΔE 3.4); batch hold record (flagged 06:52 by end-of-line inspection, station Vision + ΔE, $918 exposure); roll (full 5-measurement inspection table, tolerance bar). Caption: "Written as the run happens - which is what makes a claim **settleable**, not arguable."
- **Machine health, Backing 2** ("the constraint line") - OEE 78% on a warning meter; PM window in 3 days; "Vibration rising" chip. The machine-detail drawer decomposes OEE (availability 86 × performance 92 × quality 98 - "performance is the drag") and shows vibration 4.2 mm/s vs 2.1 baseline. **Raise work order** opens an auto-drafted WO routed "into your maintenance system" with context attached (trigger, priority, the deviation, ORD-77310 at risk) - no re-keying. Printed on the card: the honest caveat that **predictive maintenance is not demo-ready** and needs Shaw's machine and sensor data.
- **Activity feed** - deliberately *above* the decision card, because it is the argument for it. 06:38-06:44: five Automated entries (detected the deviation; computed +5h 10m impact; notified line lead + plant manager; costed and ranked 3 options; Sable's shade-integrity check), one Thresholded ("Stopped short of re-sequencing Backing 2 - every option there moves a promised date"), one Needs-you ("the dye lot or the date is your call"). Every entry drills to a drawer explaining its lane.
- **Decision card** - "The dye lot or the date - your call." Option A: re-sequence, run DL-4471 whole, +$1,840 changeover, Recommended. Option B: split the lot, $0, chipped "Repeat of a known cause" with a red inset: "You did this on **DL-4102** in June - it produced claim **CLM-2291**." Option C: Saturday overtime, +$6,200. Each option drawer carries a cost breakdown (B nets to -$18,400 expected downgrade exposure) and schedule effects.
- **Accept / undo mechanics** - Accept posts three fresh feed entries (You → Rowan → Sawyer), flips the card to a green "Decision recorded… The plan corrected itself, without a planning cycle" block, with "See it in Sawyer's schedule →" and Undo (full reset for the next audience).
- **Auto-mode variant** - with "Re-sequence where a promised date moves" set to Auto (Plant 04 Dalton's default), the feed ends at 06:43: "Re-sequenced Backing 2 **automatically** - inside the limit set for this plant. DL-4471 ran whole", and the decision card becomes an explanation that names the threshold and offers to set it back to Ask. Rowan resolves it itself *and says why*.

## 2. The job it does

The question this screen answers: **the line has slowed - what does that actually mean, who needs to know, and what are my options?** It converts a raw MES symptom (369 vs 420 yd/hr) into a consequence (+5h 10m, ORD-77310's fixed install at risk), an evidence trail (the feed), and three costed choices - inside six minutes on the demo clock. It leads with **+5h 10m**: one number, one consequence, deliberately not a dashboard. The person it serves first is the line manager, who today learns all of this hours late and assembles it by hand.

## 3. Personas

| Role | Level | Comes here to |
|---|---|---|
| **Line manager** | Primary | See the deviation, read the feed, weigh the three options, make the dye-lot-or-date call |
| Plant manager | Secondary | Notified at 06:40; watches finish date, margin exposure, overtime cost |
| Shift supervisor | Secondary | Downtime tile and reason codes; the handover picture at shift end |
| Maintenance planner | Secondary | Machine health card, PM window, the routed work-order draft |
| Plant scheduler | Consulted | Receives the re-plan (fast path into Sawyer's board) |
| Quality lead | Consulted | Owns hold B-88214 and the R-11204 grade (in Wren) |

## 4. The journey today - without the agentic layer

Industry-typical practice; whole table **[ASSUMED]** at Shaw unless noted.

| Stage | Trigger | What the person does | Tools and systems | Friction | Typical time |
|---|---|---|---|---|---|
| Deviation opens | Line slows mid-shift | Nothing - counters record it, nobody is watching continuously | MES counters | Signal exists, meaning doesn't | 0 |
| Discovery | Shift handover, or a walk-past | Line manager finds out from a report someone had to build | MES export, Excel | Hours of lag; the shortfall has compounded | 2-8h **[ASSUMED]** |
| Assemble the picture | "How bad is it?" | Pulls output figures, cross-checks the released plan, phones scheduling | MES, APS or spreadsheet **[OPEN]**, phone | Data in 3-4 systems; no finish projection | 1-2h |
| Quantify impact | "Which orders?" | Customer service checks commitments; planner recomputes by hand | ERP (Oracle Fusion), email | Fixed-install vs movable asymmetry invisible | Hours |
| Decide | Meeting or corridor call | Options argued from instinct; overtime is the reflex; nobody costs the changeover or recalls the last split | None | No history at the decision moment; the split-lot mistake repeats | Same day, maybe |
| Record | End of shift | Supervisor enters reason codes from memory; handover report built manually | MES, Excel | Downtime data part-fiction; Pareto untrustworthy | 30-60m/shift |
| Maintenance | Failure, or the PM calendar | WO raised manually, no production context attached | Maintenance system | Vibration trend unseen until breakdown | Reactive |

## 5. The journey with the agentic layer

| Stage | Agent action (lane) | Person action | What the screen shows as evidence |
|---|---|---|---|
| 06:38 Detect | Rowan spots -12%, past the ±8% band (AUTO) | None | Feed entry; deviation marker on the rate chart |
| 06:39 Assess | Computes +5h 10m, flags ORD-77310 (AUTO) | None | Hero figure; order drawer "fixed install - at risk" |
| 06:40 Alert | Notifies line lead + plant manager (AUTO) | Reads the alert | Feed entry; header counter and sidebar badge |
| 06:41 Options | Costs and ranks 3 recovery options (AUTO) | None | Decision card with $1,840 / $0 / $6,200 |
| 06:42 Cross-check | Sable verifies DL-4471 shade integrity (AUTO) | None | Feed entry from a second agent |
| 06:43 Boundary | Stops - every re-sequence moves a promised date (THRESHOLDED) | None | The amber feed entry - the agent naming the edge of its authority |
| 06:44 Escalate | "The dye lot or the date" (A PERSON) | Line manager reads the feed, opens Option B's history warning, accepts A | Green resolved block; 3 fresh feed entries; Sawyer's board re-drawn |
| Continuous | Genealogy written as the run happens; WO drafted on the vibration signal (AUTO / THRESHOLDED); handover report self-builds (AUTO) | Maintenance planner approves the WO | Genealogy chain; WO drawer with context attached; report drawer |

## 6. Pain points

| ID | Pain | Who feels it | Cost type | Fixable WITHOUT agents? (how) | Agentified fix (lane + agent) | Marker |
|---|---|---|---|---|---|---|
| MAK-1 | Deviation discovered at handover, hours after it opened | Line manager | Time, service | Partly - an MES rate alarm detects; it can't say what it means | Rowan AUTO: detect at 06:38, alert at 06:40 | [ASSUMED] |
| MAK-2 | Nobody converts a rate drop into a finish date and orders at risk | Line + plant manager | Service, margin | A BI join could approximate it, but goes stale and isn't live at the moment of need | Rowan AUTO: +5h 10m hero, ORD-77310 flagged | [INTERNAL] |
| MAK-3 | Reason codes entered hours later from memory; downtime data part-fiction | Shift supervisor, CI team | Trust, time | Largely - capture at the machine with better MES UI and discipline | Rowan AUTO proposes codes from context; demo is honest: tile reads "reason code pending" | [ASSUMED] |
| MAK-4 | Recovery options never costed; decisions default to instinct or overtime | Plant manager | Margin | No - needs live cross-system costing (changeover matrix + commitments + overtime) | Rowan AUTO costs and ranks; A PERSON decides. The decision card is the fix | [INTERNAL] |
| MAK-5 | The split-lot mistake repeats because history never reaches the decision moment | Plant manager, quality lead | Margin, risk, trust | Partly - the claims record exists; nobody queries it mid-incident | Option B history warning citing DL-4102 / CLM-2291 - the product arguing against a decision before it's made | [INTERNAL] - a design proposal, the least-sourced feature in the build |
| MAK-6 | Genealogy assembled after the fact, so a claim is arguable not settleable | Quality lead | Risk, margin | Mostly - batch-management integration and capture discipline get you far | Rowan AUTO writes the chain as the run happens; the genealogy card *is* this fix | [ASSUMED] |
| MAK-7 | Machine condition and the schedule live in separate worlds; WOs raised without context | Maintenance planner | Time, risk | Partly - a sensor-threshold rule in the maintenance system can raise a bare WO | THRESHOLDED: Rowan drafts the WO with deviation + at-risk order attached, routed for approval | [ASSUMED] |
| MAK-8 | Shift handover report built manually every shift | Shift supervisor | Time | **Yes** - a plain scheduled report solves most of this; no agent needed. The demo says so: "the low-hanging quick wins" | Rowan AUTO assembles it with live open items attached | [INTERNAL] |

## 7. Agentification deep dive

**Reads.** The MES and batch management (counters, rates, downtime events, batch records), the released sequence and standards from Shaw's planning and scheduling system **[OPEN whether that reaches the plant]**, order commitments from Oracle Fusion [SOURCED as in-stack], quality holds and inspection results (Wren's domain), the maintenance calendar and condition signals, and claims history - plausibly via Databricks [SOURCED as in-stack; its role here ASSUMED]. Rowan owns none of this data.

**Computes and decides.** Deviation vs the alert band; finish-date projection; which commitments are at risk and whether their dates are fixed or movable; the cost of each recovery option (changeover matrix, overtime, expected downgrade exposure); OEE decomposition; proposed downtime codes; the work-order draft. Inside limits it re-sequences the rest of the day on its own.

**Escalates.** Detection → line lead and plant manager, in minutes. Any option that moves a promised date → the line manager, as a ranked, costed choice. Condition signal → maintenance planner as a draft WO. The escalation itself carries the evidence (the feed), not just the alarm.

**Learns and feeds back.** Fast path: the accepted decision goes to Sawyer and the plan corrects itself same-day. Achieved rates should correct the standards the plan assumes (369 sustained means 420 is a fiction). Slow path: it *receives* rules from Wren - "never split a dye lot where an order has a fixed install date".

**Candidate thresholds** (demo wires the first): re-sequence where a promised date moves (Auto/Limit/Ask); log drift inside the alert band (±8% - the band width is itself a setting); add overtime to recover a date; raise a maintenance work order; publish shift and downtime reports. Plus parameters: who is on the notify list, and what "at risk" means in hours.

**Trust and failure modes.** Wrong standard rates make Rowan cry wolf - the fastest way to lose the floor. Stale order data flags the wrong commitments. A miscosted option is worse than no option: the numbers on the decision card are the product's credibility. Auto-mode re-sequencing that surprises operators erodes trust even when correct - which is why the auto variant *names the threshold that permitted it*. And the build is rightly honest that predictive maintenance is not demo-ready; overclaiming there would poison the rest.

**Stays human forever.** The dye-lot-or-the-date call: it trades a customer relationship against cost, and the agent can price it but cannot own the promise. Setting what "on track" means. And the never-dos: Rowan never runs the line and never overrules a quality hold.

## 8. Open questions for Shaw

- [OPEN] Is there a system that knows what the machines are doing right now - and what do they call it? (The sourced replacement for the SCADA assumption.)
- [OPEN] If one machine stops, which one costs the day? Backing 2 as the constraint is our assumption.
- [OPEN] How are downtime reason codes captured today - at the machine, or after the fact?
- [OPEN] Does planning reach the plant, or is the line sequence built in a spreadsheet? Determines what "released plan" Rowan reads.
- [OPEN] Does their MES already have an exception/monitoring layer? If so, the pitch must be cross-system, not detection.
- [OPEN] Is batch genealogy already written as the run happens, or reconstructed when a claim lands?
- [OPEN] What condition data (vibration or otherwise) exists, and where does it land?
- [OPEN] Who actually makes the dye-lot-or-date call today - line manager, planner, or customer service?

## 9. Sourcing note

Sourced from the workshop spec verbatim: Rowan's role and steps 04-06, the three-lane wording, "the dye lot or the date" as the escalated decision, both feedback paths, the never-dos, and Oracle Fusion / Databricks as the only named systems. Internal (Navanta/UnifyApps design, not from Shaw): the exception-funnel shape, the ranked-costed-options pattern, and especially the Option B history warning - a design proposal, not a described capability. Assumed: Backing 2 as the constraint line, the shift-handover discovery journey, late reason-code entry, and end-of-line inspection. Invented: every figure, ID and proper noun on the screen - +5h 10m, 369/420, 48m, 94.1%, 2,940, all lot/batch/roll/order/claim IDs, all dollar amounts, the ±8% band. Internally consistent, benchmarked against nothing.
