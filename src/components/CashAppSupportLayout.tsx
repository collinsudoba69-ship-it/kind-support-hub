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

import cashAppLogo from "@/assets/cashapp-logo.svg.asset.json";
import { Button } from "@/components/ui/button";
import { CONTACT_METHODS, contactHref, type ContactMethodId } from "@/lib/platforms";
import type { SupportSite } from "@/lib/sites";

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

const BRAND = "#00D632";

const OFFICIAL_HELP_URL = "https://cash.app/help";
const OFFICIAL_CONTACT_URL = "https://cash.app/contact";

const topics = [
  { icon: KeyRound, title: "Account access", text: "Sign-in, PINs and account recovery" },
  { icon: BadgeCheck, title: "Identity verification", text: "Confirming your identity on Cash App" },
  { icon: WalletCards, title: "Payments & Cash Card", text: "Sending, receiving and card questions" },
  { icon: LockKeyhole, title: "Security & scams", text: "Protect your account and report fraud" },
];

const articles = [
  "Cancel a payment",
  "Recognise and report a scam",
  "Verify your Cash App account",
  "Activate or replace a Cash Card",
  "Add or remove a bank account",
  "Contact Cash App Support",
];

export function CashAppSupportLayout({ site }: { site: SupportSite }) {
  const method = CONTACT_METHODS.find((m) => m.id === site.contactMethod);
  const MethodIcon = METHOD_ICONS[site.contactMethod] ?? Mail;
  const cta = METHOD_CTA[site.contactMethod] ?? "Contact support";
  const href = contactHref(site.contactMethod, site.contactValue);
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <img src={cashAppLogo.url} alt="Cash App" className="size-8 shrink-0 rounded-lg object-contain" />
            <span className="hidden border-l border-border pl-3 text-sm font-medium text-muted-foreground sm:inline">
              Official support links
            </span>
          </div>
          <Button asChild className="rounded-full px-5 font-bold text-black hover:opacity-90" style={{ backgroundColor: BRAND }}">
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
              <ShieldCheck className="size-4 text-[#00D632]" aria-hidden />
              Links verified for cash.app
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-6xl">Cash App support resources</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Find answers and continue securely to Cash App’s official help centre for account assistance.
            </p>
            <div className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-md border border-border bg-background p-3 shadow-sm">
              <Search className="ml-2 size-5 shrink-0 text-muted-foreground" aria-hidden />
              <span className="min-w-0 flex-1 text-left text-sm text-muted-foreground">
                Search payments, Cash Card or account help
              </span>
              <Button asChild className="shrink-0 font-bold text-black hover:opacity-90" style={{ backgroundColor: BRAND }}>
                <a href={OFFICIAL_HELP_URL} target="_blank" rel="noopener noreferrer">Search</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-sm font-bold text-[#00D632]">SUPPORT TOPICS</p>
              <h2 className="mt-2 text-3xl font-bold">What do you need help with?</h2>
            </div>
            <a
              className="hidden items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground sm:flex"
              href={OFFICIAL_HELP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Browse all <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map(({ icon: Icon, title, text }) => (
              <a
                key={title}
                href={OFFICIAL_HELP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-md border border-border bg-card p-6 transition-colors hover:border-[#00D632]"
              >
                <span className="flex size-11 items-center justify-center rounded-md bg-secondary text-[#00D632]">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                <ArrowRight
                  className="mt-5 size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-[#00D632]"
                  aria-hidden
                />
              </a>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-secondary">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1fr_0.7fr]">
            <div>
              <div className="flex items-center gap-3">
                <BookOpen className="size-6 text-[#00D632]" aria-hidden />
                <h2 className="text-2xl font-bold">Popular help articles</h2>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {articles.map((article) => (
                  <a
                    key={article}
                    href={OFFICIAL_HELP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 rounded-md border border-border bg-background px-4 py-4 text-sm font-semibold transition-colors hover:border-[#00D632]"
                  >
                    {article}
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                  </a>
                ))}
              </div>
            </div>
            <aside className="rounded-md bg-foreground p-8 text-background">
              <LifeBuoy className="size-8 text-[#00D632]" aria-hidden />
              <h2 className="mt-5 text-2xl font-bold">Still need assistance?</h2>
              <p className="mt-3 text-sm leading-6 text-background/70">
                Contact Cash App through its official support channels. This page never redirects to private email,
                phone, or messaging accounts.
              </p>
              <Button asChild size="lg" className="mt-7 w-full bg-accent font-bold text-[#00D632]-foreground hover:bg-accent/90">
                <a href={OFFICIAL_CONTACT_URL} target="_blank" rel="noopener noreferrer">
                  <FileQuestion className="size-5" aria-hidden />
                  Open official support
                </a>
              </Button>
              <p className="mt-4 text-center text-xs text-background/60">You’ll continue on cash.app</p>
            </aside>
          </div>
        </section>
      </main>

      <footer className="px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <img src={cashAppLogo.url} alt="Cash App" className="size-6 rounded-md object-contain" />
          <p>Independent support directory. Cash App links open only on the official cash.app website.</p>
        </div>
      </footer>

      <Button
        asChild
        size="lg"
        className="fixed bottom-5 right-5 z-50 rounded-full bg-accent px-5 font-bold text-[#00D632]-foreground shadow-xl hover:bg-accent/90 sm:bottom-6 sm:right-6"
      >
        <a href={OFFICIAL_CONTACT_URL} target="_blank" rel="noopener noreferrer">
          <LifeBuoy className="size-5" aria-hidden />
          Official support
        </a>
      </Button>
    </div>
  );
}
