import { adjustLightness, contrast, deltaE, hexToRgb, isGrayscale, labToRgb, luminance, mixHex, rgbToHex, rgbToHsl, rgbToLab, tonalRamp, type Lab, type Rgb } from "./colors"

export interface Cluster {
  hex: string
  rgb: Rgb
  lab: Lab
  count: number
  roles: string[]
}

export function clusterColors(samples: { hex: string; count: number; roles: string[] }[], threshold = 10): Cluster[] {
  const sorted = [...samples].sort((a, b) => b.count - a.count)
  const clusters: Cluster[] = []
  for (const sample of sorted) {
    const rgb = hexToRgb(sample.hex)
    if (!rgb) continue
    const lab = rgbToLab(rgb)
    let matched: Cluster | null = null
    for (const cluster of clusters) {
      if (deltaE(lab, cluster.lab) < threshold) {
        matched = cluster
        break
      }
    }
    if (matched) {
      const total = matched.count + sample.count
      const t = sample.count / total
      matched.lab = {
        l: matched.lab.l + (lab.l - matched.lab.l) * t,
        a: matched.lab.a + (lab.a - matched.lab.a) * t,
        b: matched.lab.b + (lab.b - matched.lab.b) * t,
      }
      matched.count = total
      for (const r of sample.roles) if (!matched.roles.includes(r)) matched.roles.push(r)
    } else {
      clusters.push({ hex: sample.hex, rgb, lab, count: sample.count, roles: [...sample.roles] })
    }
  }
  for (const cluster of clusters) {
    const rgb = labToRgb(cluster.lab)
    cluster.rgb = { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) }
    cluster.hex = rgbToHex(cluster.rgb)
  }
  return clusters.sort((a, b) => b.count - a.count)
}

export interface RoleColors {
  background: string
  foreground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  border: string
  input: string
  ring: string
  destructive: string
  destructiveForeground: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  scales: Record<string, Record<string, string>>
}

const FALLBACK_BACKGROUND = "#ffffff"
const FALLBACK_FOREGROUND = "#09090b"
const FALLBACK_PRIMARY = "#18181b"
const FALLBACK_BORDER = "#e4e4e7"
const FALLBACK_DESTRUCTIVE = "#dc2626"

function pickFirst(clusters: Cluster[], predicate: (c: Cluster) => boolean): string | undefined {
  return clusters.find(predicate)?.hex
}

export function inferRoles(clusters: Cluster[]): RoleColors {
  const sorted = [...clusters].sort((a, b) => b.count - a.count)
  const grays = sorted.filter((c) => isGrayscale(c.rgb))
  const chroma = sorted.filter((c) => !isGrayscale(c.rgb))

  const background =
    pickFirst(sorted, (c) => c.roles.includes("background") && luminance(c.rgb) > 0.5) ??
    pickFirst(sorted, (c) => luminance(c.rgb) > 0.85 && c.count > 1) ??
    pickFirst(sorted, (c) => luminance(c.rgb) > 0.5) ??
    FALLBACK_BACKGROUND

  const bgRgb = hexToRgb(background) ?? { r: 255, g: 255, b: 255 }
  const fgCandidates = sorted
    .filter((c) => c.roles.includes("text") && c.hex !== background && contrast(c.rgb, bgRgb) > 2.5)
    .sort((a, b) => b.count - a.count)
  const foreground =
    fgCandidates[0]?.hex ??
    pickFirst(grays, (c) => luminance(c.rgb) < 0.5) ??
    (luminance(bgRgb) > 0.5 ? FALLBACK_FOREGROUND : "#fafafa")

  const primary =
    pickFirst(sorted, (c) => !isGrayscale(c.rgb) && (c.roles.includes("button") || c.roles.includes("brand") || c.roles.includes("link"))) ??
    pickFirst(sorted, (c) => !isGrayscale(c.rgb) && c.count > 2) ??
    pickFirst(sorted, (c) => !isGrayscale(c.rgb)) ??
    FALLBACK_PRIMARY

  const primaryRgb = hexToRgb(primary) ?? { r: 24, g: 24, b: 27 }
  const primaryForeground = luminance(primaryRgb) > 0.5 ? FALLBACK_FOREGROUND : "#fafafa"

  const accent =
    pickFirst(sorted, (c) => !isGrayscale(c.rgb) && c.roles.includes("accent")) ??
    chroma.find((c) => c.hex !== primary && Math.abs(hueDiff(c.hex, primary)) > 30)?.hex ??
    mixHex(primary, background, 0.75)

  const destructive =
    pickFirst(sorted, (c) => c.roles.includes("error") || c.roles.includes("destructive")) ??
    chroma.find((c) => isReddish(c.rgb))?.hex ??
    FALLBACK_DESTRUCTIVE

  const border =
    pickFirst(sorted, (c) => c.roles.includes("border") && isGrayscale(c.rgb)) ??
    mixHex(foreground, background, 0.82)

  const muted = mixHex(foreground, background, 0.45)
  const mutedForeground = mixHex(foreground, background, 0.25)
  const secondary = mixHex(primary, background, 0.82)
  const card = luminance(bgRgb) > 0.95 ? mixHex(background, "#ffffff", 0.6) : adjustLightness(background, 0.03)
  const popover = luminance(bgRgb) > 0.95 ? "#ffffff" : adjustLightness(background, 0.06)
  const neutral = mixHex(foreground, background, 0.5)

  const scales: Record<string, Record<string, string>> = {
    primary: tonalRamp(primary),
    accent: tonalRamp(accent),
    destructive: tonalRamp(destructive),
    neutral: tonalRamp(neutral),
  }

  const accentRgb = hexToRgb(accent) ?? { r: 0, g: 0, b: 0 }

  return {
    background,
    foreground,
    primary,
    primaryForeground,
    secondary,
    secondaryForeground: foreground,
    muted,
    mutedForeground,
    accent,
    accentForeground: luminance(accentRgb) > 0.5 ? FALLBACK_FOREGROUND : "#fafafa",
    border,
    input: border,
    ring: primary,
    destructive,
    destructiveForeground: "#fafafa",
    card,
    cardForeground: foreground,
    popover,
    popoverForeground: foreground,
    scales,
  }
}

function hueDiff(a: string, b: string): number {
  const ha = rgbToHsl(hexToRgb(a) ?? { r: 0, g: 0, b: 0 }).h
  const hb = rgbToHsl(hexToRgb(b) ?? { r: 0, g: 0, b: 0 }).h
  return Math.abs(ha - hb) % 360
}

function isReddish(rgb: Rgb): boolean {
  const { h, s } = rgbToHsl(rgb)
  if (s < 0.3) return false
  return h < 20 || h > 335
}