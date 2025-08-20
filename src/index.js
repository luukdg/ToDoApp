import "./styles/main.css";
import createTicket from "./components/createTicket";
import ticketCollection from "./components/assignTicket.js";
import changePriority from "./components/changePriority.js";

// Basic array for storing the tickets
const allTickets = new ticketCollection();
console.log(allTickets);

const priorityFunction = new changePriority();

// Creating a ticket #1
let newTicket = new createTicket("Bug", "Fix issue", "2025-08-25", "High");
console.log(newTicket);

// Adding ticket to array #1
allTickets.add(newTicket);
console.log(allTickets);

// Creating a ticket #2
newTicket = new createTicket("Bug", "Damage", "2025-02-21", "Low");
console.log(newTicket);

// Adding ticket to array #1
allTickets.add(newTicket);
console.log(allTickets);

// Change priority of a ticket
priorityFunction.setToHigh(allTickets, 2);
// prioChange.setToHigh(allTickets, 2);
// console.log(allTickets);
