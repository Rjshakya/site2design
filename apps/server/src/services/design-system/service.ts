import { Effect, Schema } from "effect";
import { extract } from "../extractor/service";
import { InvalidExtractionError } from "../extractor/errors";
import { mapDesignSystem } from "./map";
import { fetchCss, mineCss } from "./mine";
import { DesignSystemSchema } from "./tokens";

export const buildDesignSystem = (url: string) =>
  Effect.gen(function* () {
    const outputs = yield* extract({ url: new URL(url) }, { collector: "" });
    const output = outputs[0];
    if (!output) {
      return yield* new InvalidExtractionError({
        message: "no extraction rows returned",
      });
    }

    const cssTexts = yield* Effect.tryPromise({
      try: () => fetchCss(output.csslinks),
      catch: () =>
        new InvalidExtractionError({ message: "failed to fetch stylesheets" }),
    });

    const mined = mineCss([...output.inline_styles, ...cssTexts]);
    const design = mapDesignSystem(output, mined);

    return yield* Schema.decodeUnknownEffect(DesignSystemSchema)(design).pipe(
      Effect.mapError(
        () =>
          new InvalidExtractionError({
            message: "design system did not match the expected schema",
          }),
      ),
    );
  });