// <--- Add todo Button ---> //
import createTicket from "../components/createTicket";
import { allTickets } from "../index.js";
import popUpWindow from "./popUpWindow.js";
import addTicketToDom from "./addTicketToDom.js";
import changeColor from "./changePriorityColor.js";
import changeTicket from "../components/changeTicket.js";
import { format, parse } from "date-fns";
import { setFilter, userTracker } from "./userTracker.js";
import { saveLocalStorage } from "../localStorage/storeTicket.js";
import { saveFilterSelected } from "../localStorage/storeFilterSelected.js";

// Defining class variables
const menu = new changeColor();
const loopOverTickets = new addTicketToDom();
const change = new changeTicket();
const popup = new popUpWindow();

// This the ID of selected ticket.
let currentID = "";
let currentStatus = "";

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
      cancelChange: document.getElementById("cancel-change"),
      change: document.getElementById("change"),
      menuBar: document.querySelector(".home"),
    };
  }

  // <-- STATIC BUTTONS -->
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

  highlightButtons() {
    this.elements.menuBar?.addEventListener("click", (e) => {
      const projectID = e.target.id;

      if (e.target.tagName === "DIV") {
        menu.checkMenu(projectID);
        saveFilterSelected(projectID);
      }
    });
  }

  todayButton() {
    this.elements.today?.addEventListener("click", () => {
      const filter = 0;

      loopOverTickets.updateDom(filter, allTickets);
      setFilter(filter);

      // menu.checkMenu(this.elements.today.id);
    });
  }

  weekButton() {
    this.elements.week?.addEventListener("click", () => {
      const filter = 6;

      loopOverTickets.updateDom(filter, allTickets);
      setFilter(filter);

      // menu.checkMenu(this.elements.week.id);
    });
  }

  allTasksButton() {
    this.elements.allTasks?.addEventListener("click", () => {
      const filter = "All";

      loopOverTickets.updateDom(filter, allTickets);
      setFilter(filter);

      // menu.checkMenu(this.elements.allTasks.id);
    });
  }

  addTodoButton() {
    this.elements.addTodo?.addEventListener("click", () => {
      popup.open();
    });
  }

  addSecondToDoButton() {
    this.elements.content?.addEventListener("click", (e) => {
      if (e.target.closest("#add-new-task-button")) {
        popup.open();
      }
    });
  }

  // <-- POPUP BUTTONS FOR ADDING TICKET -->

  // Submit a todo ticket
  addSubmit() {
    this.elements.firstSubmit?.addEventListener("click", (e) => {
      e.preventDefault();

      // Query selector of the form
      const form = document.querySelector(".add-book-popup");

      // Check HTML5 validity
      if (!form.checkValidity()) {
        // This will show the browser's default validation messages
        form.reportValidity();
        return; // stop execution
      }

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Separating the data in different variables
      const title = data.title;
      const description = data.description;
      const priority = data.priority;
      const date = format(data.date, "dd-MM-yyyy");
      const project = data.project;

      // Creating an object
      const ticket = new createTicket(
        title,
        description,
        date,
        priority,
        project
      );

      // Pushing the object into the general array
      allTickets.add(ticket);
      console.log("new ticket added:", allTickets);

      // Save in localstorage
      saveLocalStorage(allTickets);

      // Add to the dom
      loopOverTickets.updateDom(userTracker, allTickets);

      // Closing the popup
      popup.close();

      // Removing old form data
      form.reset();
    });
  }

  closeButton() {
    this.elements.close?.addEventListener("click", () => {
      popup.close();
      console.log("close");

      const form = document.querySelector(".add-book-popup");
      form.reset();
    });
  }

  // <-- POPUP BUTTONS FOR EDITING TICKET -->

  // Edit a ticket
  editButton() {
    this.elements.content?.addEventListener("click", (e) => {
      if (e.target.id === "edit") {
        const toDoTicket = e.target.closest(".ticket-wrapper");
        currentID = toDoTicket.id;
        console.log("currentID:", currentID);

        // Find right ticket
        const ticket = allTickets.tickets.find(
          (type) => type.ticketCounter === currentID
        );

        currentStatus = ticket.status;

        // Find DOM
        const editWindow = document.querySelector(".edit-window-popup");
        const title = editWindow.querySelector("#title"); // scoped to editWindow
        const description = editWindow.querySelector("#description");
        const date = editWindow.querySelector("#date");
        const priority = editWindow.querySelector("#priority");
        const project = editWindow.querySelector("#project");

        const rawDate = ticket.dueDate;
        const parsedDate = parse(rawDate, "dd-MM-yyyy", new Date());
        const formattedDate = format(parsedDate, "yyyy-MM-dd");

        title.value = ticket.title;
        description.value = ticket.description;
        date.value = formattedDate;
        priority.value = ticket.priority;
        project.value = ticket.project;

        popup.openEditWindow();
      }
    });
  }

  // Change the ticket
  changeButton() {
    this.elements.change?.addEventListener("click", (e) => {
      e.preventDefault();

      // Query selector of the form
      const form = document.querySelector(".edit-window-popup");

      // Check HTML5 validity
      if (!form.checkValidity()) {
        // This will show the browser's default validation messages
        form.reportValidity();
        return; // stop execution
      }

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Separating the data in different variables
      const title = data.title;
      const description = data.description;
      const priority = data.priority;
      const date = format(data.date, "dd-MM-yyyy");
      const project = data.project;

      // Creating an object
      const ticket = new changeTicket(
        title,
        description,
        date,
        priority,
        currentID,
        currentStatus,
        project
      );

      // Pushing the object into the general array
      allTickets.add(ticket);
      console.log("Ticket has been changed:", allTickets);

      // Save in localstorage
      saveLocalStorage(allTickets);

      // Refresh the dom
      loopOverTickets.updateDom(userTracker, allTickets);

      // Closing the popup

      popup.closeEditWindow();
    });
  }

  // Cancel editing ticket
  cancelButton() {
    this.elements.cancelChange?.addEventListener("click", () => {
      popup.closeEditWindow();
    });
  }

  // Delete ticket
  delete() {
    this.elements.content?.addEventListener("click", (e) => {
      if (e.target.id === "delete") {
        const toDoTicket = e.target.closest(".ticket-wrapper");
        if (toDoTicket) {
          const objectID = toDoTicket.id;

          // Remove from Array
          change.removeTicket(allTickets, objectID);

          // Save in localstorage
          saveLocalStorage(allTickets);

          // Remove from DOM
          toDoTicket.remove();
          console.log("New list", allTickets);
        }
      }
    });
  }

  // Change completion status of ticket
  changeInCheckbox() {
    this.elements.content?.addEventListener("change", (e) => {
      // Find the right ticket in the DOM
      if (e.target.id === "checkbox") {
        const toDoTicket = e.target.closest(".ticket-wrapper");
        if (toDoTicket) {
          const objectID = toDoTicket.id;

          // Change the status in the object
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
    this.addSecondToDoButton();
    this.editButton();
    this.cancelButton();
    this.changeButton();
    this.highlightButtons();
  }
}
