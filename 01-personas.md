# Personas — who the agentic layer serves, and who makes which call

**Module:** Shaw Research · **File:** 01-personas.md · **Status:** draft for review · **Primary sources:** demo build (`unifyapps-manufacturing-demo 1.html`), workshop spec, section deep-dives 01–06 (`02-journeys/`)

---

## 1. How to read this file

**Room composition at Shaw is [OPEN].** We do not know whether the workshop faces planners and IT, plant leadership, or a mix — it is the Tier 1 open question in the workshop spec, and it decides which of these personas are seats in the room versus seats we describe.

Three personas are **seeded by the workshop spec [INTERNAL]** — they appear in its lane copy and escalation mechanics, from Navanta/UnifyApps design work, not from Shaw:

- **Master scheduler** — "signs off the schedule, and decides when an order has to be split"
- **Line / plant manager** — the people Rowan "notifies in minutes"; the escalated call lands with them
- **Quality lead** — "decides the grade, and what happens to what fails"

Every other persona below is **[ASSUMED]** — an industry-typical role, unverified at Shaw, and must be validated (or renamed, merged, or struck) with Shaw before the room. Whether some of these are one seat or several — floor leadership per shift, yarn planning versus dye-house — is itself [OPEN].

All figures, IDs and proper nouns quoted from the demo (DL-4471, +5h 10m, $41,200, Plant 04 · Dalton and the rest) are invented demo data — internally consistent, benchmarked against nothing.

### Naming reconciliation

The six section files drifted on names. This file is the canonical set; the table maps the drift.

| Canonical persona (this file) | Appears in section files as |
|---|---|
| Plant manager | "Plant manager" (01, 02, 04, 05), "Plant Manager / GM" (06) |
| Master scheduler | "Master scheduler" (02), "Production scheduler" (01, 03), "Plant scheduler" (04), "Scheduler" (05) |
| Line manager / shift supervisor | "Line manager" (04), "Line lead" (01, 02, demo copy), "Shift supervisor" (01, 04), "Line Lead / Shift Supervisor" (06) |
| Quality lead | "Quality lead" (04, 05), "Quality manager" (01, 02, 03, 06) |
| Yarn & materials planner / dye-house lead | "Yarn & materials planner" and "Dye-house lead" (03) |
| Maintenance planner | "Maintenance planner" (02, 04) |
| Customer service & claims liaison | "Customer service / order owner" (02), "Claims / customer-service liaison" (05) |
| Ops excellence / CI lead | "Ops analyst" (01), "Ops Excellence / CI Lead" (06), "CI team" (04) |
| IT & governance lead | "IT & Governance Lead" (06) |

Two deliberate merges, both sanctioned by the files themselves: 06 already lumps line lead with shift supervisor in one row, and 03 flags whether yarn planning and the dye-house are one seat or two as [OPEN]. Where the merged pair had different standings on a surface, the matrix in §3 footnotes it.

---

## 2. Persona cards

### 2.1 Plant manager — [INTERNAL seed]

**Identity:** Owns the plant's P&L, its service promises and its people — and owns what Auto does in their plant.

**A day in the life today (no agents):** Arrives to a morning pack an analyst spent 1–2 hours assembling from MES and ERP exports; the numbers get disputed anyway. Problems that opened mid-shift surface at handover, hours old and lossy. Walks the floor 1–2 hours a day to find what the reports miss — sampling, not coverage. Approves overtime by reflex because nobody costs the alternatives, and fields calls about dates that moved silently. [ASSUMED throughout]

**Goals:** Hit the volume without breaking the promises; protect margin (the first-quality-to-seconds gap, not scrap); no surprises; trust boundaries that survive staff turnover.

**KPIs judged on:** Attainment, adherence (if measured — [OPEN]), OEE on the constraint line, first-quality yield, downtime, plant margin, overtime spend.

**Tools today:** MES reports and exports, the Excel pack, Oracle Fusion reports [SOURCED as in-stack], the morning meeting, the phone.

**Top frustrations:** Problems surface at handover (OVR-1); no ranked list of what needs them — triage is walking and phone calls (OVR-4); attainment masks adherence, so broken promises read as 97% success (OVR-3); quality loss tracked in yards, never as margin (QLT-3); automation you can't see breeds distrust (OVR-7); approval boundaries are tribal and reset with turnover (THR-1, THR-3).

