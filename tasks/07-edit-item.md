# Task 7: Edit Item

In this step, we added the ability to rename a task card inside a column.

This gives items the same basic edit flow that columns already have.

## What changed

In `script.js`, each item now renders an `Edit` button.

We also added:

- an `editItem()` function
- logic to find the correct column and item by ID
- a prompt with the current item text as the default value
- a re-render after the item text is updated

In `styles.css`, we changed the item layout so the text and item action button can sit on the same row.

## How it works

When the user clicks an item's `Edit` button:

1. We find the nearest clicked action button with `closest()`
2. We read the `columnId` and `itemId` from the button dataset
3. We find the matching column in state
4. We find the matching item inside that column
5. We open a `prompt()` with the current item text
6. If the user cancels, nothing happens
7. If the new text is empty, nothing happens
8. We update the item text
9. We call `renderBoard()` again

## Browser APIs used: `window.prompt()`, `addEventListener()`, and `closest()`

This task reuses the same browser APIs from earlier steps:

- `window.prompt()` to collect short text input
- `addEventListener()` for delegated click handling
- `closest()` to reliably find the clicked action button

These APIs work well together in small vanilla JavaScript apps because they keep the code direct and easy to follow.

## What else can be done with this pattern

This same pattern can also be used for:

- editing descriptions
- renaming lists
- adding quick inline admin tools
- handling many dynamic buttons with one parent listener

It is especially useful when the DOM is re-rendered often.

## XSS safety note

The edited item text is still rendered safely with `textContent`:

```js
textElement.textContent = item.text;
```

That means user-entered text is displayed as plain text, even if it looks like HTML.

## Why this step matters

Now task cards are no longer fixed after creation.

That makes the board much more practical, because users can correct or update task text as their work changes.

## Result

After Task 7, every item has an `Edit` button and can be renamed interactively.
