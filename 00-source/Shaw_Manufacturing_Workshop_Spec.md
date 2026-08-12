# Shaw Industries — Manufacturing Workshop
## Design specification and research record

**Client:** Shaw Industries · **Partner:** UnifyApps
**Workshop:** 3 of 3 (supply chain → product/PMO → manufacturing)
**Scope:** Carpet only
**Status:** Pre-project capability workshop — not a delivery scope document
**Deliverable:** `Shaw_Manufacturing_Onepager.pdf` — two pages, A4 landscape

---

## 0. How to read this document

This spec has a **sourcing discipline** built into it, borrowed from the Baladna current-state map. Every substantive claim carries one of four markers:

| Marker | Meaning |
|---|---|
| **[SOURCED]** | Traceable to a named external source or a Shaw-confirmed artifact |
| **[INTERNAL]** | Comes from Navanta or UnifyApps internal feedback, not from Shaw |
| **[ASSUMED]** | A reasonable generalisation. Plausible, unverified. Do not assert in the room |
| **[OPEN]** | We do not know. Needs asking |

**If you take one thing from this document:** the difference between [SOURCED] and [ASSUMED] is the difference between credible and embarrassing. Section 9 is the register. Read it before you present.

---

## 1. Purpose and framing

### 1.1 What this workshop is for

A pre-project capability demonstration. We are not scoping an implementation. We are showing Shaw that an agentic layer can sit on top of their existing manufacturing systems and make them work better — and we are collecting their reactions to shape a real proposal.

The room composition is **[OPEN]**. We do not know whether we will face planners and IT, or plant leadership, or a mix. The design assumes a mixed room and errs toward covering the whole picture rather than going deep on one seat.

### 1.2 The consistent structural pattern across all three workshops

Every workshop in this engagement uses the same architecture. Do not break it:

1. **Named agents** with human first names — Piper (product), Mercer/Iris/Christy/Tova (supply chain), Sawyer/Rowan/Wren (manufacturing)
2. **A storyline** following one representative work item end to end
3. **The three-lane device** — AUTO / THRESHOLDED / PERSON
4. **The framing line** — "the agent moves the work, the person makes the call"
5. **Positioning** — sits on top of what they already run, owns no data of its own

### 1.3 The three workshops chain together

This matters and should be said out loud in the room:

```
PRODUCT (Piper)          MANUFACTURING (Sawyer/Rowan/Wren)     SUPPLY CHAIN (Mercer/Iris/Christy/Tova)
idea → launch      →     NPI trial → run → finished goods  →   order → delivery → claim
                                            │                                          │
                                            └────── batch record ──────────────────────┘
                                                    (a claim is settled against
                                                     records manufacturing created)
```

Three explicit seams:
- **Inbound:** the product workshop hands an NPI trial into manufacturing at step 01
- **Outbound:** manufacturing hands finished goods to supply chain at step 09
- **The traceability link:** Christy settles a claim "against records you already hold." Manufacturing is where those records are made. Wren traces the claim back to the batch.

---

## 2. Scope decisions and their reasoning

### 2.1 Carpet only — not all four categories

Shaw manufactures across multiple flooring categories **[SOURCED — Better Buildings partner listing, FCICA]**. We chose carpet because:

- It is Shaw's identity and heritage
- It has the richest scheduling problem — dye lots, colour sequencing, changeovers, roll yield
- It is likely to have the most people in the room

The alternative was resilient (LVT/SPC), which is the growth story **[SOURCED — Floor Daily, Oct 2024: $90M expansion at Plant RP, Ringgold GA, more than doubling resilient capacity by 2026]**. That remains a fallback if the sponsor turns out to be growth-focused.

**Do not present a table of Shaw's plants and product lines.** We do not have verified information on their manufacturing footprint. See §9.

### 2.2 The MAKE process is explicitly out of scope

**[INTERNAL]** Their MES runs the physical make. We do not map extrusion, tufting, dyeing, backing or finishing as process stages.

This was a late and important correction. An earlier draft had a 13-stage physical rail. It was replaced because:

