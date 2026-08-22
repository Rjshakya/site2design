import type {
  CollectorDeliverSchema,
  CreateCollectorInputSchema,
  CollectorSchema,
  TriggerAIJobInputSchema,
  AIJobTriggerResultSchema,
  AIJobProgressSchema,
  TriggerSelfHealingInputSchema,
  ResumeSelfHealingInputSchema,
  TriggerCollectionInputSchema,
  TriggerCollectionQuerySchema,
  TriggerCollectionResultSchema,
  DatasetQuerySchema,
  DatasetBuildingSchema,
  DatasetRecordSchema,
  DatasetResultSchema,
} from "./schema";

export type CollectorDeliver = typeof CollectorDeliverSchema.Type;
export type CollectorDeliverType = typeof CollectorDeliverSchema.Type;

export type CreateCollectorInput = typeof CreateCollectorInputSchema.Type;

export type Collector = typeof CollectorSchema.Type;

export type TriggerAIJobInput = typeof TriggerAIJobInputSchema.Type;

export type AIJobTriggerResult = typeof AIJobTriggerResultSchema.Type;

export type AIJobProgress = typeof AIJobProgressSchema.Type;

export type TriggerSelfHealingInput = typeof TriggerSelfHealingInputSchema.Type;

export type ResumeSelfHealingInput = typeof ResumeSelfHealingInputSchema.Type;

export type TriggerCollectionInput = typeof TriggerCollectionInputSchema.Type;

export type TriggerCollectionQuery = typeof TriggerCollectionQuerySchema.Type;

export type TriggerCollectionResult = typeof TriggerCollectionResultSchema.Type;

export type DatasetQuery = typeof DatasetQuerySchema.Type;

export type DatasetBuilding = typeof DatasetBuildingSchema.Type;

export type DatasetRecord = typeof DatasetRecordSchema.Type;

export type DatasetResult = typeof DatasetResultSchema.Type;