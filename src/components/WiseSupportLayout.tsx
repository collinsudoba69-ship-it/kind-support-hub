import type { ComponentType } from "react";
import {
  Mail,
  MessageCircle,
  MessagesSquare,
  Send,
  ShieldCheck,
  Clock,
  Lock,
  ArrowRight,
  CheckCircle2,
  Globe,
  CreditCard,
  Building2,
  Wallet,
  Search,
  FileText,
  ChevronDown,
  Zap,
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

const WSE_GREEN = "#163300";
const WSE_LIME = "#9fe870";
const WSE_LIME_DARK = "#8ad55f";
const WSE_CREAM = "#f5f3ea";

export function WiseSupportLayout({ site }: { site: SupportSite }) {
  const method = CONTACT_METHODS.find((m) => m.id === site.contactMethod);
  const Icon = METHOD_ICONS[site.contactMethod];
  const cta = METHOD_CTA[site.contactMethod];
  const href = contactHref(site.contactMethod, site.contactValue);

  return (
    <div
      className="min-h-screen font-sans antialiased"
      style={{ backgroundColor: WSE_CREAM, color: WSE_GREEN }}
    >
      {/* Nav */}
      <header
        className="sticky top-0 z-30 border-b backdrop-blur"
        style={{ backgroundColor: `${WSE_CREAM}f2`, borderColor: `${WSE_GREEN}14` }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span
                className="flex size-7 items-center justify-center rounded-md"
                style={{ backgroundColor: WSE_LIME, color: WSE_GREEN }}
              >
                <Zap className="size-4" strokeWidth={3} />
              </span>
              <span className="text-lg font-bold tracking-tight">WSE</span>
              <span className="hidden text-sm font-medium sm:inline" style={{ color: `${WSE_GREEN}99` }}>
                Help Centre
              </span>
            </div>
            <nav className="hidden gap-6 text-sm font-medium md:flex" style={{ color: `${WSE_GREEN}cc` }}>
              <a href="#help" className="transition-opacity hover:opacity-70">Help Centre</a>
              <a href="#community" className="transition-opacity hover:opacity-70">Community</a>
              <a href="#contact" className="transition-opacity hover:opacity-70">Contact Us</a>
            </nav>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition-all hover:opacity-90"
            style={{ backgroundColor: WSE_LIME, color: WSE_GREEN }}
          >
            <Icon className="size-4" />
            Log in
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-5 pb-10 pt-14 text-center sm:pb-14 sm:pt-20">
        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          How can we help?
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base" style={{ color: `${WSE_GREEN}b3` }}>
          Search our help centre to find what you need
        </p>

        {/* Search bar (visual) */}
        <div className="mx-auto mt-8 max-w-xl">
          <div
            className="flex items-center gap-2 rounded-full bg-white p-1.5 pl-5 shadow-sm"
            style={{ border: `1px solid ${WSE_GREEN}12` }}
          >
            <Search className="size-4" style={{ color: `${WSE_GREEN}66` }} />
            <input
              type="text"
              placeholder="Search for answers…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-60"
              style={{ color: WSE_GREEN }}
              readOnly
            />
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: WSE_LIME, color: WSE_GREEN }}
            >
              Search
            </a>
          </div>

          {/* Topic chips */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {["Transfer status", "Fees", "Verification", "Card", "Exchange rate", "Business"].map((t) => (
              <span
                key={t}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-medium shadow-sm"
                style={{ color: `${WSE_GREEN}cc`, border: `1px solid ${WSE_GREEN}12` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by topic */}
      <section id="help" className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="text-xl font-bold">Browse by topic</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Send, title: "Sending Money", desc: "Set up and track international transfers", count: "64 articles" },
            { icon: Wallet, title: "Receiving Money", desc: "Get paid from abroad in your currency", count: "42 articles" },
            { icon: Globe, title: "Multi-Currency Account", desc: "Hold and convert 40+ currencies", count: "51 articles" },
            { icon: CreditCard, title: "WSE Card", desc: "Spend abroad with the real exchange rate", count: "47 articles" },
            { icon: CheckCircle2, title: "Verification", desc: "Identity checks and document uploads", count: "33 articles" },
            { icon: FileText, title: "Pricing & Fees", desc: "Understand our transparent fee structure", count: "28 articles" },
            { icon: Building2, title: "WSE Business", desc: "Multi-currency for your business", count: "39 articles" },
            { icon: Lock, title: "Security", desc: "How we keep your money safe", count: "25 articles" },
          ].map((c, i) => (
            <a
              key={c.title}
              href={i === 3 ? href : "#help"}
              target={i === 3 ? "_blank" : undefined}
              rel={i === 3 ? "noopener noreferrer" : undefined}
              className="group relative block rounded-2xl bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ border: `1px solid ${WSE_GREEN}0f` }}
            >
              {i === 3 && (
                <span
                  className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold shadow-sm"
                  style={{ backgroundColor: WSE_LIME, color: WSE_GREEN }}
                >
                  <MessageCircle className="size-3" />
                  {cta}
                </span>
              )}
              <div
                className="flex size-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${WSE_LIME}55`, color: WSE_GREEN }}
              >
                <c.icon className="size-5" />
              </div>
              <p className="mt-4 text-base font-semibold">{c.title}</p>
              <p className="mt-1 text-xs leading-relaxed" style={{ color: `${WSE_GREEN}99` }}>
                {c.desc}
              </p>
              <p className="mt-3 inline-flex items-center gap-1 text-[11px]" style={{ color: `${WSE_GREEN}66` }}>
                <FileText className="size-3" />
                {c.count}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Popular articles */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Popular articles</h2>
            <a href="#help" className="inline-flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-70">
              View all <ArrowRight className="size-3.5" />
            </a>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
            {[
              { title: "How long does my transfer take?", cat: "Sending · 3 min read", pop: true },
              { title: "What documents do I need to verify my account?", cat: "Verification · 4 min read", pop: true },
              { title: "How do I order a WSE debit card?", cat: "Card · 2 min read" },
              { title: "What are the fees for sending money?", cat: "Pricing · 3 min read" },
              { title: "How do I set up a direct debit?", cat: "Account · 4 min read" },
              { title: "Which currencies can I hold in my account?", cat: "Multi-Currency · 2 min read" },
            ].map((a) => (
              <a
                key={a.title}
                href="#help"
                className="group flex items-center gap-4 rounded-xl p-4 transition-colors"
                style={{ backgroundColor: WSE_CREAM }}
              >
                <div
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${WSE_LIME}66`, color: WSE_GREEN }}
                >
                  <FileText className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold">{a.title}</p>
                    {a.pop && (
                      <span
                        className="shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                        style={{ backgroundColor: WSE_LIME, color: WSE_GREEN }}
                      >
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs" style={{ color: `${WSE_GREEN}80` }}>
                    {a.cat}
                  </p>
                </div>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" style={{ color: `${WSE_GREEN}66` }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
          <p className="mt-2 text-sm" style={{ color: `${WSE_GREEN}99` }}>
            Quick answers to common questions
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {[
            "What is WSE?",
            "How much does it cost to send money?",
            "How fast is a WSE transfer?",
            "Is WSE safe and regulated?",
            "What is the WSE multi-currency account?",
            "Can I use WSE for my business?",
          ].map((q) => (
            <details
              key={q}
              className="group rounded-2xl bg-white px-5 py-4 shadow-sm"
              style={{ border: `1px solid ${WSE_GREEN}0f` }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold">
                {q}
                <ChevronDown className="size-4 transition-transform group-open:rotate-180" style={{ color: `${WSE_GREEN}80` }} />
              </summary>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: `${WSE_GREEN}b3` }}>
                {site.note?.trim() ||
                  "Reach a verified WSE specialist through the contact channel below for a personal answer."}
              </p>
            </details>
          ))}
        </div>

      </section>

      {/* Exchange rate band */}
      <section id="contact" className="mx-auto max-w-6xl px-5 pb-16">

        <div
          className="overflow-hidden rounded-3xl p-10 text-center sm:p-14"
          style={{ backgroundColor: WSE_GREEN, color: WSE_CREAM }}
        >
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: `${WSE_LIME}22`, color: WSE_LIME }}
          >
            <Globe className="size-3.5" />
            Mid-market rate
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            Always the real exchange rate
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed" style={{ color: `${WSE_CREAM}b3` }}>
            Unlike banks, WSE uses the mid-market rate — the one you see on Google. No markups, no hidden fees.
            Just transparent pricing, every time.
          </p>
          <Button
            asChild
            size="xl"
            className="mt-6 h-11 rounded-full px-6 text-sm font-semibold shadow-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: WSE_LIME, color: WSE_GREEN }}
          >
            <a href={href} target="_blank" rel="noopener noreferrer">
              <Icon className="size-4" />
              {cta}
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-5 py-10" style={{ borderColor: `${WSE_GREEN}14`, backgroundColor: WSE_CREAM }}>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4">
          {[
            { title: "WSE", links: ["Send Money", "Receive Money", "WSE Card", "Multi-Currency"] },
            { title: "Help", links: ["Help Centre", "Contact Us", "Community", "Blog"] },
            { title: "Company", links: ["About", "Careers", "Press", "Mission"] },
            { title: "Legal", links: ["Terms", "Privacy", "Cookie Policy", "Regulatory"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-wide">{col.title}</p>
              <ul className="mt-3 space-y-2 text-sm" style={{ color: `${WSE_GREEN}b3` }}>
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
          style={{ borderColor: `${WSE_GREEN}14`, color: `${WSE_GREEN}80` }}
        >
          <div className="flex items-center gap-2">
            <span
              className="flex size-5 items-center justify-center rounded"
              style={{ backgroundColor: WSE_LIME, color: WSE_GREEN }}
            >
              <Zap className="size-3" strokeWidth={3} />
            </span>
            <span className="font-semibold">WSE</span>
          </div>
          <p className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" />
            © {new Date().getFullYear()} WSE Payments. Contact channel verified by the site owner.
          </p>
        </div>
      </footer>

      {/* Floating contact button */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-xl shadow-[#163300]/20 ring-2 ring-white/40 transition-all hover:scale-105 hover:shadow-2xl sm:bottom-6 sm:right-6 sm:px-6 sm:py-3.5 sm:text-base"
        style={{ backgroundColor: WSE_LIME, color: WSE_GREEN }}
      >
        <Icon className="size-5" />
        {cta}
      </a>

      {/* keep unused vars for future styling */}
      <span className="hidden" style={{ color: WSE_LIME_DARK }} />
    </div>
  );
}
