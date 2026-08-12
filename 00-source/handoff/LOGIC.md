# Logic — the behaviour spec

Everything the prototype does, so you can rebuild or extend it without reading the JavaScript.
Read alongside `README.md`.

---

## 1. The incident

One event, threaded through all three agent views. **Every view shows the same style, dye lot,
batch, roll, line and orders.** That continuity is load-bearing: if the screens looked like assets
built for different clients with unrelated data, an attentive person spots the seams and the
one-engine claim collapses harder than three honest separate demos would have.

> Backing 2 is running 12% under plan rate on Cascade Twist · Dune 240, dye lot DL-4471. In the
> same hour, batch B-88214 goes on quality hold. The dye lot behind it is already committed to two
> orders — one with a fixed install date.

## 2. Data model

```
Yarn lot  Y-30918        solution-dyed BCF, Dune 240
   └── Dye lot  DL-4471  2,950 lin yd, committed across 2 orders
         └── Batch  B-88214       on quality hold since 06:52
               └── Roll  R-11204  at end-of-line inspection

Orders
  ORD-77310  Kestrel Flooring, Atlanta GA        1,150 lin yd  promised 18 Aug  FIXED INSTALL
  ORD-77412  Brightwater Interiors, Nashville TN   900 lin yd  promised 21 Aug  movable

Lines            achieved / standard (yd/hr)
  Tufting 3        511 / 520
  Backing 2        369 / 420    ← constraint line, 12% under
  Finishing 1      598 / 610

History
  Claim CLM-2291 → rolls R-11198/R-11199 → batch B-88209 → dye lot DL-4102 (split to hold a date)
  Pattern: CLM-2291 (Jun), CLM-2205 (May), CLM-2154 (Apr) — all split lots
```

**The asymmetry that drives the whole demo:** a promised date can sometimes move; a fixed install
date usually can't, because a crew is booked. ORD-77310 has one, ORD-77412 doesn't.

All of the above is illustrative. Nothing is Shaw data. See §8.

## 3. State

Nine keys. Everything is in memory — **no localStorage, no backend, no network.** `render()`
rebuilds the entire view from state on every change.

| Key | Type | Meaning |
|---|---|---|
| `view` | string | `rowan` · `sawyer` · `wren` · `thresholds` |
| `decision` | `null` \| `"A"`\|`"B"`\|`"C"` | Which option was accepted. `null` = pending |
| `seq` | array | The released sequence. Rebuilt from `SEQ_BASE` when a decision is accepted |
| `rules` | array | Constraint model. Gains a rule when Wren's finding is sent |
| `feed` | array | Activity entries. Gains 3 when a decision is accepted |
| `findingSent` | bool | Whether Wren pushed the pattern upstream |
| `gradeDone` | bool | Whether the borderline roll was graded |
| `thr` | array | Threshold modes. **Presentational only — see §6** |
| `fresh` | Set | Marks new feed entries so they animate in once |

`needsCount() = (!decision) + (!gradeDone)`. Drives the header counter and the sidebar badges.

## 4. Automation lanes

Three lanes, from the workshop spec. **Preserve the wording exactly** — it's fixed by the spec and
it's the device that does the persuading.

| Lane | Wording | Colour |
|---|---|---|
| **AUTOMATED** | The agent just does it. Nobody has to ask, chase or put it together. | purple |
| **THRESHOLDED** | The agent acts inside limits you set. Outside them it stops and asks. | amber |
| **A PERSON** | Judgement. The agent prepares it — the call is yours. | near-black |

Every state in the product resolves to exactly one lane. That's the invariant: **nothing is
unlabelled.**

### Sawyer · Scheduling

| | Behaviour |
|---|---|
| AUTO | Sizes runs to batch and dye lot rules, checks the week against capacity, rebuilds every cycle. Costs changeovers in each candidate sequence and releases to execution |
| LIMIT | Reorders runs inside the rules. Anything breaking a dye lot or a promised date stops and asks. Anything inside the locked window comes to a person before publish |
| PERSON | Signs off the schedule. Decides when an order gets split. Owns what the released sequence promises |

### Rowan · Make

| | Behaviour |
|---|---|
| AUTO | Tracks output, rate, downtime, yield against the released plan. Detects the deviation, computes finish-date impact, identifies orders at risk, notifies line and plant manager, costs and ranks options, tells Sawyer to re-plan |
| LIMIT | Reshuffles the rest of the day on its own. Anything that would miss a customer date stops and asks. Drift inside the alert band is logged, not raised |
| PERSON | Sets what "on track" means and what's worth being told about. **Decides the dye lot or the date** |

