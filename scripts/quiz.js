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

function layerRecordMatches(level, record) {
  if (!level || !Array.isArray(record?.questionKeys)) return false;
  return record.questionKeys.length === level.questionKeys.length
    && record.questionKeys.every((key, index) => key === level.questionKeys[index]);
}

function saveLayeredQuizAttempt(quizId, levels, levelId, attempt) {
  if (!quizId) return null;

  const progress = readQuizProgress();
  const previousQuiz = progress[quizId] || {};
  const previousLayers = previousQuiz.layers || {};
  const validPreviousLayers = Object.fromEntries(levels.flatMap((level) => {
    const record = previousLayers[level.id];
    return layerRecordMatches(level, record) ? [[level.id, record]] : [];
  }));
  const currentLevel = levels.find((level) => level.id === levelId);
  const previousLevel = validPreviousLayers[levelId] || {};
  const layerRecords = {
    ...validPreviousLayers,
    [levelId]: {
      ...attempt,
      questionKeys: [...(currentLevel?.questionKeys || [])],
      attempts: (previousLevel.attempts || 0) + 1,
      bestScore: Math.max(previousLevel.bestScore || 0, attempt.score),
      updatedAt: new Date().toISOString(),
    },
  };
  const requiredLevels = levels.filter((level) => level.required !== false);
  const completed = requiredLevels.every((level) => layerRecords[level.id]?.passed);
  const attemptedRecords = levels.map((level) => layerRecords[level.id]).filter(Boolean);
  const missedReviews = attemptedRecords.flatMap((record) => record.missedReviews || []);

  progress[quizId] = {
    ...previousQuiz,
    score: attemptedRecords.reduce((total, record) => total + record.score, 0),
    total: levels.reduce((total, level) => total + level.questionKeys.length, 0),
    missed: attemptedRecords.flatMap((record) => record.missed || []),
    missedReviews,
    completed,
    layered: true,
    latestLayer: levelId,
    levelOrder: levels.map((level) => level.id),
    requiredLevels: requiredLevels.map((level) => level.id),
    layers: layerRecords,
    updatedAt: new Date().toISOString(),
  };
  writeQuizProgress(progress);
  return progress[quizId];
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

function getCurrentQuizPagePath() {
  const pathname = window.location.pathname;
  const filename = pathname.split("/").pop() || "index.html";
  return pathname.includes("/chapters/") ? `chapters/${filename}` : filename;
}

function getProgressReviewHref(href) {
  if (!href) return "";
  if (/^(https?:|mailto:|\/)/.test(href)) return href;
  if (href.startsWith("#")) return `${getCurrentQuizPagePath()}${href}`;
  if (href.startsWith("chapters/")) return href;
  if (window.location.pathname.includes("/chapters/")) return `chapters/${href}`;
  return href;
}

function getReviewTopic(link, hint) {
  if (link?.topic) return link.topic;
  if (link?.label) return link.label.replace(/^(回看|练习)/, "").trim();
  return hint.replace(/^第\s*\d+\s*题回看/, "").replace(/[：:。].*$/, "").trim() || "对应知识点";
}

function buildMissedReview(key, hint, link) {
  return {
    key,
    hint,
    href: getProgressReviewHref(link?.href),
    label: link?.label || "回看对应知识点",
    topic: getReviewTopic(link, hint),
  };
}

function normalizeTextAnswer(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/，/g, ",")
    .replace(/。/g, "");
}

function parseQuizNumber(value) {
  const superscripts = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-" };
  const compact = String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[，,]/g, "")
    .replace(/[×x]/g, "*")
    .replace(/[−–—]/g, "-")
    .replace(/10([⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+)/g, (_, exponent) => `10^${Array.from(exponent).map((character) => superscripts[character]).join("")}`)
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]/g, (character) => superscripts[character])
    .replace(/\s+/g, "")
    .replace(/(米每秒|千克每立方米|克每立方厘米|牛顿|焦耳|瓦特|kg\/m(?:3|\^3)|g\/cm(?:3|\^3)|m\/s|pa|cm3|m3|n|j|w|cm|m|牛|焦|瓦|%|％)$/u, "");
  const powerOfTen = compact.match(/^10\^([+-]?\d+)$/);
  if (powerOfTen) {
    const number = 10 ** Number(powerOfTen[1]);
    return Number.isFinite(number) ? number : null;
  }
  const match = compact.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))(?:(?:\*10\^?([+-]?\d+))|(?:e([+-]?\d+)))?$/);
  if (!match) return null;
  const exponent = Number(match[2] ?? match[3] ?? 0);
  const number = Number(match[1]) * (10 ** exponent);
  return Number.isFinite(number) ? number : null;
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

