import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Copy, ExternalLink, LogOut, Pencil, Plus, ShieldCheck, Trash2, Clock } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { SupportWizard } from "@/components/SupportWizard";
import { PlatformAvatar } from "@/components/PlatformAvatar";
import { CONTACT_METHODS, getPlatform } from "@/lib/platforms";
import {
  ADMIN_EMAIL,
  deleteSite,
  fetchSites,
  upsertSite,
  type SupportSite,
} from "@/lib/sites";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Your Support Sites — Admin Dashboard" },
      { name: "description", content: "Create, edit and share your saved customer support pages." },
      { property: "og:title", content: "Your Support Sites — Admin Dashboard" },
      { property: "og:description", content: "Create, edit and share your saved customer support pages." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [sites, setSites] = useState<SupportSite[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<SupportSite | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const isAdmin = (email ?? "").toLowerCase() === ADMIN_EMAIL;

  const refresh = useCallback(async () => {
    try {
      setSites(await fetchSites());
    } catch {
      toast.error("Couldn't load your support sites");
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    void refresh();
  }, [refresh]);

  async function handleSave(site: SupportSite) {
    try {
      await upsertSite(site);
      await refresh();
    } catch {
      toast.error("Couldn't save that support site");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteSite(id);
      setSites((prev) => prev.filter((s) => s.id !== id));
      toast.success("Support site deleted");
    } catch {
      toast.error("Couldn't delete that support site");
    }
  }

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  async function copyUrl(id: string) {
    const url = `${window.location.origin}/site/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    } catch {
      toast.error("Couldn't copy the link");
    }
  }

  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-glow" aria-hidden />

      <div className="relative mx-auto w-full max-w-3xl px-5 pb-24 pt-10 sm:pt-14">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" aria-hidden />
            {email ?? "Signed in"}
          </span>
          <Button variant="soft" size="sm" onClick={signOut}>
            <LogOut className="size-4" aria-hidden />
            Sign out
          </Button>
        </div>

        <header className="mt-10 text-center">
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
            Your support sites
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">
            Everything here is saved securely, so it stays put when you leave and come back.
          </p>

          {isAdmin ? (
            <Button
              variant="ember"
              size="xl"
              className="mt-8"
              onClick={() => {
                setEditing(null);
                setOpen(true);
              }}
            >
              <Plus className="size-5" aria-hidden />
              Create Support Site
            </Button>
          ) : (
            <p className="mt-8 rounded-2xl border border-border bg-surface px-5 py-4 text-sm text-muted-foreground">
              You're signed in with {email}. Only the admin account can create or change support
              sites.
            </p>
          )}
        </header>

        <section className="mt-14" aria-labelledby="your-sites">
          <h2
            id="your-sites"
            className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground"
          >
            Saved sites
          </h2>

          {!ready ? null : sites.length === 0 ? (
            <div className="panel px-6 py-12 text-center">
              <p className="font-display text-lg font-semibold">No support sites yet</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Create your first one and it will show up here.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {sites.map((site) => {
                const platform = getPlatform(site.platformId);
                const method = CONTACT_METHODS.find((m) => m.id === site.contactMethod);
                return (
                  <li key={site.id} className="panel overflow-hidden">
                    <div className="flex items-center gap-3 px-5 pt-5">
                      {platform && <PlatformAvatar platform={platform} logoUrl={site.logoUrl} />}
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-lg font-semibold">{site.title}</p>
                        <p className="truncate text-sm text-muted-foreground">
                          {platform?.name} · {method?.name}
                        </p>
                      </div>
                      <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:inline-flex">
                        <Clock className="size-3.5" aria-hidden />
                        {new Date(site.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-px bg-border">
                      <button
                        type="button"
                        onClick={() => copyUrl(site.id)}
                        className="flex items-center justify-center gap-2 bg-surface px-4 py-3 text-sm font-medium transition-colors hover:bg-surface-raised"
                      >
                        <Copy className="size-4" aria-hidden />
                        Copy URL
                      </button>
                      <Link
                        to="/site/$siteId"
                        params={{ siteId: site.id }}
                        className="flex items-center justify-center gap-2 bg-ember px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                      >
                        <ExternalLink className="size-4" aria-hidden />
                        Visit
                      </Link>
                    </div>

                    {isAdmin && (
                      <div className="grid grid-cols-2 gap-3 p-4">
                        <Button
                          variant="soft"
                          onClick={() => {
                            setEditing(site);
                            setOpen(true);
                          }}
                        >
                          <Pencil className="size-4" aria-hidden />
                          Edit
                        </Button>
                        <Button variant="danger" onClick={() => void handleDelete(site.id)}>
                          <Trash2 className="size-4" aria-hidden />
                          Delete
                        </Button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      <SupportWizard
        open={open}
        onOpenChange={setOpen}
        onSave={(site) => void handleSave(site)}
        editing={editing}
      />
    </main>
  );
}
