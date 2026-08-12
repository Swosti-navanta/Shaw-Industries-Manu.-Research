# Overview (exception inbox) - the front door that tells you what needs a person, not a dashboard to go read

**Module:** Shaw Research · **File:** 02-journeys/01-overview.md · **Status:** draft for review · **Primary source:** demo build (`unifyapps-manufacturing-demo 1.html`) + workshop spec

All figures, IDs and proper nouns below are invented demo data — internally consistent, benchmarked against nothing.

## 1. What this surface is

The landing view of the demo, titled **"What needs a person this shift"**, subtitled *"The engine opens by telling you what to act on — not with a dashboard to go read."* Full inventory:

- **Exception inbox** — a card "ranked by what it costs you" with four entries: (1) *Backing 2 running 12% under plan* (Cascade Twist · Dune 240 · DL-4471 · ORD-77310 at risk), clickable → Make/Rowan; (2) *Batch B-88214 on quality hold* (since 06:52 · roll R-11204 at inspection), clickable → Quality/Wren; (3) *5 items resolved automatically* (minor re-sequence · drift logged · reports built), badged **Automated**; (4) *1 item stopped at a limit* (re-sequencing Backing 2 moves a promised date), badged **Inside limits**. Entries 1 and 2 **re-badge live**: with the threshold "Re-sequence where a promised date moves" set to Auto (Plant 04's default), entry 1 flips from **Needs you** to **Auto-resolved**; grading the roll (or Auto on "Grade a borderline or repeat fault") flips entry 2 to **Graded**. Every entry carries exactly one lane chip — nothing is unlabelled.
- **Four KPI tiles** with drill-in drawers, each with a 7-reading trend sparkline and a "Current" figure: **Attainment 97%** (drawer: "It looks fine on its own — which is the trap"); **Adherence 62%** (alert-styled; drawer names the 35-pt gap as "the whole argument for scheduling"); **Backing 2 OEE 78%** (alert-styled; drawer decomposes Availability 86% × Performance 92% × Quality 98%); **First-quality yield 96.2%** (drawer adds a loss-by-type pareto: shade 2.1%, edge trim 1.0%, tuft faults 0.5%). (Build note: the yield tile reads 96.2% but its drawer reuses Rowan's 94.1% yield KPI, and entry 1's red dot doesn't recolour when re-badged Auto-resolved — two seams to fix before the room.)
- **Four self-building reports** ("Reports that build themselves — the low-hanging quick wins — nobody assembles these"), each opening a drawer stamped *"Quick win · L — built automatically — nobody assembled this"*: **01 Shift handover** (open items: hold B-88214, ORD-77310 at +5h 10m, Backing 2 work order, the −12% deviation; plus shift KPIs); **02 Downtime Pareto** (48 min by reason code: material-out 19m, changeover 12m, quality hold 9m, no operator 5m, minor stops 3m — with the note that material-out and the hold both tie back to DL-4471); **03 Attainment vs adherence** ("you made the volume, in the wrong order"; the 35-pt gap; what broke sequence, order by order); **04 First-quality yield** (downgrades by cause; $41,200 margin at risk).
- **Header decision counter** (every view): **"Decisions waiting N"** on a red pill, or **"Nothing waiting on you 0"** on green. N is computed from open decisions *and* the plant's thresholds — flip re-sequencing to Auto and the counter drops without anyone acting. The same logic drives sidebar badges on Make and Quality.
- **Plant selector** (header): Plant 12 · Aiken SC, Plant 04 · Dalton GA, Plant 21 · Cartersville GA. Switching plants swaps in that plant's threshold defaults, so the counter, badges and inbox chips recompute — Aiken opens with 2 waiting, Dalton with 1. All plant names/numbers invented.
- **Sage** (cross-cutting, documented here): the **Ask Sage** button lives in the header on every view and opens a Q&A drawer — *"Answered from your SOPs and what the plant has already solved. Cited. Sage never makes the call."* Three wired questions: why is Backing 2 under plan (cites the run record and the 06:38 deviation); how do we usually fix streaking on dark lots (cites the shade-variation SOP and batch B-88209); what happened last time we split DL-4102 (cites claim CLM-2291). Answers render with source chips.
- Chrome: "Illustrative data" chip on the page header; sidebar foot "One engine · 30+ plants · Illustrative demo data".

## 2. The job it does

It answers, in one glance at shift start: **what needs me, what handled itself, and where did the agent stop** — for the plant manager and whoever is running the shift. The hero it leads with is the counter: **Decisions waiting 2**. Everything else on the screen is evidence for that number — the inbox ranks the two asks by cost, the tiles show why they matter (97% attainment hiding 62% adherence), and the automated rows prove the quiet work happened without anyone chasing it.

## 3. Personas

| Role | Standing | Comes here to |
|---|---|---|
| **Plant manager** | Primary | Start the shift knowing the ranked asks; watch the four KPIs; trust "Nothing waiting on you" |
| **Shift supervisor** | Secondary | Consume the self-built handover instead of assembling it; triage the inbox |
| **Line lead** | Secondary | Open an inbox item straight into Make; ask Sage "how do we usually fix X" |
| **Production scheduler** | Consulted | The adherence tile and report 03 are their argument, made here |
| **Quality manager** | Consulted | The yield tile and inbox hold entry route into their queue |
| **Ops analyst** | Consulted | The four reports replace the pack they build by hand today |

## 4. The journey today - without the agentic layer

Industry-typical practice; unverified at Shaw unless marked otherwise.

| Stage | Trigger | What the person does | Tools and systems | Friction | Typical time |
|---|---|---|---|---|---|
| Problem opens mid-shift | Line drifts under rate | Nothing — nobody is watching the cross-system picture; operator may notice locally | MES terminals, local alarms | Signal exists in MES but no date/cost impact is computed; the constraint slips quietly | Hours of silence [ASSUMED] |
| Shift-end data pull | End of shift | Supervisor transcribes output, downtime, holds | MES screens, spreadsheet, paper | Reason codes entered late, from memory | 30–60 min [ASSUMED] |
| Handover meeting | Shift change | Oncoming shift briefed verbally | Whiteboard, spreadsheet | **This is where problems first surface** — hours old, detail lossy | 15–30 min [ASSUMED] |
| Morning report build | Daily cadence | Analyst/manager assembles the pack (downtime Pareto, attainment) | Excel over MES/ERP exports | Same numbers rebuilt daily; whose-number-is-right disputes | 1–2 h [ASSUMED] |
| Walking the floor | Habit | Manager tours the lines to find what reports miss | Eyes, conversations | Sampling, not coverage | 1–2 h [ASSUMED] |
| Ad-hoc questions | Something recurs | Ask the veteran, dig through binders/shared drives | Tribal knowledge | Answers unverifiable, leave with retirees | Minutes–days [ASSUMED] |

## 5. The journey with the agentic layer

| Stage | Agent action (lane) | Person action | What the screen shows as evidence |
|---|---|---|---|
| Deviation opens 06:38 | Rowan detects, computes +5h 10m impact, notifies line lead + plant manager (AUTO) | Is told in minutes, not at handover | Inbox entry 1; Rowan's feed stamps 06:38–06:44 |
| Triage | Inbox ranks open items by what they cost (AUTO) | Reads top-down, opens the top item | "Exception inbox — ranked by what it costs you", Open → links |
| Bounded work | Minor re-sequence done, drift logged, reports built (AUTO); re-sequencing Backing 2 stopped because it moves a promised date (LIMIT) | Sees what ran alone and where the agent stopped | Rows 3 and 4 of the inbox |
| Decision | Escalation prepared, options costed (PERSON) | Clicks through to Make/Quality and makes the call | Counter "Decisions waiting 2"; sidebar badges |
| Reporting | Four standing reports assemble themselves (AUTO — the "Publish shift & downtime reports" threshold, Auto at all three plants) | Reads instead of building | Report cards + "nobody assembled this" drawers |
| Questions | Sage answers from SOPs and plant history, cited (AUTO — never decides) | Asks, judges, acts | Sage drawer with source chips |
| Oversight | Counter and chips recompute per plant thresholds | Sets the dial; switches plants | Plant selector; entry 1 re-badged Auto-resolved on Plant 04 |

## 6. Pain points

| ID | Pain | Who feels it | Cost type | Fixable WITHOUT agents? (how) | Agentified fix (lane + agent) | Marker |
|---|---|---|---|---|---|---|
| OVR-1 | Problems surface at handover, hours after they open | Plant manager, shift supervisor | Time, service | Partly — MES alarms fire on single-machine limits, but nothing computes date/cost impact across systems | Rowan AUTO detect → notify in minutes → inbox entry | [ASSUMED] |
| OVR-2 | Handover pack and downtime report hand-built every shift | Shift supervisor, ops analyst | Time | **Largely yes** — a BI layer on Databricks covers the charts; the residue is assembling open items across systems | Self-building reports, AUTO ("report" threshold) | [ASSUMED] |
| OVR-3 | Attainment masks adherence — volume looks fine while promises break | Plant manager, production scheduler | Service, margin | Partly — define the metric in BI; attributing the gap to specific broken orders needs a plan-vs-actual join | Adherence tile + report 03, AUTO (feeds Sawyer's case) | [OPEN] whether Shaw tracks adherence, and their word for it |
| OVR-4 | No ranked list of what needs a person — triage happens by walking and phone calls | Plant manager | Time, risk | No — a dashboard can list exceptions but not rank them by costed impact across scheduling, MES, quality and orders | Exception inbox ranked by cost + decision counter (all three lanes visible) | [INTERNAL] |
| OVR-5 | Downtime reason codes entered late from memory, so the Pareto lies | Plant manager, ops analyst | Trust, time | Partly — capture-at-machine UI; the agent adds chasing the pending code and proposing candidates | Rowan LIMIT; "reason code pending" surfaced on the tile | [ASSUMED]; capture method at Shaw [OPEN] |
| OVR-6 | "How do we usually fix this?" lives in veterans' heads and binders | Shift supervisor, line lead | Time, risk | Partly — SOP search exists; the increment is one cited answer joining SOPs to what this plant already solved (claims, batches) | Sage AUTO Q&A, cited, never makes the call | [INTERNAL] |
| OVR-7 | Automation you can't see breeds distrust — "what did it do while I slept?" | Plant manager | Trust | No — inherent to autonomy; can only be surfaced | Inbox rows "5 resolved automatically" / "1 stopped at a limit"; every item lane-labelled | [INTERNAL] |
| OVR-8 | Every "why is this KPI down?" is an analyst round-trip | Plant manager | Time | **Mostly yes** — BI drill-downs; residue is exception context in the same click | KPI drawers: trend + pareto + the live incident | [ASSUMED] |

Honesty note: OVR-2 and OVR-8 are the "quick wins" precisely because most of their value is plain integration and reporting — which is why the demo frames the reports as *low-hanging*, effort-grade L. The agentic increment there is assembly and context, not intelligence. The pains only agents fix are OVR-4 and OVR-7: ranking by cost and making autonomy visible.

## 7. Agentification deep dive

**Reads:** the released plan and promised dates from your planning and scheduling system; rates, downtime, reason codes and holds from MES and batch management; inspection results and claims from quality; PM windows and machine signals from maintenance; order commitments and prices from Oracle Fusion (to cost impact); history from Databricks (trends, patterns, Sage's corpus alongside SOPs). It owns none of this data.

**Computes and decides:** deviation against the alert band (±8% in the demo); finish-date impact; a dollar cost per open exception (margin at risk, changeover, overtime) that produces the inbox ranking; the attainment/adherence pair; report assembly; the counter (open decisions × this plant's thresholds). It decides *what to log vs raise* and *what resolves itself* — both governed by thresholds, never hardcoded.

**Escalates:** decision-grade items to the plant manager and shift leadership via the counter and inbox, each routing into the owning view (Make, Quality) with the argument already assembled. The overview never asks for a decision itself — it points.

**Learns and feeds back:** which escalations a person consistently accepts unchanged (candidate for a threshold proposal); Wren's slow-path patterns arrive as new inbox context; every resolved incident becomes Sage-citable history, so the plant's answers improve without anyone writing them down.

**Candidate thresholds for this surface:** the two wired rows that re-badge the inbox (re-sequence on a promised date; grade a borderline/repeat fault); publish shift & downtime reports (Auto everywhere in the demo); log drift inside the alert band; plus proposals — minimum dollar impact to enter the inbox; ranking weights (service vs margin); who is notified at which severity, and age-out escalation when a decision waits too long; report distribution and timing; a citation-confidence floor below which Sage refuses to answer.

**Trust and failure modes:** the worst failure is a false *"Nothing waiting on you"* — the green state is a promise, and one missed escalation costs more trust than ten noisy ones. Second: a mis-costed ranking that buries the item that mattered. Third: alert fatigue — if the inbox admits everything it becomes the dashboard it replaced. Fourth: stale integrations making tiles lie confidently. Sage must cite or refuse; an uncited answer on the floor is a hazard. The mitigation for all of these is the visibility mechanic itself — automated work is listed, limits are listed, and every item carries its lane.

**Human forever:** the counter counts decisions; it never makes them. Any trade of a customer promise against cost or quality, the grade on a roll, and accountability for what the released plan promises stay with people — because those are commitments to customers, and the four never-dos (run the line, write the demand plan, grade the product, overrule a quality hold) are the credibility of the whole pitch. Sage prepares; it never calls.

## 8. Open questions for Shaw

- [OPEN] How does shift handover actually run at Shaw — meeting, artefact, system? Is there already a handover report, and who builds it?
- [OPEN] Does the planning system reach the plant, or is the line sequence a spreadsheet? Changes what "adherence to the released plan" even means here.
- [OPEN] Do they say attainment or adherence internally — and is adherence measured at all?
- [OPEN] How are downtime reason codes captured — at the machine or after the fact?
- [OPEN] Is there an existing monitoring/exception layer in MES that this inbox would be seen as duplicating? (Known risk; answer is the cross-system loop.)
- [OPEN] Who gets alerted about what today, and through what channel — and who should the counter and inbox address per plant?
- [OPEN] Which line costs the day if it stops? Backing 2 as the constraint is assumed.
- [OPEN] What would Sage index — where do SOPs live, in what form, and where is claim/batch history held (Databricks?)
- [OPEN] Room composition — plant leadership would make this the opening screen of the walkthrough; planners might enter via Scheduling.

## 9. Sourcing note

The three-lane wording, the never-dos, the attainment-vs-adherence device, the exception-engine framing and the feedback loop are [SOURCED] to the workshop spec; the demo build itself is the primary artifact for every screen element described here. The Overview view, Sage, the plant selector and the wired thresholds are [INTERNAL] extensions beyond the earlier four-view build documented in LOGIC.md — design proposals, not described capabilities, and Sage in particular has no spec lineage. The journey-today table is [ASSUMED] industry-typical practice, unverified at Shaw. Every figure, ID, plant, customer and dollar amount on the screen (97%, 62%, 78%, 96.2%, +5h 10m, $41,200, DL-4471, B-88214, all three plants) is invented and internally consistent only. Backing 2 as the constraint line is [ASSUMED]; room composition and whether planning reaches the plant are [OPEN].
