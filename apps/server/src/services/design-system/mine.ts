import { generate, parse, walk } from "css-tree";
import type { Atrule, Block, CssNode, Declaration, Rule } from "css-tree";
import { parseColor, sizeToPx, toHex } from "../../lib/color";

/**
 * ============================================================================
 *  CSS mining: raw CSS -> structured design tokens
 * ============================================================================
 *
 * Pipeline position:  extract()  ->  mineCss()  ->  mapDesignSystem()
 *   (render page)      (raw CSS)      (this file)     (roles + shadcn)
 *
 * Linear flow (each step is a top-level function, run in order by mineCss):
 *
 *   CSS strings
 *     │
 *     ├─ 1. parseStylesheets()      CSS text -> css-tree ASTs (broken sheets skipped)
 *     ├─ 2. collectCustomProperties()  --var definitions -> light/dark scope maps
 *     ├─ 3. mineRules()             walk every rule: resolve vars, classify,
 *     │                             dispatch declarations into raw accumulators
 *     ├─ 4. attachFontFaces()       merge @font-face weights/urls into families
 *     └─ 5. finalize()              rank by usage, truncate to top-N -> MinedDesign
 *
 * Why two collection walks (steps 2 + 3)?
 *   CSS custom properties may be referenced before they are defined, and dark
 *   mode typically *redefines variables* rather than restyling every selector.
 *   So step 2 first gathers every `--x` into scope maps; step 3 then resolves
 *   `var(--x)` against those maps while mining.
 *
 * Dark-mode tracking
 *   A declaration is "dark" if it lives inside
 *     - an `@media (prefers-color-scheme: dark)` block, or
 *     - a rule whose selector matches `.dark` / `html.dark` / `[data-theme=dark]`
 *   `walkDark()` encapsulates this: a depth counter (incremented on enter,
 *   decremented on leave) tracks the enclosing dark scope while descending.
 *
 * Dual light/dark resolution
 *   Dark-mode sites usually override *variables* in `:root` while consuming
 *   rules (`body { background: var(--bg) }`) stay in light scope. When dark
 *   overrides exist, step 3 resolves every color declaration twice (light map
 *   + dark map) so both themes are mined from a single rule.
 *
 * The output is intentionally lossy-but-rankable: near-identical values are
 * clustered (8px vs 8.5px, `#fff` vs `white`) and each category is truncated
 * to its top-N most-used entries so map.ts works with signal, not noise.
 *
 * css-tree AST primer (the node types this file walks)
 * ------------------------------------------------------
 * `parse(cssText)` turns CSS into an AST. Here's how the node types map onto
 * real CSS, annotated with the fields this file reads:
 *
 *   @media (prefers-color-scheme: dark) {   <- Atrule (media)
 *     :root { --bg: #09090b; }              <- Rule; Declaration (custom prop)
 *     body { background: var(--bg); }       <- Rule; value = Function (var)
 *     .btn {
 *       color: #fff;                        <- Declaration: property "color",
 *       border: 1px solid #e5e5e5;          <-   value subtree = Dimension +
 *     }                                     <-   Identifier + Hash
 *   }
 *
 *   StyleSheet    the root; children are Rules / Atrules
 *   Rule          selector + block:   rule.prelude  (SelectorList; generate()
 *                 renders it to ".btn" text), rule.block (declarations)
 *   Atrule        @-rule:             at.name ("media" / "font-face" / ...),
 *                 at.prelude (query text), at.block (body)
 *   Declaration   one property:value pair:   decl.property, decl.value
 *   Value / Raw   the right-hand side of a declaration (generate() -> text)
 *   Hash          hex color literal `#fff`   (css-tree v3 node name; older
 *                 docs call it HexColor)
 *   Function      function in a value:       node.name ("var", "rgb",
 *                 "linear-gradient", ...)
 *   Identifier    bare identifier:           "white", "solid", "Inter"
 *   Dimension     number + unit:             "16px" (used by sizeToPx)
 *
 * Traversal uses `walk(ast, { visit: "Declaration" | "Rule" | ..., enter })`
 * and `generate(node)` renders any node back to its CSS text.
 * ============================================================================
 */

// ─── Mined types ─────────────────────────────────────────────────────────────

/** Where a surface/background color appears on the page (from selector context). */
export type Variant = "page" | "header" | "footer" | "card" | "sidebar" | "popover";

/**
 * Coarse semantic bucket assigned at mine time (refined into final roles by map.ts):
 * - `bg`     — background of a page region (body/html/header/footer/card/...)
 * - `text`   — foreground/text color
 * - `border` — border/outline color
 * - `accent` — color used on buttons/links (primary-candidate)
 * - `ring`   — focus/outline color
 * - `other`  — anything else (fills, strokes, ...)
 */
