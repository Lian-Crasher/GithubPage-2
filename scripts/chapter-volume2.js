const volume2QuizConfigs = {
  force: {
    quizId: "chapter7",
    levels: createChapterLayers({
      basic: ["f1", "f2", "f3", "f4"],
      application: ["f5", "f6", "f7", "f11"],
      inquiry: ["f8", "f9"],
      challenge: ["f10"],
    }),
    answers: {
      f1: "a", f2: "a", f3: "a", f4: "a", f5: ["30", "30n", "30牛"], f6: "a", f7: "a",
      f8: ["proportional", "predict"], f9: ["check", "hang", "read"],
      f10: ["equal", "opposite", "different"], f11: ["3.2", "3.2n", "3.2牛"],
    },
    questionTypes: { f5: "text", f8: "multi", f9: "order", f10: "multi", f11: "text" },
    answerDetails: {
      f8: "先计算伸长量：1 N、2 N、3 N 分别对应 1 cm、2 cm、3 cm；结论只在弹性限度内成立。",
      f9: "测量前检查仪器，挂上被测物后等待稳定，最后读数。",
      f10: "相互作用力等大、反向、作用在两个物体上，因此不能在同一物体上抵消。",
      f11: "物体质量不随地点改变，月球重力 G = mg = 2 kg × 1.6 N/kg = 3.2 N。",
    },
    hints: {
      f1: "先读成“磁体对铁钉施力”，磁体是施力物体。",
      f2: "橡皮泥由原形变扁，属于形状改变。",
      f3: "力的三要素是大小、方向和作用点。",
      f4: "测量前要认清量程、分度值，并检查指针是否指零。",
      f5: "G = mg = 3 kg × 10 N/kg = 30 N。",
      f6: "相互作用力同时产生、方向相反，分别作用在两个物体上。",
      f7: "力的示意图要在受力物体上标出作用点，并让箭头指向力的方向。",
      f8: "先用弹簧长度减原长得到伸长量，再比较伸长量和拉力。",
      f9: "弹簧测力计应先检查，再测量，示数稳定后读数。",
      f10: "不要把作用在两个物体上的相互作用力当成同一物体上的平衡力。",
      f11: "质量保持 2 kg，代入月球表面的 g 计算重力。",
    },
    reviewLinks: {
      f1: { href: "#force-basics", label: "回看施力与受力物体" }, f2: { href: "#force-basics", label: "回看力的作用效果" },
      f3: { href: "#force-basics", label: "回看力的三要素" }, f4: { href: "#elastic-force", label: "回看测力计" },
      f5: { href: "#gravity", label: "回看重力计算" }, f6: { href: "#force-basics", label: "回看相互作用" },
      f7: { href: "#force-basics", label: "回看力的示意图" }, f8: { href: "#elastic-force", label: "回看弹簧实验" },
      f9: { href: "#elastic-force", label: "回看测力计使用" }, f10: { href: "#force-basics", label: "回看相互作用力" },
      f11: { href: "#gravity", label: "回看重力与质量" },
    },
    successMessage: "很好。你已经能从作用关系出发描述和计算力。",
  },
  "motion-force": {
    quizId: "chapter8",
    levels: createChapterLayers({
      basic: ["m1", "m2", "m3"],
      application: ["m4", "m5", "m6", "m9", "m11"],
      inquiry: ["m7", "m8"],
      challenge: ["m10"],
    }),
    answers: {
      m1: "a", m2: "a", m3: "a", m4: "a", m5: ["13", "13n", "13牛"], m6: "a",
      m7: ["rough", "pressure"], m8: ["same-height", "surface", "distance"], m9: "a",
      m10: ["inertia", "mass"], m11: ["5", "5n", "5牛"],
    },
    questionTypes: { m5: "text", m7: "multi", m8: "order", m10: "multi", m11: "text" },
    answerDetails: {
      m7: "比较接触面时要保持压力相同；比较压力时要保持接触面相同。",
      m8: "同一高度释放保证小车到达水平面时速度相同，再改变水平面的粗糙程度并比较运动距离。",
      m10: "惯性是物体的属性，只与质量有关；刹车时不存在向前的“惯性力”。",
      m11: "两个力方向相反，合力大小为 12 N - 7 N = 5 N，方向与较大的力相同。",
    },
    hints: {
      m1: "不受力时，原来静止就保持静止，原来运动就保持匀速直线运动。",
      m2: "惯性是一切物体的固有属性。",
      m3: "平衡力必须作用在同一个物体上。",
      m4: "增大压力或增大接触面的粗糙程度，都可以增大滑动摩擦力。",
      m5: "同向二力合成用加法：8 N + 5 N = 13 N。",
      m6: "匀速直线运动说明水平方向合力为零。",
      m7: "每次比较只能改变一个因素，其他条件要保持相同。",
      m8: "实验要让小车以相同速度进入不同水平面，再比较运动距离。",
      m9: "合力为零只能说明运动状态不改变，不能说明物体一定静止。",
      m10: "刹车前乘客随车向前运动，脚先减速，上身仍保持原运动状态。",
      m11: "反向二力的合力用较大力减较小力。",
    },
    reviewLinks: {
      m1: { href: "#inertia", label: "回看牛顿第一定律" }, m2: { href: "#inertia", label: "回看惯性" },
      m3: { href: "#balance", label: "回看二力平衡" }, m4: { href: "#friction", label: "回看摩擦力" },
      m5: { href: "#resultant", label: "回看二力合成" }, m6: { href: "#balance", label: "回看平衡状态" },
      m7: { href: "#friction", label: "回看摩擦力实验" }, m8: { href: "#inertia", label: "回看阻力实验" },
      m9: { href: "#balance", label: "回看平衡状态" }, m10: { href: "#inertia", label: "回看惯性" },
      m11: { href: "#resultant", label: "回看反向二力合成" },
    },
    successMessage: "很好。你已经能把运动状态和物体受力联系起来。",
  },
  pressure: {
    quizId: "chapter9",
    answers: {
      p1: "b", p2: "c", p3: "b", p4: "a",
      p5: ["10000", "10000pa", "1×10^4", "1*10^4", "1e4"],
      p6: "c", p7: ["15000", "15000pa", "1.5×10^4", "1.5*10^4", "1.5e4"],
      p8: "b", p9: "c", p10: "b", p11: ["a", "c"],
      p12: ["outer", "inner", "gate"],
      p13: ["same-pressure", "not-communicating", "density-ratio"],
    },
    questionTypes: { p5: "text", p7: "text", p11: "multi", p12: "order", p13: "multi" },
    levels: [
      { id: "basic", title: "基础", description: "概念、单位与基本规律", questionKeys: ["p1", "p2", "p3", "p4"], passScore: 3 },
      { id: "application", title: "应用", description: "公式计算与生活解释", questionKeys: ["p5", "p6", "p7"], passScore: 2 },
      { id: "inquiry", title: "探究", description: "实验现象与装置过程", questionKeys: ["p8", "p9", "p10"], passScore: 2 },
      { id: "challenge", title: "挑战", description: "控制变量与综合迁移", questionKeys: ["p11", "p12", "p13"], passScore: 2, required: false },
    ],
    hints: {
      p1: "压强等于压力除以受力面积。", p2: "压力不变，减小受力面积可增大压强。",
      p3: "同种液体中，深度越大压强越大。", p4: "标准大气压约为 1.013 × 10⁵ Pa。",
      p5: "p = F/S = 300 N ÷ 0.03 m² = 10 000 Pa。", p6: "流体流速越大处，压强越小。",
      p7: "p = ρgh = 1.0×10³ × 10 × 1.5 = 15 000 Pa。", p8: "同种液体静止时，连通器各部分液面在同一水平面。",
      p9: "大气压决定的是管内外水银面的竖直高度差；倾斜后水银柱长度会增大。", p10: "提起活塞时，下腔压强减小，A 关闭、B 打开。",
      p11: "比较液体压强方向时，应保持液体种类和探头深度不变，只改变探头方向。",
      p12: "船由上游驶向下游时，要先让闸室与上游水位相平，再关上游闸门并向下游放水，最后打开下游闸门。",
      p13: "同一密闭气室使两套装置承受相同压强差，因此 ρCghC = ρDghD，ρC/ρD = 6/4 = 1.5；液体C密度更大。",
    },
    reviewLinks: {
      p1: { href: "#solid-pressure", label: "回看压强公式" }, p2: { href: "#solid-pressure", label: "回看增减压强" },
      p3: { href: "#liquid-pressure", label: "回看液体压强" }, p4: { href: "#atmospheric-pressure", label: "回看大气压" },
      p5: { href: "#solid-pressure", label: "回看压强计算" }, p6: { href: "#flow-pressure", label: "回看流速与压强" },
      p7: { href: "#liquid-pressure", label: "回看液体压强计算" }, p8: { href: "#communicating-vessels-lab", label: "回看连通器" },
      p9: { href: "#atmospheric-pressure", label: "回看托里拆利实验" }, p10: { href: "#pump", label: "回看抽水机阀门" },
      p11: { href: "#liquid-pressure", label: "回看液体压强探究" }, p12: { href: "#communicating-vessels-lab", label: "回看船闸过程" },
      p13: { href: "#liquid-pressure", label: "回看U形管压强计" },
    },
    answerDetails: {
      p11: "控制变量实验中，只能改变要研究的探头方向，其余条件必须保持一致。",
      p12: "船闸的关键始终是先平水位，再开对应闸门。",
      p13: "压强差相同时，U形管内液体密度与液面高度差成反比；压强计一端连接密闭气室，不符合连通器上端均开口的条件。",
    },
    successMessage: "很好。你已经能用压强解释固体、液体和气体中的现象。",
  },
  buoyancy: {
    quizId: "chapter10",
    levels: createChapterLayers({
      basic: ["b1", "b3", "b4"],
      application: ["b2", "b5", "b6"],
      inquiry: ["b7", "b8", "b9"],
      challenge: ["b10", "b11"],
    }),
    answers: {
      b1: "a", b2: "a", b3: "a", b4: "a", b5: ["30", "30n", "30牛"], b6: "a", b7: "a", b8: "a",
      b9: ["confound", "same-object", "same-buoyancy"], b10: ["max", "float", "displaced"],
      b11: ["0.0002", "2e-4", "2×10^−4", "2×10^-4", "2*10^-4"],
    },
    questionTypes: { b5: "text", b9: "multi", b10: "multi", b11: "text" },
    answerDetails: {
      b9: "甲、乙同时改变了浸入深度和排开水的体积，不能把浮力变化单独归因于深度。应让同一物体完全浸没在不同深度，控制排开体积不变。",
      b10: "小球重 4 N，小于完全浸没时的最大浮力 5 N，因此会上浮并最终漂浮；漂浮时 V排 = G/(ρg)。",
      b11: "先用称重法得 F浮 = 5 N - 3 N = 2 N，再由 V排 = F浮/(ρg) 得 2×10⁻⁴ m³。",
    },
    hints: {
      b1: "浮力方向竖直向上。", b2: "称重法：F浮 = G - F示 = 8 N - 5 N。",
      b3: "浮力等于物体排开液体所受的重力。", b4: "漂浮是平衡状态，所以 F浮 = G。",
      b5: "F浮 = ρ水gV排 = 1000 × 10 × 0.003 = 30 N。", b6: "漂浮时浮力等于重力；液体越密，所需排开体积越小。",
      b7: "浮力来自上下表面压力差：F浮 = F下 - F上 = 13 N - 5 N = 8 N。",
      b8: "标度杆越细，相同的排开体积变化会对应更长、更容易辨认的刻度距离。",
      b9: "控制变量实验一次只能改变一个因素；同一物体完全浸没后，继续下移不会改变排开液体体积。",
      b10: "先比较物体重力和完全浸没时的最大浮力，再判断最终状态。",
      b11: "先由弹簧测力计示数差求浮力，再用阿基米德原理求排开体积。",
    },
    reviewLinks: {
      b1: { href: "#buoyancy-force", label: "回看浮力方向" }, b2: { href: "#buoyancy-force", label: "回看称重法" },
      b3: { href: "#archimedes", label: "回看阿基米德原理" }, b4: { href: "#floating", label: "回看漂浮条件" },
      b5: { href: "#archimedes", label: "回看浮力计算" }, b6: { href: "#floating", label: "回看密度计" },
      b7: { href: "#buoyancy-cause", label: "回看浮力产生原因" }, b8: { href: "#micro-density-meter", label: "回看微型密度计" },
      b9: { href: "#archimedes", label: "回看浮力影响因素" }, b10: { href: "#floating", label: "回看浮沉条件" },
      b11: { href: "#archimedes", label: "回看称重法与阿基米德原理" },
    },
    successMessage: "很好。你已经能从排开液体和受力平衡判断浮力问题。",
  },
  "work-energy": {
    quizId: "chapter11",
    levels: createChapterLayers({
      basic: ["w1", "w2", "w3", "w4", "w6"],
      application: ["w5", "w7", "w10"],
      inquiry: ["w8", "w9", "w12"],
      challenge: ["w11"],
    }),
    answers: {
      w1: "a", w2: "a", w3: "a", w4: "a", w5: ["300", "300j", "300焦", "300焦耳"], w6: "a",
      w7: ["200", "200w", "200瓦", "200瓦特"], w8: ["same-ball", "height-speed", "distance"],
      w9: "a", w10: "a", w11: ["100", "100j", "100焦", "100焦耳"],
      w12: ["mass", "height", "time"],
    },
    questionTypes: { w5: "text", w7: "text", w8: "multi", w11: "text", w12: "multi" },
    answerDetails: {
      w8: "研究动能与速度的关系时要控制钢球质量相同，并用木块移动距离把难以直接观察的动能大小显示出来。",
      w11: "最高点的重力势能 mgh = 100 J；忽略阻力时机械能守恒，落地前转化为 100 J 动能。",
      w12: "15次引体向上的总有用功近似为 15mgh，平均功率 P = 15mgh/t，因此需要质量、每次重心上升高度和总时间。",
    },
    hints: {
      w1: "做功必须有力，并在力的方向上移动距离。", w2: "功率表示单位时间内做功的多少。",
      w3: "同一物体速度越大，动能越大。", w4: "质量不变时，位置越高重力势能越大。",
      w5: "W = Fs = 50 N × 6 m = 300 J。", w6: "下落时高度减小、速度增大，重力势能转化为动能。",
      w7: "P = W/t = 600 J ÷ 3 s = 200 W。",
      w8: "控制质量相同、改变速度，并用木块移动距离反映动能大小。",
      w9: "研究质量的影响时，只改变质量，保持高度等其他条件相同。",
      w10: "光滑斜面上高度降低、速度增大，反映势能向动能转化。",
      w11: "忽略阻力时，初始重力势能会转化为落地前的动能。",
      w12: "先写出每次克服重力做功 mgh，再乘次数并除以总时间。",
    },
    reviewLinks: {
      w1: { href: "#work", label: "回看做功条件" }, w2: { href: "#power", label: "回看功率" },
      w3: { href: "#energy-factors", label: "回看动能" }, w4: { href: "#energy-factors", label: "回看重力势能" },
      w5: { href: "#work", label: "回看功的计算" }, w6: { href: "#mechanical-energy", label: "回看机械能转化" },
      w7: { href: "#power", label: "回看功率计算" }, w8: { href: "#energy-factors", label: "回看动能实验" },
      w9: { href: "#energy-factors", label: "回看势能实验" }, w10: { href: "#mechanical-energy", label: "回看斜面能量转化" },
      w11: { href: "#mechanical-energy", label: "回看机械能守恒模型" },
      w12: { href: "#power", label: "回看功率测量" },
    },
    successMessage: "很好。你已经能判断做功、比较功率并追踪机械能转化。",
  },
  "simple-machines": {
    quizId: "chapter12",
    levels: createChapterLayers({
      basic: ["s1", "s2", "s4"],
      application: ["s3", "s5", "s7"],
      inquiry: ["s8", "s9", "s10"],
      challenge: ["s6", "s11", "s12"],
    }),
    answers: {
      s1: "a", s2: "a", s3: "a", s4: "a", s5: ["40", "40n", "40牛"], s6: "a", s7: "a",
      s8: ["balance", "record", "repeat"], s9: ["useful", "total", "efficiency"],
      s10: "a", s11: ["80", "80%", "0.8"],
      s12: ["time", "useful", "total", "power"],
    },
    questionTypes: { s5: "text", s8: "order", s9: "multi", s11: "text", s12: "multi" },
    answerDetails: {
      s8: "先调节杠杆自身水平平衡，再改变钩码和位置记录数据，最后多次实验寻找普遍规律。",
      s9: "W有 = Gh = 100 J，W总 = Fs = 120 J，η = W有/W总 ≈ 83.3%。",
      s11: "W有 = 240 N × 2 m = 480 J，W总 = 100 N × 6 m = 600 J，η = 80%。",
      s12: "汽车重力为1.5×10⁴ N；t = h/v = 20 s；W有 = Gh = 9.0×10⁴ J；W总 = W有/η = 1.8×10⁵ J；P = W总/t = 9.0×10³ W。",
    },
    hints: {
      s1: "杠杆平衡时，动力乘动力臂等于阻力乘阻力臂。", s2: "力臂是支点到力的作用线的垂直距离。",
      s3: "定滑轮不省力，但能改变施力方向。", s4: "机械效率是有用功与总功之比，真实机械小于 100%。",
      s5: "F₁ = F₂l₂/l₁ = 100 × 0.2 ÷ 0.5 = 40 N。", s6: "省力机械会费距离，真实机械还要克服摩擦或提升机械本身。",
      s7: "理想动滑轮由两段绳子承担物重，拉力等于物重的一半。",
      s8: "实验要先消除杠杆自身不平衡，再多次改变条件寻找规律。",
      s9: "分别计算有用功和总功，再用二者之比求机械效率。",
      s10: "杠杆水平时，竖直力的力臂可直接由杠杆刻度读出。",
      s11: "绳端移动距离已给出，分别计算 W有 = Gh 和 W总 = Fs。",
      s12: "先把1.5 t换算成1500 kg，再依次计算时间、有用功、总功和功率。",
    },
    reviewLinks: {
      s1: { href: "#lever", label: "回看杠杆平衡" }, s2: { href: "#lever", label: "回看力臂" },
      s3: { href: "#pulley", label: "回看定滑轮" }, s4: { href: "#efficiency", label: "回看机械效率" },
      s5: { href: "#lever", label: "回看杠杆计算" }, s6: { href: "#efficiency", label: "回看省力与功" },
      s7: { href: "#pulley", label: "回看动滑轮" }, s8: { href: "#lever", label: "回看杠杆实验" },
      s9: { href: "#efficiency", label: "回看机械效率实验" }, s10: { href: "#lever", label: "回看力臂测量" },
      s11: { href: "#efficiency", label: "回看滑轮组效率计算" },
      s12: { href: "#efficiency", label: "回看机械效率综合计算" },
    },
    successMessage: "很好。你已经能同时判断简单机械的省力特点和能量代价。",
  },
};

