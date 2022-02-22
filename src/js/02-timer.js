import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  timeSetInput: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),

  allTime: {
    dataDays: document.querySelector('[data-days]'),
    dataHours: document.querySelector('[data-hours]'),
    dataMinutes: document.querySelector('[data-minutes]'),
    dataSeconds: document.querySelector('[data-seconds]'),
  },
};
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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

flatpickr(refs.timeSetInput, {
  enableSeconds: true,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedDates[0].getTime();
    refs.button.disabled = true;
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
      return;
    }
    refs.button.disabled = false;
    refs.button.addEventListener('click', () => {
      refs.button.disabled = true;
      refs.timeSetInput.disabled = true;

      const timer = {
        isActive: false,
        start() {
          if (this.isActive) {
            return;
          }
          this.isActive = true;

          const timerId = setInterval(() => {
            const todayTime = selectedDates[0].getTime();
            const currentTime = Date.now();
            const countDownDate = todayTime - currentTime;

            const { days, hours, minutes, seconds } = convertMs(countDownDate);
            if (countDownDate < 0) {
              clearInterval(timerId);
              refs.button.disabled = false;
              refs.timeSetInput.disabled = false;
              return;
            }
            refs.allTime.dataDays.textContent = days;
            refs.allTime.dataHours.textContent = hours;
            refs.allTime.dataMinutes.textContent = minutes;
            refs.allTime.dataSeconds.textContent = seconds;
          }, 1000);
        },
      };
      timer.start();
    });
  },
});