export type ColorKind = "bg" | "text" | "border" | "accent" | "ring" | "other";

/** One usage site of a color: the selector + property pair it appeared in. */
export type ColorUsage = { selector: string; property: string; count: number };

/**
 * A distinct color value (canonicalized to `#rrggbb`) with all the places it
 * was used. `usages` is keyed by `selector|property` so the same selector
 * can carry multiple properties (e.g. background-color + color).
 */
export type MinedColor = {
  kind: ColorKind;
  variant: Variant | null;
  value: string;
  source: string;
  dark: boolean;
  usages: Map<string, ColorUsage>;
  total: number;
};

/** A distinct font family with the weights/urls observed for it. */
export type MinedFontFamily = {
  family: string;
  generic: "sans" | "serif" | "mono";
  count: number;
  weights: Set<number>;
  urls: Set<string>;
};

/** One clustered type-scale step (role + size cluster, representative style). */
export type MinedScaleEntry = {
  role: "display" | "heading" | "body" | "caption" | "button";
  family: string;
  size: string;
  px: number | null;
  weight: number;
  line_height: string | null;
  letter_spacing: string | null;
  count: number;
};

/** A clustered length value (spacing or radius), `px` used for clustering. */
export type MinedSizeEntry = {
  value: string;
  px: number | null;
  count: number;
};

/** A distinct box-shadow, `px` = its blur magnitude (for sm/md/lg ranking). */
export type MinedShadowEntry = {
  value: string;
  px: number;
  count: number;
};

/** A distinct border (width/style/color triple). */
export type MinedBorderEntry = {
  width: string;
  style: string;
  color: string;
  count: number;
};

/** A distinct gradient value (full `linear-gradient(...)` etc. text). */
export type MinedGradientEntry = {
  value: string;
  count: number;
};

/** A responsive breakpoint: named (`sm`/`md`/`lg`/`xl`/`2xl`/custom) + media text. */
export type MinedBreakpoint = {
  name: string;
  media: string;
  count: number;
};

/**
 * The full mined result — the intermediate representation between raw CSS
 * and the final `DesignSystem` (map.ts). Every array is usage-ranked and
 * truncated to a top-N per category.
 */
export type MinedDesign = {
  /** Whether any dark-mode scope was found in the stylesheets. */
  dark: boolean;
  colors: MinedColor[];
  fontFamilies: MinedFontFamily[];
  scale: MinedScaleEntry[];
  spacing: MinedSizeEntry[];
  radii: MinedSizeEntry[];
  shadows: MinedShadowEntry[];
  borders: MinedBorderEntry[];
  gradients: MinedGradientEntry[];
  breakpoints: MinedBreakpoint[];
};

// ─── Internal pipeline types ────────────────────────────────────────────────

/** Resolved custom-property maps, keyed by `--name`, per color scope. */
type ScopeProps = { light: Map<string, string>; dark: Map<string, string> };

/** Raw accumulators filled by step 3, consumed by steps 4-5. */
type RawMined = {
  darkFound: boolean;
  colors: Map<string, MinedColor>;
  families: Map<string, MinedFontFamily>;
  fontFaces: Map<string, { urls: Set<string>; weights: Set<number> }>;
  scale: MinedScaleEntry[];
  spacing: MinedSizeEntry[];
  radii: MinedSizeEntry[];
  shadows: MinedShadowEntry[];
  borders: MinedBorderEntry[];
  gradients: MinedGradientEntry[];
  breakpoints: MinedBreakpoint[];
};

/** Typography context of one rule, read before the declarations that use it. */
type RuleContext = {
  family: string;
  weight: number;
  lineHeight: string | null;
  letterSpacing: string | null;
};

/** Callbacks invoked by `walkDark` for each rule/at-rule, with scope flag. */
type WalkVisitors = {
  onRule: (rule: Rule, selector: string, dark: boolean) => void;
  onAtrule?: (at: Atrule, dark: boolean) => void;
};

// ─── CSS fetching ────────────────────────────────────────────────────────────

const USER_AGENT = "Mozilla/5.0 (compatible; Site2Design/0.1)";

/** Matches `@import url(...)` / `@import "..."` / `@import '...'` statements. */
const IMPORT_RE = /@import\s+(?:url\(\s*["']?([^"')]+)["']?\s*\)|["']([^"']+)["'])/g;

/** Pull the referenced URLs out of a stylesheet's `@import` statements. */
function extractImports(text: string): string[] {
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = IMPORT_RE.exec(text)) !== null) {
    out.push(m[1] ?? m[2]);
  }
  return out;
}

