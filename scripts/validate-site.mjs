import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const chapterDir = path.join(root, "chapters");
const htmlFiles = [
  path.join(root, "index.html"),
  ...fs.readdirSync(chapterDir)
    .filter((name) => name.endsWith(".html"))
    .map((name) => path.join(chapterDir, name)),
];
const scriptFiles = fs.readdirSync(path.join(root, "scripts"))
  .filter((name) => name.endsWith(".js") || name.endsWith(".mjs"))
  .map((name) => path.join(root, "scripts", name));
const errors = [];
const quizPageNames = {
  chapter1: "chapter1-motion.html",
  chapter2: "chapter2-sound.html",
  chapter3: "chapter3-states.html",
  half: "chapter3-states.html",
  chapter4: "chapter4-light.html",
  chapter5: "chapter5-lenses.html",
  chapter6: "chapter6-density.html",
  chapter7: "chapter7-force.html",
  chapter8: "chapter8-motion-force.html",
  chapter9: "chapter9-pressure.html",
  chapter10: "chapter10-buoyancy.html",
  chapter11: "chapter11-work-energy.html",
  chapter12: "chapter12-simple-machines.html",
  final: "final-check.html",
  final2: "final-check-volume2.html",
};

function relative(file) {
  return path.relative(root, file);
}

function report(condition, message) {
  if (!condition) errors.push(message);
}

function extractBalanced(source, startIndex) {
  const start = source.indexOf("{", startIndex);
  if (start < 0) throw new Error("Object start not found");
  let depth = 0;
  let quote = "";
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === quote) {
        quote = "";
      }
      continue;
    }
    if (character === "\"" || character === "'" || character === "`") {
      quote = character;
      continue;
    }
    if (character === "{") depth += 1;
    if (character === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error("Object end not found");
}

function createChapterLayers({ basic, application, inquiry, challenge }) {
  return [
    { id: "basic", questionKeys: basic },
    { id: "application", questionKeys: application },
    { id: "inquiry", questionKeys: inquiry },
    { id: "challenge", questionKeys: challenge, required: false },
  ];
}

function evaluateObject(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) throw new Error(`Marker not found: ${marker}`);
  const objectSource = extractBalanced(source, markerIndex);
  return vm.runInNewContext(`(${objectSource})`, { createChapterLayers });
}

