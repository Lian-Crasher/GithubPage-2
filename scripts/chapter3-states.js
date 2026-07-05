const temperatureSlider = document.querySelector("#temperatureSlider");
const temperatureOutput = document.querySelector("#temperatureOutput");
const temperatureFeedback = document.querySelector("#temperatureFeedback");
const thermoMercury = document.querySelector("#thermoMercury");
const stateButtons = document.querySelectorAll("[data-state]");
const stateResult = document.querySelector("#stateResult");
const graphButtons = document.querySelectorAll("[data-graph]");
const graphCanvas = document.querySelector("#graphCanvas");
const graphFeedback = document.querySelector("#graphFeedback");
const boilingOrderList = document.querySelector("#boilingOrderList");
const checkBoilingOrderButton = document.querySelector("#checkBoilingOrder");
const boilingOrderFeedback = document.querySelector("#boilingOrderFeedback");
const temperatureViewButtons = document.querySelectorAll("[data-temperature-view]");
const temperatureViewFeedback = document.querySelector("#temperatureViewFeedback");
const boilingOrderAnswer = ["lamp", "thermometer", "heat", "record", "conclusion"];

function updateTemperature() {
  const temperature = Number(temperatureSlider.value);
  temperatureOutput.textContent = `${temperature} °C`;
  thermoMercury.style.height = `${Math.max(6, temperature)}%`;
  if (temperature >= 90) {
    temperatureFeedback.textContent = "接近沸腾时要特别注意安全；读数仍要等示数稳定。";
  } else if (temperature <= 10) {
    temperatureFeedback.textContent = "低温读数同样要看清分度值，玻璃泡要完全接触被测液体。";
  } else {
    temperatureFeedback.textContent = "等示数稳定后再读数，视线与液面相平。";
  }
}

function chooseTemperatureView(button) {
  temperatureViewButtons.forEach((viewButton) => {
    viewButton.classList.toggle("is-active", viewButton === button);
  });

  if (button.dataset.temperatureView === "level") {
    temperatureViewFeedback.textContent = "判断正确：视线与液柱上表面相平，能减少读数偏差。";
  } else {
    temperatureViewFeedback.textContent = "再调整视线：从上方或下方斜看都会产生偏差，读数时要和液柱上表面相平。";
  }
}

function setState(state) {
  const messages = {
    solid: "固态出发：固态变液态是熔化，吸热；固态直接变气态是升华，也吸热，例如樟脑片变小。",
    liquid: "液态出发：液态变固态是凝固，放热；液态变气态是汽化，吸热，包括蒸发和沸腾。",
    gas: "气态出发：气态变液态是液化，放热；气态直接变固态是凝华，霜和雾凇常与它有关。",
  };
  stateButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.state === state);
  });
  stateResult.textContent = messages[state];
}

