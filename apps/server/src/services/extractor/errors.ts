import { Schema } from "effect";

export class InvalidExtractionError extends Schema.TaggedError<InvalidExtractionError>()(
  "InvalidExtractionError",
  {
    message: Schema.String,
  },
) {}

export class CssFetchError extends Schema.TaggedError<CssFetchError>()("CssFetchError", {
  url: Schema.String,
  message: Schema.String,
}) {}