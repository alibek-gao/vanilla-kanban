# Task 8: Delete Item

In this step, we added the ability to remove task cards from a column.

This completes the basic create, edit, and delete cycle for items.

## What changed

In `script.js`, each item now renders a `Delete` button next to its `Edit` button.

We also added:

- a `deleteItem()` function
- logic to find the correct column and item by ID
- a confirmation step before removal
- a re-render after deletion

The existing danger button style from earlier tasks is reused for item deletion.

## How it works

When the user clicks an item's `Delete` button:

1. We find the nearest clicked action button with `closest()`
2. We read the `columnId` and `itemId` from the button dataset
3. We find the matching column in state
4. We find the matching item inside that column
5. We open a confirmation dialog
6. If the user cancels, nothing happens
7. If the user confirms, we remove the item from the column's `items` array
8. We call `renderBoard()` again

## Browser APIs used: `window.confirm()` and `closest()`

In this task, we use:

```js
window.confirm(`Delete "${item.text}" item?`);
```

This adds one extra confirmation step before removing data.

We also use:

```js
target.closest("button[data-action]");
```

This keeps the event delegation reliable for dynamically rendered item buttons.

## What else can be done with this pattern

This pattern is useful for:

- deleting comments
- removing tags
- confirming dangerous settings changes
- handling many dynamic actions with one parent listener

It works especially well in simple apps where the UI is regenerated after each state change.

## XSS safety note

The item text shown in the board is still rendered safely with `textContent`.

The text used inside `confirm()` is shown in a browser dialog, not injected as page HTML.

That means this flow does not create an XSS issue in the current implementation.

## Why this step matters

Now items have a full minimal lifecycle:

- create
- edit
- delete

That means the board is ready for the next major feature: drag and drop.

## Result

After Task 8, every item has a `Delete` button and can be removed after confirmation.
