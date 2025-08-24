import { parse, compareAsc } from "date-fns";

export default class SortArray {
  sort(allTickets) {
    allTickets.sort((a, b) => {
      const dateA = parse(a.dueDate, "dd-MM-yyyy", new Date());
      const dateB = parse(b.dueDate, "dd-MM-yyyy", new Date());

      return compareAsc(dateA, dateB);
    });

    return allTickets;
  }
}
