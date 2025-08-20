export default class changePriority {
  setToLow(allTickets, objectID) {
    const ticket = allTickets.tickets.find(
      (type) => type.ticketCounter === objectID
    );
    ticket.priority = "Low";
  }

  setToMedium(allTickets, objectID) {
    const ticket = allTickets.tickets.find(
      (type) => type.ticketCounter === objectID
    );
    ticket.priority = "Medium";
  }

  setToHigh(allTickets, objectID) {
    const ticket = allTickets.tickets.find(
      (type) => type.ticketCounter === objectID
    );
    ticket.priority = "High";
  }
}