### Wren · Quality

| | Behaviour |
|---|---|
| AUTO | Reads inspection against spec, links each roll to its batch and run record, proposes the grade. Traces a claim to its batch, pulls held records, sends findings upstream |
| LIMIT | Grades clear passes itself. Borderline, or a fault seen more than once, goes to a person. A one-off is recorded and watched; a pattern across batches is raised as a process change |
| PERSON | Decides the grade and what happens to what fails. Decides the real cause and what changes because of it |

### The four things the agents never do

Run the line · write the demand plan · grade the product · overrule a quality hold.

## 5. The two loop paths

This is the mechanic the spec calls the most important one, and the reason to build a prototype
instead of drawing screens. **The loop is clickable in both directions.**

```
                    ┌──────────────── SLOW PATH ────────────────┐
                    │   defect pattern → constraint model       │
                    ▼                                           │
   ┌─────────────────────┐      ┌──────────────┐      ┌──────────────┐
   │  SAWYER             │─────▶│  ROWAN       │─────▶│  WREN        │
   │  Scheduling         │ seq  │  Make        │ run  │  Quality     │
   └─────────────────────┘      └──────────────┘      └──────────────┘
                    ▲                   │
                    └─── FAST PATH ─────┘
                      deviation → re-plan today
```

### Fast path — Rowan → Sawyer

**Trigger:** accept any option in Rowan's decision card.

**Effect on state:** `decision` set · `seq` rebuilt from `SEQ_BASE` per the option's `seqEffect` ·
three entries appended to `feed` (you → Rowan → Sawyer) · `needsCount` drops by one.

**Effect per option:**

| Option | `seqEffect` | What changes in the sequence |
|---|---|---|
| **A** Re-sequence, run DL-4471 whole | `reorder` | Slots 2 and 3 swap, both tagged *moved by Rowan*. ORD-77412 goes to running. Slot 4 changeover becomes $1,840 |
| **B** Split DL-4471 across two dye runs | `split` | Slots 2 and 3 both flagged *split — 2 dye runs*, both tagged moved |
| **C** Expedite, Saturday overtime | `expedite` | Slot 4 tagged moved at $6,200; a sixth slot appended for the overtime shift |

**Meaning in the room:** the plan corrected itself in minutes, without waiting for a planning cycle.

### Slow path — Wren → Sawyer

**Trigger:** *Send the finding to Sawyer* on Wren's pattern panel.

**Effect:** `findingSent` set · a new rule is unshifted onto `rules` with `loop: true`, so it renders
at the top of Sawyer's constraint model chipped *From Wren*:

> **Never split a dye lot where an order has a fixed install date**
> Raised by Wren from a pattern across 3 batches · CLM-2291, CLM-2205, CLM-2154

**Meaning in the room:** a defect pattern became a scheduling rule. The standard changed, not just
the report.

### The Option B callback

Option B carries a red inset panel: *you did this on DL-4102 in June and it produced claim
CLM-2291* — the same claim Wren is tracing two screens away. The product argues against a decision
before it's made.

**This is the least sourced feature in the prototype.** Nothing in the spec proposes it; it's
extrapolated from Wren's step 09 plus the slow path. It's the most persuasive moment on screen and
it is a design proposal, not a described capability. Say so if asked.

## 6. Interactive controls — complete list

| Control | Where | Effect |
|---|---|---|
| Sidebar nav (4) | Everywhere | `view` change, scroll to top |
| **Accept** ×3 | Rowan decision card | Fast path — see §5 |
| **Undo** | Rowan, after a decision | Resets `decision`, `seq`, `feed` to base. Lets you re-run the demo for the next audience |
| **See it in Sawyer's sequence →** | Rowan, after a decision | Nav to Sawyer |
| **Decide grade** | Wren, roll R-11204 | Sets `gradeDone`. Chip becomes *Confirmed second* |
| **Send the finding to Sawyer** | Wren pattern panel | Slow path — see §5 |
| **See it in the constraint model →** | Wren, after sending | Nav to Sawyer |
| Auto / Limit / Ask ×8 | Thresholds | Sets `thr[i]` **and nothing else** |

### The threshold gap — read this

The threshold toggles are **presentational**. Flipping one updates the segmented control and
nothing more. It does not rewire Rowan's escalation.

This is the single highest-value functional upgrade available. The claim the whole product rests on
is *autonomy is a dial you set, not a property of our software* — and right now that's demonstrable
but not provable. Wiring `"Re-sequence where a promised date moves"` from **Ask** to **Auto** so
Rowan resolves the decision itself, with the activity feed showing it as automated rather than
escalated, would make the argument land on its own. Everything needed is already in state; it's a
conditional in `needsCount()` and in the decision render.

