import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { useSignIn } from "../../../hooks/use-sign-in";

export function SignInForm() {
  const router = useRouter();
  const signIn = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    signIn.mutate(
      { email, password },
      {
        onSuccess: () => {
          router.navigate({ to: "/dashboard" });
        },
      },
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>
      {signIn.error && <p className="text-xs text-destructive">{signIn.error.message}</p>}
      <Button type="submit" className="mt-1" disabled={signIn.isPending}>
        {signIn.isPending ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
