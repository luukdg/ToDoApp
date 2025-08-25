export default class changeColor {
  priorityPopUp() {
    const select = document.getElementById("priority");
    const colors = { high: "#ef476f", medium: "#ffd166", low: "#06d6a0" };

    select.addEventListener("change", () => {
      select.style.backgroundColor = colors[select.value];
      select.style.color = "#fff";
    });
  }

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
    this.priorityPopUp();
    this.checkMenu();
  }
}
