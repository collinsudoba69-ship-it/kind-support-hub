import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import type { ContactMethodId } from "./platforms";

export const ADMIN_EMAIL = "mt2970446@gmail.com";

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

type Row = {
  id: string;
  title: string;
  platform_id: string;
  contact_method: string;
  contact_value: string;
  logo_url: string | null;
  note: string | null;
  created_at: string;
};

function toSite(row: Row): SupportSite {
  return {
    id: row.id,
    title: row.title,
    platformId: row.platform_id,
    contactMethod: row.contact_method as ContactMethodId,
    contactValue: row.contact_value,
    logoUrl: row.logo_url ?? "",
    note: row.note ?? "",
    createdAt: new Date(row.created_at).getTime(),
  };
}

function toRow(site: SupportSite) {
  return {
    id: site.id,
    title: site.title,
    platform_id: site.platformId,
    contact_method: site.contactMethod,
    contact_value: site.contactValue,
    logo_url: site.logoUrl ?? "",
    note: site.note ?? "",
    created_at: new Date(site.createdAt).toISOString(),
  };
}

export async function fetchSites(): Promise<SupportSite[]> {
  const { data, error } = await supabase
    .from("support_sites")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Row[]).map(toSite);
}

export async function fetchSite(id: string): Promise<SupportSite | null> {
  const { data, error } = await supabase.from("support_sites").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? toSite(data as Row) : null;
}

export async function upsertSite(site: SupportSite): Promise<void> {
  const { error } = await supabase.from("support_sites").upsert(toRow(site));
  if (error) throw error;
}

export async function deleteSite(id: string): Promise<void> {
  const { error } = await supabase.from("support_sites").delete().eq("id", id);
  if (error) throw error;
}

export function newId() {
  return Math.random().toString(36).slice(2, 10);
}
