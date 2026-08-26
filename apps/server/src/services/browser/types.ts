export interface ComputedStyles {
  url: string;
  title: string;
  viewport: { width: number; height: number };
  renderedTheme: "light" | "dark";
  customProperties: {
    light: Record<string, string>;
    dark?: Record<string, string>;
  };
  fonts: FontSample[];
  mediaQueries: MediaQuerySample[];
}

export interface FontSample {
  family: string;
  weights: string[];
  styles: string[];
  url?: string;
}

export interface MediaQuerySample {
  text: string;
  minWidth?: number;
  maxWidth?: number;
  hasDarkScheme: boolean;
}

export interface BrowserServiceOptions {
  viewport?: { width: number; height: number };
  userAgent?: string;
  keepAliveMs?: number;
  timeoutMs?: number;
}