**Decision rights (PERSON lane):** **Threshold settings** — owns the dial, per plant, inside a corporate envelope ([INTERNAL] proposal); whoever sets Auto owns what Auto does. Sets what "on track" means (the alert band). Stands behind the line manager on the big escalations — "the dye lot or the date" when the dollars are large.

**Sections used:** Overview (primary), Thresholds (primary); Scheduling, Make, Quality (secondary).

**Relationship to each agent:**
- **Sawyer** — sanity-checks the recovery after a deviation; the adherence-vs-attainment pair is the argument they take upstairs.
- **Sable** — reads the waste-avoided hero as a P&L line; doesn't operate the view.
- **Rowan** — notified at 06:40; watches finish date, margin exposure and overtime cost, not the machine detail.
- **Wren** — reads $41,200 at risk and the $18,400 bridge; the proof the schedule is a margin lever.
- **Sage** — asks "why is Backing 2 under plan?" without an analyst round-trip.

**What earns their trust:** A green "Nothing waiting on you" that has never once been wrong; an inbox ranking that matches their instinct for what matters; the agent naming where it stopped and why.

**What they fear about automation:** A false green — one missed escalation costs more trust than ten noisy ones. Auto actions that surprise ("what did it do while I slept?"). Corporate setting their dial over their head. A permanently red counter that turns control into rubber-stamping.

---

### 2.2 Master scheduler — [INTERNAL seed]

**Identity:** Builds and signs the schedule. The MPS is a commitment sales promise against — a cadence and a sign-off with their name on it, not a calculation.

**A day in the life today (no agents):** Half a day a week turning the demand signal into a week of runs and signing the commitment — rough-cut capacity only, at standard rates that stop being true by Tuesday. One to two hours every evening hand-building the line-level run order, changeover logic from memory, dye-lot checks manual — it lives in one head. Releases by email or print. Mid-shift the phone rings: a line slowed, and the re-juggle happens in the spreadsheet under pressure, uncosted, with dates moved silently. Friday is catch-up: run whatever holds the volume number, rebuild the story for the weekly meeting. [ASSUMED; APS-versus-spreadsheet at Shaw is [OPEN]]

**Goals:** A sequence the plant can actually hold; changeover dollars visible at edit time; no silent date moves; adherence measured honestly so the broken sequence stops reading as success.

**KPIs judged on:** Attainment (the wall number), adherence (if measured — [OPEN]), service dates hit, schedule stability (re-plans per week), changeover cost.

**Tools today:** APS or spreadsheet [OPEN], Oracle Fusion, email/print to the floor, the phone.

**Top frustrations:** Sequence built by hand, changeover cost tribal (SCH-1); plan and floor diverge silently mid-shift (SCH-2); attainment is the only number anyone sees (SCH-3); the dye-lot-or-date call made under pressure with no memory of last time (SCH-4); quality lessons never become scheduling rules — the split-lot cause recurred three times in four months (SCH-5); the plan assumes standard rates that are fiction on the constraint (SCH-7).

**Decision rights (PERSON lane):** **Signs off the schedule** (the MPS commitment and the released sequence — owns what it promises). **Decides when an order is split.** Approves locked-window edits before publish. **Adopts the rules Wren proposes** into the constraint model — the slow-path finding lands with them.

**Sections used:** Scheduling (primary); Overview, Yarn, Make, Quality (consulted — the fast path hands them a rebuilt plan, the slow path a candidate rule).

**Relationship to each agent:**
- **Sawyer** — their instrument: sizes, costs, rule-checks and drafts; the scheduler signs. The signature is the point.
- **Sable** — sizes dye lots inside their plan; a carve-out of Sawyer's Beat 01 packaged for the materials seat.
- **Rowan** — the fast path: a deviation arrives as a rebuilt, costed draft instead of a phone call.
- **Wren** — the slow path: sends the pattern that becomes a hard rule, chipped From Wren, at the top of their constraint model.
- **Sage** — history at the decision moment: "what happened last time we split DL-4102?"

**What earns their trust:** The verdict strip matching their own arithmetic; a changeover matrix they can open and inspect; nothing released without the Draft → Re-release gate passing through them.

**What they fear about automation:** Schedule nervousness — a plan that thrashes loses the floor faster than a bad plan; a confident, wrong plan built on bad rates; rule bloat until the model forbids everything; being reduced to rubber-stamping their own commitment.

---

