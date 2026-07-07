document.querySelectorAll(".chapter-nav a[data-nav]").forEach((link) => {
  const current = document.body.dataset.page;
  link.classList.toggle("is-active", link.dataset.nav === current);
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
    focus: "密度计算、排水法和误差方向",
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

function createAdviceCard({ title, href, focus, record, label }) {
  const card = document.createElement("a");
  card.className = "recommendation-card";
  card.href = href;

  const tag = document.createElement("span");
  tag.className = "recommendation-tag";
  tag.textContent = label;
  card.appendChild(tag);

  const heading = document.createElement("h3");
  heading.textContent = title;
  card.appendChild(heading);

  const copy = document.createElement("p");
  copy.textContent = record
    ? `${formatProgress(record)}。重点回看：${focus}。`
    : `先从这里建立主线：${focus}。`;
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
}

applyHomeProgress();
applyNextStepAdvice();
