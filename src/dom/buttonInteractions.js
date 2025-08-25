// <--- Add todo Button ---> //
import createTicket from "../components/createTicket";
import { allTickets } from "../index.js";
import popUpWindow from "./popUpWindow.js";
import addTicketToDom from "./addTicketToDom.js";
import SortArray from "../components/sortArray.js";
import changeTicket from "../components/changeTicket.js";
import { format } from "date-fns";
import { setFilter, userTracker } from "./userTracker.js";

export default class DomFunctions {
  constructor() {
    this.elements = {
      addTodo: document.getElementById("add-todo-button"),
      submit: document.getElementById("submit"),
      toDoForm: document.getElementsByClassName("add-book-popup"),
      close: document.getElementById("cancel"),
      delete: document.querySelector(".deleteButton"),
      content: document.querySelector(".content"),
      today: document.getElementById("today"),
      week: document.getElementById("week"),
      allTasks: document.getElementById("all-tasks"),
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
      const date = format(data.date, "dd-MM-yyyy");

      // Creating an object
      const ticket = new createTicket(title, description, date, priority);

      // Pushing the object into the general array
      allTickets.add(ticket);
      console.log("new ticket added:", allTickets);

      // Add to the dom
      const loopOverTickets = new addTicketToDom();
      loopOverTickets.updateDom(userTracker, allTickets);

      // Closing the popup
      const popup = new popUpWindow();
      popup.close();

      // Removing old form data
      form.reset();
    });
  }

  delete() {
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

  todayButton() {
    this.elements.today?.addEventListener("click", () => {
      const loopOverTickets = new addTicketToDom();
      loopOverTickets.updateDom(0, allTickets);
      setFilter(0);
    });
  }

  weekButton() {
    this.elements.week?.addEventListener("click", () => {
      const loopOverTickets = new addTicketToDom();
      loopOverTickets.updateDom(7, allTickets);
      setFilter(7);
    });
  }

  allTasksButton() {
    this.elements.allTasks?.addEventListener("click", () => {
      const loopOverTickets = new addTicketToDom();
      loopOverTickets.updateDom("All", allTickets);
      setFilter("All");
    });
  }

  hamburgerButton() {
    const hamburger = document.getElementById("hamburger");

    hamburger.addEventListener("click", () => {
      const menu = document.querySelector(".menu-bar");
      if (menu.style.display === "none") {
        menu.style.display = "block";
      } else {
        menu.style.display = "none";
      }
    });
  }
}
