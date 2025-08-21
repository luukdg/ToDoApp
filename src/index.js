import "./styles/main.css";
import createTicket from "./components/createTicket.js";
import ticketCollection from "./components/assignTicket.js";
import changeTicket from "./components/changeTicket.js";
import DomFunctions from "./dom/buttonInteractions.js";
import "./styles/menu-bar.css";
import "./styles/header.css";
import "./styles/content.css";
import "./styles/form-popup.css";

// Basic array for storing the tickets
const allTickets = new ticketCollection();
console.log(allTickets);

const ticket = new changeTicket();

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
ticket.setToHigh(allTickets, 2);
// prioChange.setToHigh(allTickets, 2);
console.log(allTickets);

ticket.setToComplete(allTickets, 2);
console.log(allTickets);

// Button interactions
const dom = new DomFunctions();
dom.addTodo();
dom.addSubmit();
