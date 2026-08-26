export type Rgba = { r: number; g: number; b: number; a: number };

const NAMED_COLORS: Record<string, string> = {
  black: "#000000",
  white: "#ffffff",
  red: "#ff0000",
  green: "#008000",
  blue: "#0000ff",
  yellow: "#ffff00",
  orange: "#ffa500",
  purple: "#800080",
  pink: "#ffc0cb",
  gray: "#808080",
  grey: "#808080",
  silver: "#c0c0c0",
  darkgray: "#a9a9a9",
  darkgrey: "#a9a9a9",
  dimgray: "#696969",
  dimgrey: "#696969",
  lightgray: "#d3d3d3",
  lightgrey: "#d3d3d3",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  slategray: "#708090",
  slategrey: "#708090",
  whitesmoke: "#f5f5f5",
  gainsboro: "#dcdcdc",
  snow: "#fffafa",
  linen: "#faf0e6",
  ivory: "#fffff0",
  beige: "#f5f5dc",
  coral: "#ff7f50",
  tomato: "#ff6347",
  crimson: "#dc143c",
  firebrick: "#b22222",
  maroon: "#800000",
  darkred: "#8b0000",
  salmon: "#fa8072",
  gold: "#ffd700",
  tan: "#d2b48c",
  khaki: "#f0e68c",
  olive: "#808000",
  darkgreen: "#006400",
  forestgreen: "#228b22",
  lime: "#00ff00",
  limegreen: "#32cd32",
  seagreen: "#2e8b57",
  mediumseagreen: "#3cb371",
  teal: "#008080",
  aqua: "#00ffff",
  cyan: "#00ffff",
  darkcyan: "#008b8b",
  navy: "#000080",
  darkblue: "#00008b",
  mediumblue: "#0000cd",
  royalblue: "#4169e1",
  dodgerblue: "#1e90ff",
  steelblue: "#4682b4",
  skyblue: "#87ceeb",
  lightblue: "#add8e6",
  indigo: "#4b0082",
  darkviolet: "#9400d3",
  darkmagenta: "#8b008b",
  magenta: "#ff00ff",
  fuchsia: "#ff00ff",
  violet: "#ee82ee",
  orchid: "#da70d6",
  plum: "#dda0dd",
  hotpink: "#ff69b4",
  deeppink: "#ff1493",
  brown: "#a52a2a",
  chocolate: "#d2691e",
  saddlebrown: "#8b4513",
  bisque: "#ffe4c4",
  peachpuff: "#ffdab9",
  moccasin: "#ffe4b5",
  mistyrose: "#ffe4e1",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  thistle: "#d8bfd8",
  aliceblue: "#f0f8ff",
  azure: "#f0ffff",
  honeydew: "#f0fff0",
  mintcream: "#f5fffa",
  seashell: "#fff5ee",
  oldlace: "#fdf5e6",
  floralwhite: "#fffaf0",
  ghostwhite: "#f8f8ff",
  antiquewhite: "#faebd7",
  cornsilk: "#fff8dc",
  lightyellow: "#ffffe0",
  lemonchiffon: "#fffacd",
  lightgoldenrodyellow: "#fafad2",
  papayawhip: "#ffefd5",
  blanchedalmond: "#ffebcd",
  navajowhite: "#ffdead",
  wheat: "#f5deb3",
  burlywood: "#deb887",
  darkkhaki: "#bdb76b",
  darkolivegreen: "#556b2f",
  mediumslateblue: "#7b68ee",
  slateblue: "#6a5acd",
  mediumpurple: "#9370db",
  blueviolet: "#8a2be2",
  rebeccapurple: "#663399",
  darkorchid: "#9932cc",
  mediumorchid: "#ba55d3",
  palevioletred: "#db7093",
  lightcoral: "#f08080",
  indianred: "#cd5c5c",
  rosybrown: "#bc8f8f",
  darkgoldenrod: "#b8860b",
  goldenrod: "#daa520",
  darkorange: "#ff8c00",
  lightsalmon: "#ffa07a",
  darksalmon: "#e9967a",
  lightpink: "#ffb6c1",
  mediumvioletred: "#c71585",
  darkturquoise: "#00ced1",
  mediumturquoise: "#48d1cc",
  paleturquoise: "#afeeee",
  aquamarine: "#7fffd4",
  mediumaquamarine: "#66cdaa",
  darkseagreen: "#8fbc8f",
  lightgreen: "#90ee90",
  palegreen: "#98fb98",
  springgreen: "#00ff7f",
  mediumspringgreen: "#00fa9a",
  darkolivegreen2: "#556b2f",
  lawngreen: "#7cfc00",
  chartreuse: "#7fff00",
  yellowgreen: "#9acd32",
  darkgoldenrod2: "#b8860b",
  olivedrab: "#6b8e23",
  darkorange2: "#ff8c00",
  darkcyan2: "#008b8b",
};

