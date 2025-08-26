import { constructFrom } from "date-fns";

export default class changeColor {
  constructor() {
    this.lastActive = null;
  }
  // Change the active status of the menu items
  checkMenu(input) {
    const inputEl = document.getElementById(input);

    // Clear the previous field
    if (this.lastActive && this.lastActive !== inputEl) {
      this.lastActive.value = "";
      this.lastActive.style.backgroundColor = "";
    }

    // Mark the new field as active
    inputEl.style.backgroundColor = "#d0d0d0";
    this.lastActive = inputEl;
  }

  init() {
    this.checkMenu();
  }
}
