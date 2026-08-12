# Shaw Research — module index

**Client:** Shaw Industries · **Partner:** UnifyApps · **By:** Navanta
**Scope:** Carpet manufacturing agents — research, structure and product-creation record
**Primary source of truth:** `00-source/unifyapps-manufacturing-demo 1.html` (the six-section demo build)
**Status:** Draft for review — generated 12 Aug 2026, adversarially checked, fixes applied

## How to read this module

Read in this order:

| # | File | What it is |
|---|---|---|
| 1 | [01-personas.md](01-personas.md) | Nine persona cards, the persona × surface matrix, the decision-rights map, anti-personas |
| 2 | [02-journeys/01-overview.md](02-journeys/01-overview.md) | Overview (exception inbox) + Sage — deep dive |
| 3 | [02-journeys/02-scheduling.md](02-journeys/02-scheduling.md) | Scheduling · Sawyer — deep dive |
| 4 | [02-journeys/03-yarn.md](02-journeys/03-yarn.md) | Yarn · Sable — deep dive (note: Sable is new in the demo build, absent from the spec) |
| 5 | [02-journeys/04-make.md](02-journeys/04-make.md) | Make · Rowan — deep dive |
| 6 | [02-journeys/05-quality.md](02-journeys/05-quality.md) | Quality · Wren — deep dive |
| 7 | [02-journeys/06-thresholds.md](02-journeys/06-thresholds.md) | Thresholds (the autonomy dial) — deep dive incl. governance |
| 8 | [03-pain-points.md](03-pain-points.md) | Master pain register — 33 rows, classed A (no agent needed) / B (agentic) / C (stays human) |
| 9 | [04-service-blueprint.md](04-service-blueprint.md) | Industry today → blueprint with the agentic layer → what changes → 15 product principles → risks |

Every journey file follows the same nine-part structure: screen inventory → job → personas → journey today → journey with agents → pain points → agentification deep dive → open questions → sourcing note.

## Rules this module is written to

- **Sourcing discipline** — every Shaw claim carries [SOURCED] / [INTERNAL] / [ASSUMED] / [OPEN]. All demo figures and IDs are invented and flagged as such.
- **The three-lane wording is verbatim wherever quoted** — AUTOMATED / THRESHOLDED / A PERSON.
- **Banned vocabulary** — "control tower" and "PP/DS" appear nowhere (except in `00-source/` documenting the ban itself).
- The agents never: run the line · write the demand plan · grade the product · overrule a quality hold.

## Known seams carried forward (from the adversarial critique)

1. **Option C drawer arithmetic** — card says +$6,200, drawer nets +$6,840. Room-arithmetic seam in the demo build.
2. **Batch drawer exposure** — B-88214 quantity (296 lin yd) vs the $918 exposure computed on the 148-yd roll.
3. **Overview inbox rows 3–4 are static** — in the Auto variant, row 4 contradicts row 1's auto-resolved state.
4. **Healthy-line contrast undocumented** — Tufting 3 (511/520) and Finishing 1 (598/610) exist in demo constants but no research file uses the contrast framing.
5. **The click path is stale** — `00-source/handoff/CLICK-PATH.md` narrates the earlier 4-view build; nobody has written the 6-view walkthrough.
6. **"5 items resolved automatically" is unenumerated** — if the room asks "which five?", no file has the answer.
7. **Plant switching only changes thresholds** — all three plants show the identical incident; a one-engine seam an attentive viewer can trip on.
8. **The feed drawer paraphrases the lane wording** — decide whether the on-screen paraphrase is sanctioned.
9. **Sage's sharper failure mode** — a correctly-cited but outdated SOP acted on with the authority of the screen — is unexamined.
10. **Thresholds room choreography unwritten** — who at Shaw sees the Thresholds screen first, and how the corporate-envelope conversation opens.

## Companion module

The **Product** module (`../Product/`, localhost:4802) is where the build happens. This research feeds it directly.
