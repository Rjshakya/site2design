import { Effect, Option, Schedule, Schema } from "effect";
import { desc, eq } from "drizzle-orm";
import { DB } from "../../db/service";
import { collector } from "../../db/schema/collector";
import { EXTRACT_PROMPT } from "../extractor/prompt";
import { CollectorSetupError } from "./errors";
import { BrightDataClient } from "./service";

export const COLLECTOR_NAME = "site2design-extractor";

const DELIVER_WEBHOOK_URL = "https://nonbearing-unvenomous-gita.ngrok-free.dev";

export const CollectorSetupInput = Schema.Struct({
  name: Schema.String,
  urls: Schema.Array(Schema.String),
});

export const createCollector = (input: { name: string; urls: ReadonlyArray<string> }) =>
  Effect.gen(function* () {
    const bd = yield* BrightDataClient;
    const db = yield* DB;



    // 1. create the collector on Bright Data (webhook delivery; we pull results via API)
    const created = yield* bd.createCollector({
      name: COLLECTOR_NAME,
      deliver: { type: "webhook", endpoint: DELIVER_WEBHOOK_URL },
    });

    // 2. train it with the extraction prompt (queued: false in the response is fine, we poll anyway)
    yield* bd.triggerAIJob(created.id, { description: EXTRACT_PROMPT, urls: input.urls });


    // 3. poll the AI job until done/failed — ~30 min budget
    const progress = yield* Effect.repeat(bd.getAIJobStatus(created.id), {
      until: (p) => p.status === "done" || p.status === "failed" || p.status === "error",
      times: 360,
      schedule: Schedule.fixed("5 seconds"),
    });

    if (progress.status !== "done") {
      return yield* new CollectorSetupError({
        message: `ai job ended with status ${progress.status}: ${progress.step}`,
      });
    }


    // 4. persist as ready
    yield* db.insert(collector).values({
      id: created.id,
      name: COLLECTOR_NAME,
      urls: [...input.urls],
      status: "ready",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return created;
  });

export const getLatestCollector = (name: string) =>
  Effect.gen(function* () {
    const db = yield* DB;
    const rows = yield* db
      .select()
      .from(collector)
      .where(eq(collector.name, name))
      .orderBy(desc(collector.createdAt))
      .limit(1);
    return rows.length > 0 ? Option.some(rows[0]) : Option.none();
  });
