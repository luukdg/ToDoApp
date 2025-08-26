export default class ticketCollection {
  constructor() {
    this.tickets = [];
  }

  add(ticket) {
    // Checks if a matching id is found
    const index = this.tickets.findIndex(
      (t) => t.ticketCounter === ticket.ticketCounter
    );

    if (index !== -1) {
      // Replace existing ticket
      this.tickets[index] = ticket;
    } else {
      // Otherwise push as new
      this.tickets.push(ticket);
    }
  }

  // Convert plain JSON object back into a ticketCollection instance
  static fromJSON(json) {
    const collection = new ticketCollection();
    collection.tickets = json.tickets || [];
    return collection;
  }
}
