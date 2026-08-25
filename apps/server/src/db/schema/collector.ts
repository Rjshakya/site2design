import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const collector = pgTable("collector", {
  id: t.text("id").primaryKey(), // BD collector id
  name: t.text("name").notNull(),
  urls: t.jsonb("urls").$type<string[]>(),
  status: t.text("status").notNull(), // "ready" | "failed"
  createdAt: t.timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
  updatedAt: t.timestamp("updated_at", { precision: 6, withTimezone: true }).notNull(),
});
