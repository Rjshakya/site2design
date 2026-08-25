import { Hono } from "hono";
import { cors } from "hono/cors";
import { brightdataRoutes } from "./api/brightdata";
import { extractorRoutes } from "./api/extractor";
import { getAuth } from "./lib/auth";
import { authMiddleware } from "./api/middlewares/auth";

export const app = new Hono()
  .use(
    "*",
    cors({
      origin: ["http://localhost:3000"],
      allowMethods: ["GET", "POST", "PATCH", "OPTIONS"],
      credentials: true,
    }),
  )
  .get("/", (c) => c.json({ ok: true, message: "welcome in site2design" }))
  .all("/api/auth/*", async (c) => {
    const auth = await getAuth();
    return auth.handler(c.req.raw);
  })
  .post("/webhook", async (c) => {
    const body = await c.req.json();
    console.log(body);
    return c.json("ok", 201);
  })
  .use(authMiddleware)
  .route("/api/brightdata", brightdataRoutes)
  .route("/api/extractor", extractorRoutes);

export default app;
