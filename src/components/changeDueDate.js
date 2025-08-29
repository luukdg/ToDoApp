import { format } from "date-fns";

// Current time
const today = new Date();

// For showing tickets of tomorrow
const tomorrow = Date(today, 1);
console.log(tomorrow);

const dateInput = document.querySelector("#start");

const todayStr = format(today, "yyyy-MM-dd");

dateInput.value = todayStr;
dateInput.min = todayStr;
dateInput.max = "2025-08-30";
