const lensButtons = document.querySelectorAll("[data-lens]");
const lensCanvas = document.querySelector("#lensCanvas");
const lensFeedback = document.querySelector("#lensFeedback");
const objectDistanceSlider = document.querySelector("#objectDistanceSlider");
const objectDistanceOutput = document.querySelector("#objectDistanceOutput");
const objectArrow = document.querySelector("#objectArrow");
const imageArrow = document.querySelector("#imageArrow");
const imageRuleResult = document.querySelector("#imageRuleResult");

function drawLens(type = "convex") {
  const ctx = lensCanvas.getContext("2d");
  const width = lensCanvas.width;
  const height = lensCanvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const focus = 138;

  lensButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lens === type);
  });

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#f7fcff";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#d6e4eb";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(34, centerY);
  ctx.lineTo(width - 34, centerY);
  ctx.stroke();

  ctx.fillStyle = type === "convex" ? "rgba(26, 166, 183, 0.25)" : "rgba(239, 111, 97, 0.18)";
  ctx.strokeStyle = type === "convex" ? "#1aa6b7" : "#ef6f61";
  ctx.lineWidth = 4;
  ctx.beginPath();
  if (type === "convex") {
    ctx.ellipse(centerX, centerY, 42, 132, 0, 0, Math.PI * 2);
  } else {
    ctx.moveTo(centerX - 28, centerY - 132);
    ctx.quadraticCurveTo(centerX + 20, centerY, centerX - 28, centerY + 132);
    ctx.lineTo(centerX + 28, centerY + 132);
    ctx.quadraticCurveTo(centerX - 20, centerY, centerX + 28, centerY - 132);
    ctx.closePath();
  }
  ctx.fill();
  ctx.stroke();

  [[centerX - focus, "F"], [centerX + focus, "F"]].forEach(([x, label]) => {
    ctx.fillStyle = "#ef6f61";
    ctx.beginPath();
    ctx.arc(x, centerY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = "900 18px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(label, x - 6, centerY + 28);
  });

  const rays = [centerY - 70, centerY, centerY + 70];
  rays.forEach((y) => {
    drawArrow(ctx, 44, y, centerX - 44, y, "#7b91a4");
    if (type === "convex") {
      drawArrow(ctx, centerX + 44, y, centerX + focus, centerY, "#0b7c72");
    } else {
      const endY = y + (y - centerY) * 0.72;
      drawArrow(ctx, centerX + 44, y, width - 48, endY, "#ef6f61");
      ctx.strokeStyle = "rgba(239, 111, 97, 0.35)";
      ctx.setLineDash([7, 7]);
      ctx.beginPath();
      ctx.moveTo(centerX + 44, y);
      ctx.lineTo(centerX - focus, centerY);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  });

  lensFeedback.textContent = type === "convex"
    ? "凸透镜让平行光会聚到焦点，焦点是真实会聚的位置。"
    : "凹透镜让平行光发散，折射光线的反向延长线会聚到虚焦点。";
}

function updateImageRule() {
  const u = Number(objectDistanceSlider.value);
  const f = 10;
  objectDistanceOutput.textContent = `${u} cm`;
  objectArrow.style.left = `${Math.max(5, 50 - u)}%`;

  if (u > 20) {
    imageArrow.style.left = "69%";
    imageArrow.style.height = "46px";
    imageArrow.classList.add("inverted");
    imageRuleResult.textContent = "物体在 2f 以外：成倒立、缩小的实像，照相机常利用这一规律。";
  } else if (u > f) {
    imageArrow.style.left = "78%";
    imageArrow.style.height = "118px";
    imageArrow.classList.add("inverted");
    imageRuleResult.textContent = "物体在 f 和 2f 之间：成倒立、放大的实像，投影仪常利用这一规律。";
  } else {
    imageArrow.style.left = "18%";
    imageArrow.style.height = "118px";
    imageArrow.classList.remove("inverted");
    imageRuleResult.textContent = "物体在焦点以内：成正立、放大的虚像，放大镜常利用这一规律。";
  }
}

function drawArrow(ctx, x1, y1, x2, y2, color) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 13 * Math.cos(angle - Math.PI / 6), y2 - 13 * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(x2 - 13 * Math.cos(angle + Math.PI / 6), y2 - 13 * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
}

lensButtons.forEach((button) => {
  button.addEventListener("click", () => drawLens(button.dataset.lens));
});
objectDistanceSlider.addEventListener("input", updateImageRule);

setupQuiz({
  formSelector: "#lensesQuiz",
  resultSelector: "#lensesQuizResult",
  answers: {
    e1: "a",
    e2: "a",
    e3: "a",
    e4: "a",
    e5: "a",
    e6: "a",
  },
  hints: {
    e1: "第 1 题回看“透镜形状”：中间厚、边缘薄的是凸透镜。",
    e2: "第 2 题回看“凸透镜”：凸透镜对光有会聚作用。",
    e3: "第 3 题回看“焦距”：焦点到光心的距离叫焦距。",
    e4: "第 4 题回看“照相机”：照相机常成倒立、缩小的实像。",
    e5: "第 5 题回看“放大镜”：物体放在焦点以内时成正立、放大的虚像。",
    e6: "第 6 题回看“近视矫正”：近视眼通常用凹透镜矫正。",
  },
  badges: (score) => score === 6 ? "第五章掌握很稳" : score >= 4 ? "第五章基本过关" : "建议回看成像规律滑台",
  successMessage: "很好。你已经能把透镜作用、成像规律和光学仪器联系起来。",
});

drawLens("convex");
updateImageRule();
