import "./styles/main.css";
import "./styles/menu-bar.css";
import "./styles/header.css";
import "./styles/content.css";
import "./styles/form-popup.css";

import createTicket from "./components/createTicket.js";
import ticketCollection from "./components/assignTicket.js";
import changeTicket from "./components/changeTicket.js";
import sortArray from "./components/sortArray.js";

import DomFunctions from "./dom/buttonInteractions.js";
import addTicketToDom from "./dom/addTicketToDom.js";

// Activate button interactions
const dom = new DomFunctions();
dom.addTodoButton();
dom.closeButton();
dom.addSubmit();
dom.changeInDom();
dom.changeInCheckbox();

// Basic array for storing the tickets
export const allTickets = new ticketCollection();

// Creating a ticket #1
let newTicket = new createTicket("Bug", "Fix issue", "2025-08-25", "High");
allTickets.add(newTicket);
console.log(allTickets);

// Creating a ticket #2
newTicket = new createTicket(
  "Feature",
  "Add dark mode",
  "2025-03-15",
  "Medium"
);
allTickets.add(newTicket);

// Sort the tickets by date
const sorter = new sortArray();
sorter.sortByDate();

// adds the tickets to the DOM
const loopOverTickets = new addTicketToDom();
loopOverTickets.updateDom();
