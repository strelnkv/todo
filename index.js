const inputContainer = document.querySelector(".input__button");
const taskInput = document.querySelector(".main__input");
const addButton = document.querySelector(".add__todo__btn");

const todoList = document.querySelector(".input__list");
const deleted = document.querySelector(".delete");

let taskId = 0;
let todoItems = window.localStorage.getItem("todoItems");

todoItems = todoItems ? JSON.parse(todoItems) : [];

render();

function render() {
  todoList.innerHTML = "";
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
  <img
    src="./images/recycle-bin (1).png"
    alt=""
    class="cart_img task-${i}"

  />
  </div>
  `;
    todoList.innerHTML += taskHTML;
  }
  addCheckboxChangeEvent();
  deleteTask();
}
function addTodo(task) {
  todoItems.push({ task, done: false });
  task = task.trim();
  if (task !== "") {
    window.localStorage.setItem("todoItems", JSON.stringify(todoItems));

    todoList.innerHTML += `
    <div class = "todo_list">
    <input class='input__check' type="checkbox" id="task-${todoItems.length - 1}
    ">
    <label class='input todo' for="task-${todoItems.length - 1}">${
      todoItems[todoItems.length - 1].task
    }</label>
    <img
    src="./images/recycle-bin (1).png"
    alt=""
    class="cart_img task-${todoItems.length - 1}"

  />
    </div>
    `;
    taskInput.value = "";
    addCheckboxChangeEvent();
    deleteTask();
  }
}

function addTodoByEnter(event) {
  const task = taskInput.value.trim();
  if (task !== "" && event.key === "Enter") {
    addTodo(task);
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

function deleteTask() {
  const carts = document.querySelectorAll(".cart_img");
  carts.forEach((cart) => {
    cart.addEventListener("click", function (evt) {
      const taskId = evt.target.className.split(" ")[1];
      const index = taskId.split("-")[1];
      todoItems.splice(index, 1);
      window.localStorage.setItem("todoItems", JSON.stringify(todoItems));
      render();
    });
  });
}

taskInput.addEventListener("keydown", addTodoByEnter);
addButton.addEventListener("click", () => addTodo(taskInput.value.trim()));

deleted.addEventListener("click", function () {
  window.localStorage.removeItem("todoItems");
  todoList.innerHTML = "";
});
