import { createFileRoute, redirect } from "@tanstack/react-router";
import { authClient, protectedLoader } from "../../lib/auth";
import { useSignOut } from "../../hooks/use-sign-out";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { ExtractDemo } from "./components/extract-demo";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
  beforeLoad: protectedLoader,
  ssr: false,
});

function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const signOut = useSignOut();

  if (isPending) {
    return null;
  }

  if (!session) {
    throw redirect({ to: "/sign" });
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-lg font-medium">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Signed in as {session.user.name} · {session.user.email}
          </p>
        </div>
        <Button variant="outline" onClick={() => signOut.mutate()} disabled={signOut.isPending}>
          {signOut.isPending ? "Signing out..." : "Sign Out"}
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Site Extractor</CardTitle>
          <CardDescription>
            Submit a URL to extract design assets from the page (CSS, fonts, brand assets, og
            image).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExtractDemo />
        </CardContent>
      </Card>
    </main>
  );
}