- We are not proposing to replace or duplicate MES
- The agentic value is in monitoring, exception handling and feedback — not in the physical steps
- A 13-stage rail invited "so you're going to tell us how to make carpet?"

The scope boundary is **stated on the sheet itself**, which pre-empts the obvious challenge: *"Not in scope: the make process itself — extrusion, tufting, dyeing, backing and finishing. Your MES runs those. These agents sit on top of it."*

### 2.3 Demand is a pre-step, not a stage

**[INTERNAL]** We assume Shaw already has a demand planning system. The scheduling agent **consumes** the demand signal; it does not produce it.

Represented on the sheet as a dashed box to the left of the flow: *"Demand — Already yours. We consume the signal."*

### 2.4 Positioning: they already have an APS

**[INTERNAL, with a caveat]** We position the agents as improving an existing planning and scheduling capability, not replacing it.

**The caveat is significant.** Shaw's known stack — from the supply chain workshop — includes OMP, which is an APS vendor. But whether OMP reaches down to plant-level sequencing, or stops at network supply planning and hands the floor a spreadsheet, is **[OPEN]**.

This split is extremely common. If it turns out to be a spreadsheet, the narrative inverts and parts of the sheet need rewording. Worth establishing before the session.

---

## 3. The architecture

### 3.1 Three buckets

```
  DEMAND          1 · SCHEDULING        2 · MAKE — EXCEPTION      3 · QUALITY        ORDER &
  (pre-step)         Sawyer                ENGINE · Rowan            Wren            DELIVERY
                                                                                     (hands off)
     │                  │                       │                      │                 │
     └── demand ───────►│                       │                      │                 │
         signal         │── released ──────────►│                      │                 │
                        │   sequence            │── the run ──────────►│                 │
                        │                       │   completed          │── released ────►│
                        │                       │                      │   stock
                        │                       │                      │
                        ◄───────────────────────┴──────────────────────┘
                          exceptions, quality findings and real run rates
                          go back to Scheduling — the plan corrects itself
```

### 3.2 Bucket 1 · Scheduling — agent **Sawyer**

**Role:** Builds a plan the plant can actually hold, and releases it in a runnable order.

| Step | Name | What it means |
|---|---|---|
| 01 | Master schedule & rough-cut capacity | What to make, how much, which week |
| 02 | Constraint & readiness model | Materials, tooling, maintenance, real run rates |
| 03 | Finite sequencing & release | Which line, what order, released to the floor |

**Vocabulary note.** These names were deliberately moved away from the Baladna phrasing (*Resolve demand · Determine volume (MPS) · Prove material readiness · Establish the constraint picture · Build and release the sequence*). "Rough-cut capacity" (RCCP) is real APS vocabulary that appears nowhere in the Baladna deck. Finite sequencing was kept — it is the correct term and it was approved.

**Why MPS is named explicitly.** It was missing from an earlier draft and flagged internally. MPS is vocabulary any master scheduler will use, and its absence was noticeable. More importantly, MPS is not a calculation — it is a commitment with a cadence and a sign-off. That governance is reflected in the PERSON lane: *"signs off the schedule."*

### 3.3 Bucket 2 · Make — exception engine — agent **Rowan**

**Role:** Sits on top of the MES. Watches the run against the plan and raises what matters, to whom.

| Step | Name | What it means |
|---|---|---|
| 04 | Live KPI monitoring | Output, rate, downtime, yield — always current |
| 05 | Deviation detection & alerting | Line and plant managers told in minutes |
| 06 | Batch tracking & genealogy | Which yarn lot went into which roll |

**This is the bucket that replaced the physical make stages.** It is an exception engine, structurally the same idea as the supply chain workshop's exception loop (detect · assess · identify impact · recommend · decide · act · learn), applied to the plant floor rather than the order book.

The key mechanic: when Rowan detects a deviation, it does two things — **alerts a human** (line manager, plant manager) and **triggers Sawyer to re-plan**. It does not sit on the information waiting for shift handover.

### 3.4 Bucket 3 · Quality — agent **Wren**

**Role:** Grades at end of line, traces a claim back to its batch, and sends the cause upstream.

