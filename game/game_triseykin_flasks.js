import {
  createFlask,
  createRating,
  generateGameScene,
  toTime,
  updateFlask,
} from "./utils.js";

const container = document.getElementById("container");

const nameInput = document.getElementById("name");
let ratingBtn;

initRatingButton();

nameInput.oninput = (ev) => {
  if (nameInput.value.trim().length == 3) nameInput.classList.add("check");
  else nameInput.classList.remove("check");
};

// function checkNick() {}
let name = "";
let score = 0;

nameInput.onkeydown = (ev) => {
  if (ev.key == "Enter" && nameInput.classList.contains("check")) {
    name = nameInput.value.toUpperCase();
    const scoreName = "score_" + name;

    if (!localStorage.getItem(scoreName)) localStorage.setItem(scoreName, "0");
    else score = +localStorage.getItem(scoreName);

    renderGameScene();
  }
};

// Game Scene

let flasks = document.getElementsByClassName("flask");
let select = document.getElementById("select");
let pointer = document.getElementById("pointer");
let restartBtn = document.getElementById("restart");
let timeSpan = document.getElementById("time");
let scoreSpan = document.getElementById("score");

let time = 0;
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
  scoreSpan = document.getElementById("score");

  scoreSpan.innerText = score;

  initRatingButton();

  movePointerToFlask(0);
  moveSelectToFlask(-1);

  [...flasks].forEach((el, i) => {
    water.push(+el.getAttribute("water"));
    volumes.push(+el.getAttribute("volume"));

    el.onclick = () => {
      if (selected == -1) {
        moveSelectToFlask(i);
      } else if (selected == i) {
        moveSelectToFlask();
      } else {
        pour(selected, i);
        moveSelectToFlask();
      }

      // movePointerToFlask(-1);
    };
  });

  time = +timeSpan.getAttribute("time");
  goal = +document.getElementById("goal").getAttribute("goal");

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

function initRatingButton() {
  ratingBtn = document.getElementById("rating-btn");

  ratingBtn.onclick = () => {
    container.innerHTML = createRating();
  };
}

function pour(from, to) {
  const pouringWater =
    water[from] < volumes[to] - water[to]
      ? water[from]
      : volumes[to] - water[to];

  console.log(
    "pourW fromW toW",
    pouringWater,
    water[from],
    volumes[to] - water[to]
  );

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
  // if (i == pointered) return;

  // pointer.hidden = false;
  // const x =
  //   flasks[i].getBoundingClientRect().left -
  //   container.getBoundingClientRect().left;
  // pointer.style = `left: ${x}px`;
}

function moveSelectToFlask(i = -1) {
  // if (i == selected) return;

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
  if (
    [...flasks].find((el, i) => {
      console.log("wat goal", water[i], goal);

      return water[i] == goal;
    }) === undefined
  )
    return;

  score += goal * 10;
  localStorage.setItem("score_" + name, score);

  restartBtn.click();
  scoreSpan.innerText = score;
}

function updateScore() {}
