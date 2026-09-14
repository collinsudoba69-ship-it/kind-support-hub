import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  FileQuestion,
  KeyRound,
  LifeBuoy,
  LockKeyhole,
  Search,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

import type { ComponentType } from "react";
import { Mail, MessageCircle, MessagesSquare, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteLogo } from "@/components/SiteLogo";
import { CONTACT_METHODS, contactHref, type ContactMethodId } from "@/lib/platforms";
import type { SupportSite } from "@/lib/sites";

const BRAND = "#F7A600";

const OFFICIAL_HELP_URL = "https://www.bybit.com/en/help-center/homepage";

const METHOD_ICONS: Record<ContactMethodId, ComponentType<{ className?: string }>> = {
  whatsapp: MessageCircle,
  email: Mail,
  telegram: Send,
  "live-chat": MessagesSquare,
};

const METHOD_CTA: Record<ContactMethodId, string> = {
  whatsapp: "Chat on WhatsApp",
  email: "Email Support",
  telegram: "Message on Telegram",
  "live-chat": "Open Live Chat",
};


const topics = [
  { icon: KeyRound, title: "Account access", text: "Passwords, sign-in and authentication" },
  { icon: BadgeCheck, title: "Identity verification", text: "KYC requirements and account checks" },
  { icon: WalletCards, title: "Deposits & withdrawals", text: "Funding, transfers and transaction status" },
  { icon: LockKeyhole, title: "Security", text: "Protect your account and report concerns" },
];

const articles = [
  "Reset Google Authenticator",
  "Change an email address or mobile number",
  "A crypto deposit has not arrived",
  "Set up account security",
  "Submit a support request",
  "View platform announcements",
];

export function BybitSupportLayout({ site }: { site: SupportSite }) {
  const method = CONTACT_METHODS.find((m) => m.id === site.contactMethod);
  const MethodIcon = METHOD_ICONS[site.contactMethod] ?? Mail;
  const cta = METHOD_CTA[site.contactMethod] ?? "Contact support";
  const href = contactHref(site.contactMethod, site.contactValue);
  return (

    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <SiteLogo site={site} className="size-9 rounded-md border-0" />
            <span className="text-lg font-bold tracking-tight">{site.title}</span>
            <span className="hidden border-l border-border pl-3 text-sm font-medium text-muted-foreground sm:inline">
              Official support links
            </span>
          </div>
          <Button asChild className="rounded-full px-5 font-bold text-black hover:opacity-90" style={{ backgroundColor: BRAND }}>
            <a href={OFFICIAL_HELP_URL} target="_blank" rel="noopener noreferrer">
              Help Center
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </Button>
        </div>
      </header>

      <main>
        <section className="border-b border-border bg-secondary">
          <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:py-24">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground">
              <ShieldCheck className="size-4 text-[#F7A600]" aria-hidden />
              Links verified for bybit.com
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-6xl">{site.title}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Find answers and continue securely to Bybit’s official Help Center for account assistance.
            </p>
            <div className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-md border border-border bg-background p-3 shadow-sm">
              <Search className="ml-2 size-5 shrink-0 text-muted-foreground" aria-hidden />
              <span className="min-w-0 flex-1 text-left text-sm text-muted-foreground">Search account, verification or transaction help</span>
              <Button asChild className="shrink-0 font-bold text-black hover:opacity-90" style={{ backgroundColor: BRAND }}>
                <a href={OFFICIAL_HELP_URL} target="_blank" rel="noopener noreferrer">Search</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-sm font-bold text-[#F7A600]">SUPPORT TOPICS</p>
              <h2 className="mt-2 text-3xl font-bold">What do you need help with?</h2>
            </div>
            <a className="hidden items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground sm:flex" href={OFFICIAL_HELP_URL} target="_blank" rel="noopener noreferrer">
              Browse all <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map(({ icon: Icon, title, text }) => (
              <a key={title} href={OFFICIAL_HELP_URL} target="_blank" rel="noopener noreferrer" className="group rounded-md border border-border bg-card p-6 transition-colors hover:border-[#F7A600]">
                <span className="flex size-11 items-center justify-center rounded-md bg-secondary text-[#F7A600]">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                <ArrowRight className="mt-5 size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-[#F7A600]" aria-hidden />
              </a>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-secondary">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1fr_0.7fr]">
            <div>
              <div className="flex items-center gap-3">
                <BookOpen className="size-6 text-[#F7A600]" aria-hidden />
                <h2 className="text-2xl font-bold">Popular help articles</h2>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {articles.map((article) => (
                  <a key={article} href={OFFICIAL_HELP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 rounded-md border border-border bg-background px-4 py-4 text-sm font-semibold transition-colors hover:border-[#F7A600]">
                    {article}
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                  </a>
                ))}
              </div>
            </div>
            <aside className="rounded-md bg-foreground p-8 text-background">
              <LifeBuoy className="size-8 text-[#F7A600]" aria-hidden />
              <h2 className="mt-5 text-2xl font-bold">Still need assistance?</h2>
              <p className="mt-3 text-sm leading-6 text-background/70">
                Reach the support channel set for this desk and an agent will help you.
              </p>
              <Button asChild size="lg" className="mt-7 w-full font-bold text-black hover:opacity-90" style={{ backgroundColor: BRAND }}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <MethodIcon className="size-5" aria-hidden />
                  {cta}
                </a>
              </Button>
              <p className="mt-4 text-center text-xs text-background/60">{method?.name ?? "Contact"}: {site.contactValue}</p>

            </aside>
          </div>
        </section>
      </main>

      <footer className="px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <SiteLogo site={site} className="size-7 rounded-md border-0" />
          <p>Independent support directory. Bybit links open only on the official bybit.com website.</p>
        </div>
      </footer>

      <Button asChild size="lg" className="fixed bottom-5 right-5 z-50 rounded-full px-5 font-bold text-black shadow-xl hover:opacity-90 sm:bottom-6 sm:right-6" style={{ backgroundColor: BRAND }}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          <MethodIcon className="size-5" aria-hidden />
          {cta}
        </a>

      </Button>
    </div>
  );
}