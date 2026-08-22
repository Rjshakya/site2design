import { Schema } from "effect";

export const CollectorDeliverSchema = Schema.Union([
  Schema.Struct({
    type: Schema.Literal("webhook"),
    endpoint: Schema.String,
  }),

  Schema.Struct({
    type: Schema.Literal("email"),
    address: Schema.String,
  }),

  Schema.Struct({
    type: Schema.Literal("s3"),
    bucket: Schema.String,
    region: Schema.String,
    directory: Schema.String.pipe(Schema.optional),
  }),

  Schema.Record(Schema.String, Schema.Unknown),
]);

export const CreateCollectorInputSchema = Schema.Struct({
  name: Schema.String,
  deliver: CollectorDeliverSchema,
});

export const CollectorSchema = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  zone: Schema.String,
  active: Schema.Boolean,
});

export const TriggerAIJobInputSchema = Schema.Struct({
  description: Schema.String,
  urls: Schema.Array(Schema.String),
});

export const AIJobTriggerResultSchema = Schema.Struct({
  id: Schema.String,
  queued: Schema.Boolean,
});

export const AIJobProgressSchema = Schema.Struct({
  step: Schema.String,
  completed_steps: Schema.Array(Schema.String),
  status: Schema.String,
});

export const TriggerSelfHealingInputSchema = Schema.Struct({
  prompt: Schema.String,
  custom_input: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
});

export const ResumeSelfHealingInputSchema = Schema.Struct({
  message: Schema.Boolean,
  auto_save: Schema.optional(Schema.Boolean),
});

export const TriggerCollectionInputSchema = Schema.Array(Schema.Struct({ url: Schema.String }));

export const TriggerCollectionQuerySchema = Schema.Struct({
  collector: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  queue_next: Schema.optional(Schema.Number),
  queue: Schema.optional(Schema.String),
  confirm_cancel: Schema.optional(Schema.Number),
  no_downloads: Schema.optional(Schema.Number),
  deadline: Schema.optional(Schema.String),
  notify: Schema.optional(Schema.String),
  deliver: Schema.optional(Schema.String),
});

export const TriggerCollectionResultSchema = Schema.Struct({
  collection_id: Schema.String,
  start_eta: Schema.String,
});

export const DatasetQuerySchema = Schema.Struct({
  id: Schema.String,
});

export const DatasetBuildingSchema = Schema.Struct({
  status: Schema.Literal("building"),
  message: Schema.String,
});

export const DatasetRecordSchema = Schema.Record(Schema.String, Schema.Unknown);

export const DatasetResultSchema = Schema.Union([
  DatasetBuildingSchema,
  Schema.Array(DatasetRecordSchema),
]);