### 2.3 Line manager / shift supervisor — [INTERNAL seed (line-manager half); shift-supervisor duties ASSUMED]

**Identity:** Floor leadership — runs the shift and the lines. First to feel a slowdown, today the last to learn what it means. The demo's copy calls this seat "line lead"; whether Shaw staffs it as one, two or three seats per shift is [OPEN].

**A day in the life today (no agents):** The line drifts under rate mid-shift; MES counters record it and nobody watching cross-system notices — the shortfall compounds for hours. When it surfaces, assembling "how bad is it?" means pulling output figures, cross-checking the released plan and phoning scheduling — three or four systems, no finish projection. The decision happens in a corridor, argued from instinct; overtime is the reflex. At shift end: 30–60 minutes transcribing output, downtime and holds; reason codes entered from memory, so the Pareto is part-fiction. Handover is verbal, over a whiteboard. [ASSUMED throughout]

**Goals:** Know in minutes, not at handover; options with costs attached instead of instinct; a handover that builds itself; a locked window that actually holds against whoever is senior enough to jam a change in.

**KPIs judged on:** Shift output and attainment against plan, rate on their lines, downtime and reason-code completeness, yield, on-shift overtime.

**Tools today:** MES terminals, whiteboard, spreadsheet, phone, walking.

**Top frustrations:** Deviation discovered hours late (MAK-1); nobody converts a rate drop into a finish date and orders at risk (MAK-2); reason codes from memory (MAK-3); the handover pack hand-built every shift (MAK-8); the frozen window enforced socially (SCH-6); "how do we usually fix this?" lives in a veteran's head (OVR-6).

**Decision rights (PERSON lane):** **The dye lot or the date** — the escalated call on Rowan's decision card is theirs in the demo, plant manager standing by; who actually makes it at Shaw (line manager, planner, or customer service) is [OPEN]. Accepting a costed recovery option. Confirming proposed downtime codes.

**Sections used:** Make (primary — the line-manager half; the shift-supervisor half is secondary there: downtime, codes, handover); Overview, Scheduling (secondary); Thresholds (consulted — they live with what arrives as escalation versus what just happens); Sage (primary user).

**Relationship to each agent:**
- **Rowan** — their agent: detects at 06:38, computes the consequence, alerts them at 06:40, costs three options, and names where its authority ended.
- **Sawyer** — hands them the released sequence; the locked window is their protection from churn.
- **Sable** — the 06:42 shade-integrity check arrives before they've even framed the question.
- **Wren** — owns the hold they must respect; no one — agent or person — overrules it from the floor.
- **Sage** — "how do we usually fix streaking on dark lots?" replaces the veteran and the binder, with citations.

**What earns their trust:** Detection they didn't have to chase; the amber feed entry — the agent stopping and saying why; option costs that match floor reality; the auto-mode variant naming the threshold that permitted it.

**What they fear about automation:** Being accountable for what Auto did on their shift; a re-sequence that surprises operators mid-run — correct but trust-eroding; cry-wolf alerts from wrong standard rates; the activity feed read as surveillance of their decisions rather than evidence for them.

---

### 2.4 Quality lead — [INTERNAL seed]

**Identity:** Owns the grade, the holds and the cause — the margin call at end of line.

**A day in the life today (no agents):** Clear passes and real calls get the same inspection attention. A borderline roll starts an argument — inspector, supervisor, sometimes sales — from memory of the spec, and the grade varies by who is on shift. Held batches block orders while the argument runs. "Which run made this?" is archaeology: MES run records, dye logs and shift sheets joined by hand over hours or days. Claims arrive weeks later and get contested without records; credit is issued to keep the customer. The monthly review spots repeats from memory — and the cause never reaches scheduling. [ASSUMED throughout]

**Goals:** Grade on evidence, not shift-dependent memory; claims settleable, not arguable; a pattern that becomes a process change instead of a slide; holds cleared in minutes.

**KPIs judged on:** First-quality yield, claim rate and credit dollars, hold cycle time, cost of quality — the margin-gap framing is the demo's [INTERNAL] device.

**Tools today:** Inspection station (paper or QC terminal [ASSUMED]), MES hold flags, spreadsheets, claims email chains.

**Top frustrations:** Borderline grades argued from memory (QLT-1); claims contested without records (QLT-2); quality loss never priced as margin, so the schedule is never seen as a margin lever (QLT-3); defect patterns die in a quality report (QLT-4); clear passes consume the same time as real calls (QLT-5); the second borderline this week looks like another one-off (QLT-6); held batches sit while the argument runs (QLT-7).

