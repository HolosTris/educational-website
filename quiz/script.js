let quiz = shuffleArray(questions);
let rightAns = [];
let numRightAns = 0;

for (let i = 0; i < quiz.length; i++) {
  rightAns[i] = quiz[i].answers[0];
  quiz[i].answers = shuffleArray(quiz[i].answers);
}

// let iQuestion = 0;

// Start quiz

const container = document.getElementById("container");
// container.innerHTML = questionHTML;

// start();
let questionElem;

let explanationElem;

const selectBtn = document.getElementById("select-btn");

selectBtn.onclick = () =>
  showRightAnswer(
    iQuestion,
    +document.querySelector(`input[name="answer-${iQuestion}"]:checked`).value
  );

const nextBtn = document.getElementById("next-btn");

nextBtn.onclick = () => {
  closeQuestion(iQuestion);

  const questionCon = document.getElementById(`question-${iQuestion}`);

  questionCon.onclick = () => {
    if (
      questionCon.getElementsByClassName("explanation")[0].style.display ==
      "none"
    )
      openQuestion(+questionCon.id.slice(-1));
    else closeQuestion(+questionCon.id.slice(-1));
  };

  showQuestion(++iQuestion);
};

showQuestion(0);

// const customQuestionCon = document.getElementById("custom-question");

const expandBtn = document.getElementById("expand-btn");

// expandBtn.onclick = () => (customQuestionCon.innerHTML = customQuestionHTML);

// Results

const finishBtn = document.getElementById("finish-btn");
finishBtn.style.display = "none";

finishBtn.onclick = () => showStats();

// Functions

function showQuestion(i) {
  console.log(iQuestion);
  container
    .getElementsByClassName("submit-btn")[0]
    .insertAdjacentHTML("beforebegin", createQuestionHTML());

  questionElem =
    document.getElementsByClassName("question")[
      document.getElementsByClassName("question").length - 1
    ];

  explanationElem =
    document.getElementsByClassName("explanation")[
      document.getElementsByClassName("explanation").length - 1
    ];

  questionElem.classList = "question";
  questionElem.innerText = `${i + 1}. ` + quiz[i].question;

  const answerAElem = document.querySelector(
    `label[for="answer-${iQuestion}-0"]`
  );
  answerAElem.innerText = quiz[i].answers[0];

  const answerBElem = document.querySelector(
    `label[for="answer-${iQuestion}-1"]`
  );
  answerBElem.innerText = quiz[i].answers[1];

  const answerCElem = document.querySelector(
    `label[for="answer-${iQuestion}-2"]`
  );
  answerCElem.innerText = quiz[i].answers[2];

  const answerDElem = document.querySelector(
    `label[for="answer-${iQuestion}-3"]`
  );
  answerDElem.innerText = quiz[i].answers[3];

  // Clear selected
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  const selectedLabel = document.querySelector(
    'input[name="answer"]:checked+label'
  );

  if (selectedAnswer != null) {
    selectedAnswer.checked = false;
    selectedLabel.classList.remove("correct", "incorrect");
  }

  document
    .querySelectorAll(`input[name="answer"]+label`)
    .forEach((elem) => elem.classList.remove("slide-right"));

  explanationElem.style.display = "none";
  nextBtn.style.display = "none";
  selectBtn.style.display = "block";

  enableRadios();
}

function closeQuestion(i) {
  const questionCon = document.getElementById(`question-${i}`);

  questionCon.classList.add("answered");

  for (let inp of questionCon.getElementsByClassName("input-con")) {
    inp.style.display = "none";
    inp.children[0].disabled = true;
  }

  questionCon.getElementsByClassName("explanation")[0].style.display = "none";
}

function openQuestion(i) {
  const questionCon = document.getElementById(`question-${i}`);

  // questionCon.classList.add("answered");

  for (let inp of questionCon.getElementsByClassName("input-con"))
    inp.style.display = "block";

  questionCon.getElementsByClassName("explanation")[0].style.display = "block";
}

function showRightAnswer(iQuestion, iAnswer) {
  // const explanationElem = document.getElementById("explanation");
  explanationElem.style.display = "block";

  const answerElems = document.querySelectorAll(
    `input[name="answer-${iQuestion}"]+label`
  );

  answerElems.forEach((elem) => elem.classList.add("slide-right"));
  answerElems[iAnswer].classList.remove("slide-right");

  // const questionElem = document.getElementById("question");
  const answerElem = document.querySelector(
    `label[for="answer-${iQuestion}-${iAnswer}"]`
  );

  if (rightAns[iQuestion] === quiz[iQuestion].answers[iAnswer]) {
    explanationElem.innerHTML =
      "<strong>Да!</strong> " + quiz[iQuestion].explanation;

    questionElem.classList.add("correct");
    answerElem.classList.add("correct");
    quiz[iQuestion].correct = true;
    numRightAns++;

    // answerElems[iAnswer].classList.remove("slide-right");
  } else {
    explanationElem.innerHTML =
      "<strong>Нет.</strong> " + quiz[iQuestion].explanation;

    questionElem.classList.add("incorrect");
    answerElem.classList.add("incorrect");
    quiz[iQuestion].correct = false;
  }

  disableRadios();

  selectBtn.style.display = "none";

  if (iQuestion != quiz.length - 1) nextBtn.style.display = "block";
  else finishBtn.style.display = "block";
}

function disableRadios() {
  const radios = document.querySelectorAll(`input[name="answer-${iQuestion}"]`);

  for (let i = 0; i < radios.length; i++) radios[i].disabled = true;
}

function enableRadios() {
  const radios = document.querySelectorAll(`input[name="answer-${iQuestion}"]`);

  for (let i = 0; i < radios.length; i++) radios[i].disabled = false;
}

function showStats() {
  container.innerHTML = resultsHTML;

  document.getElementById(
    "results-span"
  ).innerText += ` ${numRightAns}/${quiz.length}`;

  const resultsCon = document.getElementById("results");

  for (let qu of quiz) {
    resultsCon.insertAdjacentHTML(
      "beforeend",
      `
          <div class="input-con">
            <p class="${qu.correct ? "correct" : "incorrect"}">
              ${qu.question} — <strong>${
        qu.correct ? "Верно!" : "Неверно."
      }</strong>
            </p>
          </div>`
    );
  }

  const restartBtn = document.getElementById("restart-btn");

  restartBtn.onclick = () => start();
}

function start() {
  // quiz = shuffleArray(questions);
  // rightAns = [];
  // numRightAns = 0;

  // for (let i = 0; i < quiz.length; i++) {
  //   rightAns[i] = quiz[i].answers[0];
  //   quiz[i].answers = shuffleArray(quiz[i].answers);
  // }

  // iQuestion = 0;

  // const container = document.getElementById("container");
  // container.innerHTML = quizHTML;

  location.reload();
}

// Utils

function shuffleArray(array) {
  const newArr = array;

  for (var i = array.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return newArr;
}
