export default class popUpWindow {
  constructor() {
    this.popUpForm = document.querySelector(".add-book-popup");
  }

  close() {
    this.popUpForm.style.display = "none";
  }

  open() {
    this.popUpForm.style.display = "block";
  }
}
