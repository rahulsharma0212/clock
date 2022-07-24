/*==================== CLOCK ====================*/
const hour = document.getElementById("clock-hour"),
  minutes = document.getElementById("clock-minutes"),
  seconds = document.getElementById("clock-seconds");

const clock = () => {
  const date = new Date();
  const sec = ((date.getSeconds() + date.getMilliseconds() / 1000) / 60) * 360;
  const min = ((date.getMinutes() + date.getSeconds() / 60) / 60) * 360;
  const hr = ((date.getHours() + date.getMinutes() / 60) / 12) * 360;

  // we add a rotation to element
  hour.style.transform = `rotateZ(${hr}deg)`;
  minutes.style.transform = `rotateZ(${min}deg)`;
  seconds.style.transform = `rotateZ(${sec}deg)`;
  requestAnimationFrame(clock);
};

requestAnimationFrame(clock);

/*==================== CLOCK &  DATE TEXT====================*/
const textHour = document.getElementById("text-hour");
const textMinutes = document.getElementById("text-minutes");
const textAmPm = document.getElementById("text-ampm");
const dateDay = document.getElementById("date-day");
const dateMonth = document.getElementById("date-month");
const dateYear = document.getElementById("date-year");

const clockText = () => {
  let date = new Date();
  let hh = date.getHours();
  let ampm,
    mm = date.getMinutes();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  // We change the hours from 24 to 12 hours and establish whether it is AM or PM
  if (hh >= 12) {
    hh = hh - 12;
    ampm = "PM";
  } else {
    ampm = "AM";
  }
  // We detect when it's 0 AM and transform to 12 AM
  if (hh == 0) {
    hh = 12;
  }

  // Show a zero before hours
  if (hh < 10) {
    hh = `0${hh}`;
  }

  // Show time
  textHour.innerHTML = `${hh}:`;

  // Show a zero before the minutes
  if (mm < 10) {
    mm = `0${mm}`;
  }

  // Show minutes
  textMinutes.innerHTML = mm;

  // Show am or pm
  textAmPm.innerHTML = ampm;

  // We get the months of the year and show it
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let week = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  // We show the day, the month and the year
  dateDay.innerHTML = `${week[date.getDay()] + " ," + day}`;
  // dateWeek.innerHTML = `${week[dayweek]}`
  dateMonth.innerHTML = `${months[month]},`;
  dateYear.innerHTML = year;
};

setTimeout(clockText, 1000);

/*==================== DARK/LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bxs-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bxs-moon" : "bxs-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bxs-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
