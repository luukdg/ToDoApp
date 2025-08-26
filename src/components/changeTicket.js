export default class changeTicket {
  constructor(
    title,
    description,
    dueDate,
    priority,
    ticketCounter,
    status,
    project
  ) {
    this.ticketCounter = ticketCounter;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
    this.project = project;
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
    console.log(ticket.status);
    console.log(allTickets);
  }

  // Remove ticket
  removeTicket(allTickets, objectID) {
    allTickets.tickets.splice(
      allTickets.tickets.findIndex((a) => a.id === objectID),
      1
    );
  }
}
