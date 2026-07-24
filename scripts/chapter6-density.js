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
const densityLifeButtons = document.querySelectorAll("[data-density-life]");
const densityLifeResult = document.querySelector("#densityLifeResult");
const densityErrorMessages = {
  low: "结果偏小：质量 m 偏小或体积 V 偏大时，ρ = m / V 会变小。",
  high: "结果偏大：质量 m 偏大或体积 V 偏小时，ρ = m / V 会变大。",
  same: "基本不变：单位换算正确时，质量和体积表示方式变了，密度值对应的物理量不变。",
};

const densityLifeMessages = {
  heat: "加热后球内空气平均密度减小，热气球更容易上升。",
  cool: "停止加热后空气逐渐冷却，平均密度增大，热气球的上升能力减弱。",
  color: "只改变气囊颜色不会直接改变球内空气密度，因此不能据此判断升降。",
};

function setDensityLifeScenario(scenario) {
  densityLifeButtons.forEach((button) => {
    setButtonPressedState(button, button.dataset.densityLife === scenario);
  });
  if (densityLifeResult) densityLifeResult.textContent = densityLifeMessages[scenario];
}

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
    setButtonPressedState(choice, choice === button);
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
densityLifeButtons.forEach((button) => {
  button.addEventListener("click", () => setDensityLifeScenario(button.dataset.densityLife));
});

setupLayeredQuiz({
  formSelector: "#densityQuiz",
  resultSelector: "#densityQuizResult",
  quizId: "chapter6",
  levels: createChapterLayers({
    basic: ["d1", "d2", "d3"],
    application: ["d4", "d6", "d9"],
    inquiry: ["d5", "d8", "d10"],
    challenge: ["d7", "d11"],
  }),
  answers: {
    d1: "a",
    d2: "a",
    d3: "a",
    d4: ["8", "8.0", "8g/cm³", "8.0g/cm³", "8g/cm3", "8.0g/cm3", "8克每立方厘米"],
    d5: "a",
    d6: "a",
    d7: ["bean-gap", "big-volume"],
    d8: "a",
    d9: "a",
    d10: ["mass", "density"],
    d11: ["three-readings", "water-mass", "density"],
  },
  questionTypes: {
    d4: "text",
    d7: "multi",
    d10: "multi",
    d11: "multi",
  },
  answerDetails: {
    d4: "计算过程：ρ = m / V = 80 g ÷ 10 cm³ = 8 g/cm³。",
    d5: "判断方法：小石块完全浸没后，水面从 V1 升到 V2，升高的体积 V2 - V1 就是小石块排开水的体积，也就是小石块体积。",
    d7: "判断方法：把空隙也算入红豆体积，或排水法读数偏大，都会让体积 V 偏大，因此 ρ = m / V 偏小；石块带水称质量会让 m 偏大，结果偏大；正确单位换算不会改变物理量本身。",
    d9: "判断方法：球内空气受热后平均密度减小，与外界空气的密度差使热气球更容易上升。",
    d10: "90 g 是烧杯和液体的总质量，计算液体质量要先减去空烧杯质量：90 g - 40 g = 50 g；量筒中这部分液体的体积为 50 cm³，所以 ρ = 50 g ÷ 50 cm³ = 1.0 g/cm³。",
    d11: "电子秤增加的 80 g 对应排开水的质量，因此鸭蛋体积为 80 cm³；ρ = 120 g ÷ 80 cm³ = 1.5 g/cm³。m3 不参与计算。",
  },
  hints: {
    d1: "第 1 题回看“质量”：质量表示物体所含物质的多少。",
    d2: "第 2 题回看“天平使用”：通常左物右码。",
    d3: "第 3 题回看“密度公式”：ρ = m / V。",
    d4: "第 4 题回看“密度计算”：80 ÷ 10 = 8 g/cm³。",
    d5: "第 5 题回看“排水法”：先读原有水体积 V1，再读固体完全浸没后的总体积 V2，固体体积等于 V2 - V1。",
    d6: "第 6 题回看“单位换算”：1 g/cm³ = 1000 kg/m³。",
    d7: "第 7 题回看“误差方向”：体积 V 偏大或质量 m 偏小会让密度 ρ = m / V 偏小；质量偏大会让结果偏大。",
    d8: "第 8 题回看“天平调平”：指针偏左说明左侧重，平衡螺母向右调。",
    d9: "第 9 题回看“密度与社会生活”：热空气平均密度较小，热气球更容易上升。",
    d10: "先确认 90 g 是“烧杯 + 液体”的总质量，再扣除空烧杯质量；量筒读数 50 cm³ 才是液体体积。",
    d11: "先由 m2 - m1 得到排开水的质量，再利用水的密度换算鸭蛋体积；取出后的 m3 是干扰数据。",
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
    d9: { href: "#density-life", label: "回看密度与社会生活" },
    d10: { href: "#measure-density", label: "回看液体密度实验" },
    d11: { href: "#measure-density", label: "回看浸没法测体积" },
  },
  badges: (score) => score >= 8 ? "第六章掌握很稳" : score >= 6 ? "第六章基本过关" : "建议回看密度实验",
  successMessage: "很好。你已经能用质量、体积和密度解释材料差异与生活现象。",
});

updateBalance();
updateDensity();
updateSolidTable();
setDensityLifeScenario("heat");
