import "./styles/styles.scss";
import TodoApp from "./Classes/TodoApp";
import $ from "jquery";
import "jquery-datetimepicker";
import "jquery-datetimepicker/jquery.datetimepicker.css";

//init datepicker
$("#todoDueto").datetimepicker();

const app = new TodoApp();

const addTodoForm = document.querySelector("#todo-form");

addTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let body = {};
  Object.keys(addTodoForm.elements).forEach((key) => {
    let element = addTodoForm.elements[key];
    if (element.type !== "submit") {
      body[element.name] = element.value;
      element.value = "";
    }
  });
  const hasAllFields = Object.values(body).every(
    (value) => value.trim() !== ""
  );
  if (hasAllFields) {
    app.addTodo(body.todoTitle, body.todoDesc, body.todoDueto);
  } else {
    alert("All fields required.");
  }
});

app.render();
