import { Schema } from "effect";

export const ExpectedExtractOutputSchema = Schema.Array(
  Schema.Struct({
    page_url: Schema.String,
    title: Schema.Union([Schema.String, Schema.Null]),
    description: Schema.Union([Schema.String, Schema.Null]),
    csslinks: Schema.Array(Schema.String),
    inline_styles: Schema.Array(Schema.String),
    fonturls: Schema.Array(Schema.String),
    og_image: Schema.Union([Schema.String, Schema.Null]),
    brand_assets: Schema.Array(Schema.String),
    input: Schema.Struct({
      url: Schema.String,
    }),
  }),
);

export const ExtractOutputSchema = Schema.Struct({
  page_url: Schema.String,
  title: Schema.Union([Schema.String, Schema.Null]),
  description: Schema.Union([Schema.String, Schema.Null]),
  csslinks: Schema.Array(Schema.String),
  inline_styles: Schema.Array(Schema.String),
  fonturls: Schema.Array(Schema.String),
  og_image: Schema.Union([Schema.String, Schema.Null]),
  brand_assets: Schema.Array(Schema.String),
});

export const ExtractOutputsSchema = Schema.Array(ExtractOutputSchema);

export const ExtractInputSchema = Schema.Struct({
  url: Schema.URLFromString,
});
