export type Platform = {
  id: string;
  name: string;
  /** Short brand mark shown in the avatar circle. */
  mark: string;
  /** oklch brand tint used for the avatar circle. */
  tint: string;
};

export const PLATFORMS: Platform[] = [
  { id: "binance", name: "Binance", mark: "B", tint: "oklch(0.78 0.17 85)" },
  { id: "bybit", name: "Bybit", mark: "By", tint: "oklch(0.78 0.17 75)" },
  { id: "coinbase", name: "Coinbase", mark: "C", tint: "oklch(0.60 0.18 255)" },
  { id: "paypal", name: "PayPal", mark: "P", tint: "oklch(0.55 0.17 260)" },
  { id: "crypto-com", name: "Crypto.com", mark: "Cr", tint: "oklch(0.50 0.15 255)" },
  { id: "cash-app", name: "Cash App", mark: "$", tint: "oklch(0.72 0.20 150)" },
  { id: "celebrity-management", name: "Celebrity Management", mark: "CM", tint: "oklch(0.70 0.16 330)" },
  { id: "wise", name: "Wise", mark: "W", tint: "oklch(0.78 0.18 140)" },
  { id: "zelle", name: "Zelle", mark: "Z", tint: "oklch(0.58 0.22 300)" },
  { id: "venmo", name: "Venmo", mark: "V", tint: "oklch(0.65 0.16 240)" },
  { id: "trust-wallet", name: "Trust Wallet", mark: "TW", tint: "oklch(0.62 0.17 250)" },
  { id: "coinbase-wallet", name: "Coinbase Wallet", mark: "CW", tint: "oklch(0.62 0.17 258)" },
  { id: "kraken", name: "Kraken", mark: "K", tint: "oklch(0.60 0.16 285)" },
  { id: "kucoin", name: "KuCoin", mark: "KC", tint: "oklch(0.72 0.15 180)" },
  { id: "okx", name: "OKX", mark: "OK", tint: "oklch(0.70 0.02 250)" },
  { id: "metamask", name: "MetaMask", mark: "MM", tint: "oklch(0.72 0.17 55)" },
  { id: "revolut", name: "Revolut", mark: "R", tint: "oklch(0.55 0.16 265)" },
  { id: "skrill", name: "Skrill", mark: "S", tint: "oklch(0.60 0.20 320)" },
  { id: "payoneer", name: "Payoneer", mark: "Pa", tint: "oklch(0.65 0.18 20)" },
  { id: "western-union", name: "Western Union", mark: "WU", tint: "oklch(0.78 0.17 80)" },
  { id: "chime", name: "Chime", mark: "Ch", tint: "oklch(0.75 0.17 155)" },
  { id: "robinhood", name: "Robinhood", mark: "RH", tint: "oklch(0.75 0.19 140)" },
  { id: "other", name: "Other", mark: "?", tint: "oklch(0.65 0.02 60)" },
];

export function getPlatform(id: string): Platform | undefined {
  return PLATFORMS.find((p) => p.id === id);
}

export type ContactMethodId = "whatsapp" | "email" | "telegram" | "live-chat";

export const CONTACT_METHODS: {
  id: ContactMethodId;
  name: string;
  /** Placeholder for the handle/value input. */
  placeholder: string;
  hint: string;
}[] = [
  { id: "whatsapp", name: "WhatsApp", placeholder: "+1 555 000 1234", hint: "Phone number in international format" },
  { id: "email", name: "Email", placeholder: "support@yourdomain.com", hint: "Email address clients will write to" },
  { id: "telegram", name: "Telegram", placeholder: "@yourhandle", hint: "Telegram username" },
  { id: "live-chat", name: "Live Chat", placeholder: "https://chat.yourdomain.com", hint: "Link to your chat widget or room" },
];

export function contactHref(method: ContactMethodId, value: string): string {
  const v = value.trim();
  switch (method) {
    case "whatsapp":
      return `https://wa.me/${encodeURIComponent(v.replace(/[^\d]/g, ""))}`;
    case "email":
      return `mailto:${encodeURIComponent(v)}`;
    case "telegram":
      return `https://t.me/${encodeURIComponent(v.replace(/^@/, ""))}`;
    case "live-chat":
      return /^https?:\/\//i.test(v) ? v : `https://${v}`;
  }
}
