# Quality - agent Wren - the margin call at end of line, and the loop that sends the cause upstream

**Module:** Shaw Research · **File:** 02-journeys/05-quality.md · **Status:** draft for review · **Primary source:** demo build (`unifyapps-manufacturing-demo 1.html`) + workshop spec (`Shaw_Manufacturing_Workshop_Spec.md`)

All figures, IDs and proper nouns below are invented demo data — internally consistent, benchmarked against nothing.

## 1. What this surface is

The Wren view ("Quality · Wren — End-of-line quality & traceback") contains, top to bottom:

- **Hero card** — `$41,200` margin at risk in red, with the inline bridge link "**$18,400 traces to a sequence decision**" and the framing line "The loss is the first-quality-to-seconds margin gap, not scrap."
- **Margin-bridge drill-in drawer** (click the $18,400): a bridge table — total $41,200; from the split decision **$18,400**; shade/process (other) **$14,600**; build/edge faults **$8,200** — plus a "Why it's one loop" note (a grade problem here was a sequencing choice upstream) and trace-to buttons for CLM-2291 and DL-4471.
- **Inspection queue** — three rolls. **R-11202** and **R-11203**: first quality, purple dot, chip *Auto-graded*, "detail →" opens the roll drawer. **R-11204** has three state variants: pending (red dot, "Borderline · 2nd occurrence", chip *Needs you*, **Decide grade** button); person-graded (`gradeDone` — "Confirmed second", chip *Graded*); and auto-graded (threshold "Grade a borderline or repeat fault" set to Auto — "Confirmed second", chip *Auto-graded · limit*, no button). The queue subtitle flips from "one needs a person" to "all settled", the Wren sidebar badge and header decision counter clear, and the Overview exception row for B-88214 flips to *Graded*.
- **Roll drawer (R-11204)** — summary "Borderline — flagged for shade variation… 2nd occurrence this week, so it goes to a person"; the five-measurement table vs spec (Shade ΔE ≤2.5 / **2.9 fail**; Streaking none / **slight fail**; width, pile height, tuft bind pass) with a ΔE bar showing tolerance 2.5 vs actual 2.9; the source chain Yarn lot Y-30918 → Dye lot DL-4471 → Batch B-88214 → Run (Backing 2, Shift A, 05:10–06:40, **operator J. Alvarez, 369 yd/hr against std 420**); a "Why it's an issue" note (prior occurrence R-11189); commercial impact **$918** (148 lin yd × $24.8 first − $18.6 seconds); and "What happens next": *Wren proposes second, route to outlet, flag the split as cause — you decide the grade, the agent never grades the product*, with a "Could become a claim like CLM-2291 →" button.
- **Claim traceback card** — the chain CLM-2291 → rolls R-11198/99 → batch B-88209 → dye lot DL-4102, ending in the red **cause card**: "the lot was split to protect a date, and the two dye runs did not shade-match. Time to trace: under a minute." (Build note: the roll/batch/dyelot nodes drill into the *current* incident's drawers — a wiring shortcut; the historical chain lives in the claim drawer.)
- **Claim drawer (CLM-2291)** — root cause, the full traceback with annotations ("graded seconds after the fact", "split into 2 runs · ΔE 3.4 apart"), cost **$18,400** (credit + seconds downgrade), and the three-claim pattern bars.
- **Pattern panel** — "3 claims, 4 months, one cause": chips CLM-2291 · Jun, CLM-2205 · May, CLM-2154 · Apr (each opens the claim drawer), and the **Send the finding to Sawyer →** button. After sending: a green resolved panel and "See it in the constraint model →", where the new **hard rule** "Never split a dye lot where an order has a fixed install date" sits at the top of Sawyer's constraint model, chipped *From Wren*.
- **Related surfaces elsewhere:** the batch drawer (B-88214 on hold since 06:52, station "Vision + ΔE", "nothing ships until a person grades it", exposure $918); the Overview first-quality-yield tile (96.2%, −1.4 pts) whose report drawer attributes the miss to shade and repeats the $41,200; and the two wired Thresholds rows — "Grade a clear pass" and "Grade a borderline or repeat fault" — with different defaults per plant (Aiken ask, Dalton limit, Cartersville ask for the borderline row; Cartersville holds even clear passes at Limit).

## 2. The job it does

Wren answers: **what is off-quality costing us in margin, which roll needs a person's grade right now, and what upstream decision caused it?** It leads with **$41,200 margin at risk**, and the number that carries the argument is the bridge inside it — **$18,400 traces to one scheduling decision**. Off-quality carpet is not scrapped; it is downgraded to seconds and sold through outlet channels, so the loss is the margin gap between first-quality and seconds price on every downgraded yard [INTERNAL — the workshop spec's commercial framing]. That makes the schedule a margin lever, and Wren is the surface that proves it.

