export let userTracker = 1; // 1 could represent the default filter

export function setFilter(filterId) {
  userTracker = filterId;
}

// "All" = All Tasks
// 7 = Week filter
// 0 = Today filter
