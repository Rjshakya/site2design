import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { user, account, session, verification } from "../db/schema/auth";
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "cloudflare:workers";


export const dbforAuth = async () => drizzle(env.HYPERDRIVE.connectionString);

export const getAuth = async () => {
  const db = await dbforAuth();

  return betterAuth({
    emailAndPassword: {
      enabled: true,
    },
    trustedOrigins: ["http://localhost:3000"],

    database: drizzleAdapter(db, {
      provider: "pg", // or "mysql", "sqlite"
      schema: {
        account,
        user,
        session,
        verification,
      },
    }),
  });
};
