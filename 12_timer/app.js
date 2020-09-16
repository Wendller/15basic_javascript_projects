const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

//? let futureDate = new Date(2020, 8, 20, 11, 30, 0);
let futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30);

const year = futureDate.getFullYear();
let month = futureDate.getMonth();
month = months[month];
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on 
${weekday}, ${month} ${year} ${hours}: ${minutes}am `;

//? future time in ms
const futureTime = futureDate.getTime();

function getRemainigTime() {
  const today = new Date().getTime();
  const t = futureTime - today;


  //? values in ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  
  //? all values
  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  //? set values array
  const values = [days, hours, minutes, seconds];

  function format(item) {
    return item < 10 ? (item = `0${item}`) : item;
  }

  items.forEach(function(item, index) {
    item.innerHTML = format(values[index]);
  });

  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`;
  }
}

//! countdown
let countdown = setInterval(getRemainigTime, 1000);
getRemainigTime();