| Step | Name | What it means |
|---|---|---|
| 07 | End-of-line inspection | Measured against spec, evidence filed |
| 08 | Grading & disposition | First quality or seconds — the margin call |
| 09 | Claims linkage & traceback | Which batch, which run, which line |

**QC is positioned at end of line [INTERNAL].** Note that in-process inspection is common in carpet — greige inspection after tufting, for example **[ASSUMED]**. If someone in the room raises it, the honest answer is that the sheet shows the end-of-line gate and a second in-process touchpoint could be added.

**Why quality carries the commercial argument.** Off-quality carpet is not scrapped — it is downgraded and sold as **seconds** through outlet channels. So the loss is not material cost, it is the **margin gap** between first-quality price and seconds price. And a meaningful share of off-quality is caused by the *sequence* — start-up waste after every changeover, colour contamination from a bad colour order, shade variation when a run is split across two dye lots. Those are scheduling problems that surface on the quality report.

**The line for the room:** the schedule is a margin lever, not just a service lever.

### 3.5 The feedback loop — the most important mechanic

Exceptions from Make and findings from Quality go **back to Scheduling**. The plan corrects itself rather than waiting for the next planning cycle.

Two distinct paths:
1. **Fast path (Rowan → Sawyer):** a deviation today changes today's sequence
2. **Slow path (Wren → Sawyer and Rowan):** a pattern of defects across batches changes the process, the standards, or the constraint model

This is drawn on the sheet as a dashed return line, not written as a footnote. It was previously a footnote and got lost.

---

## 4. The three-lane device

The structural anchor across all three workshops. **Preserve the wording exactly.**

| Lane | Wording on the sheet |
|---|---|
| **AUTOMATED** | The agent just does it. Nobody has to ask, chase or put it together. |
| **THRESHOLDED** | The agent acts inside limits you set. Outside them it stops and asks. |
| **A PERSON** | Judgement. The agent prepares it — the call is yours. |

**Why it works.** It answers the unspoken question in every agentic pitch — *"what does this thing do without asking me?"* — before anyone has to ask it. The THRESHOLDED lane is the one that does the persuading: it makes autonomy a dial the client sets, not a property of the software.

**The rule for the whole session:** *The agents move the run. The people make the calls.*

**What the agents never do** (the honest counterpart — do not drop this):
> Run the line · write the demand plan · grade the product · overrule a quality hold.

---

## 5. Beat-by-beat detail

Six beats, two per bucket. Page 2 of the deliverable.

### Beat 01 · Demand into a schedule — Sawyer, step 01
*The demand signal arrives from the system you already run. It becomes a master schedule the plant can actually hold.*

- **AUTO** — Takes the demand signal as given, sizes runs to your batch and dye lot rules, checks the week against available capacity, and rebuilds every cycle.
- **LIMIT** — Small changes it makes itself. Larger ones, or anything inside the locked window, come to you before the schedule is published.
- **PERSON** — Signs off the schedule, and decides when an order has to be split.

### Beat 02 · Constraints and sequencing — Sawyer, steps 02–03
*Materials, tooling, maintenance and the rates lines are really achieving — then the sequence is set and released to the floor.*

- **AUTO** — Works out what each run needs and when, holds a live picture of what the plant can do, costs the changeovers in each candidate sequence, and releases to execution.
- **LIMIT** — It can reorder runs inside the rules you set. Anything that breaks a dye lot or a promised date stops and asks.
- **PERSON** — Approves the released sequence, and owns what it promises.

### Beat 03 · Watching the run — Rowan, step 04
*Your MES runs the make. The agent reads it continuously and holds the released plan against what is actually happening.*

- **AUTO** — Tracks output, rate, downtime and yield against the released plan, keeps every KPI current, and produces the report without anyone building it.
- **LIMIT** — Drift inside your band it simply logs. Beyond it, the alert goes out.
- **PERSON** — Sets what "on track" means, and what is worth being told about.

### Beat 04 · Exceptions and escalation — Rowan, steps 05–06
*A line slows, a machine stops, a batch goes on hold. Who needs to know, how fast, and what moves around it?*

