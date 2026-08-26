import { ConfigProvider, Effect, Layer } from "effect";
import { Hono } from "hono";
import { env } from "cloudflare:workers";
import { effectValidator } from "../lib/effect-validator";
import { ApiFetchError } from "../lib/fetch";
import { PgDBLive, DB } from "../db/service";
import {
  BrightDataClientLive,
  BrightDataService,
  BrightDataServiceLive,
} from "../services/brightdata/service";
import { InvalidExtractionError } from "../services/extractor/errors";
import { ExtractInputSchema } from "../services/extractor/schema";
import { extract } from "../services/extractor/service";
import { buildDesignSystem } from "../services/design-system/service";

// ─── Layer wiring ───────────────────────────────────────────────────────────

const runWithEnv = <A, E>(program: Effect.Effect<A, E, BrightDataService | DB>) =>
  Effect.runPromise(
    Effect.provide(
      program,
      Layer.provideMerge(
        BrightDataServiceLive.pipe(
          Layer.provide(BrightDataClientLive),
          Layer.provide(ConfigProvider.layer(ConfigProvider.fromUnknown(env))),
        ),
        PgDBLive,
      ),
    ),
  );

function errorStatus(e: unknown): { status: 400 | 404 | 422 | 500 | 502; message: string } {
  if (e instanceof InvalidExtractionError) {
    return { status: 422, message: e.message };
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
export const extractorRoutes = new Hono().post(
  "/",
  effectValidator("json", ExtractInputSchema),
  async (c) => {
    const input = c.req.valid("json");

    const outcome = await runWithEnv(
      extract(input, { collector: env.BD_COLLECTOR_ID }).pipe(
        Effect.match({
          onFailure: (e) => {
            console.error(e);
            return { ok: false as const, ...errorStatus(e) };
          },
          onSuccess: (result) => ({ ok: true as const, result }),
        }),
      ),
    );

    if (!outcome.ok) return c.json({ error: outcome.message }, outcome.status);
    return c.json(outcome.result);
  },
)
  .post(
    "/design-system",
    effectValidator("json", ExtractInputSchema),
    async (c) => {
      const input = c.req.valid("json");

      const outcome = await runWithEnv(
        buildDesignSystem(input.url.href).pipe(
          Effect.match({
            onFailure: (e) => {
              console.error(e);
              return { ok: false as const, ...errorStatus(e) };
            },
            onSuccess: (result) => ({ ok: true as const, result }),
          }),
        ),
      );

      if (!outcome.ok) return c.json({ error: outcome.message }, outcome.status);
      return c.json(outcome.result);
    },
  );
