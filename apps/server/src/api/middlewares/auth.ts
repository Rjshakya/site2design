import { createMiddleware } from "hono/factory";
import { getAuth } from "../../lib/auth";

export type SessionType = {
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined | undefined;
    userAgent?: string | null | undefined | undefined;
  };
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined | undefined;
  };
} | null;

type Env = {
  Variables: {
    session: SessionType;
  };
};
export const authMiddleware = createMiddleware<Env>(async (c, next) => {
  const auth = await getAuth();
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json(
      {
        ok: false,
        error: "Authentication",
      },
      401,
    );
  }

  c.set("session", session);
  await next();
});
