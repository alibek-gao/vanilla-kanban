# Task 6: Add Items Inside a Column

In this step, we added the ability to create task cards inside each column.

This is the first feature that makes the columns useful as actual kanban lists.

## What changed

In `script.js`, each column now renders an `Add Item` button at the bottom.

We also added:

- an `addItem()` function
- logic to find the correct column by ID
- creation of a new item object with an `id` and `text`
- a re-render after the new item is added

In `styles.css`, we added a small footer area for the new button and spacing under the item list.

## How it works

When the user clicks `Add Item` inside a column:

1. We find the nearest clicked action button with `closest()`
2. We read the column ID from the button dataset
3. We find the matching column in `state.columns`
4. We open a `prompt()` for the task text
5. If the user cancels, nothing happens
6. If the text is empty, nothing happens
7. We push a new item object into that column's `items` array
8. We call `renderBoard()` again

Each new item gets:

- a unique `id`
- a plain text label

## Browser APIs used: `window.prompt()` and `closest()`

In this task, we use:

```js
window.prompt("Enter item text:", "New task");
```

This lets us gather short text from the user without building a custom form yet.

We also use:

```js
target.closest("button[data-action]");
```

This keeps the click handling reliable even when the clicked part is nested inside the button.

## What else can be done with these APIs

`window.prompt()` is useful for:

- quick prototypes
- simple rename flows
- tiny admin tools

`closest()` is useful for:

- finding a parent card from a child button
- locating a parent column element
- keeping event delegation code small

## XSS safety note

The item text comes from user input, so it is important that we render it safely.

In this project, item text is inserted with `textContent`:

```js
itemElement.textContent = item.text;
```

That means HTML-like input is shown as plain text instead of being parsed as markup.

## Why this step matters

Now each column can actually hold work items.

That makes the board feel much closer to a real kanban app and sets up the next item features:

- edit item
- delete item
- drag and drop

## Result

After Task 6, every column has an `Add Item` button and can store multiple task cards.
