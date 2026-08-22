import { Context, Effect, Layer } from "effect";
import { bdclient } from "@brightdata/sdk";
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
  TriggerCollectionInput,
  TriggerCollectionQuery,
  TriggerCollectionResult,
  DatasetResult,
} from "./type";

// ─── Constants ──────────────────────────────────────────────────────────────

const BD_BASE_URL = "https://api.brightdata.com";

// ─── Client ─────────────────────────────────────────────────────────────────

const BrightDataClientMake = Effect.gen(function* () {
  const { BD_CONFIG } = yield* AppConfig;
  const { BD_API_TOKEN } = BD_CONFIG;

  console.log("BD_COFIG", BD_CONFIG);

  const client = new bdclient({ apiKey: BD_API_TOKEN });

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

  const triggerCollection = (
    collectorId: string,
    inputs: TriggerCollectionInput,
    query: TriggerCollectionQuery,
  ) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) params.set(key, String(value));
    }
    params.set("collector", query.collector ?? collectorId);

    return apiFetch<TriggerCollectionResult>(
      {
        apiToken: BD_API_TOKEN,
        base_url: BD_BASE_URL,
        path: `/dca/trigger?${params.toString()}`,
        init: { method: "POST", body: JSON.stringify(inputs) },
      },
      "BrightDataFetchError",
    );
  };

  const getDataset = (id: string) =>
    apiFetch<DatasetResult>(
      {
        apiToken: BD_API_TOKEN,
        base_url: BD_BASE_URL,
        path: `/dca/dataset?id=${encodeURIComponent(id)}`,
      },
      "BrightDataFetchError",
    );

  return {
    client,
    createCollector,
    triggerAIJob,
    getAIJobStatus,
    triggerSelfHealing,
    getSelfHealingStatus,
    resumeSelfHealing,
    triggerCollection,
    getDataset,
  };
});

export class BrightDataClient extends Context.Service<BrightDataClient>()(
  "service/BrightDataClient",
  {
    make: BrightDataClientMake,
  },
) {}

// ─── Service ────────────────────────────────────────────────────────────────

const BrightDataServiceMake = Effect.gen(function* () {
  const config = yield* BDConfig;
  const client = yield* BrightDataClient;

  return {
    createCollector: client.createCollector,
    triggerAIJob: (input: TriggerAIJobInput) => client.triggerAIJob(config.BD_COLLECTOR_ID, input),
    getAIJobStatus: () => client.getAIJobStatus(config.BD_COLLECTOR_ID),
    triggerSelfHealing: (input: TriggerSelfHealingInput) =>
      client.triggerSelfHealing(config.BD_COLLECTOR_ID, input),
    getSelfHealingStatus: () => client.getSelfHealingStatus(config.BD_COLLECTOR_ID),
    resumeSelfHealing: (input: ResumeSelfHealingInput) =>
      client.resumeSelfHealing(config.BD_COLLECTOR_ID, input),
    triggerCollection: (input: TriggerCollectionInput, query: TriggerCollectionQuery = {}) =>
      client.triggerCollection(config.BD_COLLECTOR_ID, input, query),
    getDataset: (id: string) => client.getDataset(id),
  };
});

export class BrightDataService extends Context.Service<BrightDataService>()("service/brightdata", {
  make: BrightDataServiceMake,
}) {}

// ─── Live Layers ────────────────────────────────────────────────────────────

export const BrightDataClientLive = Layer.effect(BrightDataClient, BrightDataClient.make);
export const BrightDataServiceLive = Layer.effect(BrightDataService, BrightDataService.make);
