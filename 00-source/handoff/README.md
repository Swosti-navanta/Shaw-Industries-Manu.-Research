# UnifyApps · Manufacturing — prototype handoff

**Shaw Industries. Assembled 11 Aug 2026 by Navanta Labs.**

A clickable prototype of the UnifyApps manufacturing product: three agents — **Sawyer**
(scheduling), **Rowan** (make/exception), **Wren** (quality) — plus the thresholds surface. One
incident threaded through all three views, and a feedback loop you can close by clicking.

Read this file, then open the prototype with `CLICK-PATH.md` beside you.

## Run it

Double-click **`unifyapps-manufacturing.html`**. No build step, no dependencies, no network, no
install. ~49 KB, one file.

Verify after any edit:

```
node shot.js
```

Renders all four views, clicks the full loop, fails loudly on a console error. The chromium path is
already set in the file.

## The six files

| File | Read it when |
|---|---|
| **`README.md`** | Now. State, what's deliberate, what's left, open questions |
| **`CLICK-PATH.md`** | With the prototype open. ~10 min, or 5 for the three key beats |
| **`LOGIC.md`** | Before changing behaviour. The full state machine, both loop paths, every control, what's invented |
| **`DESIGN-NOTES.md`** | Before changing visuals. Token audit, component inventory, the divergences |
| **`GLOSSARY.md`** | If you're new to manufacturing or carpet. Attainment vs adherence, dye lots, seconds, genealogy, MES |
| **`unifyapps-manufacturing.html`** | The prototype. This is the whole thing |
| **`shot.js`** | The verification harness |

## Why it exists

The manufacturing one-pager and the workshop spec both promise demos that existed nowhere — every
demo slot in the workshop build renders a labelled fallback. This fills that gap, and turns
capturing the workshop's demo stills into a screenshot job rather than a design job.

## The two rules it is built to

**1. One product, one dataset.** The same style, colour, dye lot, batch, roll, line and orders
appear in all three views. If the screens looked like assets built for different clients with
unrelated data, an attentive person would spot the seams and the one-engine claim would collapse
harder than three honest separate demos would have.

**2. Colour means one thing.** Purple = the agentic layer, and nothing else. Amber = the
THRESHOLDED lane. Near-black = the PERSON lane. Red and green are status only. No gradients, no
accent stripes.

## The interaction that matters

**The loop is clickable, in both directions.** This is the point of a prototype rather than drawn
screens.

- **Fast path:** accept an option in Rowan → Sawyer's released sequence visibly rebuilds, rows tag
  *moved by Rowan*, and a banner reads *the plan corrected itself*
- **Slow path:** send the finding in Wren → a new constraint rule appears at the top of Sawyer's
  model, chipped *From Wren*
- The header counter drains to *Nothing waiting on you* as both are resolved
- **Undo** in Rowan resets the decision so you can re-run the demo for the next audience

Option B is the sharpest beat: choosing it surfaces *you did this on DL-4102 in June and it produced
claim CLM-2291* — the claim Wren is tracing two screens away.

## Deliberate — improve rather than replace

- **The three-lane chip system and its wording.** Fixed by the workshop spec: "The agent just does
  it" / "Acts inside limits you set" / "Judgement, the call is yours." It is the device that does
  the persuading — the THRESHOLDED lane especially, because it makes autonomy a dial the client
  sets rather than a property of our software
- **Purple reserved for the agentic layer only**
- **One hero figure per view** (+5h 10m · 62% · $41,200), supporting stat tiles beneath
- **Rowan's card order:** banner → hero and tiles → chart and genealogy → **activity feed →
  decision card**. The feed comes before the decision because it *is* the argument for it — five
  automated entries, one thresholded, one escalated. Do not move the decision back above the feed
- **No spec step numbers in the chrome.** They read out of sequence on every screen, because layout
  runs by narrative importance while the numbers run in process order. Mapping is in `LOGIC.md` §7
- **Explicit "Illustrative data" flagging.** This project runs a strict sourcing discipline
- **Nothing unlabelled** — every state resolves to one of the three lanes

## Placeholder — expect to change

- **Typography falls back to system sans.** The declared stack is the design system's sanctioned
  option; embedding Geist as base64 is the preferred one and still worth doing
- **The rate chart has no hover layer.** Legend, direct end-labels and a shortfall wash are there;
  a crosshair tooltip is the obvious next increment
- **The threshold toggles are presentational** — flipping one does not rewire Rowan. See `LOGIC.md`
  §6; this is the highest-value functional upgrade available
- **No responsive work below ~820px.** It is a demo on a projector, not a phone app
- **Icons are text glyphs** (⚙ ⚠ ✓ ↓)
- **Semantic colours diverge from the design system.** See `DESIGN-NOTES.md` — this one has real
  consequences
- **All figures are invented** and internally consistent, not benchmarked. See `LOGIC.md` §8

## Priority queue

1. **Resolve the semantic-colour question.** The design system has no danger/red token and this
   product needs one. `DESIGN-NOTES.md` has the detail and a recommendation
2. **Wire the threshold toggles** so changing one actually changes what escalates
3. **Embed Geist** as base64
4. **Chart hover layer** — crosshair and tooltip
5. **A queue/inbox landing view.** The header counter implies one; no screen exists
6. **Capture screens as stills** for the one-pager and the workshop build's empty demo slots

## Open questions — these change the material

1. **Does Shaw's planning system reach the plant, or is the line sequence built in a spreadsheet?**
   The product UI works either way, but the narrative inverts. Unanswered, and it's the single
   biggest one
2. **Maturity labels.** Nothing here is labelled live-versus-would-build. The workshop docs
   contradict each other on whether the labels were dropped or are required — the client explicitly
   asked for them at one point. If reinstated, every screen needs a chip
3. **Which line is the real constraint?** The prototype hardcodes Backing 2, which is an assumption
   about how carpet plants are normally built, not a claim about Shaw. Ask *"if one machine stops,
   which one costs you the day?"*
4. **Agents versus seats.** The manufacturing spec claims a pattern consistent across all three
   workshops — named agents plus three lanes. The built supply chain workshop has neither; it uses
   four human seats. This prototype follows the manufacturing spec. Someone should decide whether
   supply chain gets retrofitted, because the shared pattern is what makes three workshops read as
   one engagement
5. **Do Sawyer, Rowan and Wren collide with real people at Shaw?** Still unverified

## Source material

Not bundled — it lives in `Documents/Shaw Industries/`. If you need it:

- **`Shaw_Manufacturing_Workshop_Spec.md`** — the domain source of truth. §3 architecture · §5 the
  lane copy this product renders directly · §9 the sourcing register · §10 open questions · §11
  risks · §12 decision log. **Read §9 before presenting anything**
- **`Shaw_Manufacturing_Onepager 2.pdf`** — the client-facing visual reference
- **`shaw-workshop-build/content/positioning.md`** — the language rules. "Control tower" is banned,
  the renames are non-negotiable. From Shaw's own written feedback
- **`shaw-workshop-build/DESIGN.md`** — Navanta's design system
- **`shaw-mfg-build/content/workshop.json`** — the workshop run sheet and the six demo briefs these
  screens were built from. Not wired to an app

One gap worth knowing: **`Shaw_Manufacturing_Onepager.html` does not exist.** The spec references it
as the one-pager's editable source, but only the rendered PDF is in the project. Revising the
one-pager means rebuilding it.
