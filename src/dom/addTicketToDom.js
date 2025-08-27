// Function which loops through the object and updates the DOM accordingly.
import { startOfDay, addDays, parse } from "date-fns";
import SortArray from "../components/sortArray.js";
import changeColor from "./changePriorityColor.js";
import { allTickets } from "../index.js";

const ticketColor = new changeColor();

export default class addTicketToDom {
  updateDom(filterSelection, ticketsData) {
    const allTickets = Array.isArray(ticketsData)
      ? { tickets: ticketsData }
      : ticketsData;

    // Wipes the DOM first
    const container = document.querySelector(".content");
    while (container.children.length > 1) {
      container.removeChild(container.lastChild);
    }

    let filterByDays;

    // Filters the selection based on time
    if (filterSelection === "All") {
      filterByDays = allTickets.tickets;
    } else if (Number.isInteger(filterSelection)) {
      const todayDate = startOfDay(new Date());
      const untilDate = startOfDay(addDays(todayDate, filterSelection));

      filterByDays = allTickets.tickets.filter((ticket) => {
        const ticketDate = startOfDay(
          parse(ticket.dueDate, "dd-MM-yyyy", new Date())
        );

        if (filterSelection === 0) {
          return ticketDate.getTime() === todayDate.getTime();
        }
        return ticketDate >= todayDate && ticketDate <= untilDate;
      });
    } else {
      filterByDays = allTickets.tickets.filter(
        (ticket) => ticket.project === filterSelection
      );
    }

    // Sort the tickets by date
    const sortByDate = new SortArray();
    sortByDate.sort(filterByDays);

    // Find all the necessary information
    filterByDays.forEach((ticket) => {
      const description = ticket.description;
      const dueDate = ticket.dueDate;
      const priority = ticket.priority;
      const ticketCounter = ticket.ticketCounter;
      const title = ticket.title;

      if (!document.getElementById(ticketCounter)) {
        const container = document.querySelector(".content");
        const template = document.querySelector(".todo-ticket");

        // Cloning template ticket
        const clone = template.content.cloneNode(true);
        const ticketElement = clone.querySelector(".ticket-wrapper");

        // Assign unique id to ticket
        ticketElement.id = ticketCounter;

        // Assign the ticket information to the DOM
        clone.getElementById("description").textContent = description;
        clone.getElementById("date").textContent = dueDate;

        // Make first char with uppercase
        clone.getElementById("priority").textContent =
          priority.charAt(0).toUpperCase() + priority.slice(1);
        clone.getElementById("title").textContent = title;

        const priorityColor = clone.getElementById("priority");

        // Change ticket color based on priority
        ticketColor.setPriorityColor(ticketElement, priorityColor);

        // Link it to the DOM
        container.appendChild(clone);
      }
    });

    // Button for adding more tickets
    const newDiv = document.createElement("div");
    const newButton = document.createElement("h3");
    newButton.textContent = "Voeg een nieuwe taak toe";
    newDiv.id = "add-new-task-button";

    container.appendChild(newDiv);
    newDiv.appendChild(newButton);
  }

  updateMenuDom(allProjects) {
    // DOM selections
    const projectDropdown = document.querySelector("#project");
    const editPopup = document.querySelector(".edit-window-popup");
    const editProjectDropdown = editPopup.querySelector("#project");
    const projectContainer = document.querySelector("#project-wrapper");

    // Clear existing DOM elements (keep the first one if needed)
    while (projectContainer.children.length > 1) {
      projectContainer.removeChild(projectContainer.lastChild);
    }
    while (editProjectDropdown.children.length > 1) {
      editProjectDropdown.removeChild(editProjectDropdown.lastChild);
    }
    while (projectDropdown.children.length > 1) {
      projectDropdown.removeChild(projectDropdown.lastChild);
    }

    // Get all projects
    const allProjectData = allProjects;

    allProjectData.projects.forEach((projectItem) => {
      const projectName = projectItem.project;

      // Add to main project dropdown
      const option = document.createElement("option");
      option.value = projectName;
      option.textContent = projectName;
      projectDropdown.appendChild(option);

      // Add to edit popup dropdown
      const editOption = document.createElement("option");
      editOption.value = projectName;
      editOption.textContent = projectName;
      editProjectDropdown.appendChild(editOption);

      // Add project to menu bar
      const projectDiv = document.createElement("div");
      projectDiv.id = projectName;
      projectDiv.textContent = projectName;
      projectContainer.appendChild(projectDiv);
    });
  }

  updateTicketsByProject(projectID, allTickets) {
    if (projectID === "default-project") {
      this.updateDom("All", allTickets);
    } else {
      this.updateDom(projectID, allTickets);
    }
  }
}