/**
 * Download external stylesheets so they can be mined alongside `inline_styles`.
 *
 * Guards (each failure is silently ignored — a broken stylesheet must never
 * fail the whole design-system build):
 * - at most 10 source URLs, 8 fetched files in total
 * - `@import` chains followed up to depth 2
 * - per-file size cap of 2 MB
 */
export async function fetchCss(urls: readonly string[]): Promise<string[]> {
  const out: string[] = [];
  const seen = new Set<string>();

  const fetchOne = async (url: string, depth: number): Promise<void> => {
    if (depth > 2 || seen.has(url) || out.length >= 8) return;
    seen.add(url);
    try {
      const res = await fetch(url, { headers: { "user-agent": USER_AGENT } });
      if (!res.ok) return;
      const text = await res.text();
      if (!text || text.length > 2_000_000) return;
      out.push(text);
      // resolve @import targets relative to the sheet that declared them
      for (const imp of extractImports(text)) {
        const abs = new URL(imp, url).href;
        await fetchOne(abs, depth + 1);
      }
    } catch {
      // ignore unreachable css
    }
  };

  for (const u of urls.slice(0, 10)) {
    await fetchOne(u, 0);
  }
  return out;
}

// ─── Selector / property classification ─────────────────────────────────────

/**
 * Selector markers for dark scope: `.dark`, `html.dark` (with boundary guards
 * so `not-dark` doesn't match) and `[data-theme="dark"]`.
 */
