import type { CDPSession, Page } from "@cloudflare/playwright";
import type { FontSample } from "../types";

const FONT_FACE_RE = /@font-face\s*\{([^{}]*)\}/g;
const URL_RE = /url\(\s*(["']?)(.*?)\1\s*\)/i;
const FAMILY_RE = /font-family\s*:\s*(["']?)(.*?)\1\s*;?/i;
const WEIGHT_RE = /font-weight\s*:\s*([^;]+);?/i;
const STYLE_RE = /font-style\s*:\s*([^;]+);?/i;
const SRC_RE = /src\s*:\s*([^;]+);?/i;

interface FontFaceDecl {
  family: string;
  weight: string;
  style: string;
  url: string | null;
}

const stripQuotes = (value: string): string => value.trim().replace(/^["']|["']$/g, "");

const normalizeWeight = (weight: string): string => {
  const trimmed = weight.trim().toLowerCase();
  if (trimmed === "normal") return "400";
  if (trimmed === "bold") return "700";
  return trimmed;
};

const parseFontFaceBlocks = (cssText: string): FontFaceDecl[] => {
  const faces: FontFaceDecl[] = [];
  for (const match of cssText.matchAll(FONT_FACE_RE)) {
    const block = match[1];
    const family = FAMILY_RE.exec(block)?.[2];
    if (!family) continue;
    const src = SRC_RE.exec(block)?.[1];
    const url = src ? URL_RE.exec(src)?.[2] ?? null : null;
    faces.push({
      family: stripQuotes(family),
      weight: WEIGHT_RE.exec(block)?.[1] ?? "400",
      style: STYLE_RE.exec(block)?.[1] ?? "normal",
      url,
    });
  }
  return faces;
};

const collectLoadedFonts = (page: Page) =>
  page.evaluate(() => {
    const faces: { family: string; weight: string; style: string }[] = [];
    for (const font of document.fonts) {
      faces.push({ family: font.family, weight: font.weight, style: font.style });
    }
    return faces;
  });

const collectFontFacesViaCdp = async (cdp: CDPSession): Promise<FontFaceDecl[]> => {
  const sheetIds: string[] = [];
  const onSheetAdded = (payload: { header: { styleSheetId: string } }) => {
    sheetIds.push(payload.header.styleSheetId);
  };
  cdp.on("CSS.styleSheetAdded", onSheetAdded);
  try {
    await cdp.send("CSS.enable");
    const texts = await Promise.all(
      sheetIds.slice(0, 512).map(async (styleSheetId) => {
        try {
          const { text } = await cdp.send("CSS.getStyleSheetText", { styleSheetId });
          return text;
        } catch {
          return null;
        }
      }),
    );
    return texts.flatMap((text) => (text ? parseFontFaceBlocks(text) : []));
  } finally {
    cdp.off("CSS.styleSheetAdded", onSheetAdded);
  }
};

const collectFontFacesViaCssom = (page: Page) =>
  page.evaluate(() => {
    const faces: { family: string; weight: string; style: string; url: string | null }[] = [];
    for (const sheet of document.styleSheets) {
      let rules: CSSRuleList;
      try {
        rules = sheet.cssRules;
      } catch {
        continue;
      }
      for (const rule of rules) {
        if (!(rule instanceof CSSFontFaceRule)) continue;
        const style = rule.style;
        const src = style.getPropertyValue("src");
        const url = /url\(\s*(["']?)(.*?)\1\s*\)/i.exec(src)?.[2] ?? null;
        faces.push({
          family: style.getPropertyValue("font-family"),
          weight: style.getPropertyValue("font-weight"),
          style: style.getPropertyValue("font-style"),
          url,
        });
      }
    }
    return faces;
  });

export async function collectFonts(
  page: Page,
  cdp: CDPSession | null,
): Promise<FontSample[]> {
  const [loaded, faces] = await Promise.all([
    collectLoadedFonts(page),
    cdp ? collectFontFacesViaCdp(cdp) : collectFontFacesViaCssom(page),
  ]);

  const byFamily = new Map<string, FontSample>();
  const upsert = (family: string, weight: string, style: string, url?: string) => {
    const clean = stripQuotes(family);
    if (!clean) return;
    let sample = byFamily.get(clean);
    if (!sample) {
      sample = { family: clean, weights: [], styles: [] };
      byFamily.set(clean, sample);
    }
    const normalized = normalizeWeight(weight);
    if (normalized && !sample.weights.includes(normalized)) sample.weights.push(normalized);
    const trimmedStyle = style.trim();
    if (trimmedStyle && trimmedStyle !== "normal" && !sample.styles.includes(trimmedStyle)) {
      sample.styles.push(trimmedStyle);
    }
    if (url && !sample.url) sample.url = url;
  };

  for (const font of loaded) upsert(font.family, font.weight, font.style);
  for (const face of faces) upsert(face.family, face.weight, face.style, face.url ?? undefined);

  return [...byFamily.values()].sort((a, b) => a.family.localeCompare(b.family));
}