function formatNumber(value, digits = 1) {
  return Number(value).toFixed(digits);
}

function setSharpForceArrow(line, tipX, tipY, head = null) {
  if (!line) return;
  const arrowHead = head || document.getElementById(line.dataset.forceHead);
  if (!arrowHead) return;
  const startX = Number(line.getAttribute("x1"));
  const startY = Number(line.getAttribute("y1"));
  const deltaX = tipX - startX;
  const deltaY = tipY - startY;
  const length = Math.hypot(deltaX, deltaY);
  if (length < 1) return;
  const unitX = deltaX / length;
  const unitY = deltaY / length;
  const normalX = -unitY;
  const normalY = unitX;
  const headLength = 12;
  const halfWidth = 7;
  const baseX = tipX - unitX * headLength;
  const baseY = tipY - unitY * headLength;
  const shaftEndX = tipX - unitX * 9;
  const shaftEndY = tipY - unitY * 9;
  line.setAttribute("x2", String(shaftEndX));
  line.setAttribute("y2", String(shaftEndY));
  line.dataset.forceTipX = String(tipX);
  line.dataset.forceTipY = String(tipY);
  arrowHead.setAttribute("d", `M${tipX} ${tipY} L${baseX + normalX * halfWidth} ${baseY + normalY * halfWidth} L${baseX - normalX * halfWidth} ${baseY - normalY * halfWidth} Z`);
}

function setupStaticSharpForceArrows() {
  document.querySelectorAll("[data-force-head][data-force-tip-x][data-force-tip-y]").forEach((line) => {
    setSharpForceArrow(line, Number(line.dataset.forceTipX), Number(line.dataset.forceTipY));
  });
}

function setupForceVectorLab() {
  const slider = document.querySelector("#forceVectorSizeSlider");
  if (!slider) return;
  const directionButtons = document.querySelectorAll("[data-force-direction]");
  const pointButtons = document.querySelectorAll("[data-force-point]");
  const diagram = document.querySelector("#forceVectorDiagram");
  const arrow = document.querySelector("#forceVectorArrow");
  const valueLabel = document.querySelector("#forceVectorValue");
  const sizeOutput = document.querySelector("#forceVectorSizeOutput");
  const feedback = document.querySelector("#forceVectorFeedback");
  const pointNodes = {
    left: document.querySelector("#forcePointLeft"),
    center: document.querySelector("#forcePointCenter"),
    right: document.querySelector("#forcePointRight"),
  };
  const points = {
    left: { x: 234, y: 170, label: "左侧" },
    center: { x: 310, y: 170, label: "中心" },
    right: { x: 386, y: 170, label: "右侧" },
  };
  const directions = {
    right: { angle: 0, label: "水平向右" },
    "up-right": { angle: -45, label: "斜向右上" },
    left: { angle: 180, label: "水平向左" },
  };
  let selectedDirection = "right";
  let selectedPoint = "center";

  const update = () => {
    const force = Number(slider.value);
    const point = points[selectedPoint];
    const direction = directions[selectedDirection];
    const length = 80 + ((force - 20) / 80) * 100;
    const radians = direction.angle * Math.PI / 180;
    const endX = point.x + Math.cos(radians) * length;
    const endY = point.y + Math.sin(radians) * length;
    arrow?.setAttribute("x1", String(point.x));
    arrow?.setAttribute("y1", String(point.y));
    setSharpForceArrow(arrow, endX, endY);
    if (valueLabel) {
      valueLabel.setAttribute("x", String((point.x + endX) / 2));
      valueLabel.setAttribute("y", String(Math.max(28, (point.y + endY) / 2 - 18)));
      valueLabel.textContent = `F = ${force} N`;
    }
    if (sizeOutput) sizeOutput.textContent = `${force} N`;
    Object.entries(pointNodes).forEach(([key, node]) => node?.classList.toggle("is-selected", key === selectedPoint));
    if (feedback) feedback.textContent = `箭尾在小车${point.label}，箭头${direction.label}，箭头长度表示 ${force} N。`;
    diagram?.setAttribute("aria-label", `${force}牛的力从小车${point.label}${direction.label}作用，箭头长度表示力的大小`);
  };

  directionButtons.forEach((button) => button.addEventListener("click", () => {
    selectedDirection = button.dataset.forceDirection;
    directionButtons.forEach((item) => setButtonPressedState(item, item === button));
    update();
  }));
  pointButtons.forEach((button) => button.addEventListener("click", () => {
    selectedPoint = button.dataset.forcePoint;
    pointButtons.forEach((item) => setButtonPressedState(item, item === button));
    update();
  }));
  slider.addEventListener("input", update);
  update();
}

function setupSpringLab() {
  const slider = document.querySelector("#springForceSlider");
  if (!slider) return;
  const diagram = document.querySelector("#springDiagram");
  const springPath = document.querySelector("#springLabPath");
  const block = document.querySelector("#springLabBlock");
  const indicator = document.querySelector("#springScaleIndicator");
  const diagramValue = document.querySelector("#springDiagramValue");
  const forceOutput = document.querySelector("#springForceOutput");
  const extensionOutput = document.querySelector("#springExtensionOutput");

  const buildSpringPath = (endY) => {
    const turns = 10;
    let path = "M310 42 L310 62";
    for (let index = 0; index < turns; index += 1) {
      const x = index % 2 === 0 ? 276 : 344;
      const y = 68 + ((endY - 74) * (index + 1)) / turns;
      path += ` L${x} ${y}`;
    }
    return `${path} L310 ${endY}`;
  };

  const update = () => {
    const force = Number(slider.value);
    const ratio = force / 5;
    const blockY = 132 + ratio * 88;
    const extension = Math.round(ratio * 100);
    springPath?.setAttribute("d", buildSpringPath(blockY));
    block?.setAttribute("y", String(blockY));
    indicator?.setAttribute("y1", String(82 + ratio * 200));
    indicator?.setAttribute("y2", String(82 + ratio * 200));
    if (diagramValue) {
      diagramValue.setAttribute("y", String(blockY + 43));
      diagramValue.textContent = `${formatNumber(force)} N`;
    }
    if (forceOutput) forceOutput.textContent = `${formatNumber(force)} N`;
    if (extensionOutput) extensionOutput.textContent = `${extension}%`;
    diagram?.setAttribute("aria-label", `弹簧受到${formatNumber(force)}牛拉力，示意伸长程度为百分之${extension}`);
  };

  slider.addEventListener("input", update);
  update();
}

function setupGravityCalculator() {
  const slider = document.querySelector("#forceMassSlider");
  if (!slider) return;
  const location = document.querySelector("#gravityLocationSelect");
  const massOutput = document.querySelector("#forceMassOutput");
  const gravityOutput = document.querySelector("#gravityOutput");
  const gOutput = document.querySelector("#gravityGOutput");
  const gravityArrow = document.querySelector("#gravityArrow");
  const diagramValue = document.querySelector("#gravityDiagramValue");
  const locationName = document.querySelector("#gravityLocationName");
  const feedback = document.querySelector("#gravityFeedback");
  const diagram = document.querySelector("#gravityDiagram");
  const locationDetails = {
    earth: { label: "地球 · 教材近似", aria: "地球教材近似条件", ground: "#74c69d", sky: "#edf8fb" },
    moon: { label: "月球", aria: "月球", ground: "#aeb7c5", sky: "#eef0f6" },
    mars: { label: "火星", aria: "火星", ground: "#d8895b", sky: "#fdf2ea" },
  };
  const update = () => {
    const mass = Number(slider.value);
    const selectedOption = location?.selectedOptions[0];
    const locationKey = location?.value || "earth";
    const details = locationDetails[locationKey];
    const g = Number(selectedOption?.dataset.g || 10);
    const gravity = mass * g;
    const arrowLength = 48 + Math.sqrt(Math.min(1, gravity / 100)) * 92;
    const arrowEnd = 134 + arrowLength;
    massOutput.textContent = `${formatNumber(mass)} kg`;
    gravityOutput.textContent = `${formatNumber(gravity)} N`;
    if (gOutput) gOutput.textContent = `${Number.isInteger(g) ? g : formatNumber(g)} N/kg`;
    setSharpForceArrow(gravityArrow, 310, arrowEnd);
    if (diagramValue) {
      diagramValue.setAttribute("y", String(Math.min(248, arrowEnd - 10)));
      diagramValue.textContent = `G = ${formatNumber(gravity)} N`;
    }
    if (locationName) locationName.textContent = details.label;
    if (diagram) {
      diagram.dataset.location = locationKey;
      diagram.style.setProperty("--gravity-ground", details.ground);
      diagram.style.setProperty("--gravity-sky", details.sky);
      diagram.setAttribute("aria-label", `质量${formatNumber(mass)}千克的物体在${details.aria}受到${formatNumber(gravity)}牛竖直向下的重力`);
    }
    if (feedback) feedback.textContent = `地点改变时质量仍为 ${formatNumber(mass)} kg；在${details.label}条件下，重力为 ${formatNumber(gravity)} N。`;
  };
  slider.addEventListener("input", update);
  location?.addEventListener("change", update);
  update();
}

