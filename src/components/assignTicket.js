export default class ticketCollection {
  constructor() {
    this.tickets = []; // Takes no input and creates an array
  }

  add(ticket) {
    this.tickets.push(ticket); // Pushes an object into the array
  }
}
