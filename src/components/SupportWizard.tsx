import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Mail, MessageCircle, MessagesSquare, Send } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StepDots } from "@/components/StepDots";
import { PlatformAvatar } from "@/components/PlatformAvatar";
import { cn } from "@/lib/utils";
import {
  CONTACT_METHODS,
  PLATFORMS,
  getPlatform,
  type ContactMethodId,
} from "@/lib/platforms";
import { newId, siteSchema, type SupportSite } from "@/lib/sites";

const METHOD_ICONS: Record<ContactMethodId, typeof Mail> = {
  whatsapp: MessageCircle,
  email: Mail,
  telegram: Send,
  "live-chat": MessagesSquare,
};

const STEPS = [
  { title: "Site Details", description: "What should this support site be called?" },
  { title: "Choose a Platform", description: "What platform is this support site for?" },
  {
    title: "Contact Method",
    description:
      "How can clients contact you through this support site? (e.g. WhatsApp, Email, Telegram, Live Chat)",
  },
  { title: "Review & Create", description: "Check everything before your support site goes live." },
];

type Draft = {
  title: string;
  note: string;
  platformId: string;
  contactMethod: ContactMethodId | "";
  contactValue: string;
  logoUrl: string;
};

const EMPTY: Draft = { title: "", note: "", platformId: "", contactMethod: "", contactValue: "", logoUrl: "" };

export function SupportWizard({
  open,
  onOpenChange,
  onSave,
  editing,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (site: SupportSite) => void;
  editing?: SupportSite | null;
}) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setError(null);
    setDraft(
      editing
        ? {
            title: editing.title,
            note: editing.note ?? "",
            platformId: editing.platformId,
            contactMethod: editing.contactMethod,
            contactValue: editing.contactValue,
            logoUrl: editing.logoUrl ?? "",
          }
        : EMPTY,
    );
  }, [open, editing]);

  const method = useMemo(
    () => CONTACT_METHODS.find((m) => m.id === draft.contactMethod),
    [draft.contactMethod],
  );
  const platform = getPlatform(draft.platformId);

  const canAdvance =
    step === 0
      ? draft.title.trim().length > 0
      : step === 1
        ? draft.platformId !== ""
        : step === 2
          ? draft.contactMethod !== "" && draft.contactValue.trim().length > 0
          : true;

  function next() {
    setError(null);
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    const parsed = siteSchema.safeParse({
      id: editing?.id ?? newId(),
      title: draft.title,
      platformId: draft.platformId,
      contactMethod: draft.contactMethod,
      contactValue: draft.contactValue,
      logoUrl: draft.logoUrl,
      note: draft.note,
      createdAt: editing?.createdAt ?? Date.now(),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the details");
      return;
    }
    onSave(parsed.data);
    toast.success(editing ? "Support site updated" : "Support site created");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl gap-5 rounded-3xl border-border/70 bg-popover p-6 shadow-panel sm:p-7">
        <DialogHeader className="space-y-2 text-left">
          <DialogTitle className="font-display text-2xl">{STEPS[step]?.title}</DialogTitle>
          <DialogDescription className="text-base leading-snug text-muted-foreground">
            {STEPS[step]?.description}

          </DialogDescription>
        </DialogHeader>

        <StepDots total={STEPS.length} current={step} />

        <div className="min-h-[19rem]">
          {step === 0 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-title">Support site title</Label>
                <Input
                  id="site-title"
                  value={draft.title}
                  maxLength={80}
                  placeholder="Transaction Compliance Officer"
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-note">Short description (optional)</Label>
                <Textarea
                  id="site-note"
                  value={draft.note}
                  maxLength={300}
                  rows={4}
                  placeholder="Tell clients what this desk helps with."
                  onChange={(e) => setDraft({ ...draft, note: e.target.value })}
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">Select a Platform</p>
              <ScrollArea className="h-64 pr-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {PLATFORMS.map((p) => {
                    const active = draft.platformId === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setDraft({ ...draft, platformId: p.id })}
                        aria-pressed={active}
                        className={cn(
                          "rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-colors",
                          active
                            ? "border-primary bg-primary/12 text-foreground"
                            : "border-border bg-surface text-foreground/90 hover:border-primary/50 hover:bg-surface-raised",
                        )}
                      >
                        <span className="flex items-center gap-2.5">
                          <PlatformAvatar platform={p} className="size-8 text-xs" />
                          <span className="truncate">{p.name}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>

              {platform && (
                <div className="space-y-2 rounded-xl border border-border bg-surface p-3">
                  <div className="flex items-center gap-3">
                    <PlatformAvatar platform={platform} logoUrl={draft.logoUrl} className="size-10" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{platform.name} logo</p>
                      <p className="text-xs text-muted-foreground">
                        Added automatically. Paste an image link to use your own.
                      </p>
                    </div>
                    {draft.logoUrl.trim() !== "" && (
                      <Button
                        type="button"
                        variant="soft"
                        size="sm"
                        className="ml-auto"
                        onClick={() => setDraft({ ...draft, logoUrl: "" })}
                      >
                        Reset
                      </Button>
                    )}
                  </div>
                  <Input
                    id="logo-url"
                    value={draft.logoUrl}
                    maxLength={500}
                    placeholder="https://example.com/logo.png (optional)"
                    onChange={(e) => setDraft({ ...draft, logoUrl: e.target.value })}
                  />
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm font-semibold text-foreground">Choose Contact Method</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {CONTACT_METHODS.map((m) => {
                  const Icon = METHOD_ICONS[m.id];
                  const active = draft.contactMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setDraft({ ...draft, contactMethod: m.id, contactValue: "" })}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
                        active
                          ? "border-primary bg-primary/12 text-foreground"
                          : "border-border bg-surface text-foreground/90 hover:border-primary/50 hover:bg-surface-raised",
                      )}
                    >
                      <Icon className="size-4" aria-hidden />
                      {m.name}
                    </button>
                  );
                })}
              </div>

              {method && (
                <div className="space-y-2 pt-1">
                  <Label htmlFor="contact-value">{method.name} details</Label>
                  <Input
                    id="contact-value"
                    value={draft.contactValue}
                    maxLength={200}
                    placeholder={method.placeholder}
                    onChange={(e) => setDraft({ ...draft, contactValue: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">{method.hint}</p>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
                {platform && <PlatformAvatar platform={platform} logoUrl={draft.logoUrl} />}
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-semibold">{draft.title}</p>
                  <p className="truncate text-sm text-muted-foreground">{platform?.name}</p>
                </div>
              </div>
              <dl className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface text-sm">
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <dt className="text-muted-foreground">Contact method</dt>
                  <dd className="font-medium">{method?.name}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <dt className="text-muted-foreground">Contact details</dt>
                  <dd className="truncate font-medium">{draft.contactValue}</dd>
                </div>
                {draft.note.trim() && (
                  <div className="px-4 py-3">
                    <dt className="mb-1 text-muted-foreground">Description</dt>
                    <dd className="text-foreground/90">{draft.note}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={() => (step === 0 ? onOpenChange(false) : setStep((s) => s - 1))}
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back
          </Button>
          <Button variant="ember" disabled={!canAdvance} onClick={next}>
            {step === STEPS.length - 1 ? (
              <>
                <Check className="size-4" aria-hidden />
                {editing ? "Save changes" : "Create site"}
              </>
            ) : (
              <>
                Next
                <ArrowRight className="size-4" aria-hidden />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
