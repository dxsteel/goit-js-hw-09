// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
require("flatpickr/dist/themes/dark.css");
import Notiflix from 'notiflix';

const refs = {
    startButton: document.querySelector('button[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}
const dateTime = document.querySelector("#datetime-picker");
refs.startButton.setAttribute('disabled', true);

const timer = {
    timerId: null,
    isActive: false,
    start(startTime) {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        this.timerId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = startTime - currentTime;
            const time = convertMs(deltaTime);
            console.log(time);
            refs.days.innerHTML = time.days;
            refs.hours.innerHTML = time.hours;
            refs.minutes.innerHTML = time.minutes;
            refs.seconds.innerHTML = time.seconds;
            if (time.days === "00" && time.hours === "00" && time.minutes === "00" && time.seconds === "00") {
                clearInterval(this.timerId);
                refs.startButton.removeAttribute('disabled');
                this.isActive = true;
                Notiflix.Report.success('Time is over');
            }
        }, 1000);
    },
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const endTime = selectedDates[0].getTime();
        console.log(selectedDates);
        refs.startButton.removeAttribute('disabled')
        if (endTime < Date.now()) {
            console.log(selectedDates);
            refs.startButton.setAttribute('disabled', true);
            Notiflix.Notify.warning('Please choose a date in the future');
            return;
        }
        else { refs.startButton.removeAttribute('disabled') }
        refs.startButton.addEventListener("click", () => {
            timer.start(endTime);
            refs.startButton.setAttribute('disabled', true);
            dateTime.setAttribute('disabled', true)
        });
  },
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

flatpickr(dateTime, options);
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}