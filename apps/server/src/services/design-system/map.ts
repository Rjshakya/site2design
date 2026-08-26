/**
 * ============================================================================
 *  Design-system mapping: MinedDesign -> DesignSystem (roles + shadcn)
 * ============================================================================
 *
 * Two jobs:
 *  1. `assignRoles`  — turn mined kinds (bg/text/border/accent/...) into the
 *     public role/variant vocabulary of `designSystem.colors`.
 *  2. `buildShadcn`  — project the mined tokens onto the shadcn slot set:
 *     surfaces are ranked by usage and slot-fit (background <- most used,
 *     card/popover <- next lighter surfaces, sidebar <- nav surface), accents
 *     from button/link contexts become primary/accent, border colors feed
 *     border/input, focus outlines feed ring, red-dominant colors become
 *     destructive, saturated hue-spread colors become chart-1..5, and the
 *     dominant radius becomes `--radius`. All values are emitted as oklch.
 *
 * Every shadcn slot falls back to the standard shadcn/ui defaults when the
 * site provides no signal, so the output is always a usable theme.
 * ============================================================================
 */

import { chroma, isRedDominant, normalizeOklch, parseColor, toOklch } from "../../lib/color";
import type { ExtractOutput } from "../extractor/type";
import type { MinedDesign, MinedColor } from "./mine";
import {
  SHADCN_DEFAULTS,
  SHADCN_SLOT_KEYS,
  type ColorRole,
  type DesignSystem,
  type ShadowRole,
  type ShadcnColorSet,
  type SpacingRole,
  type TypeScaleRole,
} from "./tokens";

/** ShadcnColorSet is readonly (Schema.Type); helpers build mutable copies. */
type Mutable<T> = { -readonly [K in keyof T]: T[K] };

// ─── helpers ────────────────────────────────────────────────────────────────

/** Normalize any mined color to a canonical oklch string for the shadcn block. */
function entryValue(color: string): string {
  const normalized = normalizeOklch(color);
  if (normalized) return normalized;
  const parsed = parseColor(color);
  return parsed ? toOklch(parsed) : color;
}

/** Pick a foreground with contrast for the given background luminance. */
function contrastForeground(bgLuminance: number): string {
  return bgLuminance > 0.55 ? SHADCN_DEFAULTS.light.foreground : SHADCN_DEFAULTS.dark.foreground;
}

/** Hue (0-360) of a color, or null for neutrals — used for chart hue buckets. */
function hueOf(color: string): number | null {
  const parsed = parseColor(color);
  if (!parsed) return null;
  const { r, g, b } = parsed;
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  const d = max - min;
  if (d === 0) return null;
  let h = 0;
  if (max === r / 255) h = ((g / 255 - b / 255) / d) % 6;
  else if (max === g / 255) h = (b / 255 - r / 255) / d + 2;
  else h = (r / 255 - g / 255) / d + 4;
  h *= 60;
  return h < 0 ? h + 360 : h;
}

const light = <T,>(entries: T[], dark: boolean, getDark: (e: T) => boolean): T[] =>
  entries.filter((e) => getDark(e) === dark);

const byTotal = (a: MinedColor, b: MinedColor) => b.total - a.total;

// ─── role assignment ────────────────────────────────────────────────────────

/**
 * Assign public roles to mined colors.
 * - bg on card/sidebar/popover variants -> `surface`; other backgrounds -> `background`
 * - text/border/other map 1:1
 * - the top light accent becomes `primary`; the rest stay `accent`
 * `dark` is preserved per entry so the base array covers both themes.
 */
export function assignRoles(mined: MinedDesign): DesignSystem["colors"] {
  const sorted = [...mined.colors].sort(byTotal);
  const primary = sorted.find((c) => c.kind === "accent" && !c.dark);

  return sorted.map((c) => {
    let role: ColorRole;
    switch (c.kind) {
      case "bg":
        role = c.variant === "card" || c.variant === "sidebar" || c.variant === "popover" ? "surface" : "background";
        break;
      case "text":
        role = "text";
        break;
      case "border":
        role = "border";
        break;
      case "accent":
        role = primary && c.value === primary.value && c.dark === primary.dark ? "primary" : "accent";
        break;
      default:
        role = "other";
    }
    return {
      role,
      variant: c.variant,
      value: c.value,
      source: c.source,
      dark: c.dark,
      usage: [...c.usages.values()],
    };
  });
}

