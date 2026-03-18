const boardElement = document.querySelector("#board");
const addColumnButton = document.querySelector("#add-column-button");

const state = {
  columns: [
    {
      id: crypto.randomUUID(),
      title: "To Do",
      items: [
        {
          id: crypto.randomUUID(),
          text: "Sample task 1",
        },
        {
          id: crypto.randomUUID(),
          text: "Sample task 2",
        },
        {
          id: crypto.randomUUID(),
          text: "Sample task 3",
        },
      ],
    },
  ],
};

const dragState = {
  itemId: null,
  sourceColumnId: null,
};

function createItemElement(columnId, item) {
  const itemElement = document.createElement("div");
  itemElement.className = "item";
  itemElement.dataset.itemId = item.id;
  itemElement.dataset.columnId = columnId;
  itemElement.draggable = true;

  const contentElement = document.createElement("div");
  contentElement.className = "item__content";

  const textElement = document.createElement("div");
  textElement.className = "item__text";
  textElement.textContent = item.text;

  const actionsElement = document.createElement("div");
  actionsElement.className = "item__actions";

  const editButton = document.createElement("button");
  editButton.className = "button button--small";
  editButton.type = "button";
  editButton.textContent = "Edit";
  editButton.dataset.action = "edit-item";
  editButton.dataset.columnId = columnId;
  editButton.dataset.itemId = item.id;

  const deleteButton = document.createElement("button");
  deleteButton.className = "button button--small button--danger";
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.dataset.action = "delete-item";
  deleteButton.dataset.columnId = columnId;
  deleteButton.dataset.itemId = item.id;

  actionsElement.appendChild(editButton);
  actionsElement.appendChild(deleteButton);
  contentElement.appendChild(textElement);
  contentElement.appendChild(actionsElement);
  itemElement.appendChild(contentElement);

  return itemElement;
}

function createColumnElement(column) {
  const columnElement = document.createElement("article");
  columnElement.className = "column";
  columnElement.dataset.columnId = column.id;

  const headerElement = document.createElement("div");
  headerElement.className = "column__header";

  const titleElement = document.createElement("h2");
  titleElement.textContent = column.title;

  const actionsElement = document.createElement("div");
  actionsElement.className = "column__actions";

  const editButton = document.createElement("button");
  editButton.className = "button button--small";
  editButton.type = "button";
  editButton.textContent = "Edit";
  editButton.dataset.action = "edit-column";
  editButton.dataset.columnId = column.id;

  const deleteButton = document.createElement("button");
  deleteButton.className = "button button--small button--danger";
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.dataset.action = "delete-column";
  deleteButton.dataset.columnId = column.id;

  const itemsElement = document.createElement("div");
  itemsElement.className = "column__items";

  column.items.forEach((item) => {
    itemsElement.appendChild(createItemElement(column.id, item));
  });

  const footerElement = document.createElement("div");
  footerElement.className = "column__footer";

  const addItemButton = document.createElement("button");
  addItemButton.className = "button button--small";
  addItemButton.type = "button";
  addItemButton.textContent = "Add Item";
  addItemButton.dataset.action = "add-item";
  addItemButton.dataset.columnId = column.id;

  headerElement.appendChild(titleElement);
  actionsElement.appendChild(editButton);
  actionsElement.appendChild(deleteButton);
  headerElement.appendChild(actionsElement);
  footerElement.appendChild(addItemButton);
  columnElement.appendChild(headerElement);
  columnElement.appendChild(itemsElement);
  columnElement.appendChild(footerElement);

  return columnElement;
}

function renderBoard() {
  boardElement.innerHTML = "";

  state.columns.forEach((column) => {
    boardElement.appendChild(createColumnElement(column));
  });
}

function addColumn() {
  const title = window.prompt("Enter column title:", "New Column");

  if (title === null) {
    return;
  }

  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    return;
  }

  state.columns.push({
    id: crypto.randomUUID(),
    title: trimmedTitle,
    items: [],
  });

  renderBoard();
}

