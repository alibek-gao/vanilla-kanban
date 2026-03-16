# Task 2: Render Columns from JS Data

In this step, we changed the board from static HTML into a JavaScript-rendered interface.

The page still looks almost the same, but now the content comes from a data structure in `script.js`.

## What changed

In `index.html`, we removed the hardcoded column markup and left only an empty board container:

- `<section id="board">...</section>`

That container now acts as the place where JavaScript inserts the board content.

In `script.js`, we added:

- a `state` object with a `columns` array
- one starter column
- one starter item inside that column
- a `renderBoard()` function
- helper functions to create column and item elements
- unique IDs generated with `crypto.randomUUID()`

## How rendering works

The render flow is simple:

1. Read the data from `state.columns`
2. Create DOM elements for each column
3. Create DOM elements for each item inside the column
4. Append everything to the board container

This is still plain vanilla JavaScript. No frameworks are used.

## Browser API used: `crypto.randomUUID()`

In this task, we used the browser `crypto` API:

```js
crypto.randomUUID();
```

This creates a unique string such as:

```txt
f47ac10b-58cc-4372-a567-0e02b2c3d479
```

We used it to give each column and each item its own stable ID.

That is useful because titles can change, but IDs stay the same. Later, when we edit, delete, or move items, we can target them safely by ID.

## What else the `crypto` API can do

The `crypto` API is larger than just `randomUUID()`. Some common uses are:

- `crypto.getRandomValues()` to generate secure random numbers
- `crypto.subtle.digest()` to create hashes such as SHA-256
- `crypto.subtle.encrypt()` and `crypto.subtle.decrypt()` for browser cryptography
- `crypto.subtle.sign()` and `crypto.subtle.verify()` for digital signatures
- `crypto.subtle.generateKey()` to create cryptographic keys

For this project, `randomUUID()` is the simplest and most useful part because we only need reliable unique identifiers.

## XSS safety note

This task renders user-facing text with `textContent`, not `innerHTML`.

That is important for safety.

Example:

```js
titleElement.textContent = column.title;
itemElement.textContent = item.text;
```

If a value contains something that looks like HTML, the browser will show it as text instead of executing it.

For example, this input:

```html
<img src=x onerror=alert(1)>
```

would be displayed as text when using `textContent`.

If we used `innerHTML` instead, the browser would parse it as markup, which can create XSS vulnerabilities.

Rule for this project:

- use `textContent` for user-entered text
- avoid `innerHTML` for untrusted content

## Why this step matters

This is the foundation for every next feature.

Once the board is driven by data, it becomes much easier to:

- add columns
- edit titles
- delete columns
- add and manage items
- support drag and drop

## Result

After Task 2, the kanban board is still working, but its UI is now generated from JavaScript state instead of hardcoded HTML.
