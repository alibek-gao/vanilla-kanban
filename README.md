# Vanilla JS Kanban

A minimal kanban board built with:

- HTML
- CSS
- vanilla JavaScript

This project was built as an exercise to revise and practice drag-and-drop in vanilla JavaScript.

It was developed step by step, with each task leaving the app in a working state.

## Features

- add column
- edit column
- delete column
- add item in each column
- edit item
- delete item
- drag and drop sorting inside a column
- drag and drop moving between columns

## Project Files

- `index.html` - page structure
- `styles.css` - board styling
- `script.js` - app logic
- `tasks/` - tutorial-style notes for each build step

## How to Run

This project does not need a build tool or dependencies.

Open [`index.html`](/Users/alibek/Developer/Archive/index.html) in a browser.

## Task-by-Task Tutorial

The `tasks` folder contains one markdown file per step:

- `01-scaffold-the-page.md`
- `02-render-columns-from-js-data.md`
- `03-add-new-column.md`
- `04-edit-column-title.md`
- `05-delete-column.md`
- `06-add-items-inside-column.md`
- `07-edit-item.md`
- `08-delete-item.md`
- `09-drag-and-drop-inside-column.md`
- `10-drag-and-drop-between-columns.md`
- `11-polish-minimal-ux.md`
- `12-final-cleanup.md`

These notes explain:

- what was built
- how it works
- which browser APIs were used
- XSS and safety notes where relevant

## Notes

- item order is stored by array position, not a separate `order` field
- drag and drop uses the native browser HTML Drag and Drop API
- `cursor: grabbing` is not reliable during the active drag because native browser drag behavior controls the cursor

## Goal

The goal of this project is to practice native browser drag-and-drop while building a small but complete kanban app in plain JavaScript without frameworks.