function isQuizAnswerComplete(actual, type) {
  if (type === "multi" || type === "order") {
    return actual.length > 0 && actual.every((value) => normalizeTextAnswer(value));
  }

  if (type === "match") {
    const values = Object.values(actual);
    return values.length > 0 && values.every((value) => normalizeTextAnswer(value));
  }

  return Boolean(normalizeTextAnswer(actual));
}

function setQuestionIncomplete(form, key, incomplete) {
  const controls = form.querySelectorAll(
    `[name="${key}"], [data-order-group="${key}"], [data-match-group="${key}"]`,
  );
  const card = controls[0]?.closest(".quiz-card");
  card?.classList.toggle("is-incomplete", incomplete);
  controls.forEach((control) => {
    if (incomplete) {
      control.setAttribute("aria-invalid", "true");
    } else {
      control.removeAttribute("aria-invalid");
    }
  });
}

function getQuestionNumber(key) {
  return key.match(/\d+$/)?.[0] || key;
}

function getQuestionCard(form, key) {
  return form.querySelector(
    `[name="${key}"], [data-order-group="${key}"], [data-match-group="${key}"]`,
  )?.closest(".quiz-card");
}

function jumpToQuizQuestion(form, key) {
  const card = getQuestionCard(form, key);
  if (!card) return;

  card.setAttribute("tabindex", "-1");
  const offset = Number.parseFloat(window.getComputedStyle(card).scrollMarginTop) || 0;
  const targetTop = window.scrollY + card.getBoundingClientRect().top - offset;
  const previousScrollBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, Math.max(0, targetTop));
  document.documentElement.style.scrollBehavior = previousScrollBehavior;
  card.focus({ preventScroll: true });
}

function createQuestionJumpButton(form, key, className = "") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = getQuestionNumber(key);
  button.addEventListener("click", () => jumpToQuizQuestion(form, key));
  return button;
}

function setupQuizProgress(form, answers, questionTypes) {
  const keys = Object.keys(answers);
  const panel = document.createElement("section");
  panel.className = "quiz-progress";
  panel.setAttribute("aria-label", "答题进度");

  const summary = document.createElement("div");
  summary.className = "quiz-progress-summary";

  const count = document.createElement("strong");
  count.className = "quiz-progress-count";
  count.setAttribute("aria-live", "polite");
  summary.appendChild(count);

  const remaining = document.createElement("span");
  remaining.className = "quiz-progress-remaining";
  summary.appendChild(remaining);

  const track = document.createElement("div");
  track.className = "quiz-progress-track";
  track.setAttribute("role", "progressbar");
  track.setAttribute("aria-valuemin", "0");
  track.setAttribute("aria-valuemax", String(keys.length));

  const fill = document.createElement("span");
  fill.className = "quiz-progress-fill";
  track.appendChild(fill);

  const navigator = document.createElement("div");
  navigator.className = "quiz-question-nav";
  navigator.setAttribute("aria-label", "题目跳转");

  const buttons = new Map(keys.map((key) => {
    const button = createQuestionJumpButton(form, key, "quiz-question-button");
    button.dataset.questionKey = key;
    navigator.appendChild(button);
    return [key, button];
  }));

  panel.append(summary, track, navigator);
  form.prepend(panel);

  function update(incompleteKeys = []) {
    const incompleteSet = new Set(incompleteKeys);
    let completed = 0;

    keys.forEach((key) => {
      const type = questionTypes[key] || "single";
      const answered = isQuizAnswerComplete(getQuizAnswer(form, key, type), type);
      if (answered) completed += 1;

      const button = buttons.get(key);
      button.classList.toggle("is-complete", answered);
      button.classList.toggle("is-incomplete", incompleteSet.has(key));
      button.setAttribute(
        "aria-label",
        `第 ${getQuestionNumber(key)} 题，${incompleteSet.has(key) ? "未完成" : answered ? "已完成" : "未作答"}`,
      );
    });

    count.textContent = `已完成 ${completed}/${keys.length}`;
    remaining.textContent = completed === keys.length ? "可以提交检查" : `还剩 ${keys.length - completed} 题`;
    track.setAttribute("aria-valuenow", String(completed));
    track.setAttribute("aria-valuetext", `已完成 ${completed} 题，共 ${keys.length} 题`);
    fill.style.width = `${(completed / keys.length) * 100}%`;
  }

  form.addEventListener("input", () => update());
  form.addEventListener("change", () => update());
  update();

  return { update };
}

