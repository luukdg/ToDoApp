import { allTickets } from "../index.js";

export default class sortArray {
  sortByDate() {
    allTickets.tickets.sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );
  }
}