## 3. Personas

| Persona | Role here | Comes here to |
|---|---|---|
| **Quality lead** (primary) | Owns grading and disposition | Grade the borderline roll on evidence, own holds, decide what a pattern means and send the finding upstream |
| **Claims / customer-service liaison** (secondary — the bridge to the supply-chain workshop) | Settles field claims against records manufacturing created | Pull the traceback chain in under a minute so a claim is settleable, not arguable |
| **Plant manager** (secondary) | Owns plant P&L | Read the margin-at-risk figure and its bridge; see which losses are process vs schedule |
| **Scheduler** (consulted) | Owns the constraint model | Receive and adopt the rule Wren's slow path proposes |

## 4. The journey today - without the agentic layer

Industry-typical practice; unverified at Shaw unless marked. The brief in one line: defects found at end of line and argued about later, claims contested without records.

| Stage | Trigger | What the person does | Tools and systems | Friction | Typical time |
|---|---|---|---|---|---|
| End-of-line inspection | Roll comes off the line | Inspector measures/eyeballs vs spec, logs result | Inspection station, paper or QC terminal [ASSUMED] | Every roll gets the same attention, clear pass or not | Minutes/roll |
| The borderline argument | A marginal roll (shade, streaking) | Inspector, supervisor, sometimes sales argue the grade; roll set aside | Judgement, memory of the spec | No shared evidence; grade varies by who is on shift [ASSUMED] | Hours, sometimes days |
| Hold & disposition | Batch held pending grade | Chase the QC decision so the batch can ship | MES hold flags, phone calls | Held stock blocks orders while the argument runs | Hours–days |
| Traceback | Someone asks "which run made this?" | Pull MES run records, dye logs, shift sheets by hand | MES, batch records, spreadsheets [ASSUMED] | Records exist but joining them is archaeology | Hours–days |
| Claim settlement | Field claim arrives weeks later | Claims team asks manufacturing for records; often incomplete | Email, claims system, ERP credits | Claim contested without records; credit issued to keep the customer [ASSUMED] | Weeks |
| Pattern-to-process | Nothing — no trigger exists | Monthly quality review may spot repeats from memory | Quality reports | Three claims, four months, same cause — and the cause never reaches scheduling [ASSUMED] | Never, reliably |

## 5. The journey with the agentic layer

| Stage | Agent action (lane) | Person action | What the screen shows as evidence |
|---|---|---|---|
| Inspection | Wren reads measurements vs spec, links roll to batch and run record (AUTO) | None | Roll drawer: five measurements, source chain written as the run happened |
| Clear passes | Graded automatically inside the limit (LIMIT — "Grade a clear pass") | None | R-11202 / R-11203 chipped *Auto-graded* |
| Borderline / repeat | Stops and routes to a person with the proposed grade and evidence (LIMIT → PERSON) | Quality lead clicks **Decide grade** | R-11204 *Needs you*; ΔE bar 2.9 vs 2.5; prior R-11189; "Wren proposes second — you decide" |
| Margin visibility | Computes margin at risk and attributes it to causes (AUTO) | Plant manager reads it | $41,200 hero; bridge drawer 18,400 / 14,600 / 8,200 |
| Claim traceback | Walks claim → rolls → batch → dye lot from held records (AUTO) | Liaison settles against the record | Cause card: "time to trace: under a minute" |
| Pattern | A one-off is watched; three batches raised as a process change (LIMIT) | Quality lead clicks **Send the finding** | Pattern panel: 3 claims, 4 months, one cause |
| Rule adoption | Finding lands as a candidate hard rule (AUTO delivery) | Scheduler owns the constraint model | Sawyer's model: "Never split a dye lot…" chipped *From Wren* |