function getFormKeys(html, selector) {
  const formId = selector.replace(/^#/, "");
  const formPattern = new RegExp(`<form[^>]*id="${formId}"[^>]*>([\\s\\S]*?)<\\/form>`, "i");
  const form = html.match(formPattern)?.[1] || "";
  return [...new Set([...form.matchAll(/(?:name|data-(?:order|match)-group)="([a-z]+\d+)"/gi)].map((match) => match[1]))];
}

const htmlByBasename = new Map();
const globalIds = new Set();

htmlFiles.forEach((file) => {
  const html = fs.readFileSync(file, "utf8");
  htmlByBasename.set(path.basename(file), html);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  ids.forEach((id) => globalIds.add(id));
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  report(!duplicateIds.length, `${relative(file)} has duplicate IDs: ${[...new Set(duplicateIds)].join(", ")}`);
  report((html.match(/<h1\b/gi) || []).length === 1, `${relative(file)} must contain exactly one h1`);

  [...html.matchAll(/<img\b[^>]*>/gi)].forEach(([tag]) => {
    report(/\salt="[^"]*"/i.test(tag), `${relative(file)} has an image without alt text`);
    if (/hero\.webp/i.test(tag)) {
      report(/\swidth="1672"/i.test(tag) && /\sheight="941"/i.test(tag), `${relative(file)} hero image lacks stable dimensions`);
      report(/\sdecoding="async"/i.test(tag), `${relative(file)} hero image lacks async decoding`);
    }
  });
  [...html.matchAll(/<[^>]+\srole="img"[^>]*>/gi)].forEach(([tag]) => {
    report(/\saria-(?:label|labelledby)="[^"]+"/i.test(tag), `${relative(file)} has role=img without an accessible name`);
  });

  [...html.matchAll(/\s(?:src|href)="([^"]+)"/gi)].forEach(([, reference]) => {
    if (/^(?:https?:|mailto:|#)/.test(reference)) return;
    const cleanReference = reference.split(/[?#]/)[0];
    if (!cleanReference) return;
    const target = path.resolve(path.dirname(file), cleanReference);
    report(fs.existsSync(target), `${relative(file)} references missing file ${reference}`);
  });

  [...html.matchAll(/\shref="([^"]+#[^"]+)"/gi)].forEach(([, href]) => {
    if (/^(?:https?:|mailto:)/.test(href)) return;
    const [targetPath, anchor] = href.split("#");
    const targetHtml = targetPath
      ? fs.readFileSync(path.resolve(path.dirname(file), targetPath), "utf8")
      : html;
    report(new RegExp(`\\sid="${anchor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`).test(targetHtml), `${relative(file)} links to missing anchor ${href}`);
  });

  if (html.includes("scripts/quiz.js")) {
    report(html.indexOf("physics-units.js") < html.indexOf("quiz.js"), `${relative(file)} must load physics-units.js before quiz.js`);
  }
});

scriptFiles.forEach((file) => {
  execFileSync(process.execPath, ["--check", file], { stdio: "pipe" });
});

const configs = [];
const chapterScripts = [
  "chapter1-motion.js",
  "chapter2-sound.js",
  "chapter3-states.js",
  "chapter4-light.js",
  "chapter5-lenses.js",
  "chapter6-density.js",
];
chapterScripts.forEach((name) => {
  const source = fs.readFileSync(path.join(root, "scripts", name), "utf8");
  ["setupLayeredQuiz({", "setupQuiz({"].forEach((callMarker) => {
    let offset = 0;
    while (source.indexOf(callMarker, offset) >= 0) {
      const markerIndex = source.indexOf(callMarker, offset);
      configs.push(evaluateObject(source.slice(markerIndex), callMarker.slice(0, -1)));
      offset = markerIndex + callMarker.length;
    }
  });
});

const volume2Source = fs.readFileSync(path.join(root, "scripts", "chapter-volume2.js"), "utf8");
configs.push(...Object.values(evaluateObject(volume2Source, "const volume2QuizConfigs =")));
["final-check.js", "final-check-volume2.js"].forEach((name) => {
  const source = fs.readFileSync(path.join(root, "scripts", name), "utf8");
  configs.push(evaluateObject(source, "setupQuiz("));
});

configs.forEach((config) => {
  const answerKeys = Object.keys(config.answers || {});
  const pageName = quizPageNames[config.quizId];
  const page = pageName ? path.join(chapterDir, pageName) : null;
  const formSelector = config.formSelector || (/^chapter(?:[7-9]|1[0-2])$/.test(config.quizId) ? "#volume2Quiz" : "");
  report(Boolean(page && formSelector), `${config.quizId} form ${formSelector || "(missing selector)"} was not found`);
  if (!page) return;
  const formKeys = getFormKeys(fs.readFileSync(page, "utf8"), formSelector);
  report(answerKeys.length === formKeys.length && answerKeys.every((key) => formKeys.includes(key)), `${config.quizId} answer keys do not match form controls`);

  const levels = config.levels || config.diagnosticLevels || [];
  if (levels.length) {
    const assigned = levels.flatMap((level) => level.questionKeys);
    const duplicates = assigned.filter((key, index) => assigned.indexOf(key) !== index);
    const missing = answerKeys.filter((key) => !assigned.includes(key));
    report(!duplicates.length, `${config.quizId} assigns questions to more than one level: ${[...new Set(duplicates)].join(", ")}`);
    report(!missing.length, `${config.quizId} has unassigned questions: ${missing.join(", ")}`);
  }

  Object.entries(config.reviewLinks || {}).forEach(([key, link]) => {
    report(answerKeys.includes(key), `${config.quizId} has a review link for unknown question ${key}`);
    const href = link.href || "";
    const anchor = href.split("#")[1];
    if (!anchor) return;
    if (href.includes(".html")) {
      const targetName = path.basename(href.split("#")[0]);
      const targetHtml = htmlByBasename.get(targetName) || "";
      report(targetHtml.includes(`id="${anchor}"`), `${config.quizId} review link targets missing anchor ${href}`);
    } else {
      report(globalIds.has(anchor), `${config.quizId} review link targets missing anchor ${href}`);
    }
  });
});

const commonSource = fs.readFileSync(path.join(root, "scripts", "common.js"), "utf8");
const versions = evaluateObject(commonSource, "var QUIZ_VERSIONS =");
configs.forEach((config) => {
  report(Number.isInteger(versions[config.quizId]), `${config.quizId} is missing from QUIZ_VERSIONS`);
});

const require = createRequire(import.meta.url);
const { parseNumber } = require("./physics-units.js");
const unitCases = [
  ["10 kPa", 10000],
  ["1.5×10⁴ Pa", 15000],
  ["36 km/h", 10],
  ["200 cm³", 2e-4],
  ["0.2 L", 2e-4],
  ["1 g/cm³", 1000],
  ["80%", 0.8],
  ["2 kJ", 2000],
  ["0.1 m", 0.1],
];
unitCases.forEach(([input, expected]) => {
  assert.ok(Math.abs(parseNumber(input) - expected) <= Math.max(1e-12, Math.abs(expected) * 1e-9), `${input} unit conversion failed`);
});
assert.equal(parseNumber("12 mystery-units"), null);
assert.equal(parseNumber("10", "cm"), 0.1);

if (errors.length) {
  console.error(errors.map((message) => `- ${message}`).join("\n"));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML pages, ${configs.length} quizzes, ${scriptFiles.length} scripts, and ${unitCases.length} unit conversions.`);
