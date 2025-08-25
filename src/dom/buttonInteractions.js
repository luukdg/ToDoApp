// <--- Add todo Button ---> //
import createTicket from "../components/createTicket";
import { allTickets } from "../index.js";
import popUpWindow from "./popUpWindow.js";
import addTicketToDom from "./addTicketToDom.js";
import changeColor from "./changePriorityColor.js";
import changeTicket from "../components/changeTicket.js";
import { format } from "date-fns";
import { setFilter, userTracker } from "./userTracker.js";

export default class DomFunctions {
  constructor() {
    this.elements = {
      addTodo: document.getElementById("add-todo-button"),
      firstSubmit: document.getElementById("submit"),
      toDoForm: document.getElementsByClassName("add-book-popup"),
      close: document.getElementById("cancel"),
      delete: document.querySelector(".deleteButton"),
      content: document.querySelector(".content"),
      today: document.getElementById("today"),
      week: document.getElementById("week"),
      allTasks: document.getElementById("all-tasks"),
      addProject: document.getElementById("add-project"),
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

  addSecondToDoButton() {
    this.elements.content?.addEventListener("click", (e) => {
      if (e.target.closest("#add-new-task-button")) {
        const popup = new popUpWindow();
        popup.open();
        console.log("open");
      }
    });
  }

  closeButton() {
    this.elements.close?.addEventListener("click", () => {
      const popup = new popUpWindow();
      popup.close();
      console.log("close");

      const form = document.querySelector(".add-book-popup");
      form.reset();
    });
  }

  // Submit a todo ticket
  addSubmit() {
    this.elements.firstSubmit?.addEventListener("click", (e) => {
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

  edit() {
    this.elements.content?.addEventListener("click", (e) => {
      if (e.target.id === "edit") {
        const popup = new popUpWindow();
        popup.openEditWindow();
      }
    });
  }

  delete() {
    this.elements.content?.addEventListener("click", (e) => {
      if (e.target.id === "delete") {
        const toDoTicket = e.target.closest(".ticket-wrapper");
        if (toDoTicket) {
          const objectID = toDoTicket.id;

          // Remove from Array
          const change = new changeTicket();
          change.removeTicket(allTickets, objectID);

          // Remove from DOM
          toDoTicket.remove();
          console.log("New list", allTickets);
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
      const filter = 0;

      const loopOverTickets = new addTicketToDom();
      loopOverTickets.updateDom(filter, allTickets);
      setFilter(filter);

      const menu = new changeColor();
      menu.checkMenu(filter);
    });
  }

  weekButton() {
    this.elements.week?.addEventListener("click", () => {
      const filter = 7;

      const loopOverTickets = new addTicketToDom();
      loopOverTickets.updateDom(filter, allTickets);
      setFilter(filter);

      const menu = new changeColor();
      menu.checkMenu(filter);
    });
  }

  allTasksButton() {
    this.elements.allTasks?.addEventListener("click", () => {
      const filter = "All";

      const loopOverTickets = new addTicketToDom();
      loopOverTickets.updateDom(filter, allTickets);
      setFilter(filter);

      // Check menu selection background color
      const menu = new changeColor();
      menu.checkMenu(filter);
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

  addProjectButton() {
    this.elements.addProject?.addEventListener("click", () => {
      const newProject = document.createElement("div");
      const inputForm = document.createElement("input");

      const container = document.getElementById("project-wrapper");
      container.appendChild(newProject);
      newProject.appendChild(inputForm);
    });
  }

  init() {
    this.addTodoButton();
    this.closeButton();
    this.addSubmit();
    this.delete();
    this.changeInCheckbox();
    this.todayButton();
    this.weekButton();
    this.allTasksButton();
    this.hamburgerButton();
    this.addProjectButton();
    this.addSecondToDoButton();
    this.edit();
  }
}
