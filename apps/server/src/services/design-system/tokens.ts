import { Schema } from "effect";

// ─── Base design system shape ───────────────────────────────────────────────

export const ColorUsageSchema = Schema.Struct({
  selector: Schema.String,
  property: Schema.String,
  count: Schema.Number,
});

export const ColorRoleSchema = Schema.Literals([
  "background",
  "surface",
  "text",
  "primary",
  "accent",
  "border",
  "other",
]);

export type ColorRole = typeof ColorRoleSchema.Type;

export const ColorVariantSchema = Schema.Union([
  Schema.Null,
  Schema.Literals(["page", "header", "footer", "card", "sidebar", "popover"]),
]);

export type ColorVariant = typeof ColorVariantSchema.Type;

export const ColorEntrySchema = Schema.Struct({
  role: ColorRoleSchema,
  variant: ColorVariantSchema,
  value: Schema.String,
  source: Schema.String,
  dark: Schema.Boolean,
  usage: Schema.Array(ColorUsageSchema),
});

export const FontFamilySchema = Schema.Struct({
  family: Schema.String,
  weights: Schema.Array(Schema.Number),
  urls: Schema.Array(Schema.String),
});

export const TypeScaleRoleSchema = Schema.Literals([
  "display",
  "heading",
  "body",
  "caption",
  "button",
]);

export type TypeScaleRole = typeof TypeScaleRoleSchema.Type;

export const TypeScaleEntrySchema = Schema.Struct({
  role: TypeScaleRoleSchema,
  family: Schema.String,
  size: Schema.String,
  weight: Schema.Number,
  line_height: Schema.Union([Schema.String, Schema.Null]),
  letter_spacing: Schema.Union([Schema.String, Schema.Null]),
  usage: Schema.Number,
});

export const TypographySchema = Schema.Struct({
  font_families: Schema.Array(FontFamilySchema),
  scale: Schema.Array(TypeScaleEntrySchema),
});

export const SpacingRoleSchema = Schema.Literals(["xs", "sm", "md", "lg", "xl", "other"]);

export type SpacingRole = typeof SpacingRoleSchema.Type;

export const SpacingEntrySchema = Schema.Struct({
  value: Schema.String,
  role: SpacingRoleSchema,
  usage: Schema.Number,
});

export const RadiusEntrySchema = Schema.Struct({
  value: Schema.String,
  usage: Schema.Number,
});

export const ShadowRoleSchema = Schema.Literals(["sm", "md", "lg", "other"]);

export type ShadowRole = typeof ShadowRoleSchema.Type;

export const ShadowEntrySchema = Schema.Struct({
  value: Schema.String,
  role: ShadowRoleSchema,
  usage: Schema.Number,
});

export const BorderEntrySchema = Schema.Struct({
  width: Schema.String,
  style: Schema.String,
  color: Schema.String,
  usage: Schema.Number,
});

export const GradientEntrySchema = Schema.Struct({
  value: Schema.String,
  usage: Schema.Number,
});

export const BreakpointEntrySchema = Schema.Struct({
  name: Schema.String,
  media: Schema.String,
  usage: Schema.Number,
});

export const RawSchema = Schema.Struct({
  csslinks: Schema.Array(Schema.String),
  inline_styles: Schema.Array(Schema.String),
  fonturls: Schema.Array(Schema.String),
  brand_assets: Schema.Array(Schema.String),
});

// ─── shadcn projection ──────────────────────────────────────────────────────

export const ShadcnColorSetSchema = Schema.Struct({
  background: Schema.String,
  foreground: Schema.String,
  card: Schema.String,
  cardForeground: Schema.String,
  popover: Schema.String,
  popoverForeground: Schema.String,
  primary: Schema.String,
  primaryForeground: Schema.String,
  secondary: Schema.String,
  secondaryForeground: Schema.String,
  muted: Schema.String,
  mutedForeground: Schema.String,
  accent: Schema.String,
  accentForeground: Schema.String,
  destructive: Schema.String,
  border: Schema.String,
  input: Schema.String,
  ring: Schema.String,
  radius: Schema.String,
  chart: Schema.Array(Schema.String),
  sidebar: Schema.String,
  sidebarForeground: Schema.String,
  sidebarPrimary: Schema.String,
  sidebarPrimaryForeground: Schema.String,
  sidebarAccent: Schema.String,
  sidebarAccentForeground: Schema.String,
  sidebarBorder: Schema.String,
  sidebarRing: Schema.String,
});

export const ShadcnSchema = Schema.Struct({
  light: ShadcnColorSetSchema,
  dark: ShadcnColorSetSchema,
  fonts: Schema.Struct({
    sans: Schema.Array(Schema.String),
    serif: Schema.Array(Schema.String),
    mono: Schema.Array(Schema.String),
  }),
  css: Schema.String,
});

