import type { CDPSession, Page } from "@cloudflare/playwright";
import type { MediaQuerySample } from "../types";

const DARK_RE = /prefers-color-scheme\s*:\s*dark/i;

const unitToPx = (value: number, unit: string | undefined): number => {
  if (!unit || unit === "px") return value;
  if (unit === "em" || unit === "rem") return value * 16;
  return value;
};

export const parseMediaText = (text: string): MediaQuerySample => {
  const min = /min-width\s*:\s*([\d.]+)\s*(px|em|rem)?/i.exec(text);
  const max = /max-width\s*:\s*([\d.]+)\s*(px|em|rem)?/i.exec(text);
  return {
    text,
    minWidth: min ? unitToPx(parseFloat(min[1]), min[2]) : undefined,
    maxWidth: max ? unitToPx(parseFloat(max[1]), max[2]) : undefined,
    hasDarkScheme: DARK_RE.test(text),
  };
};

const dedupe = (samples: MediaQuerySample[]): MediaQuerySample[] => {
  const seen = new Set<string>();
  return samples.filter((sample) => {
    if (seen.has(sample.text)) return false;
    seen.add(sample.text);
    return true;
  });
};

export async function collectMediaQueries(
  page: Page,
  cdp: CDPSession | null,
): Promise<MediaQuerySample[]> {
  if (cdp) {
    try {
      const { medias } = await cdp.send("CSS.getMediaQueries");
      const samples: MediaQuerySample[] = [];
      for (const media of medias) {
        const text = media.text?.trim();
        if (text) samples.push(parseMediaText(text));
      }
      if (samples.length > 0) return dedupe(samples);
    } catch {
      // fall back to CSSOM
    }
  }

  const texts = await page.evaluate(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    const walk = (rules: CSSRuleList) => {
      for (const rule of rules) {
        if (rule instanceof CSSMediaRule && rule.conditionText) {
          if (!seen.has(rule.conditionText)) {
            seen.add(rule.conditionText);
            out.push(rule.conditionText);
          }
        }
        if (rule instanceof CSSImportRule && rule.styleSheet) {
          walk(rule.styleSheet.cssRules);
        }
      }
    };
    for (const sheet of document.styleSheets) {
      try {
        walk(sheet.cssRules);
      } catch {
        // cross-origin stylesheets are opaque to CSSOM
      }
    }
    return out;
  });

  return texts.map(parseMediaText);
}