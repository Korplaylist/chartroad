const app = document.querySelector("#test-app");
const questions = JSON.parse(app.dataset.questions);
const progressBar = document.querySelector("#progress-bar");
const progressText = document.querySelector("#progress-text");
const questionText = document.querySelector("#question-text");
const optionsEl = document.querySelector("#options");
const prevButton = document.querySelector("#prev-button");
const nextButton = document.querySelector("#next-button");
const STORAGE_KEY = "chartroad.answers";

let index = 0;
let answers = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}

function render() {
  const question = questions[index];
  const selected = answers[question.id];
  progressBar.style.width = `${((index + 1) / questions.length) * 100}%`;
  progressText.textContent = `${index + 1} / ${questions.length}`;
  questionText.textContent = question.text;
  optionsEl.innerHTML = "";
  question.options.forEach((option, optionIndex) => {
    const value = optionIndex + 1;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";
    button.setAttribute("aria-pressed", String(selected === value));
    button.textContent = `${value}. ${option}`;
    button.addEventListener("click", () => {
      answers[question.id] = value;
      save();
      render();
    });
    optionsEl.appendChild(button);
  });
  prevButton.disabled = index === 0;
  nextButton.textContent = index === questions.length - 1 ? "결과 보기" : "다음";
  nextButton.disabled = !selected;
}

prevButton.addEventListener("click", () => {
  if (index > 0) {
    index -= 1;
    render();
  }
});

nextButton.addEventListener("click", () => {
  const question = questions[index];
  if (!answers[question.id]) return;
  if (index < questions.length - 1) {
    index += 1;
    render();
    return;
  }
  questionText.textContent = "진단 결과를 정리하는 중입니다...";
  optionsEl.innerHTML = "";
  prevButton.disabled = true;
  nextButton.disabled = true;
  setTimeout(() => {
    window.location.href = "/result";
  }, 700);
});

render();