// ─── shadcn projection ──────────────────────────────────────────────────────

/**
 * Surface slot-fitting (background/card/popover/sidebar + secondary/muted).
 * Surfaces are ranked by usage; the top page-region background becomes
 * `--background`, the next non-sidebar surfaces fill `--card`/`--popover`,
 * a sidebar-variant surface (if any) fills the sidebar slots, and remaining
 * surfaces become `--secondary`/`--muted`/`--accent` backgrounds.
 */
function pickSurfaces(bg: MinedColor[], darkMode: boolean): Mutable<ShadcnColorSet> {
  const defaults = darkMode ? SHADCN_DEFAULTS.dark : SHADCN_DEFAULTS.light;
  const base: Mutable<ShadcnColorSet> = { ...defaults };

  const sorted = [...bg].sort(byTotal);
  const pageBg = sorted.find((c) => c.variant === "page" || c.variant === "header" || c.variant === null) ?? sorted[0];
  const others = sorted.filter((c) => c !== pageBg);
  const card = others.find((c) => c.value !== pageBg?.value && c.variant !== "sidebar");
  const popover = others.find((c) => c !== card && c.value !== pageBg?.value && c.variant !== "sidebar");
  const sidebar = sorted.find((c) => c.variant === "sidebar");

  if (pageBg) base.background = entryValue(pageBg.value);
  if (card) base.card = entryValue(card.value);
  if (popover) base.popover = entryValue(popover.value);
  if (sidebar) {
    base.sidebar = entryValue(sidebar.value);
    base.sidebarBorder = entryValue(sidebar.value);
  }

  const secondary = others.find((c) => c !== card && c !== popover && c.variant !== "sidebar");
  const muted = others.find((c) => c !== card && c !== popover && c !== secondary && c.variant !== "sidebar");
  if (secondary) base.secondary = entryValue(secondary.value);
  if (muted) base.muted = entryValue(muted.value);
  if (!base.accent || base.accent === base.background) {
    base.accent = base.muted === base.background ? base.secondary : base.muted;
  }

  return base;
}

function pickTextColors(texts: MinedColor[], bg: ShadcnColorSet, darkMode: boolean): Mutable<ShadcnColorSet> {
  const out: Mutable<ShadcnColorSet> = { ...bg };
  const defaults = darkMode ? SHADCN_DEFAULTS.dark : SHADCN_DEFAULTS.light;

  const sorted = [...texts].sort(byTotal);
  const pageText = sorted.find((c) => c.variant === "page" || c.variant === null) ?? sorted[0];
  if (pageText) {
    out.foreground = entryValue(pageText.value);
    out.cardForeground = entryValue(pageText.value);
    out.popoverForeground = entryValue(pageText.value);
  }

  const bgLum = parseColor(bg.background) ? luminanceOf(bg.background) : 0.5;
  const fallbackFg = contrastForeground(bgLum);
  const defaultFg = defaults.foreground;
  for (const key of [
    "cardForeground",
    "popoverForeground",
    "primaryForeground",
    "secondaryForeground",
    "mutedForeground",
    "accentForeground",
    "sidebarForeground",
    "sidebarPrimaryForeground",
    "sidebarAccentForeground",
  ] as const) {
    if (out[key] === defaultFg || out[key] === bg.background) {
      out[key] = fallbackFg;
    }
  }
  if (out.foreground === bg.background) out.foreground = fallbackFg;
  if (out.sidebarForeground === bg.sidebar) out.sidebarForeground = fallbackFg;

  return out;
}

function luminanceOf(color: string): number {
  const parsed = parseColor(color);
  if (!parsed) return 0.5;
  const { r, g, b } = parsed;
  const srgbToLinear = (n: number) => {
    const c = n / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return (
    0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b)
  );
}

function pickAccents(accents: MinedColor[], primary: ShadcnColorSet, defaults: ShadcnColorSet): Mutable<ShadcnColorSet> {
  const out: Mutable<ShadcnColorSet> = { ...primary };
  const sorted = [...accents].sort(byTotal);
  const top = sorted[0];
  const second = sorted[1];
  if (top) {
    out.primary = entryValue(top.value);
    if (out.primary === out.background) out.primary = defaults.primary;
  }
  if (second) out.accent = entryValue(second.value);
  if (out.ring === defaults.ring || out.ring === out.background) out.ring = out.primary;
  return out;
}