function editColumn(columnId) {
  const column = state.columns.find((entry) => entry.id === columnId);

  if (!column) {
    return;
  }

  const nextTitle = window.prompt("Edit column title:", column.title);

  if (nextTitle === null) {
    return;
  }

  const trimmedTitle = nextTitle.trim();

  if (!trimmedTitle) {
    return;
  }

  column.title = trimmedTitle;
  renderBoard();
}

function deleteColumn(columnId) {
  const column = state.columns.find((entry) => entry.id === columnId);

  if (!column) {
    return;
  }

  const confirmed = window.confirm(`Delete "${column.title}" column?`);

  if (!confirmed) {
    return;
  }

  state.columns = state.columns.filter((entry) => entry.id !== columnId);
  renderBoard();
}

function addItem(columnId) {
  const column = state.columns.find((entry) => entry.id === columnId);

  if (!column) {
    return;
  }

  const text = window.prompt("Enter item text:", "New task");

  if (text === null) {
    return;
  }

  const trimmedText = text.trim();

  if (!trimmedText) {
    return;
  }

  column.items.push({
    id: crypto.randomUUID(),
    text: trimmedText,
  });

  renderBoard();
}

function editItem(columnId, itemId) {
  const column = state.columns.find((entry) => entry.id === columnId);

  if (!column) {
    return;
  }

  const item = column.items.find((entry) => entry.id === itemId);

  if (!item) {
    return;
  }

  const nextText = window.prompt("Edit item text:", item.text);

  if (nextText === null) {
    return;
  }

  const trimmedText = nextText.trim();

  if (!trimmedText) {
    return;
  }

  item.text = trimmedText;
  renderBoard();
}

function deleteItem(columnId, itemId) {
  const column = state.columns.find((entry) => entry.id === columnId);

  if (!column) {
    return;
  }

  const item = column.items.find((entry) => entry.id === itemId);

  if (!item) {
    return;
  }

  const confirmed = window.confirm(`Delete "${item.text}" item?`);

  if (!confirmed) {
    return;
  }

  column.items = column.items.filter((entry) => entry.id !== itemId);
  renderBoard();
}

function reorderItemsInColumn(columnId, draggedItemId, targetItemId, position) {
  const column = state.columns.find((entry) => entry.id === columnId);

  if (!column) {
    return;
  }

  const sourceIndex = column.items.findIndex((entry) => entry.id === draggedItemId);

  if (sourceIndex === -1) {
    return;
  }

  const [movedItem] = column.items.splice(sourceIndex, 1);

  if (!targetItemId || position === "end") {
    column.items.push(movedItem);
    renderBoard();
    return;
  }

  const targetIndex = column.items.findIndex((entry) => entry.id === targetItemId);

  if (targetIndex === -1) {
    column.items.push(movedItem);
    renderBoard();
    return;
  }

  const insertIndex = position === "before" ? targetIndex : targetIndex + 1;
  column.items.splice(insertIndex, 0, movedItem);
  renderBoard();
}

function clearDragStyles() {
  document.querySelectorAll(".item--dragging").forEach((element) => {
    element.classList.remove("item--dragging");
  });

  document.querySelectorAll(".column__items--drag-over").forEach((element) => {
    element.classList.remove("column__items--drag-over");
  });
}

addColumnButton.addEventListener("click", addColumn);
boardElement.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  const actionButton = target.closest("button[data-action]");

  if (!(actionButton instanceof HTMLButtonElement)) {
    return;
  }

  if (actionButton.dataset.action === "edit-column") {
    editColumn(actionButton.dataset.columnId);
  }

  if (actionButton.dataset.action === "delete-column") {
    deleteColumn(actionButton.dataset.columnId);
  }

  if (actionButton.dataset.action === "add-item") {
    addItem(actionButton.dataset.columnId);
  }

  if (actionButton.dataset.action === "edit-item") {
    editItem(actionButton.dataset.columnId, actionButton.dataset.itemId);
  }

  if (actionButton.dataset.action === "delete-item") {
    deleteItem(actionButton.dataset.columnId, actionButton.dataset.itemId);
  }
});

