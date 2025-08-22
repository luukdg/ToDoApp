// Function which loops through the object and updates the DOM accordingly.
import { allTickets } from "../index.js";

export default class addTicketToDom {
  updateDom() {
    allTickets.tickets.forEach((ticket) => {
      const description = ticket.description;
      const dueDate = ticket.dueDate;
      const priority = ticket.priority;
      const ticketCounter = ticket.ticketCounter;
      const title = ticket.title;

      if (!document.getElementById(ticketCounter)) {
        const container = document.querySelector(".content");
        const template = document.querySelector(".todo-ticket");

        const clone = template.content.cloneNode(true);
        const ticketElement = clone.querySelector(".ticket-wrapper");

        ticketElement.id = ticketCounter;

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
