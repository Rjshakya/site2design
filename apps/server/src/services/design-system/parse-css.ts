import * as csstree from "css-tree"
import { normalizeColor } from "./colors"

export interface ColorSample {
  hex: string
  count: number
  roles: string[]
}

export interface FamilySample {
  family: string
  count: number
  roles: string[]
}

export interface FontSizeSample {
  size: number
  count: number
  roles: string[]
}

export interface NumericSample {
  value: number
  count: number
}

export interface StyleUsage {
  colors: ColorSample[]
  fontFamilies: FamilySample[]
  fontSizes: FontSizeSample[]
  lineHeights: NumericSample[]
  fontWeights: NumericSample[]
  radii: NumericSample[]
  shadows: { value: string; count: number }[]
  spacing: NumericSample[]
}

type Acc<T extends { count: number }> = Map<string, T & { roles: string[] }>

function bumpColor(colors: Map<string, { count: number; roles: string[] }>, hex: string, roles: string[]) {
  const entry = colors.get(hex)
  if (entry) {
    entry.count++
    for (const r of roles) if (!entry.roles.includes(r)) entry.roles.push(r)
  } else {
    colors.set(hex, { count: 1, roles: [...roles] })
  }
}

function bumpNumeric(map: Map<number, { value: number; count: number }>, value: number) {
  if (!Number.isFinite(value) || value <= 0) return
  const key = Math.round(value * 100) / 100
  const entry = map.get(key)
  if (entry) entry.count++
  else map.set(key, { value: key, count: 1 })
}

function bumpFamily(map: Map<string, { family: string; count: number; roles: string[] }>, family: string, roles: string[]) {
  const key = family.toLowerCase()
  const entry = map.get(key)
  if (entry) {
    entry.count++
    for (const r of roles) if (!entry.roles.includes(r)) entry.roles.push(r)
  } else {
    map.set(key, { family, count: 1, roles: [...roles] })
  }
}

function parsePx(value: string, base = 16): number | null {
  const v = value.trim()
  let m = /^([\d.]+)px$/i.exec(v)
  if (m) return parseFloat(m[1])
  m = /^([\d.]+)rem$/i.exec(v)
  if (m) return parseFloat(m[1]) * base
  m = /^([\d.]+)em$/i.exec(v)
  if (m) return parseFloat(m[1]) * base
  return null
}

function parseSpacingList(value: string, base: number): number[] {
  return value
    .split(/\s+/)
    .map((p) => parsePx(p, base))
    .filter((p): p is number => p !== null)
}

const SKIP_SELECTOR = /:(hover|focus|active|visited|focus-visible|focus-within|disabled|checked|placeholder|selection|first-letter|first-line|before|after)\b/
const MONO_FAMILIES = /mono|courier|menlo|consolas|monospace/i

export function roleHintsFromSelector(selector: string): string[] {
  const s = selector.toLowerCase()
  const hints: string[] = []
  if (/btn|button|submit|\.cta|action/.test(s)) hints.push("button")
  if (/\ba\b|\blink\b|href/.test(s)) hints.push("link")
  if (/h[1-6]\b|heading|\.title|\.display|\.headline/.test(s)) hints.push("heading")
  if (/body|\.text|\.body|\.content|\bp\b/.test(s)) hints.push("body")
  if (/input|form|select|textarea|search|field/.test(s)) hints.push("input")
  if (/alert|error|danger|warn|destructive|invalid|failed/.test(s)) hints.push("error")
  if (/success|ok|valid/.test(s)) hints.push("success")
  if (/accent/.test(s)) hints.push("accent")
  if (/badge|tag|chip|pill/.test(s)) hints.push("badge")
  if (/card|panel|\.box|container|wrapper|section|article/.test(s)) hints.push("card")
  if (/nav|header|footer|menu/.test(s)) hints.push("nav")
  if (/bg-|background|surface/.test(s)) hints.push("background")
  if (/border|divider|outline|stroke|hairline/.test(s)) hints.push("border")
  if (/muted|subtle|secondary|placeholder/.test(s)) hints.push("muted")
  if (/brand|logo/.test(s)) hints.push("brand")
  return hints
}

function resolveVars(value: string, variables: Map<string, string>, depth = 0): string {
  if (depth > 8) return value
  return value.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^)]*))?\s*\)/g, (whole, name: string, fallback?: string) => {
    const resolved = variables.get(name)
    if (resolved !== undefined) return resolveVars(resolved, variables, depth + 1)
    if (fallback !== undefined && fallback.trim()) return resolveVars(fallback.trim(), variables, depth + 1)
    return whole
  })
}

const isDarkMedia = (prelude: string) => /prefers-color-scheme\s*:\s*dark/i.test(prelude)

