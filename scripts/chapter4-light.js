const blockerSlider = document.querySelector("#blockerSlider");
const blockerOutput = document.querySelector("#blockerOutput");
const shadowBlocker = document.querySelector("#shadowBlocker");
const shadowShape = document.querySelector("#shadowShape");
const shadowFeedback = document.querySelector("#shadowFeedback");
const shadowCone = document.querySelector("#shadowCone");
const upperBoundaryRay = document.querySelector("#upperBoundaryRay");
const lowerBoundaryRay = document.querySelector("#lowerBoundaryRay");
const blockedRay = document.querySelector("#blockedRay");
const angleSlider = document.querySelector("#angleSlider");
const angleOutput = document.querySelector("#angleOutput");
const angleFeedback = document.querySelector("#angleFeedback");
const mirrorCanvas = document.querySelector("#mirrorCanvas");
const rayPracticeCanvas = document.querySelector("#rayPracticeCanvas");
const rayPracticeAngle = document.querySelector("#rayPracticeAngle");
const rayPracticeAngleOutput = document.querySelector("#rayPracticeAngleOutput");
const rayPracticeFeedback = document.querySelector("#rayPracticeFeedback");
const rayModeButtons = document.querySelectorAll("[data-ray-mode]");
const mediumPathButtons = document.querySelectorAll("[data-medium-path]");
const rayRuleButtons = document.querySelectorAll("[data-ray-rule]");
const refractionSwitch = document.querySelector("#refractionSwitch");
const checkRayPracticeButton = document.querySelector("#checkRayPractice");

let rayPracticeMode = "reflection";
let mediumPath = "air-water";
let selectedRayRule = "";
let rayPracticeChecked = false;

const shadowStage = {
  width: 640,
  height: 280,
  sourceX: 50,
  sourceY: 140,
  blockerHalfWidth: 12,
  blockerHalfHeight: 47,
  screenX: 600,
  screenTop: 36,
  screenBottom: 244,
};

function projectToScreen(edgeX, edgeY) {
  const ratio = (shadowStage.screenX - shadowStage.sourceX) / (edgeX - shadowStage.sourceX);
  return shadowStage.sourceY + (edgeY - shadowStage.sourceY) * ratio;
}

function setLine(line, x1, y1, x2, y2) {
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
}

function updateShadow() {
  const value = Number(blockerSlider.value);
  const blockerX = (value / 100) * shadowStage.width;
  const blockerLeft = blockerX - shadowStage.blockerHalfWidth;
  const blockerRight = blockerX + shadowStage.blockerHalfWidth;
  const blockerTop = shadowStage.sourceY - shadowStage.blockerHalfHeight;
  const blockerBottom = shadowStage.sourceY + shadowStage.blockerHalfHeight;
  const screenTop = projectToScreen(blockerLeft, blockerTop);
  const screenBottom = projectToScreen(blockerLeft, blockerBottom);
  const visibleTop = Math.max(shadowStage.screenTop, Math.min(shadowStage.screenBottom, screenTop));
  const visibleBottom = Math.max(shadowStage.screenTop, Math.min(shadowStage.screenBottom, screenBottom));
  const visibleHeight = Math.max(36, visibleBottom - visibleTop);
  const visibleMid = (visibleTop + visibleBottom) / 2;

  blockerOutput.textContent = `${value}%`;
  shadowBlocker.style.left = `${value}%`;
  shadowShape.style.top = `${(visibleMid / shadowStage.height) * 100}%`;
  shadowShape.style.height = `${(visibleHeight / shadowStage.height) * 100}%`;
  shadowShape.style.width = `${Math.max(30, Math.min(64, visibleHeight * 0.24))}px`;
  shadowCone.setAttribute(
    "d",
    `M ${blockerRight} ${blockerTop} L ${shadowStage.screenX} ${screenTop} L ${shadowStage.screenX} ${screenBottom} L ${blockerRight} ${blockerBottom} Z`,
  );
  setLine(upperBoundaryRay, shadowStage.sourceX, shadowStage.sourceY, shadowStage.screenX, screenTop);
  setLine(lowerBoundaryRay, shadowStage.sourceX, shadowStage.sourceY, shadowStage.screenX, screenBottom);
  setLine(blockedRay, shadowStage.sourceX, shadowStage.sourceY, blockerLeft - 6, shadowStage.sourceY);
  shadowFeedback.textContent = value < 38
    ? "挡板靠近光源，挡住的光锥范围更大，所以屏上的影子变大。"
    : value > 58
      ? "挡板靠近屏幕，影子更接近挡板本身的大小。"
      : "挡板越靠近光源，屏上的影子越大。";
}

