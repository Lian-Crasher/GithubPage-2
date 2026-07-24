const frequencySlider = document.querySelector("#frequencySlider");
const amplitudeSlider = document.querySelector("#amplitudeSlider");
const frequencyOutput = document.querySelector("#frequencyOutput");
const amplitudeOutput = document.querySelector("#amplitudeOutput");
const waveFeedback = document.querySelector("#waveFeedback");
const waveCanvas = document.querySelector("#waveCanvas");
const echoTimeSlider = document.querySelector("#echoTimeSlider");
const echoTimeOutput = document.querySelector("#echoTimeOutput");
const echoDistanceOutput = document.querySelector("#echoDistanceOutput");
const noiseButtons = document.querySelectorAll("[data-noise]");
const noiseResult = document.querySelector("#noiseResult");
const frequencyBandButtons = document.querySelectorAll("[data-frequency-band]");
const frequencyBandResult = document.querySelector("#frequencyBandResult");

function setFrequencyBand(frequency) {
  let frequencyLabel = `${frequency} Hz`;
  frequencyBandButtons.forEach((button) => {
    const selected = Number(button.dataset.frequencyBand) === frequency;
    setButtonPressedState(button, selected);
    if (selected) frequencyLabel = button.textContent.trim();
  });

  if (frequency < 20) {
    frequencyBandResult.textContent = `${frequencyLabel} 低于 20 Hz，属于次声波，正常人耳通常听不到。`;
  } else if (frequency > 20000) {
    frequencyBandResult.textContent = `${frequencyLabel} 高于 20 000 Hz，属于超声波，正常人耳通常听不到。`;
  } else {
    frequencyBandResult.textContent = `${frequencyLabel} 位于约 20 Hz 至 20 000 Hz 之间，属于正常人耳的可听声范围。`;
  }
}

