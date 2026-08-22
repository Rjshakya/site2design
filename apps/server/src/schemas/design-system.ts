import { Schema } from "effect"

export const ColorScale = Schema.Record(Schema.String, Schema.String)

export type ColorScale = Schema.Schema.Type<typeof ColorScale>

export const DesignSystem = Schema.Struct({
  site: Schema.Struct({
    url: Schema.String,
    title: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
  }),
  brand: Schema.Struct({
    favicon: Schema.optional(Schema.String),
    logo: Schema.optional(Schema.String),
    ogImage: Schema.optional(Schema.String),
  }),
  colors: Schema.Struct({
    background: Schema.String,
    foreground: Schema.String,
    primary: Schema.String,
    primaryForeground: Schema.String,
    secondary: Schema.String,
    secondaryForeground: Schema.String,
    muted: Schema.String,
    mutedForeground: Schema.String,
    accent: Schema.String,
    accentForeground: Schema.String,
    border: Schema.String,
    input: Schema.String,
    ring: Schema.String,
    destructive: Schema.String,
    destructiveForeground: Schema.String,
    card: Schema.String,
    cardForeground: Schema.String,
    popover: Schema.String,
    popoverForeground: Schema.String,
    scales: Schema.Record(Schema.String, ColorScale),
  }),
  typography: Schema.Struct({
    fontSans: Schema.Array(Schema.String),
    fontDisplay: Schema.optional(Schema.Array(Schema.String)),
    fontMono: Schema.optional(Schema.Array(Schema.String)),
    ratio: Schema.Number,
    scale: Schema.Record(
      Schema.String,
      Schema.Struct({
        fontSize: Schema.Number,
        lineHeight: Schema.Number,
      }),
    ),
  }),
  radius: Schema.Struct({
    sm: Schema.Number,
    md: Schema.Number,
    lg: Schema.Number,
    xl: Schema.Number,
    full: Schema.Number,
  }),
  shadows: Schema.Struct({
    sm: Schema.String,
    md: Schema.String,
    lg: Schema.String,
    xl: Schema.String,
  }),
  spacing: Schema.Array(Schema.Number),
})

export type DesignSystem = Schema.Schema.Type<typeof DesignSystem>