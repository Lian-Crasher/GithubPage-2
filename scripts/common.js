const currentPage = document.body.dataset.page;
const volumeTwoPages = new Set(["force", "motion-force", "pressure", "buoyancy", "work-energy", "simple-machines", "check-volume2"]);
const currentVolume = currentPage === "home" ? "all" : volumeTwoPages.has(currentPage) ? "2" : "1";
const rootPrefix = currentPage === "home" ? "" : "../";
const chapterNav = document.querySelector(".chapter-nav");
let activeChapterLink = null;

const volumeNavigation = {
  all: [
    { href: "#map", nav: "home", label: "上册地图" },
    { href: "#volume2", nav: "volume2-map", label: "下册地图" },
    { href: "#next-step", nav: "next", label: "下一步" },
  ],
  1: [
    { href: `${rootPrefix}index.html#map`, nav: "home", label: "上册地图" },
    { href: `${rootPrefix}chapters/chapter1-motion.html`, nav: "motion", label: "机械运动" },
    { href: `${rootPrefix}chapters/chapter2-sound.html`, nav: "sound", label: "声现象" },
    { href: `${rootPrefix}chapters/chapter3-states.html`, nav: "states", label: "物态变化" },
    { href: `${rootPrefix}chapters/chapter4-light.html`, nav: "light", label: "光现象" },
    { href: `${rootPrefix}chapters/chapter5-lenses.html`, nav: "lenses", label: "透镜应用" },
    { href: `${rootPrefix}chapters/chapter6-density.html`, nav: "density", label: "质量密度" },
    { href: `${rootPrefix}chapters/final-check.html`, nav: "check", label: "上册检查" },
  ],
  2: [
    { href: `${rootPrefix}index.html#volume2`, nav: "volume2-map", label: "下册地图" },
    { href: `${rootPrefix}chapters/chapter7-force.html`, nav: "force", label: "力" },
    { href: `${rootPrefix}chapters/chapter8-motion-force.html`, nav: "motion-force", label: "运动和力" },
    { href: `${rootPrefix}chapters/chapter9-pressure.html`, nav: "pressure", label: "压强" },
    { href: `${rootPrefix}chapters/chapter10-buoyancy.html`, nav: "buoyancy", label: "浮力" },
    { href: `${rootPrefix}chapters/chapter11-work-energy.html`, nav: "work-energy", label: "功和机械能" },
    { href: `${rootPrefix}chapters/chapter12-simple-machines.html`, nav: "simple-machines", label: "简单机械" },
    { href: `${rootPrefix}chapters/final-check-volume2.html`, nav: "check-volume2", label: "下册检查" },
  ],
};

function setupSiteNavigation() {
  const topbar = document.querySelector(".topbar");
  if (!topbar || !chapterNav) return;

  const semesterNav = document.createElement("nav");
  semesterNav.className = "semester-nav";
  semesterNav.setAttribute("aria-label", "分册导航");
  [
    { volume: "all", href: `${rootPrefix}index.html#top`, label: "全年" },
    { volume: "1", href: `${rootPrefix}index.html#map`, label: "上册" },
    { volume: "2", href: `${rootPrefix}index.html#volume2`, label: "下册" },
  ].forEach((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    if (item.volume === currentVolume) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", currentVolume === "all" ? "page" : "location");
    }
    semesterNav.appendChild(link);
  });
  topbar.insertBefore(semesterNav, chapterNav);

  const links = volumeNavigation[currentVolume].map((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.dataset.nav = item.nav;
    link.textContent = item.label;
    return link;
  });
  chapterNav.replaceChildren(...links);
  chapterNav.setAttribute("aria-label", currentVolume === "all" ? "首页导航" : `${currentVolume === "1" ? "上" : "下"}册章节导航`);
}

setupSiteNavigation();

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

function getChapterTocLabel(section, heading) {
  if (section.classList.contains("half-check")) return "前三章闯关";
  if (section.classList.contains("check-band")) return "章节检查";

  const title = heading.textContent.trim();
  return title.includes("：") ? title.split("：")[0] : title;
}

