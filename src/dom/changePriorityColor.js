// Set a starting active item
import { retrieveFilterID } from "../localStorage/storeFilterSelected";
const startingId = retrieveFilterID();

export default class changeColor {
  constructor() {
    this.lastActive = null;

    this.checkMenu(startingId);
  }
  // Change the active status of the menu items
  checkMenu(input) {
    const inputEl = document.getElementById(input);
    if (!inputEl) return;

    // Clear the previous field
    if (this.lastActive && this.lastActive !== inputEl) {
      this.lastActive.style.backgroundColor = "";
    }

    // Mark the new field as active
    inputEl.style.backgroundColor = "#d0d0d0";
    this.lastActive = inputEl;
  }

  setPriorityColor(ticketElement, priorityElement) {
    const priority = priorityElement.textContent;

    if (priority === "High") {
      ticketElement.style.borderLeftColor = "#ef476f";
      priorityElement.style.backgroundColor = "#ef476f";
    } else if (priority === "Medium") {
      ticketElement.style.borderLeftColor = "#ffd166";
      priorityElement.style.backgroundColor = "#ffd166";
    } else {
      ticketElement.style.borderLeftColor = "#06d6a0";
      priorityElement.style.backgroundColor = "#06d6a0";
    }
  }

  init() {
    this.checkMenu();
  }
}
