# Task 9: Drag and Drop Inside a Column

In this step, we added drag-and-drop sorting for items inside the same column.

This means cards can now be reordered without editing their text or deleting and recreating them.

## What changed

In `script.js`, we added:

- `draggable = true` on each item
- a small `dragState` object to track the dragged item
- drag event listeners for `dragstart`, `dragover`, `drop`, and `dragend`
- a `reorderItemsInColumn()` helper to move an item inside one column's `items` array

In `styles.css`, we added:

- a grab cursor on items
- a visual style for the dragged item
- a visual highlight for the active drop zone

## How it works

When the user starts dragging an item:

1. We store the dragged item ID and source column ID in `dragState`
2. We mark the item visually as being dragged

When the dragged item moves over a column:

1. We detect the nearest `.column__items` container
2. We only allow the action if it is the same source column
3. We call `event.preventDefault()` so dropping is allowed
4. We highlight the drop area

When the item is dropped:

1. We find the target item, if there is one
2. We compare the mouse position to the middle of that item
3. We decide whether to insert before or after it
4. We reorder the array in state
5. We re-render the board

If the user drops into empty space inside the same column, the item is moved to the end.

## Browser APIs used: HTML Drag and Drop

This task uses the browser drag-and-drop event system:

- `dragstart`
- `dragover`
- `drop`
- `dragend`

Here is what each event does:

### `dragstart`

`dragstart` fires when the user begins dragging a draggable element.

In this project, we use it to:

- remember which item is being dragged
- remember which column it came from
- apply a visual dragging style

This is the moment where drag state begins.

### `dragover`

`dragover` fires repeatedly while the dragged element is moving over a possible drop target.

In this project, we use it to:

- detect the current item list under the mouse
- check whether dropping is allowed
- highlight the active drop area
- call `event.preventDefault()`

That last part is very important:

```js
event.preventDefault();
```

Without it, the browser usually does not allow dropping.

So `dragover` is the event that says: "yes, this place can accept the dragged item."

### `drop`

`drop` fires when the user releases the mouse and drops the dragged element onto a valid target.

In this project, we use it to:

- find the target item
- decide whether the dragged card should go before or after it
- update the array order in state
- re-render the board

This is the event where the real move happens.

### `dragend`

`dragend` fires after the drag operation finishes, no matter whether the drop succeeded or not.

In this project, we use it to:

- clear drag state
- remove temporary drag styles

This makes it a good cleanup event.

Even if the user cancels the drag or drops somewhere invalid, `dragend` helps return the UI to a normal state.

We also use:

```js
itemElement.draggable = true;
```

This tells the browser that the element can be dragged.

We also configure the drag payload:

```js
if (event.dataTransfer) {
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", itemElement.dataset.itemId || "");
}
```

Here is what that means:

- `event.dataTransfer` is the browser object that stores drag-related data
- `effectAllowed = "move"` tells the browser this drag should behave like a move operation
- `setData("text/plain", ...)` stores the dragged item's ID as plain text in the drag payload

In this project, we mainly track the dragged item with our own `dragState` object.

But setting `dataTransfer` is still useful because:

- it matches how the native drag-and-drop API is designed
- it helps browsers treat the interaction as a proper drag operation
- it gives us a place to store the dragged item's ID if we want to read it during `drop`

For example, in another implementation we could read it back like this:

```js
const draggedItemId = event.dataTransfer.getData("text/plain");
```

That would let the drop handler recover the dragged item ID directly from the browser drag payload.

Another important part is:

```js
event.preventDefault();
```

Inside `dragover`, this is required to make dropping possible.

## What else can be done with the drag-and-drop API

The same API can be used for:

- moving files into a page
- dragging items between lists
- building reorderable menus
- creating upload drop zones

It is a native browser feature, so no external library is required for basic interactions.

## XSS safety note

This feature changes item order, but it does not change how text is rendered.

Item text is still inserted with `textContent`, so drag and drop does not introduce an XSS issue in the current implementation.

## Why this step matters

This is the first real spatial interaction in the app.

Users can now organize work visually inside a column, which is one of the main reasons to use a kanban board.

## Result

After Task 9, items can be dragged and reordered within the same column.
