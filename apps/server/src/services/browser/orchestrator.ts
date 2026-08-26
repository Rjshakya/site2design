import { collectFonts } from "./collect/fonts";
import { collectMediaQueries } from "./collect/media";
import { collectVariables } from "./collect/variables";
import { DEFAULT_VIEWPORT, openSession } from "./session";
import type { BrowserBinding } from "./session";
import type { BrowserServiceOptions, ComputedStyles } from "./types";

const sortVars = (vars: Record<string, string>): Record<string, string> =>
  Object.fromEntries(Object.entries(vars).sort(([a], [b]) => a.localeCompare(b)));

export async function getComputedStyles(
  binding: BrowserBinding,
  url: string,
  options: BrowserServiceOptions = {},
): Promise<ComputedStyles> {
  const session = await openSession(binding, url, options);
  try {
    const { page, cdp } = session;

    const mediaQueries = await collectMediaQueries(page, cdp);
    const light = sortVars(await collectVariables(page));
    const fonts = await collectFonts(page, cdp);

    let dark: Record<string, string> | undefined;
    if (mediaQueries.some((query) => query.hasDarkScheme)) {
      await page.emulateMedia({ colorScheme: "dark" });
      dark = sortVars(await collectVariables(page));
    }

    return {
      url: page.url(),
      title: await page.title(),
      viewport: options.viewport ?? DEFAULT_VIEWPORT,
      renderedTheme: dark ? "dark" : "light",
      customProperties: { light, ...(dark ? { dark } : {}) },
      fonts,
      mediaQueries,
    };
  } finally {
    await session.close();
  }
}