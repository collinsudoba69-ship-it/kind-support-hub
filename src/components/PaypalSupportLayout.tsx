import type { ComponentType } from "react";
import { Mail, MessageCircle, MessagesSquare, Send, ShieldCheck } from "lucide-react";

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
  telegram: "Chat on Telegram",
  "live-chat": "Open Live Chat",
};

export function PaypalSupportLayout({ site }: { site: SupportSite }) {
  const method = CONTACT_METHODS.find((m) => m.id === site.contactMethod);
  const Icon = METHOD_ICONS[site.contactMethod];
  const cta = METHOD_CTA[site.contactMethod];
  const href = contactHref(site.contactMethod, site.contactValue);

  return (
    <div className="min-h-screen bg-white text-[#001c64]">
      {/* Top promo bar */}
      <div className="bg-[#001c64] px-4 py-2 text-center text-xs font-medium text-white">
        Get in touch with a real support specialist — no bots, no waiting.
      </div>

      {/* Nav */}
      <header className="border-b border-[#e6e9ef] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-extrabold tracking-tight">
              <span className="text-[#001c64]">Pay</span>
              <span className="text-[#0070ba]">Pal</span>
            </span>
          </div>
          <nav className="hidden gap-6 text-sm font-semibold text-[#001c64] md:flex">
            <a href="#personal" className="hover:text-[#0070ba]">Personal</a>
            <a href="#business" className="hover:text-[#0070ba]">Business</a>
            <a href="#help" className="hover:text-[#0070ba]">Help</a>
          </nav>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#0070ba] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#005ea6]"
          >
            <Icon className="size-4" />
            Contact
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pt-10 sm:pt-16">
        <h1 className="text-center font-display text-4xl font-extrabold leading-tight text-[#001c64] sm:text-6xl">
          {site.title}
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-base text-[#001c64]/75 sm:text-lg">
          {site.note?.trim() ||
            "Shop, pay, or send money — reach a verified PayPal support specialist in seconds."}
        </p>

        {/* Hero panel */}
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 items-stretch overflow-hidden rounded-3xl border border-[#e6e9ef] bg-[#f7fbff] shadow-[0_20px_60px_-30px_rgba(0,28,100,0.35)] md:grid-cols-[1.4fr_1fr]">
          {/* Left: photo collage */}
          <div className="relative hidden min-h-[320px] bg-gradient-to-br from-[#eef4ff] via-white to-[#f4f0ff] p-6 md:block">
            <div className="absolute left-6 top-6 h-32 w-24 -rotate-6 rounded-2xl bg-[#0070ba]/10 shadow-lg" />
            <div className="absolute left-28 top-16 h-40 w-32 rotate-3 rounded-2xl bg-[#001c64]/10 shadow-lg" />
            <div className="absolute right-8 top-8 h-36 w-28 rotate-6 rounded-2xl bg-[#ffc439]/40 shadow-lg" />
            <div className="absolute bottom-6 left-16 h-28 w-40 -rotate-3 rounded-2xl bg-[#0070ba]/15 shadow-lg" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-2xl bg-white/85 px-5 py-3 text-center font-display text-sm font-bold text-[#001c64] shadow-lg backdrop-blur">
                Verified support
                <br />
                <span className="text-xs font-medium text-[#001c64]/70">
                  Every message reaches a real specialist
                </span>
              </div>
            </div>
          </div>

          {/* Right: contact CTA (replaces QR code) */}
          <div className="flex flex-col justify-center gap-4 p-8 text-center md:text-left">
            <span className="inline-flex items-center gap-2 self-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0070ba] shadow-sm md:self-start">
              <ShieldCheck className="size-3.5" />
              Verified contact channel
            </span>

            <h2 className="font-display text-2xl font-extrabold text-[#001c64]">
              {cta}
            </h2>
            <p className="text-sm text-[#001c64]/75">
              Tap the button below to reach the support desk on {method?.name}. Faster than
              waiting in a queue.
            </p>

            <Button asChild size="xl" className="mt-2 w-full bg-[#0070ba] text-white hover:bg-[#005ea6]">
              <a href={href} target="_blank" rel="noopener noreferrer">
                <Icon className="size-5" />
                {cta}
              </a>
            </Button>

            <p className="break-all text-center text-xs text-[#001c64]/60 md:text-left">
              {site.contactValue}
            </p>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section id="help" className="mx-auto mt-20 max-w-5xl px-5">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { title: "Shop", body: "Trouble with a payment or refund? Talk to a real person." },
            { title: "Pay", body: "Payments failing or on hold? Get it unstuck fast." },
            { title: "Send", body: "Transfers stuck or missing? Support can trace it." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-[#e6e9ef] bg-white p-6 shadow-sm">
              <p className="font-display text-lg font-extrabold text-[#001c64]">{c.title}</p>
              <p className="mt-2 text-sm text-[#001c64]/75">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rewarding band */}
      <section className="mt-16 bg-[#7cd3ff]/70 py-14">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-display text-3xl font-extrabold text-[#001c64] sm:text-4xl">
            One click to reach real support
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-[#001c64]/80">
            Skip the runaround. This channel is monitored by a specialist who can act on your account.
          </p>
          <Button asChild size="xl" className="mt-6 bg-[#001c64] text-white hover:bg-[#001846]">
            <a href={href} target="_blank" rel="noopener noreferrer">
              <Icon className="size-5" />
              {cta}
            </a>
          </Button>
        </div>
      </section>

      {/* Dark footer CTA */}
      <section className="bg-[#001c64] px-5 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            All the help you need
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/75">
            Reach the desk on {method?.name}. Your message goes straight to a support specialist.
          </p>
          <Button asChild size="xl" className="mt-6 bg-white text-[#001c64] hover:bg-white/90">
            <a href={href} target="_blank" rel="noopener noreferrer">
              <Icon className="size-5" />
              {cta}
            </a>
          </Button>
          <p className="mt-6 text-xs text-white/60">
            You'll open {method?.name} to continue the conversation.
          </p>
        </div>
      </section>

      <footer className="border-t border-[#e6e9ef] bg-white px-5 py-6 text-center text-xs text-[#001c64]/60">
        © PayPal support desk · Contact channel verified by the site owner
      </footer>
    </div>
  );
}
