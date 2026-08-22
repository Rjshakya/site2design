import type { NumericSample } from "./parse-css"

export interface SpacingTokens {
  radius: { sm: number; md: number; lg: number; xl: number; full: number }
  shadows: { sm: string; md: string; lg: string; xl: string }
  spacing: number[]
}

const NICE_RADIUS = [0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32]
const NICE_SPACING = [2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 40, 48, 64, 96]

const DEFAULT_SHADOWS = [
  "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
]

function clusterValues(samples: NumericSample[], threshold: number): number[] {
  const sorted = [...samples].sort((a, b) => a.value - b.value)
  const groups: number[] = []
  for (const sample of sorted) {
    const last = groups[groups.length - 1]
    if (last !== undefined && sample.value - last <= threshold) {
      groups[groups.length - 1] = (last + sample.value) / 2
    } else {
      groups.push(sample.value)
    }
  }
  return groups
}

function snap(values: number[], nice: number[]): number[] {
  return values.map((v) => {
    let best = nice[0]
    let bestDist = Infinity
    for (const n of nice) {
      const d = Math.abs(n - v)
      if (d < bestDist) {
        bestDist = d
        best = n
      }
    }
    return bestDist <= 4 ? best : Math.round(v)
  })
}

function dedupe(values: number[]): number[] {
  return [...new Set(values)]
}

function normalizeShadowKey(shadow: string): string {
  return shadow
    .replace(/#[0-9a-f]{3,8}/gi, "C")
    .replace(/rgba?\([^)]*\)/gi, "C")
    .replace(/hsl[a]?\([^)]*\)/gi, "C")
    .replace(/\d+(\.\d+)?(px|rem|em)?/g, "N")
}

function shadowWeight(shadow: string): number {
  const nums = shadow.match(/\d+(\.\d+)?/g)?.map(Number) ?? []
  return nums.reduce((a, b) => a + b, 0)
}

function padShadows(shadows: string[], count: number): string[] {
  const out = [...shadows]
  for (let i = out.length; i < count; i++) out.push(DEFAULT_SHADOWS[i])
  return out.slice(0, count)
}

export function normalizeSpacing(
  radii: NumericSample[],
  shadows: { value: string; count: number }[],
  spacing: NumericSample[],
): SpacingTokens {
  const radiusClusters = dedupe(snap(clusterValues(radii, 2), NICE_RADIUS))
  const sortedRadius = [...radiusClusters].sort((a, b) => a - b)
  const r = sortedRadius.slice(0, 4)
  const radius = {
    sm: r[0] ?? 6,
    md: r[1] ?? (r[0] !== undefined ? r[0] * 2 : 8),
    lg: r[2] ?? r[1] ?? (r[0] !== undefined ? r[0] * 3 : 12),
    xl: r[3] ?? r[2] ?? r[1] ?? 16,
    full: 9999,
  }

  const uniqueShadows: string[] = []
  const seen = new Set<string>()
  for (const s of [...shadows].sort((a, b) => b.count - a.count)) {
    const key = normalizeShadowKey(s.value)
    if (!seen.has(key)) {
      seen.add(key)
      uniqueShadows.push(s.value)
    }
    if (uniqueShadows.length >= 4) break
  }
  uniqueShadows.sort((a, b) => shadowWeight(a) - shadowWeight(b))
  const [sm, md, lg, xl] = padShadows(uniqueShadows, 4)

  const spacingClusters = dedupe(snap(clusterValues(spacing, 3), NICE_SPACING)).sort((a, b) => a - b)
  let spacingValues = spacingClusters.slice(0, 8)
  if (spacingValues.length < 4) {
    const base = spacingValues[0] ?? 8
    const needed = 4 - spacingValues.length
    for (let i = 1; i <= needed; i++) {
      spacingValues.push(base * Math.pow(2, i))
    }
    spacingValues = dedupe(spacingValues).sort((a, b) => a - b)
  }

  return {
    radius,
    shadows: { sm, md, lg, xl },
    spacing: spacingValues,
  }
}