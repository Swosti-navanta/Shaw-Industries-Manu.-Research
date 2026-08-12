# Yarn - agent Sable - dye-lot sizing, shade integrity and the material-waste money story

**Module:** Shaw Research · **File:** 02-journeys/03-yarn.md · **Status:** draft for review · **Primary source:** demo build (`unifyapps-manufacturing-demo 1.html`) + workshop spec

---

## 1. What this surface is

**Provenance flag, before anything else:** Sable does not exist in the workshop spec or the one-pager. Both define exactly three agents — Sawyer, Rowan, Wren. In the spec, dye-lot sizing lives inside Sawyer's Beat 01 ("sizes runs to your batch and dye lot rules"). The demo build promotes that sub-function to a fourth named agent with its own view. Everything in this section is therefore a design proposal layered on the spec, not a described capability. Every figure and ID below is invented demo data — internally consistent, benchmarked against nothing.

Full screen inventory of the Yarn view (`vSable()`):

- **Header:** eyebrow "Yarn · Sable", title "Yarn & dye-lot optimization", subtitle "Sizes dye lots and plans the creel so big orders hold their shade — with the least waste", plus the standing "Illustrative data" chip.
- **Hero card:** **$8,400** in green — "yarn waste avoided this week by right-sizing dye lots to the orders they serve." Unlike Wren's $41,200 (which has a margin-bridge drawer), the hero has **no drill-in**. The figure is asserted, not evidenced — a build gap worth knowing before presenting.
- **Four tiles** inside the hero card:
  1. **Shade-critical lots: 1** — "DL-4471 · held whole". The only clickable tile; opens the dye-lot drawer.
  2. **Creel utilisation: 92%** — "+3 pts vs plan". Static.
  3. **Yarn waste: 4.1%** — "of input". Static.
  4. **Changeover purges: 2** — "light → dark". Static.
