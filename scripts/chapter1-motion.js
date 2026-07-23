const lengthSlider = document.querySelector("#lengthSlider");
const lengthOutput = document.querySelector("#lengthOutput");
const lengthFeedback = document.querySelector("#lengthFeedback");
const objectBar = document.querySelector("#objectBar");
const rulerTrack = document.querySelector("#rulerTrack");
const distanceSlider = document.querySelector("#distanceSlider");
const timeSlider = document.querySelector("#timeSlider");
const distanceOutput = document.querySelector("#distanceOutput");
const timeOutput = document.querySelector("#timeOutput");
const speedOutput = document.querySelector("#speedOutput");
const speedFeedback = document.querySelector("#speedFeedback");
const car = document.querySelector("#car");
const runCarButton = document.querySelector("#runCar");
const referenceButtons = document.querySelectorAll("[data-reference]");
const referenceResult = document.querySelector("#referenceResult");
const dataInputs = document.querySelectorAll(".data-input");
const calcCells = document.querySelectorAll(".calc-cell");
const averageFeedback = document.querySelector("#averageFeedback");

function buildRuler() {
  if (!rulerTrack || rulerTrack.children.length) return;

  for (let mm = 0; mm <= 100; mm += 1) {
    const tick = document.createElement("span");
    tick.className = `ruler-tick${mm % 10 === 0 ? " cm" : mm % 5 === 0 ? " half" : ""}`;
    tick.style.left = `${mm}%`;
    rulerTrack.appendChild(tick);
  }

  for (let cm = 0; cm <= 10; cm += 1) {
    const label = document.createElement("span");
    label.className = "ruler-label";
    label.style.left = `${cm * 10}%`;
    label.textContent = cm;
    rulerTrack.appendChild(label);
  }
}

function updateLength() {
  const mm = Number(lengthSlider.value);
  const cm = mm / 10;
  const wholeCm = Math.floor(mm / 10);
  const extraMm = mm % 10;

  lengthOutput.textContent = `${cm.toFixed(2)} cm（末位为估读值）`;
  objectBar.style.width = `${mm}%`;

  if (extraMm === 0) {
    lengthFeedback.textContent = `右端正对 ${wholeCm} cm 长刻度，准确值读到 ${cm.toFixed(1)} cm，再估读一位记为 ${cm.toFixed(2)} cm。`;
  } else if (extraMm === 5) {
    lengthFeedback.textContent = `右端在 ${wholeCm} cm 和 ${wholeCm + 1} cm 的正中间，准确值读到 ${wholeCm}.5 cm，再估读一位记为 ${cm.toFixed(2)} cm。`;
  } else {
    lengthFeedback.textContent = `右端越过 ${wholeCm} cm 后第 ${extraMm} 个 1 mm 小格，准确值读到 ${cm.toFixed(1)} cm，再估读一位记为 ${cm.toFixed(2)} cm。`;
  }
}

function updateSpeed() {
  const distance = Number(distanceSlider.value);
  const time = Number(timeSlider.value);
  const speed = distance / time;
  distanceOutput.textContent = `${distance} m`;
  timeOutput.textContent = `${time} s`;
  speedOutput.textContent = `${speed.toFixed(1)} m/s`;
  const percent = Math.min(100, Math.max(0, distance));
  car.style.left = `calc(34px + (100% - 124px) * ${percent / 100})`;

  if (speed >= 12) {
    speedFeedback.textContent = "速度很大：同样 1 秒内，小车能通过更长的路程。";
  } else if (speed <= 3) {
    speedFeedback.textContent = "速度较小：可能是路程短，也可能是用时较长，比较时要同时看 s 和 t。";
  } else {
    speedFeedback.textContent = "速度越大，表示单位时间内通过的路程越长。";
  }
}

function runCar() {
  car.style.transitionDuration = "0s";
  car.style.left = "34px";
  window.requestAnimationFrame(() => {
    const time = Number(timeSlider.value);
    const distance = Number(distanceSlider.value);
    car.style.transitionDuration = `${Math.max(0.5, Math.min(6, time / 5))}s`;
    car.style.left = `calc(34px + (100% - 124px) * ${distance / 100})`;
  });
}

function setReference(reference) {
  referenceButtons.forEach((button) => {
    setButtonPressedState(button, button.dataset.reference === reference);
  });
  if (reference === "bus") {
    referenceResult.textContent = "以公交车为参照物：车上学生的位置没有变化，通常可看作静止；路边树木的位置在变化，像是在向后运动。";
  } else {
    referenceResult.textContent = "以地面为参照物：公交车和车上学生都在运动，路边树木通常可看作静止。";
  }
}

function updateTable() {
  const rows = Array.from(document.querySelectorAll("tbody tr"));
  const speeds = rows.map((row, index) => {
    const inputs = row.querySelectorAll("input");
    const distance = Number(inputs[0].value);
    const time = Number(inputs[1].value);
    const speed = distance > 0 && time > 0 ? distance / time : 0;
    calcCells[index].textContent = speed ? speed.toFixed(2) : "-";
    return speed;
  }).filter(Boolean);

  if (!speeds.length) {
    averageFeedback.textContent = "请输入有效的路程和时间，平均速度才能计算出来。";
    return;
  }

  const countText = speeds.length === 3 ? "三次测得的" : `${speeds.length} 组有效数据的`;
  const average = speeds.reduce((sum, value) => sum + value, 0) / speeds.length;
  const spread = Math.max(...speeds) - Math.min(...speeds);
  averageFeedback.textContent = spread > average * 0.35
    ? `${countText}平均速度的平均值约为 ${average.toFixed(2)} m/s，但各次数据差别偏大，实验时要检查计时和起止位置。`
    : `${countText}平均速度的平均值约为 ${average.toFixed(2)} m/s。数据接近，说明实验比较稳定。`;
}

