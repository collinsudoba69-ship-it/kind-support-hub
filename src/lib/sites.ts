import { z } from "zod";
import type { ContactMethodId } from "./platforms";

export const siteSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(1, "Give the support site a title").max(80, "Keep the title under 80 characters"),
  platformId: z.string().min(1, "Pick a platform"),
  contactMethod: z.custom<ContactMethodId>((v) => typeof v === "string" && v.length > 0),
  contactValue: z.string().trim().min(1, "Add the contact details").max(200, "That contact detail is too long"),
  logoUrl: z
    .string()
    .trim()
    .max(500, "That logo link is too long")
    .refine((v) => v === "" || /^https?:\/\//i.test(v) || v.startsWith("data:image/"), "Logo must be an image link starting with https://")
    .optional()
    .default(""),
  note: z.string().trim().max(300, "Keep the note under 300 characters").optional().default(""),
  createdAt: z.number(),
});

export type SupportSite = z.infer<typeof siteSchema>;

const STORAGE_KEY = "support-sites:v1";

export function loadSites(): SupportSite[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = z.array(siteSchema).safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : [];
  } catch {
    return [];
  }
}

export function saveSites(sites: SupportSite[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sites));
}

export function newId() {
  return Math.random().toString(36).slice(2, 10);
}
