import { Hono } from "hono";
import { ConfigProvider, Exit, Effect, Layer } from "effect";
import { effectValidator } from "../lib/effect-validator";
import {
  BrightDataService,
  BrightDataServiceLive,
  BrightDataClientLive,
} from "../services/brightdata/service";
import {
  CreateCollectorInputSchema,
  TriggerAIJobInputSchema,
  TriggerSelfHealingInputSchema,
  ResumeSelfHealingInputSchema,
  TriggerCollectionInputSchema,
  TriggerCollectionQuerySchema,
  DatasetQuerySchema,
} from "../services/brightdata/schema";
import { ApiFetchError } from "../lib/fetch";
import { env } from "cloudflare:workers";

export const brightdataRoutes = new Hono();

// ─── Layer wiring ───────────────────────────────────────────────────────────

const runWithEnv = <A, E>(program: Effect.Effect<A, E, BrightDataService>) =>
  Effect.runPromise(
    Effect.provide(
      program,
      BrightDataServiceLive.pipe(
        Layer.provide(BrightDataClientLive),
        Layer.provide(ConfigProvider.layer(ConfigProvider.fromUnknown(env))),
      ),
    ),
  );

function errorStatus(e: unknown): { status: 400 | 404 | 422 | 500 | 502; message: string } {
  if (e instanceof ApiFetchError) {
    if (e.status >= 400 && e.status < 500) {
      return { status: e.status as 400 | 404 | 422, message: e.message };
    }
    return { status: 502, message: e.message };
  }
  return { status: 500, message: "internal error" };
}

// ─── Routes ─────────────────────────────────────────────────────────────────

brightdataRoutes.post(
  "/collector",
  effectValidator("json", CreateCollectorInputSchema),
  async (c) => {
    const input = c.req.valid("json");

    const program = BrightDataService.use((s) => s.createCollector(input)).pipe(
      Effect.provide(
        BrightDataServiceLive.pipe(
          Layer.provide(BrightDataClientLive),
          Layer.provide(ConfigProvider.layer(ConfigProvider.fromUnknown(env))),
        ),
      ),
    );

    const result = await Effect.runPromiseExit(program);

    if (Exit.isFailure(result)) {
      throw result.cause.reasons.join(",");
    }

    return c.json({ ok: true, data: result.value });
  },
);

brightdataRoutes.post("/ai-job", effectValidator("json", TriggerAIJobInputSchema), async (c) => {
  const input = c.req.valid("json");
  const outcome = await runWithEnv(
    BrightDataService.use((svc) => svc.triggerAIJob(input)).pipe(
      Effect.match({
        onFailure: (e) => ({ ok: false as const, ...errorStatus(e) }),
        onSuccess: (result) => ({ ok: true as const, result }),
      }),
    ),
  );
  if (!outcome.ok) return c.json({ error: outcome.message }, outcome.status);
  return c.json(outcome.result);
});

brightdataRoutes.get("/ai-job/progress", async (c) => {
  const outcome = await runWithEnv(
    BrightDataService.use((svc) => svc.getAIJobStatus()).pipe(
      Effect.match({
        onFailure: (e) => ({ ok: false as const, ...errorStatus(e) }),
        onSuccess: (result) => ({ ok: true as const, result }),
      }),
    ),
  );
  if (!outcome.ok) return c.json({ error: outcome.message }, outcome.status);
  return c.json(outcome.result);
});

brightdataRoutes.post(
  "/self-healing",
  effectValidator("json", TriggerSelfHealingInputSchema),
  async (c) => {
    const input = c.req.valid("json");
    const outcome = await runWithEnv(
      BrightDataService.use((svc) => svc.triggerSelfHealing(input)).pipe(
        Effect.match({
          onFailure: (e) => ({ ok: false as const, ...errorStatus(e) }),
          onSuccess: (result) => ({ ok: true as const, result }),
        }),
      ),
    );
    if (!outcome.ok) return c.json({ error: outcome.message }, outcome.status);
    return c.json(outcome.result);
  },
);

brightdataRoutes.get("/self-healing/progress", async (c) => {
  const outcome = await runWithEnv(
    BrightDataService.use((svc) => svc.getSelfHealingStatus()).pipe(
      Effect.match({
        onFailure: (e) => ({ ok: false as const, ...errorStatus(e) }),
        onSuccess: (result) => ({ ok: true as const, result }),
      }),
    ),
  );
  if (!outcome.ok) return c.json({ error: outcome.message }, outcome.status);
  return c.json(outcome.result);
});

brightdataRoutes.post(
  "/self-healing/resume",
  effectValidator("json", ResumeSelfHealingInputSchema),
  async (c) => {
    const input = c.req.valid("json");
    const outcome = await runWithEnv(
      BrightDataService.use((svc) => svc.resumeSelfHealing(input)).pipe(
        Effect.match({
          onFailure: (e) => ({ ok: false as const, ...errorStatus(e) }),
          onSuccess: (result) => ({ ok: true as const, result }),
        }),
      ),
    );
    if (!outcome.ok) return c.json({ error: outcome.message }, outcome.status);
    return c.json(outcome.result);
  },
);

brightdataRoutes.get("/dataset", effectValidator("query", DatasetQuerySchema), async (c) => {
  const { id } = c.req.valid("query");
  const outcome = await runWithEnv(
    BrightDataService.use((svc) => svc.getDataset(id)).pipe(
      Effect.match({
        onFailure: (e) => ({ ok: false as const, ...errorStatus(e) }),
        onSuccess: (result) => ({ ok: true as const, result }),
      }),
    ),
  );
  if (!outcome.ok) return c.json({ error: outcome.message }, outcome.status);
  if ("status" in outcome.result) return c.json(outcome.result, 202);
  return c.json(outcome.result);
});

brightdataRoutes.post(
  "/trigger",
  effectValidator("json", TriggerCollectionInputSchema),
  effectValidator("query", TriggerCollectionQuerySchema),
  async (c) => {
    const input = c.req.valid("json");
    // const query = c.req.valid("query");
    const outcome = await runWithEnv(
      BrightDataService.use((svc) =>
        svc.triggerCollection(input, { collector: env.BD_COLLECTOR_ID }),
      ).pipe(
        Effect.match({
          onFailure: (e) => ({ ok: false as const, ...errorStatus(e) }),
          onSuccess: (result) => ({ ok: true as const, result }),
        }),
      ),
    );
    if (!outcome.ok) return c.json({ error: outcome.message }, outcome.status);
    return c.json(outcome.result);
  },
);
