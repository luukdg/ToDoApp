// Function which loops through the object and updates the DOM accordingly.
import { startOfDay, addDays, parse } from "date-fns";
import SortArray from "../components/sortArray.js";
import changeColor from "./changePriorityColor.js";

export default class addTicketToDom {
  updateDom(filterSelection, allTickets) {
    // Wipes the DOM first
    const container = document.querySelector(".content");
    while (container.children.length > 1) {
      container.removeChild(container.lastChild);
    }

    let filterByDays;

    // Filtering by "vandaag", "Komende week" or "Alle taken"
    if (filterSelection === "All") {
      filterByDays = allTickets.tickets;
    } else {
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

        // Assign the color based on priority
        if (priorityColor.textContent === "High") {
          ticketElement.style.borderLeftColor = "#ef476f";
          priorityColor.style.backgroundColor = "#ef476f";
        } else if (priorityColor.textContent === "Medium") {
          ticketElement.style.borderLeftColor = "#ffd166";
          priorityColor.style.backgroundColor = "#ffd166";
        } else {
          ticketElement.style.borderLeftColor = "#06d6a0";
          priorityColor.style.backgroundColor = "#06d6a0";
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
}