- **AUTO** — Picks up the deviation, works out the effect on the finish date, alerts the line and plant manager, and tells the scheduling agent to re-plan.
- **LIMIT** — It can reshuffle the rest of the day on its own. Anything that would miss a customer date stops and asks.
- **PERSON** — Decides which matters more — the dye lot or the date.

### Beat 05 · Quality at end of line — Wren, steps 07–08
*Inspection sits at the end of the line. First quality or seconds — the call that costs margin rather than time.*

- **AUTO** — Reads the inspection result against spec, links each roll to its batch and run record, and proposes the grade.
- **LIMIT** — Clear passes it grades itself. Anything borderline, or a fault seen more than once, goes to a person.
- **PERSON** — Decides the grade, and what happens to what fails.

### Beat 06 · Claims, traceback and the loop — Wren, step 09
*A claim comes back from the field. Which batch, which run, which line — and what changes so it does not happen again.*

- **AUTO** — Traces the claim back to the batch and the run that made it, pulls the records already held, and sends the finding to the scheduling and make agents.
- **LIMIT** — A one-off it records and watches. A pattern across batches is raised as a process change.
- **PERSON** — Decides what the real cause was, and what changes because of it.

---

## 6. Domain research — how carpet is made

**Purpose:** background so nobody in the team is caught out. **Not** for presentation — the make process is explicitly out of scope on the sheet.

All steps below are **[SOURCED]** from general flooring-industry material unless marked otherwise. None of it is Shaw-specific.

Shaw is vertically integrated, so the chain starts at polymer:

1. **Extrusion** — nylon or PET chip melted and spun into BCF (bulked continuous filament) yarn. If solution-dyed, colour goes in here, in the polymer.
2. **Yarn processing** — twisting, heat-setting, cabling. Then beaming or creeling for the tufter.
3. **Tufting** — needles stitch yarn into a primary backing. Governed by gauge, stitch rate and pile height.
4. **Dyeing or printing** — beck dyeing (batch), continuous dye range, or printing. Skipped entirely if solution-dyed.
5. **Backing** — latex applied to primary and secondary backing, bonded in a heated press.
6. **Finishing** — shearing removes loose fibre from tufting, then inspection, grading and roll-up. Carpet tile is cut into modules.

**Where the scheduling problem actually lives:** a small number of constrained lines, sequence-dependent changeovers, and stages that do not run at the same speed so work piles up between them.

### 6.1 The bottleneck question

An hour lost at the bottleneck is lost for the whole plant and cannot be recovered. An hour lost anywhere else is usually free. So "which machine went down" is the wrong question; "did the bottleneck stop" is the right one.

In carpet plants the bottleneck is **typically** the backing/finishing line — many tufting machines, usually one continuous backing line **[ASSUMED — how these plants are normally built, not a claim about Shaw]**.

**Ask them directly:** *"If one machine stops, which one costs you the day?"* Their answer is the bottleneck. It may well be dyeing.

---

## 7. Glossary

Terms the team should be able to use and explain without hesitating.

### Planning and scheduling

**MPS — Master Production Schedule.** What finished goods to make, how much, in which week. Weekly buckets, finished-goods level. Drives MRP. Has a frozen period. Crucially it is a **commitment** — sales promise against it.

**MRP — Material Requirements Planning.** Explodes the MPS into what materials are needed and when. MPS says what to *make*; MRP says what to *buy and stage*. MPS drives MRP, never the reverse.

**RCCP — Rough-Cut Capacity Planning.** A sanity check that the MPS week is broadly runnable. Not a machine-by-machine proof.

**APS — Advanced Planning and Scheduling.** The generic software category. Vendors: OMP, Kinaxis, Blue Yonder, o9, Quintiq, SAP.

**MPS vs APS — the confusion resolved.** They are not the same kind of thing. MPS is a *plan*; APS is *software that produces plans*. The MPS is usually produced inside the APS. It is a step, not a rival.

**PP/DS — Production Planning and Detailed Scheduling.** SAP's product within the APS category. PP = how much and roughly when. DS = which machine, what order, what hour. Formerly APO, embedded in S/4HANA from around 2018. Worked via a Gantt-style Detailed Scheduling Planning Board.
⚠️ **Shaw's known stack contains no SAP.** PP/DS is Baladna vocabulary. Use "APS" or "your planning and scheduling system" with Shaw.

