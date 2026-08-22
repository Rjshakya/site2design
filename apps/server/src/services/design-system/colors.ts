export type Rgb = { r: number; g: number; b: number };
export type Lab = { l: number; a: number; b: number };

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export function hexToRgb(hex: string): Rgb | null {
  const m = /^#([0-9a-f]{3,8})$/i.exec(hex.trim());
  if (!m) return null;
  let h = m[1];
  if (h.length === 3 || h.length === 4)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  if (h.length !== 6 && h.length !== 8) return null;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
  return { r, g, b, a: a } as Rgb & { a?: number };
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const to = (v: number) =>
    Math.round(clamp(v, 0, 255))
      .toString(16)
      .padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

export function rgbToLab({ r, g, b }: Rgb): Lab {
  const f = (v: number) => {
    const x = v / 255;
    const c = x > 0.04045 ? Math.pow((x + 0.055) / 1.055, 2.4) : x / 12.92;
    return c > 0.008856 ? Math.cbrt(c) : 7.787 * c + 16 / 116;
  };
  const rl = f(r);
  const gl = f(g);
  const bl = f(b);
  const X = (rl * 0.4124 + gl * 0.3576 + bl * 0.1805) / 0.95047;
  const Y = rl * 0.2126 + gl * 0.7152 + bl * 0.0722;
  const Z = (rl * 0.0193 + gl * 0.1192 + bl * 0.9505) / 1.08883;
  return { l: 116 * Y - 16, a: 500 * (X - Y), b: 200 * (Y - Z) };
}

export function labToRgb({ l, a, b }: Lab): Rgb {
  const fy = (l + 16) / 116;
  const fx = a / 500 + fy;
  const fz = fy - b / 200;
  const g = (t: number) => {
    const t3 = t * t * t;
    return t3 > 0.008856 ? t3 : (t - 16 / 116) / 7.787;
  };
  const X = 0.95047 * g(fx);
  const Y = g(fy);
  const Z = 1.08883 * g(fz);
  const to = (v: number) =>
    Math.round(
      clamp(255 * (v > 0.0031308 ? 1.055 * Math.pow(v, 1 / 2.4) - 0.055 : 12.92 * v), 0, 255),
    );
  return {
    r: to(X * 3.2406 + Y * -1.5372 + Z * -0.4986),
    g: to(X * -0.9689 + Y * 1.8758 + Z * 0.0415),
    b: to(X * 0.0557 + Y * -0.204 + Z * 1.057),
  };
}

export function deltaE(a: Lab, b: Lab): number {
  return Math.sqrt((a.l - b.l) ** 2 + (a.a - b.a) ** 2 + (a.b - b.b) ** 2);
}

export function luminance({ r, g, b }: Rgb): number {
  const f = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

export function contrast(a: Rgb, b: Rgb): number {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

export function isGrayscale({ r, g, b }: Rgb, tolerance = 12): boolean {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max - min <= tolerance;
}

export type Hsl = { h: number; s: number; l: number };

export function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  return { h: Math.round(h), s, l };
}

export function hslToRgb({ h, s, l }: Hsl): Rgb {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = (((h % 360) + 360) % 360) / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let rgb: [number, number, number];
  if (hp < 1) rgb = [c, x, 0];
  else if (hp < 2) rgb = [x, c, 0];
  else if (hp < 3) rgb = [0, c, x];
  else if (hp < 4) rgb = [0, x, c];
  else if (hp < 5) rgb = [x, 0, c];
  else rgb = [c, 0, x];
  const m = l - c / 2;
  return {
    r: Math.round((rgb[0] + m) * 255),
    g: Math.round((rgb[1] + m) * 255),
    b: Math.round((rgb[2] + m) * 255),
  };
}

export function hexToHsl(hex: string): Hsl {
  const rgb = hexToRgb(hex);
  return rgbToHsl(rgb ?? { r: 0, g: 0, b: 0 });
}

export function hexToHslCss(hex: string): string {
  const { h, s, l } = hexToHsl(hex);
  return `hsl(${h} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`;
}

export function blendAlpha(rgb: Rgb, alpha: number, onto: Rgb = { r: 255, g: 255, b: 255 }): Rgb {
  return {
    r: Math.round(rgb.r * alpha + onto.r * (1 - alpha)),
    g: Math.round(rgb.g * alpha + onto.g * (1 - alpha)),
    b: Math.round(rgb.b * alpha + onto.b * (1 - alpha)),
  };
}

const NUM = "([\\d.]+%?)";
const SPACE_RGB = new RegExp(
  `^rgba?\\(\\s*${NUM}\\s+${NUM}\\s+${NUM}(?:\\s*\\/\\s*(${NUM}))?\\s*\\)$`,
  "i",
);
const COMMA_RGB = new RegExp(
  `^rgba?\\(\\s*${NUM}\\s*,\\s*${NUM}\\s*,\\s*${NUM}(?:\\s*,\\s*(${NUM}))?\\s*\\)$`,
  "i",
);
const SPACE_HSL = new RegExp(
  `^hsla?\\(\\s*${NUM}(?:deg)?\\s+${NUM}\\s+${NUM}(?:\\s*\\/\\s*(${NUM}))?\\s*\\)$`,
  "i",
);
const COMMA_HSL = new RegExp(
  `^hsla?\\(\\s*${NUM}(?:deg)?\\s*,\\s*${NUM}\\s*,\\s*${NUM}(?:\\s*,\\s*(${NUM}))?\\s*\\)$`,
  "i",
);

function to255(v: string): number {
  if (v.endsWith("%")) return (parseFloat(v) / 100) * 255;
  return parseFloat(v);
}

function toAlpha(v: string | undefined): number {
  if (!v) return 1;
  if (v.endsWith("%")) return parseFloat(v) / 100;
  return parseFloat(v);
}

export function parseCssColor(value: string): { rgb: Rgb; alpha: number } | null {
  const v = value.trim().toLowerCase();
  if (
    !v ||
    v === "transparent" ||
    v === "currentcolor" ||
    v === "inherit" ||
    v === "initial" ||
    v === "unset"
  )
    return null;
  if (v.startsWith("#")) {
    const rgb = hexToRgb(v);
    if (!rgb) return null;
    const alpha = (rgb as Rgb & { a?: number }).a ?? 1;
    const { r, g, b } = rgb;
    return { rgb: { r, g, b }, alpha };
  }
  let m = SPACE_RGB.exec(v);
  if (m) {
    return { rgb: { r: to255(m[1]), g: to255(m[2]), b: to255(m[3]) }, alpha: toAlpha(m[4]) };
  }
  m = COMMA_RGB.exec(v);
  if (m) {
    return { rgb: { r: to255(m[1]), g: to255(m[2]), b: to255(m[3]) }, alpha: toAlpha(m[4]) };
  }
  m = SPACE_HSL.exec(v);
  if (m) {
    const h = parseFloat(m[1]);
    const s = parseFloat(m[2]) / 100;
    const l = parseFloat(m[3]) / 100;
    return { rgb: hslToRgb({ h, s, l }), alpha: toAlpha(m[4]) };
  }
  m = COMMA_HSL.exec(v);
  if (m) {
    const h = parseFloat(m[1]);
    const s = parseFloat(m[2]) / 100;
    const l = parseFloat(m[3]) / 100;
    return { rgb: hslToRgb({ h, s, l }), alpha: toAlpha(m[4]) };
  }
  return null;
}

export function normalizeColor(value: string): string | null {
  const parsed = parseCssColor(value);
  if (!parsed) return null;
  const rgb = parsed.alpha < 1 ? blendAlpha(parsed.rgb, parsed.alpha) : parsed.rgb;
  return rgbToHex(rgb);
}

export function mixLab(a: Lab, b: Lab, t: number): Lab {
  return {
    l: a.l + (b.l - a.l) * t,
    a: a.a + (b.a - a.a) * t,
    b: a.b + (b.b - a.b) * t,
  };
}

export function mixHex(a: string, b: string, t: number): string {
  const la = rgbToLab(hexToRgb(a) ?? { r: 0, g: 0, b: 0 });
  const lb = rgbToLab(hexToRgb(b) ?? { r: 0, g: 0, b: 0 });
  return rgbToHex(labToRgb(mixLab(la, lb, t)));
}

const RAMP_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export function tonalRamp(hex: string): Record<string, string> {
  const rgb = hexToRgb(hex);
  if (!rgb) return {};
  const { h, s, l } = rgbToHsl(rgb);
  const ramp: Record<string, string> = {};
  for (const step of RAMP_STEPS) {
    let lightness: number;
    if (step <= 500) lightness = l + (0.97 - l) * ((500 - step) / 450);
    else lightness = l + (0.05 - l) * ((step - 500) / 450);
    const sat = step <= 100 || step >= 950 ? s * 0.65 : s;
    ramp[String(step)] = rgbToHex(hslToRgb({ h, s: sat, l: clamp(lightness, 0.03, 0.97) }));
  }
  return ramp;
}

export function adjustLightness(hex: string, delta: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const { h, s, l } = rgbToHsl(rgb);
  return rgbToHex(hslToRgb({ h, s, l: clamp(l + delta, 0.03, 0.97) }));
}
