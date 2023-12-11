const timer = document.querySelector(".timer");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const clear = document.getElementById("clear");
const h = document.getElementById("h");
const m = document.getElementById("m");
const s = document.getElementById("s");
let seconds = 0;
let minutes = 0;
let hours = 0;
let interval;
let isPaused = false;
let isInitialized = false;

const addZeroAtLeft = (num) => {
  return num < 10 ? `0${num}` : num;
};

const updateTimer = () => {
  ++seconds;
  s.innerText = addZeroAtLeft(seconds);
  if (seconds === 60) {
    seconds = 0;
    s.innerText = "00";
    ++minutes;
    m.innerText = addZeroAtLeft(minutes);
  }

  if (minutes === 60) {
    minutes = 0;
    m.innerText = "00";
    ++hours;
    h.innerText = addZeroAtLeft(hours);
  }

  if (hours === 24) {
    clearTimer();
    interval = setInterval(updateTimer, 1000);
  }
};

const clearTimer = () => {
  clearInterval(interval);
  timer.classList.remove("paused");
  seconds = 0;
  minutes = 0;
  hours = 0;
  s.innerText = "00";
  m.innerText = "00";
  h.innerText = "00";
};

start.addEventListener("click", () => {
  if (isInitialized) {
    clearTimer();
    isInitialized = false;
  } else {
    interval = setInterval(updateTimer, 1000);
    isInitialized = true;
  }
});

pause.addEventListener("click", () => {
  if (isInitialized) {
    if (!isPaused) {
      timer.classList.add("paused");
      clearInterval(interval);
      isPaused = true;
    } else {
      timer.classList.remove("paused");
      interval = setInterval(updateTimer, 1000);
      isPaused = false;
    }
  }
});

clear.addEventListener("click", clearTimer);
