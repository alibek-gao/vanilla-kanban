const boardElement = document.querySelector("#board");

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

function createItemElement(item) {
  const itemElement = document.createElement("div");
  itemElement.className = "item";
  itemElement.textContent = item.text;
  itemElement.dataset.itemId = item.id;

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

  const itemsElement = document.createElement("div");
  itemsElement.className = "column__items";

  column.items.forEach((item) => {
    itemsElement.appendChild(createItemElement(item));
  });

  headerElement.appendChild(titleElement);
  columnElement.appendChild(headerElement);
  columnElement.appendChild(itemsElement);

  return columnElement;
}

function renderBoard() {
  boardElement.innerHTML = "";

  state.columns.forEach((column) => {
    boardElement.appendChild(createColumnElement(column));
  });
}

renderBoard();
