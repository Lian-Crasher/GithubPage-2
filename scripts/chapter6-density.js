const riderSlider = document.querySelector("#riderSlider");
const riderOutput = document.querySelector("#riderOutput");
const massOutput = document.querySelector("#massOutput");
const massSlider = document.querySelector("#massSlider");
const volumeSlider = document.querySelector("#volumeSlider");
const massCalcOutput = document.querySelector("#massCalcOutput");
const volumeOutput = document.querySelector("#volumeOutput");
const densityOutput = document.querySelector("#densityOutput");
const densityFeedback = document.querySelector("#densityFeedback");
const densityInputs = document.querySelectorAll(".density-input");
const solidVolumeCell = document.querySelector("#solidVolumeCell");
const solidDensityCell = document.querySelector("#solidDensityCell");
const solidDensityFeedback = document.querySelector("#solidDensityFeedback");
const densityErrorCases = document.querySelector("#densityErrorCases");
const checkDensityErrorsButton = document.querySelector("#checkDensityErrors");
const densityErrorFeedback = document.querySelector("#densityErrorFeedback");
const densityErrorMessages = {
  low: "结果偏小：质量 m 偏小或体积 V 偏大时，ρ = m / V 会变小。",
  high: "结果偏大：质量 m 偏大或体积 V 偏小时，ρ = m / V 会变大。",
  same: "基本不变：单位换算正确时，质量和体积表示方式变了，密度值对应的物理量不变。",
};

function updateBalance() {
  const rider = Number(riderSlider.value);
  const mass = 70 + rider;
  riderOutput.textContent = `${rider.toFixed(1)} g`;
  massOutput.textContent = `${mass.toFixed(1)} g`;
}

function updateDensity() {
  const mass = Number(massSlider.value);
  const volume = Number(volumeSlider.value);
  const density = mass / volume;
  massCalcOutput.textContent = `${mass} g`;
  volumeOutput.textContent = `${volume} cm³`;
  densityOutput.textContent = `${density.toFixed(2)} g/cm³`;
  if (density > 7) {
    densityFeedback.textContent = "这个数值接近铁、铜等金属的密度区间，物体手感通常会比较沉。";
  } else if (density > 2) {
    densityFeedback.textContent = "这个数值接近铝、玻璃、石块等材料的密度区间。";
  } else {
    densityFeedback.textContent = "这个数值接近水、塑料或木材等较轻材料的密度区间。";
  }
}

function updateSolidTable() {
  const [massInput, v1Input, v2Input] = densityInputs;
  const mass = Number(massInput.value);
  const v1 = Number(v1Input.value);
  const v2 = Number(v2Input.value);
  const volume = v2 - v1;
  const density = mass / volume;

  if (!Number.isFinite(volume) || volume <= 0 || !Number.isFinite(density)) {
    solidVolumeCell.textContent = "--";
    solidDensityCell.textContent = "--";
    solidDensityFeedback.textContent = "请确保放入物体后的水面读数大于放入前读数。";
    return;
  }

  solidVolumeCell.textContent = volume.toFixed(1);
  solidDensityCell.textContent = density.toFixed(2);
  solidDensityFeedback.textContent = `体积为 ${volume.toFixed(1)} cm³，密度约为 ${density.toFixed(2)} g/cm³。`;
}

function chooseDensityError(button) {
  const card = button.closest(".error-case");
  card.querySelectorAll("[data-choice]").forEach((choice) => {
    choice.classList.toggle("is-active", choice === button);
  });
  card.dataset.choice = button.dataset.choice;
  card.dataset.state = "";
  card.querySelector(".case-feedback").textContent = "";
}

function checkDensityErrors() {
  const cards = Array.from(densityErrorCases.querySelectorAll(".error-case"));
  let correct = 0;

  cards.forEach((card) => {
    const isCorrect = card.dataset.choice === card.dataset.answer;
    const feedback = card.querySelector(".case-feedback");
    card.dataset.state = isCorrect ? "correct" : "incorrect";
    if (isCorrect) correct += 1;
    const explanation = card.dataset.feedback || densityErrorMessages[card.dataset.answer];
    feedback.textContent = isCorrect
      ? explanation
      : `再想一步：${explanation}`;
  });

  densityErrorFeedback.textContent = correct === cards.length
    ? "全部判断正确。误差题先看 m 和 V 谁偏了，再带回 ρ = m / V。"
    : `答对 ${correct}/${cards.length} 个。还不稳的题，先标出质量或体积是偏大还是偏小。`;
}

riderSlider.addEventListener("input", updateBalance);
massSlider.addEventListener("input", updateDensity);
volumeSlider.addEventListener("input", updateDensity);
densityInputs.forEach((input) => {
  input.addEventListener("input", updateSolidTable);
});
densityErrorCases?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-choice]");
  if (!button) return;
  chooseDensityError(button);
});
checkDensityErrorsButton?.addEventListener("click", checkDensityErrors);

