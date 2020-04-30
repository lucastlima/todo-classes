import Context from "./Context";

class TodoApp extends Context {
  constructor() {
    super();
    window.TODOAPP = this;
  }

  render() {
    const todosContainer = document.querySelector(".container");
    this.todos.forEach((todo) => todosContainer.appendChild(todo.render()));
  }
}

export default TodoApp;
