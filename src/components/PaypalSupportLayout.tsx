import type { ComponentType } from "react";
import {
  Mail,
  MessageCircle,
  MessagesSquare,
  Send,
  ShieldCheck,
  Clock,
  Lock,
  HeadphonesIcon,
  ArrowRight,
  CheckCircle2,
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

export function PaypalSupportLayout({ site }: { site: SupportSite }) {
  const method = CONTACT_METHODS.find((m) => m.id === site.contactMethod);
  const Icon = METHOD_ICONS[site.contactMethod];
  const cta = METHOD_CTA[site.contactMethod];
  const href = contactHref(site.contactMethod, site.contactValue);

  return (
    <div className="min-h-screen bg-white font-sans text-[#001c64] antialiased">
      {/* Top utility bar */}
      <div className="border-b border-[#e6e9ef] bg-[#faf8f5] px-4 py-2 text-center text-[11px] font-medium tracking-wide text-[#001c64]/70">
        Secure support · Verified specialists · Response within minutes
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-[#e6e9ef] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-[#001c64]">Pay</span>
              <span className="text-[#0070ba]">Pal</span>
            </span>
            <nav className="hidden gap-6 text-sm font-medium text-[#001c64]/80 md:flex">
              <a href="#personal" className="transition-colors hover:text-[#0070ba]">Personal</a>
              <a href="#business" className="transition-colors hover:text-[#0070ba]">Business</a>
              <a href="#help" className="transition-colors hover:text-[#0070ba]">Help Center</a>
              <a href="#security" className="transition-colors hover:text-[#0070ba]">Security</a>
            </nav>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#0070ba] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#005ea6] hover:shadow-md"
          >
            <Icon className="size-4" />
            Contact Support
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#e6e9ef] bg-gradient-to-b from-[#f7fbff] to-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            {/* Left: content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0070ba]/20 bg-white px-3 py-1.5 text-xs font-semibold text-[#0070ba] shadow-sm">
                <ShieldCheck className="size-3.5" />
                Verified Support Channel
              </div>

              <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-[#001c64] sm:text-5xl lg:text-[3.5rem]">
                {site.title}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#001c64]/70 sm:text-lg">
                {site.note?.trim() ||
                  "Get direct access to a verified PayPal support specialist. No queues, no bots — just fast, secure resolution for your account."}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="xl"
                  className="group h-12 rounded-full bg-[#0070ba] px-6 text-sm font-semibold text-white shadow-lg shadow-[#0070ba]/20 transition-all hover:bg-[#005ea6] hover:shadow-xl hover:shadow-[#0070ba]/30"
                >
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <Icon className="size-5" />
                    {cta}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </Button>
                <a
                  href="#help"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-[#001c64]/15 px-6 text-sm font-semibold text-[#001c64] transition-colors hover:border-[#001c64]/30 hover:bg-[#001c64]/5"
                >
                  How it works
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#001c64]/60">
                <span className="inline-flex items-center gap-1.5">
                  <Lock className="size-3.5" /> Encrypted channel
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" /> Avg. response under 5 min
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5" /> Human specialist
                </span>
              </div>
            </div>

            {/* Right: contact card */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#0070ba]/10 via-[#7cd3ff]/10 to-transparent blur-2xl" aria-hidden />
              <div className="relative overflow-hidden rounded-2xl border border-[#e6e9ef] bg-white p-8 shadow-[0_20px_60px_-25px_rgba(0,28,100,0.25)]">
                <div className="flex items-center gap-3 border-b border-[#e6e9ef] pb-5">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-[#0070ba]/10 text-[#0070ba]">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#001c64]/50">
                      Contact Method
                    </p>
                    <p className="text-base font-semibold text-[#001c64]">{method?.name}</p>
                  </div>
                  <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-green-700">
                    <span className="size-1.5 rounded-full bg-green-500" />
                    Online
                  </span>
                </div>

                <h2 className="mt-6 text-lg font-semibold text-[#001c64]">
                  Speak with a specialist
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#001c64]/70">
                  Tap below to open a direct conversation with the support desk on {method?.name}.
                  Faster than waiting in a queue.
                </p>

                <Button
                  asChild
                  size="xl"
                  className="mt-6 h-12 w-full rounded-xl bg-[#0070ba] text-sm font-semibold text-white shadow-md transition-all hover:bg-[#005ea6]"
                >
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <Icon className="size-5" />
                    {cta}
                  </a>
                </Button>

                <div className="mt-5 rounded-lg border border-dashed border-[#e6e9ef] bg-[#faf8f5] px-3 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#001c64]/50">
                    {method?.name} contact
                  </p>
                  <p className="mt-0.5 break-all text-xs font-medium text-[#001c64]/80">
                    {site.contactValue}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section id="help" className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0070ba]">
            How we help
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#001c64] sm:text-4xl">
            Support for every situation
          </h2>
          <p className="mt-3 text-base text-[#001c64]/70">
            Whatever's happening with your account, a specialist is one message away.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Payments & Refunds",
              body: "Disputed charges, refund delays, or transactions on hold — resolved directly.",
            },
            {
              icon: Lock,
              title: "Account Security",
              body: "Locked accounts, suspicious activity, or verification issues handled securely.",
            },
            {
              icon: HeadphonesIcon,
              title: "Transfers & Payouts",
              body: "Stuck transfers, missing funds, or delayed payouts traced and cleared.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="group rounded-2xl border border-[#e6e9ef] bg-white p-6 transition-all hover:border-[#0070ba]/30 hover:shadow-md"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#0070ba]/10 text-[#0070ba] transition-colors group-hover:bg-[#0070ba] group-hover:text-white">
                <c.icon className="size-5" />
              </div>
              <p className="mt-5 text-base font-semibold text-[#001c64]">{c.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#001c64]/70">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust band */}
      <section id="security" className="border-y border-[#e6e9ef] bg-[#f7fbff] py-16">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0070ba]/20 bg-white px-3 py-1.5 text-xs font-semibold text-[#0070ba]">
            <Lock className="size-3.5" />
            Secure by default
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#001c64] sm:text-4xl">
            One channel. Real support. No runaround.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#001c64]/70">
            This channel is monitored by a verified specialist authorized to act on your account.
            No bots, no scripts — just direct resolution.
          </p>
          <Button
            asChild
            size="xl"
            className="mt-8 h-12 rounded-full bg-[#001c64] px-6 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#001846]"
          >
            <a href={href} target="_blank" rel="noopener noreferrer">
              <Icon className="size-5" />
              {cta}
            </a>
          </Button>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-[#001c64] px-5 py-16 text-white">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 md:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready when you are
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
              Reach the desk on {method?.name}. Your message goes straight to a support specialist —
              typically answered within minutes.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <Button
              asChild
              size="xl"
              className="h-12 rounded-full bg-white px-6 text-sm font-semibold text-[#001c64] shadow-lg transition-all hover:bg-white/90"
            >
              <a href={href} target="_blank" rel="noopener noreferrer">
                <Icon className="size-5" />
                {cta}
              </a>
            </Button>
            <p className="text-xs text-white/50">
              Opens {method?.name} to continue the conversation
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e6e9ef] bg-white px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-[#001c64]/60 sm:flex-row">
          <p>© PayPal Support Desk · All rights reserved</p>
          <p className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" />
            Contact channel verified by the site owner
          </p>
        </div>
      </footer>

      {/* Floating contact button */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#0070ba] px-5 py-3 text-sm font-bold text-white shadow-xl shadow-[#0070ba]/30 ring-2 ring-white/50 transition-all hover:scale-105 hover:bg-[#005ea6] hover:shadow-2xl sm:bottom-6 sm:right-6 sm:px-6 sm:py-3.5 sm:text-base"
      >
        <Icon className="size-5" />
        {cta}
      </a>
    </div>
  );
}
