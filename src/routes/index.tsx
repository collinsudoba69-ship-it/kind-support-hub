import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Support Sites — Build a Customer Support Page in Minutes" },
      {
        name: "description",
        content:
          "Create branded customer support pages for Binance, PayPal, Wise, Trust Wallet and more. Pick a platform, choose a contact method, and share the link.",
      },
      { property: "og:title", content: "Support Sites — Build a Customer Support Page in Minutes" },
      {
        property: "og:description",
        content:
          "Pick a platform, choose how clients reach you, and publish a clean support page in under a minute.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(Boolean(data.session)));
  }, []);

  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-glow" aria-hidden />

      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center px-5 pb-24 pt-20 text-center sm:pt-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-muted-foreground">
          <ShieldCheck className="size-3.5 text-primary" aria-hidden />
          Support Sites
        </span>

        <h1 className="mt-6 font-display text-4xl font-bold leading-tight sm:text-5xl">
          Customer support pages,
          <br />
          ready in a minute
        </h1>
        <p className="mt-4 max-w-md text-base text-muted-foreground">
          Choose the platform you support, pick how clients reach you, and share one clean link.
          Everything you create is saved securely to your account.
        </p>

        <Button
          variant="ember"
          size="xl"
          className="mt-8"
          onClick={() => navigate({ to: signedIn ? "/dashboard" : "/auth" })}
        >
          <Lock className="size-5" aria-hidden />
          {signedIn ? "Open your dashboard" : "Admin sign in"}
          <ArrowRight className="size-5" aria-hidden />
        </Button>

        <p className="mt-6 text-xs text-muted-foreground">
          Shared support links stay public — only the admin can create or change them.{" "}
          <Link to="/auth" className="font-semibold text-foreground hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
