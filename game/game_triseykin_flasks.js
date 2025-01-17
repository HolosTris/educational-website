// import {
//   createFlask,
//   createRatingScene,
//   renderStartScene,
//   generateGameScene,
//   toTime,
//   updateFlask,
//   randomInt,
// } from "../game/utils.js";

const container = document.getElementById("container");

container.innerHTML = renderStartScene();

// Start Scene

let nameInput;
let ratingBtn;

let name;
let score;

initStartScene();

function initStartScene() {
  nameInput = document.getElementById("name");
  name = "";
  score = 0;

  initRatingButton();

  nameInput.oninput = () => {
    if (nameInput.value.trim().length == 3) nameInput.classList.add("check");
    else nameInput.classList.remove("check");
  };

  // function checkNick() {}

  nameInput.onkeydown = (ev) => {
    if (ev.key == "Enter" && nameInput.classList.contains("check")) {
      name = nameInput.value.toUpperCase();
      const scoreName = "score_" + name;

      // if (!localStorage.getItem(scoreName)) localStorage.setItem(scoreName, "0");
      // else score = +localStorage.getItem(scoreName);

      renderGameScene();
    }
  };
}

// Game Scene

let flasks = document.getElementsByClassName("flask");
let select = document.getElementById("select");
let pointer = document.getElementById("pointer");
let restartBtn = document.getElementById("restart");
let backBtn = document.getElementById("back-btn");
let timeSpan = document.getElementById("time");
let goalSpan = document.getElementById("goal");
let scoreSpan = document.getElementById("score");

let time = 0;
let goal = 0;
let pointered = -1;
let selected = -1;

const water = [];
const volumes = [];

let timerId;