boardElement.addEventListener("dragstart", (event) => {
  const target = event.target;

  // Ignore drag events that did not start from an HTML element.
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const itemElement = target.closest(".item");

  // Ignore drags that did not start from one of our kanban items.
  if (!(itemElement instanceof HTMLElement)) {
    return;
  }

  // Track which item started the drag so later events can move it in state.
  dragState.itemId = itemElement.dataset.itemId;
  dragState.sourceColumnId = itemElement.dataset.columnId;
  itemElement.classList.add("item--dragging");

  if (event.dataTransfer) {
    // Hint to the browser that this interaction is a move, not a copy.
    event.dataTransfer.effectAllowed = "move";
    // Store the dragged item ID in the native drag payload as plain text.
    event.dataTransfer.setData("text/plain", itemElement.dataset.itemId || "");
  }
});

boardElement.addEventListener("dragover", (event) => {
  const target = event.target;

  // Ignore drag-over events from non-HTML targets.
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const itemsContainer = target.closest(".column__items");

  // Ignore drag-over events outside a column's item list.
  if (!(itemsContainer instanceof HTMLElement)) {
    return;
  }

  const columnElement = itemsContainer.closest(".column");

  // Stop if we cannot resolve which column owns this item list.
  if (!(columnElement instanceof HTMLElement)) {
    return;
  }

  // Task 9 only supports reordering inside the source column.
  if (!dragState.sourceColumnId || dragState.sourceColumnId !== columnElement.dataset.columnId) {
    return;
  }

  // preventDefault() is required or the browser will reject the drop.
  event.preventDefault();
  clearDragStyles();
  itemsContainer.classList.add("column__items--drag-over");
});

boardElement.addEventListener("drop", (event) => {
  const target = event.target;

  // Ignore drop events from non-HTML targets.
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const itemsContainer = target.closest(".column__items");

  // Ignore drops that happen outside a column's item list.
  if (!(itemsContainer instanceof HTMLElement)) {
    return;
  }

  const columnElement = itemsContainer.closest(".column");

  // Stop if we cannot resolve which column received the drop.
  if (!(columnElement instanceof HTMLElement)) {
    return;
  }

  const targetColumnId = columnElement.dataset.columnId;

  // Task 9 rejects drops unless we are dragging an item inside its source column.
  if (!dragState.itemId || !dragState.sourceColumnId || dragState.sourceColumnId !== targetColumnId) {
    clearDragStyles();
    return;
  }

  // Allow the current drop target to accept the dragged item.
  event.preventDefault();

  const targetItemElement = target.closest(".item");

  // If the drop is on empty list space, move the item to the end.
  if (!(targetItemElement instanceof HTMLElement)) {
    reorderItemsInColumn(targetColumnId, dragState.itemId, null, "end");
    dragState.itemId = null;
    dragState.sourceColumnId = null;
    clearDragStyles();
    return;
  }

  const targetItemId = targetItemElement.dataset.itemId;

  // Dropping onto the same item means there is nothing to reorder.
  if (targetItemId === dragState.itemId) {
    dragState.itemId = null;
    dragState.sourceColumnId = null;
    clearDragStyles();
    return;
  }

  const rect = targetItemElement.getBoundingClientRect();
  const middleY = rect.top + rect.height / 2;
  // Compare the cursor to the card midpoint to place before or after it.
  const position = event.clientY < middleY ? "before" : "after";

  reorderItemsInColumn(targetColumnId, dragState.itemId, targetItemId, position);
  dragState.itemId = null;
  dragState.sourceColumnId = null;
  clearDragStyles();
});

boardElement.addEventListener("dragend", () => {
  // Always clean up temporary drag state, even if the drop was cancelled.
  dragState.itemId = null;
  dragState.sourceColumnId = null;
  clearDragStyles();
});

renderBoard();