function setupChapterToc() {
  const showcase = document.querySelector("main > .chapter-showcase");
  if (!showcase || document.querySelector("#chapter-toc")) return;

  const sections = [...document.querySelectorAll("main > section[id]")]
    .filter((section) => !section.classList.contains("chapter-showcase"))
    .map((section) => ({ section, heading: section.querySelector("h2") }))
    .filter(({ heading }) => heading);
  if (!sections.length) return;

  const toc = document.createElement("nav");
  toc.id = "chapter-toc";
  toc.className = "chapter-toc";
  toc.setAttribute("aria-label", "本章目录");

  const inner = document.createElement("div");
  inner.className = "chapter-toc-inner";

  const title = document.createElement("strong");
  title.className = "chapter-toc-title";
  title.textContent = "本章目录";
  inner.appendChild(title);

  const links = document.createElement("div");
  links.className = "chapter-toc-links";

  const tocLinks = sections.map(({ section, heading }, index) => {
    const link = document.createElement("a");
    link.className = "chapter-toc-link";
    link.href = `#${section.id}`;
    link.textContent = getChapterTocLabel(section, heading);
    link.dataset.tocTarget = section.id;
    if (index === 0) link.setAttribute("aria-current", "location");
    links.appendChild(link);
    return link;
  });

  inner.appendChild(links);
  toc.appendChild(inner);
  showcase.insertAdjacentElement("afterend", toc);

  const returnLink = document.createElement("a");
  returnLink.className = "chapter-toc-return";
  returnLink.href = "#chapter-toc";
  returnLink.setAttribute("aria-label", "返回本章目录");
  returnLink.title = "返回本章目录";
  returnLink.textContent = "↑";
  document.body.appendChild(returnLink);

  let scrollFrame = null;
  function updateChapterToc() {
    scrollFrame = null;
    const marker = window.scrollY + Math.max(150, window.innerHeight * 0.22);
    let activeIndex = 0;

    sections.forEach(({ section }, index) => {
      if (section.offsetTop <= marker) activeIndex = index;
    });

    tocLinks.forEach((link, index) => {
      link.classList.toggle("is-current", index === activeIndex);
      if (index === activeIndex) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    const tocBottom = toc.offsetTop + toc.offsetHeight;
    returnLink.classList.toggle("is-visible", window.scrollY > tocBottom + 240);
  }

  window.addEventListener("scroll", () => {
    if (scrollFrame !== null) return;
    scrollFrame = requestAnimationFrame(updateChapterToc);
  }, { passive: true });
  window.addEventListener("resize", updateChapterToc);
  updateChapterToc();
}

setupChapterToc();

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
  "button[data-volume2-scenario]",
].join(", "));

function setButtonPressedState(button, pressed) {
  button.classList.toggle("is-active", pressed);
  button.setAttribute("aria-pressed", String(pressed));
}

pressedStateButtons.forEach((button) => {
  button.setAttribute("aria-pressed", String(button.classList.contains("is-active")));
});

var QUIZ_PROGRESS_KEY = "physics-preview-quiz-progress";
var ACTIVE_VOLUME_KEY = "physics-preview-active-volume";
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
    title: "上册综合检查",
    href: "chapters/final-check.html",
    focus: "六章主线和期末常见混合题型",
  },
  chapter7: {
    title: "力",
    href: "chapters/chapter7-force.html#force-check",
    focus: "力的作用效果、三要素、弹力和重力",
  },
  chapter8: {
    title: "运动和力",
    href: "chapters/chapter8-motion-force.html#motion-force-check",
    focus: "惯性、二力平衡、摩擦力和二力合成",
  },
  chapter9: {
    title: "压强",
    href: "chapters/chapter9-pressure.html#pressure-check",
    focus: "固体压强、液体压强、大气压和流体流速",
  },
  chapter10: {
    title: "浮力",
    href: "chapters/chapter10-buoyancy.html#buoyancy-check",
    focus: "阿基米德原理、浮沉条件和浮力应用",
  },
  chapter11: {
    title: "功和机械能",
    href: "chapters/chapter11-work-energy.html#work-energy-check",
    focus: "功、功率、动能势能和机械能转化",
  },
  chapter12: {
    title: "简单机械",
    href: "chapters/chapter12-simple-machines.html#machines-check",
    focus: "杠杆、滑轮和机械效率",
  },
  final2: {
    title: "下册综合检查",
    href: "chapters/final-check-volume2.html",
    focus: "力学主线、实验方法和综合计算",
  },
};

var VOLUME_PROGRESS_IDS = {
  1: ["chapter1", "chapter2", "chapter3", "chapter4", "chapter5", "chapter6"],
  2: ["chapter7", "chapter8", "chapter9", "chapter10", "chapter11", "chapter12"],
};