function isQuizAnswerCorrect(actual, expected, type) {
  if (type === "multi") return arraysMatch(actual, expected, { sorted: true });
  if (type === "order") return arraysMatch(actual, expected);
  if (type === "match") return objectsMatch(actual, expected);
  if (type === "text") {
    const accepted = Array.isArray(expected) ? expected : [expected];
    const actualNumber = parseQuizNumber(actual);
    if (actualNumber !== null) {
      const numericMatch = accepted.some((value) => {
        const expectedNumber = parseQuizNumber(value);
        if (expectedNumber === null) return false;
        const tolerance = Math.max(1e-9, Math.abs(expectedNumber) * 1e-6);
        return Math.abs(actualNumber - expectedNumber) <= tolerance;
      });
      if (numericMatch) return true;
    }
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
  } else {
    messages.push(`你的选择：${getInputChoiceLabel(form, key, actual)}。参考答案：${getInputChoiceLabel(form, key, expected)}。`);
  }

  if (detail) messages.push(detail);
  return messages.join(" ");
}

function buildDiagnosticReport(diagnosticLevels, answers, attempts) {
  if (!diagnosticLevels?.length) return null;

  const records = {};
  const section = document.createElement("section");
  section.className = "quiz-diagnostic";
  section.setAttribute("aria-label", "分层能力报告");

  const heading = document.createElement("h3");
  heading.textContent = "分层能力报告";
  section.appendChild(heading);

  const intro = document.createElement("p");
  intro.textContent = "总分之外，再看你在不同能力层上的表现。";
  section.appendChild(intro);

  const grid = document.createElement("div");
  grid.className = "quiz-diagnostic-grid";
  diagnosticLevels.forEach((level) => {
    const score = level.questionKeys.filter((key) => {
      const attempt = attempts[key];
      return attempt && isQuizAnswerCorrect(attempt.actual, answers[key], attempt.type);
    }).length;
    const total = level.questionKeys.length;
    const passScore = level.passScore || Math.ceil(total * 0.7);
    const passed = score >= passScore;
    records[level.id] = { score, total, passed };

    const item = document.createElement("div");
    item.className = "quiz-diagnostic-item";
    item.dataset.state = passed ? "complete" : "review";
    const title = document.createElement("strong");
    title.textContent = level.title;
    const value = document.createElement("span");
    value.textContent = `${score}/${total}`;
    const description = document.createElement("small");
    description.textContent = passed ? "表现稳定" : level.description || "建议继续巩固";
    item.append(title, value, description);
    grid.appendChild(item);
  });
  section.appendChild(grid);
  return { element: section, records };
}

function setupQuiz({ formSelector, resultSelector, answers, hints, badges, successMessage, quizId, reviewLinks = {}, questionTypes = {}, answerDetails = {}, showProgress = false, diagnosticLevels = [] }) {
  const form = document.querySelector(formSelector);
  const result = document.querySelector(resultSelector);
  if (!form || !result) return;

  shuffleQuizChoices(form);
  result.setAttribute("tabindex", "-1");
  const progress = showProgress ? setupQuizProgress(form, answers, questionTypes) : null;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let score = 0;
    const missed = [];
    const incomplete = [];
    const attempts = {};

    Object.keys(answers).forEach((key) => {
      const type = questionTypes[key] || "single";
      const actual = getQuizAnswer(form, key, type);
      attempts[key] = { actual, type };
      const complete = isQuizAnswerComplete(actual, type);
      setQuestionIncomplete(form, key, !complete);
      if (!complete) incomplete.push(key);
    });

    result.classList.toggle("is-warning", incomplete.length > 0);
    progress?.update(incomplete);
    if (incomplete.length) {
      const title = document.createElement("strong");
      title.textContent = `还有 ${incomplete.length} 题未完成`;

      const detail = document.createElement("p");
      detail.textContent = "请先完成下面这些题目，再提交检查。未完成的答卷不会计分或保存。";

      const jumpList = document.createElement("div");
      jumpList.className = "incomplete-question-links";
      jumpList.setAttribute("aria-label", "跳转到未完成题目");
      incomplete.forEach((key) => {
        const button = createQuestionJumpButton(form, key, "incomplete-question-link");
        button.textContent = `第 ${getQuestionNumber(key)} 题`;
        button.setAttribute("aria-label", `跳转到未完成的第 ${getQuestionNumber(key)} 题`);
        jumpList.appendChild(button);
      });

      result.replaceChildren(title, detail, jumpList);
      result.focus({ preventScroll: true });
      return;
    }

    Object.keys(answers).forEach((key) => {
      const { actual, type } = attempts[key];
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

    const diagnostic = buildDiagnosticReport(diagnosticLevels, answers, attempts);
    if (diagnostic) result.appendChild(diagnostic.element);

    saveQuizAttempt(quizId, {
      score,
      total,
      missed,
      missedReviews: missed.map((key) => buildMissedReview(key, hints[key], reviewLinks[key])),
      completed: missed.length === 0,
      diagnostics: diagnostic?.records || undefined,
    });
    result.focus({ preventScroll: true });
  });
}

