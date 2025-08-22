export default class changeTicket {
  // Changing priority of ticket
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

  // Changing completion of ticket
  setToComplete(allTickets, objectID) {
    const ticket = allTickets.tickets.find(
      (type) => type.ticketCounter === objectID
    );
    ticket.status = "complete";
  }

  setToPending(allTickets, objectID) {
    const ticket = allTickets.tickets.find(
      (type) => type.ticketCounter === objectID
    );
    ticket.status = "pending";
  }

  removeTicket(allTickets, objectID) {
    allTickets.tickets.splice(
      allTickets.tickets.findIndex((a) => a.id === objectID),
      1
    );
  }
}
