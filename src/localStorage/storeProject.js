import projectCollection from "../components/assignProject";

// Save variable
export function saveProjectLocalStorage(allProjects) {
  localStorage.setItem("allProjects", JSON.stringify(allProjects));
  console.log("Localstorage project saved:", allProjects);
}

export function retrieveProjectLocalStorage() {
  const stored = localStorage.getItem("allProjects");
  if (!stored) return new projectCollection();
  return projectCollection.fromJSON(JSON.parse(stored));
}
