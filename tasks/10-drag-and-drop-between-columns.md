# Task 10: Drag and Drop Between Columns

In this step, we extended drag and drop so items can move across columns as well as reorder inside the same one.

This is the core kanban interaction: moving work from one stage to another.

## What changed

In `script.js`, we replaced the same-column reorder helper with a more general `moveItem()` function.

That function can now:

- remove an item from its source column
- insert it into a target column
- place it before a target item
- place it after a target item
- place it at the end of a column

We also updated the drag listeners so drops are no longer limited to the source column.

## How it works

When a drag starts:

1. We store the dragged item ID
2. We store the source column ID

When the dragged item moves over a column:

1. We find the nearest `.column__items` container
2. We check that a drag is active
3. We call `event.preventDefault()` so the column can accept the drop
4. We highlight that column's item list

When the item is dropped:

1. We find the target column
2. If the drop is on empty space, we move the item to the end of that column
3. If the drop is on another item, we compare the cursor position with the middle of that item
4. We insert before or after based on that position
5. We update state and re-render

This works both:

- inside the same column
- across different columns

## Browser APIs used: HTML Drag and Drop

This task continues using the native browser drag-and-drop system:

- `dragstart` to begin tracking the dragged item
- `dragover` to allow a drop target and show feedback
- `drop` to perform the move
- `dragend` to clean up drag state

The important rule still applies:

```js
event.preventDefault();
```

Without that inside `dragover`, the browser usually will not allow dropping into the list.

## What changed conceptually from Task 9

In Task 9, we used array order to reorder items only inside the source column.

In Task 10, we still use array order, but now the move can happen between two different arrays:

- `sourceColumn.items`
- `targetColumn.items`

So the operation becomes:

1. remove from one array
2. insert into another array

That is why a generic `moveItem()` helper is a better fit than a same-column reorder helper.

## XSS safety note

This feature only changes where items are stored and displayed.

It does not change how text is rendered.

Item text still uses `textContent`, so moving cards between columns does not introduce an XSS issue in the current implementation.

## Why this step matters

This is the point where the board starts to behave like a real kanban tool.

Users can now move work between stages such as:

- To Do
- Doing
- Done

## Result

After Task 10, items can be dragged within a column or moved between different columns.
