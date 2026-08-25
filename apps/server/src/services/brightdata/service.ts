import { Context, Effect, Layer, Option } from "effect";
import { AppConfig, BDConfig } from "../../env";
import { apiFetch } from "../../lib/fetch";
import type {
  Collector,
  CreateCollectorInput,
  TriggerAIJobInput,
  AIJobTriggerResult,
  AIJobProgress,
  TriggerSelfHealingInput,
  ResumeSelfHealingInput,
  TriggerBatchCollectionInput,
  TriggerBatchCollectionQuery,
  TriggerBatchCollectionResult,
  BatchDatasetResult,
  TriggerImmediateInput,
  TriggerImmediateQuery,
  TriggerImmediateResult,
  GetTriggerImmediateResultQuery,
  GetTriggerImmediateResult,
} from "./type";

// ─── Constants ──────────────────────────────────────────────────────────────

const BD_BASE_URL = "https://api.brightdata.com";

// ─── Client ─────────────────────────────────────────────────────────────────

const BrightDataClientMake = Effect.gen(function* () {
  const { BD_CONFIG } = yield* AppConfig;
  const { BD_API_TOKEN } = BD_CONFIG;


  const createCollector = (input: CreateCollectorInput) =>
    apiFetch<Collector>(
      {
        apiToken: BD_API_TOKEN,
        base_url: BD_BASE_URL,
        path: "/dca/collector",
        init: { method: "POST", body: JSON.stringify(input) },
      },
      "BrightDataFetchError",
    );

  const triggerAIJob = (collectorId: string, input: TriggerAIJobInput) =>
    apiFetch<AIJobTriggerResult>(
      {
        apiToken: BD_API_TOKEN,
        base_url: BD_BASE_URL,
        path: `/dca/collectors/${collectorId}/automate_template`,
        init: { method: "POST", body: JSON.stringify(input) },
      },
      "BrightDataFetchError",
    );

  const getAIJobStatus = (collectorId: string) =>
    apiFetch<AIJobProgress>(
      {
        apiToken: BD_API_TOKEN,
        base_url: BD_BASE_URL,
        path: `/dca/collectors/${collectorId}/automate_template/progress`,
      },
      "BrightDataFetchError",
    );

  const triggerSelfHealing = (collectorId: string, input: TriggerSelfHealingInput) =>
    apiFetch<unknown>(
      {
        apiToken: BD_API_TOKEN,
        base_url: BD_BASE_URL,
        path: `/dca/collectors/${collectorId}/refactor_template`,
        init: { method: "POST", body: JSON.stringify(input) },
      },
      "BrightDataFetchError",
    );

  const getSelfHealingStatus = (collectorId: string) =>
    apiFetch<AIJobProgress>(
      {
        apiToken: BD_API_TOKEN,
        base_url: BD_BASE_URL,
        path: `/dca/collectors/${collectorId}/refactor_template/progress`,
      },
      "BrightDataFetchError",
    );

  const resumeSelfHealing = (collectorId: string, input: ResumeSelfHealingInput) =>
    apiFetch<unknown>(
      {
        apiToken: BD_API_TOKEN,
        base_url: BD_BASE_URL,
        path: `/dca/collectors/${collectorId}/resume_automation_job`,
        init: { method: "POST", body: JSON.stringify(input) },
      },
      "BrightDataFetchError",
    );

  const triggerBatchCollection = (
    collectorId: string,
    inputs: TriggerBatchCollectionInput,
    query: TriggerBatchCollectionQuery,
  ) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) params.set(key, String(value));
    }
    params.set("collector", query.collector ?? collectorId);

    return apiFetch<TriggerBatchCollectionResult>(
      {
        apiToken: BD_API_TOKEN,
        base_url: BD_BASE_URL,
        path: `/dca/trigger?${params.toString()}`,
        init: { method: "POST", body: JSON.stringify(inputs) },
      },
      "BrightDataFetchError",
    );
  };

  const getBatchDataset = (id: string) =>
    apiFetch<BatchDatasetResult>(
      {
        apiToken: BD_API_TOKEN,
        base_url: BD_BASE_URL,
        path: `/dca/dataset?id=${encodeURIComponent(id)}`,
      },
      "BrightDataFetchError",
    );

  const triggerImmediateCollection = (
    collectorId: string,
    input: TriggerImmediateInput,
    query: TriggerImmediateQuery,
  ) => {
    const params = new URLSearchParams();
    params.set("collector", query.collector ?? collectorId);
    if (query.version !== undefined) params.set("version", query.version);

    return apiFetch<TriggerImmediateResult>(
      {
        apiToken: BD_API_TOKEN,
        base_url: BD_BASE_URL,
        path: `/dca/trigger_immediate?${params.toString()}`,
        init: { method: "POST", body: JSON.stringify(input) },
      },
      "BrightDataFetchError",
    );
  };

  const getTriggerImmediateResult = (query: GetTriggerImmediateResultQuery) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) params.set(key, String(value));
    }

    return apiFetch<GetTriggerImmediateResult>(
      {
        apiToken: BD_API_TOKEN,
        base_url: BD_BASE_URL,
        path: `/dca/get_result?${params.toString()}`,
      },
      "BrightDataFetchError",
    );
  };

  return {
    createCollector,
    triggerAIJob,
    getAIJobStatus,
    triggerSelfHealing,
    getSelfHealingStatus,
    resumeSelfHealing,
    triggerBatchCollection,
    getBatchDataset,
    triggerImmediateCollection,
    getTriggerImmediateResult,
  };
});

export class BrightDataClient extends Context.Service<BrightDataClient>()(
  "service/BrightDataClient",
  {
    make: BrightDataClientMake,
  },
) { }

// ─── Service ────────────────────────────────────────────────────────────────

const BrightDataServiceMake = Effect.gen(function* () {
  const config = yield* BDConfig;
  const client = yield* BrightDataClient;

  const collectorId = Option.getOrElse(config.BD_COLLECTOR_ID, () => "");

  return {
    createCollector: client.createCollector,
    triggerAIJob: (input: TriggerAIJobInput) => client.triggerAIJob(collectorId, input),
    getAIJobStatus: () => client.getAIJobStatus(collectorId),
    triggerSelfHealing: (input: TriggerSelfHealingInput) =>
      client.triggerSelfHealing(collectorId, input),
    getSelfHealingStatus: () => client.getSelfHealingStatus(collectorId),
    resumeSelfHealing: (input: ResumeSelfHealingInput) =>
      client.resumeSelfHealing(collectorId, input),
    triggerBatchCollection: (
      input: TriggerBatchCollectionInput,
      query: TriggerBatchCollectionQuery = {},
    ) => client.triggerBatchCollection(collectorId, input, query),
    getBatchDataset: (id: string) => client.getBatchDataset(id),
    triggerImmediateCollection: (input: TriggerImmediateInput, query: TriggerImmediateQuery) =>
      client.triggerImmediateCollection(collectorId, input, query),
    getTriggerImmediateResult: (query: GetTriggerImmediateResultQuery) =>
      client.getTriggerImmediateResult(query),
  };
});

export class BrightDataService extends Context.Service<BrightDataService>()("service/brightdata", {
  make: BrightDataServiceMake,
}) { }

// ─── Live Layers ────────────────────────────────────────────────────────────

export const BrightDataClientLive = Layer.effect(BrightDataClient, BrightDataClient.make);
export const BrightDataServiceLive = Layer.effect(BrightDataService, BrightDataService.make);
