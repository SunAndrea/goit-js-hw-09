const btnStartEl = document.querySelector(`[data-start]`);
const btnStopEl = document.querySelector(`[data-stop]`);
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onBtnStartColorSwitcher() {
  btnStartEl.disabled = true;
  btnStopEl.disabled = false;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onBtnStopColorSwitcher() {
  btnStartEl.disabled = false;
  btnStopEl.disabled = true;
  clearInterval(timerId);
}

btnStartEl.addEventListener(`click`, onBtnStartColorSwitcher);
btnStopEl.addEventListener(`click`, onBtnStopColorSwitcher);
