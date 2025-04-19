import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (selectedDates[0] < new Date()) {
      iziToast.warning({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#EF4040',
        theme: 'dark',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
    console.log(selectedDates[0]);
  },
};

flatpickr(input, options);

startButton.disabled = true;

startButton.addEventListener('click', start);

function start() {
  startButton.disabled = true;
  input.disabled = true;

  const timerInterval = setInterval(() => {
    const currentTime = new Date();
    const remainingTime = userSelectedDate - currentTime;

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      resetTimerDisplay();
      input.disabled = false;
      startButton.disabled = true;

      iziToast.success({
        title: 'Success',
        message: 'The countdown has finished!',
        position: 'topRight',
        backgroundColor: '#59A10D',
        theme: 'dark',
      });

      return;
    }
    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

function resetTimerDisplay() {
  updateTimerDisplay(0, 0, 0, 0);
}
