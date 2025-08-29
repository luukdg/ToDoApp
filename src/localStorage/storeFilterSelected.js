export function saveFilterSelected(startingID) {
  if (startingID === "today") {
    startingID = 0;
  }
  if (startingID === "week") {
    startingID = 7;
  }
  if (startingID === "all-tasks" || startingID === "default-project") {
    startingID = "All";
  }

  localStorage.setItem("startingID", startingID);
}

export function retrieveFilterSelected() {
  const stored = localStorage.getItem("startingID");
  if (stored === null) return null;

  // If it's a number string, convert it
  if (!isNaN(stored)) {
    return Number(stored);
  }

  // Otherwise return as string (like "All" or "today")
  return stored;
}

export function retrieveFilterID() {
  let stored = localStorage.getItem("startingID");
  if (stored === 0) {
    stored = "today";
  }
  if (stored === 7) {
    stored = "week";
  }
  if (stored === "All") {
    stored === "all-tasks";
  }

  return stored;
}

export function initFilterSelected(defaultValue) {
  // Check if we already have a stored value
  if (localStorage.getItem("startingID") === null) {
    localStorage.setItem("startingID", defaultValue);
  }
}
