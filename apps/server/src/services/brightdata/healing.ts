import { Effect, Option, Schedule, Schema } from "effect";
import { DB } from "../../db/service";
import { COLLECTOR_NAME, getLatestCollector } from "./collector";
import { CollectorSetupError } from "./errors";
import { BrightDataClient } from "./service";

export const HealCollectorInput = Schema.Struct({
  prompt: Schema.String.pipe(Schema.check(Schema.isMaxLength(1000))),
});

export const healCollector = (input: { prompt: string }) =>
  Effect.gen(function* () {
    const bd = yield* BrightDataClient;

    // resolve the collector extraction actually uses (same as extract())
    const latest = yield* getLatestCollector(COLLECTOR_NAME);
    if (Option.isNone(latest)) {
      return yield* new CollectorSetupError({
        message: `no collector found with name "${COLLECTOR_NAME}" — create one first`,
      });
    }
    const collectorId = latest.value.id;

    // 1. trigger the self-healing refactor job
    yield* bd.triggerSelfHealing(collectorId, { prompt: input.prompt });

    // 2. poll until it pauses for approval or finishes
    const progress = yield* Effect.repeat(bd.getSelfHealingStatus(collectorId), {
      until: (p) =>
        p.status === "done" ||
        p.status === "failed" ||
        p.status === "error" ||
        p.status === "pending_answer",
      times: 360,
      schedule: Schedule.fixed("5 seconds"),
    });

    // 3. auto-approve the proposed diff and auto-save the healed template
    if (progress.status === "pending_answer") {
      yield* bd.resumeSelfHealing(collectorId, { message: true, auto_save: true });

      const final = yield* Effect.repeat(bd.getSelfHealingStatus(collectorId), {
        until: (p) => p.status === "done" || p.status === "failed" || p.status === "error",
        times: 360,
        schedule: Schedule.fixed("5 seconds"),
      });
      if (final.status !== "done") {
        return yield* new CollectorSetupError({
          message: `healing job ended with status ${final.status}: ${final.step}`,
        });
      }
      return final;
    }

    if (progress.status !== "done") {
      return yield* new CollectorSetupError({
        message: `healing job ended with status ${progress.status}: ${progress.step}`,
      });
    }
    return progress;
  });