function ensureLayeredQuizStructure(form, quizId, levels) {
  const existingSummary = form.querySelector(".layered-quiz-summary");
  if (form.querySelector("[data-layer-tab]")) return existingSummary;

  form.classList.add("layered-quiz");
  const checkBand = form.closest(".check-band, .half-check");
  checkBand?.classList.add("layered-check-band");
  const sectionHead = checkBand?.querySelector(".section-head");
  const eyebrow = sectionHead?.querySelector(".eyebrow");
  if (eyebrow && !eyebrow.textContent.includes("分层")) {
    eyebrow.textContent = eyebrow.textContent.replace("检查", "分层检测");
  }
  const sectionLead = Array.from(sectionHead?.querySelectorAll("p") || [])
    .filter((paragraph) => !paragraph.classList.contains("eyebrow"))
    .pop();
  if (sectionLead) {
    sectionLead.textContent = "按层完成，错题会返回对应知识点；挑战层选做。";
  }

  const oldSubmit = form.querySelector(".quiz-submit");
  const oldResult = Array.from(form.querySelectorAll(".quiz-result")).find((item) => !item.dataset.layerResult);
  oldSubmit?.remove();
  oldResult?.remove();

  const toolbar = document.createElement("div");
  toolbar.className = "layered-quiz-toolbar";
  const summary = document.createElement("div");
  summary.className = "layered-quiz-summary";
  summary.id = `${quizId}LayeredSummary`;
  summary.setAttribute("aria-live", "polite");
  const tabs = document.createElement("div");
  tabs.className = "layered-quiz-tabs";
  tabs.setAttribute("role", "tablist");
  tabs.setAttribute("aria-label", "检测层级");

  levels.forEach((level) => {
    const tab = document.createElement("button");
    tab.id = `${quizId}-${level.id}-tab`;
    tab.type = "button";
    tab.setAttribute("role", "tab");
    tab.dataset.layerTab = level.id;
    tab.setAttribute("aria-controls", `${quizId}-${level.id}-panel`);
    const title = document.createElement("strong");
    title.textContent = level.title;
    const description = document.createElement("span");
    description.textContent = level.description;
    const status = document.createElement("small");
    status.dataset.layerTabStatus = "";
    status.textContent = "未开始";
    tab.append(title, description, status);
    tabs.appendChild(tab);
  });
  toolbar.append(summary, tabs);
  form.prepend(toolbar);

  levels.forEach((level, index) => {
    const panel = document.createElement("section");
    panel.className = "layered-quiz-panel";
    panel.id = `${quizId}-${level.id}-panel`;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", `${quizId}-${level.id}-tab`);
    panel.dataset.layerPanel = level.id;
    panel.hidden = index > 0;

    const panelHead = document.createElement("div");
    panelHead.className = "layered-quiz-panel-head";
    const copy = document.createElement("div");
    const heading = document.createElement("h3");
    heading.textContent = level.heading || level.description;
    const passRule = document.createElement("p");
    passRule.textContent = `${level.required === false ? "本层选做，" : ""}${level.questionKeys.length} 题中答对 ${level.passScore} 题即可通过本层。`;
    copy.append(heading, passRule);
    const answerCount = document.createElement("strong");
    answerCount.dataset.layerAnswerCount = level.id;
    answerCount.textContent = `已完成 0/${level.questionKeys.length}`;
    panelHead.append(copy, answerCount);
    panel.appendChild(panelHead);

    level.questionKeys.forEach((key) => {
      const card = getQuestionCard(form, key);
      if (card) panel.appendChild(card);
    });

    const submit = document.createElement("button");
    submit.className = "primary-action layered-submit";
    submit.type = "button";
    submit.dataset.layerSubmit = level.id;
    submit.textContent = `提交${level.title}层`;
    const result = document.createElement("div");
    result.className = "quiz-result";
    result.dataset.layerResult = level.id;
    result.setAttribute("aria-live", "polite");
    panel.append(submit, result);
    form.appendChild(panel);
  });
  return summary;
}