**Finite vs infinite capacity.** MRP is infinite — it assumes unlimited machines. Finite capacity respects what the plant can actually run. That distinction is the entire point of a detailed scheduler.

**Finite sequencing.** Assigning runs to specific lines in a specific order, respecting real constraints. What separates a schedule from a wish list.

**Routing.** The sequence of operations and machines a product passes through, with standard times.

**Frozen period / planning time fence.** The window inside which the schedule cannot be changed.

**Campaign / block scheduling.** Grouping similar runs together to avoid changeovers.

### The layering (worth memorising)

| Layer | Question | Horizon | Grain |
|---|---|---|---|
| S&OP / demand plan | What will we sell? | Months | Product family |
| **MPS** | What will we make, how much, which week? | Weeks | SKU / style-colour |
| MRP | What materials, by when? | Weeks | Components |
| **Detailed scheduling** | Which machine, what order, what hour? | Days | Operation |
| MES | Did it happen? | Now | Machine |

APS spans the middle three. **APS plans, MES executes.** Most plant pain lives in the seam between them.

### Execution and performance

**Schedule attainment.** Of what you said you would make this week, how much you actually made. Usually a percentage.

**Schedule adherence.** Whether you made it *in the planned sequence, on the planned day*. Stricter, and the more useful number.

**The distinction that lands in the room:** you can hit 100% attainment and 40% adherence by running everything in the wrong order and catching up on Friday. The volume number looks fine while the customer promise is destroyed.

**OEE** = Availability × Performance × Quality. Was the machine up × did it run at rate × was the output good.

**Changeover / sequence-dependent setup.** The cost of switching between runs. In carpet it is heavily sequence-dependent: light → dark is cheap, dark → light needs a full purge. This is what makes sequencing an optimisation problem rather than a list.

**Downtime.** Planned (changeover, PM, cleaning) vs unplanned (breakdown, material-out, quality hold, no operator). Captured via **reason codes** at the machine. The common failure is that the code is entered by a supervisor hours later, from memory.

**PM — Preventive Maintenance.** Scheduled maintenance on a calendar or runtime basis. "PM windows" are booked-out machine hours the scheduler must plan around. ⚠️ In SAP, PM is also the Plant Maintenance module — if someone says "PM," check which they mean.

**MTBF / MTTR.** Mean time between failures (how often it breaks) / mean time to repair (how long you are down).

**Bottleneck.** The slowest stage. Sets throughput for the whole plant.

**WIP.** Work in progress — part-made goods sitting between stages.

### Quality and traceability

**Yield.** Good output divided by input.

**Off-quality.** Product that misses first-quality spec — streaking, dye variation, tufting faults, width out of tolerance.

**Seconds.** Downgraded flooring sold through outlet channels at a discount. The loss is the margin gap, not the material cost.

**Dye lot.** Carpet dyed in one batch. Two lots of the same colour will not shade-match, so a large order should come from one lot. A genuine hard scheduling constraint and the best carpet-specific example available.
⚠️ This is a general carpet fact, not a verified Shaw operating rule.

**Batch genealogy / traceability.** The record of which input lot went into which output unit. What makes a claim settleable rather than arguable.

### Systems

**MES / MOM — Manufacturing Execution System.** Dispatches work to the floor and confirms what was made. Sits between ERP and the machines.

**SCADA / PLC / historian.** The automation layer — what the machine is doing right now.
⚠️ **We have no source that Shaw uses SCADA.** See §9.

**ERP.** Orders, materials, costs, master data. Shaw runs Oracle Fusion **[SOURCED — supply chain workshop]**.

---

## 8. Design system and build notes

So anyone on the team can pick the artifact up.

- **Source file:** `Shaw_Manufacturing_Onepager.html`, single self-contained file, no dependencies
- **Output:** A4 landscape, 297 × 210mm, two pages, rendered via headless Chromium
- **Typeface:** Geist (sans) — install from the `geist` npm package
- **Structure:** page 1 = the flow, the three-lane device, what changes, the rule. Page 2 = the six beats