## 6. Pain points

| ID | Pain | Who feels it | Cost type | Fixable WITHOUT agents? (how) | Agentified fix (lane + agent) | Marker |
|---|---|---|---|---|---|---|
| QLT-1 | Borderline grades argued from memory, not evidence; grade varies by shift | Quality lead | Trust, margin | Largely — a digital inspection record with spec limits is plain data capture | Wren proposes with full evidence chain; person decides (PERSON). The roll drawer *is* this fix | [ASSUMED] |
| QLT-2 | Claims contested without records; credits issued to close the argument | Claims liaison | Margin, service | Partially — a genealogy database with search fixes retrieval, if someone builds the joins | Traceback assembled in under a minute, unprompted (AUTO, Wren). The cause card is the demo element | [ASSUMED] |
| QLT-3 | Quality loss tracked in yards and percent, never as margin; the schedule is never seen as a margin lever | Plant manager | Margin | Yes for the total — a BI report can price the downgrade gap. No for the bridge — attributing dollars to a *sequence decision* needs the cross-system join | Live margin-at-risk hero with the cause bridge (AUTO, Wren) | [INTERNAL] |
| QLT-4 | Defect patterns never change the schedule — the cause analysis dies in a quality report | Quality lead, scheduler | Margin, risk | Not reliably — a monthly review depends on memory and has no write-path into scheduling standards | Slow path: pattern raised as a process change, one click creates a hard rule in Sawyer's constraint model (LIMIT → PERSON, Wren → Sawyer) | [INTERNAL] |
| QLT-5 | Every roll gets the same inspection attention; clear passes consume the same time as real calls | Quality lead | Time | Mostly — rule-based auto-grading of clear passes is standard QMS territory | Thresholded grading: Auto for clear passes, Ask for borderline/repeat, a per-plant dial (LIMIT, Wren) | [ASSUMED] |
| QLT-6 | Repeat faults judged in isolation — the second borderline this week looks like another one-off | Quality lead | Risk, margin | Partially — SPC flags drift on one measure, but not "same fault, different roll, same week" across records | Wren links occurrences (prior: R-11189) and escalates the repeat as a pattern signal (LIMIT) | [ASSUMED] |
| QLT-7 | Held batches sit while the grade argument runs; nothing ships from B-88214 until someone decides | Plant manager | Service, time | Partially — a hold dashboard makes the queue visible, not faster | Escalation with a proposed grade attached makes the decision minutes, not days (LIMIT → PERSON) | [ASSUMED] |

Honesty note: QLT-1, QLT-2 and QLT-5 are substantially integration-and-record problems — a well-built inspection system and genealogy store gets most of the value with no agent. The distinctly agentic value is QLT-3's bridge and QLT-4's slow path: pricing the loss, attributing it upstream, and giving the finding a write-path into the constraint model.

## 7. Agentification deep dive

**What it reads.** End-of-line inspection measurements and hold records from your MES and batch management; run records (line, shift, operator, achieved rate) for the source chain; the released sequence and its decisions from your planning and scheduling system, to attribute cause; orders, first-quality and seconds pricing, and claim credits from Oracle Fusion; claim history and SOPs from your records (Databricks is the sourced analytics layer for pattern mining). It owns none of this data.

**What it computes and decides.** Pass/borderline/fail per measurement against spec; repeat detection across rolls and weeks; margin at risk per roll (yards × price gap — the $918) and per week (the $41,200); cause attribution across the bridge (split decision / shade-process / build-edge); traceback chain assembly from a claim ID; pattern detection across claims. It decides nothing about grade beyond clear passes inside the limit.

