import { Cause, Exit, Option, Schema } from "effect";
import { validator } from "hono/validator";
import type { ValidationTargets } from "hono";

type Target = keyof ValidationTargets;

export const effectValidator = <S extends Schema.Decoder<any, never>>(target: Target, schema: S) =>
  validator(target, async (value, c) => {
    const result = Schema.decodeUnknownExit(schema)(value);

    if (Exit.isFailure(result)) {
      const failure = Cause.findErrorOption(result.cause);
      const message = Option.isSome(failure) ? failure.value.message : "validation failed";
      return c.json({ success: false, error: message }, 400);
    }
    c.req.addValidatedData(target, result.value as object);
    return result.value;
  });

