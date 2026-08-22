import { Hono } from "hono";
import { cors } from "hono/cors";
import { brightdataRoutes } from "./api/brightdata";

const app = new Hono();

app
  .use(
    "*",
    cors({
      origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
      allowMethods: ["GET", "POST", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .get("/", (c) => c.json({ ok: true, message: "welcome in site2design" }));

app.route("/api/brightdata", brightdataRoutes);

export default app;
