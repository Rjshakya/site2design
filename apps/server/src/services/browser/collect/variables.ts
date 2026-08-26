import type { Page } from "@cloudflare/playwright";

export const collectVariables = (page: Page): Promise<Record<string, string>> =>
  page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    const vars: Record<string, string> = {};
    for (let i = 0; i < styles.length; i++) {
      const name = styles.item(i);
      if (!name || !name.startsWith("--")) continue;
      const value = styles.getPropertyValue(name).trim();
      if (value) vars[name] = value;
    }
    return vars;
  });