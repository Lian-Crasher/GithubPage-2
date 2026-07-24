(function exposePhysicsUnits(root, factory) {
  const api = factory();
  root.PhysicsUnits = api;
  if (typeof module === "object" && module.exports) module.exports = api;
}(typeof globalThis === "undefined" ? this : globalThis, function createPhysicsUnits() {
  const superscripts = {
    "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4",
    "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-",
  };
  const unitFactors = {
    "": 1,
    "%": 0.01,
    "％": 0.01,
    "℃": 1,
    "°c": 1,
    "m": 1,
    "cm": 1e-2,
    "mm": 1e-3,
    "km": 1e3,
    "米": 1,
    "厘米": 1e-2,
    "毫米": 1e-3,
    "千米": 1e3,
    "m2": 1,
    "m^2": 1,
    "cm2": 1e-4,
    "cm^2": 1e-4,
    "mm2": 1e-6,
    "mm^2": 1e-6,
    "平方米": 1,
    "平方厘米": 1e-4,
    "平方毫米": 1e-6,
    "m3": 1,
    "m^3": 1,
    "dm3": 1e-3,
    "dm^3": 1e-3,
    "cm3": 1e-6,
    "cm^3": 1e-6,
    "ml": 1e-6,
    "l": 1e-3,
    "立方米": 1,
    "立方分米": 1e-3,
    "立方厘米": 1e-6,
    "毫升": 1e-6,
    "升": 1e-3,
    "s": 1,
    "秒": 1,
    "min": 60,
    "分钟": 60,
    "h": 3600,
    "小时": 3600,
    "m/s": 1,
    "米/秒": 1,
    "米每秒": 1,
    "km/h": 1000 / 3600,
    "千米/时": 1000 / 3600,
    "千米每小时": 1000 / 3600,
    "kg": 1,
    "千克": 1,
    "g": 1e-3,
    "克": 1e-3,
    "t": 1e3,
    "吨": 1e3,
    "kg/m3": 1,
    "kg/m^3": 1,
    "千克/立方米": 1,
    "千克每立方米": 1,
    "g/cm3": 1e3,
    "g/cm^3": 1e3,
    "克/立方厘米": 1e3,
    "克每立方厘米": 1e3,
    "n": 1,
    "牛": 1,
    "牛顿": 1,
    "n/kg": 1,
    "牛/千克": 1,
    "牛每千克": 1,
    "pa": 1,
    "kpa": 1e3,
    "mpa": 1e6,
    "帕": 1,
    "千帕": 1e3,
    "兆帕": 1e6,
    "j": 1,
    "kj": 1e3,
    "焦": 1,
    "焦耳": 1,
    "千焦": 1e3,
    "w": 1,
    "kw": 1e3,
    "瓦": 1,
    "瓦特": 1,
    "千瓦": 1e3,
    "hz": 1,
    "khz": 1e3,
    "赫兹": 1,
    "千赫兹": 1e3,
    "db": 1,
    "分贝": 1,
  };

  function normalize(value) {
    return String(value ?? "")
      .trim()
      .toLowerCase()
      .replace(/[，,]/g, "")
      .replace(/[×x]/g, "*")
      .replace(/[−–—]/g, "-")
      .replace(/10([⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+)/g, (_, exponent) => {
        return `10^${Array.from(exponent).map((character) => superscripts[character]).join("")}`;
      })
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]/g, (character) => superscripts[character])
      .replace(/\s+/g, "");
  }

  function parseNumber(value, defaultUnit = "") {
    const compact = normalize(value);
    const normalizedDefaultUnit = normalize(defaultUnit);
    const powerOfTen = compact.match(/^10\^([+-]?\d+)(.*)$/u);
    if (powerOfTen) {
      const factor = unitFactors[powerOfTen[2] || normalizedDefaultUnit];
      if (factor === undefined) return null;
      const number = (10 ** Number(powerOfTen[1])) * factor;
      return Number.isFinite(number) ? number : null;
    }

    const match = compact.match(
      /^([+-]?(?:\d+(?:\.\d*)?|\.\d+))(?:(?:\*10\^?([+-]?\d+))|(?:e([+-]?\d+)))?(.*)$/u,
    );
    if (!match) return null;
    const factor = unitFactors[match[4] || normalizedDefaultUnit];
    if (factor === undefined) return null;
    const exponent = Number(match[2] ?? match[3] ?? 0);
    const number = Number(match[1]) * (10 ** exponent) * factor;
    return Number.isFinite(number) ? number : null;
  }

  return { parseNumber };
}));
