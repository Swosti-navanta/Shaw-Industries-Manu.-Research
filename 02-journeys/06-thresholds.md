# Thresholds (the autonomy dial) — the per-plant governance surface that makes autonomy a setting the client controls, not a property of the software

**Module:** Shaw Research · **File:** 02-journeys/06-thresholds.md · **Status:** draft for review · **Primary source:** demo build (`unifyapps-manufacturing-demo 1.html`) + workshop spec

---

## 1. What this surface is

The Thresholds view is the policy plane over all four agents. Header eyebrow `Thresholds · {plant}`, title **"The dial you set — per plant"**, subtitle "Same engine everywhere; each plant sets its own limits. Switch plants (top left) and the dial changes with them", plus the standing *Illustrative data* chip. It is the only view with **no hero figure** (deliberate, per the behaviour spec).

Elements, top to bottom:

- **Demo note (purple):** explains that two rows are *wired* — set "Re-sequence where a promised date moves" to Auto, open Make, and Rowan resolves the escalation itself. Inline link to the Make view.
- **The eight threshold rows**, each with a label, a one-line sub, and an **Auto / Limit / Ask segmented control** coloured to the three lanes (Auto = purple, Limit = amber, Ask = near-black — nothing is unlabelled). Two rows carry a `WIRED` chip.

| # | Row | Sub | P12 Aiken | P04 Dalton | P21 Cartersville |
|---|---|---|---|---|---|
| 1 | Re-sequence where a promised date moves *(wired)* | Reorder runs when a customer date is at risk | Ask | **Auto** | Ask |
| 2 | Grade a borderline or repeat fault *(wired)* | Decide the grade on a marginal roll | Ask | Limit | Ask |
| 3 | Split a dye lot to hold a date | Break a shade-critical lot across dye runs | Ask | Ask | Ask |
| 4 | Add overtime to recover a date | Schedule a weekend or extra shift | Limit | Auto | Ask |
| 5 | Log drift inside the alert band | Rate wobble within ±8% of plan | Auto | Auto | Limit |
| 6 | Grade a clear pass | First-quality rolls with no flags | Auto | Auto | Limit |
| 7 | Publish shift & downtime reports | Assemble and send the standing reports | Auto | Auto | Auto |
| 8 | Raise a maintenance work order | Open a work order from a machine signal | Limit | Auto | Ask |

- **Two footer notes:** *What the agents never do* (run the line · write the demand plan · grade the product · overrule a quality hold) and *Sits on top of what you already run* (your scheduling · MES & batch management · maintenance system — "they read across them and write decisions back").

**Interactions and state variants.** Clicking a segment sets that mode; edits persist per plant for the session (the header **plant selector** swaps the whole dial between three stored profiles). The two **wired rows actually rewire the product**: `reseq` → Auto makes Rowan's decision card become the "Re-sequenced automatically" block (its copy names this screen: *"Because 'Re-sequence where a promised date moves' is set to Auto for Plant 04 · Dalton. Set it to Ask in Thresholds and this comes to a person instead"*), swaps the escalation tail of the activity feed for an automated entry, clears Rowan's sidebar badge, decrements the header decision counter, and re-badges the Overview inbox entry from *Needs you* to *Auto-resolved*. `grade2` → Auto does the same for Wren: R-11204 shows *Confirmed second · Auto-graded · limit*, the Wren badge and counter clear, the inbox entry reads *Graded*. The other six rows are presentational — the toggle moves, nothing downstream changes. Two honest nuances: on the wired rows only **Auto** changes behaviour (Limit still escalates like Ask), and **Undo** on Rowan resets the incident but not the thresholds. There is no drill-in drawer on this view itself — but every activity-feed drawer elsewhere cites it: *Set by: Thresholds · Plant 12 · Aiken*.

## 2. The job it does

This screen answers the question every agentic pitch gets asked first: **"what does this thing do without asking me?"** — for the person accountable for the plant. It converts autonomy from a property of the software into a per-plant, per-action setting, and the wired rows prove the dial is real rather than decorative. Having no hero figure, its lead evidence is the **header decision counter**: flip one row to Auto and *Decisions waiting 2* becomes *1*, then *Nothing waiting on you · 0* — the same engine, escalating less, because you told it to.

## 3. Personas

- **Plant Manager / GM (primary)** — sets the dial, owns what Auto does in their plant, uses the per-plant profiles to argue for (or resist) more autonomy.
- **Ops Excellence / CI Lead (secondary)** — reviews the dial against the evidence in the activity feed; proposes moves from Ask toward Auto as part of the improvement cadence.
- **IT & Governance Lead (secondary)** — owns who may change a threshold, the audit trail, and the corporate envelope the plant dial sits inside.
- **Line Lead / Shift Supervisor (consulted)** — lives with the consequences: what arrives as an escalation versus what just happens.
- **Quality Manager (consulted)** — guards rows 2, 3 and 6; the never-do on quality holds is theirs.