- **Keep-whole vs split comparison card** — "DL-4471 — run whole, or split to save changeover? · the choice behind Rowan's Option A vs B, quantified." Two columns: **Keep whole** (green, Recommended: shade holds across both orders, ORD-77310 fixed install protected, costs one changeover **+$1,840**, no claim exposure) vs **Split across two dye runs** (red, Risk: **$0** changeover, two dye runs won't shade-match, last time → claim **CLM-2291** (clickable, opens the claim drawer), downgrade to seconds · margin gap). The dollar figure on the risk side lives one screen away: Rowan's Option B drawer carries "Expected seconds downgrade −$18,400 · Net exposure −$18,400" — so the quantified trade is $1,840 certain against $18,400 exposure, roughly 10:1.
- **State-reactive status line** under the card: "Sable holds a shade-critical lot whole unless a person overrides it — status now: **held whole**" — flips to "**split (shade risk)**" if the user accepts Option B in Rowan or toggles Split lot on Sawyer's board. This is the one live cross-view state read in the Sable view.
- **Creel & changeover-aware sequence card:** four colour-swatched run chips ordered light → dark (Aria · light → Meridian → Cascade · DL-4471 → Dune), with the note "Ordered so each purge is cheap. A dark → light jump forces a full purge — Sable avoids it where the dates allow."
- **Yarn genealogy card:** two clickable trace nodes, **Y-30918** (yarn lot) → **DL-4471** (dye lot), plus the cross-agent evidence note: "Sable ran this check at **06:42** — see the feed in Make" (nav link to Rowan). Rowan's activity feed carries the matching entry: `06:42 · Automated · Sable · Checked DL-4471 shade integrity across both committed orders` — Sable's one appearance in the incident timeline, in the AUTO lane.
- **Drill-in drawers reachable from here:** *Dye lot DL-4471* (lot detail incl. 2,950 lin yd, dyed 04:20 vessel D-3, ΔE ≤ 2.5 target, held-whole/split status chip; committed-to table showing 2,050 of 2,950 lin yd committed, 900 uncommitted; split risk ~ΔE 3.4 → CLM-2291); *Yarn lot Y-30918* (solution-dyed BCF, denier 1,150/68, supplier lot SY-2231, 3,400 lb, creel position Backing 2 · creel B); *Claim CLM-2291*.
- **Sable elsewhere:** Rowan's resolved block ("Sawyer rebuilt the released sequence · **Sable held DL-4471 whole** · line lead notified") and Sawyer's post-decision banner repeat it. The Thresholds row "Split a dye lot to hold a date" is Sable's action by content — set to **Ask** at all three plants, and not one of the two wired rows.

## 2. The job it does

Sable answers: *will every shade-critical order come out of one dye run, and how much material are we burning to make that true?* It leads with **$8,400 yarn waste avoided this week** — a deliberately separate money story from Wren's $41,200: Wren counts the **margin gap** when finished carpet downgrades to seconds; Sable counts the **material** never wasted in the first place (oversized lots, unnecessary purges, orphaned remnants). Its audience is whoever owns yarn and dye-lot decisions before the run starts.

**Why Sable earned a seat despite not being in the spec:** first, dye-lot integrity is the hinge of the entire incident — "the dye lot or the date" is the escalated decision, and the demo needed somewhere for the keep-whole-vs-split evidence to live without crowding Rowan's decision card. Second, material waste is a genuinely distinct cost lane (input dollars, not output margin), and giving it a hero figure keeps the two money stories clean. Third, it gives materials people a seat in a mixed room [OPEN whether such a seat exists at Shaw]. The risk of the promotion: a fourth agent invites "how many agents will this end up being?" — the honest answer is that Sable is a carve-out of Sawyer's Beat 01, packaged for a different persona.

## 3. Personas

| Role | Level | What they come here to do |
|---|---|---|
| **Yarn & materials planner** [ASSUMED] | Primary | Size dye lots against committed orders, watch remnants and waste %, catch shade-critical exposure before release |
| **Dye-house lead** [ASSUMED] | Secondary | Sequence colours light → dark, plan purges, protect shade continuity within the schedule they're handed |
| **Production scheduler** | Consulted | The keep-whole-vs-split evidence feeds their sequence decision in Sawyer/Rowan |
| **Quality manager** | Consulted | Shade-integrity checks and genealogy are the upstream half of Wren's claim traceback |

Both named personas are industry-typical roles, unverified at Shaw — whether these are two seats, one seat, or absorbed into planning is [OPEN].

## 4. The journey today - without the agentic layer

All rows [ASSUMED] — industry-typical practice, unverified at Shaw.

| Stage | Trigger | What the person does | Tools and systems | Friction | Typical time |
|---|---|---|---|---|---|
| Size the dye lot | MRP run releases requirements | Applies a rule-of-thumb overage (10–15%) to the netted requirement in a spreadsheet | ERP/MRP output + Excel | Overage is a guess; not linked to which orders are shade-critical | Hours, weekly |
| Check shade commitments | Large or shade-critical order lands | Cross-references order notes, calls customer service to learn whether shade matters | Order system, email, memory | Shade-criticality rarely a structured field; tribal knowledge | 30–60 min per order |
| Plan the creel and colour sequence | Schedule released to floor | Dye-house lead orders runs light → dark from experience; assigns creel positions | Whiteboard / spreadsheet | Purge cost invisible in dollars; redone on every schedule change | 1–2 hrs per shift/day |
| React to a schedule change | Line slows, order expedited | Materials implications discovered after the re-sequence; lot split decided under time pressure | Phone, walk to the floor | The split repeats a known claim cause nobody can see at that moment | Minutes, under pressure |
| Discover the waste | Month-end / shift report | Reads waste % after the fact; cannot attribute to sizing, purges or splits | ERP scrap postings | No causal link, so nothing changes next cycle | Recurs monthly |

## 5. The journey with the agentic layer

| Stage | Agent action (lane) | Person action | What the screen shows as evidence |
|---|---|---|---|
| Lot sizing | Sable sizes lots to committed orders and rules (AUTO) | Reviews exceptions only | Hero $8,400; shade-critical lots tile |
| Integrity check | Sable verifies DL-4471 shade integrity across both committed orders at 06:42 (AUTO) | None — it happened before anyone asked | The 06:42 entry in Rowan's activity feed; genealogy card note |
| Keep-whole vs split | Sable quantifies both ways and holds the lot whole inside the rule (THRESHOLDED — "Split a dye lot" is Ask at all three plants) | Makes the call in Rowan's decision card (A PERSON) | Comparison card; status line "held whole"; Option B's −$18,400 drawer |
| Creel sequencing | Sequences light → dark where dates allow (AUTO) | Dye-house lead sanity-checks the sequence | Creel card; purges tile at 2 |
| Waste accounting | Attributes waste to cause, continuously (AUTO) | Planner reads the trend, adjusts rules | Yarn waste 4.1% tile; hero figure |

## 6. Pain points

| ID | Pain | Who feels it | Cost type | Fixable WITHOUT agents? (how) | Agentified fix (lane + agent) | Marker |
|---|---|---|---|---|---|---|
| YRN-1 | Dye lots sized by rule-of-thumb overage; excess is systematic waste | Yarn & materials planner | Margin (material) | Partially — a report joining MRP to order commitments improves the guess once | Sable AUTO: re-sizes per lot, per cycle, as commitments change | [ASSUMED] |
| YRN-2 | Lot splits decided under pressure, blind to shade risk and claim history | Production scheduler, dye-house lead | Margin + risk | A hard APS block on splits — but blunt: it forbids splits that are genuinely right | THRESHOLDED (Sable/Rowan): Ask on split, with both sides costed and CLM-2291 surfaced. The comparison card and Option B callback solve this on screen | [INTERNAL] — derived; the callback is a design proposal |
| YRN-3 | Purge cost invisible; colour sequence rebuilt by hand at every change | Dye-house lead | Time + margin | Largely yes — a changeover cost matrix in an APS does this standing still | Sable AUTO re-sequences against live schedule changes; creel card shows it | [ASSUMED] |
| YRN-4 | Waste discovered after the fact, never attributed to cause | Yarn & materials planner, plant manager | Margin + trust | Mostly yes — an attribution report, if genealogy data exists | Sable AUTO attribution feeding the 4.1% tile and the hero; the agent part is keeping it current | [ASSUMED] |
| YRN-5 | Materials learn of scheduling decisions after they're made | Yarn & materials planner | Time + service | No — this is cross-system and event-driven by nature | Sable AUTO: the 06:42 integrity check ran before the human decision was even framed | [INTERNAL] — demo-only mechanic |
| YRN-6 | Yarn→dye-lot genealogy assembled manually when a claim lands | Quality manager, planner | Time + risk | Yes — a plain traceability view over MES/batch data | The genealogy card is that view; no agent required, and the file should say so | [ASSUMED] |

Honesty note: YRN-3, YRN-4 and YRN-6 are mostly integration-and-reporting problems. Sable's defensible agentic core is YRN-1, YRN-2 and YRN-5 — continuous re-sizing, the guarded split, and the unprompted cross-check.

## 7. Agentification deep dive

**Reads:** order commitments and material masters from Oracle Fusion [SOURCED — in Shaw's stack]; netted requirements from MRP; the released sequence from your planning and scheduling system — APS or spreadsheet is [OPEN]; lot consumption, dye runs and genealogy from MES and batch management [INTERNAL — assumed present]; inspection ΔE results and claim history via Wren; Databricks as the plausible analytic store [SOURCED as present, this use ASSUMED].

**Computes and decides:** lot size vs committed demand plus remnant; keep-whole vs split costed both ways (changeover cost vs expected downgrade exposure); shade-integrity across all orders committed to a lot; light→dark creel sequence within date slack; waste attribution by cause.

**Escalates:** any split of a shade-critical lot (to the scheduler via Rowan's decision card — Ask at all three demo plants); remnant above a set share of the lot; creel conflicts that force a full purge. Escalation lands in Rowan's flow deliberately — Sable prepares evidence, it never owns the incident.

**Learns and feeds back:** claim patterns become sizing/sequencing rules via Wren's slow path (the "never split where an install is fixed" rule is exactly this); actual purge costs recalibrate the changeover matrix; realised waste vs overage recalibrates lot sizing.

**Candidate thresholds:** split a shade-critical lot (exists in the build, Ask everywhere, **not wired**); maximum uncommitted remnant % per lot; sizing overage band before a person reviews; re-sequence the creel within N hours of date slack; substitute a yarn lot mid-run; merge two small lots into one dye run.

**Trust and failure modes:** the hero is unauditable in this build — a waste-avoided figure with no drill-in invites "computed how?" and must earn its number; over-blocking splits when both dates are movable turns the guardrail into a nuisance; a wrong shade-criticality flag poisons everything downstream; and the solution-dyed ambiguity (below) can make the whole dye-vessel narrative wrong for a given product.

**Human forever:** the split call when a date is at stake — trading a customer promise against claim risk is commercial judgement, the "dye lot or the date" decision by definition; accepting shade risk on a customer's behalf; and the grade itself, which stays with a person under Wren. The agents never grade the product and never overrule a quality hold.

## 8. Open questions for Shaw

1. [OPEN] Solution-dyed or piece-dyed dominant? This decides whether the dye-vessel constraint is real — and note the demo carries a latent tension: Y-30918 is labelled solution-dyed (shade set at extrusion) while DL-4471 records a dye run at 04:20 in vessel D-3. For solution-dyed product, "lot integrity" moves to the yarn lot itself.
2. [OPEN] Do "yarn & materials planner" and "dye-house lead" exist as distinct seats at Shaw, and who actually sizes dye lots today — APS, MRP, or a spreadsheet?
3. [OPEN] Is shade-criticality a structured attribute on orders, or tribal knowledge?
4. [OPEN] How is yarn waste measured and booked today, and at what grain — could a real waste-avoided number be computed at all?
5. [OPEN] Real purge/changeover costs by colour transition — the $1,840 and the CO matrix are invented.
6. [OPEN] Is creel assignment planned centrally or decided at the line?

## 9. Sourcing note

Nothing in this file is Shaw-sourced. The dye-lot constraint itself — two lots of one colour will not shade-match — is [SOURCED] as a general carpet fact but [ASSUMED] as a Shaw operating rule. The Sable agent, its hero, all four tiles, the comparison card, the creel sequence and the 06:42 cross-check are inventions of the demo build with no basis in the workshop spec, which defines three agents; the Option B claim-history callback that gives the split side its teeth is separately flagged in the handoff docs as the least-sourced feature of the earlier prototype. All figures and IDs ($8,400, 92%, 4.1%, 2 purges, $1,840, $18,400, Y-30918, DL-4471, CLM-2291) are invented and internally consistent — with one nit for whoever presents: on Sawyer's board the changeover delta of the Option A re-sequence works out to +$1,200 against the base order, while the option card says +$1,840 (the cost of the single cascade→dune purge), so don't let anyone in the room do the arithmetic unprompted. Both personas are [ASSUMED] industry-typical roles. The journey-today table is industry-typical practice throughout, unverified at Shaw.
