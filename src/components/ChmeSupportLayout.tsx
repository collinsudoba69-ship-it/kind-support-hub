import type { ComponentType } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  ChevronDown,
  Clock,
  CreditCard,
  FileText,
  KeyRound,
  LifeBuoy,
  LockKeyhole,
  Mail,
  MessageCircle,
  MessagesSquare,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Users,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteLogo } from "@/components/SiteLogo";
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

const CHME_GREEN = "#25A159";
const CHME_GREEN_DARK = "#1E8247";
const CHME_CREAM = "#F9FAF6";
const CHME_INK = "#1A2118";
const CHME_MUTED = "#5E6B59";

const OFFICIAL_HELP_URL = "https://www.chime.com/help/";

const topics = [
  { icon: KeyRound, title: "Account access", text: "Reset passwords, recover access and manage sign-in" },
  { icon: BadgeCheck, title: "Identity verification", text: "Verify your identity and keep your profile current" },
  { icon: CreditCard, title: "Cards & spending", text: "Credit Builder, debit card and transaction questions" },
  { icon: Wallet, title: "Transfers & direct deposit", text: "Move money, set up deposits and check balances" },
  { icon: Smartphone, title: "Mobile app", text: "App setup, notifications and device troubleshooting" },
  { icon: LockKeyhole, title: "Security & scams", text: "Protect your account and report suspicious activity" },
];

const articles = [
  "How do I reset my password?",
  "Set up direct deposit",
  "How does Credit Builder work?",
  "Report a suspicious email or text",
  "Replace a lost or stolen card",
  "How do I close my account?",
];

const faqs = [
  "How do I contact CHME support?",
  "Is my money insured?",
  "How do I dispute a transaction?",
  "What are the spending limits?",
  "How do I set up SpotMe?",
  "How do I update my phone number?",
];

