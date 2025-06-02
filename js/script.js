const elForm = document.getElementById("form");
const elTodos = document.getElementById("todos");

const addSound = new Audio("../sounds/brosok-odnoy-monetki-v-obschuyu-kuchu.mp3");
const statusSound = new Audio("../sounds/zvuk-odnoy-kapelki.mp3");
const deleteSound = new Audio("../sounds/zvuk-perelistyivaniya-stranitsyi.mp3");

let todos = JSON.parse(localStorage.getItem("todos")) || [
  { id: 1, title: "shlem olish", status: true },
  { id: 2, title: "shlem olish", status: true },
  { id: 3, title: "shlem olish", status: false },
];

elForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  addSound.play();

  const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  const newTodo = {
    title: e.target[0].value,
    id: newId,
    status: false,
  };
  addTodo(newTodo);
  e.target[0].value = "";
}

function uiUpdater(todos) {
  elTodos.innerHTML = "";
  localStorage.setItem("todos", JSON.stringify(todos));
  if (todos.length > 0) {
    todos.forEach(({ title, id, status }) => {
      const li = document.createElement("li");
      li.className = "card bg-base-100 shadow-md p-4 flex justify-between items-center";

      const h3 = document.createElement("h3");
      h3.className = "font-semibold";
      h3.textContent = title;

      const actionsDiv = document.createElement("div");
      actionsDiv.className = "flex gap-2 items-center";

      const removeButton = document.createElement("button");
      removeButton.className = "btn btn-error btn-sm";
      removeButton.textContent = "Delete";
      removeButton.addEventListener("click", () => {
        deleteTodo(id);
      });

      const statusInput = document.createElement("input");
      statusInput.type = "checkbox";
      statusInput.checked = status;
      statusInput.className = "checkbox checkbox-primary transition-none";
      statusInput.addEventListener("change", () => {
        statusChange(id);
      });

      actionsDiv.appendChild(statusInput);
      actionsDiv.appendChild(removeButton);

      li.appendChild(h3);
      li.appendChild(actionsDiv);
      elTodos.append(li);
    });
  } else {
    elTodos.innerHTML = `<h3 class="text-center text-lg text-gray-500">No data</h3>`;
  }
}

function addTodo(newTodo) {
  todos = [...todos, newTodo];
  uiUpdater(todos);
}

function deleteTodo(id) {
  deleteSound.currentTime = 0;
  deleteSound.play();

  todos = todos.filter((el) => el.id !== id);
  uiUpdater(todos);
}

function statusChange(id) {
  statusSound.currentTime = 0;
  statusSound.play();

  todos = todos.map((el) => {
    if (el.id === id) {
      return { ...el, status: !el.status };
    }
    return el;
  });
  uiUpdater(todos);
}

uiUpdater(todos);
