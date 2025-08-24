// Function which loops through the object and updates the DOM accordingly.
import { allTickets } from "../index.js";
import { format, addDays } from "date-fns";

export default class addTicketToDom {
  updateDom(filterSelection) {
    let filterByDays;

    // FIX THIS, all three scenario's must work
    if (!filterSelection) {
      filterByDays = allTickets.tickets;
    }
    if (filterSelection === 0) {
      const todayDate = new Date();
      const fromDate = format(todayDate, "dd-MM-yyyy");

      filterByDays = allTickets.tickets.filter((ticket) => {
        return ticket.dueDate === fromDate;
      });
    } else {
      const todayDate = new Date();
      const dateInput = addDays(todayDate, filterSelection);

      const fromDate = format(todayDate, "dd-MM-yyyy");
      const untilDate = format(dateInput, "dd-MM-yyyy");

      console.log(fromDate, untilDate);

      filterByDays = allTickets.tickets.filter((ticket) => {
        return ticket.dueDate >= fromDate && ticket.dueDate <= untilDate;
      });
    }

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
        clone.getElementById("priority").textContent = priority;
        clone.getElementById("title").textContent = title;

        // Link it to the DOM
        container.appendChild(clone);
      }
    });
  }
}
