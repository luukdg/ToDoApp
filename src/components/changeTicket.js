export default class changeTicket {
  // Changing priority of ticket
  setToLow(allTickets, objectID) {
    const ticket = allTickets.tickets.find(
      (type) => type.ticketCounter === objectID
    );
    ticket.priority = "low";
  }

  setToMedium(allTickets, objectID) {
    const ticket = allTickets.tickets.find(
      (type) => type.ticketCounter === objectID
    );
    ticket.priority = "medium";
  }

  setToHigh(allTickets, objectID) {
    const ticket = allTickets.tickets.find(
      (type) => type.ticketCounter === objectID
    );
    ticket.priority = "high";
  }

  // Changing completion of ticket
  changePriority(allTickets, objectID) {
    const ticket = allTickets.tickets.find(
      (type) => type.ticketCounter === objectID
    );

    if (ticket.status === "pending") {
      ticket.status = "complete";
    } else {
      ticket.status = "pending";
    }
  }

  // Remove ticket
  removeTicket(allTickets, objectID) {
    allTickets.tickets.splice(
      allTickets.tickets.findIndex((a) => a.id === objectID),
      1
    );
  }
}
