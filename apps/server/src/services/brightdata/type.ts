import type {
  CollectorDeliverSchema,
  CreateCollectorInputSchema,
  CollectorSchema,
  TriggerAIJobInputSchema,
  AIJobTriggerResultSchema,
  AIJobProgressSchema,
  TriggerSelfHealingInputSchema,
  ResumeSelfHealingInputSchema,
  TriggerBatchCollectionInputSchema,
  TriggerBatchCollectionQuerySchema,
  TriggerBatchCollectionResultSchema,
  BatchDatasetQuerySchema,
  BatchDatasetBuildingSchema,
  BatchDatasetRecordSchema,
  BatchDatasetResultSchema,
  TriggerImmediateQuerySchema,
  TriggerImmediateInputSchema,
  TriggerImmediateResultSchema,
  GetTriggerImmediateResultQuerySchema,
  GetTriggerImmediateResultSchema,
  GetTriggerImmediateResultPendingSchema,
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

export type TriggerBatchCollectionInput = typeof TriggerBatchCollectionInputSchema.Type;

export type TriggerBatchCollectionQuery = typeof TriggerBatchCollectionQuerySchema.Type;

export type TriggerBatchCollectionResult = typeof TriggerBatchCollectionResultSchema.Type;

export type BatchDatasetQuery = typeof BatchDatasetQuerySchema.Type;

export type BatchDatasetBuilding = typeof BatchDatasetBuildingSchema.Type;

export type BatchDatasetRecord = typeof BatchDatasetRecordSchema.Type;

export type BatchDatasetResult = typeof BatchDatasetResultSchema.Type;

export type TriggerImmediateQuery = typeof TriggerImmediateQuerySchema.Type;

export type TriggerImmediateInput = typeof TriggerImmediateInputSchema.Type;

export type TriggerImmediateResult = typeof TriggerImmediateResultSchema.Type;

export type GetTriggerImmediateResultQuery = typeof GetTriggerImmediateResultQuerySchema.Type;

export type GetTriggerImmediatePendingResult = typeof GetTriggerImmediateResultPendingSchema.Type;
export type GetTriggerImmediateResult = typeof GetTriggerImmediateResultSchema.Type;
