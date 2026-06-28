# How to capture real expected results

Use this guide with the current working legacy files before extracting the engine.

## Character Generator expected results

For each test character, record:

- fixture filename;
- total AP cost;
- remaining AP;
- validation status;
- warning messages;
- exported JSON filename;
- any console errors.

## Live Sheet expected results

For each imported live sheet, record:

- AP balance;
- number of events;
- current derived state summary;
- purchase history;
- frozen cost values;
- undo/redo behaviour if used;
- time travel result if used.

## Minimum fixture set

Use at least:

1. default/empty build;
2. valid 50 AP build;
3. over-budget build;
4. imported generator export;
5. live sheet with AP award;
6. live sheet with purchase;
7. live sheet with multiple purchases on same ladder;
8. older JSON export if available.
