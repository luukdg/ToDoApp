// Function which loops through the object and updates the DOM accordingly.
import { allTickets } from "../index.js";
import { startOfDay, addDays, parse } from "date-fns";
import SortArray from "../components/sortArray.js";

export default class addTicketToDom {
  updateDom(filterSelection) {
    let filterByDays;

    // FIX THIS, all three scenario's must work
    if (!filterSelection === undefined || filterSelection === null) {
      filterByDays = allTickets.tickets;
    } else {
      const todayDate = startOfDay(new Date());
      const untilDate = startOfDay(addDays(todayDate, filterSelection));

      console.log("From:", todayDate, "Until:", untilDate);

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
        clone.getElementById("priority").textContent = priority;
        clone.getElementById("title").textContent = title;

        // Link it to the DOM
        container.appendChild(clone);
      }
    });
  }
}
