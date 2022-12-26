import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const timerEl = document.querySelector(`#datetime-picker`);
const btnEl = document.querySelector(`[data-start]`);
const daysEl = document.querySelector(`[data-days]`);
const hoursEl = document.querySelector(`[data-hours]`);
const minutesEl = document.querySelector(`[data-minutes]`);
const secondsEl = document.querySelector(`[data-seconds]`);

let pickedTime = null;
let timeDifference = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    pickedTime = selectedDates[0].getTime();

    if (pickedTime <= Date.now()) {
      btnEl.disabled = true;

      Notiflix.Notify.failure(`Please choose a date in the future`);
    } else {
      btnEl.disabled = false;
    }
  },
  onOpen(selectedDates) {
    pickedTime = selectedDates[0].getTime();

    if (pickedTime === null) {
      btnEl.disabled = true;
    }
  },
};

function disabledBtnOnRestart() {
  if (pickedTime === null) {
    btnEl.disabled = true;
  }
}
disabledBtnOnRestart();

flatpickr(`#datetime-picker`, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onTimerStarter(evt) {
  timerEl.disabled = true;
  btnEl.disabled = true;
  intervalId = setInterval(() => {
    timeDifference = pickedTime - Date.now();
    console.log(timeDifference);
    if (timeDifference <= 0) {
      clearInterval(intervalId);
      return;
    }

    const dataForTimer = convertMs(timeDifference);

    daysEl.textContent = addLeadingZero(dataForTimer.days);
    hoursEl.textContent = addLeadingZero(dataForTimer.hours);
    minutesEl.textContent = addLeadingZero(dataForTimer.minutes);
    secondsEl.textContent = addLeadingZero(dataForTimer.seconds);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, `0`);
}

btnEl.addEventListener(`click`, onTimerStarter);