export function extractCssTokens(cssTexts: string[]): StyleUsage {
  const colors = new Map<string, { count: number; roles: string[] }>()
  const fontFamilies = new Map<string, { family: string; count: number; roles: string[] }>()
  const fontSizes = new Map<number, { size: number; count: number; roles: string[] }>()
  const lineHeights = new Map<number, { value: number; count: number }>()
  const fontWeights = new Map<number, { value: number; count: number }>()
  const radii = new Map<number, { value: number; count: number }>()
  const shadows = new Map<string, { value: string; count: number }>()
  const spacing = new Map<number, { value: number; count: number }>()
  const variables = new Map<string, string>()

  const addColor = (value: string, roles: string[]) => {
    const hex = normalizeColor(value)
    if (hex) bumpColor(colors, hex, roles)
  }

  for (const css of cssTexts) {
    if (!css || !css.trim()) continue
    let ast: csstree.CssNode
    try {
      ast = csstree.parse(css)
    } catch {
      continue
    }

    csstree.walk(ast, {
      visit: "Atrule",
      enter(node) {
        if (node.name === "media" && node.prelude && isDarkMedia(csstree.generate(node.prelude))) {
          return false
        }
      },
    })

    csstree.walk(ast, {
      visit: "Rule",
      enter(rule) {
        if (rule.prelude === null) return
        const selector = csstree.generate(rule.prelude)
        if (!selector || SKIP_SELECTOR.test(selector)) return

        const isRootScope = /^(:root|html|body|\*|\[data-theme)/.test(selector.trim())
        const hints = roleHintsFromSelector(selector)
        const hasTextRole = hints.includes("body") || hints.includes("heading") || hints.includes("link") || hints.includes("button") || hints.includes("input")

        if (rule.block === null) return
        for (const child of rule.block.children) {
          if (child.type !== "Declaration") continue
          const prop = child.property
          const raw = csstree.generate(child.value)
          if (prop.startsWith("--")) {
            if (isRootScope) variables.set(prop, resolveVars(raw, variables))
            continue
          }
          const value = resolveVars(raw, variables)

          if (prop === "color") {
            addColor(value, hasTextRole ? ["text"] : ["text", ...hints])
          } else if (prop === "background-color") {
            addColor(value, ["background", ...hints])
          } else if (prop === "background") {
            if (!/gradient|image|url\(|none/i.test(value)) addColor(value, ["background", ...hints])
          } else if (prop === "border-color" || prop === "outline-color") {
            addColor(value, ["border", ...hints])
          } else if (prop === "font-family") {
            for (const fam of value.split(",")) {
              const f = fam.trim().replace(/^['"]|['"]$/g, "")
              if (f) bumpFamily(fontFamilies, f, hints)
            }
          } else if (prop === "font-size") {
            const size = parsePx(value)
            if (size !== null && size >= 8 && size <= 96) {
              const key = Math.round(size * 100) / 100
              const entry = fontSizes.get(key)
              if (entry) {
                entry.count++
                for (const r of hints) if (!entry.roles.includes(r)) entry.roles.push(r)
              } else {
                fontSizes.set(key, { size: key, count: 1, roles: [...hints] })
              }
            }
          } else if (prop === "line-height") {
            const v = value.trim()
            if (/^[\d.]+$/.test(v)) bumpNumeric(lineHeights, parseFloat(v))
            else {
              const px = parsePx(v)
              if (px !== null && px >= 10 && px <= 40) bumpNumeric(lineHeights, px / 16)
            }
          } else if (prop === "font-weight") {
            const w = /^[\d.]+$/.test(value.trim()) ? parseFloat(value) : ({ bold: 700, semibold: 600, medium: 500, normal: 400, light: 300 } as Record<string, number>)[value.trim()]
            if (w) bumpNumeric(fontWeights, w)
          } else if (prop === "border-radius") {
            if (!value.includes("/") && !value.includes("%")) {
              const r = parsePx(value)
              if (r !== null && r >= 0 && r <= 64) bumpNumeric(radii, r)
            }
          } else if (prop === "box-shadow") {
            const v = value.trim()
            if (v && v !== "none") {
              const entry = shadows.get(v)
              if (entry) entry.count++
              else shadows.set(v, { value: v, count: 1 })
            }
          } else if (prop === "padding" || prop === "padding-block" || prop === "padding-inline") {
            for (const p of parseSpacingList(value, 16)) bumpNumeric(spacing, p)
          } else if (prop === "padding-top" || prop === "padding-bottom" || prop === "padding-left" || prop === "padding-right" || prop === "padding-block-start" || prop === "padding-block-end" || prop === "padding-inline-start" || prop === "padding-inline-end") {
            const p = parsePx(value, 16)
            if (p !== null) bumpNumeric(spacing, p)
          } else if (prop === "gap" || prop === "grid-gap" || prop === "row-gap" || prop === "column-gap") {
            for (const p of parseSpacingList(value, 16)) bumpNumeric(spacing, p)
          }
        }
      },
    })
  }

  const toSamples = <T extends { count: number }>(map: Map<unknown, T>): (T & { roles?: string[] })[] =>
    [...map.values()].sort((a, b) => b.count - a.count)

  return {
    colors: (toSamples(colors) as ColorSample[]).slice(0, 200),
    fontFamilies: (toSamples(fontFamilies) as FamilySample[]).slice(0, 30),
    fontSizes: (toSamples(fontSizes) as FontSizeSample[]).slice(0, 30),
    lineHeights: toSamples(lineHeights).slice(0, 10),
    fontWeights: toSamples(fontWeights).slice(0, 8),
    radii: toSamples(radii).slice(0, 12),
    shadows: [...shadows.values()].sort((a, b) => b.count - a.count).slice(0, 12),
    spacing: toSamples(spacing).slice(0, 30),
  }
}