import { Hono } from "hono";
import { ConfigProvider, Effect, Layer } from "effect";
import { effectValidator } from "../lib/effect-validator";
import { PgDBLive } from "../db/service";
import {
  BrightDataService,
  BrightDataServiceLive,
  BrightDataClientLive,
} from "../services/brightdata/service";
import { CollectorSetupInput, createCollector } from "../services/brightdata/collector";
import { HealCollectorInput, healCollector } from "../services/brightdata/healing";
import { CollectorSetupError } from "../services/brightdata/errors";
import {
  TriggerAIJobInputSchema,
  TriggerSelfHealingInputSchema,
  ResumeSelfHealingInputSchema,
  TriggerBatchCollectionInputSchema,
  TriggerBatchCollectionQuerySchema,
  BatchDatasetQuerySchema,
  TriggerImmediateInputSchema,
  GetTriggerImmediateResultQuerySchema,
} from "../services/brightdata/schema";
import { ApiFetchError } from "../lib/fetch";
import { env } from "cloudflare:workers";

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
  if (e instanceof CollectorSetupError) {
    return { status: 500, message: e.message };
  }
  if (e instanceof ApiFetchError) {
    if (e.status >= 400 && e.status < 500) {
      return { status: e.status as 400 | 404 | 422, message: e.message };
    }
    return { status: 502, message: e.message };
  }
  return { status: 500, message: "internal error" };
}

// ─── Routes ─────────────────────────────────────────────────────────────────
export const brightdataRoutes = new Hono()
  .post("/collector", effectValidator("json", CollectorSetupInput), async (c) => {
    const input = c.req.valid("json");

    const outcome = await Effect.runPromise(
      Effect.provide(
        createCollector(input).pipe(
          Effect.match({
            onFailure: (e) => ({ ok: false as const, ...errorStatus(e) }),
            onSuccess: (result) => ({ ok: true as const, result }),
          }),
        ),
        Layer.provide(
          Layer.provideMerge(BrightDataClientLive, PgDBLive),
          ConfigProvider.layer(ConfigProvider.fromUnknown(env)),
        ),
      ),
    );

    if (!outcome.ok) return c.json({ error: outcome.message }, outcome.status);
    return c.json(outcome.result);
  })
  .post("/collector/heal", effectValidator("json", HealCollectorInput), async (c) => {
    const input = c.req.valid("json");

    const outcome = await Effect.runPromise(
      Effect.provide(
        healCollector(input).pipe(
          Effect.match({
            onFailure: (e) => ({ ok: false as const, ...errorStatus(e) }),
            onSuccess: (result) => ({ ok: true as const, result }),
          }),
        ),
        Layer.provide(
          Layer.provideMerge(BrightDataClientLive, PgDBLive),
          ConfigProvider.layer(ConfigProvider.fromUnknown(env)),
        ),
      ),
    );

    if (!outcome.ok) return c.json({ error: outcome.message }, outcome.status);
    return c.json(outcome.result);
  })
  .post("/ai-job", effectValidator("json", TriggerAIJobInputSchema), async (c) => {
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
  })
  .get("/ai-job/progress", async (c) => {
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
  })
  .post("/self-healing", effectValidator("json", TriggerSelfHealingInputSchema), async (c) => {
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
  })
  .get("/self-healing/progress", async (c) => {
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
  })
  .post(
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
  )
  .get("/batch/dataset", effectValidator("query", BatchDatasetQuerySchema), async (c) => {
    const { id } = c.req.valid("query");
    const outcome = await runWithEnv(
      BrightDataService.use((svc) => svc.getBatchDataset(id)).pipe(
        Effect.match({
          onFailure: (e) => ({ ok: false as const, ...errorStatus(e) }),
          onSuccess: (result) => ({ ok: true as const, result }),
        }),
      ),
    );
    if (!outcome.ok) return c.json({ error: outcome.message }, outcome.status);
    if ("status" in outcome.result) return c.json(outcome.result, 202);
    return c.json(outcome.result);
  })
  .post(
    "/batch/trigger",
    effectValidator("json", TriggerBatchCollectionInputSchema),
    effectValidator("query", TriggerBatchCollectionQuerySchema),
    async (c) => {
      const input = c.req.valid("json");
      const query = c.req.valid("query");
      const outcome = await runWithEnv(
        BrightDataService.use((svc) =>
          svc.triggerBatchCollection(input, { collector: env.BD_COLLECTOR_ID, ...query }),
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
  )
  .post(
    "/trigger",
    effectValidator("json", TriggerImmediateInputSchema),
    // effectValidator("query", TriggerImmediateQuerySchema),
    async (c) => {
      const input = c.req.valid("json");
      // const query = c.req.valid("query");
      const outcome = await runWithEnv(
        BrightDataService.use((svc) =>
          svc.triggerImmediateCollection(input, { collector: env.BD_COLLECTOR_ID }),
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
  )
  .get("/result", effectValidator("query", GetTriggerImmediateResultQuerySchema), async (c) => {
    const query = c.req.valid("query");
    const outcome = await runWithEnv(
      BrightDataService.use((svc) => svc.getTriggerImmediateResult(query)).pipe(
        Effect.match({
          onFailure: (e) => ({ ok: false as const, ...errorStatus(e) }),
          onSuccess: (result) => ({ ok: true as const, result }),
        }),
      ),
    );
    if (!outcome.ok) return c.json({ error: outcome.message }, outcome.status);
    return c.json(outcome.result);
  });