## 7. Views — what each contains

Each view has **exactly one hero figure**, then supporting detail. Note this ordering runs by
narrative importance, not by process step — which is why spec step numbers were removed from the
chrome (they read 04 → 06 → 04–05 on Rowan, 01 → 03 → 02 on Sawyer, 08 → 07 → 09 on Wren).

**Rowan** — hero `+5h 10m` projected finish. Deviation banner → hero and four stat tiles → rate
chart and genealogy chain → **activity feed → decision card**. The feed must stay *above* the
decision: it is the argument for it. Five automated entries, one thresholded, one escalated.

**Sawyer** — hero `62%` adherence against 97% attainment. Loop banner (when a decision was
accepted) → adherence hero → released sequence table → constraint model and rate meters.

**Wren** — hero `$41,200` margin at risk, of which $18,400 traces to a sequence decision.
Inspection queue → claim traceback chain and cause card → pattern panel.

**Thresholds** — no hero. Eight threshold rows → what the agents never do · what it sits on top of.

## 8. What is real and what is invented

Rebuild decisions depend on knowing which is which.

**Verbatim from the workshop spec:** the three agents and nine steps, all 18 lane statements, the
three-lane wording, "the dye lot or the date" as the escalated decision, both feedback paths, the
margin-gap argument, attainment-versus-adherence, the four never-dos, the not-in-scope boundary.

**Derived, with the spec sanctioning it:** Rowan's exception funnel is the supply chain funnel
retargeted to the plant floor. The *shape* of ranked costed options is from the supply chain
guiding example; the three specific options are a construction.

**Invented — every proper noun and every number.** Cascade Twist, Dune 240, all lot/batch/roll/order
/claim IDs, both dealer names, and all figures: 369/420 yd/hr, +5h 10m, 96.2%, 48m, 2,940, $1,840,
$6,200, $41,200, $18,400, 97%/62%, the ±8% band, the 48h locked window, three-batches-is-a-pattern.
Internally consistent, benchmarked against nothing.

**`Backing 2` as the constraint line is an assumption.** The spec marks the bottleneck as *typically*
backing/finishing — "how these plants are normally built, not a claim about Shaw." The prototype
hardcodes it. Ask *"if one machine stops, which one costs you the day?"* and change the data if the
answer differs.

**Systems on screen:** only Oracle Fusion and Databricks, the two the spec marks as sourced for this
context. Everything else is deliberately "your MES", "your scheduling system", "your maintenance
system". Do not add a system Shaw hasn't named.

## 9. Rebuilding — how the file is laid out

Single file, ~49 KB, four sections in order:

1. **`<style>`** — CSS custom properties then component classes, commented by group
2. **Data constants** — `D` (the incident), `SEQ_BASE`, `RULES_BASE`, `FEED_BASE`, `OPTIONS`,
   `INSPECT`, `THRESHOLDS`. **All content lives here.** Change the demo by editing these, not markup
3. **View functions** — `vRowan()`, `vSawyer()`, `vWren()`, `vThresholds()`, each returning an HTML
   string. Plus `rateChart()`, which emits hand-built SVG
4. **Shell and handlers** — `render()`, `accept()`, `undo()`, `sendFinding()`, and one delegated
   click listener dispatching on `data-act`

To change **the incident**, edit `D`. To change **the options**, edit `OPTIONS` — including each
one's `seqEffect`, which is the hook into the fast path. To change **what escalates**, edit the
`limit`/`person` entries in `FEED_BASE` and `needsCount()`.

Adding a fourth agent means: a `D` extension, a `v<Agent>()` function, a nav entry in `render()`,
and any new loop wiring in the handlers. No framework, no build step, nothing to install.

**Verify after every edit:** `node shot.js`. It renders all four views, clicks the full loop in
order, and fails loudly on a console error. It caught both bugs in this build — a CSS class
collision that blanked a hero figure behind a full-height black block, and a chip-lookup crash on
non-lane chip types. The chromium path is already set in the file.

## 10. Constraints to preserve

- **Single self-contained file.** Shareability and offline reliability in a client room
- **Nothing loaded from a CDN.** It will fail in the room
- **No localStorage or sessionStorage.** In-memory state only
- **One product, one dataset** across all views
- **Purple means the agentic layer and nothing else.** Amber is the thresholded lane, near-black is
  the person lane. No gradients, no accent stripes, no coloured underlines beneath headings
- **One hero figure per view**
- **Nothing unlabelled** — every state resolves to one of the three lanes
