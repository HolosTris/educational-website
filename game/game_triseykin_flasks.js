import {
  createFlask,
  generateGameScene,
  toTime,
  updateFlask,
} from "./utils.js";

const container = document.getElementById("container");

const nameInput = document.getElementById("name");

nameInput.oninput = (ev) => {
  if (nameInput.value.trim().length == 3) nameInput.classList.add("check");
  else nameInput.classList.remove("check");
};

// function checkNick() {}

nameInput.onkeydown = (ev) => {
  if (ev.key == "Enter" && nameInput.classList.contains("check"))
    renderGameScene();
};

// Game Scene

let flasks = document.getElementsByClassName("flask");
let select = document.getElementById("select");
let pointer = document.getElementById("pointer");
let restartBtn = document.getElementById("restart");
let timeSpan = document.getElementById("time");

let time = 0;
let score = 0;
let goal = 0;
let pointered = -1;
let selected = -1;

const water = [];
const volumes = [];

function renderGameScene() {
  container.innerHTML = generateGameScene();

  flasks = [...document.getElementsByClassName("flask")];
  select = document.getElementById("select");
  pointer = document.getElementById("pointer");
  restartBtn = document.getElementById("restart");
  timeSpan = document.getElementById("time");

  [...flasks].forEach((el, i) => {
    water.push(+el.getAttribute("water"));
    volumes.push(+el.getAttribute("volume"));

    el.onclick = () => {
      movePointerToFlask(-1);

      if (selected == -1) {
        moveSelectToFlask(i);
      } else if (selected == i) {
        moveSelectToFlask(-1);
      } else pour(selected, i);
    };
  });

  movePointerToFlask(0);
  moveSelectToFlask(-1);

  time = +timeSpan.getAttribute("time");
  goal = +document.getElementById("time").getAttribute("goal") / 10;

  const timerId = setInterval(() => {
    if (--time > 0) timeSpan.innerText = toTime(time);
    else {
      timeSpan.innerText = "Время вышло";
      clearInterval(timerId);
    }
  }, 1000);

  restartBtn.onclick = () => {
    renderGameScene();
    clearInterval(timerId);
  };
}

function pour(from, to) {
  moveSelectToFlask(-1);

  const pouringWater =
    water[from] < volumes[to] - water[to]
      ? water[from]
      : volumes[to] - water[to];

  if (!pouringWater) {
    flasks[from].classList.add("non-pouring");
    setTimeout(() => flasks[from].classList.remove("non-pouring"), 3000);
    return;
  }

  flasks[from].classList.add("pouring");
  setTimeout(() => flasks[from].classList.remove("pouring"), 3000);

  water[from] -= pouringWater;
  water[to] += pouringWater;

  updateFlask(flasks[from], volumes[from], water[from]);
  updateFlask(flasks[to], volumes[to], water[to]);

  checkVictory();
}

function movePointerToFlask(i = -1) {
  if (i == -1) {
    pointer.hidden = true;
    return;
  }
  if (i == pointered) return;

  pointer.hidden = false;
  const x =
    flasks[i].getBoundingClientRect().left -
    container.getBoundingClientRect().left;
  pointer.style = `left: ${x}px`;
}

function moveSelectToFlask(i = -1) {
  if (i == selected) return;

  selected = i;

  if (i == -1) {
    select.hidden = true;
    return;
  }

  select.hidden = false;

  const x =
    flasks[i].getBoundingClientRect().left -
    container.getBoundingClientRect().left;
  select.style = `left: ${x}px`;
}

function checkVictory() {
  if (![...flasks].find((el, i) => water[i] == goal)) return;

  score += goal * 10;
  restartBtn.click();
}

function updateScore() {}
