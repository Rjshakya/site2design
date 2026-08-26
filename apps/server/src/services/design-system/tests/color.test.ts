import { describe, expect, it } from "vitest";
import {
  chroma,
  isNeutral,
  isRedDominant,
  luminance,
  parseColor,
  sizeToPx,
  toHex,
  toOklch,
} from "../../../lib/color";

describe("parseColor", () => {
  it("parses hex forms", () => {
    expect(parseColor("#fff")).toEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(parseColor("#ffffff")).toEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(parseColor("#ff000080")).toEqual({ r: 255, g: 0, b: 0, a: 128 / 255 });
  });

  it("parses rgb() modern and legacy syntax", () => {
    expect(parseColor("rgb(255, 0, 0)")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    expect(parseColor("rgb(255 0 0)")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    expect(parseColor("rgb(100% 0% 0%)")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    expect(parseColor("rgb(255 0 0 / 50%)")).toEqual({ r: 255, g: 0, b: 0, a: 0.5 });
    expect(parseColor("rgba(0, 0, 255, 0.25)")).toEqual({ r: 0, g: 0, b: 255, a: 0.25 });
  });

  it("parses hsl() modern and legacy syntax", () => {
    expect(parseColor("hsl(0, 100%, 50%)")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    expect(parseColor("hsl(0 100% 50%)")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });

  it("parses hwb, oklch and named colors", () => {
    expect(parseColor("hwb(0 0% 0%)")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    expect(parseColor("oklch(0.6279 0.2577 29.234)")).not.toBeNull();
    expect(parseColor("white")).toEqual({ r: 255, g: 255, b: 255, a: 1 });
  });

  it("rejects non-colors", () => {
    expect(parseColor("transparent")).toBeNull();
    expect(parseColor("currentColor")).toBeNull();
    expect(parseColor("inherit")).toBeNull();
    expect(parseColor("garbage")).toBeNull();
    expect(parseColor("")).toBeNull();
  });
});

describe("toHex", () => {
  it("normalizes to lowercase #rrggbb", () => {
    expect(toHex(parseColor("#fff")!)).toBe("#ffffff");
    expect(toHex(parseColor("#FfF")!)).toBe("#ffffff");
  });
});

describe("toOklch", () => {
  it("converts known values", () => {
    expect(toOklch(parseColor("#ffffff")!)).toBe("oklch(1 0 0)");
    expect(toOklch(parseColor("#000000")!)).toBe("oklch(0 0 0)");
  });

  it("emits hue 0 for neutral colors (no noise hue)", () => {
    expect(toOklch(parseColor("#808080")!)).toMatch(/^oklch\(\d\.\d{4} 0 0\)$/);
  });

  it("emits alpha when < 1", () => {
    expect(toOklch(parseColor("#ff000080")!)).toMatch(/^oklch\(0\.\d+ 0\.\d+ \d+\.\d+ \/ 0\.502\)$/);
  });
});

describe("luminance / chroma / classification", () => {
  it("computes luminance", () => {
    expect(luminance(parseColor("#ffffff")!)).toBeGreaterThan(0.99);
    expect(luminance(parseColor("#000000")!)).toBeLessThan(0.01);
  });

  it("computes chroma", () => {
    expect(chroma(parseColor("#ff0000")!)).toBe(1);
    expect(chroma(parseColor("#ffffff")!)).toBe(0);
  });

  it("detects red-dominant and neutral colors", () => {
    expect(isRedDominant(parseColor("#ff0000")!)).toBe(true);
    expect(isRedDominant(parseColor("#00ff00")!)).toBe(false);
    expect(isNeutral(parseColor("#808080")!)).toBe(true);
    expect(isNeutral(parseColor("#ff0000")!)).toBe(false);
  });
});

describe("sizeToPx", () => {
  it("converts px, rem, clamp and calc", () => {
    expect(sizeToPx("16px")).toBe(16);
    expect(sizeToPx("0.75rem")).toBe(12);
    expect(sizeToPx("clamp(1rem, 2vw, 3rem)")).toBe(32);
    expect(sizeToPx("calc(16px + 4px)")).toBe(20);
    expect(sizeToPx("calc(2rem - 0.5rem)")).toBe(24);
  });

  it("rejects non-lengths", () => {
    expect(sizeToPx("auto")).toBeNull();
    expect(sizeToPx("50%")).toBeNull();
    expect(sizeToPx("1.5em")).toBeNull();
  });
});