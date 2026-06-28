# PACT Regression Test Pack

Purpose: provide a repeatable regression pack for extracting and unifying the PACT engine into `js/engine.js` with **zero behaviour change**.

This pack is designed around the current files:

- `PACT-CharGen-Webtool-v0.104.html`
- `PACT-Live-Char-Sheet-v0.104.html`
- `DM Console - CardGrid-v0.014.html`
- `DM Console - DataTable-v0.014.html`

## Important note

The actual attached HTML/exported JSON files were not available inside the execution sandbox when this pack was generated, so this pack provides:

1. a ready-to-use regression structure;
2. browser-based parity runners;
3. fixture locations;
4. checklist templates;
5. expected-result capture templates;
6. placeholder JSON examples that must be replaced with real exports from your current tools before final regression sign-off.

Do not treat the placeholder fixture values as authoritative PACT rules data.

## Recommended folder placement

Place this folder inside your PWA repo:

```text
pact-pwa/
  js/
    engine.js
  legacy/
    PACT-CharGen-Webtool-v0.104.html
    PACT-Live-Char-Sheet-v0.104.html
    DM Console - CardGrid-v0.014.html
    DM Console - DataTable-v0.014.html
  pact-regression-test-pack/
```

## What this pack tests

### Character Generator parity

For each build fixture:

- legacy calculation result;
- new `engine.js` calculation result;
- AP total;
- warnings;
- validation status;
- exported JSON schema stability.

### Live Sheet parity

For each live-sheet fixture:

- imported generated JSON;
- AP awards;
- purchase events;
- frozen purchase prices;
- event ordering;
- reconstructed character state.

### Event sourcing parity

For each event fixture:

- base snapshot + ordered events;
- reconstructed state;
- AP balance;
- no retroactive recalculation of historical purchases.

## How to use

1. Copy real exported JSON files into:

```text
fixtures/builds/
fixtures/live-sheets/
fixtures/events/
```

2. Open this file in a browser from your repo:

```text
tests/engine-parity.html
```

3. Review the output JSON.

4. Capture expected results before refactor using:

```text
expected/expected-results.csv
```

5. After refactor, rerun and compare.

## Pass rule

The refactor passes only if the same inputs produce:

- same AP totals;
- same warning messages;
- same validation state;
- same imported/exported JSON shape;
- same reconstructed live-sheet state;
- same historical frozen prices.
