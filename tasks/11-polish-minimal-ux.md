# Task 11: Polish Minimal UX

In this step, we improved the feel of the kanban board without changing its core functionality.

The goal was to keep the app minimal while making drag and drop clearer and easier to use.

## What changed

In `styles.css`, we added:

- a minimum height for each item list
- a visible empty-state drop area
- a stronger drag-over highlight
- a grabbing cursor while dragging
- small transitions for a smoother feel

In `script.js`, we updated the drag-over and cleanup logic so empty columns get a clearer visual state during dragging.

## How it improves the experience

Before this step:

- empty columns could feel like they had no real drop target
- drag-over feedback was more subtle
- the dragged card had less visual distinction

After this step:

- empty columns display a `"Drop items here"` hint
- the current drop zone becomes more obvious
- empty drop zones get a stronger active state

These are small changes, but they make the interface easier to understand at a glance.

## Browser and CSS features used

This task mostly improves the UI with CSS rather than new JavaScript APIs.

Useful CSS features in this step include:

- the `:empty` pseudo-class to detect empty item lists
- the `::before` pseudo-element to show a placeholder label
- `transition` for smoother visual changes
- `cursor` values like `grab`

### `:empty`

The `:empty` selector matches an element that has no child nodes.

In this project, we use it like this:

```css
.column__items:empty::before {
  content: "Drop items here";
}
```

That means the placeholder only appears when the column has no items.

### `::before`

The `::before` pseudo-element lets CSS create a visual element before the real content of an element.

Here, it is useful because we can show an empty-state hint without adding extra HTML in JavaScript.

## Important note about `cursor: grabbing`

In the current implementation, we use the browser's native HTML drag-and-drop system:

- `draggable = true`
- `dragstart`
- `dragover`
- `drop`
- `dragend`

With this native approach, browsers and operating systems often take control of the mouse cursor during the drag operation.

That means a CSS rule like:

```css
cursor: grabbing;
```

may not actually appear while the drag is active, even if the class is applied correctly.

So in this project:

- `cursor: grab` can work before dragging starts
- `cursor: grabbing` is not reliable during the active native drag session

This is a limitation of the native drag-and-drop approach, not a logic error in the kanban code.

If full cursor control is required, the drag interaction usually needs to be rebuilt with custom pointer events such as:

- `pointerdown`
- `pointermove`
- `pointerup`

## XSS safety note

This step only changes visual feedback and empty-state presentation.

It does not add any new user-input rendering logic.

So the XSS situation stays the same:

- user text is still rendered with `textContent`
- no untrusted HTML is inserted into the page

## Why this step matters

Minimal apps feel much better when the interface clearly communicates what is possible.

This step helps users understand:

- where they can drop items
- when a list is active
- what happens during dragging

## Result

After Task 11, the board still behaves the same, but drag and drop feels clearer and empty columns are easier to use.