function setupInertiaSurfaceLab() {
  const buttons = document.querySelectorAll("[data-inertia-surface]");
  if (!buttons.length) return;
  const diagram = document.querySelector("#inertiaDiagram");
  const surface = document.querySelector("#inertiaSurface");
  const cart = document.querySelector("#inertiaCart");
  const stopMarker = document.querySelector("#inertiaStopMarker");
  const distanceLine = document.querySelector("#inertiaDistanceLine");
  const surfaceLabel = document.querySelector("#inertiaSurfaceLabel");
  const distanceLabel = document.querySelector("#inertiaDistanceLabel");
  const feedback = document.querySelector("#inertiaFeedback");
  const surfaces = {
    cloth: {
      label: "棉布",
      stopX: 292,
      className: "surface-cloth",
      distance: "滑行较短",
      resistance: "较大",
      message: "棉布较粗糙，阻力较大，小车速度减小得快，滑行距离较短。",
    },
    board: {
      label: "木板",
      stopX: 428,
      className: "surface-board",
      distance: "滑行较远",
      resistance: "较小",
      message: "木板阻力较小，小车速度减小得较慢，因此比在棉布上滑得更远。",
    },
    ideal: {
      label: "理想光滑面",
      stopX: 536,
      className: "surface-ideal",
      distance: "继续匀速运动",
      resistance: "为 0",
      message: "进一步推理：若阻力为 0，小车速度不再减小，将一直做匀速直线运动。",
    },
  };

  const selectSurface = (key) => {
    const selected = surfaces[key];
    buttons.forEach((button) => setButtonPressedState(button, button.dataset.inertiaSurface === key));
    if (surface) surface.setAttribute("class", `inertia-surface ${selected.className}`);
    cart?.setAttribute("transform", `translate(${selected.stopX - 38} 0)`);
    stopMarker?.setAttribute("x1", String(selected.stopX));
    stopMarker?.setAttribute("x2", String(selected.stopX));
    stopMarker?.toggleAttribute("hidden", key === "ideal");
    distanceLine?.setAttribute("x2", String(selected.stopX));
    if (surfaceLabel) surfaceLabel.textContent = selected.label;
    if (distanceLabel) {
      distanceLabel.setAttribute("x", String((194 + selected.stopX) / 2));
      distanceLabel.textContent = selected.distance;
    }
    if (feedback) feedback.textContent = selected.message;
    if (diagram) {
      diagram.dataset.surface = key;
      diagram.setAttribute("aria-label", `小车从同一高度滑下，在${selected.label}上受到的阻力${selected.resistance}，${selected.distance}`);
    }
  };

  buttons.forEach((button) => button.addEventListener("click", () => selectSurface(button.dataset.inertiaSurface)));
  selectSurface("board");
}

function setupBalanceLab() {
  const left = document.querySelector("#balanceLeftSlider");
  const right = document.querySelector("#balanceRightSlider");
  if (!left || !right) return;
  const diagram = document.querySelector("#balanceDiagram");
  const leftArrow = document.querySelector("#balanceLeftArrow");
  const rightArrow = document.querySelector("#balanceRightArrow");
  const leftLabel = document.querySelector("#balanceLeftLabel");
  const rightLabel = document.querySelector("#balanceRightLabel");
  const diagramState = document.querySelector("#balanceDiagramState");
  const result = document.querySelector("#balanceResult");
  const feedback = document.querySelector("#balanceFeedback");

  const update = () => {
    const leftForce = Number(left.value);
    const rightForce = Number(right.value);
    const net = rightForce - leftForce;
    const leftEnd = 252 - (48 + leftForce * 14);
    const rightEnd = 368 + 48 + rightForce * 14;
    document.querySelector("#balanceLeftOutput").textContent = `${leftForce} N`;
    document.querySelector("#balanceRightOutput").textContent = `${rightForce} N`;
    setSharpForceArrow(leftArrow, leftEnd, 154);
    setSharpForceArrow(rightArrow, rightEnd, 154);
    if (leftLabel) {
      leftLabel.setAttribute("x", String(leftEnd - 8));
      leftLabel.textContent = `左拉力 ${leftForce} N`;
    }
    if (rightLabel) {
      rightLabel.setAttribute("x", String(rightEnd + 8));
      rightLabel.textContent = `右拉力 ${rightForce} N`;
    }
    if (net === 0) {
      if (diagramState) diagramState.textContent = "合力 0 N · 平衡";
      if (result) result.textContent = "平衡";
      if (feedback) feedback.textContent = "两个力大小相等、方向相反，小车在水平方向受力平衡。";
      diagram?.setAttribute("aria-label", `小车受到左右各${leftForce}牛、方向相反的拉力，水平方向二力平衡`);
      return;
    }
    const direction = net > 0 ? "向右" : "向左";
    if (diagramState) diagramState.textContent = `合力 ${Math.abs(net)} N · ${direction}`;
    if (result) result.textContent = `不平衡 · ${direction}`;
    if (feedback) feedback.textContent = `两个力大小不相等，合力为 ${Math.abs(net)} N、方向${direction}，小车的运动状态将改变。`;
    diagram?.setAttribute("aria-label", `小车受到向左${leftForce}牛和向右${rightForce}牛的拉力，合力${Math.abs(net)}牛、方向${direction}`);
  };

  left.addEventListener("input", update);
  right.addEventListener("input", update);
  update();
}

function setupFrictionLab() {
  const pressure = document.querySelector("#frictionPressureSlider");
  const buttons = document.querySelectorAll("[data-friction-surface]");
  if (!pressure || !buttons.length) return;
  const diagram = document.querySelector("#frictionDiagram");
  const surface = document.querySelector("#frictionSurface");
  const frictionArrow = document.querySelector("#frictionForceArrow");
  const pullArrow = document.querySelector("#frictionPullArrow");
  const frictionLabel = document.querySelector("#frictionForceLabel");
  const pullLabel = document.querySelector("#frictionPullLabel");
  const pressureLabel = document.querySelector("#frictionPressureLabel");
  const surfaceLabel = document.querySelector("#frictionSurfaceLabel");
  const surfaceOptions = {
    smooth: { label: "光滑木板", coefficient: 0.18, className: "surface-smooth" },
    board: { label: "普通木板", coefficient: 0.3, className: "surface-board" },
    rough: { label: "粗糙毛巾", coefficient: 0.5, className: "surface-rough" },
  };
  let selectedSurface = "board";

  const update = () => {
    const pressureValue = Number(pressure.value);
    const selected = surfaceOptions[selectedSurface];
    const friction = pressureValue * selected.coefficient;
    const arrowLength = 48 + (friction / 6) * 96;
    const leftEnd = 248 - arrowLength;
    const rightEnd = 372 + arrowLength;
    document.querySelector("#frictionPressureOutput").textContent = `${pressureValue} N`;
    document.querySelector("#frictionResult").textContent = `约 ${formatNumber(friction)} N`;
    if (surface) surface.setAttribute("class", `friction-surface ${selected.className}`);
    setSharpForceArrow(frictionArrow, leftEnd, 190);
    setSharpForceArrow(pullArrow, rightEnd, 154);
    if (frictionLabel) {
      frictionLabel.setAttribute("x", String(leftEnd - 8));
      frictionLabel.textContent = `摩擦力 ${formatNumber(friction)} N`;
    }
    if (pullLabel) {
      pullLabel.setAttribute("x", String(rightEnd + 8));
      pullLabel.textContent = `拉力 ${formatNumber(friction)} N`;
    }
    if (pressureLabel) pressureLabel.textContent = `压力 ${pressureValue} N`;
    if (surfaceLabel) surfaceLabel.textContent = selected.label;
    buttons.forEach((button) => setButtonPressedState(button, button.dataset.frictionSurface === selectedSurface));
    if (diagram) {
      diagram.dataset.surface = selectedSurface;
      diagram.setAttribute("aria-label", `木块在${selected.label}上匀速向右滑动，压力${pressureValue}牛，滑动摩擦力约${formatNumber(friction)}牛`);
    }
  };

  buttons.forEach((button) => button.addEventListener("click", () => {
    selectedSurface = button.dataset.frictionSurface;
    update();
  }));
  pressure.addEventListener("input", update);
  update();
}

function setupResultantLab() {
  const firstForce = document.querySelector("#resultantF1Slider");
  const secondForce = document.querySelector("#resultantF2Slider");
  const directionButtons = document.querySelectorAll("[data-resultant-direction]");
  if (!firstForce || !secondForce || !directionButtons.length) return;
  const diagram = document.querySelector("#resultantDiagram");
  const firstArrow = document.querySelector("#resultantF1Arrow");
  const secondArrow = document.querySelector("#resultantF2Arrow");
  const forceArrow = document.querySelector("#resultantForceArrow");
  const forceArrowHead = document.querySelector("#resultantForceHead");
  const zeroMark = document.querySelector("#resultantZeroMark");
  const firstLabel = document.querySelector("#resultantF1Label");
  const secondLabel = document.querySelector("#resultantF2Label");
  const diagramLabel = document.querySelector("#resultantDiagramLabel");
  const result = document.querySelector("#resultantResult");
  let secondDirection = "same";

  const update = () => {
    const first = Number(firstForce.value);
    const second = Number(secondForce.value);
    const firstEnd = 350 + 48 + first * 12;
    const secondLength = 48 + second * 12;
    const secondStart = secondDirection === "same" ? 350 : 270;
    const secondEnd = secondDirection === "same" ? secondStart + secondLength : secondStart - secondLength;
    const net = secondDirection === "same" ? first + second : first - second;
    const magnitude = Math.abs(net);
    const direction = net > 0 ? "向右" : net < 0 ? "向左" : "无方向";
    const resultantEnd = net === 0 ? 310 : 310 + Math.sign(net) * (48 + magnitude * 8);
    document.querySelector("#resultantF1Output").textContent = `${first} N`;
    document.querySelector("#resultantF2Output").textContent = `${second} N`;
    setSharpForceArrow(firstArrow, firstEnd, 122);
    secondArrow?.setAttribute("x1", String(secondStart));
    setSharpForceArrow(secondArrow, secondEnd, 168);
    if (firstLabel) {
      firstLabel.setAttribute("x", String(firstEnd + 8));
      firstLabel.textContent = `F₁ ${first} N`;
    }
    if (secondLabel) {
      secondLabel.setAttribute("x", String(secondEnd + (secondDirection === "same" ? 8 : -8)));
      secondLabel.setAttribute("text-anchor", secondDirection === "same" ? "start" : "end");
      secondLabel.textContent = `F₂ ${second} N`;
    }
    if (net !== 0) setSharpForceArrow(forceArrow, resultantEnd, 250);
    forceArrow?.toggleAttribute("hidden", net === 0);
    forceArrowHead?.toggleAttribute("hidden", net === 0);
    zeroMark?.toggleAttribute("hidden", net !== 0);
    if (diagramLabel) {
      diagramLabel.setAttribute("x", String(net === 0 ? 310 : (310 + resultantEnd) / 2));
      diagramLabel.textContent = net === 0 ? "合力 0 N" : `合力 ${magnitude} N · ${direction}`;
    }
    if (result) result.textContent = net === 0 ? "0 N" : `${magnitude} N · ${direction}`;
    directionButtons.forEach((button) => setButtonPressedState(button, button.dataset.resultantDirection === secondDirection));
    diagram?.setAttribute("aria-label", `物体受到向右${first}牛和${secondDirection === "same" ? "向右" : "向左"}${second}牛的两个力，合力${magnitude}牛${net === 0 ? "" : `、方向${direction}`}`);
  };

  directionButtons.forEach((button) => button.addEventListener("click", () => {
    secondDirection = button.dataset.resultantDirection;
    update();
  }));
  firstForce.addEventListener("input", update);
  secondForce.addEventListener("input", update);
  update();
}

