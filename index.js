const inputContainer = document.querySelector(".input__button");
const taskInput = document.querySelector(".main__input");
const addButton = document.querySelector(".add__todo__btn");

const todoList = document.querySelector(".input__list");
const doneTask = document.querySelector(".done__list");
const deleted = document.querySelector(".delete");

const filters = document.querySelector(".filters");
const filtersAll = document.querySelector(".filters_all");
const filtersActive = document.querySelector(".filters_active");
const filtersFinished = document.querySelector(".filters_finished");

let taskId = 0;
let todoItems = window.localStorage.getItem("todoItems");

todoItems = todoItems ? JSON.parse(todoItems) : [];

render();

filtersAll.innerHTML = `All(${todoItems.length})`;
filtersAll.addEventListener("click", allClick);

function allClick() {
  todoList.classList.remove("none");
  doneTask.children.length === 0
    ? doneTask.classList.add("none")
    : doneTask.classList.remove("none");
  filtersAll.classList.add("color");
  filtersActive.classList.remove("color");
  filtersFinished.classList.remove("color");
  todoList.children.length === 0
    ? todoList.classList.add("none")
    : todoList.classList.remove("none");
}

function filter() {
  const active = document.querySelector(".input__list");
  const done = document.querySelector(".done__list");

  allClick();

  if (todoItems.length === 0) {
    filters.classList.add("none");
    deleted.classList.add("none");
  } else {
    filters.classList.remove("none");
    filtersAll.classList.add("color");
    deleted.classList.remove("none");
  }
  if (doneTask.children.length === 0) {
    doneTask.classList.add("none");
  } else {
    doneTask.classList.remove("none");
  }

  if (todoList.children.length === 0) {
    todoList.classList.add("none");
  }

  filtersActive.innerHTML = `Active(${active.children.length})`;
  filtersActive.addEventListener("click", function () {
    todoList.classList.remove("none");
    doneTask.classList.add("none");
    filtersActive.classList.add("color");
    filtersFinished.classList.remove("color");
    filtersAll.classList.remove("color");
  });

  filtersFinished.innerHTML = `Finished(${done.children.length})`;
  filtersFinished.addEventListener("click", function () {
    doneTask.classList.remove("none");
    todoList.classList.add("none");
    filtersFinished.classList.add("color");
    filtersActive.classList.remove("color");
    filtersAll.classList.remove("color");
  });
}

function render() {
  todoList.innerHTML = "";
  doneTask.innerHTML = "";

  todoItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("todo_list");
    div.innerHTML = `
  <input class='input__check' type="checkbox" id="task-${index}" ${
      item.done ? "checked" : ""
    } data-index="${index}">
  <label class="input todo ${
    item.done ? "line-through" : ""
  }" for="task-${index}">${item.task}</label>
  <img src="./images/recycle-bin (1).png" alt="" class="cart_img" data-index="${index}">
`;
    if (item.done) {
      doneTask.appendChild(div);
    } else {
      todoList.prepend(div);
    }
  });

  allClick();

  addCheckboxChangeEvent();
  deleteTask();
  filter();
}

function addTodo(task) {
  task = task.trim();
  if (task !== "") {
    todoItems.push({ task, done: false });
    window.localStorage.setItem("todoItems", JSON.stringify(todoItems));
    render();
  }
}

function addTodoByEnter(event) {
  const task = taskInput.value.trim();
  if (task !== "" && event.key === "Enter") {
    addTodo(task);
    taskInput.value = "";
  }
}

function addCheckboxChangeEvent() {
  document.querySelectorAll(".input__check").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const index = this.getAttribute("data-index"); // Получаем индекс из data атрибута
      const isChecked = this.checked;

      todoItems[index].done = isChecked;
      window.localStorage.setItem("todoItems", JSON.stringify(todoItems));
      render();
    });
  });
}

function deleteTask() {
  const carts = document.querySelectorAll(".cart_img");

  carts.forEach((cart) => {
    cart.addEventListener(
      "click",
      function () {
        const index = this.dataset.index;
        todoItems.splice(index, 1);
        window.localStorage.setItem("todoItems", JSON.stringify(todoItems));
        render();
      },
      { once: true }
    );
  });
}

taskInput.addEventListener("keydown", addTodoByEnter);
addButton.addEventListener("click", () => addTodo(taskInput.value.trim()));

deleted.addEventListener("click", function () {
  window.localStorage.removeItem("todoItems");
  todoItems = [];
  render();
});
