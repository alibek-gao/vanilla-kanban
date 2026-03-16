# Task 3: Add New Column

In this step, we added the ability to create new columns on the board.

This is the first feature that changes the board state based on user input.

## What changed

In `index.html`, we added a board-level button:

- `Add Column`

This button sits above the board and is used to create a new column.

In `styles.css`, we added simple button styles so the new control matches the board.

In `script.js`, we added:

- a reference to the add-column button
- an `addColumn()` function
- a click event listener

## How it works

When the user clicks the button:

1. A `prompt()` asks for the column title
2. If the user cancels, nothing happens
3. If the title is empty, nothing happens
4. A new column object is pushed into `state.columns`
5. `renderBoard()` runs again to show the updated board

The new column starts with:

- a unique `id`
- the title entered by the user
- an empty `items` array

## Browser API used: `window.prompt()`

In this task, we used:

```js
window.prompt("Enter column title:", "New Column");
```

This opens a built-in browser dialog and returns:

- the entered text if the user confirms
- `null` if the user cancels

We used `prompt()` because it is the fastest way to add minimal editing input without building a custom form yet.

## Is `window.prompt()` XSS-safe?

`window.prompt()` only collects text input. It does not automatically make the app safe or unsafe.

The important part is what we do with the returned string.

In this project, the value stays safe because we render titles using `textContent`:

```js
titleElement.textContent = column.title;
```

That means even if a user enters HTML-like text, it will be shown as plain text.

Example input:

```html
<img src=x onerror=alert(1)>
```

With `textContent`, this is displayed as text.

With `innerHTML`, it would be interpreted as markup and could create an XSS problem.

So the safe pattern is:

- collect input with `prompt()`
- store it as plain text
- render it with `textContent`

## What else can be done with browser dialog APIs

The browser also provides a few related dialog methods:

- `window.alert()` to show a message
- `window.confirm()` to ask for a yes/no decision
- `window.prompt()` to collect a short text value

These are useful for quick prototypes and small demos.

For more polished apps, developers usually replace them with custom modal windows or inline form controls.

## Why this step matters

Now the board is no longer fixed.

The user can create columns dynamically, which means the board structure is becoming truly interactive.

## Result

After Task 3, the user can click `Add Column`, enter a title, and immediately see a new column appear on the board.