function renderGameScene() {
  container.innerHTML = generateGameScene();

  flasks = [...document.getElementsByClassName("flask")];
  select = document.getElementById("select");
  pointer = document.getElementById("pointer");
  restartBtn = document.getElementById("restart");
  timeSpan = document.getElementById("time");
  goalSpan = document.getElementById("goal");
  scoreSpan = document.getElementById("score");

  scoreSpan.innerText = score;

  initBackButton();
  initRatingButton();

  movePointerToFlask(0);
  moveSelectToFlask(-1);

  [...flasks].forEach((el, i) => {
    console.log(
      "wat vol attr",
      el.getAttribute("water"),
      el.getAttribute("volume")
    );
    water[i] = +el.getAttribute("water");
    volumes[i] = +el.getAttribute("volume");
    console.log("wat vol", water[i], volumes[i]);

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

  if (!timerId) {
    time = +timeSpan.getAttribute("time");
    timerId = setInterval(() => {
      if (--time > 0) updateTime();
      else {
        timeSpan.innerText = "Время вышло";
        disableFlasks();
        clearInterval(timerId);
        timerId = undefined;

        updateScore();
        score = 0;
      }
    }, 1000);
  }

  // Hint
  const hintTimerId = setTimeout(() => {
    restartBtn.classList.add("hint");
    clearTimeout(hintTimerId);
  }, 10000);

  timeSpan.innerText = toTime(time);

  goal = +document.getElementById("goal").getAttribute("goal");

  restartBtn.onclick = () => {
    renderGameScene();
    clearTimeout(hintTimerId);
    // clearInterval(timerId);
  };
}

function initRatingButton() {
  ratingBtn = document.getElementById("rating-btn");

  ratingBtn.onclick = () => {
    container.innerHTML = createRatingScene();
    initBackButton();
  };
}

function initBackButton() {
  ratingBtn = document.getElementById("back-btn");

  ratingBtn.onclick = () => {
    timerId ? clearInterval(timerId) : "";
    timerId = undefined;

    container.innerHTML = renderStartScene();
    initStartScene();
  };
}

function pour(from, to) {
  const pouringWater =
    water[from] < volumes[to] - water[to]
      ? water[from]
      : volumes[to] - water[to];

  console.log(
    "pourW fromW toWFree",
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
  const victoryFlask = [...flasks].find((el, i) => {
    console.log("wat goal", water[i], goal);

    return water[i] == goal;
  });

  if (!victoryFlask) return;

  score += goal * 10;
  // localStorage.setItem("score_" + name, score); // accumulative version

  updateScore();

  showVictory(victoryFlask);
}

const congrats = [
  "Отлично!",
  "Верно!",
  "Прекрасно!",
  "Шикарно!",
  "Моё почтение!",
];

function showVictory(victoryFlask) {
  const congratsTimerId = setTimeout(() => restartBtn.click(), 2000);
  time += 5;
  updateTime();

  goalSpan.innerText = congrats[randomInt(0, congrats.length - 1)];
  timeSpan.classList.add("frozen");

  victoryFlask.classList.add("congrats");
}

function updateTime() {
  timeSpan.innerText = toTime(time);
}

function updateScore() {
  if (score > localStorage.getItem("score_" + name))
    localStorage.setItem("score_" + name, score);
  scoreSpan.innerText = score;
}

function disableFlasks() {
  for (let flask of flasks) flask.disabled = true;
}

// former utils.js
function generateGameScene() {
  // Могут быть нерешаемые задачи, так как воды может оказаться меньше, чем надо
  const flaskBtns = [];

  const amountOfFlasks = randomInt(2, 5);
  const goal = randomInt(1, 7);
  const flaskVolumes = [];
  const flaskWaters = new Array(amountOfFlasks).fill(0);

  for (let i = 0; i < amountOfFlasks; i++) {
    const volume = randomInt(1, 5);
    flaskVolumes[i] = volume < 5 ? volume : 5;
  }

  if (flaskVolumes.find((el) => el < goal))
    flaskVolumes[randomInt(0, flaskVolumes.length - 1)] = goal + 1;

  let totalWater = Math.max(...flaskVolumes);

  while (totalWater > 0) {
    const rndFlask = randomInt(0, amountOfFlasks - 1);

    if (
      flaskWaters[rndFlask] == goal - 1 &&
      totalWater > 1 &&
      flaskWaters[rndFlask] < flaskVolumes[rndFlask] - 1
    ) {
      flaskWaters[rndFlask] += 2;
      totalWater -= 2;
    } else if (flaskWaters[rndFlask] < flaskVolumes[rndFlask]) {
      flaskWaters[rndFlask]++;
      totalWater--;
    }
  }

  for (let i = 0; i < amountOfFlasks; i++) {
    // regenerate
    if (flaskWaters[i] == goal) {
      console.log("regenerated");

      return generateGameScene();
    }

    flaskBtns.push(createFlask(flaskVolumes[i], flaskWaters[i]));
  }

  const time = 60;
  console.log(flaskBtns);

  return `<span id="score">0</span>
        <span id="time" time="${time}">${toTime(time)}</span>
        <button id="restart"></button>
        <div id="field">
          ${flaskBtns.join("")}
        </div>
        <div id="pointer"></div>
        <div id="select"></div>
        <button id="back-btn"></button>
        <span id="goal" goal="${goal}">Отмерьте ${goal * 10} грамм</span>
        <button id="rating-btn"></button>`;
}

function createFlask(volume, water) {
  console.log("vol wat", volume, water);

  return `<button
    class="flask"
    volume="${volume}"
    water="${water}"
    style="
      background-image: url('./img/flask_${volume}.png')${
    water ? `, url('./img/water_${water}.png')` : ""
  };
    "
  ></button>`;
}

function updateFlask(flask, volume, water) {
  flask.style.backgroundImage = `url('./img/flask_${volume}.png')${
    water ? `, url('./img/water_${water}.png')` : ""
  }`;
}

function toTime(secs) {
  const date = new Date(secs * 1000);
  return date.toISOString().substring(14, 19);
}

function renderStartScene() {
  return `<span>Введите имя</span>
          <input
            type="text"
            name="name"
            id="name"
            autofocus
            minlength="3"
            maxlength="3"
          />
          <button id="rating-btn"></button>`;
}

function createRatingScene() {
  const scores = [];
  let iScore = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.split("_")[0] == "score") {
      console.log(scores[iScore]);

      scores[iScore] = [];
      scores[iScore][0] = key.split("_")[1];
      scores[iScore++][1] = localStorage.getItem(key);
    }
  }

  scores.sort((a, b) => +b[1] - +a[1]);

  const spans = [];

  for (let i = 0; i < 5; i++) {
    if (!scores[i]) spans[i] = `<span>${i + 1}. ***___***</span>`;
    else spans[i] = `<span>${i + 1}. ${scores[i][0]}___${scores[i][1]}</span>`;
  }

  return `<span class="rating-h">| Топ игроков |</span>
        <div id="rating">
          ${spans.join("")}
        </div>
        <button id="back-btn"></button>`;
}

function randomInt(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}