function drawMirror() {
  const ctx = mirrorCanvas.getContext("2d");
  const width = mirrorCanvas.width;
  const height = mirrorCanvas.height;
  const angle = Number(angleSlider.value);
  const origin = { x: width / 2, y: height / 2 + 32 };
  const length = 210;
  const rad = (angle * Math.PI) / 180;
  const inStart = {
    x: origin.x - Math.sin(rad) * length,
    y: origin.y - Math.cos(rad) * length,
  };
  const outEnd = {
    x: origin.x + Math.sin(rad) * length,
    y: origin.y - Math.cos(rad) * length,
  };

  angleOutput.textContent = `${angle}°`;
  angleFeedback.textContent = `反射角也为 ${angle}°，两个角都要从法线开始量。`;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#f7fcff";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#9db7c5";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(70, origin.y);
  ctx.lineTo(width - 70, origin.y);
  ctx.stroke();

  ctx.strokeStyle = "#d6e4eb";
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(origin.x, 34);
  ctx.lineTo(origin.x, height - 34);
  ctx.stroke();
  ctx.setLineDash([]);

  drawArrow(ctx, inStart.x, inStart.y, origin.x, origin.y, "#ef6f61");
  drawArrow(ctx, origin.x, origin.y, outEnd.x, outEnd.y, "#1aa6b7");

  ctx.fillStyle = "#26394d";
  ctx.font = "800 18px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillText("法线", origin.x + 12, 58);
  ctx.fillText(`入射角 ${angle}°`, origin.x - 190, origin.y - 88);
  ctx.fillText(`反射角 ${angle}°`, origin.x + 58, origin.y - 88);
}

function drawArrow(ctx, x1, y1, x2, y2, color) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 16 * Math.cos(angle - Math.PI / 6), y2 - 16 * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(x2 - 16 * Math.cos(angle + Math.PI / 6), y2 - 16 * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
}

function setRayPracticeMode(mode) {
  rayPracticeMode = mode;
  selectedRayRule = "";
  rayPracticeChecked = false;
  rayModeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.rayMode === mode);
  });
  rayRuleButtons.forEach((button) => {
    button.classList.remove("is-active");
  });
  refractionSwitch.hidden = mode !== "refraction";
  rayPracticeFeedback.textContent = mode === "reflection"
    ? "反射作图先画法线，再让反射光线与入射光线分居法线两侧，且角度相等。"
    : "折射作图先判断光从哪种介质进入哪种介质，再判断靠近或远离法线。";
  drawRayPractice();
}

function setMediumPath(path) {
  mediumPath = path;
  rayPracticeChecked = false;
  mediumPathButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mediumPath === path);
  });
  rayPracticeFeedback.textContent = path === "air-water"
    ? "空气到水：折射角小于入射角，折射光线靠近法线。"
    : "水到空气：折射角大于入射角，折射光线远离法线。";
  drawRayPractice();
}

function selectRayRule(rule) {
  selectedRayRule = rule;
  rayPracticeChecked = false;
  rayRuleButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.rayRule === rule);
  });
  rayPracticeFeedback.textContent = "已选择规则。点击“检查作图”看看出射光线该怎么画。";
  drawRayPractice();
}

function expectedRayRule() {
  if (rayPracticeMode === "reflection") return "equal";
  return mediumPath === "air-water" ? "toward" : "away";
}

