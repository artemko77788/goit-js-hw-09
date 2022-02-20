function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};
let timerId = null;

refs.buttonStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  refs.buttonStart.setAttribute('disabled', true);
});
refs.buttonStop.addEventListener('click', () => {
  clearInterval(timerId);
  refs.buttonStart.removeAttribute('disabled');
});