function shuffleQuizChoices(form) {
  form.querySelectorAll(".quiz-card").forEach((card) => {
    const labels = Array.from(card.children).filter((child) => {
      if (child.tagName !== "LABEL") return false;
      return Boolean(child.querySelector('input[type="radio"], input[type="checkbox"]'));
    });
    if (labels.length < 2) return;
    for (let index = labels.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [labels[index], labels[swapIndex]] = [labels[swapIndex], labels[index]];
    }
    labels.forEach((label) => card.appendChild(label));
  });
}

function createChapterLayers({ basic, application, inquiry, challenge }) {
  const definitions = [
    { id: "basic", title: "基础", description: "概念、单位与基本规律", shortDescription: "概念与规律", heading: "先确认核心概念没有混淆", questionKeys: basic },
    { id: "application", title: "应用", description: "计算、判断与生活解释", shortDescription: "计算与解释", heading: "把规律用于计算和具体情境", questionKeys: application },
    { id: "inquiry", title: "探究", description: "实验、图像与方法分析", shortDescription: "实验与方法", heading: "读懂实验过程、图像和证据", questionKeys: inquiry },
    { id: "challenge", title: "挑战", description: "综合分析与陌生迁移", shortDescription: "综合与迁移", heading: "在新情境中组合使用规律", questionKeys: challenge, required: false },
  ];
  return definitions.map((level) => ({
    ...level,
    passScore: Math.max(1, Math.ceil(level.questionKeys.length * 2 / 3)),
  }));
}

