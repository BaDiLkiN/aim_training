const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let colors = ['red', 'purple', 'green', 'yellow', 'blue', 'pink', 'white'];
let time = 0;
let score = 0;
startBtn.addEventListener('click', (e) => {
  e.preventDefault();
  screens[0].classList.add('up');
});
timeList.addEventListener('click', (e) => {
  if (e.target.classList.contains('time-btn')) {
    time = parseInt(e.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
});
board.addEventListener('click', (e) => {
  if (e.target.classList.contains('circle')) {
    score++;
    e.target.remove();
    createRandomCircle();
  }
});
function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}
function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(t) {
  timeEl.innerHTML = `00:${t}`;
}
function finishGame() {
  board.innerHTML = `<h1>Ваш Счет: <span class="primary">${score}</span></h1>`;
  timeEl.parentNode.classList.add('hide');
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const color = getRandomColor(colors);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width);
  const y = getRandomNumber(0, height);
  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${x}px`;
  circle.style.left = `${y}px`;
  circle.style.background = color;
  board.append(circle);
}

function getRandomColor(arr) {
  let i = Math.floor(Math.random() * arr.length);
  return arr[i];
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function cheatIsGood(t) {
  setInterval(click, t);
  function click() {
    const circle = board.querySelector('.circle');
    if (circle) {
      circle.click();
    }
  }
}
