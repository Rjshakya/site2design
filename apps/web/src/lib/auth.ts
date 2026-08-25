import { createAuthClient } from "better-auth/react";
import { Env } from "./env";
import { redirect } from "@tanstack/react-router";
export const authClient = createAuthClient({
  baseURL: Env.apiUrl,
});

export const protectedLoader = async () => {
  const { data } = await authClient.getSession();

  if (!data?.session.id) {
    throw redirect({ to: "/" });
  }
};
