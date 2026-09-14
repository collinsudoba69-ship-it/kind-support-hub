import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  ChevronDown,
  Clock,
  CreditCard,
  ExternalLink,
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
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CONTACT_METHODS, contactHref, type ContactMethodId } from "@/lib/platforms";
import type { SupportSite } from "@/lib/sites";

const BRAND = "#2F5D8C";
const BRAND_DARK = "#23466A";
const CREAM = "#F6F8FB";
const INK = "#16202B";
const MUTED = "#5A6B7C";

/** Informational links still point to the genuine Western Union help centre. */
const OFFICIAL_HELP_URL = "https://www.westernunion.com/us/en/help.html";

const METHOD_ICONS: Record<ContactMethodId, typeof Mail> = {
  whatsapp: MessageCircle,
  email: Mail,
  telegram: Send,
  "live-chat": MessagesSquare,
};

const topics = [
  { icon: Send, title: "Send a transfer", text: "Start a transfer and choose how your receiver is paid" },
  { icon: Search, title: "Track a transfer", text: "Check the status of a transfer with your tracking number" },
  { icon: CreditCard, title: "Fees & exchange rates", text: "Understand charges, rates and payout amounts" },
  { icon: BadgeCheck, title: "Identity verification", text: "Documents needed to verify a sender or receiver" },
  { icon: KeyRound, title: "Account access", text: "Sign-in help, password resets and profile updates" },
  { icon: LockKeyhole, title: "Fraud & security", text: "Spot transfer scams and report suspicious requests" },
];

const articles = [
  "How do I track my money transfer?",
  "How long does a transfer take to arrive?",
  "Can I cancel or change a transfer?",
  "What ID does my receiver need?",
  "How are transfer fees calculated?",
  "How do I report a suspected scam?",
];

const faqs = [
  "Where can I get official help with a transfer?",
  "Is there a refund if a transfer is not collected?",
  "What are the sending limits?",
  "Why was my transfer put on hold?",
  "How do I update my phone number?",
  "How do I report fraud?",
];

