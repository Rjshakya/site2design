import { Hono } from "hono";
import { Schema } from "effect";
import { env } from "cloudflare:workers";
import { effectValidator } from "../lib/effect-validator";
import { getComputedStyles } from "../services/browser";

const DumpInputSchema = Schema.Struct({
  url: Schema.URLFromString,
});

export const browserRoutes = new Hono().post(
  "/dump",
  effectValidator("json", DumpInputSchema),
  async (c) => {
    const { url } = c.req.valid("json");
    try {
      const styles = await getComputedStyles(env.MYBROWSER, url.href);
      return c.json(styles);
    } catch (error) {
      console.error(error);
      return c.json({ error: "browser extraction failed" }, 500);
    }
  },
);