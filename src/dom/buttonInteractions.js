// <--- Add todo Button ---> //
import createTicket from "../components/createTicket";

const newTicket = new createTicket();

export default class DomFunctions {
  constructor() {
    this.elements = {
      addTodo: document.getElementById("add-todo-button"),
      submit: document.getElementById("submit"),
      toDoForm: document.getElementsByClassName("add-book-popup"),
    };
  }

  addTodo() {
    this.elements.addTodo?.addEventListener("click", () => {
      alert("added");
    });
  }

  // Submit a todo ticket
  addSubmit() {
    this.elements.submit?.addEventListener("click", () => {});
    const toDoInput = this.toDoForm;

    const title = toDoInput.querySelector("title").value.trim();
    const description = toDoInput.querySelector("title").value.trim();
    const priority = toDoInput.querySelector("priority");
    const date = toDoInput.querySelector("date");

    newTicket(title, description, priority, date);
  }
}
