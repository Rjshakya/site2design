import type { DesignSystem } from "../../schemas/design-system"
import { hexToHslCss } from "./colors"

export interface ExportedFiles {
  globalsCss: string
  tailwindConfig: string
  tokensJson: string
}

const COLOR_VARS = [
  "background",
  "foreground",
  "card",
  "cardForeground",
  "popover",
  "popoverForeground",
  "primary",
  "primaryForeground",
  "secondary",
  "secondaryForeground",
  "muted",
  "mutedForeground",
  "accent",
  "accentForeground",
  "destructive",
  "destructiveForeground",
  "border",
  "input",
  "ring",
] as const

function kebab(name: string): string {
  return name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)
}

function fontStack(families: readonly string[] | undefined, fallback: readonly string[]): string {
  const stack = (families && families.length > 0 ? families : fallback).filter(Boolean)
  return stack.map((f) => (f.includes(" ") ? `"${f}"` : f)).join(", ")
}

export function generateGlobalsCss(ds: DesignSystem): string {
  const lines: string[] = []
  for (const name of COLOR_VARS) {
    const hex = ds.colors[name]
    if (!hex) continue
    lines.push(`  --${kebab(name)}: ${hexToHslCss(hex)};`)
  }
  lines.push(`  --radius: ${ds.radius.md}px;`)
  lines.push(`  --font-sans: ${fontStack(ds.typography.fontSans, ["ui-sans-serif", "system-ui", "sans-serif"])};`)
  lines.push(`  --font-mono: ${fontStack(ds.typography.fontMono, ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"])};`)
  if (ds.typography.fontDisplay) {
    lines.push(`  --font-display: ${fontStack(ds.typography.fontDisplay, ["ui-sans-serif", "system-ui", "sans-serif"])};`)
  }
  return `:root {\n${lines.join("\n")}\n}\n`
}

function scaleObject(scale: Record<string, string>): string {
  const entries = Object.entries(scale).map(([step, hex]) => `      ${step}: "${hex}"`)
  return `{\n${entries.join(",\n")}\n    }`
}

export function generateTailwindConfig(ds: DesignSystem): string {
  const c = ds.colors
  const scaleEntries = Object.entries(c.scales)
    .map(([name, scale]) => `      ${name}: ${scaleObject(scale)}`)
    .join(",\n")
  const radius = ds.radius
  const shadows = ds.shadows
  const fontSize = Object.entries(ds.typography.scale)
    .map(([name, t]) => `      ${name}: ["${t.fontSize}px", { lineHeight: ${t.lineHeight} }]`)
    .join(",\n")
  const spacing = ds.spacing.map((v) => `      ${v}: "${v}px"`).join(",\n")
  const sans = JSON.stringify(ds.typography.fontSans)
  const mono = JSON.stringify(ds.typography.fontMono ?? ["ui-monospace", "monospace"])

  return `import type { Config } from "tailwindcss"

export default {
  theme: {
    extend: {
      colors: {
${scaleEntries}
      },
      borderRadius: {
        sm: "${radius.sm}px",
        md: "${radius.md}px",
        lg: "${radius.lg}px",
        xl: "${radius.xl}px",
        full: "9999px",
      },
      boxShadow: {
        sm: ${JSON.stringify(shadows.sm)},
        md: ${JSON.stringify(shadows.md)},
        lg: ${JSON.stringify(shadows.lg)},
        xl: ${JSON.stringify(shadows.xl)},
      },
      fontFamily: {
        sans: ${sans},
        mono: ${mono},
      },
      fontSize: {
${fontSize}
      },
      spacing: {
${spacing}
      },
    },
  },
} satisfies Config
`
}

export function generateTokensJson(ds: DesignSystem): string {
  return JSON.stringify(ds, null, 2)
}

export function generateExports(ds: DesignSystem): ExportedFiles {
  return {
    globalsCss: generateGlobalsCss(ds),
    tailwindConfig: generateTailwindConfig(ds),
    tokensJson: generateTokensJson(ds),
  }
}