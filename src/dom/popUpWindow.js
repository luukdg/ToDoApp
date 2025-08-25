export default class popUpWindow {
  constructor() {
    this.popUpForm = document.querySelector(".add-book-popup");
    this.popUpFormEdit = document.querySelector(".edit-window-popup");
  }

  close() {
    this.popUpForm.style.display = "none";
  }

  open() {
    this.popUpForm.style.display = "block";
  }

  openEditWindow() {
    this.popUpFormEdit.style.display = "block";
  }

  closeEditWindow() {
    this.popUpFormEdit.style.display = "none";
  }
}
