import { Schema } from "effect"
import type { DesignSystem } from "./design-system"

export const ExtractRequest = Schema.Struct({
  url: Schema.URLFromString,
})

export type ExtractRequest = Schema.Schema.Type<typeof ExtractRequest>

export type JobResult = { status: "running" } | { status: "done"; tokens: DesignSystem }

export const ExtractRow = Schema.Struct({
  url: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  favicon: Schema.optional(Schema.String),
  logo: Schema.optional(Schema.String),
  ogImage: Schema.optional(Schema.String),
  og_image: Schema.optional(Schema.String),
  html: Schema.optional(Schema.String),
  cssFiles: Schema.optional(Schema.Array(Schema.String)),
  css: Schema.optional(Schema.Array(Schema.String)),
})

export type ExtractRow = Schema.Schema.Type<typeof ExtractRow>