export const DesignSystemSchema = Schema.Struct({
  page_url: Schema.String,
  title: Schema.Union([Schema.String, Schema.Null]),
  description: Schema.Union([Schema.String, Schema.Null]),
  og_image: Schema.Union([Schema.String, Schema.Null]),
  colors: Schema.Array(ColorEntrySchema),
  typography: TypographySchema,
  spacing: Schema.Array(SpacingEntrySchema),
  radii: Schema.Array(RadiusEntrySchema),
  shadows: Schema.Array(ShadowEntrySchema),
  borders: Schema.Array(BorderEntrySchema),
  gradients: Schema.Array(GradientEntrySchema),
  breakpoints: Schema.Array(BreakpointEntrySchema),
  shadcn: ShadcnSchema,
  raw: RawSchema,
});

export type DesignSystem = typeof DesignSystemSchema.Type;
export type ShadcnColorSet = typeof ShadcnColorSetSchema.Type;

// ─── shadcn defaults (standard shadcn/ui theme) ─────────────────────────────

export const makeDefaultShadcnSet = (dark: boolean): ShadcnColorSet =>
  dark
    ? {
        background: "oklch(0.145 0 0)",
        foreground: "oklch(0.985 0 0)",
        card: "oklch(0.205 0 0)",
        cardForeground: "oklch(0.985 0 0)",
        popover: "oklch(0.205 0 0)",
        popoverForeground: "oklch(0.985 0 0)",
        primary: "oklch(0.922 0 0)",
        primaryForeground: "oklch(0.205 0 0)",
        secondary: "oklch(0.269 0 0)",
        secondaryForeground: "oklch(0.985 0 0)",
        muted: "oklch(0.269 0 0)",
        mutedForeground: "oklch(0.708 0 0)",
        accent: "oklch(0.269 0 0)",
        accentForeground: "oklch(0.985 0 0)",
        destructive: "oklch(0.704 0.191 22.216)",
        border: "oklch(1 0 0 / 10%)",
        input: "oklch(1 0 0 / 15%)",
        ring: "oklch(0.556 0 0)",
        radius: "0.625rem",
        chart: [
          "oklch(0.87 0 0)",
          "oklch(0.556 0 0)",
          "oklch(0.439 0 0)",
          "oklch(0.371 0 0)",
          "oklch(0.269 0 0)",
        ],
        sidebar: "oklch(0.205 0 0)",
        sidebarForeground: "oklch(0.985 0 0)",
        sidebarPrimary: "oklch(0.488 0.243 264.376)",
        sidebarPrimaryForeground: "oklch(0.985 0 0)",
        sidebarAccent: "oklch(0.269 0 0)",
        sidebarAccentForeground: "oklch(0.985 0 0)",
        sidebarBorder: "oklch(1 0 0 / 10%)",
        sidebarRing: "oklch(0.556 0 0)",
      }
    : {
        background: "oklch(1 0 0)",
        foreground: "oklch(0.145 0 0)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.145 0 0)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.145 0 0)",
        primary: "oklch(0.205 0 0)",
        primaryForeground: "oklch(0.985 0 0)",
        secondary: "oklch(0.97 0 0)",
        secondaryForeground: "oklch(0.205 0 0)",
        muted: "oklch(0.97 0 0)",
        mutedForeground: "oklch(0.556 0 0)",
        accent: "oklch(0.97 0 0)",
        accentForeground: "oklch(0.205 0 0)",
        destructive: "oklch(0.577 0.245 27.325)",
        border: "oklch(0.922 0 0)",
        input: "oklch(0.922 0 0)",
        ring: "oklch(0.708 0 0)",
        radius: "0.625rem",
        chart: [
          "oklch(0.87 0 0)",
          "oklch(0.556 0 0)",
          "oklch(0.439 0 0)",
          "oklch(0.371 0 0)",
          "oklch(0.269 0 0)",
        ],
        sidebar: "oklch(0.985 0 0)",
        sidebarForeground: "oklch(0.145 0 0)",
        sidebarPrimary: "oklch(0.205 0 0)",
        sidebarPrimaryForeground: "oklch(0.985 0 0)",
        sidebarAccent: "oklch(0.97 0 0)",
        sidebarAccentForeground: "oklch(0.205 0 0)",
        sidebarBorder: "oklch(0.922 0 0)",
        sidebarRing: "oklch(0.708 0 0)",
      };

export const SHADCN_DEFAULTS = {
  light: makeDefaultShadcnSet(false),
  dark: makeDefaultShadcnSet(true),
};

export const SHADCN_SLOT_KEYS: (keyof ShadcnColorSet)[] = [
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
  "border",
  "input",
  "ring",
  "sidebar",
  "sidebarForeground",
  "sidebarPrimary",
  "sidebarPrimaryForeground",
  "sidebarAccent",
  "sidebarAccentForeground",
  "sidebarBorder",
  "sidebarRing",
];