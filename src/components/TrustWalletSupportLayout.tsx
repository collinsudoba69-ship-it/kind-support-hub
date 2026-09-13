import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Clock,
  FileText,
  KeyRound,
  LifeBuoy,
  LockKeyhole,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  WalletCards,
} from "lucide-react";

import { PlatformAvatar } from "@/components/PlatformAvatar";
import { Button } from "@/components/ui/button";
import { getPlatform } from "@/lib/platforms";

const OFFICIAL_SUPPORT_URL = "https://support.trustwallet.com/";

const topics = [
  { icon: WalletCards, title: "Wallet basics", text: "Create, import and manage your wallet safely" },
  { icon: Send, title: "Sending & receiving", text: "Get help with transfers, balances and pending transactions" },
  { icon: Smartphone, title: "App troubleshooting", text: "Resolve updates, connection issues and display problems" },
  { icon: KeyRound, title: "Recovery phrase", text: "Learn how recovery works and how to protect your phrase" },
  { icon: ShieldCheck, title: "Security", text: "Recognize scams and keep your wallet secure" },
  { icon: LockKeyhole, title: "DApps & connections", text: "Troubleshoot WalletConnect and decentralized apps" },
];

const articles = [
  "How to import a wallet",
  "A transaction is pending or missing",
  "Protecting your recovery phrase",
  "How to report a scam",
  "Token balance is not showing",
  "Troubleshooting WalletConnect",
];

const faqs = [
  "How do I contact Trust Wallet support?",
  "Can Trust Wallet recover my recovery phrase?",
  "Why is my transaction still pending?",
  "How do I add a custom token?",
  "How can I keep my wallet secure?",
];

export function TrustWalletSupportLayout() {
  const platform = getPlatform("trust-wallet");

  return (
    <div className="min-h-screen bg-trust-surface font-sans text-trust-ink antialiased">
      <header className="sticky top-0 z-30 border-b border-trust-border bg-trust-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            {platform ? (
              <PlatformAvatar platform={platform} className="size-10 border-trust-border bg-trust-surface" />
            ) : null}
            <div className="min-w-0">
              <p className="truncate text-lg font-extrabold">Trust Wallet</p>
              <p className="truncate text-xs text-trust-muted">Help Center</p>
            </div>
          </div>
          <Button asChild className="rounded-full bg-trust-blue px-5 text-trust-on-blue hover:bg-trust-blue-strong">
            <a href={OFFICIAL_SUPPORT_URL} target="_blank" rel="noopener noreferrer">
              Official Support
              <ArrowRight aria-hidden />
            </a>
          </Button>
        </div>
      </header>

      <main>
        <section className="border-b border-trust-border bg-trust-hero">
          <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:py-24">
            <span className="inline-flex items-center gap-2 rounded-full bg-trust-blue-soft px-3 py-1 text-xs font-bold text-trust-blue-strong">
              <ShieldCheck className="size-4" aria-hidden />
              Official support links only
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-6xl">
              How can we help?
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-trust-muted sm:text-lg">
              Find answers for your wallet, transactions, security and app connections.
            </p>
            <div className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-full border border-trust-border bg-trust-surface p-2 pl-5 shadow-sm">
              <Search className="size-5 shrink-0 text-trust-muted" aria-hidden />
              <span className="min-w-0 flex-1 truncate text-left text-sm text-trust-muted">
                Search the official Help Center
              </span>
              <Button asChild className="shrink-0 rounded-full bg-trust-blue px-5 text-trust-on-blue hover:bg-trust-blue-strong">
                <a href={OFFICIAL_SUPPORT_URL} target="_blank" rel="noopener noreferrer">Search</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-sm font-bold uppercase text-trust-blue">Support topics</p>
          <div className="mt-2 flex items-end justify-between gap-5">
            <h2 className="text-3xl font-extrabold">What do you need help with?</h2>
            <a className="hidden items-center gap-1 text-sm font-bold text-trust-blue sm:flex" href={OFFICIAL_SUPPORT_URL} target="_blank" rel="noopener noreferrer">
              Browse all <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map(({ icon: Icon, title, text }) => (
              <a key={title} href={OFFICIAL_SUPPORT_URL} target="_blank" rel="noopener noreferrer" className="group rounded-lg border border-trust-border bg-trust-surface p-6 transition hover:-translate-y-0.5 hover:border-trust-blue hover:shadow-md">
                <span className="flex size-11 items-center justify-center rounded-lg bg-trust-blue-soft text-trust-blue">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-extrabold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-trust-muted">{text}</p>
                <ArrowRight className="mt-5 size-4 text-trust-blue transition-transform group-hover:translate-x-1" aria-hidden />
              </a>
            ))}
          </div>
        </section>

        <section className="border-y border-trust-border bg-trust-panel">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1fr_0.65fr]">
            <div>
              <div className="flex items-center gap-3">
                <BookOpen className="size-6 text-trust-blue" aria-hidden />
                <h2 className="text-2xl font-extrabold">Popular help articles</h2>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {articles.map((article) => (
                  <a key={article} href={OFFICIAL_SUPPORT_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 rounded-lg border border-trust-border bg-trust-surface px-4 py-4 text-sm font-bold transition hover:border-trust-blue">
                    <span className="flex items-center gap-3"><FileText className="size-4 shrink-0 text-trust-blue" aria-hidden />{article}</span>
                    <ArrowRight className="size-4 shrink-0 text-trust-muted" aria-hidden />
                  </a>
                ))}
              </div>
            </div>
            <aside className="rounded-lg bg-trust-blue p-8 text-trust-on-blue">
              <LifeBuoy className="size-8" aria-hidden />
              <h2 className="mt-5 text-2xl font-extrabold">Still need help?</h2>
              <p className="mt-3 text-sm leading-6 text-trust-on-blue/80">
                Continue to Trust Wallet’s official support site. Never share your recovery phrase with anyone.
              </p>
              <Button asChild size="lg" className="mt-7 w-full rounded-full bg-trust-surface font-bold text-trust-blue hover:bg-trust-blue-soft">
                <a href={OFFICIAL_SUPPORT_URL} target="_blank" rel="noopener noreferrer">
                  Official Support <ArrowRight aria-hidden />
                </a>
              </Button>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Frequently asked questions</h2>
            <p className="mt-2 text-sm text-trust-muted">Quick links to official guidance</p>
          </div>
          <div className="mt-8 space-y-3">
            {faqs.map((question) => (
              <details key={question} className="group rounded-lg border border-trust-border bg-trust-surface px-5 py-4 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold">
                  {question}
                  <ChevronDown className="size-4 shrink-0 text-trust-muted transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-trust-muted">
                  Open Trust Wallet’s official Help Center for current guidance and verified contact options.
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-trust-border bg-trust-panel px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center text-xs text-trust-muted sm:flex-row sm:text-left">
          <div className="flex items-center gap-2">
            {platform ? <PlatformAvatar platform={platform} className="size-7 border-trust-border bg-trust-surface" /> : null}
            <span className="font-bold text-trust-ink">Trust Wallet Help Center</span>
          </div>
          <p className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden />
            Contact links open only on support.trustwallet.com.
          </p>
        </div>
      </footer>
    </div>
  );
}