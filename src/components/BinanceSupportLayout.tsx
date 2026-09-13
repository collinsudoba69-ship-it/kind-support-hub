import type { ComponentType } from "react";
import {
  Mail,
  MessageCircle,
  MessagesSquare,
  Send,
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  Search,
  FileText,
  ChevronDown,
  Wallet,
  Repeat,
  TrendingUp,
  KeyRound,
  Users,
  BadgeDollarSign,
} from "lucide-react";

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

const BN_YELLOW = "#F0B90B";
const BN_YELLOW_DARK = "#C79A08";
const BN_BLACK = "#0B0E11";
const BN_INK = "#1A1D24";
const BN_MUTED = "#707A8A";
const BN_BG = "#FFFFFF";
const BN_SOFT = "#F8F9FA";

export function BinanceSupportLayout({ site }: { site: SupportSite }) {
  const method = CONTACT_METHODS.find((m) => m.id === site.contactMethod);
  const Icon = METHOD_ICONS[site.contactMethod];
  const cta = METHOD_CTA[site.contactMethod];
  const href = contactHref(site.contactMethod, site.contactValue);

  return (
    <div className="min-h-screen font-sans antialiased" style={{ backgroundColor: BN_BG, color: BN_INK }}>
      {/* Nav */}
      <header
        className="sticky top-0 z-30 border-b backdrop-blur"
        style={{ backgroundColor: `${BN_BG}f2`, borderColor: "#E6E8EA" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span
                className="flex size-7 items-center justify-center rounded text-xs font-black"
                style={{ backgroundColor: BN_YELLOW, color: BN_BLACK }}
              >
                B
              </span>
              <span className="text-lg font-bold tracking-tight" style={{ color: BN_BLACK }}>
                Binance
              </span>
              <span className="hidden text-sm font-medium sm:inline" style={{ color: BN_MUTED }}>
                Support Center
              </span>
            </div>
            <nav className="hidden gap-6 text-sm font-medium md:flex" style={{ color: BN_BLACK }}>
              <a href="#help" className="transition-opacity hover:opacity-70">Support Center</a>
              <a href="#status" className="transition-opacity hover:opacity-70">Announcements</a>
              <a href="#contact" className="transition-opacity hover:opacity-70">Contact us</a>
            </nav>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold shadow-sm transition-all hover:opacity-90"
            style={{ backgroundColor: BN_YELLOW, color: BN_BLACK }}
          >
            <Icon className="size-4" />
            Log in
          </a>
        </div>
      </header>

      {/* Hero */}
      <section
        className="border-b"
        style={{
          background: `linear-gradient(180deg, ${BN_SOFT} 0%, ${BN_BG} 100%)`,
          borderColor: "#E6E8EA",
        }}
      >
        <div className="mx-auto max-w-4xl px-5 pb-14 pt-16 text-center sm:pb-20 sm:pt-24">
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl" style={{ color: BN_BLACK }}>
            How can we help?
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base" style={{ color: BN_MUTED }}>
            Search our support center or reach a verified specialist directly.
          </p>

          <div className="mx-auto mt-8 max-w-xl">
            <div
              className="flex items-center gap-2 rounded bg-white p-1.5 pl-5 shadow-sm"
              style={{ border: "1px solid #E6E8EA" }}
            >
              <Search className="size-4" style={{ color: BN_MUTED }} />
              <input
                type="text"
                placeholder="Search for answers…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-60"
                style={{ color: BN_INK }}
                readOnly
              />
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: BN_YELLOW, color: BN_BLACK }}
              >
                Search
              </a>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {["Account access", "Security", "Verification", "Deposit", "Withdraw", "Trading"].map((t) => (
                <span
                  key={t}
                  className="rounded bg-white px-3 py-1.5 text-xs font-medium shadow-sm"
                  style={{ color: BN_BLACK, border: "1px solid #E6E8EA" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Browse by topic */}
      <section id="help" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-xl font-bold" style={{ color: BN_BLACK }}>Browse by topic</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: KeyRound, title: "Account access", desc: "Passwords, 2FA and login issues", count: "56 articles" },
            { icon: CheckCircle2, title: "Identity verification", desc: "KYC and document uploads", count: "41 articles" },
            { icon: Wallet, title: "Deposit & withdrawal", desc: "Move crypto and fiat in or out", count: "67 articles" },
            { icon: Repeat, title: "Buy, sell & convert", desc: "Trade crypto with your local currency", count: "49 articles" },
            { icon: TrendingUp, title: "Spot & margin trading", desc: "Orders, charts and trading fees", count: "33 articles" },
            { icon: BadgeDollarSign, title: "Fees & limits", desc: "Understand transaction costs", count: "24 articles" },
            { icon: Users, title: "Account management", desc: "Profile, settings and security", count: "38 articles" },
            { icon: Lock, title: "Report an issue", desc: "Suspicious activity and disputes", count: "19 articles" },
          ].map((c, i) => (
            <a
              key={c.title}
              href={i === 7 ? href : "#help"}
              target={i === 7 ? "_blank" : undefined}
              rel={i === 7 ? "noopener noreferrer" : undefined}
              className="group relative block rounded-2xl bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ border: "1px solid #E6E8EA" }}
            >
              {i === 7 && (
                <span
                  className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-[10px] font-semibold shadow-sm"
                  style={{ backgroundColor: BN_YELLOW, color: BN_BLACK }}
                >
                  <MessageCircle className="size-3" />
                  {cta}
                </span>
              )}
              <div
                className="flex size-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: BN_SOFT, color: BN_YELLOW_DARK }}
              >
                <c.icon className="size-5" />
              </div>
              <p className="mt-4 text-base font-semibold" style={{ color: BN_BLACK }}>{c.title}</p>
              <p className="mt-1 text-xs leading-relaxed" style={{ color: BN_MUTED }}>
                {c.desc}
              </p>
              <p className="mt-3 inline-flex items-center gap-1 text-[11px]" style={{ color: BN_MUTED }}>
                <FileText className="size-3" />
                {c.count}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Popular articles */}
      <section className="py-16" style={{ backgroundColor: BN_SOFT }}>
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold" style={{ color: BN_BLACK }}>Popular articles</h2>
            <a href="#help" className="inline-flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-70" style={{ color: BN_YELLOW_DARK }}>
              View all <ArrowRight className="size-3.5" />
            </a>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
            {[
              { title: "I can't log in to my account", cat: "Account access · 3 min read", pop: true },
              { title: "Why is my withdrawal pending?", cat: "Withdrawal · 4 min read", pop: true },
              { title: "How do I complete identity verification?", cat: "Verification · 3 min read" },
              { title: "How do I reset my Google Authenticator?", cat: "Security · 2 min read" },
              { title: "How long does a deposit take?", cat: "Deposit · 3 min read" },
              { title: "What are Binance's trading fees?", cat: "Fees · 2 min read" },
            ].map((a) => (
              <a
                key={a.title}
                href="#help"
                className="group flex items-center gap-4 rounded-xl bg-white p-4 transition-colors"
                style={{ border: "1px solid #E6E8EA" }}
              >
                <div
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: BN_SOFT, color: BN_YELLOW_DARK }}
                >
                  <FileText className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold" style={{ color: BN_BLACK }}>{a.title}</p>
                    {a.pop && (
                      <span
                        className="shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                        style={{ backgroundColor: BN_YELLOW, color: BN_BLACK }}
                      >
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs" style={{ color: BN_MUTED }}>
                    {a.cat}
                  </p>
                </div>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" style={{ color: BN_MUTED }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: BN_BLACK }}>
            Frequently asked questions
          </h2>
          <p className="mt-2 text-sm" style={{ color: BN_MUTED }}>
            Quick answers to common questions
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {[
            "How do I contact Binance support?",
            "How do I secure my account?",
            "Why is my account restricted?",
            "How long does verification take?",
            "How do I recover access to my account?",
            "How do I report suspicious activity?",
          ].map((q) => (
            <details
              key={q}
              className="group rounded-2xl bg-white px-5 py-4 shadow-sm"
              style={{ border: "1px solid #E6E8EA" }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold" style={{ color: BN_BLACK }}>
                {q}
                <ChevronDown className="size-4 transition-transform group-open:rotate-180" style={{ color: BN_MUTED }} />
              </summary>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: BN_MUTED }}>
                {site.note?.trim() ||
                  "Reach a verified support specialist through the contact channel below for a personal answer."}
              </p>
            </details>
          ))}
        </div>

      </section>

      {/* Trust band */}
      <section id="contact" className="mx-auto max-w-6xl px-5 pb-16">

        <div
          className="overflow-hidden rounded-3xl p-10 text-center sm:p-14"
          style={{ backgroundColor: BN_BLACK, color: "#fff" }}
        >
          <span
            className="inline-flex items-center gap-1.5 rounded px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: `${BN_YELLOW}22`, color: BN_YELLOW }}
          >
            <ShieldCheck className="size-3.5" />
            Verified contact channel
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            Talk to a real support specialist
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "#B0B8C1" }}>
            Skip the queue and reach a verified specialist through the contact method configured for this desk.
          </p>
          <Button
            asChild
            size="xl"
            className="mt-6 h-11 rounded px-6 text-sm font-semibold shadow-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: BN_YELLOW, color: BN_BLACK }}
          >
            <a href={href} target="_blank" rel="noopener noreferrer">
              <Icon className="size-4" />
              {cta}
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-5 py-10" style={{ borderColor: "#E6E8EA", backgroundColor: BN_BG }}>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4">
          {[
            { title: "Binance", links: ["Buy Crypto", "Markets", "Earn", "Wallet"] },
            { title: "Support", links: ["Support Center", "Submit a request", "Announcements", "APIs"] },
            { title: "Company", links: ["About", "Careers", "News", "Blog"] },
            { title: "Legal", links: ["Terms", "Privacy", "Risk Warning", "Cookies"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-wide" style={{ color: BN_BLACK }}>{col.title}</p>
              <ul className="mt-3 space-y-2 text-sm" style={{ color: BN_MUTED }}>
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#help" className="transition-opacity hover:opacity-70">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t pt-6 text-xs sm:flex-row"
          style={{ borderColor: "#E6E8EA", color: BN_MUTED }}
        >
          <div className="flex items-center gap-2">
            <span
              className="flex size-5 items-center justify-center rounded text-[10px] font-black"
              style={{ backgroundColor: BN_YELLOW, color: BN_BLACK }}
            >
              B
            </span>
            <span className="font-semibold" style={{ color: BN_BLACK }}>Binance</span>
          </div>
          <p className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" />
            © {new Date().getFullYear()} Support desk. Contact channel verified by the site owner.
          </p>
        </div>
      </footer>

      {/* Floating contact button */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-xl ring-2 ring-white/40 transition-all hover:scale-105 hover:shadow-2xl sm:bottom-6 sm:right-6 sm:px-6 sm:py-3.5 sm:text-base"
        style={{ backgroundColor: BN_YELLOW, color: BN_BLACK, boxShadow: `0 20px 40px -12px ${BN_YELLOW_DARK}66` }}
      >
        <Icon className="size-5" />
        {cta}
      </a>
    </div>
  );
}
