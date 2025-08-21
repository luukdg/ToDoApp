// <--- Add todo Button ---> //

export default class DomFunctions {
  constructor() {
    this.elements = {
      addTodo: document.getElementById("add-todo-button"),
      submit: document.getElementById("submit"),
    };
  }

  addTodo() {
    this.elements.addTodo?.addEventListener("click", () => {
      alert("added");
    });
  }

  addSubmit() {
    this.elements.submit?.addEventListener("click", () => {
      alert("added");
    });
  }
}
