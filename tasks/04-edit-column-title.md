# Task 4: Edit Column Title

In this step, we added the ability to rename a column after it has been created.

This keeps the board flexible without introducing a complex form UI.

## What changed

In `script.js`, each column now renders an `Edit` button in its header.

We also added:

- an `editColumn()` function
- a click listener on the board container
- logic to find the correct column by ID
- a re-render after the title is updated

In `styles.css`, we updated the column header layout so the title and action button can sit on the same row.

## How it works

When the user clicks the `Edit` button:

1. We read the clicked column ID from a `data-` attribute
2. We find that column in `state.columns`
3. We open a `prompt()` with the current title as the default value
4. If the user cancels, nothing happens
5. If the new title is empty, nothing happens
6. We update the column title in state
7. We call `renderBoard()` again

## Browser API used: event delegation with `addEventListener()`

In this task, we used a click listener on the board container:

```js
boardElement.addEventListener("click", (event) => {
  // ...
});
```

This pattern is called event delegation.

Instead of attaching one click listener to every `Edit` button, we attach one listener to the parent container and check which button was clicked.

This works well because the board is re-rendered often, and the buttons are recreated each time.

## What else can be done with `addEventListener()`

The browser event system can be used for many other interactions, such as:

- `input` events for live typing updates
- `submit` events for forms
- `keydown` events for keyboard shortcuts
- `dragstart`, `dragover`, and `drop` for drag and drop
- `focus` and `blur` for input behavior

We will use more of these later in this kanban project.

## XSS safety note

The edited title still stays safe because it is rendered with `textContent`:

```js
titleElement.textContent = column.title;
```

That means even if someone enters HTML-like text, it is displayed as plain text instead of being executed as markup.

## Why this step matters

Users can now adjust the structure of the board after creating columns.

That makes the app feel more usable and prepares us for the same pattern on task items later.

## Result

After Task 4, every column has an `Edit` button and its title can be changed interactively.