function setupPressureCalculator() {
  const force = document.querySelector("#pressureForceSlider");
  const area = document.querySelector("#pressureAreaSlider");
  if (!force || !area) return;
  const diagram = document.querySelector("#pressureDiagram");
  const block = document.querySelector("#pressureBlock");
  const forceArrow = document.querySelector("#pressureForceArrow");
  const forceLabel = document.querySelector("#pressureForceLabel");
  const contactMeasure = document.querySelector("#contactMeasure");
  const areaLabel = document.querySelector("#pressureAreaLabel");
  const meterFill = document.querySelector("#pressureMeterFill");
  const indent = document.querySelector("#pressureIndent");
  const update = () => {
    const forceValue = Number(force.value);
    const areaValue = Number(area.value);
    const pressure = Math.round(forceValue / areaValue);
    const areaRatio = (areaValue - 0.005) / 0.095;
    const blockWidth = 64 + areaRatio * 150;
    const blockX = 310 - blockWidth / 2;
    const forceRatio = (forceValue - 50) / 550;
    const meterHeight = 18 + Math.min(1, pressure / 120000) * 110;
    document.querySelector("#pressureForceOutput").textContent = `${force.value} N`;
    document.querySelector("#pressureAreaOutput").textContent = `${areaValue.toFixed(3)} m²`;
    document.querySelector("#pressureOutput").textContent = `${pressure.toLocaleString("zh-CN")} Pa`;
    block?.setAttribute("x", String(blockX));
    block?.setAttribute("width", String(blockWidth));
    forceArrow?.setAttribute("y1", String(78 - forceRatio * 48));
    setSharpForceArrow(forceArrow, 310, 108);
    if (forceLabel) forceLabel.textContent = `F = ${forceValue} N`;
    contactMeasure?.setAttribute("x1", String(blockX));
    contactMeasure?.setAttribute("x2", String(blockX + blockWidth));
    if (areaLabel) areaLabel.textContent = `S = ${areaValue.toFixed(3)} m²`;
    meterFill?.setAttribute("y", String(204 - meterHeight));
    meterFill?.setAttribute("height", String(meterHeight));
    indent?.setAttribute("x", String(blockX));
    indent?.setAttribute("width", String(blockWidth));
    indent?.setAttribute("height", String(4 + Math.min(1, pressure / 120000) * 20));
    diagram?.setAttribute("aria-label", `物体受到${forceValue}牛向下压力，受力面积${areaValue.toFixed(3)}平方米，压强${pressure.toLocaleString("zh-CN")}帕`);
  };
  force.addEventListener("input", update); area.addEventListener("input", update); update();
}

function setupLiquidPressureLab() {
  const depth = document.querySelector("#liquidDepthSlider");
  const liquidType = document.querySelector("#liquidPressureType");
  const directionButtons = document.querySelectorAll("[data-probe-direction]");
  if (!depth || !liquidType) return;
  const diagram = document.querySelector("#liquidPressureDiagram");
  const tank = document.querySelector("#liquidPressureTank");
  const probe = document.querySelector("#liquidPressureProbe");
  const membrane = document.querySelector("#liquidProbeMembrane");
  const probeTube = document.querySelector("#liquidProbeTube");
  const depthMeasure = document.querySelector("#liquidDepthMeasure");
  const depthTick = document.querySelector("#liquidDepthTick");
  const depthLabel = document.querySelector("#liquidPressureDepthLabel");
  const leftLiquid = document.querySelector("#uTubeLeftLiquid");
  const rightLiquid = document.querySelector("#uTubeRightLiquid");
  const deltaLine = document.querySelector("#uTubeDeltaLine");
  const deltaLabel = document.querySelector("#uTubeDeltaLabel");
  const feedback = document.querySelector("#liquidPressureFeedback");
  const colors = { oil: "#e8c16a", water: "#8bd8e7", salt: "#63c5d5" };
  const directions = { down: "向下", up: "向上", left: "向左", right: "向右" };
  let selectedDirection = "down";

  const update = () => {
    const depthValue = Number(depth.value);
    const selected = liquidType.selectedOptions[0];
    const density = Number(selected.dataset.density);
    const pressure = density * 10 * depthValue;
    const ratio = pressure / 48000;
    const probeY = 96 + ((depthValue - 0.5) / 3.5) * 158;
    const delta = 12 + ratio * 58;
    const leftTop = 194 + delta / 2;
    const rightTop = 194 - delta / 2;
    document.querySelector("#liquidDepthOutput").textContent = `${depthValue.toFixed(1)} m`;
    document.querySelector("#liquidPressureOutput").textContent = `${formatNumber(pressure / 1000)} kPa`;
    probe?.setAttribute("cy", String(probeY));
    probeTube?.setAttribute("d", `M232 ${probeY} H354 Q390 ${probeY} 390 176`);
    if (depthMeasure) depthMeasure.setAttribute("y2", String(probeY));
    if (depthTick) {
      depthTick.setAttribute("y1", String(probeY));
      depthTick.setAttribute("y2", String(probeY));
    }
    if (depthLabel) {
      depthLabel.setAttribute("y", String((78 + probeY) / 2 + 5));
      depthLabel.textContent = `h = ${depthValue.toFixed(1)} m`;
    }
    if (membrane) {
      const positions = {
        down: [202, probeY + 18, 226, probeY + 18],
        up: [202, probeY - 18, 226, probeY - 18],
        left: [196, probeY - 12, 196, probeY + 12],
        right: [232, probeY - 12, 232, probeY + 12],
      };
      const [x1, y1, x2, y2] = positions[selectedDirection];
      membrane.setAttribute("x1", String(x1));
      membrane.setAttribute("y1", String(y1));
      membrane.setAttribute("x2", String(x2));
      membrane.setAttribute("y2", String(y2));
    }
    if (tank) tank.style.fill = colors[liquidType.value] || colors.water;
    leftLiquid?.setAttribute("y", String(leftTop));
    leftLiquid?.setAttribute("height", String(288 - leftTop));
    rightLiquid?.setAttribute("y", String(rightTop));
    rightLiquid?.setAttribute("height", String(288 - rightTop));
    deltaLine?.setAttribute("y1", String(rightTop));
    deltaLine?.setAttribute("y2", String(leftTop));
    if (deltaLabel) deltaLabel.setAttribute("y", String((leftTop + rightTop) / 2 + 5));
    const liquidName = selected.textContent.split("·")[0].trim();
    if (feedback) feedback.textContent = `${liquidName}中深度为 ${depthValue.toFixed(1)} m，橡皮膜${directions[selectedDirection]}，压强约 ${formatNumber(pressure / 1000)} kPa；保持深度不变时，改变方向不会改变液面高度差。`;
    diagram?.setAttribute("aria-label", `压强计探头位于${liquidName}下${depthValue.toFixed(1)}米，橡皮膜${directions[selectedDirection]}，液体压强约${formatNumber(pressure / 1000)}千帕`);
  };

  depth.addEventListener("input", update);
  liquidType.addEventListener("change", update);
  directionButtons.forEach((button) => button.addEventListener("click", () => {
    selectedDirection = button.dataset.probeDirection;
    directionButtons.forEach((item) => setButtonPressedState(item, item === button));
    update();
  }));
  update();
}

function setupShipLockLab() {
  const buttons = document.querySelectorAll("[data-lock-phase]");
  if (!buttons.length) return;
  const diagram = document.querySelector("#shipLockDiagram");
  const water = document.querySelector("#shipLockWater");
  const surface = document.querySelector("#shipLockSurface");
  const boat = document.querySelector("#shipLockBoat");
  const upperGate = document.querySelector("#shipLockUpperGate");
  const lowerGate = document.querySelector("#shipLockLowerGate");
  const valveA = document.querySelector("#shipLockValveA");
  const valveB = document.querySelector("#shipLockValveB");
  const label = document.querySelector("#shipLockStateLabel");
  const feedback = document.querySelector("#shipLockFeedback");
  const phases = {
    fill: { waterY: 132, a: true, b: false, upperGate: false, lowerGate: false, label: "连接上游 · 水位上升", message: "关闭两侧闸门，打开上游阀门 A，闸室与上游构成连通器，水位逐渐升高。" },
    upper: { waterY: 70, a: false, b: false, upperGate: true, lowerGate: false, label: "水位齐平 · 上游通航", message: "闸室水位与上游齐平后，关闭阀门 A，再打开上游闸门，船才能安全通过。" },
    drain: { waterY: 148, a: false, b: true, upperGate: false, lowerGate: false, label: "连接下游 · 水位下降", message: "关闭两侧闸门，打开下游阀门 B，闸室与下游构成连通器，水位逐渐下降。" },
    lower: { waterY: 210, a: false, b: false, upperGate: false, lowerGate: true, label: "水位齐平 · 下游通航", message: "闸室水位与下游齐平后，关闭阀门 B，再打开下游闸门，船驶向下游。" },
  };

  const selectPhase = (key) => {
    const phase = phases[key];
    const waterHeight = 260 - phase.waterY;
    buttons.forEach((button) => setButtonPressedState(button, button.dataset.lockPhase === key));
    water?.setAttribute("y", String(phase.waterY));
    water?.setAttribute("height", String(waterHeight));
    surface?.setAttribute("y1", String(phase.waterY));
    surface?.setAttribute("y2", String(phase.waterY));
    boat?.setAttribute("transform", `translate(0 ${phase.waterY - 82})`);
    valveA?.setAttribute("class", `pump-valve ${phase.a ? "is-open" : "is-closed"}`);
    valveB?.setAttribute("class", `pump-valve ${phase.b ? "is-open" : "is-closed"}`);
    upperGate?.setAttribute("class", `lock-gate ${phase.upperGate ? "is-open" : ""}`.trim());
    lowerGate?.setAttribute("class", `lock-gate ${phase.lowerGate ? "is-open" : ""}`.trim());
    if (label) label.textContent = phase.label;
    if (feedback) feedback.textContent = phase.message;
    diagram?.setAttribute("aria-label", `${phase.label}。${phase.message}`);
  };

  buttons.forEach((button) => button.addEventListener("click", () => selectPhase(button.dataset.lockPhase)));
  selectPhase("fill");
}

function setupTorricelliLab() {
  const tilt = document.querySelector("#torricelliTiltSlider");
  if (!tilt) return;
  const diagram = document.querySelector("#torricelliDiagram");
  const tube = document.querySelector("#torricelliTube");
  const mercury = document.querySelector("#torricelliMercury");
  const topPoint = document.querySelector("#torricelliTopPoint");
  const vacuumLabel = document.querySelector("#torricelliVacuumLabel");
  const feedback = document.querySelector("#torricelliFeedback");

  const update = () => {
    const angle = Number(tilt.value);
    const radians = angle * Math.PI / 180;
    const mercuryTopX = 260 + Math.tan(radians) * 174;
    const tubeTopX = 260 + Math.tan(radians) * 216;
    const mercuryLength = 760 / Math.cos(radians);
    tube?.setAttribute("d", `M260 258 L${tubeTopX} 34`);
    mercury?.setAttribute("d", `M260 258 L${mercuryTopX} 76`);
    topPoint?.setAttribute("cx", String(mercuryTopX));
    if (vacuumLabel) vacuumLabel.setAttribute("x", String(Math.max(290, tubeTopX - 20)));
    document.querySelector("#torricelliTiltOutput").textContent = `${angle}°`;
    document.querySelector("#torricelliLengthOutput").textContent = `${Math.round(mercuryLength)} mm`;
    if (feedback) feedback.textContent = angle === 0
      ? "玻璃管竖直时，水银柱长度与竖直高度差相同。"
      : `玻璃管倾斜后，水银柱长度增至约 ${Math.round(mercuryLength)} mm，但竖直高度差仍为 760 mm，所以测得的大气压不变。`;
    diagram?.setAttribute("aria-label", `托里拆利实验中玻璃管倾斜${angle}度，水银柱长度约${Math.round(mercuryLength)}毫米，管内外水银面的竖直高度差仍为七百六十毫米`);
  };

  tilt.addEventListener("input", update);
  update();
}

function setupAtmosphereLab() {
  const altitude = document.querySelector("#altitudeSlider");
  if (!altitude) return;
  const diagram = document.querySelector("#atmosphereDiagram");
  const observer = document.querySelector("#altitudeObserver");
  const meter = document.querySelector("#atmosphereMeterFill");
  const diagramLabel = document.querySelector("#altitudeDiagramLabel");
  const diagramValue = document.querySelector("#atmosphereDiagramValue");

  const update = () => {
    const altitudeValue = Number(altitude.value);
    const pressure = 101300 - altitudeValue * 10;
    const ratio = altitudeValue / 3000;
    const meterHeight = 190 * (pressure / 101300);
    document.querySelector("#altitudeOutput").textContent = `${altitudeValue.toLocaleString("zh-CN")} m`;
    document.querySelector("#atmosphereOutput").textContent = `${formatNumber(pressure / 1000)} kPa`;
    observer?.setAttribute("transform", `translate(${ratio * 148} ${-ratio * 128})`);
    meter?.setAttribute("y", String(244 - meterHeight));
    meter?.setAttribute("height", String(meterHeight));
    if (diagramLabel) diagramLabel.textContent = `海拔 ${altitudeValue.toLocaleString("zh-CN")} m`;
    if (diagramValue) diagramValue.textContent = `${formatNumber(pressure / 1000)} kPa`;
    diagram?.setAttribute("aria-label", `海拔${altitudeValue}米，近似大气压${formatNumber(pressure / 1000)}千帕`);
  };

  altitude.addEventListener("input", update);
  update();
}

