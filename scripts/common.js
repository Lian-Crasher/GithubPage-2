const chapterNav = document.querySelector(".chapter-nav");
const currentPage = document.body.dataset.page;
let activeChapterLink = null;

document.querySelectorAll(".chapter-nav a[data-nav]").forEach((link) => {
  const isActive = link.dataset.nav === currentPage;
  link.classList.toggle("is-active", isActive);
  if (isActive) {
    link.setAttribute("aria-current", "page");
    activeChapterLink = link;
  } else {
    link.removeAttribute("aria-current");
  }
});

function revealActiveChapterLink() {
  if (!chapterNav || !activeChapterLink || chapterNav.scrollWidth <= chapterNav.clientWidth) return;

  const centeredLeft = activeChapterLink.offsetLeft
    - (chapterNav.clientWidth - activeChapterLink.offsetWidth) / 2;
  chapterNav.scrollTo({ left: Math.max(0, centeredLeft), behavior: "auto" });
}

requestAnimationFrame(revealActiveChapterLink);

const pressedStateButtons = document.querySelectorAll([
  "button[data-reference]",
  "button[data-noise]",
  "button[data-temperature-view]",
  "button[data-state]",
  "button[data-graph]",
  "button[data-ray-mode]",
  "button[data-medium-path]",
  "button[data-ray-rule]",
  "button[data-lens]",
  "button[data-lens-practice]",
  "button[data-lens-rule]",
  "button[data-choice]",
  "button[data-frequency-band]",
  "button[data-water-cycle]",
  "button[data-reflection-surface]",
  "button[data-optical-instrument]",
].join(", "));

function setButtonPressedState(button, pressed) {
  button.classList.toggle("is-active", pressed);
  button.setAttribute("aria-pressed", String(pressed));
}

pressedStateButtons.forEach((button) => {
  button.setAttribute("aria-pressed", String(button.classList.contains("is-active")));
});

var QUIZ_PROGRESS_KEY = "physics-preview-quiz-progress";
var QUIZ_META = {
  chapter1: {
    title: "机械运动",
    href: "chapters/chapter1-motion.html#check",
    focus: "速度计算、s-t 图像和参照物",
  },
  chapter2: {
    title: "声现象",
    href: "chapters/chapter2-sound.html#sound-check",
    focus: "振动、介质、声音特性和声的利用",
  },
  chapter3: {
    title: "物态变化",
    href: "chapters/chapter3-states.html#states-check",
    focus: "温度计、吸放热和沸腾实验",
  },
  half: {
    title: "前三章阶段检查",
    href: "chapters/chapter3-states.html#half-check",
    focus: "机械运动、声现象和物态变化的综合判断",
  },
  chapter4: {
    title: "光现象",
    href: "chapters/chapter4-light.html#light-check",
    focus: "反射、折射、平面镜和光路作图",
  },
  chapter5: {
    title: "透镜及其应用",
    href: "chapters/chapter5-lenses.html#lenses-check",
    focus: "凸透镜成像、特殊光线和投影仪调试",
  },
  chapter6: {
    title: "质量与密度",
    href: "chapters/chapter6-density.html#density-check",
    focus: "密度计算、排水法、生活应用和误差方向",
  },
  final: {
    title: "综合检查",
    href: "chapters/final-check.html",
    focus: "六章主线和期末常见混合题型",
  },
};

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

function getProgressRatio(record) {
  if (!record || !record.total) return 0;
  return record.score / record.total;
}