function drawGraph(type = "crystal") {
  const ctx = graphCanvas.getContext("2d");
  const width = graphCanvas.width;
  const height = graphCanvas.height;
  const plot = {
    left: 62,
    right: width - 30,
    top: 28,
    bottom: height - 52,
  };
  const dataSets = {
    crystal: {
      color: "#0b7c72",
      points: [[0, 28], [2, 42], [4, 48], [7, 48], [9, 60], [10, 68]],
      text: "晶体熔化时有水平平台：继续吸热，但温度暂时保持不变。",
      minY: 20,
      maxY: 80,
    },
    wax: {
      color: "#ef6f61",
      points: [[0, 25], [2, 33], [4, 42], [6, 51], [8, 61], [10, 72]],
      text: "非晶体熔化没有固定熔点，吸热过程中温度持续升高。",
      minY: 20,
      maxY: 80,
    },
    boil: {
      color: "#1aa6b7",
      points: [[0, 90], [1, 94], [2, 97], [3, 100], [6, 100], [10, 100]],
      text: "水沸腾后温度保持在沸点附近，但仍要持续吸热才能维持沸腾。",
      minY: 88,
      maxY: 104,
    },
  };
  const current = dataSets[type];

  graphButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.graph === type);
  });

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#f7fcff";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#d7e8ef";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i += 1) {
    const x = plot.left + (plot.right - plot.left) * i / 5;
    const y = plot.bottom - (plot.bottom - plot.top) * i / 5;
    ctx.beginPath();
    ctx.moveTo(x, plot.top);
    ctx.lineTo(x, plot.bottom);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(plot.left, y);
    ctx.lineTo(plot.right, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "#526b7d";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(plot.left, plot.top);
  ctx.lineTo(plot.left, plot.bottom);
  ctx.lineTo(plot.right, plot.bottom);
  ctx.stroke();

  ctx.fillStyle = "#5f6f82";
  ctx.font = "700 16px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillText("温度", 16, 36);
  ctx.fillText("时间", plot.right - 36, height - 16);

  const toX = (time) => plot.left + (plot.right - plot.left) * time / 10;
  const toY = (temp) => plot.bottom - (plot.bottom - plot.top) * (temp - current.minY) / (current.maxY - current.minY);

  ctx.strokeStyle = current.color;
  ctx.lineWidth = 5;
  ctx.beginPath();
  current.points.forEach(([time, temp], index) => {
    const x = toX(time);
    const y = toY(temp);
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();

  ctx.fillStyle = current.color;
  current.points.forEach(([time, temp]) => {
    ctx.beginPath();
    ctx.arc(toX(time), toY(temp), 6, 0, Math.PI * 2);
    ctx.fill();
  });

  graphFeedback.textContent = current.text;
}

function updateBoilingOrderControls() {
  if (!boilingOrderList) return;

  const items = Array.from(boilingOrderList.children);
  items.forEach((item, index) => {
    item.querySelector(".order-index").textContent = index + 1;
    item.querySelector('[data-move="up"]').disabled = index === 0;
    item.querySelector('[data-move="down"]').disabled = index === items.length - 1;
  });
}

function moveBoilingStep(item, direction) {
  if (!boilingOrderList || !item) return;

  if (direction === "up" && item.previousElementSibling) {
    boilingOrderList.insertBefore(item, item.previousElementSibling);
  }

  if (direction === "down" && item.nextElementSibling) {
    boilingOrderList.insertBefore(item.nextElementSibling, item);
  }

  updateBoilingOrderControls();
  boilingOrderFeedback.textContent = "顺序已调整。检查前先想一想：哪些器材位置必须先确定？";
}

function checkBoilingOrder() {
  const current = Array.from(boilingOrderList.children).map((item) => item.dataset.step);
  const wrongIndexes = current
    .map((step, index) => step === boilingOrderAnswer[index] ? null : index + 1)
    .filter(Boolean);

  if (!wrongIndexes.length) {
    boilingOrderFeedback.textContent = "排序正确：先按酒精灯外焰确定装置，再放温度计，加热记录，最后根据温度平台和气泡现象下结论。";
    return;
  }

  boilingOrderFeedback.textContent = `还要调整第 ${wrongIndexes.join("、")} 步。关键是先搭好装置，再加热观察，最后分析数据和现象。`;
}

setupQuiz({
  formSelector: "#statesQuiz",
  resultSelector: "#statesQuizResult",
  quizId: "chapter3",
  answers: {
    p1: "a",
    p2: "b",
    p3: "a",
    p4: "a",
    p5: "a",
    p6: "a",
    p7: ["lamp", "beaker", "thermometer"],
    p8: "a",
  },
  questionTypes: {
    p7: "order",
  },
  answerDetails: {
    p7: "实验逻辑：酒精灯高度不易调，先定热源，再让烧杯处在外焰加热位置，最后让温度计玻璃泡浸入水中且不碰底和壁。",
  },
  hints: {
    p1: "第 1 题回看“温度”：温度表示物体的冷热程度。",
    p2: "第 2 题回看“温度计的使用”：读数时视线要与液面相平。",
    p3: "第 3 题回看“熔化和凝固”：固态冰变液态水是熔化。",
    p4: "第 4 题回看“水的沸腾”：沸腾后继续吸热，温度保持在沸点附近。",
    p5: "第 5 题回看“蒸发”：蒸发是汽化的一种形式，汽化吸热。",
    p6: "第 6 题回看“升华和凝华”：霜通常是水蒸气凝华形成。",
    p7: "第 7 题回看“水的沸腾实验”：先定酒精灯，再按外焰高度安装陶土网和烧杯，最后悬挂温度计。",
    p8: "第 8 题回看“热胀冷缩”：同长同升温时，线膨胀系数越大，伸长量越大。",
  },
  reviewLinks: {
    p1: { href: "#temperature", label: "回看温度概念" },
    p2: { href: "#temperature-reading-practice", label: "练习温度计读数" },
    p3: { href: "#state-change", label: "回看物态变化" },
    p4: { href: "#boiling-exam", label: "回看水的沸腾" },
    p5: { href: "#state-change", label: "回看汽化吸热" },
    p6: { href: "#state-change", label: "回看升华和凝华" },
    p7: { href: "#boiling-exam", label: "回看沸腾实验" },
    p8: { href: "#thermal-expansion", label: "回看热胀冷缩" },
  },
  badges: (score) => score >= 7 ? "第三章掌握很稳" : score >= 5 ? "第三章基本过关" : "建议回看物态变化地图",
  successMessage: "很好。你已经能把温度、状态变化、吸热放热和生活现象联系起来。",
});

setupQuiz({
  formSelector: "#halfQuiz",
  resultSelector: "#halfQuizResult",
  quizId: "half",
  answers: {
    h1: "a",
    h2: "b",
    h3: "a",
    h4: "b",
    h5: "b",
    h6: "a",
    h7: "b",
    h8: "c",
  },
  hints: {
    h1: "第 1 题回看第二章开头：声音由物体振动产生。",
    h2: "第 2 题回看声音传播：真空不能传声，声音传播需要介质。",
    h3: "第 3 题回看声音特性：频率决定音调。",
    h4: "第 4 题回看声的利用：超声清洗利用声传递能量。",
    h5: "第 5 题回看温度定义：温度表示冷热程度。",
    h6: "第 6 题回看熔化和凝固：固态冰变液态水是熔化。",
    h7: "第 7 题回看沸腾图像：沸腾后持续吸热，温度保持在沸点附近。",
    h8: "第 8 题回看升华和凝华：霜通常是水蒸气凝华形成。",
  },
  reviewLinks: {
    h1: { href: "chapter2-sound.html#sound-origin", label: "回看声音的产生" },
    h2: { href: "chapter2-sound.html#sound-origin", label: "回看声音传播" },
    h3: { href: "chapter2-sound.html#sound-origin", label: "回看声音特性" },
    h4: { href: "chapter2-sound.html#sound-use", label: "回看声的利用" },
    h5: { href: "#temperature", label: "回看温度" },
    h6: { href: "#state-change", label: "回看熔化" },
    h7: { href: "#boiling-exam", label: "回看沸腾图像" },
    h8: { href: "#state-change", label: "回看升华和凝华" },
  },
  badges: (score) => score >= 7 ? "前三章预习很稳" : score >= 5 ? "前三章基本过关" : "建议回看关键实验",
  successMessage: "很好。你已经能用振动、介质、温度、吸放热和图像来解释前三章的核心现象。",
});

temperatureSlider.addEventListener("input", updateTemperature);
temperatureViewButtons.forEach((button) => {
  button.addEventListener("click", () => chooseTemperatureView(button));
});
stateButtons.forEach((button) => {
  button.addEventListener("click", () => setState(button.dataset.state));
});
graphButtons.forEach((button) => {
  button.addEventListener("click", () => drawGraph(button.dataset.graph));
});
boilingOrderList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-move]");
  if (!button) return;
  moveBoilingStep(button.closest("li"), button.dataset.move);
});
checkBoilingOrderButton?.addEventListener("click", checkBoilingOrder);

updateTemperature();
setState("solid");
drawGraph();
updateBoilingOrderControls();
