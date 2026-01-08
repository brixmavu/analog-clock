const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');
const digitalClock = document.getElementById('digital-clock');
const buttons = document.querySelectorAll('.controls button');
let currentFormat = '12h';

function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondsDeg = ((seconds / 60) * 360) + 90;
  const minutesDeg = ((minutes / 60) * 360) + ((seconds/60)*6) + 90;
  const hoursDeg = (((hours % 12) / 12) * 360) + ((minutes / 60) * 30) + 90;

  hourHand.style.transform = `translate(-50%, -100%) rotate(${hoursDeg}deg)`;
  minuteHand.style.transform = `translate(-50%, -100%) rotate(${minutesDeg}deg)`;
  secondHand.style.transform = `translate(-50%, -100%) rotate(${secondsDeg}deg)`;

  updateDigitalClock(hours, minutes, seconds);
}

function updateDigitalClock(hours, minutes, seconds) {
  let displayHours = hours;
  let meridiem = '';

  if (currentFormat === '12h') {
    meridiem = hours >= 12 ? ' PM' : ' AM';
    displayHours = hours % 12 || 12;
    digitalClock.textContent = `${pad(displayHours)}:${pad(minutes)}:${pad(seconds)}${meridiem}`;
  } else {
    digitalClock.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFormat = btn.getAttribute('data-format');
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

buttons[0].classList.add('active');
setInterval(updateClock, 1000);
updateClock();