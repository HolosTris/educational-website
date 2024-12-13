// export function createStartScene() {};

export function generateGameScene() {
  // Могут быть нерешаемые задачи, так как воды может оказаться меньше, чем надо
  const flaskBtns = [];

  const amountOfFlasks = Math.floor(Math.random() * 4 + 2);
  const goal = Math.floor(Math.random() * 4 + 1);
  const flaskVolumes = [];
  const flaskWaters = new Array(amountOfFlasks).fill(0);

  for (let i = 0; i < amountOfFlasks; i++) {
    const volume = goal + Math.floor(Math.random() * 4 + 1);
    flaskVolumes[i] = volume < 5 ? volume : 5;
  }

  let totalWater = Math.max(...flaskVolumes);

  while (totalWater > 0) {
    const rndFlask = Math.floor(Math.random() * amountOfFlasks);

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
        <span id="goal" goal="${goal}">Отмерьте ${goal * 10} грамм</span>
        <button id="rating-btn"></button>`;
}

export function createFlask(volume, water) {
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

export function updateFlask(flask, volume, water) {
  flask.style.backgroundImage = `url('./img/flask_${volume}.png')${
    water ? `, url('./img/water_${water}.png')` : ""
  }`;
}

export function toTime(secs) {
  const date = new Date(secs * 1000);
  return date.toISOString().substring(14, 19);
}

export function createRating() {
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
        </div>`;
}
