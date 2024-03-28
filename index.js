const inputContainer = document.querySelector(".input__button");
const taskInput = document.querySelector(".main__input");

const todoList = document.querySelector(".input__list");
const deleted = document.querySelector(".delete");

let taskId = 0;
let todoItems = window.localStorage.getItem("todoItems");

todoItems = todoItems ? JSON.parse(todoItems) : [];

render();

function render() {
  console.log(todoItems);
  for (let i = 0; i < todoItems.length; i++) {
    // console.log(todoItems[i]);
    const taskHTML = `
  <div class = "todo_list">
  <input class='input__check' type="checkbox" id="task-${i}" ${
      todoItems[i].done ? "checked" : ""
    }>
  <label class='input todo ${
    todoItems[i].done ? "line-through" : ""
  }' for="task-${i}">${todoItems[i].task}</label>
  </div>
  `;
    todoList.innerHTML += taskHTML;
  }
  addCheckboxChangeEvent();
}

function addTodo(event) {
  const task = taskInput.value.trim();
  if (task !== "" && event.key === "Enter") {
    todoItems.push({ task, done: false });

    window.localStorage.setItem("todoItems", JSON.stringify(todoItems));

    todoList.innerHTML += `
    <div class = "todo_list">
    <input class='input__check' type="checkbox" id="task-${todoItems.length - 1}
    ">
    <label class='input todo' for="task-${todoItems.length - 1}">${
      todoItems[todoItems.length - 1].task
    }</label>
    </div>
    `;
    taskInput.value = "";
    addCheckboxChangeEvent();
  }
}

function addCheckboxChangeEvent() {
  let labels = document.querySelectorAll("label");
  document.querySelectorAll(".input__check").forEach((checkbox, index) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        labels[index].classList.add("line-through");
        todoItems[index].done = true;
      } else {
        labels[index].classList.remove("line-through");
        todoItems[index].done = false;
      }
      window.localStorage.setItem("todoItems", JSON.stringify(todoItems));
    });
  });
}
taskInput.addEventListener("keydown", addTodo);

deleted.addEventListener("click", function () {});
