import projectCollection from "../components/assignTicket";

// Save variable
export function saveLocalStorage(allProjects) {
  localStorage.setItem("allProjects", JSON.stringify(allProjects));
  console.log("Localstorage saved");
}

export function retrieveLocalStorage() {
  const stored = localStorage.getItem("allProjects");
  if (!stored) return new projectCollection();
  return projectCollection.fromJSON(JSON.parse(stored));
}
