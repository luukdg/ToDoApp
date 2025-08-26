import "./styles/main.css";
import "./styles/menu-bar.css";
import "./styles/header.css";
import "./styles/content.css";
import "./styles/form-popup.css";
import createTicket from "./components/createTicket.js";
import ticketCollection from "./components/assignTicket.js";
import DomFunctions from "./dom/buttonInteractions.js";
import addTicketToDom from "./dom/addTicketToDom.js";
import {
  saveLocalStorage,
  retrieveLocalStorage,
} from "./localStorage/storeTicket.js";

// Activate button interactions
const dom = new DomFunctions();
dom.init();

// Basic array for storing the tickets
export const allTickets = retrieveLocalStorage();

// Refreshes DOM
const loopOverTickets = new addTicketToDom();
loopOverTickets.updateDom("All", allTickets);
