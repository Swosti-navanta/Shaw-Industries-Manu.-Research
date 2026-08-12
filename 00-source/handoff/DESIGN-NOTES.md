# Design notes — prototype against Navanta's design system

Audited 11 Aug 2026 against `shaw-workshop-build/DESIGN.md`. Read that file first.

**Important context:** the design system in `DESIGN.md` was written for the **1600×900 workshop
canvas** — a projected, room-facing surface. This prototype is **product UI**. Some rules transfer
directly (colour tokens, the accent-stripe ban, the font stack); some are scoped to the canvas and
don't (the type scale, dark/light rhythm). Divergences below are marked by which case they are.

## Compliant

**Brand purple — exact match.** All nine steps identical: `#f7f2ff` `#f1e6ff` `#decdff` `#c8abff`
`#ab83fb` `#8c5de1` `#6a3ebd` `#492a7e` `#3a2263`. Inherited by lifting the CSS variables from
`shaw-workshop-build/dist/app-canvas.html`.

**Neutral zinc — exact match.** All eleven steps identical.

**Font stack — compliant, and I mis-flagged this.** `DESIGN.md` offers two options: embed Geist as
base64 (preferred) or declare the stack and accept fallback. The prototype uses the declared stack
*character for character*:

```
'Geist','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif
```

So this is the sanctioned option 2, not a shortcut. `README.md` calls it a
"placeholder" — that's too harsh. Embedding is still an improvement worth making, but the current
state is in spec.

**Geist Mono usage — compliant.** `DESIGN.md` reserves the mono face for numerals, times, labels and
system names. The prototype uses it for timestamps, eyebrow labels, chips, and every identifier
(dye lot, batch, roll, order IDs). Consistent.

**No accent stripes.** The ban on coloured accent stripes, edge bars and underlines beneath headings
is respected — the only single-edge borders in the file are neutral hairline dividers between table
rows and list items, which is what they're for.

**Shadows.** One shadow in the entire file (`0 1px 2px rgba(0,0,0,.07)` on the active segment
control). `DESIGN.md` asks for "almost nothing inside". Compliant.

**No glow accents.** Correctly absent — `DESIGN.md` restricts them to dark canvas views.

## Divergent — needs a designer decision

**1. Semantic colours do not use Navanta's tokens.** This is the real finding.

| | `DESIGN.md` | Prototype |
|---|---|---|
| success | `#00e275` / bg `#ecfef3` / fg `#008234` | `#067647` / bg `#ecfdf3` / border `#a6f4c5` |
| warning | `#ffbc00` / bg `#fffbea` / fg `#9e3900` | `#b45309` / bg `#fffbeb` / border `#fcd34d` |
| info | `#00c0ff` / bg `#f0f9ff` / fg `#005b89` | not used |
| danger | **no token exists** | `#b42318` / bg `#fef3f2` / border `#fda29b` |

Two problems. First, the success and warning values are close-but-not-equal to Navanta's — the
backgrounds differ by a digit, the foregrounds substantially. Second, and more significant, **the
design system has no danger/red token at all**, and this prototype needs one badly: the deviation
banner, the "repeat of a known cause" warning on Option B, the constraint-line meter, and the
margin-at-risk delta all carry genuine bad-news semantics. I invented a red rather than leave those
states unmarked.

The decision to make: either extend `DESIGN.md` with a sanctioned danger ramp and snap the
prototype to Navanta's real success/warning values, or accept a product-UI-specific status palette
and document it as such. My recommendation is the former — the design system should own a danger
token, because any product surface will need one.

**2. Amber is reserved differently.** `DESIGN.md` reserves amber for "honest caveats and the tension
panel. Never decorative." The prototype reserves it for the THRESHOLDED lane — semantic, not
decorative, so it honours the spirit, but it's a *different* reservation. Worth reconciling
explicitly rather than by accident, since amber now means two things across the two surfaces.

**3. Corner radii are a hair off.** `DESIGN.md` specifies 14px cards, 9–11px inner elements, 6px
chips. The prototype uses 13px cards and 5px chips; inner elements are in range at 10–11px. Trivial
to fix and worth fixing for continuity with the one-pager.

## Divergent — but scoped to the canvas, so probably fine

**4. Type scale.** `DESIGN.md` says nothing below 16px on the canvas, with 14px allowed for capture
rail UI, and specifies a scale topping out at 66px. The prototype runs a product-UI scale: 14px
body, 12.5px secondary, 9.5px chips, with heroes at 54px and page titles at 29px. That's
appropriate for dense application chrome viewed at desk distance rather than projected — but
somebody should confirm it, because it means the prototype and the one-pager are not on the same
scale even though they share a palette.

**5. Dark/light rhythm.** `DESIGN.md` asks views to alternate dark and light so "the room should
feel the transitions." That's a presentation device. The prototype is light throughout, with a dark
sidebar and two dark emphasis panels (the decision header and the traceback cause card). Correct for
a product, but it means the prototype won't feel like the workshop canvas if they're shown
back to back.

## Component inventory

What exists, for anyone extending it. Every one is plain HTML and CSS in the single file.

| Component | Class | Notes |
|---|---|---|
| Autonomy chip | `.chip.auto` / `.limit` / `.person` / `.mute` / `.bad` / `.good` | The core device. Dot plus uppercase mono label — never colour alone |
| Hero figure | `.hero` | Exactly one per view, 54px. Label and delta in `.hmeta` |
| Stat tile | `.tile`, `.tile.alert` | Label, value, delta. Four across |
| Meter | `.meter`, `.meter.warnm` | Fill carries state, track is a lighter step of the same ramp |
| Card | `.card`, `.card.flat` | `.flat` for edge-to-edge tables |
| Card head | `.ch` with `.t` `.s` `.r` | Title, subtitle, right-aligned meta |
| Activity feed | `.feed` / `.fitem` | Timestamp column plus chip, agent, text |
| Decision card | `.decision` / `.opt` / `.opt.rec` / `.opt.risky` | The climax of Rowan's view |
| History warning | `.hist` | Red inset panel inside an option |
| Resolved state | `.resolved` | Green confirmation with follow-on actions |
| Trace chain | `.trace` / `.tnode` / `.tarrow` | Genealogy and claim traceback |
| Cause card | `.cause` | Dark emphasis panel |
| Rule row | `.rule`, `.rule.fromloop` | `.fromloop` marks a rule fed back by another agent |
| Threshold row | `.throw` / `.seg` | Segmented Auto / Limit / Ask control |
| Facilitator note | `.note` | Dashed panel. Used for honest caveats — keep these |
| Loop banner | `.loopbanner` | Purple. Marks the loop firing |
| Incident banner | `.inc` | Red. The open deviation |

## Chart specifics

The rate chart is hand-built SVG. Two series, one axis, no dual-axis. Plan rate `#71717b`, achieved
rate `#18181b`, shortfall wash in red at 10% opacity, hairline solid gridlines, 2px lines, 4.5px
end markers with a 2px surface ring, and **direct end-labels on both series** plus a legend.

Do not remove the end-labels. The plan-line grey sits below 3:1 contrast against the surface, and
visible labels are the required relief for that — it's also why the line is `#71717b` rather than a
lighter grey. There is no hover layer yet; a crosshair tooltip is the obvious next increment.

## Priority order if you're improving this

1. Resolve the semantic-colour question — it's the only divergence with real consequences
2. Embed Geist as base64
3. Add the chart hover layer
4. Snap radii to 14px / 6px
5. Make the threshold toggles actually change what escalates — currently presentational, and it's
   the single highest-value functional upgrade in the prototype