setupLayeredQuiz({
  formSelector: "#quiz",
  resultSelector: "#quizResult",
  quizId: "chapter1",
  levels: createChapterLayers({
    basic: ["q1", "q2", "q4"],
    application: ["q3", "q7", "q8"],
    inquiry: ["q5", "q6", "q9", "q12"],
    challenge: ["q10", "q11"],
  }),
  answers: {
    q1: "b",
    q2: "a",
    q3: ["6", "6.0", "6m/s", "6.0m/s", "6米每秒"],
    q4: "b",
    q5: "b",
    q6: ["静止", "处于静止", "静止状态", "不动"],
    q7: "a",
    q8: ["5", "5m/s", "5米每秒"],
    q9: ["distance", "time", "calculate"],
    q10: ["first-speed", "stop", "whole"],
    q11: ["20", "20m", "20米"],
    q12: ["distance-same", "time-large", "speed-small"],
  },
  questionTypes: {
    q3: "text",
    q6: "text",
    q8: "text",
    q9: "order",
    q10: "multi",
    q11: "text",
    q12: "multi",
  },
  answerDetails: {
    q3: "计算过程：v = s / t = 48 m ÷ 8 s = 6 m/s。",
    q6: "判断方法：横轴时间在变，纵轴路程不变，所以物体没有继续前进。",
    q8: "全程平均速度要用总路程除以总时间：(60 m + 40 m) ÷ (10 s + 10 s) = 5 m/s。",
    q9: "先确定测量路程，再测量通过这段路程的时间，最后代入速度公式。",
    q10: "先分段读取路程变化，再分别计算分段和全程平均速度。",
    q11: "同向运动的相对速度为 6 m/s - 4 m/s = 2 m/s，10 s 后相距 20 m。",
    q12: "停止计时偏晚会使记录时间偏大。路程仍取 A、C 两点间距离，因此 v = s/t 的计算结果偏小。",
  },
  hints: {
    q1: "第 1 题回看“分度值”：它决定测量工具的精度。",
    q2: "第 2 题回看“参照物”：同桌相对公交车的位置没有变化。",
    q3: "第 3 题回看“速度”：乙的速度是 48 m ÷ 8 s = 6 m/s。",
    q4: "第 4 题回看公式：s 表示路程，t 表示时间。",
    q5: "第 5 题回看“误差”：多次测量取平均值能减小误差。",
    q6: "第 6 题回看 s-t 图像：水平线段表示路程不变，所以这一段处于静止状态。",
    q7: "第 7 题回看“相对运动”：同一直线同方向运动时，乙在相同时间内通过路程更多，说明乙速度更大，以甲为参照物乙向前运动。",
    q8: "平均速度等于全程总路程除以全程总时间。",
    q9: "测量平均速度需要路程和时间两个数据。",
    q10: "路程不变的时间段表示静止；全程平均速度不能直接平均分段速度。",
    q11: "同地同向运动时，先求两者速度差，再乘运动时间。",
    q12: "先判断路程和时间各自是否偏大或偏小，再代入 v = s/t 判断平均速度误差方向。",
  },
  reviewLinks: {
    q1: { href: "#measure", label: "回看长度测量" },
    q2: { href: "#motion", label: "回看参照物" },
    q3: { href: "#speed", label: "回看速度计算" },
    q4: { href: "#speed", label: "回看速度公式" },
    q5: { href: "#lab", label: "回看平均速度实验" },
    q6: { href: "#motion-graph", label: "回看 s-t 图像" },
    q7: { href: "#motion-graph", label: "回看相对运动与图像" },
    q8: { href: "#speed", label: "回看全程平均速度" },
    q9: { href: "#lab", label: "回看平均速度实验" },
    q10: { href: "#motion-graph", label: "回看分段 s-t 数据" },
    q11: { href: "#motion", label: "回看相对运动" },
    q12: { href: "#lab", label: "回看平均速度实验误差" },
  },
  badges: (score) => score === 7 ? "预习完成度优秀" : score >= 5 ? "预习基本过关" : "建议再探索一次",
  successMessage: "很棒。你已经抓住机械运动这一章的预习重点，可以带着自己的问题去上课了。",
});

lengthSlider.addEventListener("input", updateLength);
distanceSlider.addEventListener("input", updateSpeed);
timeSlider.addEventListener("input", updateSpeed);
runCarButton.addEventListener("click", runCar);
referenceButtons.forEach((button) => {
  button.addEventListener("click", () => setReference(button.dataset.reference));
});
dataInputs.forEach((input) => {
  input.addEventListener("input", updateTable);
});

buildRuler();
updateLength();
updateSpeed();
updateTable();
setReference("road");
