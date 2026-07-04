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

riderSlider.addEventListener("input", updateBalance);
massSlider.addEventListener("input", updateDensity);
volumeSlider.addEventListener("input", updateDensity);
densityInputs.forEach((input) => {
  input.addEventListener("input", updateSolidTable);
});

setupQuiz({
  formSelector: "#densityQuiz",
  resultSelector: "#densityQuizResult",
  answers: {
    d1: "a",
    d2: "a",
    d3: "a",
    d4: "a",
    d5: "a",
    d6: "a",
  },
  hints: {
    d1: "第 1 题回看“质量”：质量表示物体所含物质的多少。",
    d2: "第 2 题回看“天平使用”：通常左物右码。",
    d3: "第 3 题回看“密度公式”：ρ = m / V。",
    d4: "第 4 题回看“密度计算”：80 ÷ 10 = 8 g/cm³。",
    d5: "第 5 题回看“排水法”：固体体积等于 V2 - V1。",
    d6: "第 6 题回看“单位换算”：1 g/cm³ = 1000 kg/m³。",
  },
  badges: (score) => score === 6 ? "第六章掌握很稳" : score >= 4 ? "第六章基本过关" : "建议回看密度实验",
  successMessage: "很好。你已经能用质量、体积和密度公式解释材料差异。",
});

setupQuiz({
  formSelector: "#finalQuiz",
  resultSelector: "#finalQuizResult",
  answers: {
    f1: "a",
    f2: "a",
    f3: "a",
    f4: "a",
    f5: "a",
    f6: "a",
    f7: "a",
    f8: "a",
    f9: "a",
    f10: "a",
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
    f9: "第 9 题回看第四章：白光分解成彩色光带叫色散。",
    f10: "第 10 题回看第六章：排水法体积等于 V2 - V1。",
  },
  badges: (score) => score >= 9 ? "上册预习非常稳" : score >= 7 ? "上册主线基本过关" : "建议按反馈回看章节",
  successMessage: "漂亮。你已经抓住八年级上册物理的主要线索，可以带着问题进入课堂。",
});

updateBalance();
updateDensity();
updateSolidTable();
