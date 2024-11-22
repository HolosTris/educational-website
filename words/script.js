const head = document.getElementById("header");
const aside = document.getElementById("aside");

const input = document.getElementById("input");
const btn = document.getElementById("parsing");
const output = document.getElementById("output");

btn.onclick = parse;
input.onkeydown = (ev) => {
  if (ev.key == "Enter") parse();
};

const colors = [
  "#FFADAD",
  "#FFD6A5",
  "#FDFFB6",
  "#CAFFBF",
  "#9BF6FF",
  "#A0C4FF",
  "#BDB2FF",
  "#FFC6FF",
];

// Test
// input.value = "лес - бочка - 20 - бык - крик - 3 - Бок";
// btn.click();

function parse() {
  const text = input.value;

  const arr = text
    .split("-")
    .map((el) => el.trim())
    .filter((el) => el);

  head.innerHTML = "";

  const wordDiv = document.createElement("div");
  wordDiv.className = "word";
  wordDiv.draggable = true;
  // wordDiv.ondragstart = () => false;

  const map = new Map(); // frrf--rf-  - rf
  let [nA, nB, nN] = [1, 1, 1];
  for (let word of arr) {
    // word = word.trim();

    map.set(
      `${+word}` == word
        ? "n" + nN++
        : word[0].toLowerCase() == word[0]
        ? "a" + nA++
        : "b" + nB++,
      word
    );
  }

  for (let [key, word] of new Map([...map.entries()].sort())) {
    const newWordDiv = wordDiv.cloneNode();
    newWordDiv.innerText = key + " " + word;
    newWordDiv.color = colors[Math.floor(Math.random() * 8)];
    // newWordDiv.style.color = newWordDiv.color;
    newWordDiv.ondragstart = (ev) => dragStart(newWordDiv, ev);
    head.insertAdjacentElement("beforeend", newWordDiv);
  }
}

function dragStart(elem, ev) {
  let shiftX = ev.clientX - elem.getBoundingClientRect().left;
  let shiftY = ev.clientY - elem.getBoundingClientRect().top;
  // console.log(elem, ev);

  const dragElem = elem.cloneNode(true);
  dragElem.origin = elem.origin || elem;
  dragElem.ondragstart = (ev) => dragStart(dragElem, ev);
  dragElem.onclick = () =>
    outputText(dragElem.innerText.split(" ")[1], dragElem.origin.color);
  elem.style.display = "none";

  dragElem.style.position = "fixed";
  dragElem.style.zIndex = 1000;
  document.body.append(dragElem);

  moveAt(ev.pageX, ev.pageY);

  function moveAt(pageX, pageY) {
    dragElem.style.left = pageX - shiftX + "px";
    dragElem.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(ev) {
    moveAt(ev.pageX, ev.pageY);
  }

  document.onmousemove = onMouseMove;

  dragElem.onmouseup = (ev) => {
    dragElem.hidden = true;
    if (document.elementFromPoint(ev.clientX, ev.clientY).closest("#aside")) {
      document.onmousemove = null;
      dragElem.onmouseup = null;
      dragElem.hidden = false;
      dragElem.style.background = elem.color;
      aside.append(dragElem);

      if (elem != dragElem.origin) elem.remove();
    } else if (
      document.elementFromPoint(ev.clientX, ev.clientY).closest("#header")
    ) {
      elem.origin.style.display = null;
      dragElem.remove();
      elem.remove();
    } else {
      dragElem.remove();
      elem.style.display = null;
    }
  };
}

function outputText(text, color) {
  if (output.querySelector("span")) output.innerHTML = "";
  output.innerHTML += ` <strong style="color: ${color}">${text}<strong>`;
}
