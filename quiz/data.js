// Misc
let iQuestion = 0;

const questions = [
  {
    question: "Когда с человеком может произойти дрожемент?",
    explanation:
      "Лексема «дрожемент» имплицирует состояние крайнего напряжения и страха: «У меня всегда дрожемент в ногах, когда копы подходят».",
    answers: [
      "Когда он боится, пугается",
      "Когда он влюбляется",
      "Когда он идёт шопиться",
      "Когда он слышит смешную шутку",
    ],
  },
  {
    question: "Говорят, Антон заовнил всех. Это еще как понимать?",
    explanation:
      "Термин «заовнить» заимствован из английского языка, он происходит от слова own и переводится как «победить», «завладеть», «получить».",
    answers: [
      "Молодец, Антон, всех победил!",
      "Как так, заовнил? Ну и хамло. Кто с ним теперь дружить-то будет?",
      "Антон очень надоедливый и въедливый человек, всех задолбал",
      "Нет ничего плохого в том, что Антон тщательно выбирает себе друзей",
    ],
  },
  {
    question: "А фразу «заскамить мамонта» как понимать?",
    explanation:
      "Заскамить мамонта — значит обмануть или развести на деньги. Почему мамонта? Потому что мошенники часто выбирают в жертвы пожилых людей (древних, как мамонты), которых легко обвести вокруг пальца.",
    answers: [
      "Развести недотёпу на деньги",
      "Разозлить кого-то из родителей",
      "Увлекаться археологией",
      "Оскорбить пожилого человека",
    ],
  },
  {
    question: "Кто такие бефефе?",
    explanation:
      "Бефефе — это лучшие друзья. Этакая аббревиатура от английского выражения best friends forever.",
    answers: [
      "Лучшие друзья",
      "Вши?",
      "Милые котики, такие милые, что бефефе",
      "Люди, которые не держат слово",
    ],
  },
];

function createQuestionHTML() {
  return `
        <div class="question-con" id="question-${iQuestion}">
          <hr />
          <strong class="question"> </strong>
          <div class="input-con">
            <input type="radio" id="answer-${iQuestion}-0" name="answer-${iQuestion}" value="0" />
            <label for="answer-${iQuestion}-0"></label>
          </div>
          <div class="input-con">
            <input type="radio" id="answer-${iQuestion}-1" name="answer-${iQuestion}" value="1" />
            <label for="answer-${iQuestion}-1"></label>
          </div>
          <div class="input-con">
            <input type="radio" id="answer-${iQuestion}-2" name="answer-${iQuestion}" value="2" />
            <label for="answer-${iQuestion}-2"></label>
          </div>
          <div class="input-con">
            <input type="radio" id="answer-${iQuestion}-3" name="answer-${iQuestion}" value="3" />
            <label for="answer-${iQuestion}-3"></label>
          </div>
          <div class="explanation"></div>
        </div>`;
}

const questionHTML = `
        <div class="question-con">
          <hr />
          <strong class="question"> </strong>
          <div class="input-con">
            <input type="radio" id="answer-${iQuestion}-0" name="answer" value="0" />
            <label for="answer-${iQuestion}-0"></label>
          </div>
          <div class="input-con">
            <input type="radio" id="answer-${iQuestion}-1" name="answer" value="1" />
            <label for="answer-${iQuestion}-1"></label>
          </div>
          <div class="input-con">
            <input type="radio" id="answer-${iQuestion}-2" name="answer" value="2" />
            <label for="answer-${iQuestion}-2"></label>
          </div>
          <div class="input-con">
            <input type="radio" id="answer-${iQuestion}-3" name="answer" value="3" />
            <label for="answer-${iQuestion}-3"></label>
          </div>
          <div class="explanation"></div>
        </div>`;

const resultsHTML = `
        <h1>Мини-квиз</h1>
        <hr />
        <strong id="results-span">Итоги: </strong>
        <div id="results">
        </div>
        <button class="submit-btn" id="restart-btn">Начать сначала</button>`;

const customQuestionHTML = `<h2>Новый вопрос</h2>
        <hr />
        <p>Введите вопрос, варианты ответа и отметьте правильный.</p>
        <input
          type="text"
          name="own-question"
          id="own-question"
          placeholder="Вопрос"
        />
        <div class="input-con">
          <input
            type="radio"
            id="own-answer-0-check"
            name="own-answer-2heck"
            value="0"
          />
          <label for="own-answer-0-check"></label>
          <input
            type="text"
            name="own-answer-0"
            id="own-answer-0"
            class="own-answer"
            placeholder="Ответ A"
          />
        </div>
        <div class="input-con">
          <input
            type="radio"
            id="own-answer-1-check"
            name="own-answer-2heck"
            value="1"
          />
          <label for="own-answer-1-check"></label>
          <input
            type="text"
            name="own-answer-1"
            id="own-answer-1"
            class="own-answer"
            placeholder="Ответ B"
          />
        </div>
        <div class="input-con">
          <input
            type="radio"
            id="own-answer-2-check"
            name="own-answer-2heck"
            value="2"
          />
          <label for="own-answer-2-check"></label>
          <input
            type="text"
            name="own-answer-2"
            id="own-answer-2"
            class="own-answer"
            placeholder="Ответ C"
          />
        </div>
        <div class="input-con">
          <input
            type="radio"
            id="own-answer-3-check"
            name="own-answer-2heck"
            value="3"
          />
          <label for="own-answer-3-check"></label>
          <input
            type="text"
            name="own-answer-3"
            id="own-answer-3"
            class="own-answer"
            placeholder="Ответ D"
          />
        </div>
        <button class="submit-btn">Добавить</button>`;
