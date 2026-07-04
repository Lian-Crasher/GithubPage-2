const blockerSlider = document.querySelector("#blockerSlider");
const blockerOutput = document.querySelector("#blockerOutput");
const shadowBlocker = document.querySelector("#shadowBlocker");
const shadowShape = document.querySelector("#shadowShape");
const shadowFeedback = document.querySelector("#shadowFeedback");
const angleSlider = document.querySelector("#angleSlider");
const angleOutput = document.querySelector("#angleOutput");
const angleFeedback = document.querySelector("#angleFeedback");
const mirrorCanvas = document.querySelector("#mirrorCanvas");

function updateShadow() {
  const value = Number(blockerSlider.value);
  const scale = 1.42 - (value - 24) / 92;
  blockerOutput.textContent = `${value}%`;
  shadowBlocker.style.left = `${value}%`;
  shadowShape.style.height = `${Math.max(64, 128 * scale)}px`;
  shadowShape.style.width = `${Math.max(30, 54 * scale)}px`;
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

blockerSlider.addEventListener("input", updateShadow);
angleSlider.addEventListener("input", drawMirror);

setupQuiz({
  formSelector: "#lightQuiz",
  resultSelector: "#lightQuizResult",
  answers: {
    l1: "a",
    l2: "b",
    l3: "a",
    l4: "a",
    l5: "a",
    l6: "a",
    l7: "a",
    l8: "a",
  },
  hints: {
    l1: "第 1 题回看“光的直线传播”：同种均匀介质中光沿直线传播。",
    l2: "第 2 题回看“小孔成像”：小孔成像通常是倒立的实像。",
    l3: "第 3 题回看“光的反射”：反射角等于入射角。",
    l4: "第 4 题回看“平面镜成像”：平面镜成虚像，不能用光屏承接。",
    l5: "第 5 题回看“折射”：筷子看起来弯折主要是光的折射。",
    l6: "第 6 题回看“色散”：三棱镜把白光分解成彩色光带叫色散。",
    l7: "第 7 题回看“折射作图”：水到空气斜射时，折射光线远离法线。",
    l8: "第 8 题回看“平面镜实验”：玻璃板透光，便于确定像的位置。",
  },
  badges: (score) => score >= 7 ? "第四章掌握很稳" : score >= 5 ? "第四章基本过关" : "建议回看光路图",
  successMessage: "很好。你已经能用光路解释影子、镜面成像、折射和彩虹等现象。",
});

updateShadow();
drawMirror();
