import * as PgDrizzle from "drizzle-orm/effect-postgres";
import { PgClient } from "@effect/sql-pg";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { types } from "pg";
import { env } from "cloudflare:workers";

// Configure the PgClient layer
const PgClientLive = Layer.unwrap(Effect.sync(() => PgClient.layer({
  url: Redacted.make(env.HYPERDRIVE.connectionString),
  types: {
    getTypeParser: (typeId, format) => {
      if ([1184, 1114, 1082, 1186, 1231, 1115, 1185, 1187, 1182].includes(typeId)) {
        return (val: any) => val;
      }
      return types.getTypeParser(typeId, format);
    },
  },
})))

// Create the DB effect with defq@qault service
const dbEffect = PgDrizzle.make().pipe(Effect.provide(PgDrizzle.DefaultServices));

// Define a DB service tag for dependency injection
export class DB extends Context.Service<DB>()("db/service", {
  make: PgDrizzle.make,
}) { }

// Create a layer that provides the DB service
const DBLive = Layer.effect(
  DB,
  Effect.gen(function* () {
    return yield* dbEffect;
  }),
);

// Compose all layers together
export const PgDBLive = Layer.provideMerge(DBLive, PgClientLive);
