import "./styles/main.css";
import "./styles/menu-bar.css";
import "./styles/header.css";
import "./styles/content.css";
import "./styles/form-popup.css";
import DomFunctions from "./dom/buttonInteractions.js";
import addTicketToDom from "./dom/addTicketToDom.js";
import { retrieveProjectLocalStorage } from "./localStorage/storeProject.js";
import { retrieveLocalStorage } from "./localStorage/storeTicket.js";
import projectFunctions from "./dom/projectButtons.js";
import { retrieveFilterSelected } from "./localStorage/storeFilterSelected.js";
import { initFilterSelected } from "./localStorage/storeFilterSelected.js";

// Activate button interactions
const dom = new DomFunctions();
const proj = new projectFunctions();
dom.init();
proj.init();

// Basic array for storing the tickets
export const allTickets = retrieveLocalStorage();
export const allProjects = retrieveProjectLocalStorage();

// Sets a first time filter
initFilterSelected("All");

// Retrieves the latest filter saved
const filterSelected = retrieveFilterSelected();
console.log(filterSelected);

// Refreshes DOM
const loopOverTickets = new addTicketToDom();
loopOverTickets.updateDom(filterSelected, allTickets);
loopOverTickets.updateMenuDom(allProjects);

console.log(allProjects);