**What it escalates, to whom.** Borderline or repeat → quality lead, with the proposed grade and evidence attached. A pattern across batches → quality lead and scheduler, as a process-change proposal, never a silent rule edit. A completed traceback → claims liaison, as the settlement record.

**What it learns and feeds back.** The slow path is the learning loop: a confirmed pattern becomes a candidate scheduling rule ("Never split a dye lot where an order has a fixed install date"). Person-corrected grades could also tune the borderline band over time — a proposal, not a demo capability.

**Candidate thresholds for this section:** grade a clear pass (wired in the demo); grade a borderline or repeat fault (wired); the width of the borderline band (how far past ΔE 2.5 is still "borderline"?); what counts as a repeat (2 in a week?); what counts as a pattern (3 claims in 4 months is the demo's invented rule); the margin-at-risk value that forces escalation to the plant manager; whether a Wren finding enters the constraint model automatically or only after scheduler sign-off.

**Trust and failure modes.** The asymmetric error is a false first-quality: an auto-graded roll that ships and comes back as a claim costs credit plus trust, which argues for a conservative auto band and full audit of every auto-grade. Instrument drift at the inspection station corrupts everything downstream. Wrong cause attribution in the bridge — dollars pinned on a sequence decision that was really process — would misdirect scheduling and discredit the number; the attribution logic must be inspectable. And rule proliferation: if every pattern adds a hard rule, the constraint model ossifies — rules need owners and review dates.

**What must stay human forever.** The grade on a contested roll — it is a warranty and brand judgement, not a measurement (the demo says it on screen: "the agent never grades the product… you decide the grade"). Overruling a quality hold — one of the four nevers. And deciding the real cause and what changes because of it: a rule that constrains every future schedule is a policy decision. One honest tension to hold: the demo's threshold dial *can* set "Grade a borderline or repeat fault" to Auto (chip reads *Auto-graded · limit*), which strains the never-grades line. The reconciliation is that clear-pass grading is applying spec while borderline grading is judgement — whether Shaw would ever delegate the latter is theirs to answer, and the dial existing is the point.

## 8. Open questions for Shaw

- [OPEN] Is inspection only at end of line, or in-process as well (e.g. greige after tufting)? The demo shows only the end-of-line gate.
- [OPEN] What measures a roll today — instrumented vision/ΔE or human eye — and does a digital inspection record exist per roll? ("Vision + ΔE" is invented.)
- [OPEN] What is the real first-quality-to-seconds price gap, and does anyone compute a margin-at-risk figure today?
- [OPEN] How is a claim settled today — what records does the claims team pull from manufacturing, and how long does it take?
- [OPEN] What share of off-quality is sequence-caused at Shaw (start-up waste, colour order, split lots)? The 18,400/14,600/8,200 bridge is pure invention.
- [OPEN] Does any route exist today for a defect pattern to change scheduling standards, and who would own such a rule?
- [OPEN] Who has grading authority, and is there any grade Shaw would delegate to a system?
- [OPEN] Solution-dyed or piece-dyed dominant? This decides where shade risk enters — and the demo currently mixes framings (a solution-dyed yarn lot *and* a dye vessel record on DL-4471). Fix the data once answered.

## 9. Sourcing note

The skeleton is [INTERNAL]: Wren's three steps (inspection, grading, claims linkage), all lane statements, the margin-gap commercial framing, the two loop paths and the four nevers come from the workshop spec, which itself reflects Navanta/UnifyApps feedback rather than Shaw confirmation. General carpet facts — seconds sold through outlet channels, dye-lot shade behaviour, end-of-line inspection practice — are [SOURCED] from industry material but not Shaw-specific; QC positioned at end of line is [INTERNAL], and the entire "journey today" table is [ASSUMED]. Every number, ID and proper noun ($41,200, $18,400, $918, ΔE 2.9 vs 2.5, all rolls, batches, claims, operators, prices) is invented and internally consistent only. Two figures deserve presenter care: $18,400 does double duty as both the June claim's settlement cost and this week's sequence-traced bridge component, and the Option-B claim callback that this section powers is a design proposal, not a described capability.
