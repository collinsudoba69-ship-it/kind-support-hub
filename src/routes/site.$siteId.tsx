import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Mail, MessageCircle, MessagesSquare, Send, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PlatformAvatar } from "@/components/PlatformAvatar";
import { PaypalSupportLayout } from "@/components/PaypalSupportLayout";
import { WiseSupportLayout } from "@/components/WiseSupportLayout";
import { CoinbaseSupportLayout } from "@/components/CoinbaseSupportLayout";
import { BinanceSupportLayout } from "@/components/BinanceSupportLayout";
import { BybitSupportLayout } from "@/components/BybitSupportLayout";
import { CashAppSupportLayout } from "@/components/CashAppSupportLayout";
import { ChmeSupportLayout } from "@/components/ChmeSupportLayout";

import { CONTACT_METHODS, contactHref, getPlatform, type ContactMethodId } from "@/lib/platforms";
import { fetchSite, type SupportSite } from "@/lib/sites";

const METHOD_ICONS: Record<ContactMethodId, typeof Mail> = {
  whatsapp: MessageCircle,
  email: Mail,
  telegram: Send,
  "live-chat": MessagesSquare,
};

export const Route = createFileRoute("/site/$siteId")({
  head: () => ({
    meta: [
      { title: "Customer Support Desk — Support Sites" },
      {
        name: "description",
        content:
          "Reach a verified support desk directly through WhatsApp, Email, Telegram or Live Chat.",
      },
      { property: "og:title", content: "Customer Support Desk — Support Sites" },
      {
        property: "og:description",
        content: "Reach a verified support desk directly through WhatsApp, Email, Telegram or Live Chat.",
      },
    ],
  }),
  component: SitePage,
});

function SitePage() {
  const { siteId } = Route.useParams();
  const [site, setSite] = useState<SupportSite | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    setReady(false);
    fetchSite(siteId)
      .then((found) => {
        if (active) setSite(found);
      })
      .catch(() => {
        if (active) setSite(null);
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, [siteId]);

  const platform = site ? getPlatform(site.platformId) : undefined;
  const method = site ? CONTACT_METHODS.find((m) => m.id === site.contactMethod) : undefined;
  const Icon = site ? METHOD_ICONS[site.contactMethod] : Mail;

  if (ready && site && site.platformId === "paypal") {
    return <PaypalSupportLayout site={site} />;
  }
  if (ready && site && site.platformId === "wise") {
    return <WiseSupportLayout site={site} />;
  }
  if (ready && site && site.platformId === "coinbase") {
    return <CoinbaseSupportLayout site={site} />;
  }
  if (ready && site && site.platformId === "binance") {
    return <BinanceSupportLayout site={site} />;
  }
  if (ready && site && site.platformId === "bybit") {
    return <BybitSupportLayout site={site} />;
  }
  if (ready && site && site.platformId === "cash-app") {
    return <CashAppSupportLayout site={site} />;
  }
  if (ready && site && site.platformId === "chime") {
    return <ChmeSupportLayout site={site} />;
  }


  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-glow" aria-hidden />

      <div className="relative mx-auto w-full max-w-lg px-5 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back
        </Link>

        {!ready ? null : !site ? (
          <div className="panel mt-10 px-6 py-14 text-center">
            <h1 className="font-display text-2xl font-bold">Support site not found</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              This link may have expired or been removed.
            </p>
          </div>
        ) : (
          <article className="mt-10">
            <div className="panel px-6 py-8 text-center">
              {platform && <PlatformAvatar platform={platform} logoUrl={site?.logoUrl} className="mx-auto size-16 text-xl" />}
              <h1 className="mt-5 font-display text-2xl font-bold">{site.title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{platform?.name} support desk</p>

              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                <ShieldCheck className="size-3.5" aria-hidden />
                Verified contact channel
              </span>

              {site.note?.trim() && (
                <p className="mt-6 text-sm leading-relaxed text-foreground/85">{site.note}</p>
              )}

              <Button variant="ember" size="xl" className="mt-8 w-full" asChild>
                <a
                  href={contactHref(site.contactMethod, site.contactValue)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="size-5" aria-hidden />
                  Contact via {method?.name}
                </a>
              </Button>

              <p className="mt-3 break-all text-xs text-muted-foreground">{site.contactValue}</p>
            </div>

            <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3.5" aria-hidden />
              Created {new Date(site.createdAt).toLocaleDateString()}
            </p>
          </article>
        )}
      </div>
    </main>
  );
}
