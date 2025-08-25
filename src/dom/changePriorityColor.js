export default class changeColor {
  priorityPopUp() {
    const select = document.getElementById("priority");
    const colors = { high: "#ef476f", medium: "#ffd166", low: "#06d6a0" };

    select.addEventListener("change", () => {
      select.style.backgroundColor = colors[select.value];
      select.style.color = "#fff";
    });
  }

  checkPriority() {
    const tickets = document.querySelectorAll(".ticket-wrapper");

    tickets.forEach((ticket) => {
      if (ticket.dataset.priority === "High") {
        ticket.style.backgroundColor = "#ef476f"; // style the element itself
      }
    });
  }
}
