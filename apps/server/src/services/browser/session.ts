import { launch } from "@cloudflare/playwright";
import type { CDPSession, Page } from "@cloudflare/playwright";
import type { BrowserServiceOptions } from "./types";

export type BrowserBinding = { fetch: typeof fetch };

export interface BrowserSession {
  page: Page;
  cdp: CDPSession | null;
  close: () => Promise<void>;
}

export const DEFAULT_VIEWPORT = { width: 1440, height: 900 };
const DEFAULT_KEEP_ALIVE_MS = 120_000;
const DEFAULT_TIMEOUT_MS = 45_000;

export async function openSession(
  binding: BrowserBinding,
  url: string,
  options: BrowserServiceOptions = {},
): Promise<BrowserSession> {
  const browser = await launch(binding, {
    keep_alive: options.keepAliveMs ?? DEFAULT_KEEP_ALIVE_MS,
  });

  try {
    const context = await browser.newContext({
      viewport: options.viewport ?? DEFAULT_VIEWPORT,
      userAgent: options.userAgent,
    });
    const page = await context.newPage();
    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    });
    await page.evaluate(() => document.fonts.ready);

    let cdp: CDPSession | null = null;
    try {
      cdp = await context.newCDPSession(page);
    } catch {
      cdp = null;
    }

    return {
      page,
      cdp,
      close: () => browser.close(),
    };
  } catch (error) {
    await browser.close();
    throw error;
  }
}