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

  lengthOutput.textContent = `${cm.toFixed(1)} cm（${mm} mm）`;
  objectBar.style.width = `${mm}%`;

  if (extraMm === 0) {
    lengthFeedback.textContent = `右端正对 ${wholeCm} cm 长刻度，所以读数是 ${cm.toFixed(1)} cm。`;
  } else if (extraMm === 5) {
    lengthFeedback.textContent = `右端在 ${wholeCm} cm 和 ${wholeCm + 1} cm 的正中间，也就是 ${wholeCm}.5 cm。`;
  } else {
    lengthFeedback.textContent = `右端越过 ${wholeCm} cm 后第 ${extraMm} 个 1 mm 小格，所以读数是 ${cm.toFixed(1)} cm。`;
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
    button.classList.toggle("is-active", button.dataset.reference === reference);
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

setupQuiz({
  formSelector: "#quiz",
  resultSelector: "#quizResult",
  answers: {
    q1: "b",
    q2: "a",
    q3: "b",
    q4: "b",
    q5: "b",
  },
  hints: {
    q1: "第 1 题回看“分度值”：它决定测量工具的精度。",
    q2: "第 2 题回看“参照物”：同桌相对公交车的位置没有变化。",
    q3: "第 3 题回看“速度”：甲 5 m/s，乙 6 m/s，所以乙更快。",
    q4: "第 4 题回看公式：s 表示路程，t 表示时间。",
    q5: "第 5 题回看“误差”：多次测量取平均值能减小误差。",
  },
  badges: (score) => score === 5 ? "预习完成度优秀" : score >= 3 ? "预习基本过关" : "建议再探索一次",
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
