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
          text: "Sample task",
        },
      ],
    },
  ],
};

function createItemElement(columnId, item) {
  const itemElement = document.createElement("div");
  itemElement.className = "item";
  itemElement.dataset.itemId = item.id;
  itemElement.dataset.columnId = columnId;

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

  actionsElement.appendChild(editButton);
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
});

renderBoard();
