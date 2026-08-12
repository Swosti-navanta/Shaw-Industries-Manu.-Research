# Scheduling — agent Sawyer - a schedule you can touch, with the rules checked as you move it

**Module:** Shaw Research · **File:** 02-journeys/02-scheduling.md · **Status:** draft for review · **Primary source:** demo build (`unifyapps-manufacturing-demo 1.html`) + workshop spec

All figures, IDs and proper nouns below are invented demo data — internally consistent, benchmarked against nothing. Backing 2 as the constraint line is [ASSUMED].

## 1. What this surface is

The Scheduling view ("Scheduling · Sawyer — Visual schedule") is a direct-manipulation schedule board, plus the rule set that governs it.

**The board.** An hour ruler from 06:00 to 18:00 (ticks every 3h) over three line rows: Tufting 3, **Backing 2** (sub-labelled *constraint · 12% slow*, amber-tinted track), Finishing 1. Every track carries the **locked-window shading** — a hatched band over the first stretch of the ruler with a dashed edge, glossed in the footnote: *"Shaded band = the locked window. Backing 2 is the constraint — an hour lost here is lost for the whole plant."* (The 48h figure lives in the rule text; the band itself is an illustrative stand-in, and the build displays the window without mechanically enforcing it.) Run blocks are width-proportional to hours, each with a colour accent, label, and dye-lot + order tags: Cascade Twist (DL-4471 · ORD-77310, dye-critical border), Meridian (DL-4488 · ORD-77412), Dune blend (uncommitted). Changeover carets sit between blocks.

**Interaction.** Only Backing 2 runs are selectable. Clicking one rings it and opens the control row: *Selected · name · dye lot*, **◀ Earlier / Later ▶** buttons, and — on the Cascade run only — the **Split lot / ↩ Run whole** toggle. Any move or split flips the **Released** chip to **Draft**; **Re-release** (in the selection control row) returns it to Released. Split state redraws Cascade as two half-blocks, *DL-4471 · A* and *DL-4471 · B (shade risk)*, separated by a **purge** marker.

**The verdict strip.** Recomputed on every edit: a **Holds** (green) or **Breaks a rule** (red) chip, Sawyer's message, and live **changeover dollars** summed from sequence-dependent pair costs (cascade↔meridian $920, dune↔meridian $640, cascade↔dune $1,840 — the dark-to-light purge, and the same $1,840 as Option A's changeover). Three states: default *"Holds both dates — DL-4471 runs whole"* at $1,560; split → *"Splits DL-4471 — two dye runs won't shade-match. Last time this produced CLM-2291"*; Cascade moved last → *"ORD-77310 misses its fixed install (18 Aug) — Backing 2 is running 12% slow."*

**The constraint model card.** Three base rules with soft/hard chips: keep a dye lot whole when shade-critical (soft), respect the 48-hour locked window (hard), campaign light → dark to cut changeover (soft). After Wren's slow-path send, a fourth rule appears **at the top, highlighted, chipped "From Wren"**: *Never split a dye lot where an order has a fixed install date · CLM-2291 · CLM-2205 · CLM-2154* (hard).

**Fast-path evidence.** After a decision is accepted in Make, the view opens with the banner *"The plan corrected itself. Rowan re-sequenced Backing 2; Sable held DL-4471 whole. Nudge it further if you like,"* and the touched runs carry **· moved** tags (the earlier 4-view build labelled these *moved by Rowan*).

**The commercial pair.** In this build the 97% attainment / 62% adherence tiles live on the Overview (adherence flagged alert), with KPI drill-in drawers and self-building report 03 *"Attainment vs adherence — the gap explained"* (the 35-pt gap, plus what broke sequence order-by-order). The earlier build carried 62% as Sawyer's own hero; it remains this section's lead number.

## 2. The job it does

Sawyer answers, for the master scheduler: **is this sequence one the plant can actually hold — and what does each change really cost?** The hero pair is **62% adherence against 97% attainment**: you made the volume and broke the promises. Attainment counts yards; adherence counts whether they came in the planned sequence on the planned day — and since dye-lot integrity, changeover cost and fixed install dates are all properties of the *sequence*, the 35-point gap is margin and service leaking while the wall-board number looks fine. That gap is the commercial case for this entire section.

## 3. Personas

| Persona | Role here | Comes to this screen to |
|---|---|---|
| **Master scheduler** (primary) | Approving authority. The MPS is a commitment with a cadence and a sign-off — sales promise against it — not a calculation | Build, test and re-release the sequence; own what it promises |
| **Plant manager** (secondary) | Owns the day and the trade-offs | See what a deviation did to the plan; sanity-check the recovery |
| **Line lead** (secondary) | Receives the released sequence | Know what runs next and why it changed; trust the locked window |
| **Customer service / order owner** (consulted) | Owns promised dates ([OPEN] whether planners or the plant own promising) | Check whether a date-moving edit was escalated |
| **Quality manager** (consulted) | Source of slow-path rules | Confirm the From Wren rule landed in the constraint model |
| **Maintenance planner** (consulted) | Owns PM windows the sequence must plan around | Verify the model respects booked-out hours |

