export let currentDateFilter = "All";

export function saveDate(input) {
  currentDateFilter = input;
}

export let currentProjectFilter = "default-project";

export function saveProject(input) {
  currentProjectFilter = input;
}