function setupLayeredQuiz({ formSelector, summarySelector, answers, hints, quizId, levels, reviewLinks = {}, questionTypes = {}, answerDetails = {} }) {
  const form = document.querySelector(formSelector);
  if (!form || !levels?.length) return;

  const generatedSummary = ensureLayeredQuizStructure(form, quizId, levels);
  const summary = (summarySelector ? document.querySelector(summarySelector) : null) || generatedSummary;
  shuffleQuizChoices(form);

  const tabs = Array.from(form.querySelectorAll("[data-layer-tab]"));
  const panels = Array.from(form.querySelectorAll("[data-layer-panel]"));
  const levelMap = new Map(levels.map((level) => [level.id, level]));

  function readRecord() {
    return readQuizProgress()[quizId] || {};
  }

  function getLayerRecord(levelId) {
    const level = levelMap.get(levelId);
    const record = readRecord().layers?.[levelId];
    return layerRecordMatches(level, record) ? record : null;
  }

  function getLayerStatus(levelId) {
    const record = getLayerRecord(levelId);
    if (!record) return { label: "未开始", state: "empty" };
    if (record.passed) return { label: "已通过", state: "complete" };
    return { label: "待巩固", state: "review" };
  }

  function activateLayer(levelId, { focus = false } = {}) {
    tabs.forEach((tab) => {
      const active = tab.dataset.layerTab === levelId;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.setAttribute("tabindex", active ? "0" : "-1");
      if (active && focus) tab.focus();
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.layerPanel !== levelId;
    });
  }

  function updateLayerAnswerCount(level) {
    const output = form.querySelector(`[data-layer-answer-count="${level.id}"]`);
    if (!output) return;
    const answered = level.questionKeys.filter((key) => {
      const type = questionTypes[key] || "single";
      return isQuizAnswerComplete(getQuizAnswer(form, key, type), type);
    }).length;
    output.textContent = `已完成 ${answered}/${level.questionKeys.length}`;
  }

  function renderLayerState() {
    const required = levels.filter((level) => level.required !== false);
    const optional = levels.filter((level) => level.required === false);
    const passedRequired = required.filter((level) => getLayerRecord(level.id)?.passed).length;
    const passedOptional = optional.filter((level) => getLayerRecord(level.id)?.passed).length;
    const completed = passedRequired === required.length;

    tabs.forEach((tab) => {
      const status = getLayerStatus(tab.dataset.layerTab);
      tab.dataset.state = status.state;
      const statusNode = tab.querySelector("[data-layer-tab-status]");
      if (statusNode) statusNode.textContent = status.label;
    });

    if (summary) {
      summary.dataset.state = completed ? "complete" : passedRequired ? "review" : "empty";
      summary.textContent = completed
        ? `主线 ${required.length} 层已通过 · ${passedOptional ? "挑战层已通过" : "挑战层可选"}`
        : `主线已通过 ${passedRequired}/${required.length} 层`;
    }
    levels.forEach(updateLayerAnswerCount);
  }

  function renderIncomplete(result, incomplete) {
    result.classList.add("is-warning");
    const title = document.createElement("strong");
    title.textContent = `还有 ${incomplete.length} 题未完成`;
    const detail = document.createElement("p");
    detail.textContent = "请完成本层全部题目后再提交。本次不会计分或保存。";
    const jumpList = document.createElement("div");
    jumpList.className = "incomplete-question-links";
    incomplete.forEach((key) => {
      const button = createQuestionJumpButton(form, key, "incomplete-question-link");
      button.textContent = `第 ${getQuestionNumber(key)} 题`;
      jumpList.appendChild(button);
    });
    result.replaceChildren(title, detail, jumpList);
    result.focus({ preventScroll: true });
  }

  function submitLayer(level) {
    const result = form.querySelector(`[data-layer-result="${level.id}"]`);
    if (!result) return;
    result.setAttribute("tabindex", "-1");
    const attempts = {};
    const incomplete = [];

    level.questionKeys.forEach((key) => {
      const type = questionTypes[key] || "single";
      const actual = getQuizAnswer(form, key, type);
      attempts[key] = { actual, type };
      const complete = isQuizAnswerComplete(actual, type);
      setQuestionIncomplete(form, key, !complete);
      if (!complete) incomplete.push(key);
    });

    if (incomplete.length) {
      renderIncomplete(result, incomplete);
      return;
    }

    const missed = level.questionKeys.filter((key) => {
      const { actual, type } = attempts[key];
      return !isQuizAnswerCorrect(actual, answers[key], type);
    });
    const score = level.questionKeys.length - missed.length;
    const passed = score >= level.passScore;
    const missedReviews = missed.map((key) => buildMissedReview(key, hints[key], reviewLinks[key]));
    const savedRecord = saveLayeredQuizAttempt(quizId, levels, level.id, {
      score,
      total: level.questionKeys.length,
      passed,
      missed,
      missedReviews,
    });

    result.classList.toggle("is-warning", !passed);
    const title = document.createElement("strong");
    title.textContent = `${level.title}层${passed ? "已通过" : "待巩固"}：${score}/${level.questionKeys.length}`;
    const detail = document.createElement("p");
    const currentIndex = levels.findIndex((item) => item.id === level.id);
    const nextLevel = levels[currentIndex + 1];
    detail.textContent = passed
      ? nextLevel
        ? `这一层已经达到目标，建议继续进入${nextLevel.title}层。`
        : savedRecord?.completed
          ? "主线三层已完成，挑战层也已通过，可以回到知识模块继续查漏补缺。"
          : "挑战层已通过；基础、应用和探究层仍可继续完成。"
      : `达到 ${level.passScore}/${level.questionKeys.length} 即可通过。先处理下面的薄弱点，再重做本层。`;
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

    if (passed && nextLevel) {
      const nextButton = document.createElement("button");
      nextButton.type = "button";
      nextButton.className = "secondary-action layered-next-action";
      nextButton.textContent = `进入${nextLevel.title}层`;
      nextButton.addEventListener("click", () => {
        activateLayer(nextLevel.id, { focus: true });
        form.querySelector(".layered-quiz-tabs")?.scrollIntoView({ block: "start" });
      });
      result.appendChild(nextButton);
    }

    renderLayerState();
    summary?.classList.toggle("is-complete", Boolean(savedRecord?.completed));
    result.focus({ preventScroll: true });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activateLayer(tab.dataset.layerTab));
  });
  form.querySelectorAll("[data-layer-submit]").forEach((button) => {
    button.addEventListener("click", () => {
      const level = levelMap.get(button.dataset.layerSubmit);
      if (level) submitLayer(level);
    });
  });
  form.addEventListener("input", () => levels.forEach(updateLayerAnswerCount));
  form.addEventListener("change", () => levels.forEach(updateLayerAnswerCount));
  form.addEventListener("submit", (event) => event.preventDefault());

  const record = readRecord();
  const initialLevel = levels.find((level) => !getLayerRecord(level.id)?.passed)?.id
    || record.latestLayer
    || levels[0].id;
  activateLayer(initialLevel);
  renderLayerState();
}