setupQuiz({
  formSelector: "#densityQuiz",
  resultSelector: "#densityQuizResult",
  quizId: "chapter6",
  answers: {
    d1: "a",
    d2: "a",
    d3: "a",
    d4: "a",
    d5: "a",
    d6: "a",
    d7: "a",
    d8: "a",
  },
  hints: {
    d1: "第 1 题回看“质量”：质量表示物体所含物质的多少。",
    d2: "第 2 题回看“天平使用”：通常左物右码。",
    d3: "第 3 题回看“密度公式”：ρ = m / V。",
    d4: "第 4 题回看“密度计算”：80 ÷ 10 = 8 g/cm³。",
    d5: "第 5 题回看“排水法”：固体体积等于 V2 - V1。",
    d6: "第 6 题回看“单位换算”：1 g/cm³ = 1000 kg/m³。",
    d7: "第 7 题回看“误差方向”：空隙让体积偏大，密度 ρ = m / V 会偏小。",
    d8: "第 8 题回看“天平调平”：指针偏左说明左侧重，平衡螺母向右调。",
  },
  reviewLinks: {
    d1: { href: "#mass", label: "回看质量" },
    d2: { href: "#mass", label: "回看天平使用" },
    d3: { href: "#density-formula", label: "回看密度公式" },
    d4: { href: "#density-formula", label: "回看密度计算" },
    d5: { href: "#measure-density", label: "回看排水法" },
    d6: { href: "#density-formula", label: "回看单位换算" },
    d7: { href: "#density-errors", label: "回看误差方向" },
    d8: { href: "#mass", label: "回看天平调平" },
  },
  badges: (score) => score >= 7 ? "第六章掌握很稳" : score >= 5 ? "第六章基本过关" : "建议回看密度实验",
  successMessage: "很好。你已经能用质量、体积和密度公式解释材料差异。",
});

setupQuiz({
  formSelector: "#finalQuiz",
  resultSelector: "#finalQuizResult",
  quizId: "final",
  answers: {
    f1: "a",
    f2: "a",
    f3: "a",
    f4: "a",
    f5: "a",
    f6: "a",
    f7: "a",
    f8: "a",
    f9: ["reflection", "dispersion"],
    f10: ["5", "5.0"],
    f11: ["静止", "处于静止", "静止状态"],
    f12: ["total", "pour", "remain", "calc"],
    f13: {
      parallel: "focus",
      focus: "axis",
      center: "straight",
    },
    f14: ["bean-gap", "big-volume"],
  },
  questionTypes: {
    f9: "multi",
    f10: "text",
    f11: "text",
    f12: "order",
    f13: "match",
    f14: "multi",
  },
  hints: {
    f1: "第 1 题回看第一章：判断运动和静止要先选参照物。",
    f2: "第 2 题回看第二章：声音传播需要介质。",
    f3: "第 3 题回看第三章：水蒸气直接变成霜是凝华。",
    f4: "第 4 题回看第四章：平面镜像和物到镜面的距离相等。",
    f5: "第 5 题回看第五章：凸透镜对平行光有会聚作用。",
    f6: "第 6 题回看第五章：近视眼通常用凹透镜矫正。",
    f7: "第 7 题回看第六章：密度公式是 ρ = m / V。",
    f8: "第 8 题回看第一章：速度公式中 t 表示时间。",
    f9: "第 9 题回看第四章：平面镜成像和白光色散属于光现象，沸腾是物态变化，回声是声现象。",
    f10: "第 10 题回看第一章速度计算：v = s / t = 60 m ÷ 12 s = 5 m/s。",
    f11: "第 11 题回看第一章 s-t 图像：水平线表示路程不变，所以这一段静止。",
    f12: "第 12 题回看第六章液体密度实验：先称总质量，再倒入量筒读体积，称剩余质量，最后计算。",
    f13: "第 13 题回看第五章透镜作图：平行过焦点、过焦点变平行、过光心不偏折。",
    f14: "第 14 题回看第六章误差方向：体积偏大或质量偏小会让密度偏小。",
  },
  reviewLinks: {
    f1: { href: "chapter1-motion.html#motion", label: "回看参照物" },
    f2: { href: "chapter2-sound.html#sound-origin", label: "回看声音传播" },
    f3: { href: "chapter3-states.html#state-change", label: "回看凝华" },
    f4: { href: "chapter4-light.html#reflection", label: "回看平面镜成像" },
    f5: { href: "chapter5-lenses.html#lens-basics", label: "回看凸透镜" },
    f6: { href: "chapter5-lenses.html#eyes-tools", label: "回看近视矫正" },
    f7: { href: "#density-formula", label: "回看密度公式" },
    f8: { href: "chapter1-motion.html#speed", label: "回看速度公式" },
    f9: { href: "chapter4-light.html#refraction", label: "回看光现象" },
    f10: { href: "chapter1-motion.html#speed", label: "回看速度计算" },
    f11: { href: "chapter1-motion.html#motion-graph", label: "回看 s-t 图像" },
    f12: { href: "#density-errors", label: "回看液体密度实验" },
    f13: { href: "chapter5-lenses.html#lens-practice", label: "回看透镜作图与投影仪调试" },
    f14: { href: "#density-errors", label: "回看误差方向" },
  },
  badges: (score) => score >= 12 ? "上册预习非常稳" : score >= 9 ? "上册主线基本过关" : "建议按反馈回看章节",
  successMessage: "漂亮。你已经抓住八年级上册物理的主要线索，可以带着问题进入课堂。",
});

updateBalance();
updateDensity();
updateSolidTable();