function setupPumpLab() {
  const buttons = document.querySelectorAll("[data-pump-phase]");
  if (!buttons.length) return;
  const diagram = document.querySelector("#pumpDiagram");
  const piston = document.querySelector("#pumpPiston");
  const rod = document.querySelector("#pumpRod");
  const upperWater = document.querySelector("#pumpUpperWater");
  const lowerWater = document.querySelector("#pumpLowerWater");
  const valveA = document.querySelector("#pumpValveA");
  const valveB = document.querySelector("#pumpValveB");
  const valveALabel = document.querySelector("#pumpValveALabel");
  const flowPath = document.querySelector("#pumpFlowPath");
  const secondaryFlowPath = document.querySelector("#pumpFlowPathSecondary");
  const phaseLabel = document.querySelector("#pumpPhaseLabel");
  const feedback = document.querySelector("#pumpFeedback");
  const phases = {
    ready: { y: 158, a: false, b: false, upperY: 70, upperH: 0, lowerY: 158, lowerH: 118, label: "循环起点 · A 关 · B 关", primary: "M130 310 V240 H210", primaryOn: false, secondary: "M310 224 V120", secondaryOn: false, message: "活塞位于下方，下腔已有水；静止时 A、B 两阀都关闭。" },
    lift: { y: 90, a: false, b: true, upperY: 70, upperH: 0, lowerY: 90, lowerH: 186, label: "上提进水 · A 关 · B 开", primary: "M130 310 V240 H210 H260 V118", primaryOn: true, secondary: "M310 224 V120", secondaryOn: false, message: "活塞上提，下腔压强减小；A 关闭、B 打开，外界大气压把低处的水推入下腔。" },
    press: { y: 158, a: true, b: false, upperY: 70, upperH: 88, lowerY: 158, lowerH: 118, label: "下压过阀 · A 开 · B 关", primary: "M310 228 V112", primaryOn: true, secondary: "M310 224 V120", secondaryOn: false, message: "活塞下压，B 关闭、A 打开；下腔的水向上穿过活塞，进入上腔。" },
    outlet: { y: 90, a: false, b: true, upperY: 70, upperH: 20, lowerY: 90, lowerH: 186, label: "再提出水 · A 关 · B 开", primary: "M130 310 V240 H210 H260 V118", primaryOn: true, secondary: "M330 80 H410 V70 H516", secondaryOn: true, message: "再次上提时，A 关闭，上腔的水被提升并从出水口流出；同时 B 打开，下腔再次进水。" },
  };

  const selectPhase = (key) => {
    const phase = phases[key];
    buttons.forEach((button) => setButtonPressedState(button, button.dataset.pumpPhase === key));
    piston?.setAttribute("y1", String(phase.y));
    piston?.setAttribute("y2", String(phase.y));
    rod?.setAttribute("y2", String(phase.y));
    upperWater?.setAttribute("y", String(phase.upperY));
    upperWater?.setAttribute("height", String(phase.upperH));
    lowerWater?.setAttribute("y", String(phase.lowerY));
    lowerWater?.setAttribute("height", String(phase.lowerH));
    valveA?.setAttribute("cy", String(phase.y));
    if (valveALabel) valveALabel.setAttribute("y", String(phase.y + 8));
    valveA?.setAttribute("class", `pump-valve ${phase.a ? "is-open" : "is-closed"}`);
    valveB?.setAttribute("class", `pump-valve ${phase.b ? "is-open" : "is-closed"}`);
    flowPath?.setAttribute("d", phase.primary);
    flowPath?.classList.toggle("is-flowing", phase.primaryOn);
    flowPath?.toggleAttribute("hidden", !phase.primaryOn);
    secondaryFlowPath?.setAttribute("d", phase.secondary);
    secondaryFlowPath?.classList.toggle("is-flowing", phase.secondaryOn);
    secondaryFlowPath?.toggleAttribute("hidden", !phase.secondaryOn);
    if (phaseLabel) phaseLabel.textContent = phase.label;
    if (feedback) feedback.textContent = phase.message;
    if (diagram) {
      diagram.dataset.phase = key;
      diagram.setAttribute("aria-label", `活塞式抽水机${phase.label}，${phase.message}`);
    }
  };

  buttons.forEach((button) => button.addEventListener("click", () => selectPhase(button.dataset.pumpPhase)));
  selectPhase("ready");
}

function setupFlowPressureLab() {
  const airflow = document.querySelector("#airflowSlider");
  if (!airflow) return;
  const modeButtons = document.querySelectorAll("[data-flow-mode]");
  const diagram = document.querySelector("#flowPressureDiagram");
  const paperScene = document.querySelector("#flowPaperScene");
  const wingScene = document.querySelector("#flowWingScene");
  const leftPaper = document.querySelector("#flowPaperLeft");
  const rightPaper = document.querySelector("#flowPaperRight");
  const arrow = document.querySelector("#airflowArrow");
  const airflowStateLabel = document.querySelector("#airflowStateLabel");
  const wingLiftArrow = document.querySelector("#wingLiftArrow");
  const wingLiftLabel = document.querySelector("#wingLiftLabel");
  const wingUpperLabel = document.querySelector("#wingUpperLabel");
  const wingLowerLabel = document.querySelector("#wingLowerLabel");
  const wingStreamlines = document.querySelectorAll(".flow-streamline");
  const title = document.querySelector("#flowLabTitle");
  const tag = document.querySelector("#flowLabTag");
  const sliderLabel = document.querySelector("#airflowSliderLabel");
  const metricLabel = document.querySelector("#flowMetricLabel");
  const outerLabels = [
    document.querySelector("#flowOuterLabelLeft"),
    document.querySelector("#flowOuterLabelRight"),
  ];
  const innerLabel = document.querySelector("#flowInnerLabel");
  let selectedMode = "paper";

  const update = () => {
    const speed = Number(airflow.value);
    const gap = 252 - speed * 19.4;
    const leftEnd = 310 - gap / 2;
    const rightEnd = 310 + gap / 2;
    const curveOffset = speed * 2.4;
    document.querySelector("#airflowOutput").textContent = `${speed} 级`;
    leftPaper?.setAttribute("d", `M184 78 Q${184 + curveOffset} 170 ${leftEnd} 260`);
    rightPaper?.setAttribute("d", `M436 78 Q${436 - curveOffset} 170 ${rightEnd} 260`);
    arrow?.setAttribute("y2", String(92 + speed * 14));
    arrow?.toggleAttribute("hidden", speed === 0);
    if (airflowStateLabel) airflowStateLabel.textContent = speed === 0 ? "未吹气" : "向下吹气";
    outerLabels.forEach((label) => {
      if (label) label.textContent = speed === 0 ? "外侧 p" : "外侧 p 较大";
    });
    if (innerLabel) innerLabel.textContent = speed === 0 ? "内外压强接近" : "中间 p 较小";
    if (wingLiftArrow) {
      wingLiftArrow.toggleAttribute("hidden", speed === 0);
      if (speed > 0) setSharpForceArrow(wingLiftArrow, 310, 178 - speed * 9);
    }
    wingLiftLabel?.toggleAttribute("hidden", speed === 0);
    wingStreamlines.forEach((streamline) => streamline.toggleAttribute("hidden", selectedMode === "wing" && speed === 0));
    if (wingUpperLabel) wingUpperLabel.textContent = speed === 0 ? "无相对气流" : "上方：v 较大，p 较小";
    if (wingLowerLabel) wingLowerLabel.textContent = speed === 0 ? "上下压强接近" : "下方：v 较小，p 较大";

    const output = document.querySelector("#paperGapOutput");
    const isPaper = selectedMode === "paper";
    paperScene?.toggleAttribute("hidden", !isPaper);
    wingScene?.toggleAttribute("hidden", isPaper);
    modeButtons.forEach((button) => setButtonPressedState(button, button.dataset.flowMode === selectedMode));
    if (isPaper) {
      if (title) title.textContent = "吹气时，两张纸为什么靠拢？";
      if (tag) tag.textContent = "比较纸张内外压强";
      if (sliderLabel) sliderLabel.textContent = "中间气流速度";
      if (metricLabel) metricLabel.textContent = "纸张间距";
      if (output) output.textContent = speed === 0 ? "保持平行" : speed < 4 ? "略微减小" : speed < 8 ? "逐渐减小" : "明显靠拢";
      diagram?.setAttribute("aria-label", `两张纸中间气流速度为${speed}级，${speed === 0 ? "两张纸自然竖直并保持平行" : "中间压强减小，纸张在外侧大气压作用下靠拢"}`);
    } else {
      if (title) title.textContent = "机翼上下为什么产生升力？";
      if (tag) tag.textContent = "上快下慢 · 上小下大";
      if (sliderLabel) sliderLabel.textContent = "迎面气流速度";
      if (metricLabel) metricLabel.textContent = "升力趋势";
      if (output) output.textContent = speed === 0 ? "无气流，无升力" : speed < 4 ? "升力较小" : speed < 8 ? "升力增大" : "升力明显";
      diagram?.setAttribute("aria-label", `机翼迎面气流速度为${speed}级，${speed === 0 ? "没有相对气流，模型中不产生升力" : "机翼上方流速较大压强较小，下方压强较大，形成向上升力"}`);
    }
  };

  modeButtons.forEach((button) => button.addEventListener("click", () => {
    selectedMode = button.dataset.flowMode;
    update();
  }));
  airflow.addEventListener("input", update);
  update();
}

function setupBuoyancyWeightLab() {
  const immersion = document.querySelector("#immersionSlider");
  const buttons = document.querySelectorAll("[data-buoyancy-liquid]");
  if (!immersion || !buttons.length) return;
  const diagram = document.querySelector("#buoyancyWeightDiagram");
  const liquid = document.querySelector("#buoyancyWeightLiquid");
  const object = document.querySelector("#buoyancyWeightObject");
  const suspension = document.querySelector("#buoyancySuspensionLine");
  const arrow = document.querySelector("#buoyancyWeightArrow");
  const arrowHead = document.querySelector("#buoyancyWeightArrowHead");
  const tensionArrow = document.querySelector("#buoyancyTensionArrow");
  const tensionArrowHead = document.querySelector("#buoyancyTensionArrowHead");
  const gravityArrow = document.querySelector("#buoyancyGravityArrow");
  const gravityArrowHead = document.querySelector("#buoyancyGravityArrowHead");
  const springCoil = document.querySelector("#buoyancySpringCoil");
  const springPointer = document.querySelector("#buoyancySpringPointer");
  const springReading = document.querySelector("#buoyancySpringReading");
  const tensionLabel = document.querySelector("#buoyancyTensionLabel");
  const forceLabel = document.querySelector("#buoyancyWeightForceLabel");
  const gravityLabel = document.querySelector("#buoyancyGravityLabel");
  const liquidLabel = document.querySelector("#buoyancyWeightLiquidLabel");
  const liquids = {
    oil: { label: "食用油", density: 800, color: "#e8c16a" },
    water: { label: "水", density: 1000, color: "#8bd8e7" },
    salt: { label: "浓盐水", density: 1200, color: "#63c5d5" },
  };
  let selectedLiquid = "water";

  const update = () => {
    const ratio = Number(immersion.value) / 100;
    const selected = liquids[selectedLiquid];
    const force = selected.density * 10 * 0.0004 * ratio;
    const reading = 5 - force;
    const objectY = 166 + ratio * 84;
    const centerY = objectY + 42;
    const buoyancyArrowLength = 24 + force * 8;
    const tensionArrowLength = 24 + Math.max(0, reading) * 8;
    const gravityArrowLength = 48;
    const pointerY = 48 + (Math.max(0, reading) / 5) * 68;
    document.querySelector("#immersionOutput").textContent = `${immersion.value}%`;
    document.querySelector("#buoyancyWeightOutput").textContent = `${formatNumber(force)} N`;
    document.querySelector("#springReadingOutput").textContent = `${formatNumber(reading)} N`;
    if (liquid) liquid.style.fill = selected.color;
    object?.setAttribute("y", String(objectY));
    suspension?.setAttribute("d", `M408 163 V${objectY}`);
    const buoyancyTipY = centerY - buoyancyArrowLength;
    const tensionTipY = centerY - tensionArrowLength;
    const gravityTipY = centerY + gravityArrowLength;
    arrow?.setAttribute("y1", String(centerY));
    setSharpForceArrow(arrow, 434, buoyancyTipY, arrowHead);
    arrow?.toggleAttribute("hidden", force === 0);
    arrowHead?.toggleAttribute("hidden", force === 0);
    tensionArrow?.setAttribute("y1", String(centerY));
    setSharpForceArrow(tensionArrow, 382, tensionTipY, tensionArrowHead);
    gravityArrow?.setAttribute("y1", String(centerY));
    setSharpForceArrow(gravityArrow, 408, gravityTipY, gravityArrowHead);
    springPointer?.setAttribute("y1", String(pointerY));
    springPointer?.setAttribute("y2", String(pointerY));
    if (springCoil) {
      const springEnd = Math.max(50, pointerY - 5);
      const springStep = (springEnd - 43) / 7;
      const segments = Array.from({ length: 6 }, (_, index) => `${index % 2 === 0 ? 399 : 417} ${43 + springStep * (index + 1)}`);
      springCoil.setAttribute("d", `M408 43 L${segments.join(" L")} L408 ${springEnd}`);
    }
    if (springReading) springReading.textContent = `示数 ${formatNumber(reading)} N`;
    if (tensionLabel) {
      tensionLabel.setAttribute("y", String(objectY + 18));
      tensionLabel.textContent = `F示 ${formatNumber(reading)} N`;
    }
    if (forceLabel) {
      forceLabel.setAttribute("y", String(objectY + 34));
      forceLabel.textContent = `F浮 ${formatNumber(force)} N`;
    }
    if (gravityLabel) gravityLabel.setAttribute("y", String(centerY + 36));
    if (liquidLabel) liquidLabel.textContent = selected.label;
    buttons.forEach((button) => setButtonPressedState(button, button.dataset.buoyancyLiquid === selectedLiquid));
    diagram?.setAttribute("aria-label", `弹簧测力计通过竖直细线悬挂物体，物体百分之${immersion.value}浸入${selected.label}；重力五牛，拉力${formatNumber(reading)}牛，浮力${formatNumber(force)}牛`);
  };

  buttons.forEach((button) => button.addEventListener("click", () => { selectedLiquid = button.dataset.buoyancyLiquid; update(); }));
  immersion.addEventListener("input", update);
  update();
}

