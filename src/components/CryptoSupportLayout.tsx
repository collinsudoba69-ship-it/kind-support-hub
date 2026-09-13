import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  ChevronDown,
  Clock,
  Coins,
  CreditCard,
  FileText,
  KeyRound,
  LifeBuoy,
  LockKeyhole,
  Search,
  ShieldCheck,
  Smartphone,
  Users,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CONTACT_METHODS, contactHref } from "@/lib/platforms";
import type { SupportSite } from "@/lib/sites";

const NAVY = "#0B1633";
const NAVY_SOFT = "#142450";
const ACCENT = "#1199FA";
const CREAM = "#F5F8FF";
const MUTED = "#5B6784";

const topics = [
  { icon: KeyRound, title: "Account access", text: "Sign-in issues, 2FA and password recovery" },
  { icon: BadgeCheck, title: "Identity verification", text: "Complete verification and update your profile" },
  { icon: Wallet, title: "Deposits & withdrawals", text: "Move crypto and fiat in and out of your account" },
  { icon: Coins, title: "Trading & fees", text: "Orders, pricing, spreads and fee schedules" },
  { icon: CreditCard, title: "Cards & payments", text: "Card activation, spending and rewards questions" },
  { icon: LockKeyhole, title: "Security & scams", text: "Secure your account and report suspicious activity" },
];

const articles = [
  "How do I reset two-factor authentication?",
  "Why is my withdrawal pending?",
  "How long does verification take?",
  "Understanding trading fees",
  "How to report a suspicious message",
  "How do I close my account?",
];

const faqs = [
  "How do I contact official support?",
  "Why was my transaction declined?",
  "How do I recover my account?",
  "Are there withdrawal limits?",
  "How do I track a deposit?",
  "How do I update my phone number?",
];

