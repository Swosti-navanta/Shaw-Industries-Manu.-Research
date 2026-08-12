# Click path — the guided walkthrough

Open `unifyapps-manufacturing.html`. Roughly ten minutes. Don't skip step 5 — it's where
the pitch lands.

One incident runs through all three views: **Backing 2 is running 12% under plan rate** on Cascade
Twist · Dune 240, dye lot DL-4471, and batch B-88214 went on quality hold in the same hour. The
same style, dye lot, batch, roll, line and orders appear in every view. That continuity is
deliberate — if the screens looked like assets built for different clients with unrelated data, an
attentive person would spot the seams and the one-engine claim would collapse.

## Rowan — the exception engine

**1.** Land here. Note the header — *Decisions waiting 2* — and the badges on Rowan and Wren in the
sidebar. The product opens by telling you what needs a human.

**2.** Read the red banner and the hero. Deviation open since 06:38, projected finish +5h 10m and
still opening. One number, one consequence.

**3.** The chart. Achieved rate against plan, shortfall shaded, a marker where the deviation opened.
Both lines carry end-labels — 420 and 369.

**4.** Genealogy, right-hand panel. Yarn lot → dye lot → batch → roll. Say the line underneath out
loud: this record is written *as the run happens*, which is what makes a claim settleable instead of
arguable. It's also the setup for Wren.

**5. The Activity feed — this is the money screen.** Seven entries: five purple *Automated*, one
amber *Inside limits*, one black *Needs you*. In one glance it answers the question everybody in an
agentic pitch is privately asking. The amber entry is the persuasive one:

> Stopped short of re-sequencing **Backing 2** — every option there moves a promised date.

The agent knew where its authority ended. The feed sits *above* the decision card on purpose — it
is the argument for the decision.

**6.** The decision card. Three costed options. Look hard at Option B: it holds both dates for zero
changeover cost, so it looks like the obvious pick — and then the product tells you *you did this
on DL-4102 in June and it produced claim CLM-2291*. That's the loop arguing against a decision
before it's made. (Note: that warning is a design proposal, not a described capability — see the
provenance section of `README.md`.)

**7. Click Accept on Option A.** Watch three things: a green panel confirms the decision, three new
entries slide into the feed (you → Rowan → Sawyer), and the header counter drops to 1.

**8.** Click **"See it in Sawyer's sequence →"**

## Sawyer — scheduling

**9.** The purple banner: *The plan corrected itself* — rebuilt two minutes ago, without a planning
cycle. This is the mechanic the spec calls the most important one.

**10.** The sequence table. Slots 2 and 3 have swapped, both highlighted, both tagged *moved by
Rowan*. ORD-77412 is now running and the dye lot stays whole.

**11.** The adherence hero: 62% against 97% attainment, with the explanation underneath. If there's
a finance person in the room, stop here.

**12.** The rate meters, bottom right. Backing 2 in amber at 369/420, labelled constraint line. Note
the honest caveat underneath — which line is really the constraint is an open question for Shaw.

## Wren — quality

**13.** Go to Wren. The hero: $41,200 margin at risk, of which $18,400 traces to a sequence
decision. That second number is the entire bridge between quality and scheduling.

**14.** Inspection queue. Two rolls graded automatically, one settled, and R-11204 with a *Decide
grade* button — borderline, second occurrence, so it goes to a person. **Click it.** The header now
reads *Nothing waiting on you*.

**15.** The traceback chain. Claim → rolls → batch → dye lot, ending in the black cause card: *the
lot was split to protect a date, and the two dye runs did not shade-match*. Time to trace: under a
minute.

**16.** The pattern panel. Three claims in four months, one cause, a scheduling decision every time.
**Click "Send the finding to Sawyer."**

**17.** Click **"See it in the constraint model →"** — and there it is at the top of Sawyer's rules,
chipped *From Wren*: never split a dye lot where an order has a fixed install date. **The loop is
now closed in both directions** — the fast path at step 7, the slow path here.

## Thresholds

**18.** Open Thresholds. Every row is a limit, with Auto / Limit / Ask. Point at *"Re-sequence where
a promised date moves — Always ask"* and explain that this single setting is why step 7 needed you
at all. Set it to Auto and the agent would have handled it.

Honest caveat: **the toggles are presentational in this build.** Flipping one doesn't rewire
Rowan's behaviour. Making a threshold change actually alter what escalates is the strongest next
increment — it's what would turn "autonomy is a dial you set" from demonstrable into provable.

## Reset

**19.** Back to Rowan, click **Undo**. Everything returns to the pending state so you can run it
again for the next audience.

## The three beats to land, if you only have five minutes

1. **The activity feed** (step 5) — autonomy is visible, bounded, and the agent stopped where its
   authority ended.
2. **Accept → Sawyer** (steps 7–10) — the plan corrected itself without a planning cycle.
3. **Wren → Sawyer** (steps 16–17) — a defect pattern became a scheduling rule. The loop closes.
