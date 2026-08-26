import { Effect, Schema } from "effect";

export const ApiFetchErrorTypes = Schema.Literals(["ApiFetchError", "BrightDataFetchError"]);

export class ApiFetchError extends Schema.TaggedError<ApiFetchError>()("ApiFetchError", {
  message: Schema.String,
  type: ApiFetchErrorTypes,
  status: Schema.Number,
}) {}

interface ApiFetchInput {
  apiToken?: string;
  path: string;
  base_url: string;
  init?: RequestInit;
}

export const apiFetch = <A>(input: ApiFetchInput, errorType: typeof ApiFetchErrorTypes.Type) => {
  const { apiToken, path, base_url, init } = input;
  const url = new URL(path, base_url);

  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");

  if (apiToken) {
    headers.set("Authorization", `Bearer ${apiToken}`);
  }

  return Effect.tryPromise({
    try: async () => {
      const response = await fetch(url, {
        ...init,
        headers,
      });

      if (!response.ok) {
        const text = await response.text();
        throw {
          message: text || `got error with status (${response.status})`,
          status: response.status,
        };
      }

      if (response.status === 204 || response.headers.get("content-length") === "0") {
        return null as A;
      }
      return (await response.json()) as A;
    },
    catch: (error: any) =>
      new ApiFetchError({
        message: error?.message ?? JSON.stringify(error),
        type: errorType,
        status: error?.status ?? 502,
      }),
  });
};
