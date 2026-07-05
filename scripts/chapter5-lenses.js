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
  const rayStartX = 44;
  const rayEndX = width - 48;
  const concaveRayEndX = centerX + 180;

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
    drawArrow(ctx, rayStartX, y, centerX, y, "#7b91a4");
    if (type === "convex") {
      drawArrow(ctx, centerX, y, centerX + focus, centerY, "#0b7c72");
    } else {
      const endY = y + (y - centerY) * ((concaveRayEndX - centerX) / focus);
      drawArrow(ctx, centerX, y, concaveRayEndX, endY, "#ef6f61");
      ctx.strokeStyle = "rgba(239, 111, 97, 0.35)";
      ctx.setLineDash([7, 7]);
      ctx.beginPath();
      ctx.moveTo(centerX, y);
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
  const scale = 1.4;
  objectDistanceOutput.textContent = `${u} cm`;
  objectArrow.style.left = `${Math.max(5, 50 - u * scale)}%`;
  imageArrow.style.display = "block";

  if (u > 20) {
    const v = (u * f) / (u - f);
    const magnification = v / u;
    imageArrow.style.left = `${Math.min(93, 50 + v * scale)}%`;
    imageArrow.style.height = `${Math.max(34, 82 * magnification)}px`;
    imageArrow.classList.add("inverted");
    imageRuleResult.textContent = "物体在 2f 以外：成倒立、缩小的实像，照相机常利用这一规律。";
  } else if (u === 20) {
    imageArrow.style.left = `${50 + 20 * scale}%`;
    imageArrow.style.height = "82px";
    imageArrow.classList.add("inverted");
    imageRuleResult.textContent = "物体在 2f 处：成倒立、等大的实像，像距也约为 2f。";
  } else if (u > f) {
    const v = (u * f) / (u - f);
    const magnification = v / u;
    imageArrow.style.left = `${Math.min(93, 50 + v * scale)}%`;
    imageArrow.style.height = `${Math.min(128, 82 * magnification)}px`;
    imageArrow.classList.add("inverted");
    imageRuleResult.textContent = "物体在 f 和 2f 之间：成倒立、放大的实像，投影仪常利用这一规律。";
  } else if (u === f) {
    imageArrow.style.display = "none";
    imageArrow.classList.remove("inverted");
    imageRuleResult.textContent = "物体在焦点处：折射光近似平行射出，光屏上不能得到清晰的像。";
  } else {
    const virtualV = (u * f) / (u - f);
    const magnification = Math.abs(virtualV / u);
    imageArrow.style.left = `${Math.max(8, 50 + virtualV * scale)}%`;
    imageArrow.style.height = `${Math.min(128, 82 * magnification)}px`;
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
  quizId: "chapter5",
  answers: {
    e1: "a",
    e2: "a",
    e3: "a",
    e4: "a",
    e5: "a",
    e6: "a",
    e7: "a",
    e8: "a",
    e9: "a",
    e10: "a",
  },
  hints: {
    e1: "第 1 题回看“透镜形状”：中间厚、边缘薄的是凸透镜。",
    e2: "第 2 题回看“凸透镜”：凸透镜对光有会聚作用。",
    e3: "第 3 题回看“焦距”：焦点到光心的距离叫焦距。",
    e4: "第 4 题回看“照相机”：照相机常成倒立、缩小的实像。",
    e5: "第 5 题回看“放大镜”：物体放在焦点以内时成正立、放大的虚像。",
    e6: "第 6 题回看“近视矫正”：近视眼通常用凹透镜矫正。",
    e7: "第 7 题回看“特殊光线”：平行于主光轴的光线经凸透镜后通过焦点。",
    e8: "第 8 题回看“投影仪”：物体在 f 和 2f 之间，成倒立、放大的实像。",
    e9: "第 9 题回看“物近像远像变大”：手机靠近透镜，投影仪远离屏幕。",
    e10: "第 10 题回看“实像和虚像”：能用光屏承接的是实像，不能承接的是虚像。",
  },
  reviewLinks: {
    e1: { href: "#lens-basics", label: "回看透镜形状" },
    e2: { href: "#lens-basics", label: "回看会聚作用" },
    e3: { href: "#lens-basics", label: "回看焦点和焦距" },
    e4: { href: "#image-rule", label: "回看照相机成像" },
    e5: { href: "#image-rule", label: "回看放大镜成像" },
    e6: { href: "#eyes-tools", label: "回看近视矫正" },
    e7: { href: "#lens-exam", label: "回看特殊光线" },
    e8: { href: "#image-rule", label: "回看投影仪成像" },
    e9: { href: "#lens-exam", label: "回看投影仪调试" },
    e10: { href: "#real-virtual-image", label: "回看实像和虚像" },
  },
  badges: (score) => score >= 9 ? "第五章掌握很稳" : score >= 7 ? "第五章基本过关" : "建议回看成像规律滑台",
  successMessage: "很好。你已经能把透镜作用、成像规律和光学仪器联系起来。",
});

drawLens("convex");
updateImageRule();
