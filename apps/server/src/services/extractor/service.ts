import { Effect, Option, Predicate, Schedule, Schema } from "effect";
import { BrightDataService } from "../brightdata/service";
import { COLLECTOR_NAME, getLatestCollector } from "../brightdata/collector";
import type { TriggerImmediateQuery, GetTriggerImmediatePendingResult } from "../brightdata/type";
import { ExpectedExtractOutputSchema } from "./schema";
import { InvalidExtractionError } from "./errors";
import type { ExtractInput, ExtractOutput as ExtractOutputType } from "./type";

const isPending = (value: unknown): value is GetTriggerImmediatePendingResult => {
  console.log('value', value)
  return Predicate.isObject(value) && "pending" in value && value.pending === true
}

export const extract = (input: ExtractInput, query: TriggerImmediateQuery) =>
  Effect.gen(function* () {
    const bdService = yield* BrightDataService;

    // get latest collector from db
    const latest = yield* getLatestCollector(COLLECTOR_NAME);


    if (Option.isNone(latest)) {
      return yield* new InvalidExtractionError({
        message: `no collector found with name "${COLLECTOR_NAME}" — create one first`,
      });
    }

    const { response_id } = yield* bdService.triggerImmediateCollection(
      { url: input.url.href },
      { ...query, collector: latest.value.id },
    );

    const rows = yield* Effect.repeat(bdService.getTriggerImmediateResult({ response_id }), {
      until: (result) => !isPending(result),
      times: 12,
      schedule: Schedule.fixed("5 seconds")
    });

    console.log(rows)

    const parse = yield* Schema.decodeUnknownEffect(ExpectedExtractOutputSchema)(rows).pipe(
      Effect.mapError(
        () =>
          new InvalidExtractionError({
            message: "extraction rows did not match the expected schema",
          }),
      ),
    );

    const output: ExtractOutputType[] = parse.map((o) => {
      return {
        page_url: o.page_url,
        title: o.title,
        description: o.description,
        csslinks: o.csslinks,
        inline_styles: o.inline_styles,
        fonturls: o.fonturls,
        og_image: o.og_image,
        brand_assets: o.brand_assets,
      };
    });

    return output;
  });