### Colour discipline — this matters

**Purple means exactly one thing: the agentic layer.** Agent name chips, and the feedback loop. Nothing else.

An earlier draft used purple to highlight "gates" (RELEASE, QC) carried over from the product one-pager. On the product sheet a gate is a real go/no-go decision. Nothing on the manufacturing sheet works that way, so the highlighting was decoration pretending to carry meaning — and it was flagged as confusing. Do not reintroduce it.

Amber is reserved for the THRESHOLDED lane. Near-black for the PERSON lane and the rule box. Everything else is neutral grey.

### Language register — deliberately split

- **Technical** in the rail, step names and headings — a scheduler must recognise the vocabulary
- **Plain** in the body copy and the step glosses — everyone else must be able to read it

Each step carries the term on top and a plain-English gloss underneath. *"Master schedule & rough-cut capacity"* / *"What to make, how much, which week."*

---

## 9. Sourcing register — READ BEFORE PRESENTING

### 9.1 What is properly sourced

| Claim | Source |
|---|---|
| Shaw manufactures across multiple flooring categories | Better Buildings partner listing; FCICA listing |
| Plant RP, Ringgold GA — SPC and LVT, $90M expansion, capacity more than doubling by 2026 | Floor Daily, October 2024 |
| Plant HW, South Pittsburg TN — engineered hardwood | Floor Covering News — **2022, four years old** |
| Carpet manufacturing process steps | General flooring-industry sources — **not Shaw-specific** |
| Oracle Fusion, Databricks in Shaw's stack | Shaw supply chain workshop deck |
| OMP, Manhattan, TMW, TMT, Platform Science, OrbComm, RateLinx, Project44 | Shaw supply chain workshop deck — **supply chain context** |

### 9.2 What came from internal feedback, not from Shaw

These are directionally trusted but are **not** verified facts about Shaw:

- MES manages the make process
- QC sits at end of line
- Shaw already has an APS
- Demand planning is already solved
- The three-bucket structure

### 9.3 What is assumed and must not be asserted

- **"Four fundamentally different kinds of line"** and any line-type characterisation — a generalisation from generic flooring research
- **"Dalton GA cluster"** as the carpet centre — inference from Dalton being HQ
- **The bottleneck is backing/finishing** — how these plants are normally built
- **In-process inspection exists** — common in carpet, unverified at Shaw
- **Dye lot rules** as Shaw's operating constraint — true of carpet generally
- **Laminate manufactured domestically** — no source at all. This was in an early draft and should never have been

### 9.4 Baladna contamination — a live risk

We used the Baladna (dairy) engagement as a structural template. Its vocabulary leaks. Caught so far:

| Leaked term | Where it came from | Status |
|---|---|---|
| **SCADA** | Baladna L0–L3 map, step 19 — *"Record tank volumes and machine states at shift start,"* sourced to *"Paper or whiteboard · SCADA register manual v1"* | **Removed.** Replaced with "your shop-floor systems," now "your MES and batch management" |
| **PP/DS** | Baladna is an SAP shop. Shaw's known stack has no SAP | **Removed** from all client-facing material |
| **Maintenance windows framing** | Baladna step 23, sourced to SAP PM orders | Concept is universal; framing was theirs. Reworded |
| **L1 phase names** | Baladna's *Resolve demand · Determine volume (MPS) · Prove material readiness · Establish the constraint picture · Build and release the sequence* | **Reworded.** Now uses RCCP and constraint/readiness model |
| **The process spine itself** | Baladna | Acceptable — a process shape is not a factual claim |

**The rule going forward:** when a term enters from the Baladna deck rather than from Shaw material, flag it at the time. Do not wait to be asked.

### 9.5 What is genuinely useful from Baladna — steal these

1. **The wording rule.** Every L3 step reads *imperative verb + object*, one action, one actor, one named source. No adverbs. No commentary. It is why that map is legible.
2. **The source chip under every step** — colour-coded documented / no source exists / two documents conflict. Their map showed 21 of 32 steps sourced, 8 with no source, 3 in conflict. That honesty is the most credible thing in the deck.
3. **The question grid by role.** Four plain-language questions per person, asked near the end of their segment. The framing is excellent: *"think of a good day and a bad day recently, and tell us what was different"* — nobody can rank abstract goals, but everybody can explain why Tuesday was awful.