## 4. The journey today — without the agentic layer

Industry-typical practice; whether Shaw's APS reaches the plant or hands the floor a spreadsheet is [OPEN]. All timings [ASSUMED].

| Stage | Trigger | What the person does | Tools and systems | Friction | Typical time |
|---|---|---|---|---|---|
| Weekly plan & MPS sign-off | Demand signal, weekly cadence | Scheduler turns demand into a week of runs; signs the commitment | APS or spreadsheet [OPEN]; Oracle Fusion ERP | Rough-cut capacity only; assumes standard rates | 0.5–1 day/wk |
| Daily sequencing | Evening before | Hand-builds line-level run order; changeover logic from memory | Spreadsheet [ASSUMED] | Sequence-dependent cost invisible; dye-lot checks manual; lives in one head | 1–2 h/day |
| Release to floor | Sequence settled | Emails / prints the list; MES dispatches | Email, MES | Floor works from a snapshot; no shared live picture | ~30 min |
| Mid-shift deviation | Line slow, hold, material-out | Line lead phones the scheduler; re-juggle in the spreadsheet; ring the affected parties | Phone, spreadsheet | No costed options; dates moved silently; the dye-lot-or-date call made under pressure from memory | 1–3 h per event |
| Friday catch-up & reconciliation | End of week | Run whatever holds the volume number; rebuild the story for the weekly meeting | Spreadsheet, ERP reports | Adherence unmeasured, so the broken sequence reads as success; same trade-offs re-argued every time | 0.5 day/wk |

## 5. The journey with the agentic layer

| Stage | Agent action (lane) | Person action | What the screen shows as evidence |
|---|---|---|---|
| Build & cost the week | Sawyer sizes runs to batch/dye-lot rules, checks the week against capacity, costs changeovers pairwise, rebuilds every cycle (AUTO) | Reviews the board | Runs sized to hours; changeover dollars on the verdict strip |
| Sign-off & release | Prepares the release (AUTO) | Master scheduler signs off — the MPS commitment stays theirs (PERSON) | **Released** chip |
| Touch the plan | Checks every move against the constraint model; recomputes dollars (THRESHOLDED) | Selects a run, moves Earlier/Later, tries the split, re-releases | Draft chip; verdict strip flips Holds ↔ Breaks a rule; split verdict cites CLM-2291 |
| Deviation on the constraint | Rowan detects −12%, escalates; on accept Sawyer rebuilds and re-releases (THRESHOLDED; Auto by default at Plant 04) | Picks the dye lot or the date (PERSON above the limit) | *The plan corrected itself* banner; **· moved** tags; recomputed changeover |
| Locked-window edits | Anything inside 48h stops and comes to a person before publish (THRESHOLDED) | Approves or refuses | Hatched band; hard rule row |
| Learning | Wren traces the 3-claim pattern and raises a process change (THRESHOLDED) | Accepts the new rule (PERSON) | **From Wren** rule at the top of the constraint model |

## 6. Pain points

| ID | Pain | Who feels it | Cost type | Fixable WITHOUT agents? (how) | Agentified fix (lane + agent) | Marker |
|---|---|---|---|---|---|---|
| SCH-1 | Sequence built by hand; changeover cost is tribal knowledge, invisible at edit time | Master scheduler | Time, margin | Largely — an APS with a maintained sequence-dependent setup matrix costs this at plan time; the demo's verdict strip is that matrix made live | Sawyer AUTO costs every pair; verdict strip recomputes dollars per move | [ASSUMED], APS reach [OPEN] |
| SCH-2 | Mid-shift re-planning is a phone call; plan and floor diverge silently | Scheduler, line lead, plant manager | Time, service, trust | Only partly — MES alerting says the line slowed; nothing rebuilds the sequence or costs the options | Fast path: Rowan detects → Sawyer rebuilds (THRESHOLDED); banner + moved tags | [ASSUMED] |
| SCH-3 | Attainment is the wall number; adherence unmeasured, so breaking every promise reads as 97% success | Plant manager, scheduler, commercial | Service, margin | Yes for the *measuring* — a plain BI report of MES actuals vs released plan (report 03 is exactly this). Doesn't fix the behaviour, but builds the case | Sawyer keeps a released baseline through every re-plan so adherence stays honest (AUTO) | figures invented, practice [ASSUMED] |
| SCH-4 | The dye-lot-or-date call is made under pressure, uncosted, with no memory of last time | Scheduler, plant manager | Margin, risk | No — a static rule can forbid splits but can't weigh $1,840 changeover vs $18,400 claim exposure vs $6,200 overtime across ERP, MES and claims history | PERSON lane: three costed options; split verdict cites CLM-2291 before the mistake is repeated | [ASSUMED]; the CLM-2291 callback is a design proposal [INTERNAL] |
| SCH-5 | Quality lessons never become scheduling rules — the split-lot cause recurred three times in four months | Scheduler, quality manager | Margin, trust | Partly — a monthly quality review can hand over a rule; in practice it decays into a slide | Slow path: Wren raises the pattern (THRESHOLDED), person accepts, rule lands chipped From Wren | mechanic [INTERNAL], figures invented |
| SCH-6 | The frozen window is enforced socially — anyone senior enough can jam a change in | Line lead, scheduler | Trust, time | Yes — a planning time fence is standard APS capability; the demo shows it (lockwin shading + hard rule) without enforcing it | Sawyer routes locked-window edits to a person before publish (THRESHOLDED) | [ASSUMED] |
| SCH-7 | The plan assumes standard rates; on the constraint line it is fiction within an hour of a slowdown | Scheduler, plant manager | Service, time | Partly — refreshing APS master data with actuals, always stale | Constraint & readiness model reads achieved rates live (AUTO); board flags *constraint · 12% slow* | [ASSUMED] |