const COLOR_FUNCTIONS = new Set([
  "rgb",
  "rgba",
  "hsl",
  "hsla",
  "hwb",
  "oklch",
  "oklab",
  "lab",
  "lch",
  "color",
]);

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const clamp255 = (n: number) => Math.min(255, Math.max(0, Math.round(n)));

export function parseColor(text: string): Rgba | null {
  const t = text.trim().toLowerCase();
  if (!t || t === "transparent" || t === "currentcolor" || t === "inherit" || t === "initial") {
    return null;
  }

  if (t.startsWith("#")) {
    let hex = t.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }
    if (hex.length !== 6 && hex.length !== 8) return null;
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
    if ([r, g, b].some(Number.isNaN)) return null;
    return { r, g, b, a };
  }

  if (NAMED_COLORS[t]) {
    const { r, g, b } = parseColor(NAMED_COLORS[t])!;
    return { r, g, b, a: 1 };
  }

  const fn = t.match(/^([a-z]+)\((.*)\)$/s);
  if (!fn) return null;
  const name = fn[1];
  const args = splitColorParts(fn[2]);

  if (name === "rgb" || name === "rgba") {
    const channel = (s: string): number | null => {
      const t = s.trim();
      const n = parseFloat(t);
      if (Number.isNaN(n)) return null;
      return t.endsWith("%") ? (n / 100) * 255 : n;
    };
    const nums = args.slice(0, 3).map(channel);
    if (nums.length < 3 || nums.some((n) => n === null)) return null;
    const a = args[3] !== undefined ? parseAlpha(args[3]) : 1;
    return { r: clamp255(nums[0]!), g: clamp255(nums[1]!), b: clamp255(nums[2]!), a: clamp01(a) };
  }

  if (name === "hsl" || name === "hsla") {
    const h = parseFloat(args[0] ?? "0");
    const s = parsePercent(args[1] ?? "0%");
    const l = parsePercent(args[2] ?? "0%");
    const a = args[3] !== undefined ? parseAlpha(args[3]) : 1;
    if ([h, s, l].some(Number.isNaN)) return null;
    return hslToRgb(((h % 360) + 360) % 360, s, l, a);
  }

  if (name === "hwb") {
    const h = parseFloat(args[0] ?? "0");
    const w = parsePercent(args[1] ?? "0%");
    const b = parsePercent(args[2] ?? "0%");
    const a = args[3] !== undefined ? parseAlpha(args[3]) : 1;
    if ([h, w, b].some(Number.isNaN)) return null;
    return hwbToRgb(((h % 360) + 360) % 360, w, b, a);
  }

  if (name === "oklch") {
    const l = parsePercent(args[0] ?? "0");
    const c = parseFloat(args[1] ?? "0");
    const h = parseFloat(args[2] ?? "0");
    const a = args[3] !== undefined ? parseAlpha(args[3]) : 1;
    if ([l, c, h].some(Number.isNaN)) return null;
    return oklchToRgb(l, c, ((h % 360) + 360) % 360, a);
  }

  if (name === "oklab") {
    const l = parsePercent(args[0] ?? "0");
    const a = parseFloat(args[1] ?? "0");
    const b = parseFloat(args[2] ?? "0");
    const alpha = args[3] !== undefined ? parseAlpha(args[3]) : 1;
    if ([l, a, b].some(Number.isNaN)) return null;
    return oklabToRgb(l, a, b, alpha);
  }

  if (name === "lab") {
    const l = parseFloat(args[0] ?? "0");
    const a = parseFloat(args[1] ?? "0");
    const b = parseFloat(args[2] ?? "0");
    const alpha = args[3] !== undefined ? parseAlpha(args[3]) : 1;
    if ([l, a, b].some(Number.isNaN)) return null;
    return labToRgb(l, a, b, alpha);
  }

  if (name === "lch") {
    const l = parseFloat(args[0] ?? "0");
    const c = parseFloat(args[1] ?? "0");
    const h = parseFloat(args[2] ?? "0");
    const alpha = args[3] !== undefined ? parseAlpha(args[3]) : 1;
    if ([l, c, h].some(Number.isNaN)) return null;
    return labToRgb(l, c * Math.cos((h * Math.PI) / 180), c * Math.sin((h * Math.PI) / 180), alpha);
  }

  return null;
}