---

## 10. Open questions for the client

Ordered by how much they would change the material.

### Tier 1 — changes the narrative

1. **Does the planning system reach the plant, or does the line sequence get built in a spreadsheet?**
   If spreadsheet, "we sit on top of your APS" inverts and the opening changes entirely.
2. **Who is in the room?** Planners and IT, or plant leadership? Determines how much of the sheet lands.
3. **Is there a system that knows what the machines are doing right now — and what do you call it?**
   This is the sourced replacement for our SCADA assumption. Ask it as a discovery question.

### Tier 2 — changes the emphasis

4. **If one machine stops, which one costs you the day?** Identifies the real bottleneck.
5. **Do you say schedule attainment or adherence internally?** Use their word.
6. **Is inspection only at end of line, or in-process as well?**
7. **Broadloom, carpet tile, or both?** Tile adds conversion and cutting.
8. **Who owns promising — planners or the plant?** Determines whether ATP/CTP belongs on this sheet or stays in supply chain.

### Tier 3 — worth knowing

9. Solution-dyed or piece-dyed dominant? Changes whether the dyeing constraint is real.
10. How are downtime reason codes captured today — at the machine or after the fact?
11. Does the NPI trial handoff from the product workshop have a real process behind it?

---

## 11. Known risks

| Risk | Mitigation |
|---|---|
| **They already have an exception/monitoring layer in MES** and see us as duplicating it | Position as cross-system: the agents read scheduling, MES, maintenance and quality together. MES monitoring is single-system |
| **The APS assumption is wrong** | Have the spreadsheet variant of the narrative ready |
| **Agent names collide** with real people at Shaw | Check Sawyer, Rowan, Wren before the session |
| **Someone asks about a plant, line or code we named** | We name none. Keep it that way |
| **"You're just describing MES"** | The answer is the loop. MES tells you what happened. Nothing today turns that into a re-plan and a corrected standard |
| **The room is plant-heavy and finds it abstract** | The dye-lot-versus-date decision is the most concrete thing we have. Lead with it |

---

## 12. Decision log

Chronological, so the team can see what was tried and why it changed.

| # | Change | Reason |
|---|---|---|
| 1 | Started from Baladna's L0–L3 structure, extended with execution and feedback phases | Baladna's scope was scheduling only |
| 2 | Named systems reduced to "your X" wherever unverified | Sourcing challenge |
| 3 | PP/DS dropped from client material | Shaw has no SAP |
| 4 | MPS named explicitly and reframed from calculation to commitment with sign-off | Internal feedback that MPS was missing |
| 5 | Language simplified across the sheet | Client-readability feedback |
| 6 | Rail labels moved back to process terminology, body copy stayed plain | Over-corrected in #5 — "Work out demand," "Make it" read as too casual |
| 7 | SCADA removed | Baladna leak, caught on challenge |
| 8 | Restructured from a 13-stage physical rail to three agent buckets | Baladna framing was constraining scope; MES owns the make |
| 9 | Demand moved to a pre-step | We consume, we do not produce |
| 10 | Gate highlighting removed | Purple was decoration, not meaning |
| 11 | Split into two pages, loop drawn rather than described | Flow legibility |

---

## 13. Next steps

- [ ] Verify agent names do not collide at Shaw
- [ ] Establish the APS-versus-spreadsheet question before the session
- [ ] Decide whether the *What changes* strip duplicates the supply chain deck
- [ ] Build the section-by-section run sheet — seat scripts, money moments, reflect prompts — matching the supply chain build
- [ ] Decide whether ATP/CTP belongs here or stays in supply chain
- [ ] Consider a proper sourced audit of Shaw's manufacturing footprint if plant-level detail is ever needed

---

*Companion file: `Shaw_Manufacturing_Onepager.pdf` (client-facing, two pages) and `Shaw_Manufacturing_Onepager.html` (editable source).*
