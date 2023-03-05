import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const calendar = document.querySelector('#datetime-picker');
const timer = document.querySelector('#timer');
const btn = document.querySelector('[data-start]');
const sec = document.querySelector('[data-seconds]');
const min = document.querySelector('[data-minutes]');
const hour = document.querySelector('[data-hours]');
const day = document.querySelector('[data-days]');

let intervalId = null;

btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange(selectedDates) {
    const date = Date.now();
    if (calendarTimer.selectedDates[0] - date < 0) {
     Notiflix.Notify.failure(
      'Please choose a date in the future',
      {
        timeout: 2000,
       },
     );
      btn.disabled = true;
      return;
    }
    btn.disabled = false;
  },
};

const calendarTimer = flatpickr('#datetime-picker', options);

btn.addEventListener('click', () => {
  intervalId = setInterval(onSetInterval, 1000);
  btn.disabled = true;
  calendar.disabled = true;
  sec.classList.add('active');
  min.classList.add('active');
  hour.classList.add('active');
  day.classList.add('active');
});

function onSetInterval() {
  const date = Date.now();
  let timeTrans = calendarTimer.selectedDates[0] - date;
  if (timeTrans <= 0) {
    clearInterval(intervalId);
    // sec.textContent = '00';
    // min.textContent = '00';
    // hour.textContent = '00';
    // day.textContent = '00';
    return;
  }

  let fullTime = convertMs(timeTrans);
  sec.textContent = fullTime.seconds.toString().padStart(2, '0');
  min.textContent = fullTime.minutes.toString().padStart(2, '0');
  hour.textContent = fullTime.hours.toString().padStart(2, '0');
  day.textContent = fullTime.days.toString().padStart(2, '0');
}

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
};