function setupBuoyancyPressureLab() {
  const depth = document.querySelector("#buoyancyPressureDepthSlider");
  if (!depth) return;
  const diagram = document.querySelector("#buoyancyPressureDiagram");
  const object = document.querySelector("#buoyancyPressureObject");
  const topArrow = document.querySelector("#buoyancyTopPressureArrow");
  const topArrowHead = document.querySelector("#buoyancyPressureHeadCoral");
  const bottomArrow = document.querySelector("#buoyancyBottomPressureArrow");
  const bottomArrowHead = document.querySelector("#buoyancyPressureHeadTeal");
  const topLabel = document.querySelector("#buoyancyTopPressureLabel");
  const bottomLabel = document.querySelector("#buoyancyBottomPressureLabel");

  const update = () => {
    const depthValue = Number(depth.value);
    const topForce = 1000 * 10 * depthValue * 0.01;
    const bottomForce = 1000 * 10 * (depthValue + 0.1) * 0.01;
    const buoyancy = bottomForce - topForce;
    const objectY = 82 + ((depthValue - 0.2) / 0.8) * 48;
    const topArrowLength = 23 + topForce * 0.5;
    const bottomArrowLength = 23 + bottomForce * 0.5;
    document.querySelector("#buoyancyPressureDepthOutput").textContent = `${depthValue.toFixed(1)} m`;
    document.querySelector("#buoyancyTopPressureOutput").textContent = `${formatNumber(topForce, 0)} N`;
    document.querySelector("#buoyancyBottomPressureOutput").textContent = `${formatNumber(bottomForce, 0)} N`;
    document.querySelector("#buoyancyPressureDifferenceOutput").textContent = `${formatNumber(buoyancy, 0)} N`;
    object?.setAttribute("y", String(objectY));
    if (topArrow) {
      topArrow.setAttribute("y1", String(objectY - 8 - topArrowLength));
      setSharpForceArrow(topArrow, 310, objectY - 8, topArrowHead);
    }
    if (bottomArrow) {
      bottomArrow.setAttribute("y1", String(objectY + 76 + bottomArrowLength));
      setSharpForceArrow(bottomArrow, 310, objectY + 76, bottomArrowHead);
    }
    if (topLabel) {
      topLabel.setAttribute("y", String(objectY - 24));
      topLabel.textContent = `F上 = ${formatNumber(topForce, 0)} N`;
    }
    if (bottomLabel) {
      bottomLabel.setAttribute("y", String(objectY + 108));
      bottomLabel.textContent = `F下 = ${formatNumber(bottomForce, 0)} N`;
    }
    diagram?.setAttribute("aria-label", `物体上表面深${depthValue.toFixed(1)}米，水向下压力${formatNumber(topForce, 0)}牛，下表面压力${formatNumber(bottomForce, 0)}牛，压力差形成${formatNumber(buoyancy, 0)}牛浮力`);
  };

  depth.addEventListener("input", update);
  update();
}

function setupArchimedesLab() {
  const volume = document.querySelector("#displacedVolumeSlider");
  const liquidType = document.querySelector("#archimedesLiquidType");
  if (!volume || !liquidType) return;
  const diagram = document.querySelector("#archimedesDiagram");
  const liquid = document.querySelector("#archimedesLiquid");
  const object = document.querySelector("#archimedesObject");
  const suspension = document.querySelector("#archimedesSuspensionLine");
  const displacedLiquid = document.querySelector("#displacedLiquid");
  const springCoil = document.querySelector("#archimedesSpringCoil");
  const springPointer = document.querySelector("#archimedesSpringPointer");
  const springReading = document.querySelector("#archimedesSpringReading");
  const equalityLabel = document.querySelector("#archimedesEqualityLabel");
  const volumeLabel = document.querySelector("#archimedesVolumeLabel");
  const massLabel = document.querySelector("#archimedesMassLabel");
  const weightLabel = document.querySelector("#archimedesWeightLabel");
  const immersionLabel = document.querySelector("#archimedesImmersionLabel");
  const conversion = document.querySelector("#archimedesConversion");
  const colors = { oil: "#e8c16a", water: "#8bd8e7", salt: "#63c5d5" };
  const objectWeight = 5;

  const update = () => {
    const volumeValue = Number(volume.value);
    const selected = liquidType.selectedOptions[0];
    const density = Number(selected.dataset.density);
    const force = density * 10 * volumeValue / 1000000;
    const displacedMass = density * volumeValue / 1000000;
    const springForce = objectWeight - force;
    const ratio = volumeValue / 400;
    const collectedHeight = ratio * 86;
    document.querySelector("#displacedVolumeOutput").textContent = `${volumeValue} cm³`;
    document.querySelector("#archimedesForceOutput").textContent = `${formatNumber(force)} N`;
    document.querySelector("#displacedWeightOutput").textContent = `${formatNumber(force)} N`;
    if (liquid) liquid.style.fill = colors[liquidType.value] || colors.water;
    if (displacedLiquid) {
      displacedLiquid.style.fill = colors[liquidType.value] || colors.water;
      displacedLiquid.setAttribute("y", String(350 - collectedHeight));
      displacedLiquid.setAttribute("height", String(collectedHeight));
    }
    const liquidSurfaceY = 220;
    const objectHeight = 88;
    const objectY = liquidSurfaceY - (1 - ratio) * objectHeight;
    object?.setAttribute("y", String(objectY));
    suspension?.setAttribute("d", `M188 138 V${objectY}`);
    const pointerY = 44 + (springForce / objectWeight) * 62;
    springPointer?.setAttribute("y1", String(pointerY));
    springPointer?.setAttribute("y2", String(pointerY));
    if (springCoil) {
      const springEnd = Math.max(50, pointerY - 5);
      const springStep = (springEnd - 42) / 7;
      const segments = Array.from({ length: 6 }, (_, index) => `${index % 2 === 0 ? 180 : 196} ${42 + springStep * (index + 1)}`);
      springCoil.setAttribute("d", `M188 42 L${segments.join(" L")} L188 ${springEnd}`);
    }
    if (springReading) springReading.textContent = `F示 ${formatNumber(springForce)} N`;
    if (immersionLabel) {
      immersionLabel.setAttribute("y", String(objectY - 10));
      immersionLabel.textContent = `浸入 ${Math.round(ratio * 100)}%`;
    }
    if (equalityLabel) equalityLabel.textContent = `F浮 = G排 = ${formatNumber(force)} N`;
    if (volumeLabel) volumeLabel.textContent = `V排 = ${volumeValue} cm³`;
    if (massLabel) massLabel.textContent = `m排 = ${displacedMass.toFixed(2)} kg`;
    if (weightLabel) weightLabel.textContent = `G排 = ${formatNumber(force)} N`;
    const liquidName = selected.textContent.split("·")[0].trim();
    if (conversion) conversion.textContent = `换算：${volumeValue} cm³ ${liquidName}的质量为 ${displacedMass.toFixed(2)} kg，G排 = ${displacedMass.toFixed(2)} × 10 = ${formatNumber(force)} N。`;
    diagram?.setAttribute("aria-label", `弹簧测力计悬挂物体，示数${formatNumber(springForce)}牛；物体排开${volumeValue}立方厘米${liquidName}并由正对溢水口的收集桶收集，排开液体质量${displacedMass.toFixed(2)}千克，浮力和排开液体的重力都为${formatNumber(force)}牛`);
  };

  volume.addEventListener("input", update);
  liquidType.addEventListener("change", update);
  update();
}

function setupFloatingLab() {
  const objectDensity = document.querySelector("#objectDensitySlider");
  const liquidDensity = document.querySelector("#floatingLiquidDensitySlider");
  if (!objectDensity || !liquidDensity) return;
  const diagram = document.querySelector("#floatingLabDiagram");
  const object = document.querySelector("#floatingObject");
  const objectLabel = document.querySelector("#floatingObjectDensityLabel");
  const liquidLabel = document.querySelector("#floatingLiquidDensityLabel");
  const stateLabel = document.querySelector("#floatingStateDiagramLabel");
  const feedback = document.querySelector("#floatingFeedback");

  const update = () => {
    const objectValue = Number(objectDensity.value);
    const liquidValue = Number(liquidDensity.value);
    const difference = objectValue - liquidValue;
    let state;
    let objectY;
    let message;
    if (Math.abs(difference) < 0.001) {
      state = "悬浮";
      objectY = 142;
      message = "ρ物 = ρ液，物体完全浸没时浮力等于重力，可悬浮在液体内部。";
    } else if (difference < 0) {
      const immersed = objectValue / liquidValue;
      state = "上浮后漂浮";
      objectY = 86 - 88 * (1 - immersed);
      message = `ρ物 < ρ液，物体先上浮；漂浮时约有 ${Math.round(immersed * 100)}% 体积浸入液体。`;
    } else {
      state = "下沉后沉底";
      objectY = 198;
      message = "ρ物 > ρ液，完全浸没时浮力小于重力，物体下沉；沉底后还受到支持力。";
    }
    document.querySelector("#objectDensityOutput").textContent = `${objectValue.toFixed(2)} g/cm³`;
    document.querySelector("#floatingLiquidDensityOutput").textContent = `${liquidValue.toFixed(2)} g/cm³`;
    document.querySelector("#floatingStateOutput").textContent = state;
    object?.setAttribute("y", String(objectY));
    if (objectLabel) {
      objectLabel.setAttribute("y", String(objectY + 52));
      objectLabel.textContent = `ρ物 ${objectValue.toFixed(2)}`;
    }
    if (liquidLabel) liquidLabel.textContent = `ρ液 ${liquidValue.toFixed(2)} g/cm³`;
    if (stateLabel) stateLabel.textContent = state;
    if (feedback) feedback.textContent = message;
    diagram?.setAttribute("aria-label", `物体密度${objectValue.toFixed(2)}克每立方厘米，液体密度${liquidValue.toFixed(2)}克每立方厘米，物体${state}`);
  };

  objectDensity.addEventListener("input", update);
  liquidDensity.addEventListener("input", update);
  update();
}

function setupMicroDensityMeterLab() {
  const density = document.querySelector("#microLiquidDensitySlider");
  const mass = document.querySelector("#microHydrometerMassSlider");
  const diameter = document.querySelector("#microStemDiameterSlider");
  if (!density || !mass || !diameter) return;
  const diagram = document.querySelector("#microDensityDiagram");
  const liquid = document.querySelector("#microDensityLiquid");
  const instrument = document.querySelector("#microHydrometerInstrument");
  const stem = document.querySelector("#microHydrometerStem");
  const immersionLine = document.querySelector("#microImmersionLine");
  const immersionLabel = document.querySelector("#microImmersionDiagramLabel");
  const densityLabel = document.querySelector("#microDensityDiagramLabel");
  const statusLabel = document.querySelector("#microDensityStatusLabel");
  const feedback = document.querySelector("#microDensityFeedback");

  const update = () => {
    const densityValue = Number(density.value);
    const massValue = Number(mass.value);
    const diameterValue = Number(diameter.value);
    const displacedVolume = massValue / densityValue;
    const stemArea = Math.PI * Math.pow(diameterValue / 20, 2);
    const immersionLength = (displacedVolume - 0.9) / stemArea;
    const offset = Math.max(-24, Math.min(46, (immersionLength - 3.5) * 10));
    const stemWidth = diameterValue * 5;
    const verdict = densityValue < 0.86 ? "密度偏低" : densityValue <= 0.88 ? "合格范围" : "密度偏高";
    document.querySelector("#microLiquidDensityOutput").textContent = `${densityValue.toFixed(2)} g/cm³`;
    document.querySelector("#microHydrometerMassOutput").textContent = `${massValue.toFixed(2)} g`;
    document.querySelector("#microStemDiameterOutput").textContent = `${diameterValue.toFixed(1)} mm`;
    document.querySelector("#microDisplacedVolumeOutput").textContent = `${displacedVolume.toFixed(2)} cm³`;
    document.querySelector("#microImmersionOutput").textContent = `${immersionLength.toFixed(2)} cm`;
    document.querySelector("#microDensityVerdict").textContent = verdict;
    instrument?.setAttribute("transform", `translate(0 ${offset})`);
    stem?.setAttribute("x", String(310 - stemWidth / 2));
    stem?.setAttribute("width", String(stemWidth));
    immersionLine?.setAttribute("y2", String(145 + offset));
    if (immersionLabel) {
      immersionLabel.setAttribute("y", String((110 + 145 + offset) / 2));
      immersionLabel.textContent = `浸入 ${immersionLength.toFixed(2)} cm`;
    }
    if (densityLabel) densityLabel.textContent = `ρ液 ${densityValue.toFixed(2)} g/cm³`;
    if (statusLabel) statusLabel.textContent = verdict;
    if (liquid) liquid.style.fill = densityValue < 0.86 ? "#a9e2eb" : densityValue <= 0.88 ? "#8bd8e7" : "#68c7d8";
    if (feedback) feedback.textContent = `${verdict}；液体越密，排开相同质量液体所需的体积越小。${diameterValue <= 3 ? "较细的标度杆使液面位置差异更明显。" : "标度杆较粗，刻度间距会更紧。"}`;
    diagram?.setAttribute("aria-label", `${massValue.toFixed(2)}克微型密度计漂浮在密度${densityValue.toFixed(2)}克每立方厘米的酒精中，排开${displacedVolume.toFixed(2)}立方厘米液体，标度杆浸入约${immersionLength.toFixed(2)}厘米，判断为${verdict}`);
  };

  [density, mass, diameter].forEach((input) => input.addEventListener("input", update));
  update();
}