function drawInterface(ctx, origin, width, height) {
  ctx.fillStyle = "#f7fcff";
  ctx.fillRect(0, 0, width, height);

  if (rayPracticeMode === "refraction") {
    ctx.fillStyle = "rgba(26, 166, 183, 0.12)";
    ctx.fillRect(0, origin.y, width, height - origin.y);
    ctx.fillStyle = "#526b7d";
    ctx.font = "800 17px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("空气", 42, origin.y - 26);
    ctx.fillText("水", 42, origin.y + 44);
  }

  ctx.strokeStyle = rayPracticeMode === "reflection" ? "#9db7c5" : "#7fb8c9";
  ctx.lineWidth = rayPracticeMode === "reflection" ? 8 : 4;
  ctx.beginPath();
  ctx.moveTo(54, origin.y);
  ctx.lineTo(width - 54, origin.y);
  ctx.stroke();

  ctx.strokeStyle = "#d6e4eb";
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(origin.x, 36);
  ctx.lineTo(origin.x, height - 36);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawAngleArc(ctx, origin, angle, side, label, normalSide = "up") {
  const radius = 42;
  const start = normalSide === "down" ? Math.PI / 2 : -Math.PI / 2;
  const rad = (angle * Math.PI) / 180;
  const end = normalSide === "down"
    ? side === "left" ? start + rad : start - rad
    : side === "left" ? start - rad : start + rad;
  ctx.strokeStyle = "#8ea7b7";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(origin.x, origin.y, radius, start, end, normalSide === "up" ? side === "left" : side === "right");
  ctx.stroke();
  ctx.fillStyle = "#526b7d";
  ctx.font = "800 14px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillText(label, side === "left" ? origin.x - 90 : origin.x + 44, normalSide === "down" ? origin.y + 58 : origin.y - 34);
}

function drawRayPractice() {
  if (!rayPracticeCanvas) return;

  const ctx = rayPracticeCanvas.getContext("2d");
  const width = rayPracticeCanvas.width;
  const height = rayPracticeCanvas.height;
  const origin = { x: width / 2, y: height / 2 + 12 };
  const angle = Number(rayPracticeAngle.value);
  const incidentRad = (angle * Math.PI) / 180;
  const rayLength = 210;
  const isReflection = rayPracticeMode === "reflection";
  const isWaterToAir = rayPracticeMode === "refraction" && mediumPath === "water-air";
  const incidentStart = {
    x: origin.x - Math.sin(incidentRad) * rayLength,
    y: origin.y + (isWaterToAir ? Math.cos(incidentRad) : -Math.cos(incidentRad)) * rayLength,
  };

  rayPracticeAngleOutput.textContent = `${angle}°`;
  drawInterface(ctx, origin, width, height);
  drawArrow(ctx, incidentStart.x, incidentStart.y, origin.x, origin.y, "#ef6f61");

  ctx.fillStyle = "#26394d";
  ctx.font = "800 18px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillText("法线", origin.x + 12, 58);
  ctx.fillText("入射光线", incidentStart.x - 16, incidentStart.y - 12);
  drawAngleArc(ctx, origin, angle, "left", `入射角 ${angle}°`, isWaterToAir ? "down" : "up");

  if (!rayPracticeChecked) {
    ctx.fillStyle = "#6b7d8e";
    ctx.font = "800 17px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("选择规则后检查，蓝色光线会补出来", origin.x - 170, height - 26);
    return;
  }

  let outgoingAngle = angle;
  let outgoingYSign = -1;
  if (!isReflection) {
    outgoingAngle = mediumPath === "air-water"
      ? Math.max(8, angle * 0.62)
      : Math.min(78, angle * 1.35);
    outgoingYSign = mediumPath === "air-water" ? 1 : -1;
  }

  const outgoingRad = (outgoingAngle * Math.PI) / 180;
  const outgoingEnd = {
    x: origin.x + Math.sin(outgoingRad) * rayLength,
    y: origin.y + outgoingYSign * Math.cos(outgoingRad) * rayLength,
  };
  drawArrow(ctx, origin.x, origin.y, outgoingEnd.x, outgoingEnd.y, "#1aa6b7");

  ctx.fillStyle = "#26394d";
  ctx.font = "800 18px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillText(isReflection ? "反射光线" : "折射光线", outgoingEnd.x - 78, outgoingEnd.y - 12);
  const outgoingNormalSide = isReflection || mediumPath === "water-air" ? "up" : "down";
  drawAngleArc(ctx, origin, outgoingAngle, "right", `${isReflection ? "反射角" : "折射角"} ${Math.round(outgoingAngle)}°`, outgoingNormalSide);
}

function checkRayPractice() {
  const expected = expectedRayRule();
  rayPracticeChecked = true;
  if (!selectedRayRule) {
    rayPracticeFeedback.textContent = "先选择一条作图规则，再检查。";
    drawRayPractice();
    return;
  }

  if (selectedRayRule === expected) {
    rayPracticeFeedback.textContent = rayPracticeMode === "reflection"
      ? "判断正确：反射光线和入射光线分居法线两侧，反射角等于入射角。"
      : mediumPath === "air-water"
        ? "判断正确：光从空气斜射入水中，折射角变小，折射光线靠近法线。"
        : "判断正确：光从水中斜射入空气，折射角变大，折射光线远离法线。";
  } else {
    rayPracticeFeedback.textContent = rayPracticeMode === "reflection"
      ? "再看法线：反射不是靠近或远离法线，而是两侧角度相等。"
      : mediumPath === "air-water"
        ? "再判断介质：空气到水时折射角小于入射角，应靠近法线。"
        : "再判断介质：水到空气时折射角大于入射角，应远离法线。";
  }
  drawRayPractice();
}

blockerSlider.addEventListener("input", updateShadow);
angleSlider.addEventListener("input", drawMirror);
rayPracticeAngle?.addEventListener("input", () => {
  rayPracticeChecked = false;
  drawRayPractice();
});
rayModeButtons.forEach((button) => {
  button.addEventListener("click", () => setRayPracticeMode(button.dataset.rayMode));
});
mediumPathButtons.forEach((button) => {
  button.addEventListener("click", () => setMediumPath(button.dataset.mediumPath));
});
rayRuleButtons.forEach((button) => {
  button.addEventListener("click", () => selectRayRule(button.dataset.rayRule));
});
checkRayPracticeButton?.addEventListener("click", checkRayPractice);

setupQuiz({
  formSelector: "#lightQuiz",
  resultSelector: "#lightQuizResult",
  quizId: "chapter4",
  answers: {
    l1: "a",
    l2: "b",
    l3: "a",
    l4: "a",
    l5: "a",
    l6: "a",
    l7: {
      reflection: "equal",
      airWater: "toward",
      waterAir: "away",
    },
    l8: "a",
  },
  questionTypes: {
    l7: "match",
  },
  hints: {
    l1: "第 1 题回看“光的直线传播”：同种均匀介质中光沿直线传播。",
    l2: "第 2 题回看“小孔成像”：小孔成像通常是倒立的实像。",
    l3: "第 3 题回看“光的反射”：反射角等于入射角。",
    l4: "第 4 题回看“平面镜成像”：平面镜成虚像，不能用光屏承接。",
    l5: "第 5 题回看“折射”：筷子看起来弯折主要是光的折射。",
    l6: "第 6 题回看“色散”：三棱镜把白光分解成彩色光带叫色散。",
    l7: "第 7 题回看“光路作图”：反射角等于入射角；空气到水靠近法线，水到空气远离法线。",
    l8: "第 8 题回看“平面镜实验”：玻璃板透光，便于确定像的位置。",
  },
  reviewLinks: {
    l1: { href: "#straight-light", label: "回看直线传播" },
    l2: { href: "#straight-light", label: "回看小孔成像" },
    l3: { href: "#reflection", label: "回看反射定律" },
    l4: { href: "#reflection", label: "回看平面镜成像" },
    l5: { href: "#refraction", label: "回看折射现象" },
    l6: { href: "#refraction", label: "回看光的色散" },
    l7: { href: "#ray-drawing", label: "回看折射作图" },
    l8: { href: "#ray-drawing", label: "回看平面镜实验" },
  },
  badges: (score) => score >= 7 ? "第四章掌握很稳" : score >= 5 ? "第四章基本过关" : "建议回看光路图",
  successMessage: "很好。你已经能用光路解释影子、镜面成像、折射和彩虹等现象。",
});

updateShadow();
drawMirror();
setRayPracticeMode("reflection");
