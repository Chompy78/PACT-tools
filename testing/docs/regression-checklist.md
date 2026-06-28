# PACT Regression Checklist

## Before refactor baseline capture

- [ ] Legacy CharGen opens without console errors.
- [ ] Legacy Live Sheet opens without console errors.
- [ ] At least one valid 50 AP character exported from CharGen.
- [ ] At least one over-budget character exported or captured.
- [ ] At least one live-sheet JSON exported/imported.
- [ ] At least one event log includes AP award + purchase.
- [ ] Legacy outputs recorded in `expected/expected-results.csv`.

## After engine extraction

- [ ] `DATA.version` unchanged.
- [ ] `compute(build)` output shape unchanged.
- [ ] Same build gives same AP total.
- [ ] Same build gives same warnings.
- [ ] Same build gives same validation result.
- [ ] Same live-sheet import reconstructs same state.
- [ ] Historical purchases use frozen event payload prices.
- [ ] Exported JSON schema unchanged.
- [ ] No Supabase, IndexedDB, or service worker logic inside `engine.js`.

## Sign-off rule

Do not delete duplicated legacy engine code until every required row in `expected-results.csv` has passed.