function setupWorkLab() {
  const force = document.querySelector("#workForceSlider");
  const distance = document.querySelector("#workDistanceSlider");
  const buttons = document.querySelectorAll("[data-work-scenario]");
  if (!force || !distance || !buttons.length) return;
  const diagram = document.querySelector("#workDiagram");
  const object = document.querySelector("#workObject");
  const ghost = diagram?.querySelector(".ghost-object");
  const forceArrow = document.querySelector("#workForceArrow");
  const forceLabel = document.querySelector("#workForceDiagramLabel");
  const distanceLine = document.querySelector("#workDistanceLine");
  const distanceLabel = document.querySelector("#workDistanceDiagramLabel");
  const distanceControl = document.querySelector("#workDistanceControl");
  const distanceConstraint = document.querySelector("#workDistanceConstraint");
  const scenarioLabel = document.querySelector("#workScenarioLabel");
  const verdict = document.querySelector("#workVerdict");
  const feedback = document.querySelector("#workFeedback");
  let scenario = "push";

  const update = () => {
    const forceValue = Number(force.value);
    const distanceValue = Number(distance.value);
    const work = scenario === "push" ? forceValue * distanceValue : 0;
    const distanceRatio = (distanceValue - 1) / 9;
    const forceRatio = (forceValue - 20) / 180;
    const objectX = scenario === "hold" ? 220 : 158 + distanceRatio * 142;
    const objectCenter = objectX + 38;
    const arrowLength = 64 + forceRatio * 92;
    document.querySelector("#workForceOutput").textContent = `${force.value} N`;
    document.querySelector("#workDistanceOutput").textContent = scenario === "hold" ? "0 m" : `${distance.value} m`;
    document.querySelector("#workOutput").textContent = `${work} J`;
    object?.setAttribute("x", String(objectX));
    ghost?.toggleAttribute("hidden", scenario === "hold");
    distanceLine?.toggleAttribute("hidden", scenario === "hold");
    distanceLabel?.toggleAttribute("hidden", scenario === "hold");
    distanceControl?.toggleAttribute("hidden", scenario === "hold");
    distanceConstraint?.toggleAttribute("hidden", scenario !== "hold");
    distance.disabled = scenario === "hold";
    if (scenario === "push") {
      forceArrow?.setAttribute("x1", String(objectCenter)); forceArrow?.setAttribute("y1", "128");
      setSharpForceArrow(forceArrow, objectCenter + arrowLength, 128);
      if (forceLabel) { forceLabel.setAttribute("x", String(objectCenter + arrowLength / 2)); forceLabel.setAttribute("y", "102"); }
      if (scenarioLabel) scenarioLabel.textContent = "力与位移同向";
      if (verdict) verdict.textContent = "推力做功";
      if (feedback) feedback.textContent = "推力方向与箱子位移方向相同，可以直接用 W = Fs。";
    } else {
      forceArrow?.setAttribute("x1", String(objectCenter)); forceArrow?.setAttribute("y1", "150");
      setSharpForceArrow(forceArrow, objectCenter, 150 - arrowLength);
      if (forceLabel) { forceLabel.setAttribute("x", String(objectCenter + 46)); forceLabel.setAttribute("y", String(114 - arrowLength / 2)); }
      if (scenarioLabel) scenarioLabel.textContent = scenario === "hold" ? "有力 · 无位移" : "力与位移垂直";
      if (verdict) verdict.textContent = "托力不做功";
      if (feedback) feedback.textContent = scenario === "hold" ? "物体没有移动，托力不做功。" : "托力竖直向上、位移水平向右，二者垂直，托力不做功。";
    }
    if (forceLabel) forceLabel.textContent = `F = ${forceValue} N`;
    distanceLine?.setAttribute("x2", String(objectCenter));
    if (distanceLabel) { distanceLabel.setAttribute("x", String((130 + objectCenter) / 2)); distanceLabel.textContent = `s = ${distanceValue} m`; }
    buttons.forEach((button) => setButtonPressedState(button, button.dataset.workScenario === scenario));
    diagram?.setAttribute("aria-label", scenario === "push" ? `${forceValue}牛水平推力使箱子向右移动${distanceValue}米，推力做功${work}焦` : scenario === "hold" ? `${forceValue}牛托力作用于静止物体，没有位移，托力不做功` : `${forceValue}牛竖直托力作用于水平移动${distanceValue}米的物体，力与位移垂直，托力不做功`);
  };
  buttons.forEach((button) => button.addEventListener("click", () => { scenario = button.dataset.workScenario; update(); }));
  [force, distance].forEach((input) => input.addEventListener("input", update));
  update();
}

function setupPowerLab() {
  const mass = document.querySelector("#powerMassSlider");
  const height = document.querySelector("#powerHeightSlider");
  const time = document.querySelector("#powerTimeSlider");
  if (!mass || !height || !time) return;
  const diagram = document.querySelector("#powerDiagram");
  const load = document.querySelector("#powerLoad");
  const rope = document.querySelector("#powerRope");
  const heightLine = document.querySelector("#powerHeightLine");
  const heightLabel = document.querySelector("#powerHeightDiagramLabel");
  const massLabel = document.querySelector("#powerMassDiagramLabel");
  const timeLabel = document.querySelector("#powerTimeDiagramLabel");
  const meter = document.querySelector("#powerLiftMeter");
  const update = () => {
    const massValue = Number(mass.value);
    const heightValue = Number(height.value);
    const timeValue = Number(time.value);
    const work = massValue * 10 * heightValue;
    const power = work / timeValue;
    const loadY = 194 - (heightValue / 5) * 120;
    const meterHeight = Math.sqrt(Math.min(1, power / 4000)) * 168;
    document.querySelector("#powerMassOutput").textContent = `${massValue} kg`;
    document.querySelector("#powerHeightOutput").textContent = `${heightValue} m`;
    document.querySelector("#powerTimeOutput").textContent = `${timeValue} s`;
    document.querySelector("#powerWorkOutput").textContent = `${formatNumber(work, 0)} J`;
    document.querySelector("#powerOutput").textContent = `${formatNumber(power)} W`;
    load?.setAttribute("y", String(loadY));
    rope?.setAttribute("y2", String(loadY));
    heightLine?.setAttribute("y2", String(loadY));
    heightLine?.toggleAttribute("hidden", heightValue === 0);
    if (heightLabel) { heightLabel.setAttribute("y", String(heightValue === 0 ? 178 : (194 + loadY) / 2)); heightLabel.textContent = `h = ${heightValue} m`; }
    if (massLabel) { massLabel.setAttribute("y", String(loadY + 46)); massLabel.textContent = `${massValue} kg`; }
    if (timeLabel) timeLabel.textContent = `${timeValue} s`;
    meter?.setAttribute("y", String(226 - meterHeight)); meter?.setAttribute("height", String(meterHeight));
    diagram?.setAttribute("aria-label", `${massValue}千克重物提升${heightValue}米，用时${timeValue}秒，做功${formatNumber(work, 0)}焦，功率${formatNumber(power)}瓦`);
  };
  [mass, height, time].forEach((input) => input.addEventListener("input", update));
  update();
}

function setupEnergyFactorsLab() {
  const mass = document.querySelector("#energyMassSlider");
  const factor = document.querySelector("#energyFactorSlider");
  const buttons = document.querySelectorAll("[data-energy-mode]");
  if (!mass || !factor || !buttons.length) return;
  const diagram = document.querySelector("#energyFactorsDiagram");
  const object = document.querySelector("#energyFactorObject");
  const sceneLabel = document.querySelector("#energyFactorSceneLabel");
  const massLabel = document.querySelector("#energyFactorMassLabel");
  const platform = document.querySelector("#energyPlatform");
  const heightMeasure = document.querySelector("#energyHeightMeasure");
  const velocityArrow = document.querySelector("#energyVelocityArrow");
  const bar = document.querySelector("#energyFactorBar");
  const barLabel = document.querySelector("#energyFactorBarLabel");
  const controlLabel = document.querySelector("#energyFactorControlLabel");
  const resultLabel = document.querySelector("#energyFactorResultLabel");
  let mode = "kinetic";

  const update = () => {
    const massValue = Number(mass.value);
    const factorValue = Number(factor.value);
    const energy = mode === "kinetic" ? 0.5 * massValue * Math.pow(factorValue, 2) : massValue * 10 * factorValue;
    const maximumEnergy = mode === "kinetic" ? 160 : 400;
    const normalized = energy / maximumEnergy;
    const barHeight = Math.max(8, normalized * 172);
    const energyText = formatNumber(energy, Number.isInteger(energy) ? 0 : 1);
    const platformY = 230 - (factorValue / 8) * 136;
    document.querySelector("#energyMassOutput").textContent = `${massValue} kg`;
    document.querySelector("#energyFactorOutput").textContent = mode === "kinetic" ? `${factorValue} m/s` : `${factorValue} m`;
    document.querySelector("#energyFactorResult").textContent = `${energyText} J`;
    if (controlLabel) controlLabel.childNodes[0].nodeValue = mode === "kinetic" ? "运动速度 " : "相对高度 ";
    if (resultLabel) resultLabel.textContent = mode === "kinetic" ? "动能 Ek = 1/2mv²" : "重力势能 Ep = mgh";
    if (sceneLabel) {
      sceneLabel.textContent = mode === "kinetic" ? `v = ${factorValue} m/s` : `h = ${factorValue} m`;
      sceneLabel.setAttribute("x", mode === "kinetic" ? "285" : "46");
      sceneLabel.setAttribute("y", mode === "kinetic" ? "108" : String((230 + platformY) / 2 - 8));
    }
    if (massLabel) massLabel.textContent = `${massValue} kg`;
    if (barLabel) barLabel.textContent = `${mode === "kinetic" ? "动能" : "势能"} ${energyText} J`;
    bar?.setAttribute("y", String(222 - barHeight)); bar?.setAttribute("height", String(barHeight));
    bar?.setAttribute("class", mode === "kinetic" ? "kinetic-bar" : "potential-bar");
    object?.setAttribute("transform", mode === "kinetic" ? "translate(166 230)" : `translate(166 ${platformY})`);
    platform?.setAttribute("y1", String(platformY)); platform?.setAttribute("y2", String(platformY));
    heightMeasure?.setAttribute("y2", String(platformY));
    platform?.toggleAttribute("hidden", mode === "kinetic");
    heightMeasure?.toggleAttribute("hidden", mode === "kinetic");
    velocityArrow?.toggleAttribute("hidden", mode !== "kinetic");
    velocityArrow?.setAttribute("x2", String(260 + factorValue * 12));
    buttons.forEach((button) => setButtonPressedState(button, button.dataset.energyMode === mode));
    diagram?.setAttribute("aria-label", `${massValue}千克小车${mode === "kinetic" ? `速度${factorValue}米每秒，动能` : `相对高度${factorValue}米，重力势能`}为${energyText}焦`);
  };
  buttons.forEach((button) => button.addEventListener("click", () => { mode = button.dataset.energyMode; update(); }));
  [mass, factor].forEach((input) => input.addEventListener("input", update));
  update();
}

