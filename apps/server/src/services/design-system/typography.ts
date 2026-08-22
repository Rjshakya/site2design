import type { FamilySample, FontSizeSample, NumericSample } from "./parse-css"

export interface TypographyTokens {
  fontSans: string[]
  fontDisplay: string[] | undefined
  fontMono: string[] | undefined
  ratio: number
  scale: Record<string, { fontSize: number; lineHeight: number }>
}

const RATIOS = [1.125, 1.2, 1.25, 1.333, 1.414, 1.5]
const MONO_RE = /mono|courier|menlo|consolas|monospace/i
const DISPLAY_RE = /display|heading|serif/i

function bestRatio(sizes: FontSizeSample[], body: number): number {
  const headingSizes = sizes
    .filter((s) => s.size > body * 1.05 && (s.roles.includes("heading") || s.count > 2))
    .map((s) => s.size)
    .slice(0, 6)
  if (headingSizes.length === 0) return 1.25
  let best = 1.25
  let bestError = Infinity
  for (const ratio of RATIOS) {
    let error = 0
    for (const size of headingSizes) {
      const steps = Math.round(Math.log(size / body) / Math.log(ratio))
      const predicted = body * Math.pow(ratio, steps)
      error += Math.abs(Math.log(size / predicted))
    }
    error /= headingSizes.length
    if (error < bestError) {
      bestError = error
      best = ratio
    }
  }
  return best
}

function pickFamily(families: FamilySample[], predicate: (f: string) => boolean): string[] | undefined {
  const matched = families.find((f) => predicate(f.family))
  if (!matched) return undefined
  return [matched.family]
}

const SYSTEM_SANS = ["ui-sans-serif", "system-ui", "sans-serif"]
const SYSTEM_MONO = ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"]

export function normalizeTypography(
  sizes: FontSizeSample[],
  lineHeights: NumericSample[],
  families: FamilySample[],
): TypographyTokens {
  const bodyCandidates = sizes
    .filter((s) => s.roles.includes("body") || s.roles.includes("text"))
    .sort((a, b) => b.count - a.count)
  const bodySize = (bodyCandidates[0]?.size ?? sizes[0]?.size ?? 16)
  const body = Math.min(18, Math.max(14, bodySize))

  const ratio = bestRatio(sizes, body)

  const bodyLineHeight =
    lineHeights.find((l) => l.count > 1)?.value ?? 1.6

  const mk = (size: number, lineHeight: number) => ({ fontSize: size, lineHeight })

  const scale: Record<string, { fontSize: number; lineHeight: number }> = {
    xs: mk(Math.round(body / ratio), 1.5),
    sm: mk(Math.round(body / Math.pow(ratio, 0.5)), 1.5),
    body: mk(body, bodyLineHeight),
    h6: mk(Math.round(body * ratio), 1.45),
    h5: mk(Math.round(body * ratio ** 2), 1.4),
    h4: mk(Math.round(body * ratio ** 3), 1.35),
    h3: mk(Math.round(body * ratio ** 4), 1.3),
    h2: mk(Math.round(body * ratio ** 5), 1.25),
    h1: mk(Math.min(64, Math.round(body * ratio ** 6)), 1.2),
  }

  const fontSans = pickFamily(families, (f) => !MONO_RE.test(f) && !DISPLAY_RE.test(f))
  const fontDisplay = pickFamily(families, (f) => DISPLAY_RE.test(f) && !MONO_RE.test(f))
  const fontMono = pickFamily(families, (f) => MONO_RE.test(f))

  return {
    fontSans: fontSans ? [fontSans[0], ...SYSTEM_SANS] : SYSTEM_SANS,
    fontDisplay: fontDisplay ? [fontDisplay[0], ...SYSTEM_SANS] : undefined,
    fontMono: fontMono ? [fontMono[0], ...SYSTEM_MONO] : SYSTEM_MONO,
    ratio,
    scale,
  }
}