const inputContainer = document.querySelector(".input__button");
const task = document.querySelector(".main__input");
const todoList = document.querySelector(".input__list");
const deleted = document.querySelector(".delete");

let taskId = 0;

task.addEventListener("keydown", addTodo);
deleted.addEventListener("click", deleteAll);

function addTodo(event) {
  if (event.key === "Enter") {
    taskId++;

    const taskHtml = `
    <div class="todo_list">
    <input class='input__check' type="checkbox" id="task-${taskId}">
  <label class='input todo' for="task-${taskId}">${task.value}</label>
  </div>
  `;
    todoList.innerHTML += taskHtml;
    task.value = "";
    const checkboxes = document.querySelectorAll(".input__check");
    const labels = document.querySelectorAll("label");

    checkboxes.forEach(function (checkbox, index) {
      checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
          labels[index].classList.add("line-through");
        } else {
          labels[index].classList.remove("line-through");
        }
      });
    });
  }
}

function deleteAll() {
  todoList.innerHTML = "";
}