function setupLeverCalculator() {
  const load = document.querySelector("#leverLoadSlider");
  const inputArm = document.querySelector("#leverInputArmSlider");
  const loadArm = document.querySelector("#leverLoadArmSlider");
  if (!load || !inputArm || !loadArm) return;
  const diagram = document.querySelector("#leverDiagram");
  const inputArrow = document.querySelector("#leverInputArrow");
  const inputArrowHead = document.querySelector("#leverInputArrowDown");
  const loadArrow = document.querySelector("#leverLoadArrow");
  const loadArrowHead = document.querySelector("#leverLoadArrowDown");
  const inputPoint = document.querySelector("#leverInputPoint");
  const loadPoint = document.querySelector("#leverLoadPoint");
  const inputLabel = document.querySelector("#leverInputLabel");
  const loadLabel = document.querySelector("#leverLoadLabel");
  const inputArmLine = document.querySelector("#leverInputArmLine");
  const loadArmLine = document.querySelector("#leverLoadArmLine");
  const inputArmLabel = document.querySelector("#leverInputArmLabel");
  const loadArmLabel = document.querySelector("#leverLoadArmLabel");
  const update = () => {
    const loadValue = Number(load.value);
    const inputArmValue = Number(inputArm.value);
    const loadArmValue = Number(loadArm.value);
    const inputForce = loadValue * loadArmValue / inputArmValue;
    const inputX = 340 - (inputArmValue / 1.2) * 220;
    const loadX = 340 + (loadArmValue / 0.8) * 220;
    const inputArrowStart = 150 - (42 + Math.min(1, inputForce / 1200) * 70);
    const loadArrowStart = 150 - (42 + ((loadValue - 40) / 260) * 70);
    document.querySelector("#leverLoadOutput").textContent = `${load.value} N`;
    document.querySelector("#leverInputArmOutput").textContent = `${inputArmValue.toFixed(2)} m`;
    document.querySelector("#leverLoadArmOutput").textContent = `${loadArmValue.toFixed(2)} m`;
    document.querySelector("#leverForceOutput").textContent = `${formatNumber(inputForce)} N`;
    inputArrow?.setAttribute("x1", String(inputX));
    inputPoint?.setAttribute("cx", String(inputX));
    inputArrow?.setAttribute("y1", String(inputArrowStart));
    setSharpForceArrow(inputArrow, inputX, 160, inputArrowHead);
    loadArrow?.setAttribute("x1", String(loadX));
    loadPoint?.setAttribute("cx", String(loadX));
    loadArrow?.setAttribute("y1", String(loadArrowStart));
    setSharpForceArrow(loadArrow, loadX, 160, loadArrowHead);
    if (inputLabel) {
      inputLabel.setAttribute("x", String(inputX));
      inputLabel.setAttribute("y", String(Math.max(24, inputArrowStart - 16)));
      inputLabel.textContent = `F₁ = ${formatNumber(inputForce)} N`;
    }
    if (loadLabel) {
      loadLabel.setAttribute("x", String(loadX));
      loadLabel.setAttribute("y", String(Math.max(24, loadArrowStart - 16)));
      loadLabel.textContent = `F₂ = ${loadValue} N`;
    }
    inputArmLine?.setAttribute("x1", String(inputX));
    loadArmLine?.setAttribute("x2", String(loadX));
    if (inputArmLabel) {
      inputArmLabel.setAttribute("x", String((inputX + 340) / 2));
      inputArmLabel.textContent = `l₁ = ${inputArmValue.toFixed(2)} m`;
    }
    if (loadArmLabel) {
      loadArmLabel.setAttribute("x", String((loadX + 340) / 2));
      loadArmLabel.textContent = `l₂ = ${loadArmValue.toFixed(2)} m`;
    }
    diagram?.setAttribute("aria-label", `动力${formatNumber(inputForce)}牛作用在${inputArmValue.toFixed(2)}米动力臂上，与${loadValue}牛、${loadArmValue.toFixed(2)}米阻力臂平衡`);
  };
  [load, inputArm, loadArm].forEach((input) => input.addEventListener("input", update)); update();
}

function setupSteelyardLab() {
  const mass = document.querySelector("#steelyardMassSlider");
  if (!mass) return;
  const diagram = document.querySelector("#steelyardDiagram");
  const weightLine = document.querySelector("#steelyardWeightLine");
  const weight = document.querySelector("#steelyardWeight");
  const massLabel = document.querySelector("#steelyardMassLabel");
  const equation = document.querySelector("#steelyardEquation");
  const update = () => {
    const massValue = Number(mass.value);
    const distance = massValue * 10 / 100;
    const weightX = 242 + distance * 10;
    document.querySelector("#steelyardMassOutput").textContent = `${massValue} g`;
    document.querySelector("#steelyardDistanceOutput").textContent = `${distance.toFixed(1)} cm`;
    weightLine?.setAttribute("x1", String(weightX)); weightLine?.setAttribute("x2", String(weightX));
    weight?.setAttribute("cx", String(weightX));
    if (massLabel) massLabel.textContent = `${massValue} g`;
    if (equation) equation.textContent = `${massValue} × 10 = 100 × ${distance.toFixed(1)}`;
    diagram?.setAttribute("aria-label", `秤盘中物体质量${massValue}克，秤砣位于支点右侧${distance.toFixed(1)}厘米处，杆秤平衡`);
  };
  mass.addEventListener("input", update);
  update();
}

function setupPulleyLab() {
  const load = document.querySelector("#pulleyLoadSlider");
  const buttons = document.querySelectorAll("[data-pulley-mode]");
  if (!load || !buttons.length) return;
  const diagram = document.querySelector("#pulleyLabDiagram");
  const views = {
    fixed: document.querySelector("#pulleyFixedView"),
    movable: document.querySelector("#pulleyMovableView"),
    group: document.querySelector("#pulleyGroupView"),
  };
  const forceLabel = document.querySelector("#pulleyDiagramForce");
  const loadLabel = document.querySelector("#pulleyDiagramLoad");
  const ruleLabel = document.querySelector("#pulleyDiagramRule");
  const directionOutput = document.querySelector("#pulleyDirectionOutput");
  const feedback = document.querySelector("#pulleyFeedback");
  const modes = {
    fixed: { label: "定滑轮", n: 1, direction: "向下拉", message: "定滑轮不省力，但能改变施力方向；重物升高 h 时绳端移动 h。" },
    movable: { label: "动滑轮", n: 2, direction: "向上拉", message: "两段绳共同承担动滑轮和物重；按图中绳路应向上拉自由端，重物升高 h 时绳端移动 2h。" },
    group: { label: "滑轮组", n: 4, direction: "向下拉", message: "图中 1-4 四段绳直接承担动滑轮组和物重；重物升高 h 时绳端移动 4h。" },
  };
  let mode = "group";
  const update = () => {
    const loadValue = Number(load.value);
    const selected = modes[mode];
    const force = loadValue / selected.n;
    document.querySelector("#pulleyLoadOutput").textContent = `${loadValue} N`;
    document.querySelector("#pulleySegmentOutput").textContent = `n = ${selected.n}`;
    document.querySelector("#pulleyForceOutput").textContent = `${formatNumber(force, 0)} N`;
    if (directionOutput) directionOutput.textContent = selected.direction;
    Object.entries(views).forEach(([key, view]) => view?.toggleAttribute("hidden", key !== mode));
    buttons.forEach((button) => setButtonPressedState(button, button.dataset.pulleyMode === mode));
    if (forceLabel) forceLabel.textContent = `F = ${formatNumber(force, 0)} N`;
    if (loadLabel) loadLabel.textContent = `G = ${loadValue} N`;
    if (ruleLabel) ruleLabel.textContent = `n = ${selected.n}`;
    if (feedback) feedback.textContent = selected.message;
    diagram?.setAttribute("aria-label", `${selected.label}有${selected.n}段绳承担${loadValue}牛物重，理想拉力${formatNumber(force, 0)}牛，绳端${selected.direction}`);
  };
  buttons.forEach((button) => button.addEventListener("click", () => { mode = button.dataset.pulleyMode; update(); }));
  load.addEventListener("input", update);
  update();
}

function setupEfficiencyLab() {
  const load = document.querySelector("#efficiencyLoadSlider");
  const force = document.querySelector("#efficiencyForceSlider");
  const height = document.querySelector("#efficiencyHeightSlider");
  if (!load || !force || !height) return;
  const diagram = document.querySelector("#efficiencyDiagram");
  const usefulBar = document.querySelector("#usefulWorkBar");
  const extraBar = document.querySelector("#extraWorkBar");
  const totalBar = document.querySelector("#totalWorkBar");
  const diagramValue = document.querySelector("#efficiencyDiagramValue");
  const distanceLabel = document.querySelector("#efficiencyDiagramDistance");
  const updateBar = (bar, value) => {
    const barHeight = 16 + Math.min(1, value / 4.2) * 150;
    bar?.setAttribute("y", String(228 - barHeight));
    bar?.setAttribute("height", String(barHeight));
  };
  const update = () => {
    const loadValue = Number(load.value);
    const forceValue = Number(force.value);
    const heightValue = Number(height.value);
    const distance = 3 * heightValue;
    const useful = loadValue * heightValue;
    const total = forceValue * distance;
    const extra = total - useful;
    const efficiency = useful / total * 100;
    document.querySelector("#efficiencyLoadOutput").textContent = `${loadValue.toFixed(1)} N`;
    document.querySelector("#efficiencyForceOutput").textContent = `${forceValue.toFixed(1)} N`;
    document.querySelector("#efficiencyHeightOutput").textContent = `${heightValue.toFixed(2)} m`;
    document.querySelector("#usefulWorkOutput").textContent = `${useful.toFixed(2)} J`;
    document.querySelector("#totalWorkOutput").textContent = `${total.toFixed(2)} J`;
    document.querySelector("#efficiencyOutput").textContent = `${efficiency.toFixed(1)}%`;
    updateBar(usefulBar, useful); updateBar(extraBar, extra); updateBar(totalBar, total);
    if (diagramValue) diagramValue.textContent = `η = ${efficiency.toFixed(1)}%`;
    if (distanceLabel) distanceLabel.textContent = `s = 3h = ${distance.toFixed(2)} m`;
    diagram?.setAttribute("aria-label", `物重${loadValue.toFixed(1)}牛，拉力${forceValue.toFixed(1)}牛，物体上升${heightValue.toFixed(2)}米，机械效率${efficiency.toFixed(1)}百分比`);
  };
  [load, force, height].forEach((input) => input.addEventListener("input", update));
  update();
}

function setupEnergyDiagram() {
  const heightSlider = document.querySelector("#energyHeightSlider");
  const massSlider = document.querySelector("#mechanicalMassSlider");
  if (!heightSlider || !massSlider) return;
  const diagram = document.querySelector("#energyDiagram");
  const cart = document.querySelector("#energyCart");
  const potentialBar = document.querySelector("#potentialBar");
  const kineticBar = document.querySelector("#kineticBar");
  const heightLabel = document.querySelector("#energyHeightDiagramLabel");
  const speedLabel = document.querySelector("#energySpeedDiagramLabel");
  const potentialBarLabel = document.querySelector("#potentialBarLabel");
  const kineticBarLabel = document.querySelector("#kineticBarLabel");
  const update = () => {
    const mass = Number(massSlider.value);
    const height = Number(heightSlider.value);
    const maximumHeight = 5;
    const gravity = 10;
    const heightRatio = height / maximumHeight;
    const pathRatio = 0.08 + heightRatio * 0.84;
    const potential = mass * gravity * height;
    const total = mass * gravity * maximumHeight;
    const kinetic = total - potential;
    const speed = Math.sqrt(2 * gravity * (maximumHeight - height));
    const x = 70 + pathRatio * 368;
    const y = 248 - pathRatio * 188;
    const potentialHeight = 184 * heightRatio;
    const kineticHeight = 184 * (1 - heightRatio);
    const massText = formatNumber(mass, Number.isInteger(mass) ? 0 : 1);
    const heightText = formatNumber(height, Number.isInteger(height) ? 0 : 2);
    const speedText = formatNumber(speed);
    const potentialText = formatNumber(potential, Number.isInteger(potential) ? 0 : 1);
    const kineticText = formatNumber(kinetic, Number.isInteger(kinetic) ? 0 : 1);
    const totalText = formatNumber(total, Number.isInteger(total) ? 0 : 1);
    document.querySelector("#mechanicalMassOutput").textContent = `${massText} kg`;
    document.querySelector("#energyHeightOutput").textContent = `${heightText} m`;
    document.querySelector("#potentialOutput").textContent = `${potentialText} J`;
    document.querySelector("#kineticOutput").textContent = `${kineticText} J`;
    document.querySelector("#mechanicalEnergyOutput").textContent = `${totalText} J`;
    cart?.setAttribute("transform", `translate(${x} ${y}) rotate(-27) translate(0 -38)`);
    potentialBar?.setAttribute("y", String(238 - potentialHeight));
    potentialBar?.setAttribute("height", String(potentialHeight));
    kineticBar?.setAttribute("y", String(238 - kineticHeight));
    kineticBar?.setAttribute("height", String(kineticHeight));
    if (heightLabel) heightLabel.textContent = `h = ${heightText} m`;
    if (speedLabel) speedLabel.textContent = `v ≈ ${speedText} m/s`;
    if (potentialBarLabel) potentialBarLabel.textContent = `势能 ${potentialText} J`;
    if (kineticBarLabel) kineticBarLabel.textContent = `动能 ${kineticText} J`;
    diagram?.setAttribute("aria-label", `${massText}千克小车从五米高处静止释放，当前高度${heightText}米，速度约${speedText}米每秒，重力势能${potentialText}焦，动能${kineticText}焦，机械能${totalText}焦`);
  };
  [heightSlider, massSlider].forEach((input) => input.addEventListener("input", update));
  update();
}

const volume2Page = document.body.dataset.page;
const quizConfig = volume2QuizConfigs[volume2Page];
if (quizConfig) {
  const questionCount = Object.keys(quizConfig.answers).length;
  if (quizConfig.levels) {
    setupLayeredQuiz({
      formSelector: "#volume2Quiz",
      summarySelector: "#layeredQuizSummary",
      ...quizConfig,
    });
  } else {
    setupQuiz({
      formSelector: "#volume2Quiz",
      resultSelector: "#volume2QuizResult",
      ...quizConfig,
      badges: (score) => score >= questionCount ? "本章掌握很稳" : score >= Math.ceil(questionCount * 2 / 3) ? "本章基本过关" : "建议回看本章重点",
    });
  }
}

setupStaticSharpForceArrows();
setupForceVectorLab();
setupSpringLab();
setupGravityCalculator();
setupInertiaSurfaceLab();
setupBalanceLab();
setupFrictionLab();
setupResultantLab();
setupPressureCalculator();
setupLiquidPressureLab();
setupShipLockLab();
setupTorricelliLab();
setupAtmosphereLab();
setupPumpLab();
setupFlowPressureLab();
setupBuoyancyWeightLab();
setupBuoyancyPressureLab();
setupArchimedesLab();
setupFloatingLab();
setupMicroDensityMeterLab();
setupWorkLab();
setupPowerLab();
setupEnergyFactorsLab();
setupLeverCalculator();
setupSteelyardLab();
setupPulleyLab();
setupEfficiencyLab();
setupEnergyDiagram();