function getReviewTargets(record) {
  if (!Array.isArray(record?.missedReviews)) return [];

  const seen = new Set();
  return record.missedReviews
    .filter((item) => item && item.href && item.topic)
    .filter((item) => {
      const key = `${item.href}|${item.topic}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 3);
}

function getAdviceHref(defaultHref, record) {
  return getReviewTargets(record)[0]?.href || defaultHref;
}

function getAdviceCopy(focus, record) {
  if (!record) return `先从这里建立主线：${focus}。`;

  const targets = getReviewTargets(record);
  if (targets.length) {
    return `${formatProgress(record)}。优先回看：${targets.map((item) => item.topic).join("、")}。`;
  }

  return `${formatProgress(record)}。重点回看：${focus}。`;
}

function createAdviceCard({ title, href, focus, record, label }) {
  const card = document.createElement("a");
  card.className = "recommendation-card";
  card.href = getAdviceHref(href, record);

  const tag = document.createElement("span");
  tag.className = "recommendation-tag";
  tag.textContent = label;
  card.appendChild(tag);

  const heading = document.createElement("h3");
  heading.textContent = title;
  card.appendChild(heading);

  const copy = document.createElement("p");
  copy.textContent = getAdviceCopy(focus, record);
  card.appendChild(copy);

  return card;
}

function getAdviceItems(progress) {
  const chapterIds = ["chapter1", "chapter2", "chapter3", "chapter4", "chapter5", "chapter6"];
  const attemptedReviews = Object.entries(progress)
    .filter(([id, record]) => QUIZ_META[id] && record && !record.completed)
    .sort((left, right) => getProgressRatio(left[1]) - getProgressRatio(right[1]));

  if (attemptedReviews.length) {
    return attemptedReviews.slice(0, 3).map(([id, record], index) => ({
      ...QUIZ_META[id],
      record,
      label: index === 0 ? "优先巩固" : "继续补强",
    }));
  }

  const firstUnstarted = chapterIds.find((id) => !progress[id]);
  if (firstUnstarted) {
    return [{
      ...QUIZ_META[firstUnstarted],
      record: null,
      label: "建议开始",
    }];
  }

  if (!progress.final) {
    return [{
      ...QUIZ_META.final,
      record: null,
      label: "收官挑战",
    }];
  }

  return [{
    ...QUIZ_META.final,
    record: progress.final,
    label: progress.final.completed ? "保持手感" : "继续冲刺",
  }];
}

function applyNextStepAdvice() {
  const grid = document.querySelector("#recommendationGrid");
  if (!grid) return;

  const progress = readQuizProgress();
  const adviceItems = getAdviceItems(progress);
  grid.replaceChildren(...adviceItems.map(createAdviceCard));

  const primaryAction = document.querySelector("#homePrimaryAction");
  const primaryAdvice = adviceItems[0];
  if (!primaryAction || !primaryAdvice) return;

  primaryAction.href = getAdviceHref(primaryAdvice.href, primaryAdvice.record);
  if (!primaryAdvice.record) {
    primaryAction.textContent = primaryAdvice.title === "综合检查"
      ? "开始综合检查"
      : `从${primaryAdvice.title}开始`;
  } else if (primaryAdvice.record.completed) {
    primaryAction.textContent = "查看综合检查";
  } else {
    primaryAction.textContent = `继续巩固：${primaryAdvice.title}`;
  }
}

function resetQuizProgress() {
  try {
    localStorage.removeItem(QUIZ_PROGRESS_KEY);
  } catch (error) {
    return false;
  }

  applyHomeProgress();
  applyNextStepAdvice();
  return true;
}

function setupProgressReset() {
  const resetButton = document.querySelector("#resetProgressButton");
  const resetStatus = document.querySelector("#resetProgressStatus");
  if (!resetButton) return;

  resetButton.addEventListener("click", () => {
    const hasProgress = Object.keys(readQuizProgress()).length > 0;
    if (!hasProgress) {
      if (resetStatus) resetStatus.textContent = "当前已经是未检查状态。";
      return;
    }

    const confirmed = window.confirm("确定要清空所有章节和综合检查的提交记录吗？");
    if (!confirmed) return;

    const didReset = resetQuizProgress();
    if (resetStatus) {
      resetStatus.textContent = didReset ? "已清空检查记录。" : "清空失败，请检查浏览器存储权限。";
    }
  });
}

applyHomeProgress();
applyNextStepAdvice();
setupProgressReset();