function getActiveHomeVolume() {
  try {
    return localStorage.getItem(ACTIVE_VOLUME_KEY) === "2" ? "2" : "1";
  } catch (error) {
    return "1";
  }
}

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

  document.querySelectorAll("[data-volume-progress]").forEach((summary) => {
    const ids = VOLUME_PROGRESS_IDS[summary.dataset.volumeProgress] || [];
    const mastered = ids.filter((id) => progress[id]?.completed).length;
    const checked = ids.filter((id) => progress[id]).length;
    summary.textContent = checked ? `已掌握 ${mastered}/6 · 已检查 ${checked}/6` : "尚未开始检查";
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

function getAdviceItems(progress, volume) {
  const chapterIds = VOLUME_PROGRESS_IDS[volume];
  const finalId = volume === "2" ? "final2" : "final";
  const attemptedReviews = chapterIds
    .filter((id) => progress[id] && !progress[id].completed)
    .map((id) => [id, progress[id]])
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

  if (!progress[finalId]) {
    return [{
      ...QUIZ_META[finalId],
      record: null,
      label: "收官挑战",
    }];
  }

  return [{
    ...QUIZ_META[finalId],
    record: progress[finalId],
    label: progress[finalId].completed ? "保持手感" : "继续冲刺",
  }];
}

function applyNextStepAdvice() {
  const grid = document.querySelector("#recommendationGrid");
  if (!grid) return;

  const progress = readQuizProgress();
  const volume = getActiveHomeVolume();
  const adviceItems = getAdviceItems(progress, volume);
  grid.replaceChildren(...adviceItems.map(createAdviceCard));

  document.querySelectorAll("[data-home-volume]").forEach((button) => {
    setButtonPressedState(button, button.dataset.homeVolume === volume);
  });

  const title = document.querySelector("#next-step-title");
  if (title) title.textContent = `${volume === "1" ? "上" : "下"}册：先补最值得补的一块`;

  const primaryAction = document.querySelector("#homePrimaryAction");
  const primaryAdvice = adviceItems[0];
  if (!primaryAction || !primaryAdvice) return;

  primaryAction.href = getAdviceHref(primaryAdvice.href, primaryAdvice.record);
  if (!primaryAdvice.record) {
    primaryAction.textContent = primaryAdvice.title.includes("综合检查")
      ? "开始综合检查"
      : `从${primaryAdvice.title}开始`;
  } else if (primaryAdvice.record.completed) {
    primaryAction.textContent = "查看综合检查";
  } else {
    primaryAction.textContent = `继续巩固：${primaryAdvice.title}`;
  }
}

function resetQuizProgress(scope = "all") {
  try {
    if (scope === "all") {
      localStorage.removeItem(QUIZ_PROGRESS_KEY);
    } else {
      const progress = readQuizProgress();
      const finalId = scope === "2" ? "final2" : "final";
      [...VOLUME_PROGRESS_IDS[scope], finalId].forEach((id) => delete progress[id]);
      localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(progress));
    }
  } catch (error) {
    return false;
  }

  applyHomeProgress();
  applyNextStepAdvice();
  return true;
}

function setupProgressReset() {
  const resetButtons = document.querySelectorAll("[data-reset-progress]");
  const resetStatus = document.querySelector("#resetProgressStatus");
  if (!resetButtons.length) return;

  resetButtons.forEach((resetButton) => resetButton.addEventListener("click", () => {
    const requestedScope = resetButton.dataset.resetProgress;
    const scope = requestedScope === "active" ? getActiveHomeVolume() : "all";
    const hasProgress = Object.keys(readQuizProgress()).length > 0;
    if (!hasProgress) {
      if (resetStatus) resetStatus.textContent = "当前已经是未检查状态。";
      return;
    }

    const scopeLabel = scope === "all" ? "上下册全部" : `${scope === "1" ? "上" : "下"}册`;
    const confirmed = window.confirm(`确定要清空${scopeLabel}章节和综合检查的提交记录吗？`);
    if (!confirmed) return;

    const didReset = resetQuizProgress(scope);
    if (resetStatus) {
      resetStatus.textContent = didReset ? `已清空${scopeLabel}检查记录。` : "清空失败，请检查浏览器存储权限。";
    }
  }));
}

function setupHomeVolumeSwitch() {
  document.querySelectorAll("[data-home-volume]").forEach((button) => {
    button.addEventListener("click", () => {
      try {
        localStorage.setItem(ACTIVE_VOLUME_KEY, button.dataset.homeVolume);
      } catch (error) {
        // Recommendation still updates for browsers that block persistence.
      }
      applyNextStepAdvice();
    });
  });
}

applyHomeProgress();
applyNextStepAdvice();
setupProgressReset();
setupHomeVolumeSwitch();
