function setupQuiz({ formSelector, resultSelector, answers, hints, badges, successMessage }) {
  const form = document.querySelector(formSelector);
  const result = document.querySelector(resultSelector);
  if (!form || !result) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let score = 0;
    const missed = [];

    Object.keys(answers).forEach((key) => {
      const checked = form.querySelector(`input[name="${key}"]:checked`);
      if (checked?.value === answers[key]) {
        score += 1;
      } else {
        missed.push(hints[key]);
      }
    });

    const total = Object.keys(answers).length;
    const badge = badges(score, total);
    result.innerHTML = `<strong>${badge}：${score}/${total}</strong><br>${missed.length ? missed.join("<br>") : successMessage}`;
  });
}
