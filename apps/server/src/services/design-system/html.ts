export interface BrandAssets {
  favicon?: string;
  logo?: string;
  ogImage?: string;
}

export interface SiteMeta {
  title?: string;
  description?: string;
}

function absolutize(href: string, base: string): string {
  try {
    return new URL(href, base).href;
  } catch {
    return href;
  }
}

function firstMatch(html: string, pattern: RegExp): string | null {
  const m = pattern.exec(html);
  return m?.[1]?.trim() ?? null;
}

const FAVICON_RE = /<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi;
const OG_IMAGE_RE = /<meta[^>]+(?:property=["']og:image["']|name=["']twitter:image["'])[^>]*>/gi;
const HEADER_LOGO_RE = /<header[^>]*>[\s\S]{0,3000}?<img[^>]+src=["']([^"']+)["']/i;
const FIRST_LOGO_RE =
  /<img[^>]+src=["']([^"']+)["'][^>]*(?:alt=["'][^"']*(?:logo|brand)[^"']*["'])?/i;

function extractAttr(
  html: string,
  tagRe: RegExp,
  attr: "href" | "content" | "src",
  predicate?: (tag: string) => boolean,
): string | null {
  const tags = html.matchAll(tagRe);
  for (const match of tags) {
    const tag = match[0];
    if (predicate && !predicate(tag)) continue;
    const attrRe = new RegExp(`${attr}=["']([^"']+)["']`, "i");
    const m = attrRe.exec(tag);
    if (m) return m[1];
  }
  return null;
}

export function extractAssets(
  row: {
    url?: string;
    favicon?: string;
    logo?: string;
    ogImage?: string;
    og_image?: string;
    html?: string;
  },
  pageUrl: string,
): BrandAssets {
  const html = row.html ?? "";
  const base = row.url ?? pageUrl;
  const favicon =
    row.favicon ?? extractAttr(html, FAVICON_RE, "href") ?? absolutize("/favicon.ico", base);
  const ogImage = row.ogImage ?? row.og_image ?? extractAttr(html, OG_IMAGE_RE, "content");
  const logo =
    row.logo ??
    extractAttr(html, HEADER_LOGO_RE, "src") ??
    firstMatch(html, FIRST_LOGO_RE) ??
    undefined;
  return {
    favicon: favicon ? absolutize(favicon, base) : undefined,
    logo: logo ? absolutize(logo, base) : undefined,
    ogImage: ogImage ? absolutize(ogImage, base) : undefined,
  };
}

export function extractSiteMeta(row: {
  title?: string;
  description?: string;
  html?: string;
}): SiteMeta {
  const html = row.html ?? "";
  const title =
    row.title ??
    firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i)
      ?.replace(/\s+/g, " ")
      .trim() ??
    undefined;
  const description =
    row.description ??
    firstMatch(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) ??
    undefined;
  return { title, description };
}

export function extractInlineCss(html: string): string[] {
  const blocks: string[] = [];
  const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    if (m[1].trim()) blocks.push(m[1]);
  }
  return blocks;
}
