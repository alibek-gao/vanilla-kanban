# Task 12: Final Cleanup

In this step, we did a small refactor pass without changing the kanban board's behavior.

The goal was to keep the code easier to read and maintain now that all core features are finished.

## What changed

In `script.js`, we extracted a few tiny helper functions:

- `findColumn(columnId)`
- `findItem(column, itemId)`
- `resetDragState()`
- `endDragState()`

These helpers replace repeated lookup and cleanup code that had started to appear in multiple places.

## Why this helps

Before this cleanup:

- several functions repeated the same `state.columns.find(...)` logic
- item lookups repeated the same `column.items.find(...)` logic
- drag cleanup repeated manual resets of `dragState.itemId` and `dragState.sourceColumnId`

After this cleanup:

- repeated logic is grouped into named helpers
- the intent of each operation is easier to understand
- future edits are less likely to miss one copy of the same logic

This kind of refactor is small, but it improves readability a lot.

## Refactoring principle used

This task follows a simple cleanup rule:

- extract repetition only when the helper makes the code clearer

That is important because too much abstraction can also make small apps harder to follow.

In this project, the helpers are intentionally tiny and direct.

## Behavior check

This task does not add new features.

The kanban board should still work the same way:

- add, edit, and delete columns
- add, edit, and delete items
- drag to reorder within a column
- drag to move between columns

## XSS safety note

This cleanup step does not change how user text is handled.

Text is still rendered with `textContent`, so the XSS safety story remains the same.

## Result

After Task 12, the app behaves the same as before, but the code is a bit cleaner and easier to maintain.
