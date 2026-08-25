import { Schema } from "effect";

export class BrightDataError extends Schema.TaggedError<BrightDataError>()("BrightDataError", {
  message: Schema.String,
  type: Schema.String,
  status: Schema.Number,
}) {}

export class CollectorSetupError extends Schema.TaggedError<CollectorSetupError>()(
  "CollectorSetupError",
  {
    message: Schema.String,
  },
) {}