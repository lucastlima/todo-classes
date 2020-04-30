import Todo from "./Todo";
import TodoDOM from "./TodoDOM";

class Context {
  #todos;
  constructor() {
    if ("todoAppClasses" in localStorage) {
      const todosObj = JSON.parse(localStorage.getItem("todoAppClasses"));
      const convertedTodos = todosObj.map((obj) =>
        Object.assign(new Todo(), obj)
      );
      this.#todos = convertedTodos;
    } else {
      this.#todos = [
        new Todo("My first To-Do!", `Add more To-Dos to the list! 😜`),
      ];
    }
  }

  get todos() {
    return this.#todos;
  }

  removeTodo(id) {
    this.#todos = this.#todos.filter((todo) => todo.id !== id);
    TodoDOM.clean(".container");
    this.render();
    localStorage.setItem("todoAppClasses", JSON.stringify(this.#todos));
  }

  addTodo(title, task, dueto) {
    this.#todos.push(new Todo(title, task, dueto));
    TodoDOM.clean(".container");
    this.render();
    localStorage.setItem("todoAppClasses", JSON.stringify(this.#todos));
  }

  editTodo(id) {
    const currentTodoEl = document.getElementById(id);
    const bodyDiv = currentTodoEl.childNodes[0];
    const editBtn = currentTodoEl.childNodes[1];
    const task = bodyDiv.querySelector(".todo-task");
    const title = bodyDiv.querySelector(".todo-title");
    //create temp elements
    const confirmBtn = document.createElement("div");
    const titleEditing = document.createElement("input");
    const taskEditing = document.createElement("textarea");

    const confirmChanges = () => {
      const newTitleValue = titleEditing.value;
      const newTaskValue = taskEditing.value;
      const currentTodo = this.#todos.find((todo) => todo.id === id);
      currentTodo.title = newTitleValue;
      currentTodo.task = newTaskValue;
      title.innerText = newTitleValue;
      task.innerText = newTaskValue;
      bodyDiv.replaceChild(title, titleEditing);
      bodyDiv.replaceChild(task, taskEditing);
      currentTodoEl.replaceChild(editBtn, confirmBtn);
      localStorage.setItem("todoAppClasses", JSON.stringify(this.#todos));
    };

    //confirm btn
    confirmBtn.innerHTML = `<i class="fas fa-check"></i>`;
    confirmBtn.classList.add("todo-confirm");
    confirmBtn.addEventListener("click", confirmChanges);
    //tile
    titleEditing.classList.add("todo-editing-title");
    titleEditing.value = title.innerText;
    //task
    taskEditing.classList.add("todo-editing-task");
    taskEditing.value = task.innerText;
    //replace
    bodyDiv.replaceChild(titleEditing, title);
    bodyDiv.replaceChild(taskEditing, task);
    currentTodoEl.replaceChild(confirmBtn, editBtn);
    titleEditing.focus();
  }
}

export default Context;