**Decision rights (PERSON lane):** **The grade and what happens to what fails** — Wren proposes, they decide; the agent never grades the product. **The real cause and what changes because of it** — they send the finding upstream; the scheduler adopts the rule. Guardian of quality holds: overruling one is a never-do for every agent. Guards threshold rows 2, 3 and 6 (borderline grading, lot splits, clear passes).

**Sections used:** Quality (primary); Overview, Scheduling, Yarn, Make, Thresholds (consulted — the only persona the section files place on every surface).

**Relationship to each agent:**
- **Wren** — their agent: reads inspection against spec, proposes with the full evidence chain, routes borderline and repeats to them, traces claims in under a minute.
- **Rowan** — writes genealogy as the run happens — the evidence base that makes their claims settleable.
- **Sawyer** — where their finding becomes a hard rule: "Never split a dye lot where an order has a fixed install date."
- **Sable** — the upstream shade-integrity check that prevents the defects they'd otherwise grade.
- **Sage** — cites claim and batch history back to them ("last time this appeared, B-88209, May").

**What earns their trust:** Proposed grades that match what they would have decided; every auto-grade fully audited; the ΔE bar and five-measurement table in the drawer — evidence, not opinion; Wren refusing to grade the borderline.

**What they fear about automation:** The asymmetric error — a false first-quality that ships and comes back as a claim; "Grade a borderline or repeat fault" set to Auto quietly crossing the never-grades line (the tension 05 flags honestly); instrument drift corrupting everything downstream; a mis-attributed margin bridge discrediting quality's whole argument.

---

### 2.5 Yarn & materials planner / dye-house lead — [ASSUMED]

**Identity:** Sizes dye lots and sequences colours so big orders hold their shade with the least waste. Whether this is one seat, two, or absorbed into planning at Shaw is [OPEN].

**A day in the life today (no agents):** MRP releases requirements; the planner applies a 10–15% rule-of-thumb overage in a spreadsheet — the overage is a guess, unlinked to which orders are shade-critical. Shade-criticality itself is rarely a structured field: learning it means order notes, email and calls to customer service. The dye-house lead orders runs light → dark from experience on a whiteboard, redone at every schedule change, purge cost invisible in dollars. Re-sequences land on materials after the fact; the lot split gets decided under pressure, blind to the claim history. Month-end waste is read after the fact and attributed to nothing, so nothing changes. [ASSUMED throughout]

**Goals:** Lots sized to the orders they serve, not to a guess; shade-critical commitments protected before release; cheap purges; waste attributed to cause while it can still change behaviour.