function pickCharts(colors: MinedColor[], defaults: ShadcnColorSet): Mutable<ShadcnColorSet> {
  const out: Mutable<ShadcnColorSet> = { ...defaults };
  const candidates = [...colors]
    .filter((c) => {
      const parsed = parseColor(c.value);
      return parsed && chroma(parsed) > 0.08;
    })
    .sort((a, b) => chroma(parseColor(b.value)!) - chroma(parseColor(a.value)!));

  const used = new Set<string>();
  const charts: string[] = [];
  for (const c of candidates) {
    if (charts.length >= 5) break;
    const hue = hueOf(c.value);
    const bucket = hue === null ? "neutral" : String(Math.round(hue / 60));
    if (used.has(bucket)) continue;
    used.add(bucket);
    charts.push(entryValue(c.value));
  }
  if (charts.length > 0) out.chart = charts;
  return out;
}

function pickSemantics(colors: MinedColor[], set: ShadcnColorSet, defaults: ShadcnColorSet): Mutable<ShadcnColorSet> {
  const out: Mutable<ShadcnColorSet> = { ...set };
  const destructive = colors.find((c) => isRedDominant(parseColor(c.value)!));
  if (destructive) out.destructive = entryValue(destructive.value);
  const border = [...colors].filter((c) => c.kind === "border").sort(byTotal)[0];
  if (border) {
    out.border = entryValue(border.value);
    out.input = entryValue(border.value);
    out.sidebarBorder = entryValue(border.value);
  }
  return out;
}

function radiusToRem(value: string): string | null {
  const px = value.match(/^([\d.]+)px$/);
  if (px) {
    const rem = parseFloat(px[1]) / 16;
    return `${Math.round(rem * 1000) / 1000}rem`;
  }
  if (value.endsWith("rem")) return value;
  return null;
}

/**
 * Build one full shadcn color set (light or dark) by layering the mined
 * signals in priority order — each step only fills slots the previous one
 * left at defaults:
 *   1. surfaces  -> background/card/popover/sidebar/secondary/muted
 *   2. texts     -> foreground + the *-foreground slots (with contrast guard)
 *   3. accents   -> primary/accent (+ ring falls back to primary)
 *   4. saturated colors -> chart-1..5 (hue-bucketed)
 *   5. semantics -> destructive (red-dominant), border/input
 *   6. focus outlines -> ring; dominant radius -> --radius (rem-normalized)
 *   7. sidebar-* variant slots mirror the base slots
 */
function buildSet(mined: MinedDesign, darkMode: boolean, colors: MinedColor[]): ShadcnColorSet {
  const defaults = darkMode ? SHADCN_DEFAULTS.dark : SHADCN_DEFAULTS.light;
  const mine = colors.filter((c) => c.dark === darkMode);

  let set = pickSurfaces(mine.filter((c) => c.kind === "bg"), darkMode);
  set = pickTextColors(mine.filter((c) => c.kind === "text"), set, darkMode);
  set = pickAccents(mine.filter((c) => c.kind === "accent"), set, defaults);
  set = pickCharts(mine, set);
  set = pickSemantics(mine, set, defaults);

  const ring = [...mine].filter((c) => c.kind === "ring").sort(byTotal)[0];
  if (ring) set.ring = entryValue(ring.value);

  const radius = mined.radii[0];
  if (radius) {
    const rem = radiusToRem(radius.value);
    if (rem) set.radius = rem;
  }

  for (const key of [
    "sidebarPrimary",
    "sidebarPrimaryForeground",
    "sidebarAccent",
    "sidebarAccentForeground",
    "sidebarRing",
  ] as const) {
    if (key === "sidebarPrimary") set.sidebarPrimary = set.primary;
    else if (key === "sidebarPrimaryForeground") set.sidebarPrimaryForeground = set.primaryForeground;
    else if (key === "sidebarAccent") set.sidebarAccent = set.accent;
    else if (key === "sidebarAccentForeground") set.sidebarAccentForeground = set.accentForeground;
    else if (key === "sidebarRing") set.sidebarRing = set.ring;
  }

  return set;
}

