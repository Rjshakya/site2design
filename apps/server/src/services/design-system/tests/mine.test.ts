import { describe, expect, it } from "vitest";
import { mineCss, type MinedDesign } from "../mine";
import {
  bigSample,
  borderShorthandCss,
  breakpointsCss,
  canonicalizationCss,
  darkSelectorCss,
  gradientCss,
  sampleCss,
} from "./sample-data";

const mine = (css: string): MinedDesign => mineCss([css]);

const colorOf = (m: MinedDesign, value: string) => m.colors.find((c) => c.value === value);

describe("mineCss — colors", () => {
  it("mines basic rule colors with kind, variant and usage", () => {
    const m = mine(`body { background: #ffffff; color: #0a0a0a; }`);

    expect(colorOf(m, "#ffffff")).toMatchObject({
      kind: "bg",
      variant: "page",
      dark: false,
      total: 1,
    });
    expect(colorOf(m, "#0a0a0a")).toMatchObject({ kind: "text", variant: "page" });
  });

  it("canonicalizes #fff / white / #FFF into one entry", () => {
    const m = mine(canonicalizationCss);

    expect(colorOf(m, "#ffffff")).toMatchObject({ total: 3 });
    expect(m.colors).toHaveLength(1);
  });

  it("aggregates usage counts across selectors", () => {
    const m = mine(`body { color: #0a0a0a; } .card { color: #0a0a0a; }`);

    const entry = colorOf(m, "#0a0a0a")!;
    expect(entry.total).toBe(2);
    expect(entry.usages).toHaveLength(2);
  });

  it("classifies button backgrounds as accents (primary candidates)", () => {
    const m = mine(`.btn { background: #2563eb; }`);

    expect(colorOf(m, "#2563eb")).toMatchObject({ kind: "accent" });
  });

  it("classifies focus outlines as ring", () => {
    const m = mine(`*:focus { outline: 2px solid #2563eb; }`);

    expect(colorOf(m, "#2563eb")).toMatchObject({ kind: "ring" });
  });

  it("skips unresolved var() references", () => {
    const m = mine(`body { background: var(--missing); }`);

    expect(m.colors).toHaveLength(0);
  });
});

describe("mineCss — custom properties", () => {
  it("resolves var() against :root definitions", () => {
    const m = mine(`:root { --bg: #fafafa; } body { background: var(--bg); }`);

    expect(colorOf(m, "#fafafa")).toMatchObject({ kind: "bg", total: 1 });
  });

  it("uses the fallback when a variable is undefined", () => {
    const m = mine(`body { background: var(--missing, #123456); }`);

    expect(colorOf(m, "#123456")).toBeDefined();
  });

  it("resolves nested variable references", () => {
    const m = mine(`:root { --a: #fafafa; --b: var(--a); } body { background: var(--b); }`);


    const color = colorOf(m, "#fafafa")
    expect(color?.kind).toBe("bg")

  });
});

describe("mineCss — dark mode", () => {
  it("produces dual light/dark entries from prefers-color-scheme overrides", () => {
    const m = mine(bigSample);

    console.log(m)
    expect(m.dark).toBe(true);
    expect(colorOf(m, "#ffffff")).toMatchObject({ dark: false });
    expect(colorOf(m, "#09090b")).toMatchObject({ kind: "bg", dark: true });
    expect(colorOf(m, "#3b82f6")).toMatchObject({ dark: true });
    expect(colorOf(m, "#27272a")).toMatchObject({ kind: "border", dark: true });
  });

  it("mines .dark selector scopes as dark-only entries", () => {
    const m = mine(darkSelectorCss);

    expect(m.dark).toBe(true);
    expect(colorOf(m, "#ffffff")).toMatchObject({ dark: false });
    expect(colorOf(m, "#111111")).toMatchObject({ kind: "bg", dark: true });
  });

  it("reports no dark mode when absent", () => {
    const m = mine(`body { background: #ffffff; }`);

    expect(m.dark).toBe(false);
    expect(m.colors.every((c) => !c.dark)).toBe(true);
  });
});

describe("mineCss — typography", () => {
  it("mines families with generic classification and @font-face metadata", () => {
    const m = mine(sampleCss);

    expect(m.fontFamilies).toHaveLength(1);
    const inter = m.fontFamilies[0];
    expect(inter.family).toBe("Inter");
    expect(inter.generic).toBe("sans");
    expect(inter.weights.has(700)).toBe(true);
    expect(inter.urls.has("https://example.com/inter.woff2")).toBe(true);
  });

  it("filters generic font keywords from families", () => {
    const m = mine(`body { font-family: "Inter", sans-serif; }`);

    expect(m.fontFamilies.map((f) => f.family)).toEqual(["Inter"]);
  });

  it("classifies type-scale roles and weights", () => {
    const m = mine(`body { font-size: 16px; }
h1 { font-size: 2rem; font-weight: 700; line-height: 1.2; }
.btn { font-size: 0.875rem; font-weight: 600; }`);

    const byRole = (role: string) => m.scale.find((e) => e.role === role)!;
    expect(byRole("body")).toMatchObject({ size: "16px", weight: 400 });
    expect(byRole("heading")).toMatchObject({ size: "2rem", weight: 700, line_height: "1.2" });
    expect(byRole("button")).toMatchObject({ size: "0.875rem", weight: 600 });
  });
});

describe("mineCss — spacing & radii", () => {
  it("clusters near-identical lengths within 1px", () => {
    const m = mine(`.card { padding: 16px; margin: 8px; border-radius: 8px; }
.other { padding: 16.5px; border-radius: 8.5px; }`);

    const pad16 = m.spacing.find((e) => e.px === 16)!;
    expect(pad16).toMatchObject({ value: "16px", count: 2 });
    expect(m.spacing.find((e) => e.px === 8)).toMatchObject({ count: 1 });

    const radius = m.radii.find((e) => e.px === 8)!;
    expect(radius).toMatchObject({ value: "8px", count: 2 });
  });
});

describe("mineCss — borders, shadows, gradients, breakpoints", () => {
  it("mines border shorthands as width/style/color triples", () => {
    const m = mine(borderShorthandCss);

    expect(m.borders).toEqual([
      { width: "1px", style: "solid", color: "#e5e5e5", count: 2 },
    ]);
    expect(colorOf(m, "#e5e5e5")).toMatchObject({ kind: "border", total: 2 });
  });

  it("collects box-shadow with blur magnitude", () => {
    const m = mine(`.card { box-shadow: 0 1px 3px rgba(0,0,0,0.1); }`);

    expect(m.shadows).toHaveLength(1);
    expect(m.shadows[0]).toMatchObject({ px: 1, count: 1 });
    expect(m.shadows[0].value).toContain("rgba(0,0,0,0.1)");
  });

  it("collects gradients verbatim without leaking colors", () => {
    const m = mine(gradientCss);

    expect(m.gradients).toHaveLength(1);
    expect(m.gradients[0].value).toMatch(/^linear-gradient\(/);
    expect(m.colors).toHaveLength(0);
  });

  it("names min-width breakpoints sm/md/lg/xl/2xl", () => {
    const m = mine(breakpointsCss);

    expect(m.breakpoints.map((b) => b.name)).toEqual(["md", "lg"]);
    expect(m.breakpoints[0].media).toBe("(min-width:768px)");
  });

  it("truncates colors to the top-N per kind", () => {
    const manyColors = Array.from(
      { length: 15 },
      (_, i) => `body { background: #${i.toString(16).padStart(2, "0")}0000; }`,
    ).join("");

    const m = mine(manyColors);
    expect(m.colors).toHaveLength(12);
  });
});
