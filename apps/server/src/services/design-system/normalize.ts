import { Context, Effect, Layer, Predicate, Schema } from "effect"
import { DesignSystem as DesignSystemSchema, type DesignSystem } from "../../schemas/design-system"
import { ExtractRow, type ExtractRow as ExtractRowType } from "../../schemas/extract"
import { clusterColors, inferRoles } from "./roles"
import { extractCssTokens } from "./parse-css"
import { extractAssets, extractInlineCss, extractSiteMeta } from "./html"
import { normalizeTypography } from "./typography"
import { normalizeSpacing } from "./spacing"

export class NormalizeError extends Schema.TaggedError<NormalizeError>()("NormalizeError", {
  message: Schema.String,
}) {}

function pickRow(rows: ReadonlyArray<unknown>): ExtractRowType | null {
  for (const item of rows) {
    if (!Predicate.isObject(item)) continue
    if (Predicate.isString(item.error) && item.error !== "") continue
    if (!("html" in item || "cssFiles" in item || "css" in item || "title" in item || "url" in item)) continue
    try {
      return Schema.decodeUnknownSync(ExtractRow)(item)
    } catch {
      continue
    }
  }
  return null
}

function collectCss(row: ExtractRowType): string[] {
  const css: string[] = []
  if (Predicate.isString(row.html)) css.push(...extractInlineCss(row.html))
  if (Array.isArray(row.cssFiles)) css.push(...row.cssFiles)
  if (Array.isArray(row.css)) css.push(...row.css)
  return css
}

const fromRows = Effect.fn("NormalizeService.fromRows")(
  function*(rows: ReadonlyArray<unknown>, pageUrl: string): Effect.fn.Return<DesignSystem, NormalizeError> {
    const row = pickRow(rows)
    if (row === null) {
      return yield* new NormalizeError({ message: "no usable extraction rows returned" })
    }

    const usage = extractCssTokens(collectCss(row))
    const clusters = clusterColors(usage.colors)
    const colors = inferRoles(clusters)
    const typography = normalizeTypography(usage.fontSizes, usage.lineHeights, usage.fontFamilies)
    const spacing = normalizeSpacing(usage.radii, usage.shadows, usage.spacing)
    const brand = extractAssets(row, pageUrl)
    const meta = extractSiteMeta(row)

    const tokens: DesignSystem = {
      site: { url: pageUrl, title: meta.title, description: meta.description },
      brand,
      colors,
      typography,
      radius: spacing.radius,
      shadows: spacing.shadows,
      spacing: spacing.spacing,
    }

    try {
      return Schema.decodeUnknownSync(DesignSystemSchema)(tokens)
    } catch {
      return yield* new NormalizeError({ message: "normalization produced an invalid design system" })
    }
  },
)

export class NormalizeService extends Context.Service<NormalizeService, {
  readonly fromRows: (rows: ReadonlyArray<unknown>, pageUrl: string) => Effect.Effect<DesignSystem, NormalizeError>
}>()("site2design/app/NormalizeService") {
  static readonly layer = Layer.sync(NormalizeService, () => NormalizeService.of({ fromRows }))
}