/** Emit the paste-ready `:root { ... } .dark { ... }` CSS block (oklch values). */
function buildCss(light: ShadcnColorSet, dark: ShadcnColorSet): string {
  const block = (set: ShadcnColorSet) => {
    const lines: string[] = [];
    for (const key of SHADCN_SLOT_KEYS) {
      const cssKey = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
      lines.push(`  --${cssKey}: ${set[key]};`);
    }
    lines.push(`  --radius: ${set.radius};`);
    set.chart.forEach((c, i) => lines.push(`  --chart-${i + 1}: ${c};`));
    return lines.join("\n");
  };
  return `:root {\n${block(light)}\n}\n\n.dark {\n${block(dark)}\n}`;
}

/**
 * Assemble the full shadcn projection: a light set, a dark set (mined dark
 * entries, or a copy of light when the site has no dark mode) and the
 * font buckets for sans/serif/mono, plus the paste-ready CSS block.
 */
export function buildShadcn(mined: MinedDesign): DesignSystem["shadcn"] {
  const light = buildSet(mined, false, mined.colors);
  const dark = mined.dark ? buildSet(mined, true, mined.colors) : { ...light };

  // font buckets: top 3 families per generic class (generic keywords already
  // filtered out by the miner)
  const sans = mined.fontFamilies.filter((f) => f.generic === "sans").map((f) => f.family);
  const serif = mined.fontFamilies.filter((f) => f.generic === "serif").map((f) => f.family);
  const mono = mined.fontFamilies.filter((f) => f.generic === "mono").map((f) => f.family);

  return {
    light,
    dark,
    fonts: {
      sans: sans.slice(0, 3),
      serif: serif.slice(0, 3),
      mono: mono.slice(0, 3),
    },
    css: buildCss(light, dark),
  };
}

// ─── full mapping ───────────────────────────────────────────────────────────

/** px -> xs/sm/md/lg/xl spacing role (16px base: <8 / <16 / <32 / <64 / >=64). */
const spacingRole = (px: number | null): SpacingRole => {
  if (px === null) return "other";
  if (px < 8) return "xs";
  if (px < 16) return "sm";
  if (px < 32) return "md";
  if (px < 64) return "lg";
  return "xl";
};

/** Shadow blur magnitude -> sm/md/lg role. */
const shadowRole = (px: number): ShadowRole => {
  if (px < 8) return "sm";
  if (px <= 24) return "md";
  if (px > 24) return "lg";
  return "other";
};

/**
 * Compose the final `DesignSystem`: site info + page_url/title/description/
 * og_image from the extractor output, mined categories with assigned roles,
 * the shadcn projection, and the raw materials kept for re-derivation.
 */
export function mapDesignSystem(output: ExtractOutput, mined: MinedDesign): DesignSystem {
  return {
    page_url: output.page_url,
    title: output.title,
    description: output.description,
    og_image: output.og_image,
    colors: assignRoles(mined),
    typography: {
      font_families: mined.fontFamilies.map((f) => ({
        family: f.family,
        weights: [...f.weights].sort((a, b) => a - b),
        urls: [...f.urls],
      })),
      scale: mined.scale.map((e) => ({
        role: e.role,
        family: e.family,
        size: e.size,
        weight: e.weight,
        line_height: e.line_height,
        letter_spacing: e.letter_spacing,
        usage: e.count,
      })),
    },
    spacing: mined.spacing.map((e) => ({ value: e.value, role: spacingRole(e.px), usage: e.count })),
    radii: mined.radii.map((e) => ({ value: e.value, usage: e.count })),
    shadows: mined.shadows.map((e) => ({ value: e.value, role: shadowRole(e.px), usage: e.count })),
    borders: mined.borders.map((e) => ({ width: e.width, style: e.style, color: e.color, usage: e.count })),
    gradients: mined.gradients.map((e) => ({ value: e.value, usage: e.count })),
    breakpoints: mined.breakpoints.map((e) => ({ name: e.name, media: e.media, usage: e.count })),
    shadcn: buildShadcn(mined),
    raw: {
      csslinks: output.csslinks,
      inline_styles: output.inline_styles,
      fonturls: output.fonturls,
      brand_assets: output.brand_assets,
    },
  };
}