const darkSelectorRe = /(^|[>+~,\s])(\.dark|html\.dark)\b|\[data-theme\s*=\s*["']?dark["']?\]/;

/** True when an `@media` at-rule targets `prefers-color-scheme: dark`. */
function isDarkMedia(at: Atrule): boolean {
  return (
    at.name === "media" &&
    !!at.prelude &&
    generate(at.prelude).toLowerCase().includes("prefers-color-scheme") &&
    generate(at.prelude).toLowerCase().includes("dark")
  );
}

/**
 * Map a selector to a page region (`variant`), so surfaces can be slotted
 * into shadcn roles (background/card/sidebar/popover) by context later.
 * Returns null when the selector doesn't clearly belong to a region.
 */
function classifyVariant(selector: string): Variant | null {
  const s = selector.toLowerCase();
  if (/\b(html|body)\b/.test(s)) return "page";
  if (/\bheader\b|\.header\b/.test(s)) return "header";
  if (/\bfooter\b|\.footer\b/.test(s)) return "footer";
  if (/(\.card|\.panel|\.sheet|\.dialog|\.modal)\b/.test(s)) return "card";
  if (/\b(nav|aside|sidebar)\b|\.sidebar\b/.test(s)) return "sidebar";
  if (/(\.popover|\.dropdown|\.tooltip|\.menu)\b/.test(s)) return "popover";
  return null;
}

/** True when a selector styles buttons/CTAs (primary-color candidates). */
function isButtonish(selector: string): boolean {
  return /(^|[\s>+~,.])(button|\.btn|\.cta|\.button)\b|:[a-z-]*button/.test(selector);
}

/** True when a selector styles links (accent-color candidates). */
function isLinkish(selector: string): boolean {
  return /(^|[\s>+~,.])(a|\.link|\.nav-link)\b|:link|:visited|:hover/.test(selector);
}

/**
 * Decide the mined `kind` of a color from the declaration property and its
 * selector. Heuristics:
 * - button/link contexts on background or color  -> accent (primary candidate)
 * - `:focus` outlines                             -> ring
 * - backgrounds on page regions                   -> bg
 * - color on other selectors                      -> text
 * - border/outline colors                         -> border
 */
function kindFor(prop: string, selector: string): ColorKind {
  const p = prop.toLowerCase();
  if (p.startsWith("background")) {
    if (isButtonish(selector)) return "accent";
    return "bg";
  }
  if (p === "color") {
    if (isButtonish(selector) || isLinkish(selector)) return "accent";
    return "text";
  }
  if (p.startsWith("border") || p.startsWith("outline")) {
    if (p.startsWith("outline") && selector.includes(":focus")) return "ring";
    return "border";
  }
  return "other";
}

const WEIGHT_KEYWORDS: Record<string, number> = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

/** Normalize `font-weight` values (numbers + keywords) to 100..900. */
function fontWeightToNumber(text: string): number | null {
  const t = text.trim().toLowerCase();
  const n = parseInt(t, 10);
  if (!Number.isNaN(n) && n >= 100 && n <= 900) return n;
  if (t in WEIGHT_KEYWORDS) return WEIGHT_KEYWORDS[t];
  if (t === "bolder") return 700;
  if (t === "lighter") return 300;
  return null;
}

/** Tailwind-style names for common `min-width` breakpoints. */
const BREAKPOINT_NAMES: Record<number, string> = {
  640: "sm",
  768: "md",
  1024: "lg",
  1280: "xl",
  1536: "2xl",
};

/** Name a breakpoint from its media text (`sm`/`md`/.../`bp-<px>`/`max-<px>`). */
function breakpointName(media: string): string {
  const min = media.match(/min-width\s*:\s*(\d+(?:\.\d+)?)px/);
  if (min) {
    const px = parseFloat(min[1]);
    return BREAKPOINT_NAMES[px] ?? `bp-${px}`;
  }
  const max = media.match(/max-width\s*:\s*(\d+(?:\.\d+)?)px/);
  if (max) return `max-${parseFloat(max[1])}`;
  return "custom";
}

/** Split a font-family stack into individual family names (quotes stripped). */
function splitFamilies(text: string): string[] {
  return text
    .split(",")
    .map((f) => f.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

/**
 * Heuristic family classification for the shadcn font buckets. Exact generic
 * keywords (`serif`, `sans-serif`, `monospace`) are authoritative; otherwise
 * the family name's own words decide (e.g. "JetBrains Mono" -> mono).
 */
function genericOf(family: string): "sans" | "serif" | "mono" {
  const f = family.toLowerCase();
  if (/^(mono|monospace)$/.test(f)) return "mono";
  if (/^serif$/.test(f)) return "serif";
  if (/^(sans|sans-serif)$/.test(f)) return "sans";
  if (/mono|monospace/.test(f)) return "mono";
  if (/serif/.test(f)) return "serif";
  return "sans";
}

/** CSS generic font keywords — pure fallbacks, filtered out of mined families. */
const GENERIC_FONT_KEYWORDS = new Set([
  "sans-serif",
  "sans",
  "serif",
  "monospace",
  "mono",
  "system-ui",
  "ui-sans-serif",
  "ui-serif",
  "ui-monospace",
  "cursive",
  "fantasy",
  "emoji",
  "math",
  "fangsong",
  "inherit",
]);

// ─── Mining primitives ──────────────────────────────────────────────────────

/**
 * Replace every `var(--name, fallback)` in a value with the resolved
 * custom-property value (or its fallback). Resolution loops up to 5 times
 * because a variable's value may itself reference other variables.
 * Unresolvable vars are left as-is (and will be skipped downstream).
 */
function resolveVars(text: string, props: ScopeProps, dark: boolean): string {
  const map = props[dark ? "dark" : "light"];
  let out = text;
  for (let i = 0; i < 5; i++) {
    const next = out.replace(
      /var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*))?\)/g,
      (m, name: string, fallback: string | undefined) => {
        const v = map.get(name);
        if (v !== undefined) return v;
        if (fallback !== undefined) return fallback.trim();
        return m;
      },
    );
    if (next === out) break;
    out = next;
  }
  return out;
}

/**
 * Walk a value AST and return every color literal it contains, in original
 * syntax (`#fff`, `hsl(...)`, `red`, ...). Node types:
 * - `Hash`      — hex colors (#rgb/#rrggbb/...)
 * - `Function`  — rgb/hsl/hwb/oklch/... color functions
 * - `Identifier`— named colors (validated via parseColor)
 * The value is parsed with css-tree's `value` context so gradients,
 * mixed units etc. are handled structurally rather than via regex.
 */
function extractColorsFromText(text: string): string[] {
  let ast: CssNode;
  try {
    ast = parse(text, { context: "value" });
  } catch {
    return [];
  }
  const out: string[] = [];
  walk(ast, {
    enter(node: CssNode) {
      if (node.type === "Hash") out.push(`#${node.value}`);
      else if (node.type === "Function") {
        if (["rgb", "rgba", "hsl", "hsla", "hwb", "oklch", "oklab", "lab", "lch"].includes(node.name)) {
          out.push(generate(node));
        }
      } else if (node.type === "Identifier" && parseColor(node.name) !== null) {
        out.push(node.name);
      }
    },
  });
  return out;
}

/**
 * Record one color occurrence. Colors are keyed by their canonical hex, so
 * every subsequent occurrence just increments the usage counters. The
 * first-seen variant/kind/dark win for a given value.
 */
function addColor(
  raw: string,
  source: string,
  kind: ColorKind,
  selector: string,
  prop: string,
  dark: boolean,
  variant: Variant | null,
  mined: RawMined,
): void {
  const parsed = parseColor(raw);
  if (!parsed) return;
  const value = toHex(parsed);
  let e = mined.colors.get(value);
  if (!e) {
    e = { kind, variant, value, source, dark, usages: new Map(), total: 0 };
    mined.colors.set(value, e);
  }
  e.total++;
  const ukey = `${selector}|${prop}`;
  const u = e.usages.get(ukey) ?? { selector, property: prop, count: 0 };
  u.count++;
  e.usages.set(ukey, u);
}

/**
 * Cluster a length value into an existing entry within ±1px tolerance.
 * Near-identical values (8px vs 8.5px) collapse; the representative
 * `value` text stays the first-seen one.
 */
function addSize(entries: MinedSizeEntry[], value: string, px: number | null): void {
  const e = entries.find((x) => (x.px ?? -1) !== -1 && px !== null && Math.abs(x.px! - px) <= 1);
  if (e) {
    e.count++;
    if (e.count === 1) e.value = value;
  } else {
    entries.push({ value, px, count: 1 });
  }
}

/** Count a font-family stack occurrence; every named family is counted. */
function addFamily(text: string, count: number, mined: RawMined): void {
  for (const name of splitFamilies(text)) {
    const generic = genericOf(name);
    const key = name.toLowerCase();
    let f = mined.families.get(key);
    if (!f) {
      f = { family: name, generic, count: 0, weights: new Set(), urls: new Set() };
      mined.families.set(key, f);
    }
    f.count += count;
    // prefer a more specific classification once known (sans is the default)
    f.generic = f.generic === "sans" ? generic : f.generic;
  }
}

/**
 * Cluster a type-scale step by (role, ±1px size). The representative
 * family/weight/line-height/letter-spacing come from the most-used member
 * of the cluster.
 */
function addScaleEntry(
  role: MinedScaleEntry["role"],
  family: string,
  sizeText: string,
  weight: number,
  lineHeight: string | null,
  letterSpacing: string | null,
  mined: RawMined,
): void {
  const px = sizeToPx(sizeText);
  if (px === null) return;
  const e = mined.scale.find((x) => x.role === role && x.px !== null && Math.abs(x.px - px) <= 1);
  if (e) {
    e.count++;
    if (e.count === 1) {
      e.size = sizeText;
      e.family = family;
      e.weight = weight;
      e.line_height = lineHeight;
      e.letter_spacing = letterSpacing;
    }
  } else {
    mined.scale.push({
      role,
      family,
      size: sizeText,
      px,
      weight,
      line_height: lineHeight,
      letter_spacing: letterSpacing,
      count: 1,
    });
  }
}

/** Classify a selector into the type-scale role it styles. */
function scaleRole(selector: string): MinedScaleEntry["role"] {
  const s = selector.toLowerCase();
  if (/(\.display|\.hero|\.title|\.heading|\.headline)\b/.test(s)) return "display";
  if (/\bh[1-6]\b/.test(s)) return "heading";
  if (/(\.btn|button)\b/.test(s)) return "button";
  if (/(\.caption|\.small|\.text-(xs|sm))\b/.test(s)) return "caption";
  return "body";
}

/** Properties handled purely as context (custom props + typography). */
function isContextProperty(prop: string): boolean {
  return (
    prop.startsWith("--") ||
    prop === "font-family" ||
    prop === "font-weight" ||
    prop === "line-height" ||
    prop === "letter-spacing"
  );
}

/** Properties whose value can contain colors worth mining. */
function isColorProperty(prop: string): boolean {
  return (
    prop.startsWith("background") ||
    prop === "color" ||
    prop.startsWith("border") ||
    prop.startsWith("outline")
  );
}

/** Properties that contribute to the spacing scale. */
function isSpacingProperty(prop: string): boolean {
  return (
    prop.startsWith("margin") ||
    prop.startsWith("padding") ||
    prop === "gap" ||
    prop === "row-gap" ||
    prop === "column-gap"
  );
}

/** Top-N cuts per color kind (kept at finalize). */
const KIND_LIMITS: Record<ColorKind, number> = {
  bg: 12,
  text: 8,
  border: 6,
  accent: 8,
  ring: 4,
  other: 6,
};

// ─── Walker: dark-scope tracking ────────────────────────────────────────────

/**
 * Walk a stylesheet AST, invoking the visitors with the dark-scope flag.
 * A depth counter (incremented on enter, decremented on leave) tracks the
 * enclosing dark scope while the walker descends:
 *   - `@media (prefers-color-scheme: dark)`          -> +1 depth
 *   - rules matching `.dark` / `[data-theme="dark"]`  -> +1 depth
 * Rules are not descended into by the walker itself — visitors walk the
 * rule blocks they need (via `mineRule`/`readRuleContext`).
 */
function walkDark(ast: CssNode, visitors: WalkVisitors): void {
  let depth = 0;
  walk(ast, {
    enter(node: CssNode) {
      if (node.type === "Atrule") {
        // at.name / at.prelude / at.block
        if (isDarkMedia(node)) depth++;
        if (visitors.onAtrule) visitors.onAtrule(node, depth > 0);
        // font-face is handled by the visitor; skip its declarations
        if (node.name === "font-face") return false;
        return;
      }
      if (node.type === "Rule") {
        // rule.prelude -> selector text; rule.block -> declarations
        const selector = generate(node.prelude);
        if (darkSelectorRe.test(selector)) depth++;
        const dark = depth > 0;
        visitors.onRule(node, selector, dark);
        return false;
      }
    },
    leave(node: CssNode) {
      if (node.type === "Atrule" && isDarkMedia(node)) depth--;
      if (node.type === "Rule") {
        const selector = generate(node.prelude);
        if (darkSelectorRe.test(selector)) depth--;
      }
    },
  });
}

// ─── Rule mining ────────────────────────────────────────────────────────────

/**
 * Mine one rule. Two sequential sub-passes over its declarations:
 *
 *  pass A — `readRuleContext`: custom properties (fed to the scope maps) and
 *           the rule's typography context (family, weight, line-height,
 *           letter-spacing). Read first because pass B needs them.
 *
 *  pass B — mine the remaining declarations in order via `dispatchDeclaration`.
 *           Colors are resolved against the light map AND (when dark
 *           overrides exist) the dark map, so a light-scope rule like
 *           `body { background: var(--bg) }` yields both a light entry and
 *           a dark entry.
 */
function mineRule(rule: Rule, selector: string, dark: boolean, props: ScopeProps, mined: RawMined): void {
  const variant = classifyVariant(selector);

  // pass A — context declarations first
  const ctx = readRuleContext(rule.block, dark, props, mined);

  // pass B — mine the remaining declarations in order
  walk(rule.block, {
    visit: "Declaration",
    enter(decl: Declaration) {
      const prop = decl.property.toLowerCase();
      if (isContextProperty(prop)) return;
      const raw = generate(decl.value);

      if (dark) {
        // rule inside an explicit dark scope -> dark entries only
        dispatchDeclaration({ decl, resolved: resolveVars(raw, props, true), isDark: true, selector, variant, ctx, mined });
        return;
      }

      // light entries first
      dispatchDeclaration({ decl, resolved: resolveVars(raw, props, false), isDark: false, selector, variant, ctx, mined });
      // then dark entries, when the site redefines variables for dark mode
      if (props.dark.size > 0) {
        dispatchDeclaration({ decl, resolved: resolveVars(raw, props, true), isDark: true, selector, variant, ctx, mined });
      }
    },
  });
}

/** Read the context declarations of a rule: `--vars` + typography context. */
function readRuleContext(block: Block, dark: boolean, props: ScopeProps, mined: RawMined): RuleContext {
  const ctx: RuleContext = { family: "", weight: 400, lineHeight: null, letterSpacing: null };

  walk(block, {
    visit: "Declaration",
    enter(decl: Declaration) {
      const prop = decl.property.toLowerCase();
      const raw = generate(decl.value);

      if (prop.startsWith("--")) {
        props[dark ? "dark" : "light"].set(prop, resolveVars(raw, props, dark));
        return;
      }
      if (prop === "font-family") {
        ctx.family = splitFamilies(raw)[0] ?? "";
        addFamily(raw, 1, mined);
      } else if (prop === "font-weight") {
        ctx.weight = fontWeightToNumber(raw) ?? 400;
      } else if (prop === "line-height") {
        ctx.lineHeight = raw.trim();
      } else if (prop === "letter-spacing") {
        ctx.letterSpacing = raw.trim();
      }
    },
  });

  return ctx;
}

/**
 * Dispatch one resolved declaration to the right accumulator, in a fixed
 * order (most specific first). The dark pass extracts colors only —
 * typography/spacing rarely differ per theme.
 */
function dispatchDeclaration(input: {
  decl: Declaration;
  resolved: string;
  isDark: boolean;
  selector: string;
  variant: Variant | null;
  ctx: RuleContext;
  mined: RawMined;
}): void {
  const { decl, resolved, isDark, selector, variant, ctx, mined } = input;
  const prop = decl.property.toLowerCase();

  if (isDark) {
    if (isColorProperty(prop)) {
      const kind = kindFor(prop, selector);
      for (const c of extractColorsFromText(resolved)) {
        addColor(c, resolved.trim(), kind, selector, prop, true, variant, mined);
      }
    }
    return;
  }

  // 1. type scale
  if (prop === "font-size") {
    addScaleEntry(scaleRole(selector), ctx.family, resolved.trim(), ctx.weight, ctx.lineHeight, ctx.letterSpacing, mined);
    return;
  }
  // 2. spacing scale (margins / paddings / gaps)
  if (isSpacingProperty(prop)) {
    for (const part of resolved.split(/\s+/)) {
      addSize(mined.spacing, part, sizeToPx(part));
    }
    return;
  }
  // 3. radii
  if (prop === "border-radius") {
    for (const part of resolved.split(/\s+/)) {
      addSize(mined.radii, part, sizeToPx(part));
    }
    return;
  }
  // 4. shadows
  if (prop === "box-shadow" && resolved !== "none") {
    const blur = resolved.match(/[\d.]+px/)?.[0];
    mined.shadows.push({ value: resolved.trim(), px: blur ? sizeToPx(blur) ?? 0 : 0, count: 1 });
    return;
  }
  // 5. gradients
  if (prop.startsWith("background") && resolved.includes("gradient(")) {
    const g = mined.gradients.find((x) => x.value === resolved.trim());
    if (g) g.count++;
    else mined.gradients.push({ value: resolved.trim(), count: 1 });
    return;
  }
  // 6. border shorthand `border: 1px solid #eee` -> width/style/color triple,
  //    and its color also feeds the border-color pool
  if (prop === "border" || /^border-(top|bottom|left|right)$/.test(prop)) {
    const parts = resolved.trim().split(/\s+/);
    if (parts.length >= 3) {
      const [w, st, co] = parts;
      const e = mined.borders.find((b) => b.width === w && b.style === st && b.color === co);
      if (e) e.count++;
      else mined.borders.push({ width: w, style: st, color: co, count: 1 });
      for (const c of extractColorsFromText(co)) {
        addColor(c, resolved.trim(), "border", selector, prop, false, variant, mined);
      }
    }
    return;
  }
  // 7. plain colors (backgrounds, text, borders, outlines)
  if (isColorProperty(prop)) {
    const kind = kindFor(prop, selector);
    for (const c of extractColorsFromText(resolved)) {
      addColor(c, resolved.trim(), kind, selector, prop, false, variant, mined);
    }
  }
}

// ─── At-rule mining ─────────────────────────────────────────────────────────

/**
 * Extract `@font-face` metadata (family -> file urls + weights). Merged
 * into families by step 4 (attachFontFaces).
 */
function mineFontFace(at: Atrule, mined: RawMined): void {
  if (!at.block) return;
  let family = "";
  const urls = new Set<string>();
  const weights = new Set<number>();
  walk(at.block, {
    visit: "Declaration",
    enter(decl: Declaration) {
      const prop = decl.property.toLowerCase();
      const raw = generate(decl.value);
      if (prop === "font-family") family = splitFamilies(raw)[0] ?? "";
      else if (prop === "src") {
        for (const m of raw.matchAll(/url\(([^)]+)\)/g)) urls.add(m[1].replace(/^["']|["']$/g, ""));
      } else if (prop === "font-weight") {
        const w = fontWeightToNumber(raw);
        if (w !== null) weights.add(w);
      }
    },
  });
  if (family) {
    const e = mined.fontFaces.get(family.toLowerCase()) ?? { urls: new Set(), weights: new Set() };
    for (const u of urls) e.urls.add(u);
    for (const w of weights) e.weights.add(w);
    mined.fontFaces.set(family.toLowerCase(), e);
  }
}

/** Record a `@media` breakpoint: name the query and count the rules inside. */
function mineBreakpoint(at: Atrule, mined: RawMined): void {
  if (!at.block || !at.prelude) return;
  const media = generate(at.prelude);
  let count = 0;
  walk(at.block, { enter(r: CssNode) { if (r.type === "Rule") count++; } });
  const existing = mined.breakpoints.find((b) => b.media === media);
  if (existing) existing.count += count;
  else mined.breakpoints.push({ name: breakpointName(media), media, count });
}

// ─── Pipeline steps ─────────────────────────────────────────────────────────

/** Step 1 — parse every stylesheet into an AST; broken sheets are skipped. */
function parseStylesheets(texts: readonly string[]): CssNode[] {
  const asts: CssNode[] = [];
  for (const text of texts) {
    if (!text) continue;
    try {
      asts.push(parse(text));
    } catch {
      // skip broken stylesheet
    }
  }
  return asts;
}

/**
 * Step 2 — collect every `--*` custom property into per-scope maps
 * (last definition wins). Needed before step 3 can resolve `var()`.
 */
function collectCustomProperties(asts: CssNode[]): { props: ScopeProps; darkFound: boolean } {
  const props: ScopeProps = { light: new Map(), dark: new Map() };
  let darkFound = false;

  for (const ast of asts) {
    walkDark(ast, {
      onRule(rule, _selector, dark) {
        if (dark) darkFound = true;
        walk(rule.block, {
          visit: "Declaration",
          enter(decl: Declaration) {
            if (decl.property.startsWith("--")) {
              props[dark ? "dark" : "light"].set(decl.property, generate(decl.value));
            }
          },
        });
      },
    });
  }

  return { props, darkFound };
}

/**
 * Step 3 — walk every rule once and mine it: resolve `var()` against the
 * scope maps, classify colors, and dispatch declarations into the raw
 * accumulators. Also mines `@font-face` and `@media` at-rules.
 */
function mineRules(asts: CssNode[], props: ScopeProps): RawMined {
  const mined: RawMined = {
    darkFound: false,
    colors: new Map(),
    families: new Map(),
    fontFaces: new Map(),
    scale: [],
    spacing: [],
    radii: [],
    shadows: [],
    borders: [],
    gradients: [],
    breakpoints: [],
  };

  for (const ast of asts) {
    walkDark(ast, {
      onRule(rule, selector, dark) {
        if (dark) mined.darkFound = true;
        mineRule(rule, selector, dark, props, mined);
      },
      onAtrule(at) {
        if (at.name === "font-face") mineFontFace(at, mined);
        else if (at.name === "media") mineBreakpoint(at, mined);
      },
    });
  }

  return mined;
}

/** Step 4 — merge @font-face weights/urls into the matching families. */
function attachFontFaces(mined: RawMined): void {
  for (const f of mined.families.values()) {
    const face = mined.fontFaces.get(f.family.toLowerCase());
    if (!face) continue;
    for (const u of face.urls) f.urls.add(u);
    for (const w of face.weights) f.weights.add(w);
  }
}

/**
 * Step 5 — rank every category by usage count and truncate to its top-N,
 * so map.ts works with the most representative tokens instead of the
 * long tail.
 */
function finalize(mined: RawMined): MinedDesign {
  const top = <T,>(entries: T[], n: number, by: (e: T) => number): T[] =>
    [...entries].sort((a, b) => by(b) - by(a)).slice(0, n);

  const colors = [...mined.colors.values()].filter((c) => c.total > 0);
  const byKind = (kind: ColorKind) => top(colors.filter((c) => c.kind === kind), KIND_LIMITS[kind], (c) => c.total);

  return {
    dark: mined.darkFound,
    colors: [
      ...byKind("bg"),
      ...byKind("text"),
      ...byKind("border"),
      ...byKind("accent"),
      ...byKind("ring"),
      ...byKind("other"),
    ],
    fontFamilies: top(
      [...mined.families.values()].filter((f) => !GENERIC_FONT_KEYWORDS.has(f.family.toLowerCase())),
      6,
      (f) => f.count,
    ),
    scale: top(mined.scale, 12, (e) => e.count),
    spacing: top(mined.spacing, 10, (e) => e.count),
    radii: top(mined.radii, 6, (e) => e.count),
    shadows: top(mined.shadows, 6, (e) => e.count),
    borders: top(mined.borders, 8, (e) => e.count),
    gradients: top(mined.gradients, 4, (e) => e.count),
    breakpoints: top(mined.breakpoints, 10, (b) => b.count),
  };
}

// ─── Entry point ────────────────────────────────────────────────────────────

/**
 * Mine raw CSS text into a structured, usage-ranked `MinedDesign`.
 *
 * Sequential pipeline (see module header for details):
 *
 *   1. parseStylesheets()         CSS text -> ASTs
 *   2. collectCustomProperties()  --var definitions -> light/dark scope maps
 *   3. mineRules()                walk rules: resolve vars, classify, dispatch
 *   4. attachFontFaces()          merge @font-face metadata into families
 *   5. finalize()                 rank + top-N per category -> MinedDesign
 */
export function mineCss(texts: readonly string[]): MinedDesign {
  // step 1 — parse every stylesheet into an AST (broken sheets are skipped)
  const asts = parseStylesheets(texts);

  // step 2 — collect --var definitions per scope (needed for var() resolution)
  const { props, darkFound } = collectCustomProperties(asts);

  // step 3 — walk every rule once: resolve vars, classify, dispatch
  const mined = mineRules(asts, props);
  mined.darkFound ||= darkFound;

  // step 4 — merge @font-face weights/urls into their families
  attachFontFaces(mined);

  // step 5 — rank by usage and truncate each category to its top-N
  return finalize(mined);
}