Where the screen already solves the pain: SCH-1 → the verdict strip; SCH-3 (measurement half) → the adherence tile and report 03; SCH-6 (visibility half) → the locked-window band and hard rule.

## 7. Agentification deep dive

**Reads.** Demand signal from Shaw's demand planning system (a pre-step — Sawyer consumes it, never produces it); order commitments, quantities and dates from Oracle Fusion ERP; achieved rates, downtime and confirmations from the MES; dye-lot and batch data from MES and batch management; PM windows from the maintenance system; claims patterns from Wren; history via Databricks. Oracle Fusion and Databricks are [SOURCED] as stack members; every read path is proposed [INTERNAL], not confirmed integration.

**Computes and decides.** Run sizing to batch and dye-lot rules; rough-cut capacity check on the week; pairwise sequence-dependent changeover costing (the light→dark cheap / dark→light purge asymmetry is what makes sequencing an optimisation, not a sort); finish projection at *achieved*, not standard, rates; rule-checking every candidate against the constraint model. In AUTO it rebuilds each cycle and releases inside the rules. In THRESHOLDED it reorders runs inside limits — anything that breaks a dye lot, moves a promised date, or touches the locked window stops and asks.

**Escalates.** Date-moving re-sequences to the master scheduler / plant manager (via Rowan's decision card); locked-window edits to a person before publish; order splits to the master scheduler.

**Learns and feeds back.** Achieved rates continuously correct the constraint model (SCH-7); Wren's defect patterns arrive as candidate rules — the standard changes, not just the report. Whether accepted verdicts should tune thresholds over time is an extrapolation [INTERNAL], not a described capability.

**Candidate thresholds.** From the demo's Thresholds screen, per plant: *re-sequence where a promised date moves* (Ask at Plants 12/21, Auto at Plant 04 — the wired row); *split a dye lot to hold a date* (Ask everywhere — deliberately); *add overtime to recover a date* (Limit/Auto/Ask across the three plants). Not in the demo but natural for this section: a **changeover-dollar cap** on unattended reorders; a **locked-window length** per plant; a **maximum re-sequences per shift** to stop plan churn.

**Trust and failure modes.** Bad rates in → a confident, wrong plan out. Over-automated re-sequencing produces schedule nervousness — a plan that thrashes loses the floor faster than a bad plan does, which is why the Draft/Re-release gate and the locked window matter as trust anchors, not just controls. The verdict is only as good as the changeover matrix behind it. Rule bloat is real: if every incident adds a hard rule, the model eventually forbids everything. And if the APS assumption is wrong ([OPEN]), the positioning inverts from "improves your APS" to "gives the floor its first real scheduler".

**What must stay human forever.** Signing off the MPS — it is a commitment sales promise against, with a cadence and an accountable name, and accountability cannot be delegated to software. Deciding to split an order or a shade-critical lot. Owning "the dye lot or the date". Sawyer prepares all of it; the signature is the point.

## 8. Open questions for Shaw

- [OPEN] Does the planning system reach the plant, or is the line sequence built in a spreadsheet? (Tier 1 — inverts the narrative.)
- [OPEN] Who owns promising — planners or the plant? Determines who approves a date-moving re-sequence.
- [OPEN] Do they say attainment or adherence internally — and is adherence measured at all today?
- [OPEN] If one machine stops, which one costs you the day? (Backing 2 as constraint is our assumption.)
- [OPEN] Is there a real frozen period, how long is it, and who can break it?
- [OPEN] How are changeover costs known today — a maintained matrix, or one scheduler's memory?
- [OPEN] What cadence and sign-off does the MPS actually carry at Shaw?

## 9. Sourcing note

The three-lane wording, Sawyer's lane behaviours, the MPS-as-commitment framing, the feedback loop in both paths and the never-do list are [SOURCED] to the workshop spec; Oracle Fusion and Databricks are the only sourced systems. The screen inventory is [SOURCED] to the demo build itself. The three-bucket structure, end-of-line QC placement and "Shaw already has an APS" are [INTERNAL]. The today-journey, the dye-lot constraint as a Shaw operating rule, Backing 2 as the constraint line, and all timings are [ASSUMED] industry-typical practice. Every number, ID, style name, customer and dollar figure — 62/97, $1,840, $1,560, DL-4471, CLM-2291, 18 Aug and the rest — is invented demo data; the Option B/split-verdict claim callback is a design proposal, not a described capability.
