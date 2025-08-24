// <--- Add todo Button ---> //
import createTicket from "../components/createTicket";
import { allTickets } from "../index.js";
import popUpWindow from "./popUpWindow.js";
import addTicketToDom from "./addTicketToDom.js";
import sortArray from "../components/sortArray.js";
import changeTicket from "../components/changeTicket.js";

export default class DomFunctions {
  constructor() {
    this.elements = {
      addTodo: document.getElementById("add-todo-button"),
      submit: document.getElementById("submit"),
      toDoForm: document.getElementsByClassName("add-book-popup"),
      close: document.getElementById("cancel"),
      delete: document.querySelector(".deleteButton"),
      content: document.querySelector(".content"),
    };
  }

  // Add todo button
  addTodoButton() {
    this.elements.addTodo?.addEventListener("click", () => {
      const popup = new popUpWindow();
      popup.open();
      console.log("open");
    });
  }

  closeButton() {
    this.elements.close?.addEventListener("click", () => {
      const popup = new popUpWindow();
      popup.close();
      console.log("close");
    });
  }

  // Submit a todo ticket
  addSubmit() {
    this.elements.submit?.addEventListener("click", (e) => {
      e.preventDefault();

      // Query selector of the form
      const form = document.querySelector(".add-book-popup");
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Separating the data in different variables
      const title = data.title;
      const description = data.description;
      const priority = data.priority;
      const date = data.date;

      // Creating an object
      const ticket = new createTicket(title, description, date, priority);

      // Pushing the object into the general array
      allTickets.add(ticket);
      console.log(allTickets);

      // Sort the tickets by date
      const sorter = new sortArray();
      sorter.sortByDate();

      // Add to the dom
      const loopOverTickets = new addTicketToDom();
      loopOverTickets.updateDom();

      // Closing the popup
      const popup = new popUpWindow();
      popup.close();

      // Removing old form data
      form.reset();
    });
  }

  changeInDom() {
    this.elements.content?.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-button")) {
        const toDoTicket = e.target.closest(".ticket-wrapper");
        if (toDoTicket) {
          const objectID = toDoTicket.id;

          // Remove from Array
          const change = new changeTicket();
          change.removeTicket(allTickets, objectID);

          // Remove from DOM
          toDoTicket.remove();
        }
      }
    });
  }

  changeInCheckbox() {
    this.elements.content?.addEventListener("change", (e) => {
      // Find the right ticket in the DOM
      if (e.target.id === "checkbox") {
        const toDoTicket = e.target.closest(".ticket-wrapper");
        if (toDoTicket) {
          const objectID = toDoTicket.id;

          // Change the status in the object
          const change = new changeTicket();
          change.changePriority(allTickets, objectID);

          if (!toDoTicket.style.textDecoration) {
            toDoTicket.style.textDecoration = "line-through";
          } else {
            toDoTicket.style.textDecoration = "";
          }
        }
      }
    });
  }
}