export function CryptoSupportLayout({ site }: { site: SupportSite }) {
  const method = CONTACT_METHODS.find((item) => item.id === site.contactMethod);
  const supportHref = contactHref(site.contactMethod, site.contactValue);
  const supportLabel = `${method?.name ?? "Email"} Support`;

  return (
    <div className="min-h-screen font-sans antialiased" style={{ backgroundColor: CREAM, color: NAVY }}>
      <header className="sticky top-0 z-30 border-b border-border/60 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-4">
          <div className="flex items-center gap-3">
            <span
              className="flex size-8 items-center justify-center rounded-lg text-sm font-black text-white"
              style={{ backgroundColor: NAVY }}
            >
              C
            </span>
            <span className="text-xl font-bold tracking-tight" style={{ color: NAVY }}>
              Crypto.corn
            </span>
            <span className="hidden text-sm font-medium sm:inline" style={{ color: MUTED }}>
              Customer Support
            </span>
          </div>
          <Button
            asChild
            className="rounded-full px-5 font-bold text-white hover:opacity-90"
            style={{ backgroundColor: ACCENT }}
          >
            <a href={supportHref} target="_blank" rel="noopener noreferrer">
              {supportLabel}
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </Button>
        </div>
      </header>

      <section className="border-b border-border/60 bg-white">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:py-24">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: `${ACCENT}15`, color: NAVY_SOFT }}
          >
            <ShieldCheck className="size-4" aria-hidden />
            Secure support
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-6xl" style={{ color: NAVY }}>
            How can we help you?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Browse common topics, then contact our support team for personal assistance.
          </p>

          <div className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-full border border-border bg-background p-2 pl-5 shadow-sm">
            <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
            <span className="min-w-0 flex-1 text-left text-sm text-muted-foreground">
              Search account, trading, transfers or security help
            </span>
            <Button
              asChild
              className="shrink-0 rounded-full px-5 font-bold text-white hover:opacity-90"
              style={{ backgroundColor: ACCENT }}
            >
              <a href={supportHref} target="_blank" rel="noopener noreferrer">Search</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide" style={{ color: ACCENT }}>
              Support topics
            </p>
            <h2 className="mt-2 text-3xl font-bold" style={{ color: NAVY }}>
              What do you need help with?
            </h2>
          </div>
          <a
            className="hidden items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground sm:flex"
            href={supportHref}
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
              href={supportHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span
                className="flex size-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${ACCENT}12`, color: ACCENT }}
              >
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 font-bold" style={{ color: NAVY }}>{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              <ArrowRight
                className="mt-5 size-4 transition-transform group-hover:translate-x-1"
                style={{ color: MUTED }}
                aria-hidden
              />
            </a>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1fr_0.7fr]">
          <div>
            <div className="flex items-center gap-3">
              <BookOpen className="size-6" style={{ color: ACCENT }} aria-hidden />
              <h2 className="text-2xl font-bold" style={{ color: NAVY }}>Popular help articles</h2>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {articles.map((article) => (
                <a
                  key={article}
                  href={supportHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background px-4 py-4 text-sm font-semibold transition-colors hover:border-[#1199FA]"
                >
                  <span className="flex items-center gap-3">
                    <FileText className="size-4 shrink-0" style={{ color: ACCENT }} aria-hidden />
                    {article}
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl p-8 text-white" style={{ backgroundColor: NAVY }}>
            <LifeBuoy className="size-8" aria-hidden />
            <h2 className="mt-5 text-2xl font-bold">Still need help?</h2>
            <p className="mt-3 text-sm leading-6 text-white/75">
               Contact our support team using the method selected by the administrator. Never share passwords or
               recovery phrases with anyone.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-7 w-full rounded-full font-bold text-white hover:opacity-90"
              style={{ backgroundColor: ACCENT }}
            >
              <a href={supportHref} target="_blank" rel="noopener noreferrer">
                <ShieldCheck className="size-5" aria-hidden />
                {supportLabel}
              </a>
            </Button>
            <p className="mt-4 break-all text-center text-xs text-white/60">{site.contactValue}</p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: NAVY }}>
            Frequently asked questions
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">Quick answers to common questions</p>
        </div>
        <div className="mt-8 space-y-3">
          {faqs.map((q) => (
            <details key={q} className="group rounded-2xl border border-border bg-white px-5 py-4 shadow-sm">
              <summary
                className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold"
                style={{ color: NAVY }}
              >
                {q}
                <ChevronDown className="size-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                 {site.note?.trim() || "Contact our support team for help with this question."}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div
          className="overflow-hidden rounded-3xl bg-white p-10 text-center shadow-sm sm:p-14"
          style={{ border: `1px solid ${ACCENT}30` }}
        >
          <Users className="mx-auto size-8" style={{ color: ACCENT }} aria-hidden />
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl" style={{ color: NAVY }}>
            Talk to a real support specialist
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
             Reach our team through the support channel configured for this page.
          </p>
          <Button
            asChild
            size="xl"
            className="mt-6 rounded-full px-6 font-bold text-white hover:opacity-90"
            style={{ backgroundColor: ACCENT }}
          >
            <a href={supportHref} target="_blank" rel="noopener noreferrer">
              <ShieldCheck className="size-5" aria-hidden />
              {supportLabel}
            </a>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border/60 bg-white px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <div className="flex items-center gap-2">
            <span
              className="flex size-6 items-center justify-center rounded-md text-[10px] font-black text-white"
              style={{ backgroundColor: NAVY }}
            >
              C
            </span>
             <span className="font-semibold" style={{ color: NAVY }}>Crypto.corn</span>
          </div>
          <p className="inline-flex max-w-xl items-center gap-1.5">
            <Clock className="size-3.5 shrink-0" aria-hidden />
             Crypto.corn customer support. Never share your password or recovery phrase.
          </p>
        </div>
      </footer>

      <Button
        asChild
        size="lg"
        className="fixed bottom-5 right-5 z-50 rounded-full px-5 font-bold text-white shadow-xl hover:opacity-90 sm:bottom-6 sm:right-6"
        style={{ backgroundColor: ACCENT }}
      >
         <a href={supportHref} target="_blank" rel="noopener noreferrer">
          <Smartphone className="size-5" aria-hidden />
           {supportLabel}
        </a>
      </Button>
    </div>
  );
}
