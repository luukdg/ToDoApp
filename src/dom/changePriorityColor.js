export default class changeColor {
  // Change the active status of the menu items
  checkMenu(input) {
    const today = document.getElementById("today");
    const week = document.getElementById("week");
    const allTasks = document.getElementById("all-tasks");

    if (input === "All") {
      today.style.backgroundColor = "";
      week.style.backgroundColor = "";
      allTasks.style.backgroundColor = "#d0d0d0";
    }
    if (input === 7) {
      today.style.backgroundColor = "";
      week.style.backgroundColor = "#d0d0d0";
      allTasks.style.backgroundColor = "";
    }
    if (input === 0) {
      today.style.backgroundColor = "#d0d0d0";
      week.style.backgroundColor = "";
      allTasks.style.backgroundColor = "";
    }
  }

  init() {
    this.checkMenu();
  }
}
