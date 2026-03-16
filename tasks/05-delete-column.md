# Task 5: Delete Column

In this step, we added the ability to remove a column from the board.

This completes the basic create, edit, and delete cycle for columns.

## What changed

In `script.js`, each column now renders a `Delete` button next to the `Edit` button.

We also added:

- a `deleteColumn()` function
- a confirmation step before removal
- logic to remove the matching column from `state.columns`
- a re-render after deletion

In `styles.css`, we added a danger-style button variant so the delete action is visually different from the regular actions.

## How it works

When the user clicks the `Delete` button:

1. We find the nearest clicked action button with `closest()`
2. We read the column ID from the button dataset
3. We find the matching column in state
4. We open a confirmation dialog
5. If the user cancels, nothing happens
6. If the user confirms, we remove that column from `state.columns`
7. We call `renderBoard()` again

Using `closest()` makes the event delegation more reliable, because the click can happen on text or nested content inside the button.

## Browser APIs used: `window.confirm()` and `closest()`

In this task, we used:

```js
window.confirm(`Delete "${column.title}" column?`);
```

This opens a browser dialog with two choices:

- OK
- Cancel

It returns:

- `true` if the user confirms
- `false` if the user cancels

We also use:

```js
target.closest("button[data-action]");
```

This finds the nearest matching button for the click event, even if the user clicked on text inside the button.

## What else can be done with dialog APIs and `closest()`

The built-in dialog APIs are small but useful:

- `window.alert()` to show a message
- `window.confirm()` to confirm an action
- `window.prompt()` to collect short text input

The `closest()` DOM method is useful for:

- finding the nearest item card
- locating a parent column element
- building delegated click handlers

Together, these patterns keep the code small while still making it reliable.

## XSS safety note

The confirmation message includes the column title, but that does not create HTML rendering in the page.

The title displayed in the board still remains safe because it is rendered with `textContent`, not `innerHTML`.

So even if a title contains HTML-like text, it is treated as plain text in the UI.

## Why this step matters

Now users can fully manage board columns:

- create them
- rename them
- remove them

That gives the board a complete minimal column workflow.

## Result

After Task 5, every column has a `Delete` button and can be removed after confirmation.
