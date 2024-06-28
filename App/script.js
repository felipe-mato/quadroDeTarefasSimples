////////////////////// Construtor///////
const columnsTitles = document.querySelectorAll(".column__title");
const columns = document.querySelectorAll(".column__cards");
const cards = document.querySelectorAll(".card");
const delBtns = document.querySelectorAll(".delBtn");
const buttonContainers = document.querySelectorAll(".button-container");
let draggedCard;

///////////// Métodos ////////////////
const handleDragStart = (e) => {
  draggedCard = e.target;
  e.dataTransfer.effectAllowed = "move";
};

const handleDeleteDrop = ({ target }) => {
  if (target.classList.contains("delBtn")) {
    draggedCard.remove();
    target.classList.remove("delBtn__highlight");
  }
}

const handleDragOver = (e) => {
  e.preventDefault();
};

const handleDragEnterDlt = ({ target }) => {
  if (target.classList.contains("delBtn")) {
    target.classList.add("delBtn__highlight");
  }
}

const handleDragLeaveDlt = ({ target }) => {
  target.classList.remove("delBtn__highlight");
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

const criaCard1 = () => {
  createCard1(columns[0]);
}

const createCard1 = (column) => {
  column = columns[0]

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

  column.append(card);
  card.focus();
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
  console.log(target);
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

delBtns.forEach((btn) => {
  btn.addEventListener("drop", handleDeleteDrop);
  btn.addEventListener("dragenter", handleDragEnterDlt);
  btn.addEventListener("dragleave",handleDragLeaveDlt)
});


