//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
//const filterOption = document.querySelector(".filter-todo");

//event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
//filterOption.addEventListener("click", filterTodo);

//functions
function addTodo(event) {
  //prevent reload submition
  event.preventDefault();

  //create a div with class todo
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create a li with class todo-item
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");

  //append li into the div
  todoDiv.appendChild(newTodo);
  //add todo to local storage
  saveLocalTodos(todoInput.value);
  //create complete button icon with class complete-btn
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"> </i>';

  //append check button into div
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //create delete button icon with class complete-btn
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"> </i>';

  //append delete button into div
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);

  todoList.appendChild(todoDiv);

  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  console.log(item);
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("done");
  }
}

/*function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("done")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("done")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}*/

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create a li with class todo-item
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");

    //append li into the div
    todoDiv.appendChild(newTodo);
    //create complete button icon with class complete-btn
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"> </i>';

    //append check button into div
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //create delete button icon with class complete-btn
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"> </i>';

    //append delete button into div
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
