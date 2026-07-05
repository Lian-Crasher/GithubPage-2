document.querySelectorAll(".chapter-nav a[data-nav]").forEach((link) => {
  const current = document.body.dataset.page;
  link.classList.toggle("is-active", link.dataset.nav === current);
});

var QUIZ_PROGRESS_KEY = "physics-preview-quiz-progress";

function readQuizProgress() {
  try {
    return JSON.parse(localStorage.getItem(QUIZ_PROGRESS_KEY)) || {};
  } catch (error) {
    return {};
  }
}

function formatProgress(record) {
  if (!record) return "未检查";
  if (record.completed) return `已掌握 ${record.score}/${record.total}`;
  return `待巩固 ${record.score}/${record.total}`;
}

function applyHomeProgress() {
  const progress = readQuizProgress();

  document.querySelectorAll("[data-progress]").forEach((card) => {
    const record = progress[card.dataset.progress];
    const badge = card.querySelector(".progress-pill");
    if (!badge) return;

    badge.textContent = formatProgress(record);
    badge.dataset.state = record?.completed ? "complete" : record ? "review" : "empty";
  });
}

applyHomeProgress();
