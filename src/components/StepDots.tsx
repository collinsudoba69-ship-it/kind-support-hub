import { cn } from "@/lib/utils";

export function StepDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 py-1">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            i === current ? "w-6 bg-primary" : i < current ? "w-2 bg-primary/70" : "w-2 bg-muted",
          )}
        />
      ))}
    </div>
  );
}
