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

function createReviewItem(hint, link, diagnosis) {
  const item = document.createElement("li");
  const text = document.createElement("span");
  text.textContent = hint;
  item.appendChild(text);

  if (diagnosis) {
    const detail = document.createElement("small");
    detail.className = "answer-diagnosis";
    detail.textContent = diagnosis;
    item.appendChild(detail);
  }

  if (link) {
    const anchor = document.createElement("a");
    anchor.href = link.href;
    anchor.textContent = link.label || "回看对应知识点";
    item.appendChild(anchor);
  }

  return item;
}

function normalizeTextAnswer(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/，/g, ",")
    .replace(/。/g, "");
}

function formatAnswerValue(value) {
  return String(value ?? "").trim() || "未作答";
}

function getOptionLabelFromSelect(select, value) {
  if (!select) return formatAnswerValue(value);
  const option = Array.from(select.options).find((item) => item.value === value);
  return option ? option.textContent.trim() : formatAnswerValue(value);
}

function getInputChoiceLabel(form, key, value) {
  const input = Array.from(form.querySelectorAll(`input[name="${key}"]`)).find((control) => control.value === value);
  const label = input?.closest("label");
  if (!label) return formatAnswerValue(value);
  return label.textContent.trim().replace(/\s+/g, " ");
}

function getOrderChoiceLabel(form, key, value) {
  const select = form.querySelector(`[data-order-group="${key}"]`);
  return getOptionLabelFromSelect(select, value);
}

function getMatchPrompt(form, key, matchKey) {
  const control = form.querySelector(`[data-match-group="${key}"][data-match-key="${matchKey}"]`);
  const label = control?.closest("label");
  if (!label) return matchKey;
  return Array.from(label.childNodes)
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.textContent.trim())
    .filter(Boolean)
    .join(" ")
    || matchKey;
}

function getMatchChoiceLabel(form, key, value) {
  const select = form.querySelector(`[data-match-group="${key}"]`);
  return getOptionLabelFromSelect(select, value);
}

function arraysMatch(actual, expected, { sorted = false } = {}) {
  const actualValues = actual.map(normalizeTextAnswer);
  const expectedValues = expected.map(normalizeTextAnswer);
  if (sorted) {
    actualValues.sort();
    expectedValues.sort();
  }

  return actualValues.length === expectedValues.length
    && actualValues.every((value, index) => value === expectedValues[index]);
}

function objectsMatch(actual, expected) {
  const expectedKeys = Object.keys(expected);
  return expectedKeys.every((key) => normalizeTextAnswer(actual[key]) === normalizeTextAnswer(expected[key]));
}

function getQuizAnswer(form, key, type) {
  if (type === "multi") {
    return Array.from(form.querySelectorAll(`input[name="${key}"]:checked`)).map((input) => input.value);
  }

  if (type === "text") {
    return form.querySelector(`input[name="${key}"]`)?.value || "";
  }

  if (type === "order") {
    return Array.from(form.querySelectorAll(`[data-order-group="${key}"]`)).map((control) => control.value);
  }

  if (type === "match") {
    return Array.from(form.querySelectorAll(`[data-match-group="${key}"]`)).reduce((matched, control) => {
      matched[control.dataset.matchKey] = control.value;
      return matched;
    }, {});
  }

  return form.querySelector(`input[name="${key}"]:checked`)?.value || "";
}

function isQuizAnswerCorrect(actual, expected, type) {
  if (type === "multi") return arraysMatch(actual, expected, { sorted: true });
  if (type === "order") return arraysMatch(actual, expected);
  if (type === "match") return objectsMatch(actual, expected);
  if (type === "text") {
    const accepted = Array.isArray(expected) ? expected : [expected];
    return accepted.some((value) => normalizeTextAnswer(actual) === normalizeTextAnswer(value));
  }

  return actual === expected;
}

function getAnswerDiagnosis(form, key, actual, expected, type, detail) {
  const messages = [];

  if (type === "multi") {
    const actualValues = actual.map(normalizeTextAnswer);
    const expectedValues = expected.map(normalizeTextAnswer);
    const missing = expected.filter((value) => !actualValues.includes(normalizeTextAnswer(value)));
    const extra = actual.filter((value) => !expectedValues.includes(normalizeTextAnswer(value)));

    if (!actual.length) {
      messages.push("你还没有选择选项。");
    }
    if (missing.length) {
      messages.push(`少选：${missing.map((value) => getInputChoiceLabel(form, key, value)).join("、")}。`);
    }
    if (extra.length) {
      messages.push(`多选：${extra.map((value) => getInputChoiceLabel(form, key, value)).join("、")}。`);
    }
  } else if (type === "text") {
    const accepted = Array.isArray(expected) ? expected : [expected];
    messages.push(`你的答案：${formatAnswerValue(actual)}。参考答案：${formatAnswerValue(accepted[0])}。`);
  } else if (type === "order") {
    const wrongSteps = actual
      .map((value, index) => normalizeTextAnswer(value) === normalizeTextAnswer(expected[index]) ? null : index + 1)
      .filter(Boolean);
    if (wrongSteps.length) {
      messages.push(`顺序中第 ${wrongSteps.join("、")} 步需要调整。`);
    }
    messages.push(`正确顺序：${expected.map((value) => getOrderChoiceLabel(form, key, value)).join(" → ")}。`);
  } else if (type === "match") {
    const wrongMatches = Object.keys(expected)
      .filter((matchKey) => normalizeTextAnswer(actual[matchKey]) !== normalizeTextAnswer(expected[matchKey]))
      .map((matchKey) => `${getMatchPrompt(form, key, matchKey)}应选“${getMatchChoiceLabel(form, key, expected[matchKey])}”`);
    if (wrongMatches.length) {
      messages.push(`配对错误：${wrongMatches.join("；")}。`);
    }
  }

  if (detail) messages.push(detail);
  return messages.join(" ");
}

function setupQuiz({ formSelector, resultSelector, answers, hints, badges, successMessage, quizId, reviewLinks = {}, questionTypes = {}, answerDetails = {} }) {
  const form = document.querySelector(formSelector);
  const result = document.querySelector(resultSelector);
  if (!form || !result) return;

  result.setAttribute("tabindex", "-1");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let score = 0;
    const missed = [];
    const attempts = {};

    Object.keys(answers).forEach((key) => {
      const type = questionTypes[key] || "single";
      const actual = getQuizAnswer(form, key, type);
      attempts[key] = { actual, type };
      if (isQuizAnswerCorrect(actual, answers[key], type)) {
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
        const { actual, type } = attempts[key];
        const diagnosis = getAnswerDiagnosis(form, key, actual, answers[key], type, answerDetails[key]);
        list.appendChild(createReviewItem(hints[key], reviewLinks[key], diagnosis));
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