export function ChmeSupportLayout({ site }: { site: SupportSite }) {
  const method = CONTACT_METHODS.find((m) => m.id === site.contactMethod);
  const MethodIcon = METHOD_ICONS[site.contactMethod] ?? Mail;
  const cta = METHOD_CTA[site.contactMethod] ?? "Contact support";
  const href = contactHref(site.contactMethod, site.contactValue);

  return (
    <div className="min-h-screen font-sans antialiased" style={{ backgroundColor: CHME_CREAM, color: CHME_INK }}>
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-4">
          <div className="flex items-center gap-3">
            <SiteLogo site={site} className="size-9 border-0" />
            <span className="text-xl font-bold tracking-tight" style={{ color: CHME_INK }}>
              {site.title}
            </span>
            <span className="hidden text-sm font-medium sm:inline" style={{ color: CHME_MUTED }}>
              Support Center
            </span>
          </div>
          <Button
            asChild
            className="rounded-full px-5 font-bold text-white hover:opacity-90"
            style={{ backgroundColor: CHME_GREEN }}
          >
            <a href={OFFICIAL_HELP_URL} target="_blank" rel="noopener noreferrer">
              Official Help
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border/60 bg-white">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:py-24">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: `${CHME_GREEN}15`, color: CHME_GREEN_DARK }}
          >
            <ShieldCheck className="size-4" aria-hidden />
            Verified support directory
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-6xl" style={{ color: CHME_INK }}>
            How can we help you?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Find answers, explore support topics, or reach the verified contact channel for this CHME desk.
          </p>

          <div className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-full border border-border bg-background p-2 pl-5 shadow-sm">
            <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
            <span className="min-w-0 flex-1 text-left text-sm text-muted-foreground">
              Search account, cards, transfers or security help
            </span>
            <Button
              asChild
              className="shrink-0 rounded-full px-5 font-bold text-white hover:opacity-90"
              style={{ backgroundColor: CHME_GREEN }}
            >
              <a href={OFFICIAL_HELP_URL} target="_blank" rel="noopener noreferrer">Search</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide" style={{ color: CHME_GREEN }}>
              Support topics
            </p>
            <h2 className="mt-2 text-3xl font-bold" style={{ color: CHME_INK }}>
              What do you need help with?
            </h2>
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
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map(({ icon: Icon, title, text }) => (
            <a
              key={title}
              href={OFFICIAL_HELP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span
                className="flex size-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${CHME_GREEN}12`, color: CHME_GREEN }}
              >
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 font-bold" style={{ color: CHME_INK }}>{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              <ArrowRight
                className="mt-5 size-4 text-muted-foreground transition-transform group-hover:translate-x-1"
                style={{ color: CHME_MUTED }}
                aria-hidden
              />
            </a>
          ))}
        </div>
      </section>

      {/* Articles + contact */}
      <section className="border-y border-border/60 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1fr_0.7fr]">
          <div>
            <div className="flex items-center gap-3">
              <BookOpen className="size-6" style={{ color: CHME_GREEN }} aria-hidden />
              <h2 className="text-2xl font-bold" style={{ color: CHME_INK }}>Popular help articles</h2>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {articles.map((article) => (
                <a
                  key={article}
                  href={OFFICIAL_HELP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background px-4 py-4 text-sm font-semibold transition-colors hover:border-[#25A159]"
                >
                  <span className="flex items-center gap-3">
                    <FileText className="size-4 shrink-0" style={{ color: CHME_GREEN }} aria-hidden />
                    {article}
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl p-8 text-white" style={{ backgroundColor: CHME_GREEN }}>
            <LifeBuoy className="size-8" aria-hidden />
            <h2 className="mt-5 text-2xl font-bold">Still need help?</h2>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Reach the verified support channel configured for this page.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-7 w-full rounded-full font-bold text-[#25A159] hover:opacity-90"
              style={{ backgroundColor: "#fff" }}
            >
              <a href={href} target="_blank" rel="noopener noreferrer">
                <MethodIcon className="size-5" aria-hidden />
                {cta}
              </a>
            </Button>
            <p className="mt-4 text-center text-xs text-white/70">
              {method?.name ?? "Support"}: {site.contactValue}
            </p>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: CHME_INK }}>
            Frequently asked questions
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Quick answers to common CHME questions
          </p>
        </div>
        <div className="mt-8 space-y-3">
          {faqs.map((q) => (
            <details
              key={q}
              className="group rounded-2xl border border-border bg-white px-5 py-4 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold" style={{ color: CHME_INK }}>
                {q}
                <ChevronDown className="size-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {site.note?.trim() || "Reach the verified contact channel below for a personal answer."}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Trust band */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="overflow-hidden rounded-3xl bg-white p-10 text-center shadow-sm sm:p-14" style={{ border: `1px solid ${CHME_GREEN}30` }}>
          <Users className="mx-auto size-8" style={{ color: CHME_GREEN }} aria-hidden />
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl" style={{ color: CHME_INK }}>
            Talk to a real support specialist
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Skip the queue and reach the verified contact channel configured for this support desk.
          </p>
          <Button
            asChild
            size="xl"
            className="mt-6 rounded-full px-6 font-bold text-white hover:opacity-90"
            style={{ backgroundColor: CHME_GREEN }}
          >
            <a href={href} target="_blank" rel="noopener noreferrer">
              <MethodIcon className="size-5" aria-hidden />
              {cta}
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-white px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <div className="flex items-center gap-2">
            <span
              className="flex size-6 items-center justify-center rounded-full text-[10px] font-black text-white"
              style={{ backgroundColor: CHME_GREEN }}
            >
              C
            </span>
            <span className="font-semibold" style={{ color: CHME_INK }}>CHME</span>
          </div>
          <p className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden />
            Independent support directory. Official links open only on chime.com.
          </p>
        </div>
      </footer>

      {/* Floating contact */}
      <Button
        asChild
        size="lg"
        className="fixed bottom-5 right-5 z-50 rounded-full px-5 font-bold text-white shadow-xl hover:opacity-90 sm:bottom-6 sm:right-6"
        style={{ backgroundColor: CHME_GREEN }}
      >
        <a href={href} target="_blank" rel="noopener noreferrer">
          <MethodIcon className="size-5" aria-hidden />
          {cta}
        </a>
      </Button>
    </div>
  );
}
