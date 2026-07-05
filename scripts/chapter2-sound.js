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

function drawWave() {
  const ctx = waveCanvas.getContext("2d");
  const width = waveCanvas.width;
  const height = waveCanvas.height;
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
    button.classList.toggle("is-active", button.dataset.noise === type);
  });
  noiseResult.textContent = messages[type];
}

frequencySlider.addEventListener("input", drawWave);
amplitudeSlider.addEventListener("input", drawWave);
echoTimeSlider.addEventListener("input", updateEcho);
noiseButtons.forEach((button) => {
  button.addEventListener("click", () => setNoise(button.dataset.noise));
});

setupQuiz({
  formSelector: "#soundQuiz",
  resultSelector: "#soundQuizResult",
  quizId: "chapter2",
  answers: {
    s1: "a",
    s2: "b",
    s3: "a",
    s4: "a",
    s5: ["b-ultrasound", "sonar"],
    s6: "b",
  },
  questionTypes: {
    s5: "multi",
  },
  hints: {
    s1: "第 1 题回看“声音的产生”：声音由物体振动产生。",
    s2: "第 2 题回看“声音的传播”：声音传播需要介质，真空不能传声。",
    s3: "第 3 题回看“音调”：频率越高，音调越高。",
    s4: "第 4 题回看“响度”：振幅越大，响度通常越大。",
    s5: "第 5 题回看“声与信息”：B 超和声呐主要利用声传递信息，超声清洗和碎石更突出声传递能量。",
    s6: "第 6 题回看“噪声控制”：隔音板是在传播过程中减弱噪声。",
  },
  reviewLinks: {
    s1: { href: "#sound-origin", label: "回看声音的产生" },
    s2: { href: "#sound-origin", label: "回看声音传播" },
    s3: { href: "#sound-origin", label: "回看音调" },
    s4: { href: "#sound-origin", label: "回看响度" },
    s5: { href: "#sound-use", label: "回看声的利用" },
    s6: { href: "#sound-use", label: "回看噪声控制" },
  },
  badges: (score) => score === 6 ? "第二章掌握很稳" : score >= 4 ? "第二章基本过关" : "建议回看声音实验",
  successMessage: "很好。你已经能用振动、介质、频率、振幅和噪声控制来解释声现象。",
});

drawWave();
updateEcho();
