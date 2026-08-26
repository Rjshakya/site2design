import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { parseColor, toOklch } from "../../../lib/color";
import { mineCss } from "../mine";
import { assignRoles, buildShadcn, mapDesignSystem } from "../map";
import { DesignSystemSchema } from "../tokens";
import { fakeExtractOutput, sampleCss } from "./sample-data";

const oklchOf = (hex: string) => toOklch(parseColor(hex)!);

describe("assignRoles", () => {
  it("maps kinds to public roles", () => {
    const m = mineCss([`body { background: #ffffff; }
.card { background: #f4f4f5; }
.btn { background: #2563eb; }
.btn:hover { background: #1d4ed8; }`]);

    const colors = assignRoles(m);
    const roleOf = (value: string) => colors.find((c) => c.value === value)!.role;

    expect(roleOf("#ffffff")).toBe("background");
    expect(roleOf("#f4f4f5")).toBe("surface");
    expect(roleOf("#2563eb")).toBe("primary");
    expect(roleOf("#1d4ed8")).toBe("accent");
  });
});

describe("buildShadcn — slot fitting (sampleCss)", () => {
  const mined = mineCss([sampleCss]);
  const shadcn = buildShadcn(mined);

  it("fits light surfaces, text and accents", () => {
    expect(shadcn.light.background).toBe(oklchOf("#ffffff"));
    expect(shadcn.light.foreground).toBe(oklchOf("#0a0a0a"));
    expect(shadcn.light.primary).toBe(oklchOf("#2563eb"));
    expect(shadcn.light.card).toBe(oklchOf("#f4f4f5"));
    expect(shadcn.light.border).toBe(oklchOf("#e4e4e7"));
  });

  it("falls ring back to primary and normalizes radius to rem", () => {
    expect(shadcn.light.ring).toBe(shadcn.light.primary);
    expect(shadcn.light.radius).toBe("0.5rem");
  });

  it("fits the dark set from mined dark entries", () => {
    expect(shadcn.dark.background).toBe(oklchOf("#09090b"));
    expect(shadcn.dark.primary).toBe(oklchOf("#3b82f6"));
    expect(shadcn.dark.border).toBe(oklchOf("#27272a"));
    expect(shadcn.dark.ring).toBe(shadcn.dark.primary);
  });

  it("buckets fonts into sans/serif/mono", () => {
    expect(shadcn.fonts.sans).toContain("Inter");
    expect(shadcn.fonts.serif).toEqual([]);
    expect(shadcn.fonts.mono).toEqual([]);
  });

  it("emits a paste-ready CSS block", () => {
    expect(shadcn.css).toContain(":root {");
    expect(shadcn.css).toContain(".dark {");
    expect(shadcn.css).toContain("--primary:");
    expect(shadcn.css).toContain("--radius:");
    expect(shadcn.css).toContain("--chart-1:");
  });
});

describe("buildShadcn — edge cases", () => {
  it("duplicates light into dark when the site has no dark mode", () => {
    const mined = mineCss([`body { background: #ffffff; color: #0a0a0a; }`]);
    const shadcn = buildShadcn(mined);

    expect(shadcn.dark).toEqual(shadcn.light);
  });

  it("picks hue-diverse chart colors", () => {
    const mined = mineCss([`.a { background: #ff0000; }
.b { background: #ffff00; }
.c { background: #00ff00; }
.d { background: #00ffff; }
.e { background: #0000ff; }`]);
    const shadcn = buildShadcn(mined);

    expect(shadcn.light.chart).toHaveLength(5);
    expect(shadcn.light.chart[0]).toBe(oklchOf("#ff0000"));
  });

  it("falls back to shadcn defaults when nothing is mined", () => {
    const shadcn = buildShadcn(mineCss([`body { margin: 8px; }`]));

    expect(shadcn.light.background).toBe("oklch(1 0 0)");
    expect(shadcn.light.primary).toBe("oklch(0.205 0 0)");
    expect(shadcn.light.radius).toBe("0.625rem");
  });
});

describe("mapDesignSystem", () => {
  it("produces a schema-valid DesignSystem", () => {
    const mined = mineCss([sampleCss]);
    const design = mapDesignSystem(fakeExtractOutput, mined);

    const outcome = Effect.runSync(
      Schema.decodeUnknownEffect(DesignSystemSchema)(design).pipe(
        Effect.match({
          onSuccess: (value) => ({ ok: true as const, value }),
          onFailure: (e) => ({ ok: false as const, error: String(e) }),
        }),
      ),
    );

    expect(outcome.ok).toBe(true);
    if (outcome.ok) {
      expect(outcome.value.page_url).toBe("https://example.com");
      expect(outcome.value.colors.length).toBeGreaterThan(0);
      expect(outcome.value.shadcn.light.primary).toBe(oklchOf("#2563eb"));
    }
  });
});