## 4. The journey today — without the agentic layer

Autonomy is not a dial anywhere today. Approval boundaries live in tribal knowledge, job titles and standing meetings. All rows [ASSUMED] — industry-typical, unverified at Shaw.

| Stage | Trigger | What the person does | Tools and systems | Friction | Typical time |
|---|---|---|---|---|---|
| Boundary exists implicitly | A decision class recurs (overtime, re-sequence, grade call) | Learns by osmosis "what I can sign off" — title, precedent, asking the boss | SOPs, delegation-of-authority matrix if one exists, memory | Unwritten, inconsistent across shifts and plants | Years of accretion |
| Event lands | Line slows, roll borderline, date at risk | Works out whose call it is before working the problem | Phone, walking to an office, the morning meeting | Triage effort spent on *who*, not *what*; off-shift = wait | 10 min–next morning |
| Escalation | It is "above" the person on the floor | Chases an approver; frames the case from scratch each time | Email, phone, hallway | Same chain for a $200 call and a $6,200 call; no cost ranking | 0.5–4 h |
| Decision | Approver available | Decides; rationale lives in an email or nowhere | Email, verbal | No record linking decision to boundary; unauditable | Minutes |
| Boundary revision | An incident, or a manager change | Boundaries tighten after a burn, reset to zero with turnover | Meetings, revised SOP if anyone writes it | Trust is personal, not institutional; it does not transfer | Quarterly at best |

## 5. The journey with the agentic layer

| Stage | Agent action (lane) | Person action | What the screen shows as evidence |
|---|---|---|---|
| Event lands | Engine checks the acting agent's row for this plant before doing anything | Nothing yet | Every feed entry carries a lane chip; its drawer cites *Set by: Thresholds · {plant}* |
| Row = Auto | Agent acts and logs (AUTO) | Reads it later, or never | Rowan's "Re-sequenced automatically" block; Overview entry badged *Auto-resolved*; counter stays clear |
| Row = Limit | Agent acts to the edge, stops (THRESHOLDED) | Handles only the overage | Amber feed entry: "Stopped short of re-sequencing Backing 2 — every option there moves a promised date" |
| Row = Ask | Agent prepares options, escalates (A PERSON) | Makes the call from a costed card | Decision counter, sidebar badges, three costed options |
| Setting the dial | Engine enforces whatever is set; same engine every plant | Plant manager moves a segment; switches plants to compare | The row re-colours; Make/Quality/Overview re-badge live; Dalton vs Cartersville profiles differ |
| Earning autonomy | Feed accumulates the accepted-recommendation record (AUTO) | Reviews evidence, moves Ask → Limit → Auto deliberately | The feed history is the case for the next notch |

The per-plant profiles are the story: **Plant 04 Dalton** runs re-sequencing and overtime on Auto — a mature plant that has earned it; **Plant 12 Aiken** keeps the big calls on Ask but automates the routine; **Plant 21 Cartersville** is mostly Ask — cautious or new, with even clear passes on Limit. Same engine, every plant its own dial — which is also the multi-plant scaling argument: rollout does not wait for the most cautious plant. (The demo sidebar puts a number on that scale — "One engine · 30+ plants" — but the plant count is demo copy: Shaw's manufacturing footprint is unverified [OPEN], so don't assert it in the room.)

## 6. Pain points

| ID | Pain | Who feels it | Cost type | Fixable WITHOUT agents? (how) | Agentified fix (lane + agent) | Marker |
|---|---|---|---|---|---|---|
| THR-1 | Approval boundaries are tribal — unwritten, inconsistent across shifts and plants | Plant Manager, Line Lead | trust / time | Partly: write a delegation-of-authority matrix — but paper does not execute and goes stale | The eight rows are an *executable* authority matrix all agents obey (all lanes) | [ASSUMED] |
| THR-2 | Every exception climbs the same chain regardless of stakes | Line Lead, Plant Manager | time / service | Partly: an escalation SOP with dollar bands — still enforced by memory | Auto/Limit/Ask per action class; only the genuine calls reach a person — the counter proves it | [ASSUMED] |
| THR-3 | Trust is personal and resets with turnover; a new manager re-litigates every boundary | Plant Manager, Ops Excellence | trust / time | No — there is no evidence base to inherit | Activity feed = institutional decision record; the dial survives the person | [ASSUMED] |
| THR-4 | No comparable view of autonomy across plants; corporate cannot see who runs what on Auto | IT & Governance, Ops Excellence | risk | Partly: a survey or audit — instantly stale | Per-plant profiles on one screen, switchable from the header (the demo element that solves this) | [INTERNAL] |
| THR-5 | No audit trail: who widened a boundary, when, why — and which setting an automated action ran under | IT & Governance | risk | Yes for human decisions (a change log); no for machine actions | Every feed drawer cites *Set by: Thresholds · {plant}* — the seed; full versioned trail is a build item, **not in the demo** | [INTERNAL] |
| THR-6 | Automation elsewhere is all-or-nothing — a feature is on or off, so cautious plants get nothing | Plant Manager, Ops Excellence | trust / margin | No — that is the product architecture itself | Tri-state per action class per plant; Cartersville adopts at Ask on day one and still gets the prepared options | [INTERNAL] |

