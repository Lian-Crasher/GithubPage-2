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
    d4: ["8", "8.0", "8g/cm³", "8.0g/cm³", "8g/cm3", "8.0g/cm3", "8克每立方厘米"],
    d5: "a",
    d6: "a",
    d7: ["bean-gap", "big-volume"],
    d8: "a",
  },
  questionTypes: {
    d4: "text",
    d7: "multi",
  },
  answerDetails: {
    d4: "计算过程：ρ = m / V = 80 g ÷ 10 cm³ = 8 g/cm³。",
    d7: "判断方法：体积 V 偏大或质量 m 偏小会让密度偏小；石块带水会让质量偏大，所以密度偏大。",
  },
  hints: {
    d1: "第 1 题回看“质量”：质量表示物体所含物质的多少。",
    d2: "第 2 题回看“天平使用”：通常左物右码。",
    d3: "第 3 题回看“密度公式”：ρ = m / V。",
    d4: "第 4 题回看“密度计算”：80 ÷ 10 = 8 g/cm³。",
    d5: "第 5 题回看“排水法”：固体体积等于 V2 - V1。",
    d6: "第 6 题回看“单位换算”：1 g/cm³ = 1000 kg/m³。",
    d7: "第 7 题回看“误差方向”：体积偏大或质量偏小会让密度 ρ = m / V 偏小。",
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

updateBalance();
updateDensity();
updateSolidTable();
