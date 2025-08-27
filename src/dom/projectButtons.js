import changeColor from "./changePriorityColor.js";
import { allProjects, allTickets } from "../index.js";
import { saveProjectLocalStorage } from "../localStorage/storeProject.js";
import addTicketToDom from "./addTicketToDom.js";
import { setFilter } from "./userTracker.js";
import { saveFilterSelected } from "../localStorage/storeFilterSelected.js";

// Defining class variables
const menu = new changeColor();
const loopOverTickets = new addTicketToDom();

export default class projectFunctions {
  constructor() {
    this.elements = {
      defaultProject: document.getElementById("default-project"),
      addProject: document.getElementById("add-project"),
      projectForm: document.querySelector(".add-project-form"),
      cancelProject: document.getElementById("cancel-project-button"),
      submitProject: document.getElementById("add-project-button"),
      projectWrapper: document.getElementById("project-wrapper"),
    };
  }

  // <-- PROJECT BUTTONS -->

  projectButtons() {
    this.elements.projectWrapper?.addEventListener("click", (e) => {
      const projectID = e.target.id;
      console.log("projectID: ", projectID);

      loopOverTickets.updateTicketsByProject(projectID, allTickets);
      setFilter(projectID);

      menu.checkMenu(projectID);

      saveFilterSelected(projectID);
    });
  }

  addProjectButton() {
    this.elements.addProject?.addEventListener("click", () => {
      const addProjectButton = this.elements.addProject;
      const showProjectForm = this.elements.projectForm;
      addProjectButton.style.display = "none";
      showProjectForm.style.display = "block";
    });
  }

  cancelProjectButton() {
    this.elements.cancelProject?.addEventListener("click", () => {
      const addProjectButton = this.elements.addProject;
      const showProjectForm = this.elements.projectForm;
      addProjectButton.style.display = "block";
      showProjectForm.style.display = "none";
    });
  }

  hideProjectForm() {
    const addProjectButton = this.elements.addProject;
    const showProjectForm = this.elements.projectForm;
    addProjectButton.style.display = "block";
    showProjectForm.style.display = "none";
  }

  // Submit a project
  submitProjectButton() {
    this.elements.submitProject?.addEventListener("click", (e) => {
      e.preventDefault();

      // Query selector of the form
      const form = this.elements.projectForm;

      // Check HTML5 validity
      if (!form.checkValidity()) {
        // This will show the browser's default validation messages
        form.reportValidity();
        return; // stop execution
      }

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Pushing the project into the general array
      allProjects.add(data);
      console.log("new ticket added:", allProjects);

      // Add to localStorage
      saveProjectLocalStorage(allProjects);

      // Update menu DOM
      loopOverTickets.updateMenuDom(allProjects);

      this.hideProjectForm();
    });
  }

  init() {
    this.addProjectButton();
    this.cancelProjectButton();
    this.hideProjectForm();
    this.submitProjectButton();
    this.projectButtons();
  }
}
