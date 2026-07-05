var QUIZ_PROGRESS_KEY = "physics-preview-quiz-progress";

function readQuizProgress() {
  try {
    return JSON.parse(localStorage.getItem(QUIZ_PROGRESS_KEY)) || {};
  } catch (error) {
    return {};
  }
}

function writeQuizProgress(progress) {
  try {
    localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    // Progress is helpful, but the quiz should still work if storage is blocked.
  }
}

function saveQuizAttempt(quizId, attempt) {
  if (!quizId) return;

  const progress = readQuizProgress();
  progress[quizId] = {
    ...attempt,
    updatedAt: new Date().toISOString(),
  };
  writeQuizProgress(progress);
}

function createReviewItem(hint, link) {
  const item = document.createElement("li");
  const text = document.createElement("span");
  text.textContent = hint;
  item.appendChild(text);

  if (link) {
    const anchor = document.createElement("a");
    anchor.href = link.href;
    anchor.textContent = link.label || "回看对应知识点";
    item.appendChild(anchor);
  }

  return item;
}

function setupQuiz({ formSelector, resultSelector, answers, hints, badges, successMessage, quizId, reviewLinks = {} }) {
  const form = document.querySelector(formSelector);
  const result = document.querySelector(resultSelector);
  if (!form || !result) return;

  result.setAttribute("tabindex", "-1");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let score = 0;
    const missed = [];

    Object.keys(answers).forEach((key) => {
      const checked = form.querySelector(`input[name="${key}"]:checked`);
      if (checked?.value === answers[key]) {
        score += 1;
      } else {
        missed.push(key);
      }
    });

    const total = Object.keys(answers).length;
    const badge = badges(score, total);
    const title = document.createElement("strong");
    title.textContent = `${badge}：${score}/${total}`;

    const detail = document.createElement("p");
    detail.textContent = missed.length
      ? "下面这些题可以直接回到对应模块复习。"
      : successMessage;

    result.replaceChildren(title, detail);

    if (missed.length) {
      const list = document.createElement("ul");
      list.className = "missed-list";
      missed.forEach((key) => {
        list.appendChild(createReviewItem(hints[key], reviewLinks[key]));
      });
      result.appendChild(list);
    }

    saveQuizAttempt(quizId, {
      score,
      total,
      missed,
      completed: missed.length === 0,
    });
    result.focus({ preventScroll: true });
  });
}