## 7. Agentification deep dive

**This screen is not an agent — it is what governs them.** It reads nothing from Shaw's systems; it writes policy that Sawyer, Rowan, Wren and Sable consult before every act. What it *decides* is nothing; what it *determines* is everything: the same detection produces an automated log line, a bounded action, or an escalation purely on the row's setting — the demo's wired rows demonstrate exactly this.

**Every candidate threshold.** The eight rows are one axis (action class). A real build parametrises the **Limit** segment, which today carries no number: a dollar cap per automatic changeover ($1,840 sits under it; $6,200 does not), overtime-hours caps, customer tier (fixed-install orders always Ask), depth into the 48h locked window, the ±8% drift band width itself, how many batches make a pattern (three, in Wren's slow loop), and time-of-day tightening for night shifts. The demo's tri-state is the right first cut; the parameters are the second.

**The governance questions the demo does not answer.** (1) **Who moves a threshold?** Proposed: the plant manager owns the dial inside a corporate envelope; IT-governance owns the envelope — some rows (split a dye lot) may be corporately pinned to Ask. (2) **Is a threshold change itself thresholded?** It should be: loosening a high-stakes row to Auto is a bigger decision than any single re-sequence, so it warrants four-eyes approval, effective-dating, and one-click rollback — a meta-threshold. (3) **Approval and audit trail:** every change needs who/when/old/new/why, and every automated action must cite the threshold *version* it acted under, or the record is unauditable after the fact. The feed drawer's *Set by* line is the seed of this; nothing more exists in the demo. (4) **The trust journey:** start every row at Ask. The activity feed accumulates the evidence — how often the agent's prepared recommendation was accepted unchanged — and that record, not vendor assurance, is what justifies Ask → Limit → Auto. Dalton is the destination; Cartersville is day one; the plant selector shows both states of the same engine. This is the sharpest insight in the section: **the activity feed is not a log, it is the application for autonomy.**

**Trust and failure modes.** Too loose: Auto moves something it should not — mitigated by hard rules from the slow path (Wren's "never split a dye lot where an order has a fixed install date") that bind *regardless* of the dial; the dial and the constraint model must compose, dial never overriding a hard rule. Too tight: everything escalates, the counter is permanently red, and people rubber-stamp — alert fatigue dressed as control. Stale: set at go-live, never reviewed; needs a review cadence owned by Ops Excellence. Interaction effects: overtime on Auto with re-sequence on Ask can auto-spend $6,200 while the $1,840 fix waits on a person — rows are not independent and the engine should surface the conflict. And the demo's own gap: Limit behaving as Ask on the wired rows would, if shipped, quietly misrepresent the middle lane.

**Human forever.** The four never-dos, verbatim. Plus the dial itself: no agent proposes its own autonomy increase — the evidence can be assembled by the engine, but the notch is moved by a person, because the setting is the signature. Whoever sets Auto owns what Auto does.

## 8. Open questions for Shaw

1. [OPEN] Who owns autonomy policy — plant leadership, corporate manufacturing, or IT governance? Does a written delegation-of-authority matrix for operational decisions exist today?
2. [OPEN] Which actions would Shaw never allow on Auto regardless of evidence — and do they match our four never-dos?
3. [OPEN] What audit regime applies to production decisions (customer quality audits, internal controls), and what trail must a threshold change and an automated action leave?
4. [OPEN] Labour and scheduling rules on automatically-raised overtime — notice periods, seniority, works-council or HR constraints?
5. [OPEN] Do Shaw's plants actually differ in maturity the way the three demo profiles imply — and would plant managers accept a corporate envelope on their dial?
6. [OPEN] What evidence would a Shaw plant manager require before moving re-sequencing from Ask to Auto?
7. [OPEN] Does planning reach the plant (APS vs spreadsheet)? Determines what "re-sequence on Auto" writes back to.

## 9. Sourcing note

The three-lane wording, the never-dos, the sits-on-top positioning and the thresholded-lane argument ("it makes autonomy a dial the client sets, not a property of the software") are [SOURCED] verbatim from the workshop spec. The eight rows, the two wired behaviours, the per-plant defaults, the 48h locked window, the ±8% band and all dollar figures are invented demo constructs — internally consistent, benchmarked against nothing, illustrative only. The three plant names and their maturity profiles are inventions; whether Shaw's plants differ this way is [OPEN]. The journey-today table and the pain points THR-1 to THR-3 are [ASSUMED] industry-typical practice, unverified at Shaw; THR-4 to THR-6 and the entire governance deep dive (meta-thresholds, audit trail, trust journey) are [INTERNAL] Navanta design reasoning, proposed to Shaw rather than described from it.
