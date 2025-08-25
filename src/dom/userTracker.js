export let userTracker = "All";

export function setFilter(filterId) {
  userTracker = filterId;
}

// "All" = All Tasks
// 7 = Week filter
// 0 = Today filter
