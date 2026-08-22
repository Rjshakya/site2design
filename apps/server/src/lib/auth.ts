import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { dbforAuth } from "../db/service";

export const auth = async () => {
  const db = await dbforAuth();

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg", // or "mysql", "sqlite"
    }),
  });
};