**KPIs judged on:** Yarn waste % of input, creel utilisation, purge count, remnant and obsolete stock. (The demo's figures — $8,400 avoided, 92%, 4.1%, 2 purges — are invented.)

**Tools today:** ERP/MRP output plus Excel, whiteboard, phone.

**Top frustrations:** Overage-by-rule-of-thumb is systematic waste (YRN-1); splits decided blind to shade risk and claim history (YRN-2); purge cost invisible, colour sequence rebuilt by hand (YRN-3); waste never attributed (YRN-4); materials learn of scheduling decisions after they're made (YRN-5).

**Decision rights (PERSON lane):** None of the six headline calls are theirs — this seat prepares and advises. The split of a shade-critical lot escalates past them to the scheduler / line manager via Rowan's decision card; their proposed thresholds (sizing-overage band, remnant %) are day-to-day guardrails, not judgement calls.

**Sections used:** Yarn (primary — the planner half; the dye-house half is secondary there: creel and colour sequencing); Sage (consulted).

**Relationship to each agent:**
- **Sable** — their agent: re-sizes lots as commitments change, quantifies keep-whole versus split, sequences the creel light → dark. Honestly: a carve-out of Sawyer's Beat 01 promoted to give this seat a view — Sable is not in the workshop spec.
- **Sawyer** — the schedule their material serves; date slack is what lets Sable re-sequence a purge away.
- **Rowan** — where their evidence lands: the 06:42 integrity check in the feed, the comparison behind Options A and B.
- **Wren** — the claims that started life as lot decisions; the slow path turns them into sizing rules.
- **Sage** — dye-lot history on demand.

**What earns their trust:** A waste-avoided number they can audit — the demo's $8,400 hero has no drill-in, and 03 flags that it must earn its figure; re-sizing that visibly respects commitments; a split guardrail that doesn't block splits that are genuinely right.

**What they fear about automation:** A wrong shade-criticality flag poisoning every downstream decision; being challenged on a hero number they can't decompose; material trade-offs made invisibly inside someone else's schedule; the seat itself being "absorbed into planning" by the efficiency the tool creates.

---

### 2.6 Maintenance planner — [ASSUMED]

**Identity:** Owns PM windows and work orders; keeps the constraint line alive.

**A day in the life today (no agents):** Runs the PM calendar and negotiates booked-out machine hours with scheduling. Work orders are raised manually at failure, bare of production context — nobody attaches "the constraint is 12% slow and a fixed-install order is at risk" to a WO. Condition signals like a rising vibration trend go unseen until breakdown; maintenance is reactive. [ASSUMED throughout]

**Goals:** PM windows the schedule actually respects; WOs that arrive with context instead of re-keying; condition signals caught before failure.

**KPIs judged on:** Unplanned downtime, MTBF/MTTR, PM compliance, WO backlog.

**Tools today:** The maintenance system (deliberately unnamed — "your maintenance system"), the PM calendar, the phone.

**Top frustrations:** Machine condition and the schedule live in separate worlds; WOs raised without context (MAK-7); their PM windows treated as negotiable by whoever shouts loudest.

**Decision rights (PERSON lane):** None of the six headline calls. They approve the work order Rowan drafts — threshold row 8, "Raise a maintenance work order" (Limit at Aiken, Auto at Dalton, Ask at Cartersville in the demo).

**Sections used:** Make (secondary — the machine-health card, PM window, WO draft); Scheduling (consulted — the model must plan around their booked-out hours).

**Relationship to each agent:**
- **Rowan** — drafts the WO from the vibration signal with the deviation and at-risk order attached, routed into their system, no re-keying.
- **Sawyer** — plans the sequence around their PM windows; the constraint model is where their hours are protected.
- **Sable** — no direct relationship in the demo.
- **Wren** — no direct relationship in the demo; a quality-hold pattern could implicate a machine, but that path isn't built.
- **Sage** — could answer "what did we do last time this vibration signature appeared?"; not wired in the demo.

**What earns their trust:** Context-rich WOs; the demo's own honesty that predictive maintenance is *not* demo-ready and needs Shaw's machine and sensor data — overclaiming there would poison the rest.

**What they fear about automation:** Predictive promises that can't be kept; auto-raised WOs flooding the backlog with noise; an agentic layer writing into their system of record without their approval gate.

---

### 2.7 Customer service & claims liaison — [ASSUMED]

**Identity:** Owns promised dates on the order side and settles field claims against records manufacturing created — the bridge to the supply-chain workshop. Whether promising belongs to planners or the plant is [OPEN].

**A day in the life today (no agents):** Learns of moved dates late or never — the plant re-juggles, the promise breaks silently, the customer calls them first. When the plant asks "which orders does this slowdown hit?", they check commitments by hand; the fixed-install-versus-movable asymmetry lives in order notes and memory. Weeks later a claim arrives; manufacturing's records are incomplete or take days to assemble, the claim is contested without evidence, and credit is issued to close the argument. [ASSUMED throughout]

**Goals:** No silent date moves; a fixed-install flag that is structured data, not tribal knowledge; claims settleable in minutes against records that stand up.

**KPIs judged on:** On-time delivery / date performance, claim cycle time, credit dollars issued.

**Tools today:** The order system (Oracle Fusion), email, the claims system, the phone.

**Top frustrations:** Claims contested without records (QLT-2); dates moved silently mid-shift (SCH-2); shade-criticality nowhere structured, so promises get made against lots that can't hold them.

**Decision rights (PERSON lane):** None of the six headline calls in the demo's assignment — but two carry their fingerprints: they are consulted on any date-moving re-sequence, and "who owns promising — planners or the plant?" is [OPEN]; if the answer is customer service, part of "the dye lot or the date" is actually theirs. Claim settlement authority sits with them, outside this product's scope.

**Sections used:** Quality (secondary — the traceback is their settlement record); Scheduling (consulted — did a date-moving edit get escalated or slipped through?).

**Relationship to each agent:**
- **Wren** — assembles the claim-to-batch traceback in under a minute; turns their weeks-long argument into a record.
- **Sawyer** — guards promised dates in the constraint model; the released sequence is what their promises stand on.
- **Rowan** — escalates anything that moves a promised date instead of moving it silently — the exact fix for their worst pain.
- **Sable** — lot integrity is what makes their shade promises keepable.
- **Sage** — no direct relationship in the demo.

**What earns their trust:** A traceback that stands up to an angry customer; being told *before* a date moves, with the options costed; the fixed-install flag driving real behaviour (it is why Option A beats Option B).

**What they fear about automation:** Auto re-sequencing that moves a customer promise without a human call — note that Plant 04 Dalton's demo default does exactly this, which is a conversation to have deliberately, not discover; records that are fast but wrong.

---

### 2.8 Ops excellence / CI lead — [ASSUMED]

**Identity:** Builds today's reporting pack and owns the improvement cadence — including, in the proposed model, the case for every autonomy notch.

**A day in the life today (no agents):** One to two hours each morning assembling the pack — downtime Pareto, attainment — from MES and ERP exports; the same numbers rebuilt daily, and "whose number is right" disputes anyway. Knows the Pareto part-lies because reason codes were entered from memory. Runs monthly reviews whose findings decay into slides; watches boundaries tighten after every burn and reset to zero with every manager change. [ASSUMED throughout]

**Goals:** Reports that build themselves; a Pareto that can be believed; autonomy that advances on evidence rather than vendor assurance or personal trust.

**KPIs judged on:** OEE trend, downtime reduction, CI savings claimed and audited, and — their own overhead — report timeliness.

**Tools today:** Excel over MES/ERP exports; a BI layer, plausibly on Databricks ([SOURCED] as in-stack; this use [ASSUMED]).

**Top frustrations:** The pack hand-built every day (OVR-2); the Pareto built on late-entered codes (OVR-5); every "why is this KPI down?" a round-trip through them (OVR-8); trust that is personal and doesn't transfer (THR-3).

**Decision rights (PERSON lane):** None of the six headline calls. Proposes Ask → Limit → Auto moves from the accumulated evidence and owns the review cadence of the dial — the [INTERNAL] governance proposal in 06, where "the activity feed is not a log, it is the application for autonomy."

**Sections used:** Thresholds (secondary — reviews the dial against the feed's evidence); Overview (consulted — the four self-building reports replace the pack they build by hand today).

**Relationship to each agent:**
- **Rowan** — its self-building reports replace their morning; its feed is their evidence base for the next autonomy notch.
- **Sawyer** — the adherence baseline held through every re-plan is the honest measure their CI case needs.
- **Wren** — the margin bridge prices quality loss — CI ammunition that yards-and-percent never was.
- **Sable** — waste attribution by cause, continuously, instead of a month-end surprise.
- **Sage** — the corpus their SOPs feed; every resolved incident becomes citable history.

**What earns their trust:** Reproducibility — the same figure every time, drilling down to source; an attribution logic they can inspect; thresholds that move on recorded evidence.

**What they fear about automation:** Say it honestly — their report-building job is the "low-hanging quick win" the demo automates first; numbers they can't audit replacing numbers they built; the dial moving on politics instead of the feed.

---

### 2.9 IT & governance lead — [ASSUMED]

**Identity:** Owns who may change what, the audit trail, and the corporate envelope the plant dials sit inside.

**A day in the life today (no agents):** Access reviews, integration tickets, audit preparation. Has no comparable view of operational autonomy across plants — who runs what on Auto is a survey question, instantly stale. Approval boundaries live in job titles and memory, so when an incident hits, reconstructing "who decided this, under what authority" is manual. [ASSUMED throughout]

**Goals:** Every automated action attributable to the threshold version it ran under; four-eyes on loosening a high-stakes row; integrations that read across systems without multiplying write-paths.

**KPIs judged on:** Audit findings, change-control compliance, incident attribution, integration cost.

**Tools today:** Oracle Fusion and MES administration, identity and access tooling, the change-management system.

**Top frustrations:** No cross-plant view of autonomy (THR-4); no audit trail linking a machine action to the boundary it ran under (THR-5).

**Decision rights (PERSON lane):** The **corporate envelope around threshold settings** — the [INTERNAL] proposal in 06: the plant manager owns the dial inside an envelope IT-governance owns, with some rows (split a dye lot) potentially pinned to Ask corporately. Never the operational calls themselves.

**Sections used:** Thresholds (secondary — the only surface built for them; the per-plant profiles on one screen is the demo element that answers THR-4).

**Relationship to each agent:**
- **Sawyer / Rowan / Wren / Sable** — largely indirect: they govern all four the same way — every action must cite the setting and version it acted under (the feed drawer's "Set by: Thresholds · plant" line is the seed; the full versioned trail is a build item, not in the demo).
- **Sage** — owns the cite-or-refuse policy: an uncited answer on the floor is a hazard.

**What earns their trust:** A versioned who/when/old/new/why trail on every threshold change; the reads-across-writes-back architecture owning no data of its own; the never-dos binding regardless of the dial.

**What they fear about automation:** An unauditable automated action surfacing after an incident; write-backs into systems of record outside change control; agent sprawl — the spec defines three agents, the demo ships four, and "how many will this end up being?" is their question before it is anyone else's.

---

## 3. Persona × surface matrix

**P** = primary · **S** = secondary · **C** = consulted · **–** = not a user of that surface. Cells for Overview through Thresholds are taken directly from the section files' persona tables (reconciled per §1); the Sage column is proposed from 01-overview's Sage documentation and pain OVR-6, since Sage has no section of its own.

| Persona | Overview | Scheduling | Yarn | Make | Quality | Thresholds | Sage |
|---|---|---|---|---|---|---|---|
| Plant manager | **P** | S | – | S | S | **P** | S |
| Master scheduler | C | **P** | C | C | C | – | C |
| Line manager / shift supervisor | S | S | – | **P** ¹ | – | C | **P** |
| Quality lead | C | C | C | C | **P** | C | C |
| Yarn & materials planner / dye-house lead | – | – | **P** ² | – | – | – | C |
| Maintenance planner | – | C | – | S | – | – | – |
| Customer service & claims liaison | – | C | – | – | S | – | – |
| Ops excellence / CI lead | C | – | – | – | – | S | – |
| IT & governance lead | – | – | – | – | – | S | – |

¹ Make is **P** for the line-manager half of the merged seat (04's primary); the shift-supervisor half is **S** there (downtime tile, reason codes, handover).
² Yarn is **P** for the planner half (03's primary); the dye-house half is **S** there (creel and colour sequencing).

Cross-checks against the section files: every persona each file names appears here at the standing that file gives it — including quality lead's presence on all six surfaces (the only persona the files place everywhere) and 06's lumped "Line Lead / Shift Supervisor · consulted" row.

---

## 4. Decision-rights map — every PERSON-lane call, who owns it, and the thresholds around it

The three lanes, verbatim from the spec: **AUTOMATED** "The agent just does it. Nobody has to ask, chase or put it together." · **THRESHOLDED** "The agent acts inside limits you set. Outside them it stops and asks." · **A PERSON** "Judgement. The agent prepares it — the call is yours."

Threshold defaults quoted below (Ask/Limit/Auto per plant) are the demo's invented per-plant profiles.

| PERSON-lane decision | Where it lives in the product | Owner | THRESHOLDED limits that sit around it |
|---|---|---|---|
| **Sign off the schedule** — the MPS commitment and the released sequence, owning what it promises | Sawyer: the Released/Draft chip and Re-release gate | **Master scheduler** | Small changes the agent makes itself; reorders only inside the constraint model's rules; anything breaking a dye lot or a promised date stops and asks; the 48h locked window is a hard rule — edits inside it come to a person before publish |
| **Decide when an order is split** | Sawyer, Beat 01 (no dedicated demo control — a stated right) | **Master scheduler** (customer service consulted; who owns promising is [OPEN]) | Run sizing to batch and dye-lot rules is AUTO; any split that touches a commitment escalates |
| **The dye lot or the date** — the escalated trade of a customer promise against cost and claim risk | Rowan's decision card: Options A (+$1,840, recommended) / B ($0, repeat of a known cause) / C (+$6,200) | **Line manager**, plant manager standing behind; who makes this call at Shaw is [OPEN] | "Re-sequence where a promised date moves" (Ask at Aiken and Cartersville, **Auto at Dalton** — the wired row that moves this whole decision between lanes); "Split a dye lot to hold a date" (Ask at all three plants, deliberately); "Add overtime to recover a date" (Limit/Auto/Ask across the plants); Wren's hard rule — never split where an install is fixed — binds regardless of the dial |
| **The grade, and what happens to what fails** | Wren's inspection queue: the Decide-grade button on R-11204 | **Quality lead** | "Grade a clear pass" (Auto at Aiken and Dalton, Limit at Cartersville); "Grade a borderline or repeat fault" (wired — Ask/Limit/Ask); setting the borderline row to Auto strains the never-grades line, a tension 05 holds honestly — clear-pass grading is applying spec, borderline grading is judgement |
| **The real cause, and what changes because of it** | Wren's pattern panel → "Send the finding to Sawyer" → the From Wren rule atop the constraint model | **Quality lead** decides the cause and sends; **master scheduler** adopts the rule | A one-off is recorded and watched; a pattern across batches (three in four months, in the demo's invented rule) is raised as a process change — proposed, never silently written into the model |
| **Threshold settings** — the dial itself | The Thresholds view: eight rows × Auto/Limit/Ask, per plant | **Plant manager** owns the dial; **IT & governance** owns the corporate envelope ([INTERNAL] proposal — not in the demo) | The proposed meta-threshold: four-eyes approval on loosening a high-stakes row, effective-dating, one-click rollback, and a versioned audit trail; the four never-dos are pinned regardless of any setting |

Two boundary cases, person-actions around THRESHOLDED rows rather than headline calls: the **maintenance planner approves** the work order Rowan drafts (row 8, Limit/Auto/Ask across the plants), and the **plant manager sets what "on track" means** — the ±8% drift band behind row 5 is a parameter of the PERSON-lane right the spec gives them ("sets what on track means, and what is worth being told about").

The constant underneath all six: **the agents move the run; the people make the calls.** And the four things the agents never do, whatever the dial says: run the line · write the demand plan · grade the product · overrule a quality hold.

---

## 5. Anti-personas — who this product is deliberately not for

| Anti-persona | Why not — tied to the never-dos and positioning |
|---|---|
| **Machine operators driving the line** | The first never-do: the agents **never run the line**. There is no operator-facing surface in the demo, deliberately — the operator appears exactly once, as a name in a run record (J. Alvarez, invented), which is data about the run, not a user of the layer. The agents read the MES; they never set a speed, dispatch a job to a machine, or instruct an operator. A pitch that reaches the operator's station has crossed into MES territory and broken the scope boundary the sheet states. |
| **Demand planners writing the plan** | The second never-do: the agents **never write the demand plan**. Demand is a pre-step — "already yours; we consume the signal." Sawyer sizes and sequences against a demand signal it takes as given, and MPS-drives-MRP never runs in reverse. A demand planner looking for forecasting, S&OP or demand-shaping tools finds nothing here, on purpose; that conversation belongs to the supply-chain workshop, not this one. |
| **MES administrators and plant-systems engineers** | The positioning line: the agentic layer **sits on top of what Shaw already runs and owns no data of its own**. "Your MES runs the make" is stated on the sheet precisely so nobody hears replacement. This is not an MES admin console, not a batch-management configurator, and not a machine-control layer — and the known risk ("you're just describing MES") is answered by the cross-system loop, not by competing: MES tells you what happened; nothing today turns that into a re-plan and a corrected standard. Someone evaluating this as an MES upgrade is evaluating the wrong product. |

A closing note the same logic implies: nobody in this product **grades the product or overrules a quality hold** by automation — so an anti-persona in spirit is anyone hoping to remove the quality lead from the grade. The dial can move who is asked; it never removes the never-dos.

---

## 6. Sourcing note

The three seeded personas (master scheduler, line/plant manager, quality lead) trace to the workshop spec's lane copy and escalation mechanics — [INTERNAL], Navanta/UnifyApps design, not Shaw. All other personas are [ASSUMED] industry-typical seats, unverified at Shaw; whether floor leadership, yarn planning and the dye-house are one seat or several is [OPEN], as is room composition itself. Every day-in-the-life table row is [ASSUMED] practice. The matrix reconciles the six section files' persona tables without contradicting any of them; the Sage column and all governance-model assignments (the corporate envelope, the meta-threshold, the autonomy trust journey) are [INTERNAL] proposals. Every figure, ID, plant, customer, operator and dollar amount quoted from the demo is invented — internally consistent, benchmarked against nothing — and Backing 2 as the constraint line is [ASSUMED]. Sable itself is a demo-build promotion of Sawyer's Beat 01, absent from the workshop spec — which is why the yarn/dye seat's card flags its agent as the least-grounded relationship in the set.
