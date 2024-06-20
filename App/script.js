////////////////////// Construtor///////
const columnsTitles = document.querySelectorAll(".column__title");
const columns = document.querySelectorAll(".column__cards");
const cards = document.querySelectorAll(".card");
let draggedCard;

///////////// Métodos ////////////////
const handleDragStart = (e) => {
  draggedCard = e.target;
  e.dataTransfer.effectAllowed = "move";
};

const handleDragOver = (e) => {
  e.preventDefault();
};

const handleDragEnter = ({ target }) => {
  if (target.classList.contains("column__cards")) {
    target.classList.add("column__highlight");
  }
};

const handleDragLeave = ({ target }) => {
  target.classList.remove("column__highlight");
};

const handleDragDrop = ({ target }) => {
  if (target.classList.contains("column__cards")) {
    target.classList.remove("column__highlight");
    target.append(draggedCard);
  }
};

const handleKeyPress = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    e.target.blur();
  }
};

const createCard = ({ target }) => {
  if (!target.classList.contains("column__cards")) return;

  const card = document.createElement("input");
  const placeholder = document.createElement("div");

  card.className = "card";
  card.draggable = "true";
  card.contentEditable = "true";
  card.placeholder = "Nova tarefa...";
  placeholder.textContent = "Nova tarefa...";

  card.appendChild(placeholder);

  card.addEventListener("focus", () => {
    placeholder.style.display = "none";
  });

  card.addEventListener("focusout", () => {
    if (!card.textContent.trim()) {
      card.remove();
    } else {
      placeholder.style.display = card.textContent.trim() ? "none" : "block";
    }
    card.contentEditable = "false";
  });

  card.addEventListener("keypress", handleKeyPress);
  card.addEventListener("dblclick", () => editCard(card));
  card.addEventListener("dragstart", handleDragStart);

  target.append(card);
  card.focus();
};

const editCard = (card) => {
  const placeholder = card.querySelector(".placeholder");

  card.contentEditable = "true";
  card.focus();
  if (placeholder) placeholder.style.display = "none";

  card.addEventListener("focusout", () => {
    if (!card.textContent.trim()) {
      card.remove();
    } else {
      if (placeholder) placeholder.style.display = card.textContent.trim() ? "none" : "block";
    }
    card.contentEditable = "false";
  });
};

const editTitle = ({ target }) => {
  const title = target;

  target.contentEditable = "true";
  target.focus();
  target.addEventListener("focusout", () => {
    target.contentEditable = "false";
    if (!title.textContent.trim()) {
      title.textContent = "...";
    }
  });
};

/////////////////////////// Instâncias ///////////////

columns.forEach((column) => {
  column.addEventListener("dragover", handleDragOver);
  column.addEventListener("dragenter", handleDragEnter);
  column.addEventListener("dragleave", handleDragLeave);
  column.addEventListener("drop", handleDragDrop);
  column.addEventListener("dblclick", createCard);
});

cards.forEach((card) => {
  card.addEventListener("dragstart", handleDragStart);
  card.addEventListener("keypress", handleKeyPress);
  card.addEventListener("dblclick", () => editCard(card));
});

columnsTitles.forEach((title) => {
  title.addEventListener("dblclick", editTitle);
});