/**
 * Split a color function's argument string into tokens. Supports both the
 * legacy comma syntax (`rgb(255, 0, 0, 0.5)`) and the modern space syntax
 * (`rgb(255 0 0 / 50%)`); the `/` alpha separator is dropped and the alpha
 * value itself becomes the trailing token.
 */
function splitColorParts(s: string): string[] {
  if (s.includes(",")) return splitArgs(s);
  return s
    .trim()
    .split(/\s+/)
    .filter((p) => p && p !== "/");
}

function splitArgs(s: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let cur = "";
  for (const ch of s) {
    if (ch === "(" || ch === "[") depth++;
    else if (ch === ")" || ch === "]") depth--;
    if (ch === "," && depth === 0) {
      out.push(cur.trim());
      cur = "";
    } else {
      cur += ch;
    }
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

function parsePercent(s: string): number {
  const n = parseFloat(s);
  return Number.isNaN(n) ? 0 : n / 100;
}

function parseAlpha(s: string): number {
  const t = s.trim().replace(/^\/\s*/, "");
  const n = parseFloat(t);
  if (Number.isNaN(n)) return 1;
  return t.endsWith("%") ? clamp01(n / 100) : clamp01(n);
}

function hslToRgb(h: number, s: number, l: number, a: number): Rgba {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return {
    r: clamp255((r + m) * 255),
    g: clamp255((g + m) * 255),
    b: clamp255((b + m) * 255),
    a,
  };
}

function hwbToRgb(h: number, w: number, b: number, a: number): Rgba {
  const { r, g, b: bb } = hslToRgb(h, 1, 0.5, 1);
  const sum = w + b;
  if (sum >= 1) {
    const gray = Math.round((w / sum) * 255);
    return { r: gray, g: gray, b: gray, a };
  }
  const factor = 1 - sum;
  return {
    r: clamp255(r * factor + w * 255),
    g: clamp255(g * factor + w * 255),
    b: clamp255(bb * factor + w * 255),
    a,
  };
}

function srgbToLinear(c: number): number {
  const n = c / 255;
  return n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
}

function linearToSrgb(n: number): number {
  return n <= 0.0031308 ? n * 12.92 : 1.055 * Math.pow(n, 1 / 2.4) - 0.055;
}

function oklchToRgb(l: number, c: number, h: number, a: number): Rgba {
  return oklabToRgb(l, c * Math.cos((h * Math.PI) / 180), c * Math.sin((h * Math.PI) / 180), a);
}

function oklabToRgb(l: number, a: number, b: number, alpha: number): Rgba {
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;
  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;
  const r = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const b2 = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;
  return {
    r: clamp255(linearToSrgb(clamp01(r)) * 255),
    g: clamp255(linearToSrgb(clamp01(g)) * 255),
    b: clamp255(linearToSrgb(clamp01(b2)) * 255),
    a: alpha,
  };
}

function labToRgb(l: number, a: number, b: number, alpha: number): Rgba {
  const fy = (l + 16) / 116;
  const fx = fy + a / 500;
  const fz = fy - b / 200;
  const f = (t: number) => {
    const t3 = t * t * t;
    return t3 > 0.008856 ? t3 : (t - 16 / 116) / 7.787;
  };
  const x = f(fx) * 0.95047;
  const y = f(fy) * 1;
  const z = f(fz) * 1.08883;
  const r = 3.2404542 * x - 1.5371385 * y - 0.4985314 * z;
  const g = -0.969266 * x + 1.8760108 * y + 0.041556 * z;
  const bb = 0.0556434 * x - 0.2040259 * y + 1.0572252 * z;
  return {
    r: clamp255(linearToSrgb(clamp01(r)) * 255),
    g: clamp255(linearToSrgb(clamp01(g)) * 255),
    b: clamp255(linearToSrgb(clamp01(bb)) * 255),
    a: alpha,
  };
}

export function toHex({ r, g, b, a }: Rgba): string {
  const hex = (n: number) => n.toString(16).padStart(2, "0");
  const base = `#${hex(clamp255(r))}${hex(clamp255(g))}${hex(clamp255(b))}`;
  if (a < 1) {
    const aa = Math.round(a * 255);
    if (aa < 255) return `${base}${hex(aa)}`;
  }
  return base;
}

export function toOklch({ r, g, b, a }: Rgba): string {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);
  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  const C = Math.sqrt(A * A + B * B);
  const H = (Math.atan2(B, A) * 180) / Math.PI;
  const h = C < 0.0005 ? 0 : H < 0 ? H + 360 : H;
  const round = (n: number, digits = 4) => {
    const factor = Math.pow(10, digits);
    return Math.round(n * factor) / factor;
  };
  const base = `oklch(${round(L)} ${round(C)} ${round(h)})`;
  if (a < 1) return `${base.slice(0, -1)} / ${round(a, 3)})`;
  return base;
}

export function luminance({ r, g, b }: Rgba): number {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

export function chroma({ r, g, b }: Rgba): number {
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  return max - min;
}

export function isRedDominant({ r, g, b }: Rgba): boolean {
  return r > 140 && r > g * 1.6 && r > b * 1.6;
}

export function isNeutral({ r, g, b }: Rgba): boolean {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max - min < 24;
}

export function sizeToPx(value: string): number | null {
  const t = value.trim().toLowerCase();
  if (!t || t === "auto" || t === "inherit" || t === "initial") return null;

  const px = t.match(/^(-?\d*\.?\d+)px$/);
  if (px) return parseFloat(px[1]);

  const rem = t.match(/^(-?\d*\.?\d+)rem$/);
  if (rem) return parseFloat(rem[1]) * 16;

  const clamp = t.match(/^clamp\(\s*(-?[\d.]+)(?:[a-z%]+)?\s*,\s*(-?[\d.]+)(?:[a-z%]+)?\s*,\s*[^)]+\)$/);
  if (clamp) {
    const unit = t.includes("rem") ? 16 : 1;
    return parseFloat(clamp[2]) * unit;
  }

  const calc = t.match(/^calc\(\s*(-?[\d.]+)(?:px|rem)?\s*([+-])\s*(-?[\d.]+)(?:px|rem)?\s*\)$/);
  if (calc) {
    const unit = t.includes("rem") ? 16 : 1;
    const n = parseFloat(calc[1]) * unit;
    const m = parseFloat(calc[3]) * unit;
    return calc[2] === "+" ? n + m : n - m;
  }

  return null;
}

export function normalizeOklch(text: string): string | null {
  const m = text.match(
    /oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)/,
  );
  if (!m) return null;
  const l = parsePercent(m[1]);
  const c = parseFloat(m[2]);
  const h = parseFloat(m[3]);
  const a = m[4] !== undefined ? parseAlpha(m[4]) : 1;
  const round = (n: number, digits = 4) => {
    const factor = Math.pow(10, digits);
    return Math.round(n * factor) / factor;
  };
  const base = `oklch(${round(l)} ${round(c)} ${round(((h % 360) + 360) % 360)})`;
  if (a < 1) return `${base.slice(0, -1)} / ${round(a, 3)})`;
  return base;
}