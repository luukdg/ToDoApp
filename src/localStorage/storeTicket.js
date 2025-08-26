import ticketCollection from "../components/assignTicket";

// Save variable
export function saveLocalStorage(allTickets) {
  localStorage.setItem("allTickets", JSON.stringify(allTickets));
  console.log("Localstorage saved");
}

export function retrieveLocalStorage() {
  const stored = localStorage.getItem("allTickets");
  if (!stored) return new ticketCollection();
  return ticketCollection.fromJSON(JSON.parse(stored));
}
