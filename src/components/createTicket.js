let ticketCounter = 0;

export default class createTicket {
  constructor(title, description, dueDate, priority) {
    this.ticketCounter = ++ticketCounter;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  // assign date?
}