function drawWave() {
  const { ctx, width, height } = prepareHiDPICanvas(waveCanvas);
  const frequency = Number(frequencySlider.value);
  const amplitude = Number(amplitudeSlider.value);
  const waves = frequency / 115;
  const amp = (height * 0.32 * amplitude) / 100;

  frequencyOutput.textContent = `${frequency} Hz`;
  amplitudeOutput.textContent = `${amplitude}%`;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#f7fcff";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#d7e8ef";
  ctx.lineWidth = 1;
  for (let x = 40; x < width; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 24);
    ctx.lineTo(x, height - 24);
    ctx.stroke();
  }
  for (let y = 40; y < height; y += 44) {
    ctx.beginPath();
    ctx.moveTo(24, y);
    ctx.lineTo(width - 24, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "#1aa6b7";
  ctx.lineWidth = 5;
  ctx.beginPath();
  for (let x = 24; x <= width - 24; x += 4) {
    const progress = (x - 24) / (width - 48);
    const y = height / 2 + Math.sin(progress * Math.PI * 2 * waves) * amp;
    if (x === 24) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  ctx.strokeStyle = "#ef6f61";
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let x = 24; x <= width - 24; x += 4) {
    const progress = (x - 24) / (width - 48);
    const y = height / 2 + Math.sin(progress * Math.PI * 2 * waves + Math.PI / 3) * amp * 0.52;
    if (x === 24) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  waveFeedback.textContent = frequency > 650
    ? "现在波形更密，说明振动更快，音调更高。"
    : amplitude > 70
      ? "现在波峰和波谷更明显，说明振幅更大，响度通常更大。"
      : "频率变高时，波形更密；振幅变大时，波峰和波谷更高更低。";
}

function updateEcho() {
  const time = Number(echoTimeSlider.value);
  const distance = 340 * time / 2;
  echoTimeOutput.textContent = `${time.toFixed(1)} s`;
  echoDistanceOutput.textContent = `${Math.round(distance)} m`;
}

function setNoise(type) {
  const messages = {
    source: "摩托车消声器：在声源处减弱噪声，也就是尽量防止噪声产生。",
    path: "道路隔音板：在传播过程中阻断噪声，减少声音传到居民区。",
    ear: "防噪声耳罩：在人耳处保护听觉，防止噪声进入耳朵。",
  };
  noiseButtons.forEach((button) => {
    setButtonPressedState(button, button.dataset.noise === type);
  });
  noiseResult.textContent = messages[type];
}

frequencySlider.addEventListener("input", drawWave);
amplitudeSlider.addEventListener("input", drawWave);
echoTimeSlider.addEventListener("input", updateEcho);
noiseButtons.forEach((button) => {
  button.addEventListener("click", () => setNoise(button.dataset.noise));
});
frequencyBandButtons.forEach((button) => {
  button.addEventListener("click", () => setFrequencyBand(Number(button.dataset.frequencyBand)));
});

setupLayeredQuiz({
  formSelector: "#soundQuiz",
  resultSelector: "#soundQuizResult",
  quizId: "chapter2",
  levels: createChapterLayers({
    basic: ["s1", "s2", "s3"],
    application: ["s4", "s6", "s7"],
    inquiry: ["s5", "s8", "s9"],
    challenge: ["s10", "s11"],
  }),
  answers: {
    s1: "a",
    s2: "b",
    s3: "a",
    s4: "a",
    s5: ["b-ultrasound", "sonar"],
    s6: "b",
    s7: ["68", "68m", "68米"],
    s8: ["amplitude", "short-high"],
    s9: { low: "infra", middle: "audible", high: "ultra" },
    s10: ["steel-first", "medium"],
    s11: ["450", "450m", "450米"],
  },
  questionTypes: {
    s5: "multi",
    s7: "text",
    s8: "multi",
    s9: "match",
    s10: "multi",
    s11: "text",
  },
  answerDetails: {
    s5: "判断方法：能帮助测距、成像、定位的多是传递信息；能清洗、碎石、推动物体运动的多是传递能量。",
    s7: "回声走过的是人与山崖距离的两倍，因此距离为 340 m/s × 0.40 s ÷ 2 = 68 m。",
    s8: "控制拨动幅度相同，再改变钢尺伸出长度，可把观察重点放在振动快慢和音调上。",
    s9: "通常把低于 20 Hz 的声称为次声波，20～20000 Hz 为人耳可听范围，高于 20000 Hz 为超声波。",
    s10: "表格说明声速与介质有关；相同距离下，速度越大，传播时间越短。",
    s11: "声波往返一次走过两倍水深，所以 h = 1500 m/s × 0.60 s ÷ 2 = 450 m。",
  },
  hints: {
    s1: "第 1 题回看“声音的产生”：声音由物体振动产生。",
    s2: "第 2 题回看“声音的传播”：声音传播需要介质，真空不能传声。",
    s3: "第 3 题回看“音调”：频率越高，音调越高。",
    s4: "第 4 题回看“响度”：振幅越大，响度通常越大。",
    s5: "第 5 题回看“声与信息”：B 超和声呐主要利用声传递信息，超声清洗和碎石更突出声传递能量。",
    s6: "第 6 题回看“噪声控制”：隔音板是在传播过程中减弱噪声。",
    s7: "回声传播路程是人与山崖距离的两倍。",
    s8: "研究音调时应控制拨动幅度等条件，只改变影响频率的因素。",
    s9: "人耳通常能听到 20～20000 Hz 的声音。",
    s10: "用 s = vt 比较相同距离下不同介质中的传播时间。",
    s11: "声呐测深也要除以 2，因为给出的是往返时间。",
  },
  reviewLinks: {
    s1: { href: "#sound-origin", label: "回看声音的产生" },
    s2: { href: "#sound-origin", label: "回看声音传播" },
    s3: { href: "#sound-origin", label: "回看音调" },
    s4: { href: "#sound-origin", label: "回看响度" },
    s5: { href: "#sound-use", label: "回看声的利用" },
    s6: { href: "#sound-use", label: "回看噪声控制" },
    s7: { href: "#sound-use", label: "回看回声测距" },
    s8: { href: "#sound-origin", label: "回看音调实验" },
    s9: { href: "#sound-range", label: "回看频率范围" },
    s10: { href: "#sound-range", label: "回看不同介质中的声速" },
    s11: { href: "#sound-use", label: "回看声呐测距" },
  },
  badges: (score) => score === 6 ? "第二章掌握很稳" : score >= 4 ? "第二章基本过关" : "建议回看声音实验",
  successMessage: "很好。你已经能用振动、介质、频率、振幅和噪声控制来解释声现象。",
});

drawWave();
updateEcho();
setNoise("source");
setFrequencyBand(10);
