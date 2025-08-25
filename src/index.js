import "./styles/main.css";
import "./styles/menu-bar.css";
import "./styles/header.css";
import "./styles/content.css";
import "./styles/form-popup.css";

import createTicket from "./components/createTicket.js";
import ticketCollection from "./components/assignTicket.js";
import changeTicket from "./components/changeTicket.js";
import SortArray from "./components/sortArray.js";

import DomFunctions from "./dom/buttonInteractions.js";
import addTicketToDom from "./dom/addTicketToDom.js";

import changeColor from "./dom/changePriorityColor.js";

// Activate button interactions
const dom = new DomFunctions();
dom.init();

const domColor = new changeColor();
domColor.init();
domColor.checkMenu("All");

// Basic array for storing the tickets
export const allTickets = new ticketCollection();

// Creating a ticket #1
let newTicket = new createTicket("Bug", "Fix issue", "26-08-2025", "high");
allTickets.add(newTicket);

// Creating a ticket #2
newTicket = new createTicket(
  "Feature",
  "Add dark mode",
  "30-08-2025",
  "medium"
);
allTickets.add(newTicket);

// Creating a ticket #3
newTicket = new createTicket(
  "Task",
  "Update documentation",
  "26-08-2025",
  "low"
);
allTickets.add(newTicket);

// Creating a ticket #4
newTicket = new createTicket(
  "Improvement",
  "Refactor login module",
  "25-08-2025",
  "high"
);
allTickets.add(newTicket);

// Creating a ticket #5
newTicket = new createTicket(
  "Bug",
  "Resolve memory leak",
  "24-08-2025",
  "medium"
);
allTickets.add(newTicket);

console.log("Tickets when refreshing:", allTickets);

// adds the tickets to the DOM
const loopOverTickets = new addTicketToDom();
loopOverTickets.updateDom("All", allTickets);
