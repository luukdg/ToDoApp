export default class createTicket {
  constructor(title, description, dueDate, priority) {
    this.ticketCounter = "id-" + crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = "pending";
  }
}
