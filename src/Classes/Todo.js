import { v4 as uuid } from "uuid";
import { handleDate } from "../utils/utils";

class Todo {
  #date;
  constructor(title, task, dueto) {
    this.id = uuid();
    this.title = title;
    this.task = task;
    this.dueto = dueto;
    this.createdAt = new Date().valueOf();
    this.#date = handleDate(this.createdAt);
  }

  render() {
    const { weekDay, month, hour, min, day } = this.#date;
    const todo = document.createElement("div");
    todo.classList.add("todo");
    todo.id = this.id;
    //body
    const body = document.createElement("div");
    body.classList.add("todo-body");
    body.innerHTML = `
    <h3 class="todo-title">${this.title}</h3>
    <p class="todo-task">${this.task}</p>
    <p class="todo-created">Created on ${weekDay}, ${day} ${month} - ${hour}:${min}</p>
    `;
    //remove
    const remove = document.createElement("div");
    remove.addEventListener("click", this.handleRemove);
    remove.classList.add("todo-remove");
    remove.innerHTML = `<i class="fas fa-trash"></i>`;
    const edit = document.createElement("div");
    //edit
    edit.addEventListener("click", this.handleEdit);
    edit.classList.add("todo-edit");
    edit.innerHTML = `<i class="fas fa-pencil-alt"></i>`;

    //--
    todo.appendChild(body);
    todo.appendChild(edit);
    todo.appendChild(remove);
    return todo;
  }

  handleRemove = () => {
    TODOAPP.removeTodo(this.id);
  };

  handleEdit = () => {
    TODOAPP.editTodo(this.id);
  };
}

export default Todo;
