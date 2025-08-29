import { startOfDay, addDays, parse } from "date-fns";
import SortArray from "../components/sortArray.js";
import changeColor from "./changePriorityColor.js";
import trashIcon from "../img/SVG/trash.svg";

const ticketColor = new changeColor();

export default class addTicketToDom {
  updateDom(projectSelection, filterSelection, ticketsData) {
    const allTickets = Array.isArray(ticketsData)
      ? { tickets: ticketsData }
      : ticketsData;

    // Wipes the DOM first
    const container = document.querySelector(".content");
    while (container.children.length > 1) {
      container.removeChild(container.lastChild);
    }

    // Filters based on the project
    let filterByProject;

    if (projectSelection === "default-project") {
      filterByProject = allTickets.tickets;
    } else {
      filterByProject = allTickets.tickets.filter(
        (ticket) => ticket.project === projectSelection,
      );
    }

    let filterByDays = filterByProject;

    // Filters the selection based on time
    if (Number.isInteger(filterSelection)) {
      const todayDate = startOfDay(new Date());
      const untilDate = startOfDay(addDays(todayDate, filterSelection));

      filterByDays = filterByDays.filter((ticket) => {
        const ticketDate = startOfDay(
          parse(ticket.dueDate, "dd-MM-yyyy", new Date()),
        );

        if (filterSelection === 0) {
          return ticketDate.getTime() === todayDate.getTime();
        }
        return ticketDate >= todayDate && ticketDate <= untilDate;
      });
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
      const status = ticket.status;

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
        clone.getElementById("title").textContent = title;

        // Make first char with uppercase
        clone.getElementById("priority").textContent =
          priority.charAt(0).toUpperCase() + priority.slice(1);

        const priorityColor = clone.getElementById("priority");

        // Change ticket color based on priority
        ticketColor.setPriorityColor(ticketElement, priorityColor);

        // If ticket is complete, change the style
        if (status === "complete") {
          ticketElement.style.backgroundColor = "#A9A9A9";
          ticketElement.style.borderLeft = "";
          priorityColor.style.backgroundColor = "#d5d5d5ff";
          clone.getElementById("checkbox").checked = true;
        } else {
          ticketElement.style.textDecoration = "";
          ticketElement.style.backgroundColor = "#ffffffff";
          clone.getElementById("checkbox").checked = false;
        }

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

      const projectDelete = document.createElement("img");
      projectDelete.className = "delete-project";
      projectDelete.src = trashIcon;
      projectContainer.appendChild(projectDiv);
      projectDiv.appendChild(projectDelete);
    });
  }
}
