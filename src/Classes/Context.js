import Todo from "./Todo";
import TodoDOM from "./TodoDOM";

class Context {
  #todos;
  constructor() {
    this.#todos = [];
  }

  get todos() {
    return this.#todos;
  }

  removeTodo(id) {
    this.#todos = this.#todos.filter((todo) => todo.id !== id);
    TodoDOM.clean(".container");
    this.render();
  }

  addTodo(title, task, dueto) {
    this.#todos.push(new Todo(title, task, dueto));
    TodoDOM.clean(".container");
    this.render();
  }
}

export default Context;