export function WesternUnionSupportLayout({ site }: { site?: SupportSite }) {
  const method = site ? CONTACT_METHODS.find((m) => m.id === site.contactMethod) : undefined;
  const supportHref = site ? contactHref(site.contactMethod, site.contactValue) : "#";
  const SupportIcon = site ? METHOD_ICONS[site.contactMethod] : Mail;

  return (
    <div className="min-h-screen font-sans antialiased" style={{ backgroundColor: CREAM, color: INK }}>
      <header className="sticky top-0 z-30 border-b border-border/60 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-4">
          <div className="flex items-center gap-3">
            <span
              className="flex size-8 items-center justify-center rounded-full text-sm font-black text-white"
              style={{ backgroundColor: BRAND }}
            >
              T
            </span>
            <span className="text-xl font-bold tracking-tight" style={{ color: INK }}>
              Transfer Help Guide
            </span>
            <span className="hidden text-sm font-medium sm:inline" style={{ color: MUTED }}>
              Money transfer answers
            </span>
          </div>
          <Button
            asChild
            className="rounded-full px-5 font-bold text-white hover:opacity-90"
            style={{ backgroundColor: BRAND }}
          >
            <a href={supportHref} target="_blank" rel="noopener noreferrer">
              <SupportIcon className="size-4" aria-hidden />
              Contact {method?.name ?? "Support"}
            </a>
          </Button>
        </div>
      </header>

      <section className="border-b border-border/60 bg-white">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:py-24">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: `${BRAND}15`, color: BRAND_DARK }}
          >
            <ShieldCheck className="size-4" aria-hidden />
            Independent guide — support contact set by the admin
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-6xl" style={{ color: INK }}>
            {site?.title?.trim() || "Help with your money transfer"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {site?.note?.trim() ||
              "Browse common transfer questions, then continue to Western Union's official help centre for account-specific support."}
          </p>

          <div className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-full border border-border bg-background p-2 pl-5 shadow-sm">
            <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
            <span className="min-w-0 flex-1 text-left text-sm text-muted-foreground">
              Search transfers, fees, tracking or security help
            </span>
            <Button
              asChild
              className="shrink-0 rounded-full px-5 font-bold text-white hover:opacity-90"
              style={{ backgroundColor: BRAND }}
            >
              <a href={OFFICIAL_HELP_URL} target="_blank" rel="noopener noreferrer">
                Search
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide" style={{ color: BRAND }}>
              Support topics
            </p>
            <h2 className="mt-2 text-3xl font-bold" style={{ color: INK }}>
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
                style={{ backgroundColor: `${BRAND}12`, color: BRAND }}
              >
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 font-bold" style={{ color: INK }}>
                {title}
              </h3>
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
              <BookOpen className="size-6" style={{ color: BRAND }} aria-hidden />
              <h2 className="text-2xl font-bold" style={{ color: INK }}>
                Popular help articles
              </h2>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {articles.map((article) => (
                <a
                  key={article}
                  href={OFFICIAL_HELP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background px-4 py-4 text-sm font-semibold transition-colors hover:border-[#2F5D8C]"
                >
                  <span className="flex items-center gap-3">
                    <FileText className="size-4 shrink-0" style={{ color: BRAND }} aria-hidden />
                    {article}
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl p-8 text-white" style={{ backgroundColor: BRAND }}>
            <LifeBuoy className="size-8" aria-hidden />
            <h2 className="mt-5 text-2xl font-bold">Still need help?</h2>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Reach the configured support channel for this guide.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-7 w-full rounded-full font-bold hover:opacity-90"
              style={{ backgroundColor: "#fff", color: BRAND }}
            >
              <a href={supportHref} target="_blank" rel="noopener noreferrer">
                <SupportIcon className="size-5" aria-hidden />
                Contact {method?.name ?? "Support"}
              </a>
            </Button>
            <p className="mt-4 text-center text-xs text-white/70">Set from the admin panel</p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: INK }}>
            Frequently asked questions
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">Quick answers to common transfer questions</p>
        </div>
        <div className="mt-8 space-y-3">
          {faqs.map((q) => (
            <details key={q} className="group rounded-2xl border border-border bg-white px-5 py-4 shadow-sm">
              <summary
                className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold"
                style={{ color: INK }}
              >
                {q}
                <ChevronDown
                  className="size-4 text-muted-foreground transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Full answers and account-specific help are available in the official help centre on
                westernunion.com.
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div
          className="overflow-hidden rounded-3xl bg-white p-10 text-center shadow-sm sm:p-14"
          style={{ border: `1px solid ${BRAND}30` }}
        >
          <Users className="mx-auto size-8" style={{ color: BRAND }} aria-hidden />
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl" style={{ color: INK }}>
            Get support now
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Need account-specific help? Contact the support channel configured for this guide.
          </p>
          <Button
            asChild
            size="xl"
            className="mt-6 rounded-full px-6 font-bold text-white hover:opacity-90"
            style={{ backgroundColor: BRAND }}
          >
            <a href={supportHref} target="_blank" rel="noopener noreferrer">
              <SupportIcon className="size-5" aria-hidden />
              Contact {method?.name ?? "Support"}
            </a>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border/60 bg-white px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <div className="flex items-center gap-2">
            <span
              className="flex size-6 items-center justify-center rounded-full text-[10px] font-black text-white"
              style={{ backgroundColor: BRAND }}
            >
              T
            </span>
            <span className="font-semibold" style={{ color: INK }}>
              Transfer Help Guide
            </span>
          </div>
          <p className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden />
            Independent guide, not affiliated with Western Union. Support links open westernunion.com.
          </p>
        </div>
      </footer>

      <Button
        asChild
        size="lg"
        className="fixed bottom-5 right-5 z-50 rounded-full px-5 font-bold text-white shadow-xl hover:opacity-90 sm:bottom-6 sm:right-6"
        style={{ backgroundColor: BRAND }}
      >
        <a href={supportHref} target="_blank" rel="noopener noreferrer">
          <SupportIcon className="size-5" aria-hidden />
          Contact {method?.name ?? "Support"}
        </a>
      </Button>
    </div>
  );
}
